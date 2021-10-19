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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { signIn } from "../../actions/authActions";
import $ from "jquery";


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
  };

  closePopup(){
    $('#modal-notification').hide();
  }

  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.signIn(this.state.userName, this.state.password, this.loginResult);
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth.isLoggedIn) {
      document.location.href = "/admin/index";
    }
  }

  loginResult(isSuccess, errMessage) {
    if (isSuccess) {
      document.location.href = '/admin/index';
    }
    else {
      $('#modal-notification').show();
    }
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small></small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" name="userName" value={this.state.userName} autoComplete="new-email" onChange={this.inputChanged} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Şifre" type="password" name="password" value={this.state.password} autoComplete="new-password" onChange={this.inputChanged} />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={this.handleSubmit}>
                    Giriş
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <div className="modal" id="modal-notification" tabIndex="-1" role="dialog" aria-labelledby="modal-notification" aria-hidden="true">
          <div className="modal-dialog modal-danger modal-dialog-centered modal-" role="document">
            <div className="modal-content bg-gradient-danger">

              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">Hata</h6>
                <button type="button" className="close closeModal" data-dismiss="modal" aria-label="Close" onClick={this.closePopup}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="modal-body">

                <div className="py-3 text-center">
                  <i className="ni ni-fat-remove ni-5x"></i>
                  <h4 className="heading mt-4">Hata!</h4>
                  <p>Kullanıcı / Şifre Hatalı!</p>
                </div>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-link text-white ml-auto closeModal" data-dismiss="modal" onClick={this.closePopup}>Kapat</button>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signIn })(Login);