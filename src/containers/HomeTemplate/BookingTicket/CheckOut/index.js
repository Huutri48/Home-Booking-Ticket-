import React, { useState } from "react";
import { actBooking } from "./modules/action";
import { useSelector, useDispatch } from "react-redux";
import { listTicket } from "./listTicket";

import swal from "sweetalert";

function CheckOut(props) {
  const { danhSachGheDangDat } = useSelector((state) => state.listRoomReducer);
  const { data } = useSelector((state) => state.bookingTicketReducer);

  const dispatch = useDispatch();
  const listTicket1 = new listTicket();
  const handleOnchange = () => {
    listTicket1.maLichChieu = props.id;
    listTicket1.danhSachVe = danhSachGheDangDat;
    listTicket1.taiKhoanNguoiDung = JSON.parse(
      localStorage.getItem("User")
    ).taiKhoan;
    if (listTicket1.danhSachVe.length > 0) {
      dispatch(actBooking(listTicket1, props.history));
    } else {
      swal({
        title: "Vui Lòng Chọn Ghế!",
        icon: "warning",
        timer: 10000,
      });
    }
  };
  const total = () => {
    let total = danhSachGheDangDat?.reduce((tongTien, item, index) => {
      return (tongTien += item.giaVe);
    }, 0);

    return total?.toLocaleString();
  };

  return (
    <>
      <table className="table text-center">
        <thead>
          <tr className="headerTable">
            <th>Số ghế</th>
            <th>Giá tiền</th>
          </tr>
        </thead>
        <tbody className="table-info-booking">
          {danhSachGheDangDat?.map((item, index) => {
            return (
              <tr key={index}>
                <th style={{ fontWeight: "bold" }}>{item.tenGhe}</th>
                <th style={{ fontWeight: "bold" }}>
                  {item.giaVe.toLocaleString()}
                </th>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>Tổng cộng</th>
            <th>{total()} VNĐ</th>
          </tr>
          <tr></tr>
        </tfoot>
      </table>
      <div className="text-center">
        <button
          className="button2 text-black"
          style={{
            width: "initial",
            fontSize: "10px",
            padding: "10px",
            lineHeight: "initial",
            fontWeight: "bolder",
          }}
          onClick={handleOnchange}
        >
          Đặt vé
        </button>
      </div>
    </>
  );
}

export default CheckOut;
