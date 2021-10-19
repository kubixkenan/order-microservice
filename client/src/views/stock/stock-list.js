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
    Column
} from 'devextreme-react/data-grid';
import { LoadPanel } from 'devextreme-react/load-panel';

import { connect } from "react-redux";
import apiService from "services/apiService";

class StockList extends React.Component {
    state = {
        stocks: [],
        isLoading: true
    };

    componentWillMount() {  
        var service = new apiService();
        service.get("Stock/GetStockGrid", this.dataLoaded);
    }
    
    dataLoaded = data => {
        this.setState({stocks: data, isLoading: false});
    }

    calculateCellValue = data => {
        return data.stockName + " Adet: " + data.quantity + " Alış Fiyatı: " + data.takePrice + " Satış Fiyatı: " + data.salePrice;
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
                                            <h3 className=" mb-0">Stoklar</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Button
                                                color="success"
                                                href="add-stock"
                                                size="md">
                                                Stok Kartı Ekle
                                            </Button>
                                            <Button
                                                color="success"
                                                href="add-stock-transaction"
                                                size="md">
                                                Stok Hareketi Ekle
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <DataGrid id="gridContainer"
                                        dataSource={this.state.stocks}
                                        columnAutoWidth={true}
                                        showBorders={true}
                                        onRowPrepared={(e) => {                                            
                                            if(e.rowType === "data"){
                                                if(e.data.type === 1){
                                                    e.rowElement.style.color = "#FF0000";                                                    
                                                    e.rowElement.style.fontWeight = "bold";
                                                }
                                                else{
                                                    e.rowElement.style.color = "#008000";  
                                                    e.rowElement.style.fontWeight = "bold";                                                  
                                                }
                                            }
                                        }}
                                        >
                                        <Column dataField="stockId" groupIndex={0} caption="Stok Kodu" allowSorting={false} calculateCellValue={this.calculateCellValue}/>
                                        <Column dataField="transactionDate" caption="İşlem Tarihi" dataType="datetime" format="dd.MM.yyyy HH:mm" />
                                        <Column dataField="description" caption="İşlem Açıklaması" />       
                                        <Column dataField="type" caption="Giriş/Çıkış" calculateCellValue={(data) => {
                                            if(data.type === 0){
                                                return "Giriş";
                                            }
                                            else{
                                                return "Çıkış";
                                            }
                                        }} />
                                        <Column dataField="tranQuantity" caption="İşlem Adedi" />
                                        <Column dataField="price" caption="İşlem Fiyatı" format="₺0#,###.00" />                                                                        
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
                    position={ {of: '#gridContainer'}}                    
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
    stock: state.stock,
  });

export default connect(mapStateToProps, {})(StockList);
