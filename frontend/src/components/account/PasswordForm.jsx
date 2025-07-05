import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

const PasswordForm = () => {
  const { updateProfile } = useAuth();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Must be at least 6 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        )
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm your new password"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await updateProfile({
          currentPassword: values.currentPassword,
          password: values.newPassword,
        });
        alert("Password updated successfully!");
        resetForm();
      } catch (error) {
        alert(error.message || "Failed to update password");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#FFE662]">
      <h2 className="text-xl font-semibold text-[#800020] mb-4">
        Change Password
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {[
          { name: "currentPassword", label: "Current Password" },
          { name: "newPassword", label: "New Password" },
          { name: "confirmPassword", label: "Confirm New Password" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-[#800020]">{field.label}</label>
            <input
              type="password"
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
          {formik.isSubmitting ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
