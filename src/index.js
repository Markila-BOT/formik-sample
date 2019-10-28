import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

function App({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
      <div>
        {errors.email && touched.email && errors.email}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {errors.password && touched.password && errors.password}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <label>
        <Field type="checkbox" name="newsletter" checked={values.newsletter} />
        Join our newsletter
      </label>
      <Field component="select" name="plan">
        <option value="free">Free</option>
        <option value="premium">Premium</option>
      </Field>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
}

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || false,
      plan: plan || "free"
    };
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .min(9)
      .required()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "lol@io.com") {
        setErrors({ email: "That email is already taken" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
  }
})(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<FormikApp />, rootElement);
