import React from "react";
import { actInfo } from "./modules/actions";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "./../../../../components/Loader/index";
import swal from "sweetalert";
export default function Change() {
  const formik = useFormik({
    initialValues: {
      taiKhoan: JSON.parse(localStorage.getItem("User"))?.taiKhoan,
      matKhau: "",
      email: JSON.parse(localStorage.getItem("User"))?.email,
      soDT: JSON.parse(localStorage.getItem("User"))?.soDT,
      maNhom: JSON.parse(localStorage.getItem("User"))?.maNhom,
      maLoaiNguoiDung: JSON.parse(localStorage.getItem("User"))
        ?.maLoaiNguoiDung,
      hoTen: JSON.parse(localStorage.getItem("User"))?.hoTen,
    },
    validationSchema: Yup.object({
      matKhau: Yup.string()
        .required("Không Bỏ Trống!")
        .min(8, "Mật khẩu quá ngắn - ít nhất phải 8 ký tự!")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa nhất một số!"),

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
      swal({
        title: "Bạn chắc chắn ?",
        icon: "warning",
        buttons: ["Hủy", "Xác Nhận"],
        dangerMode: true,
      }).then(() => {
        dispatch(actInfo(values));
      });
    },
  });

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.infoReducer.loading);

  if (loading) return <Loader />;
  return (
    <form className="form text-center " onSubmit={formik.handleSubmit}>
      <p>UserName: </p>
      <input
        disabled
        type="text"
        className="name formEntry "
        name="taiKhoan"
        placeholder={JSON.parse(localStorage.getItem("User")).taiKhoan}
      />
      <p>Name: </p>
      <input
        onBlur={formik.handleBlur}
        value={formik.values.hoTen}
        onChange={formik.handleChange}
        type="text"
        placeholder="Name"
        name="hoTen"
        className=" formEntry"
        style={
          formik.errors.hoTen
            ? { outline: "5px ridge #ff013c" }
            : { outline: "none" }
        }
      />
      {formik.errors.hoTen && formik.touched.hoTen && (
        <p className="text-danger">{formik.errors.hoTen}</p>
      )}
      <p>PassWord:</p>
      <input
        onBlur={formik.handleBlur}
        value={formik.values.matKhau}
        onChange={formik.handleChange}
        type="password"
        placeholder="Password"
        className=" formEntry"
        name="matKhau"
        style={
          formik.errors.matKhau
            ? { outline: "5px ridge #ff013c" }
            : { outline: "none" }
        }
      />
      {formik.errors.matKhau && formik.touched.matKhau && (
        <p className="text-danger">{formik.errors.matKhau}</p>
      )}
      <p>Email:</p>
      <input
        onBlur={formik.handleBlur}
        value={formik.values.email}
        onChange={formik.handleChange}
        type="email"
        className=" formEntry"
        placeholder="Email"
        name="email"
        style={
          formik.errors.email
            ? { outline: "5px ridge #ff013c" }
            : { outline: "none" }
        }
      />
      {formik.errors.email && formik.touched.email && (
        <p className="text-danger">{formik.errors.email}</p>
      )}
      <p>Phone Number:</p>
      <input
        value={formik.values.soDT}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="text"
        className=" formEntry"
        placeholder="Phone Number"
        name="soDT"
        style={
          formik.errors.soDT
            ? { outline: "5px ridge #ff013c" }
            : { outline: "none" }
        }
      />
      {formik.errors.soDT && formik.touched.soDT && (
        <p className="text-danger">{formik.errors.soDT}</p>
      )}{" "}
      <br />
      <button className="submit formEntry" type="submit">
        Submit
      </button>
    </form>
  );
}
