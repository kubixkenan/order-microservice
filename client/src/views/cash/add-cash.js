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


class AddCash extends React.Component {
    state = {
        id: '00000000-0000-0000-0000-000000000000',        
        code: "",
        name: "",
        description: "",
        inCome: 0,
        outCome: 0,
        accountCode: "",
        isLoading: false
    };

    save() {        
        this.setState({ isLoading: true });
        var api = new apiService();
        api.post("Cash/AddCash", this.state, this.saveCompleted);
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
                                            <h3 className=" mb-0">Yeni Kasa Kartı</h3>
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
                                                href="/admin/cash"
                                                size="md">
                                                İptal
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Kasa Kartı
                                         </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-code">
                                                            Kasa Kodu
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-code"
                                                            placeholder="Kasa Kodu"
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
                                                            Kasa Adı
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-name"
                                                            placeholder="Kasa Adı"
                                                            name="name"
                                                            value={this.state.name}
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
                                                            htmlFor="input-description">
                                                            Açıklama
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-description"
                                                            name="description"
                                                            value={this.state.description}
                                                            onChange={this.handleChange}
                                                            placeholder="Kasa Açıklaması"
                                                            type="textarea" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>                                            
                                            <Row>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-inCome">
                                                            Borç
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-inCome"
                                                            value={this.state.inCome}
                                                            onChange={this.handleChange}
                                                            name="inCome"
                                                            placeholder="Borç"
                                                            type="number" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-outCome">
                                                            Alacak
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-outCome"
                                                            value={this.state.outCome}
                                                            onChange={this.handleChange}
                                                            name="outCome"
                                                            placeholder="Alacak"
                                                            type="number" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
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
                                                            placeholder="Kasa Muhasebe Kodu"
                                                            type="select">
                                                            <option value="100 01">100 01 Merkez Kasa</option>
                                                            <option value="100 02">100 02 Şube Kasa</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Kasa Kaydını Muhasebeleştir
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

export default AddCash;
