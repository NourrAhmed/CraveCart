import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { reviewAPI } from "../../config/api";

const validationSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .required("Rating is required"),
  comment: Yup.string().required("Comment is required"),
});

const initialValues = {
  rating: 5,
  comment: "",
};

const ReviewForm = ({ restaurantId, onReviewSubmitted }) => {
  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    try {
      await reviewAPI.create({
        restaurant: restaurantId,
        ...values,
      });
      setStatus({ success: true });
      resetForm();
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err) {
      setStatus({
        error:
          err.response?.data?.message ||
          "Failed to submit review. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#2e2e2e] shadow-lg rounded-2xl p-8 border border-[#FFE662] mt-8">
      <h3 className="text-2xl font-bold text-[#FFE662] mb-6">Leave a Review</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-5">
            {status?.error && (
              <div className="text-red-400 text-sm">{status.error}</div>
            )}
            {status?.success && (
              <div className="text-green-400 text-sm">
                Review submitted successfully!
              </div>
            )}

            <div>
              <label className="block font-medium mb-1 text-[#FFE662]">
                Rating
              </label>
              <Field
                as="select"
                name="rating"
                className="w-full p-3 border border-gray-400 rounded-lg bg-[#1d1d1d] text-white focus:outline-none focus:ring-2 focus:ring-[#FFE662]"
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? "s" : ""}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="rating"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-[#FFE662]">
                Comment
              </label>
              <Field
                as="textarea"
                name="comment"
                className="w-full p-3 border border-gray-400 rounded-lg bg-[#1d1d1d] text-white focus:outline-none focus:ring-2 focus:ring-[#FFE662]"
                rows={3}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FFE662] text-[#2e2e2e] font-bold py-3 px-4 rounded-lg hover:bg-[#FFD700] transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReviewForm;
