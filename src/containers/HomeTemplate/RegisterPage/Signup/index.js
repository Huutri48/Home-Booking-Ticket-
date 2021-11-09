import React from "react";
import { actSignUp } from "./modules/actions";
import {  useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
function Signup(props1) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "GP02",
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .required("Không Bỏ Trống!")
        .min(5, "Tên tài khoản từ 5 kí tự trở lên!"),

      matKhau: Yup.string()
        .required("Không Bỏ Trống!")
        .min(8, "Mật khẩu quá ngắn - ít nhất phải 8 ký tự!")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa nhất một số!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("matKhau")], "Password's not match!")
        .required("Không Bỏ Trống!"),
      email: Yup.string()
        .required("Không Bỏ Trống!")
        .email("Email không đúng định dạng!"),

      soDT: Yup.string()
        .required("Không Bỏ Trống!")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8,9})\b/,
          "Số Điện Thoại Có Dạng  84* Hoặc 0*!!"
        ),
      hoTen: Yup.string().required("Không Bỏ Trống!"),
    }),
    onSubmit: (values) => {
      dispatch(actSignUp(values));
    },
  });

  return (
    <div id="signUp" className="signup slide-up">
      <h2
        className="form-title"
        id="signup"
        onClick={(e) => {
          let parent = e.target.parentNode;
          document
            .getElementById("login")
            .parentNode.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }}
      >
        Sign up
      </h2>
      <div className="form-holder">
        <form onSubmit={formik.handleSubmit}>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
            type="text"
            placeholder="Username"
            name="taiKhoan"
            style={
              formik.errors.taiKhoan
                ? { outline: "5px ridge #ff013c" }
                 : { outline: "1px ridge black" }
            }
          />
          {formik.errors.taiKhoan && formik.touched.taiKhoan && (
            <p>{formik.errors.taiKhoan}</p>
          )}
          <input
            onBlur={formik.handleBlur}
            value={formik.values.matKhau}
            onChange={formik.handleChange}
            type="password"
            placeholder="Password"
            name="matKhau"
            style={
              formik.errors.matKhau
                ? { outline: "5px ridge #ff013c" }
                 : { outline: "1px ridge black" }
            }
          />

          {formik.errors.matKhau && formik.touched.matKhau && (
            <p>{formik.errors.matKhau}</p>
          )}
          <input
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            style={
              formik.errors.confirm_password
                ? { outline: "5px ridge #ff013c" }
                 : { outline: "1px ridge black" }
            }
          />

          {formik.errors.confirm_password &&
            formik.touched.confirm_password && (
              <p>{formik.errors.confirm_password}</p>
            )}
          <input
            onBlur={formik.handleBlur}
            value={formik.values.hoTen}
            onChange={formik.handleChange}
            type="text"
            placeholder="Name"
            name="hoTen"
            style={
              formik.errors.hoTen
                ? { outline: "5px ridge #ff013c" }
                 : { outline: "1px ridge black" }
            }
          />
          {formik.errors.hoTen && formik.touched.hoTen && (
            <p>{formik.errors.hoTen}</p>
          )}
          <input
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            placeholder="Email"
            name="email"
            style={
              formik.errors.email
                ? { outline: "5px ridge #ff013c" }
                 : { outline: "1px ridge black" }
            }
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
          <input
            onBlur={formik.handleBlur}
            value={formik.values.soDT}
            onChange={formik.handleChange}
            type="text"
            placeholder="Phone Number"
            name="soDT"
            style={
              formik.errors.soDT
                ? { outline: "5px ridge #ff013c" }
                 : { outline: "1px ridge black" }
            }
          />

          {formik.errors.soDT && formik.touched.soDT && (
            <p>{formik.errors.soDT}</p>
          )}
          <button className="submit-btn" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
