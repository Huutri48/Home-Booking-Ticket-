import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import img404 from "./../../assets/img/404.png";

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="page404">
        <section className="section-404 padding-top padding-bottom">
          <div className="container">
            <div className="thumb-404">
              <img className="img-fluid" src={img404} alt={404} />
            </div>
            <h3 className="title">Oops.. looks like you got lost :( </h3>

            <NavLink className="nav-link" to="/">
              <button className="button1">
                Back To Home
                <i className="fa fa-arrow-right ms-3" aria-hidden="true" />
              </button>
            </NavLink>
          </div>
        </section>
      </div>
    );
  }
}
