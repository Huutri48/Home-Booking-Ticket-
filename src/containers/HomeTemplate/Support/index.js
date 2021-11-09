import React, { Component } from "react";
import swal from "sweetalert";

export default class Support extends Component {
  handleSubmit(e) {
    e.preventDefault();
    swal({
      title:
        "Xin Cảm Ơn Bạn Đã Phản Hồi Cho Chúng Tôi!",
      icon: "success",
      button: "OK",
    });
    e.target.reset()
  }
  render() {
    return (
      <div className="contact">
        <form
        
          onSubmit={this.handleSubmit}
          className=" animate__animated animate__bounce"
        >
          <div>
            <img
              src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/mail-letter-offer-256.png"
              alt="icon"
            />
          </div>
          <input type="text" placeholder="Name"  required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Topic" required />
          <textarea placeholder="Subject" required  defaultValue={""} minLength="10"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}
