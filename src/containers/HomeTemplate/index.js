import React from "react";
import Navbar from "./_components/Navbar";
import { Route } from "react-router-dom";

import Footer from "./_components/Footer/index";

function LayoutHome(props) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}

export default function HomeTemplate(props) {
  const { exact, path, Component } = props;
  return (
    <LayoutHome>
      <Route exact={exact} path={path} component={Component} />
    </LayoutHome>
  );
}
