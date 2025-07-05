import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

const AddressForm = () => {
  const { user, updateProfile } = useAuth();

  const formik = useFormik({
    initialValues: {
      address: user?.addresses?.[0]?.street || "",
      city: user?.addresses?.[0]?.city || "",
      state: user?.addresses?.[0]?.state || "",
      zipCode: user?.addresses?.[0]?.zipCode || "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string().required("Postal code is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const addressData = {
          addresses: [
            {
              street: values.address,
              city: values.city,
              state: values.state,
              zipCode: values.zipCode,
            },
          ],
        };
        await updateProfile(addressData);
        alert("Address updated successfully!");
      } catch (error) {
        alert(error.message || "Failed to update address");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#FFE662]">
      <h2 className="text-xl font-semibold text-[#800020] mb-4">Add Address</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {[
          { name: "address", label: "Street Address" },
          { name: "city", label: "City" },
          { name: "state", label: "State" },
          { name: "zipCode", label: "Postal Code" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-[#800020]">{field.label}</label>
            <input
              type="text"
              name={field.name}
              onChange={formik.handleChange}
              value={formik.values[field.name]}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#FFE662]"
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-[#800020] text-white px-6 py-2 rounded-xl hover:bg-[#a32638] transition disabled:opacity-50"
        >
          {formik.isSubmitting ? "Saving..." : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
