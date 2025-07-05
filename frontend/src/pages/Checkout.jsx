import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useCreditCard } from "../context/CreditCardContext";
import EmptyCart from "../components/checkout/EmptyCart";
import DeliveryForm from "../components/checkout/DeliveryForm";
import PaymentMethodForm from "../components/checkout/PaymentMethodForm";
import OrderSummary from "../components/checkout/OrderSummary";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "First name must contain only letters")
    .required("Required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
    .required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string()
    .matches(/^[A-Za-z]+$/, "City must contain only letters")
    .required("Required"),
  governorate: Yup.string()
    .matches(/^[A-Za-z]+$/, "Governorate must contain only letters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("Required"),
  zipCode: Yup.string().matches(/^\d+$/, "Zip code must be a number"),

  paymentMethod: Yup.string().required("Required"),

  creditCardNumber: Yup.string().when("paymentMethod", {
    is: "visa",
    then: (schema) =>
      schema
        .matches(/^\d{16}$/, "Credit card number must be 16 numbers")
        .required("Credit card number is required"),
  }),

  expiryDate: Yup.string().when("paymentMethod", {
    is: "visa",
    then: (schema) =>
      schema
        .required("Expiry date is required")
        .matches(/^\d{4}-\d{2}$/, "Expiry date must be in YYYY-MM format"),
  }),

  cvv: Yup.string().when("paymentMethod", {
    is: "visa",
    then: (schema) =>
      schema
        .matches(/^\d{3}$/, "CVV must be 3 numbers")
        .required("CVV is required"),
  }),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrder();
  const { addCreditCard } = useCreditCard();

  const total = getCartTotal();
  const shipping = 0;
  const totalAmount = total + shipping;

  const handleSubmit = async (values) => {
    try {
      const restaurantId = cartItems[0].restaurant;

      const orderData = {
        restaurantId,
        items: cartItems.map((item) => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        deliveryAddress: {
          street: values.address,
          city: values.city,
          state: values.governorate,
          zipCode: values.zipCode,
        },
        paymentMethod:
          values.paymentMethod === "visa"
            ? "credit_card"
            : values.paymentMethod,
        deliveryInstructions: values.deliveryInstructions || "",
        totalAmount,
        status: "pending",
        paymentStatus: "pending",
      };

      
      if (values.paymentMethod === "visa") {
        orderData.paymentDetails = {
          cardNumber: values.creditCardNumber,
          expiryDate: values.expiryDate,
          cvv: values.cvv,
        };

        
        if (values.saveCard) {
          await addCreditCard({
            cardNumber: values.creditCardNumber,
            expiryDate: values.expiryDate,
            cardHolderName: `${values.firstName} ${values.lastName}`,
            isDefault: false,
          });
        }
      }

      const response = await addOrder(orderData);

      if (response) {
        clearCart();
        navigate("/orders");
      } else {
        throw new Error("No response from server");
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert(
        `Failed to place order: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            address: "",
            apartment: "",
            city: "",
            governorate: "",
            zipCode: "",
            email: "",
            phone: "",
            paymentMethod: "cash",
            deliveryInstructions: "",
            creditCardNumber: "",
            expiryDate: "",
            cvv: "",
            saveCard: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <DeliveryForm />
            <PaymentMethodForm />
            <button
              type="submit"
              className="bg-[#FFE662] text-black py-4 px-6 rounded-full mb-4"
            >
              Place Order
            </button>
          </Form>
        </Formik>
      </div>

      <div className="w-full lg:w-1/3 mt-12 lg:ml-4">
        <OrderSummary
          cartItems={cartItems}
          total={totalAmount}
          shipping={shipping}
        />
      </div>
    </div>
  );
};

export default Checkout;
