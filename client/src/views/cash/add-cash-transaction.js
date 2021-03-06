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
import SelectBox from 'devextreme-react/select-box';
import DateBox from 'devextreme-react/date-box';

class AddCashTransaction extends React.Component {
    state = {
        entity:{
            id: '00000000-0000-0000-0000-000000000000',
            cashId: '00000000-0000-0000-0000-000000000000',
            transactionDate: new Date(),
            type: 0,
            inCome: 0.0,
            description: '',
            outCome: 0.0,           
            accountCode: ''
        },
        isLoading: false,
        cash: [{
            id: '00000000-0000-0000-0000-000000000000',
            code: '',
            name: ''            
        }]
    };

    componentWillMount() {  
        var service = new apiService();
        service.post("Cash/GetAll", {}, this.dataLoaded);
    }

    dataLoaded = data => {        
        this.setState({ cash: data });
    }

    save() {        
        this.setState({ isLoading: true });
        var api = new apiService();
        api.post("Cash/AddCashTransaction", this.state.entity, this.saveCompleted);
    }

    saveCompleted = data =>{        
        this.setState({ isLoading: false });
    }

    handleChange = event => {
        const isNumber = event.target.type === 'number' || event.target.name === 'type';
        this.setState({ entity : { ...this.state.entity, [event.target.name]: isNumber ? parseFloat(event.target.value) : event.target.value } });
    };

    onValueChanged = event => {        
        this.setState({ entity : { ...this.state.entity, cashId : event.value } });        
    }

    dateChanged = event => {
        this.setState({ entity: {...this.state.entity, transactionDate: event.value}});
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
                                            <h3 className=" mb-0">Yeni Kasa Hareketi</h3>
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
                                                ??ptal
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Kasa Hareketi
                                         </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-code">
                                                            Kasa Se??in
                                                        </label>
                                                        <SelectBox dataSource={this.state.cash}
                                                        
                                                                displayExpr="name"
                                                                valueExpr="id"
                                                                placeholder="Kasa Se??in"
                                                                onValueChanged={this.onValueChanged}
                                                                value={this.state.entity.cashId} />
                                                    </FormGroup>
                                                </Col>   
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-date">
                                                            ????lem Tarihi
                                                        </label>
                                                        <DateBox defaultValue={this.now} type="date" id="input-date" value={this.state.entity.transactionDate} name="transactionDate"  onValueChanged={this.dateChanged} />                                                        
                                                    </FormGroup>
                                                </Col>                                             
                                            </Row>                                           
                                            <Row>  
                                            <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-type">
                                                            Bor?? / Alacak
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-type"
                                                            value={this.state.entity.type}
                                                            onChange={this.handleChange}
                                                            name="type"
                                                            placeholder="Bor??/Alacak"
                                                            type="select">
                                                            <option value="0">Bor??</option>
                                                            <option value="1">Alacak</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>                                          
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-income">
                                                            Bor??
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-income"
                                                            value={this.state.entity.inCome}
                                                            onChange={this.handleChange}
                                                            name="income"
                                                            placeholder="Bor??"
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
                                                            value={this.state.entity.outCome}
                                                            onChange={this.handleChange}
                                                            name="outCome"
                                                            placeholder="Alacak"
                                                            type="number" />
                                                    </FormGroup>
                                                </Col>                                                                                                
                                            </Row>
                                            <Row>
                                                <Col lg="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-description">
                                                            A????klama
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-description"
                                                            name="description"
                                                            value={this.state.entity.description}
                                                            onChange={this.handleChange}
                                                            placeholder="????lem A????klamas??"
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
                                                            value={this.state.entity.accountCode}
                                                            onChange={this.handleChange}
                                                            name="accountCode"
                                                            placeholder="Muhasebe Kodu"
                                                            type="select">
                                                            <option value="100 01">100 01 Merkez Kasa</option>
                                                            <option value="100 02">100 02 ??ube Kasa</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Kayd?? Muhasebele??tir
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

export default AddCashTransaction;
