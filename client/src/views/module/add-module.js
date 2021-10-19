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


class AddModule extends React.Component {
    state = {
        id: '00000000-0000-0000-0000-000000000000',
        companyId: localStorage.getItem('companyId'),
        name: '',
        icon: '',
        isLoading: false
    };

    save() {
        this.setState({ isLoading: true });
        var api = new apiService();
        api.post("Modules/Create", this.state, this.saveCompleted);
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
                                            <h3 className=" mb-0">Yeni Modül</h3>
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
                                            Yeni Modül
                                         </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-name">
                                                            Modül Adı
                                                            <br />
                                                            &nbsp;
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-name"
                                                            placeholder="Modül Adı"
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
                                                            Modül Simgesi
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

export default AddModule;
