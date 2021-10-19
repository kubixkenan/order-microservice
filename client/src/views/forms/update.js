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
import { CheckBox, SelectBox } from "devextreme-react";
import DataGrid, {
    Column
} from 'devextreme-react/data-grid';


class FormUpdate extends React.Component {
    state = {
        id: '00000000-0000-0000-0000-000000000000',
        formId: (window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]),
        field: '',
        label: '',
        fieldType: '',
        isRequired: false,
        isLoading: false,
        formItems: []
    };

    componentWillMount() {
        const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        this.id = id;
        var service = new apiService();
        service.get("Forms/GetFormItems?Id=" + id, this.dataLoaded);
    }

    dataLoaded = data => {
        this.setState({ isLoading: false, formItems: data.data });
    }

    save() {
        this.setState({ isLoading: true });
        var api = new apiService();
        api.post("Forms/CreateFormFields", this.state.formItems, this.saveCompleted);
    }

    addForm() {
        this.setState({
            formItems: [...this.state.formItems, {
                id: '00000000-0000-0000-0000-000000000000',
                formId: this.state.formId,
                field: this.state.field,
                label: this.state.label,
                fieldType: this.state.fieldType,
                isRequired: this.state.isRequired
            }]
        });
    }

    removeFormItem(data) {
        var index = this.state.formItems.findIndex((x) => x.field === data.field);
        this.state.formItems.splice(index, 1);
        var arr = this.state.formItems;
        this.setState({ formItems: arr });        
    }

    saveCompleted = data => {
        this.setState({ isLoading: false });
        window.location.reload();
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

    cellRender = data => {
        return (<Button color="danger" onClick={e => this.removeFormItem(data.data)}>Sil</Button>);
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
                                            <h3 className=" mb-0">Form Alanı Ekle</h3>
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
                                            Form Alanlarını Düzenle
                                         </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-field">
                                                            Alan Adı
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-field"
                                                            placeholder="Alan Adı"
                                                            name="field"
                                                            value={this.state.field}
                                                            onChange={this.handleChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-label">
                                                            Etiket
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-label"
                                                            placeholder="Form Alanında Geçicek Etiket"
                                                            name="label"
                                                            value={this.state.label}
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
                                                            htmlFor="input-fieldType">
                                                            Alan Tipi
                                                        </label>
                                                        <SelectBox id="input-fieldType"
                                                            dataSource={[{ ID: 'text', Name: 'Metin' }, { ID: 'number', Name: 'Sayısal' }, { ID: 'date', Name: 'Tarih' }, { ID: 'textarea', Name: 'Metin Alanı (Geniş)' }, { ID: 'label', Name: 'Etiket' }]}
                                                            className="form-control-alternative"
                                                            displayExpr="Name"
                                                            valueExpr="ID"
                                                            value={this.state.fieldType}
                                                            onValueChanged={this.handleFieldChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-isRequired">
                                                            <br />&nbsp;
                                                            <br />&nbsp;
                                                            Zorunlu Alan &nbsp;
                                                        </label>
                                                        <CheckBox
                                                            className="form-control-alternative"
                                                            id="input-isRequired"
                                                            name="isRequired"
                                                            value={this.state.isRequired}
                                                            onValueChanged={this.handleCheckChange} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="12" className="text-right">
                                                    <Button
                                                        color="success"
                                                        onClick={e => this.addForm()}
                                                        size="md">
                                                        Ekle
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                    <Row>&nbsp;</Row>
                                    <Row>
                                        <DataGrid id="gridContainer"
                                            dataSource={this.state.formItems}
                                            columnAutoWidth={true}
                                            showBorders={true}>
                                            <Column dataField="field" caption="Alan" allowSorting={false} />
                                            <Column dataField="fieldType" caption="Alan Tipi" allowSorting={false} />
                                            <Column dataField="label" caption="Etiket" allowSorting={false} />
                                            <Column dataField="isRequired" caption="Zorunlu Alan" allowSorting={false} />
                                            <Column caption="" cellRender={this.cellRender} />
                                        </DataGrid>
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

export default FormUpdate;
