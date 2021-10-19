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
import { CheckBox, DateBox, NumberBox, SelectBox, TextArea, TextBox } from "devextreme-react";
import DataGrid, {
    Column
} from 'devextreme-react/data-grid';


class FormDetail extends React.Component {
    state = {
        formItems: [],
        formValues: []
    };

    title = '';
    postUrl = '';
    getUrl = '';

    componentWillMount() {
        const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        this.id = id;
        var service = new apiService();
        service.get("Forms/GetFormItems?Id=" + id, this.dataLoaded);
        service.get("Forms/Get?Id=" + id, this.dataFormLoaded);
    }

    dataFormLoaded = data => {
        this.title = data.data.name;
        this.postUrl = data.data.saveEndPoint;
        this.getUrl = data.data.getEndPoint;
        this.forceUpdate();
        if(this.getUrl === ''){
            return;
        }
        var service = new apiService();
        service.getDomainPromised(this.getUrl).then(response => {
            if (response && response.status !== 200) {
                if (response && response.status === 401) {
                    //window.location.href = "/auth";
                    return;
                }
                return;
            }
            return response?.json();
        }).then(data => {
            this.setState({ formValues: data });
        });
    }

    dataLoaded = data => {
        this.setState({ isLoading: false, formItems: data.data });
    }

    handleFieldChange = event => {
        this.setState({ fieldType: event.value });
    }

    handleCheckChange = event => {
        this.setState({ isRequired: event.value });
    }

    handleChange = event => {
        const isNumber = event.target.type === 'number';
        this.setState({ [event.target.name]: isNumber ? parseFloat(event.target.value) : event.target.value });
    };

    sendForm = event => {
        var body = {};
        for (var i = 0; i < this.state.formItems.length; i++) {
            var fieldName = this.state.formItems[i].field;
            body[fieldName] = document.getElementsByName(fieldName)[0].value;
        }

        var api = new apiService();
        api.postDomainPromised(this.postUrl, body, '').then(response => {
            if (response && response.status !== 200) {
                if (response && response.status === 401) {
                    //window.location.href = "/auth";
                    return;
                }
                return;
            }
            return response?.json();
        });
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
                            <Card className=" shadow" id="card">
                                <CardHeader className=" bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className=" mb-0">{this.title}</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Button
                                                color="success"
                                                href={"/admin/forms/update/" + this.id}
                                                size="md">
                                                Form Alanlarını Düzenle
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <DataGrid id="gridContainer"
                                            dataSource={this.state.formValues}
                                            columnAutoWidth={true}
                                            visible={this.getUrl !== ''}
                                            showBorders={true}>
                                            {this.state.formItems.map(function (obj, i) {

                                                return <Column key={i} dataField={obj.field} caption={obj.label} allowSorting={false} />;
                                            })}
                                        </DataGrid>
                                    </Row>
                                    <Row>&nbsp;</Row>                                    
                                    <Row style={this.postUrl.length > 0 ? {display:'flex'} : {display:'none'}}>
                                        {this.state.formItems.map(function (obj, i) {
                                            if (obj.fieldType === 'text') {
                                                return <Col lg="6" key={i}>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor={"input-" + obj.field}>
                                                            {obj.label}
                                                        </label>
                                                        <TextBox
                                                            className="form-control-alternative"
                                                            id={"input-" + obj.field}
                                                            placeholder={obj.label}
                                                            name={obj.field}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                            }
                                            else if (obj.fieldType === 'number') {
                                                return <Col lg="6" key={i}>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor={"input-" + obj.field}>
                                                            {obj.label}
                                                        </label>
                                                        <NumberBox
                                                            className="form-control-alternative"
                                                            id={"input-" + obj.field}
                                                            placeholder={obj.label}
                                                            name={obj.field}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            }
                                            else if (obj.fieldType === 'date') {
                                                return <Col lg="6" key={i}>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor={"input-" + obj.field}>
                                                            {obj.label}
                                                        </label>
                                                        <DateBox
                                                            className="form-control-alternative"
                                                            id={"input-" + obj.field}
                                                            placeholder={obj.label}
                                                            name={obj.field} />
                                                    </FormGroup>
                                                </Col>
                                            }
                                            else if (obj.fieldType === 'textarea') {
                                                return <Col lg="6" key={i}>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor={"input-" + obj.field}>
                                                            {obj.label}
                                                        </label>
                                                        <TextArea
                                                            className="form-control-alternative"
                                                            id={"input-" + obj.field}
                                                            placeholder={obj.label}
                                                            name={obj.field} />
                                                    </FormGroup>
                                                </Col>
                                            }
                                        })}
                                    </Row>
                                    
                                    <Row style={this.postUrl.length > 0 ? {display:'flex'} : {display:'none'}}>
                                        <Col lg="12" className="col text-right">
                                            <Button color="success" onClick={e => this.sendForm()}>Gönder</Button>
                                        </Col>
                                    </Row>
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

export default FormDetail;
