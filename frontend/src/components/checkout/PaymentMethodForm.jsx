import React, { useState, useEffect } from "react";
import { Field, useFormikContext } from "formik";
import { useCreditCard } from "../../context/CreditCardContext";

const PaymentMethodForm = () => {
  const { values, errors, touched, setFieldValue } = useFormikContext();
  const { creditCards = [], loading } = useCreditCard();
  const [saveCard, setSaveCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (Array.isArray(creditCards) && creditCards.length > 0) {
      const defaultCard = creditCards.find((card) => card.isDefault);
      if (defaultCard) {
        setSelectedCard(defaultCard._id);
        setFieldValue("creditCardNumber", defaultCard.cardNumber);
        setFieldValue("expiryDate", defaultCard.expiryDate);
      }
    }
  }, [creditCards, setFieldValue]);

  const handleCardSelect = (card) => {
    setSelectedCard(card._id);
    setFieldValue("creditCardNumber", card.cardNumber);
    setFieldValue("expiryDate", card.expiryDate);
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-[#800020]">
        Payment Method
      </h3>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <Field type="radio" name="paymentMethod" value="cash" />
          <span className="text-black">Cash on delivery</span>
        </label>
        <label className="flex items-center gap-2">
          <Field type="radio" name="paymentMethod" value="visa" />
          <span className="text-black">Credit Card</span>
        </label>
      </div>

      {values.paymentMethod === "visa" && (
        <>
          {!loading && Array.isArray(creditCards) && creditCards.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
                Saved Credit Cards
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedCard || ""}
                onChange={(e) => {
                  const card = creditCards.find(
                    (c) => c._id === e.target.value
                  );
                  if (card) handleCardSelect(card);
                }}
              >
                <option value="">Select a saved card</option>
                {creditCards.map((card) => (
                  <option key={card._id} value={card._id}>
                    {card.cardHolderName} - {card.expiryDate}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-4">
            <label className="block text-sm font-semibold">
              Credit Card Number
            </label>
            <Field
              name="creditCardNumber"
              type="text"
              placeholder="1234123412341234"
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.creditCardNumber && touched.creditCardNumber && (
              <div className="text-red-500 text-xs">
                {errors.creditCardNumber}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Expiry Date</label>
            <Field
              name="expiryDate"
              type="month"
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.expiryDate && touched.expiryDate && (
              <div className="text-red-500 text-xs">{errors.expiryDate}</div>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">CVV</label>
            <Field
              name="cvv"
              type="text"
              placeholder="123"
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.cvv && touched.cvv && (
              <div className="text-red-500 text-xs">{errors.cvv}</div>
            )}
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2">
              <Field
                type="checkbox"
                name="saveCard"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
              />
              <span className="text-sm">Save this card for future use</span>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentMethodForm;
