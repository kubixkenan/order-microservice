import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,    
} from "reactstrap";
import Header from "components/Headers/Header.js";

import { LoadPanel } from 'devextreme-react/load-panel';

import apiService from "services/apiService";
import Button from "reactstrap/lib/Button";
import angular from "assets/img/theme/angular.jpg";

class Companies extends React.Component {
    id;
    state = {
        id: '',
        companies: [],
        isLoading: true
    };

    componentWillMount() {
        const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        this.id = id;
        var service = new apiService();
        service.get("Company/GetAll", this.dataLoaded);
    }

    setCompany = function(id) {
        
    }

    dataLoaded = data => {
        this.setState({ companies: data.data, isLoading: false });
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
                                            <h3 className=" mb-0">Şirketler</h3>
                                        </div>
                                        <div className="col text-right">
                                                <Button
                                                    color="success"
                                                    href="add-company"
                                                    size="md">
                                                    Yeni Şirket Ekle
                                            </Button>                                                
                                            </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        {this.state.companies.map(function (object, i) {
                                            return (<Col md="4">
                                                <Card className=" shadow" style={{margin: 10}}>
                                                    <CardBody>
                                                        <Row>
                                                            <Col md="9"><img src={"https://commpany.blob.core.windows.net/files/" + object.logo} width="48" height="48" alt="logo" onError={(e)=>{e.target.onerror = null; e.target.src=angular}}/> &nbsp; {object.name}</Col>
                                                            <Col md="1"><Button color="success" disabled={ object.id === localStorage.getItem('companyId') }  onClick={() => {
                                                                localStorage.setItem('companyId', object.id);
                                                                window.location.reload();
                                                            }}>Aktif</Button></Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
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


export default Companies;
