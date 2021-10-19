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

import DataGrid, {
    Column,
    Summary,
    GroupItem
} from 'devextreme-react/data-grid';
import { LoadPanel } from 'devextreme-react/load-panel';

import { connect } from "react-redux";
import apiService from "services/apiService";

class CustomerList extends React.Component {
    state = {
        customers: [],
        isLoading: true
    };

    componentWillMount() {
        var service = new apiService();
        service.get("Customer/GetCustomerGrid", this.dataLoaded);
    }

    dataLoaded = data => {
        this.setState({ customers: data, isLoading: false });
    }

    calculateCellValue = data => {
        return data.customerName + " Telefon: " + data.phone + " E-Mail: " + data.email;
    }

    calculateSelectedRow = options => {
        if (options.name === 'totsummary') {
            if (options.summaryProcess === 'start') {
                options.totalValue = 0;
            } else if (options.summaryProcess === 'calculate') {
                options.totalValue = options.totalValue + (options.value.inCome - options.value.outCome);
            }
        }
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
                                                <h3 className=" mb-0">Cari</h3>
                                            </div>
                                            <div className="col text-right">
                                                <Button
                                                    color="success"
                                                    href="add-customer"
                                                    size="md">
                                                    Yeni Cari Ekle
                                            </Button>
                                                <Button
                                                    color="success"
                                                    href="add-customer-transaction"
                                                    size="md">
                                                    Cari Hareketi Ekle
                                            </Button>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <DataGrid id="gridContainer"
                                            dataSource={this.state.customers}
                                            columnAutoWidth={true}
                                            showBorders={true}
                                            onRowPrepared={(e) => {                                                
                                                if (e.rowType === "data") {
                                                    if (e.data.type === 1) {
                                                        e.rowElement.style.color = "#FF0000";
                                                        e.rowElement.style.fontWeight = "bold";
                                                    }
                                                    else {
                                                        e.rowElement.style.color = "#008000";
                                                        e.rowElement.style.fontWeight = "bold";
                                                    }
                                                }
                                            }}
                                        >
                                            <Column dataField="customerId" groupIndex={0} caption="Cari Kodu" allowSorting={false} calculateCellValue={this.calculateCellValue} />
                                            <Column dataField="transactionDate" caption="İşlem Tarihi" dataType="datetime" format="dd.MM.yyyy HH:mm" />
                                            <Column dataField="description" caption="İşlem Açıklaması" />
                                            <Column dataField="type" caption="Borç/Alacak" calculateCellValue={(data) => {
                                                if (data.type === 0) {
                                                    return "Borç";
                                                }
                                                else {
                                                    return "Alacak";
                                                }
                                            }} />
                                            <Column dataField="inCome" caption="Borç" format="₺0#,###.00" />
                                            <Column dataField="outCome" caption="Alacak" format="₺0#,###.00" />
                                            <Column dataField="total" caption="Bakiye" format="₺0#,###.00" calculateCellValue={(data) => {
                                                return (data.inCome > data.outCome) ? (data.inCome - data.outCome) : (data.outCome - data.inCome);
                                            }} />                                            
                                            <Summary calculateCustomSummary={this.calculateSelectedRow}>
                                                <GroupItem
                                                    column="inCome"
                                                    name="incomesummary"
                                                    valueFormat="₺0#,###.00"
                                                    summaryType="sum"
                                                    displayFormat={'Borç: {0}'}
                                                    showInGroupFooter={true}
                                                    showInColumn="inCome" />
                                                <GroupItem
                                                    column="outCome"
                                                    name="outcomesummary"
                                                    valueFormat="₺0#,###.00"
                                                    summaryType="sum"
                                                    showInGroupFooter={true}
                                                    displayFormat={'Alacak: {0}'}
                                                    showInColumn="outCome" />
                                                <GroupItem                                                    
                                                    name="totsummary"
                                                    valueFormat="₺0#,###.00"
                                                    summaryType="custom"
                                                    showInGroupFooter={true}
                                                    displayFormat={'Bakiye: {0}'}
                                                    showInColumn="total" />
                                            </Summary>
                                        </DataGrid>
                                        <Row>
                                            <Col mg="14">

                                            </Col>
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

    const mapStateToProps = state => ({
        customers: state.customers,
    });

    export default connect(mapStateToProps, { })(CustomerList);
