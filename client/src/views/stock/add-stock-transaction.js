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

class AddStockTransaction extends React.Component {
    state = {
        entity:{
            id: '00000000-0000-0000-0000-000000000000',
            stockId: '00000000-0000-0000-0000-000000000000',
            transactionDate: new Date(),
            type: 0,
            quantity: 0,
            description: '',
            price: 0,           
            accountCode: ''
        },
        isLoading: false,
        stocks: [{
            id: '00000000-0000-0000-0000-000000000000',
            code: '',
            name: '',
            description: '',
            quantity: 0,
            takePrice: 0,
            salePrice: 0,
            criticalPrice: 0,
            accountCode: '',
            isLoading: false
        }]
    };

    componentWillMount() {  
        var service = new apiService();
        service.get("Stock/GetStocks", this.dataLoaded);
    }

    dataLoaded = data => {        
        this.setState({ stocks: data });
    }

    save() {        
        this.setState({ isLoading: true });
        var api = new apiService();
        api.post("Stock/AddStockTransaction", this.state.entity, this.saveCompleted);
    }

    saveCompleted = data =>{        
        this.setState({ isLoading: false });
    }

    handleChange = event => {
        const isNumber = event.target.type === 'number' || event.target.name === 'type';
        this.setState({ entity : { ...this.state.entity, [event.target.name]: isNumber ? parseFloat(event.target.value) : event.target.value } });
    };

    onValueChanged = event => {        
        this.setState({ entity : { ...this.state.entity, stockId : event.value } });        
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
                                            <h3 className=" mb-0">Yeni Stok Hareketi</h3>
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
                                                ??ptal
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Stok Hareketi
                                         </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-code">
                                                            Stok Se??in
                                                        </label>
                                                        <SelectBox dataSource={this.state.stocks}
                                                        
                                                                displayExpr="name"
                                                                valueExpr="id"
                                                                placeholder="Stok Se??in"
                                                                onValueChanged={this.onValueChanged}
                                                                value={this.state.entity.stockId} />
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
                                                            Giri?? / ????k????
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-type"
                                                            value={this.state.entity.type}
                                                            onChange={this.handleChange}
                                                            name="type"
                                                            placeholder="Giri??/????k????"
                                                            type="select">
                                                            <option value="0">Giri??</option>
                                                            <option value="1">????k????</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>                                          
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-quantity">
                                                            Giri??/????k???? Adedi
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-quantity"
                                                            value={this.state.entity.quantity}
                                                            onChange={this.handleChange}
                                                            name="quantity"
                                                            placeholder="Giri??/????k???? Adedi"
                                                            type="number" />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-price">
                                                            Giri??/????k???? Fiyat??
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-price"
                                                            value={this.state.entity.price}
                                                            onChange={this.handleChange}
                                                            name="price"
                                                            placeholder="Giri??/????k???? Fiyat??"
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
                                                            <option value="153 01">153 01 Test Mal??</option>
                                                            <option value="153 02">153 02 Testo Mal??</option>
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

export default AddStockTransaction;
