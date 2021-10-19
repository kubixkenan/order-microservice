import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Button
} from "reactstrap";
import Header from "components/Headers/Header.js";

import { LoadPanel } from 'devextreme-react/load-panel';

import apiService from "services/apiService";

class Modules extends React.Component {
    id;
    loadedId;
    state = {
        id: '',
        forms: [],
        isLoading: true
    };

    componentDidUpdate() {        
        const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        this.id = id;
        if (this.id !== this.loadedId) {            
            var service = new apiService();
            service.get("Forms/GetAll?moduleId=" + this.id, this.dataLoaded);
        }
    }

    componentWillMount() {
        const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        this.id = id;
        if (this.id !== this.loadedId) {                        
            var service = new apiService();
            service.get("Forms/GetAll?moduleId=" + this.id, this.dataLoaded);
        }
    }

    dataLoaded = data => {
        this.setState({ forms: data.data, isLoading: false });
        this.loadedId = this.id;
    }
    render() {
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className=" mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className=" col">
                            <Card className=" shadow">
                                <CardHeader className=" bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className=" mb-0">Modül Formları</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Button
                                                color="success"
                                                href={"/admin/forms/add-form/" + this.id}
                                                size="md">
                                                Yeni Form Ekle
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        {this.state.forms.map(function (object, i) {
                                            return (<Col md="4">
                                                <a href={"/admin/forms/detail/" + object.id}>
                                                    <Card className=" shadow" style={{margin: 10}}>
                                                        <CardBody>
                                                            <Row>
                                                                <Col md="12"><span class={object.icon}></span>&nbsp; {object.name}</Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </a>
                                            </Col>);
                                        })}
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
                <LoadPanel
                    shadingColor="rgba(0,0,0,0.4)"
                    position={{ of: '#gridContainer' }}
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


export default Modules;
