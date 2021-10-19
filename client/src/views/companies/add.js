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
import FileUploader from 'devextreme-react/file-uploader';

class AddCompany extends React.Component {
    state = {
        id: '00000000-0000-0000-0000-000000000000',
        name: '',
        description: '',
        webSite: '',
        email: '',
        logo: '',
        isLoading: false
    };

    save() {
        this.setState({ isLoading: true });
        var api = new apiService();
        api.post("Company/CreateCompany", this.state, this.saveCompleted);
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
                                            <h3 className=" mb-0">Yeni Şirket</h3>
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
                                            Yeni Şirket
                                         </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-name">
                                                            Şirket Adı
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-name"
                                                            placeholder="Şirket Adı"
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
                                                            htmlFor="input-description">
                                                            Şirket Tanımı
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-description"
                                                            placeholder="Şirket Tanımı"
                                                            name="description"
                                                            value={this.state.description}
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
                                                            htmlFor="input-webSite">
                                                            Web Site
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-webSite"
                                                            placeholder="Web Site"
                                                            name="webSite"
                                                            value={this.state.webSite}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
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
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-logo">
                                                            Logo
                                                        </label>
                                                        <FileUploader selectButtonText="Logo Seçin" labelText="" accept="image/*" uploadMode="instantly" uploadUrl="https://localhost:44330/api/Company/UploadLogo"
                                                            onUploaded={(e) => {
                                                                if (e.request.status === 200) {
                                                                    var fileName = JSON.parse(e.request.response).fileName;
                                                                    this.setState({ logo: fileName });
                                                                }
                                                            }}
                                                        />
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

export default AddCompany;
