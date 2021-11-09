import "./index.scss";
import { useEffect, Suspense, lazy } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { RoutesHome } from "./routes";

import { useDispatch } from "react-redux";
import { actTrySignIn } from "containers/HomeTemplate/RegisterPage/Signin/modules/actions";
import Loader from "./components/Loader/index";

import 'animate.css';
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RegisterComponent = lazy(() =>
  import("containers/HomeTemplate/RegisterPage")
);
const PageNotFound = lazy(() => import("containers/PageNotFound"));
function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actTrySignIn(props.history));
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {RoutesHome()}
        <Route path="/register" component={RegisterComponent} />
        <Route path="" component={PageNotFound} />
      </Switch>
    </Suspense>
  );
}

export default withRouter(App);
