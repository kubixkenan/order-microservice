/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { connect } from "react-redux";
import apiService from "services/apiService";
import Modules from "views/module/index";

class Admin extends React.Component {

  result;
  isDid = false;

  componentWillMount() {
    if (!this.props.auth.isLoggedIn) {
      if (!localStorage.getItem('token')) {
        document.location.href = "/auth";
      }
    }
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {

    var service = new apiService();
    service.getPromised("Modules/GetModules?companyId=" + localStorage.getItem('companyId')).then(x => { return x?.json(); }).then(data => {
      data = data.data;

      if (data) {
        var additionalRoutes = data.map(function (x) {
          return {
            path: "/module/:id",
            name: x.name,
            icon: "ni ni-chart-pie-35 text-primary",
            component: Modules,
            visible: true,
            layout: "/admin"
          };
        });

        routes = routes.concat(additionalRoutes);
      }

      this.result = routes.map((prop, key) => {
        if (prop.layout === "/admin") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return null;
        }
      });

      if (!this.isDid) {
        this.isDid = true;
        this.forceUpdate();
      }
    });
  };



  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    this.getRoutes(routes);
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.result}
            {/* <Redirect from="*" to="/admin/index" /> */}
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Admin);
