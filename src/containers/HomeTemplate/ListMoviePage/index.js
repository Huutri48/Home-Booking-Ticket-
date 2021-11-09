import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { actFetchListMovie } from "./modules/actions";
import { connect } from "react-redux";
import Loader from "./../../../components/Loader/index";
import LazyLoad from 'react-lazyload';
class ListMoviePage extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  renderListMovie() {
    const { data } = this.props;

    if (data?.length !== 0) {
      return data?.map((movie, index) => {
        return (
          <div
            className="col-xl-2 col-lg-3 col-md-4 col-6 text-center colMovie"
            key={index}
          >
            <MovieItem key={movie.maPhim} movie={movie} />
            
          </div>
        );
      });
    }
    return <h1 className="text-white">Movie is updating</h1>;
  }
  render() {
    const { loading } = this.props;
    if (loading) return <Loader />;
    return (
      <LazyLoad>
        <div className="movieItem pt-5  ">
          <div className="container">
            <h1 className="mb-5   ">Listmovie</h1>
            <div className="mb-4  ">
              <button
                id="dangchieu"
                className=" button1 active  me-3 me-sm-4 me-lg-5 mb-3 mb-sm-0"
                onClick={() => {
                  this.props.dangChieu();
                  document
                    .getElementById("sapchieu")
                    .classList.remove("active");
                  document.getElementById("dangchieu").classList.add("active");
                }}
              >
                Now Showing
              </button>
              <button
                id="sapchieu"
                className="button1 "
                onClick={() => {
                  this.props.sapChieu();
                  document.getElementById("sapchieu").classList.add("active");
                  document
                    .getElementById("dangchieu")
                    .classList.remove("active");
                }}
              >
                Coming Soon
              </button>
            </div>

            <div className="row movieScroll">
              {this.renderListMovie()}
            </div>
          </div>
        </div>
      </LazyLoad>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.listMovieReducer.loading,
    data: state.listMovieReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(actFetchListMovie());
    },
    dangChieu: () => {
      dispatch({
        type: "DangChieu",
      });
    },
    sapChieu: () => {
      dispatch({
        type: "SapChieu",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListMoviePage);
