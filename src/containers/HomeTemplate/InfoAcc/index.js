import React, { Component } from "react";
import { Tabs } from "antd";
import { Redirect } from "react-router-dom";
import Purchase from "./Purchase/purchase";
import Change from "./Change/Change";
import { actPurchaseHistory } from "./Change/modules/actions";
import { connect } from "react-redux";

const { TabPane } = Tabs;
class InfoAcc extends Component {
  componentDidMount() {
    this.props.fetchData(JSON.parse(localStorage.getItem("User")));
  }
  render() {
    if (!localStorage?.getItem("User")) {
      return <Redirect to="/" />;
    }

    return (
      <div className="info ">
        <h1>YOUR INFORMATION</h1>
        <Tabs tabPosition="top" >
          <TabPane
            className="change animate__animated animate__bounceIn"
            tab={<span>CHANGE YOUR INFORMATION</span>}
            key="1"
          >
            <Change />
          </TabPane>

          <TabPane  className="history animate__animated animate__bounceIn" tab={<span>PURCHASE HISTORY</span>} key="2">
            <Purchase />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (user) => {
      dispatch(actPurchaseHistory(user));
    },
  };
};
export default connect(null, mapDispatchToProps)(InfoAcc);
