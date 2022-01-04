import React, {useState, useEffect} from "react";
import "shards-ui/dist/css/shards.min.css";
import "./invoice.scss";

import ItemsBasket from "./ItemsBasket";

import { Row, Col } from 'antd';


import {
    FormInput, Button, FormRadio, 
    Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem,
    Card, CardHeader, CardTitle, CardBody, 
} from "shards-react";

function CreateInvoice() {

    const [togg, setToggle] = useState(false);
    const [finance, setFinance] = useState("Zero days");
    const [cartItems, setCart] = useState([]);

    const simpleTable = ()=>{
        return(
                <Row>
                    <Col> 1 header</Col>
                    <Col> 2 header</Col>
                </Row>
              )
    };

    const learningTab = ()=>{
        return(
            <>
            <Row>
                <Col span={24}>col</Col>
                </Row>
                <Row>
                <Col span={12}>col-12</Col>
                <Col span={12}>col-12</Col>
            </Row>
            <Row>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
            </Row>
            <Row>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
            </Row>
            </>
        )
    }


    console.log(cartItems);
    return (
        <div className="create-inv-box">
            {learningTab()}
            <div>
            <Dropdown open={togg} toggle={()=>setToggle(!togg)}>
                <DropdownToggle theme="success">Dropdown</DropdownToggle>
                <DropdownMenu>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div>
            <Card className="invoice-card">
                <CardTitle className="invoice-card-header">
                    Buyer Information
                </CardTitle>
                <CardBody className="invoice-card-body">
                    <div className="standard-text-box">
                        Please file the required information for the buyer.
                    </div>
                    <div className="invoice-input-boxes">

                        <FormInput placeholder="Name"
                            className="standard-input">
                        </FormInput>
                        <FormInput className="standard-input"
                            placeholder="email"
                        >
                        </FormInput>

                    </div>
                </CardBody>
            </Card>
            <Card className="invoice-card">
                <CardTitle className="invoice-card-header">
                    Purchase Details
                </CardTitle>
                <CardBody className="invoice-card-body">
                    <div className="standard-text-box">
                        Please add the products or services to be invoiced.
                    </div>
                    <div className="invoice-input-boxes">
                        <ItemsBasket cartFunction={setCart} cartItems = {cartItems}></ItemsBasket>
                    </div>
                </CardBody>
            </Card>
            <Card className="invoice-card">
                <CardTitle className="invoice-card-header">
                    Financing Terms
                </CardTitle>
                <CardBody className="invoice-card-body">
                    <div className="standard-text-box">
                        Financing this transaction means you'll be getting the funds in the
                        next business day, even though the buyer will be paying in 1 days.
                        This also means we'll need to perform a risk assessment of the buyer. You can only finance transactions for buyers that were prequalified. You can see a buyer's qualification status on the Buyer's page.
                        
                        You will be paying an additional factoring fee of 0% for this transaction if approved by us.
                    </div>
                        <div className="financing-toggle">
                        <FormRadio
                        name="fruit"
                        checked={finance === "0 days"}
                        onChange={() => {
                            setFinance("0 days");
                        }}
                        >
                        0 days
                        </FormRadio>
                        <FormRadio
                        name="fruit"
                        checked={finance === "30 days"}
                        onChange={() => {
                            setFinance("30 days");
                        }}
                        >
                        30 days
                        </FormRadio>
                        <FormRadio
                        name="fruit"
                        checked={finance === "45 days"}
                        onChange={() => {
                            setFinance("45 days");
                        }}
                        >
                        45 days
                        </FormRadio>
                        </div>
                </CardBody>
            </Card>
            <Card className="invoice-card">
                <CardTitle className="invoice-card-header">
                    Order Summary
                </CardTitle>
                <CardBody className="invoice-card-body">
                    <div className="standard-text-box">
                        Your customer will be invoiced for $400 over a period of 15 days.
                        Your financing costs are $6 dollars for this transactions.
                    </div>
                    
                </CardBody>
            </Card>
        </div>
    )
};

export default CreateInvoice;