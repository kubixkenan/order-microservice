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


class AddForm extends React.Component {
    state = {
        id: '00000000-0000-0000-0000-000000000000',
        moduleId: (window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]),
        name: '',
        getEndPoint: '',
        saveEndPoint: '',
        icon: '',
        isLoading: false
    };

    save() {
        this.setState({ isLoading: true });
        var api = new apiService();
        api.post("Forms/Create", this.state, this.saveCompleted);
    }

    saveCompleted = data => {
        this.setState({ isLoading: false });
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
                                            <h3 className=" mb-0">Yeni Form</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Button
                                                color="success"
                                                onClick={e => this.save()}
                                                size="md">
                                                Kaydet
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Yeni Form
                                         </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-name">
                                                            Form Adı
                                                            <br />
                                                            &nbsp;
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-name"
                                                            placeholder="Form Adı"
                                                            name="name"
                                                            value={this.state.name}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-icon">
                                                            Form Simgesi
                                                            <br />
                                                            <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/foundation/icons.html" target="blank">Simgeler için tıklayın...</a>
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-icon"
                                                            placeholder="Simge Seçimi"
                                                            name="icon"
                                                            value={this.state.icon}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-getEndPoint">
                                                            Alma Adresi
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-getEndPoint"
                                                            placeholder="Alma Adresi"
                                                            name="getEndPoint"
                                                            value={this.state.getEndPoint}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-saveEndPoint">
                                                            Kaydetme Adresi
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-saveEndPoint"
                                                            placeholder="Kaydetme Adresi"
                                                            name="saveEndPoint"
                                                            value={this.state.saveEndPoint}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
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

export default AddForm;
