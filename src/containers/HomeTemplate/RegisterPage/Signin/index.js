import React, { useState } from "react";
import { actSignIn } from "./modules/actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../components/Loader";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginPage(props1) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loginReducer.loading);

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Không Bỏ Trống"),
      matKhau: Yup.string().required("Không Bỏ Trống"),
    }),
    onSubmit: (values) => {
      dispatch(actSignIn(values, props1.props.history));
    },
  });

  const togglePasswordVisiblity = () => {
    setIsPasswordShown(!isPasswordShown);
  };
  if (loading) return <Loader />;
  return (
    <div className="login">
      <div className="center">
        <h2
          className="form-title"
          id="login"
          onClick={(e) => {
            let parent = e.target.parentNode.parentNode;
            document
              .getElementById("signup")
              .parentNode.classList.add("slide-up");
            parent.classList.remove("slide-up");
          }}
        >
          Log in
        </h2>
        <div className="form-holder">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Username"
                name="taiKhoan"
                value={formik.values.taiKhoan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={
                  formik.errors.taiKhoan
                    ? { outline: "5px ridge #ff013c" }
                    : { outline: "1px ridge black" }
                }
              />
              {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                <p className="text-danger">{formik.errors.taiKhoan}</p>
              )}
            </div>
            <div className="position-relative">
              <span
                className={`position-absolute ${
                  isPasswordShown ? "fas fa-eye" : "fas fa-eye-slash"
                }`}
                onClick={togglePasswordVisiblity}
                style={{
                  right: "0",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></span>
              <input
                type={isPasswordShown ? "text" : "password"}
                placeholder="Password"
                name="matKhau"
                value={formik.values.matKhau}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={
                  formik.errors.matKhau
                    ? { outline: "5px ridge #ff013c" }
                    : { outline: "1px ridge black" }
                }
              />
            </div>
              {formik.errors.matKhau && formik.touched.matKhau && (
                <p className="text-danger">{formik.errors.matKhau}</p>
              )}

            <button className="submit-btn" type="submit">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
