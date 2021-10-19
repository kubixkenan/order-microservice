import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Button,
    Col,
    Form,
    FormGroup,
    Input
} from "reactstrap";
import Header from "components/Headers/Header.js";
import apiService from "services/apiService";
import { LoadPanel } from 'devextreme-react/load-panel';


class AddCustomer extends React.Component {
    state = {
        id: '00000000-0000-0000-0000-000000000000',
        code: '',
        name: '',
        idNumber: '',
        phone: '',
        email: '',
        address: '',
        accountCode: '',        
        isLoading: false
    };

    save() {        
        this.setState({ isLoading: true });
        var api = new apiService();
        api.post("Customer/AddCustomer", this.state, this.saveCompleted);
    }

    saveCompleted = data =>{        
        this.setState({ isLoading : false });
    }

    handleChange = event => {
        const isNumber = event.target.type === 'number';
        this.setState({ [event.target.name]: isNumber ? parseFloat(event.target.value) : event.target.value });
    };

    render() {
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className=" mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className=" col">
                            <Card className=" shadow" id="card">
                                <CardHeader className=" bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className=" mb-0">Yeni Cari Kartı</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Button
                                                color="success"
                                                onClick={e => this.save()}
                                                size="md">
                                                Kaydet
                                            </Button>
                                            <Button
                                                color="danger"
                                                href="/admin/customers"
                                                size="md">
                                                İptal
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Cari Kartı
                                         </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-code">
                                                            Cari Kodu
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-code"
                                                            placeholder="Cari Kodu"
                                                            name="code"
                                                            value={this.state.code}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-name">
                                                            Cari Adı
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-name"
                                                            placeholder="Cari Adı"
                                                            name="name"
                                                            value={this.state.name}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-idNumber">
                                                            Kimlik / Vergi No
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-idNumber"
                                                            placeholder="Kimlik / Vergi No"
                                                            name="idNumber"
                                                            value={this.state.idNumber}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-phone">
                                                            Telefon
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-phone"
                                                            placeholder="Telefon"
                                                            name="phone"
                                                            value={this.state.phone}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>                                            
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email">
                                                            E-Mail
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            placeholder="E-Mail"
                                                            name="email"
                                                            value={this.state.email}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>                                               
                                            </Row>
                                            <Row>
                                                <Col lg="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-address">
                                                            Adres
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-address"
                                                            name="address"
                                                            value={this.state.address}
                                                            onChange={this.handleChange}
                                                            placeholder="Adres"
                                                            type="textarea" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>                         
                                            <Row>
                                                <Col lg="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-accountCode">
                                                            Muhasebe Kodu
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-accountCode"
                                                            value={this.state.accountCode}
                                                            onChange={this.handleChange}
                                                            name="accountCode"
                                                            placeholder="Muhasebe Kodu"
                                                            type="select">
                                                            <option value="120 01">120 01 Test Cari</option>
                                                            <option value="120 02">120 02 Test Cari 2</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Alış Kaydını Muhasebeleştir
                                         </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                            
                                            </Row>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
                <LoadPanel
                    shadingColor="rgba(0,0,0,0.4)"
                    position={{ of: '#card' }}
                    visible={this.state.isLoading}
                    showIndicator={true}
                    shading={true}
                    showPane={true}
                    closeOnOutsideClick={false}
                />
            </>
        );
    }
}

export default AddCustomer;
