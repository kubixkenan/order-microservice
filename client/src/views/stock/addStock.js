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


class AddStock extends React.Component {
    state = {
        id: '00000000-0000-0000-0000-000000000000',
        code: '',
        name: '',
        description: '',
        quantity: 0,
        takePrice: 0,
        salePrice: 0,
        critical: 0,
        accountCode: '',
        isLoading: false
    };

    save() {        
        this.setState({ isLoading: true });
        var api = new apiService();
        api.post("Stock/AddStock", this.state, this.saveCompleted);
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
                                            <h3 className=" mb-0">Yeni Stok Kartı</h3>
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
                                                href="/admin/stock"
                                                size="md">
                                                İptal
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Stok Kartı
                                         </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-code">
                                                            Stok Kodu
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-code"
                                                            placeholder="Stok Kodu"
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
                                                            Stok Adı
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-name"
                                                            placeholder="Stok Adı"
                                                            name="name"
                                                            value={this.state.name}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>                                            
                                            <Row>
                                                <Col lg="3">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-quantity">
                                                            Adet
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-quantity"
                                                            value={this.state.quantity}
                                                            onChange={this.handleChange}
                                                            name="quantity"
                                                            placeholder="Stok Adedi"
                                                            type="number" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="3">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-takePrice">
                                                            Alış Fiyatı
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-takePrice"
                                                            value={this.state.takePrice}
                                                            onChange={this.handleChange}
                                                            name="takePrice"
                                                            placeholder="Alış Fiyatı"
                                                            type="number" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="3">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-salePrice">
                                                            Satış Fiyatı
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-salePrice"
                                                            placeholder="Satış Fiyatı"
                                                            name="salePrice"
                                                            value={this.state.salePrice}
                                                            onChange={this.handleChange}
                                                            type="number" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="3">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-critical">
                                                            Kritik Stok Miktarı
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-critical"
                                                            value={this.state.critical}
                                                            onChange={this.handleChange}
                                                            name="critical"
                                                            placeholder="Kritik Stok Miktarı"
                                                            type="number" />
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
                                                            <option value="153 01" selected="selected">153 01 Test Malı</option>
                                                            <option value="153 02">153 02 Testo Malı</option>
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

export default AddStock;
