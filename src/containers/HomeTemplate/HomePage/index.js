import React, { Component, Suspense } from "react";
import HomeSlider from "./HomeSlider/index";
import HomeCinemaComplex from "./HomeCinemaComplex/index";
import HomeDownApp from "./HomeDownApp/index";
import ListMoviePage from "./../ListMoviePage/index";
import Loader from "./../../../components/Loader/index";
export default class HomePage extends Component {
  render() {
    return (
      <Suspense fallback={<Loader />}>
        <HomeSlider  />
        <ListMoviePage />
        <HomeCinemaComplex />
        <HomeDownApp />
      </Suspense>
    );
  }
}
