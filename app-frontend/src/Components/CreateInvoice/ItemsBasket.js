import React, {useState, useEffect} from "react";
import "shards-ui/dist/css/shards.min.css";
import "./invoice.scss";
import {moneyFormatter, inverseMoney} from "../../Utils/Money";
import CurrencyInput from 'react-currency-input-field';



import {
    FormInput, Button, FormRadio, Container, Row, Col,
    Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem,
    Card, CardHeader, CardTitle, CardBody,
    ListGroup,
    ListGroupItem,
    Badge
} from "shards-react";

function ItemsBasket( {cartFunction, cartItems }) {
    const initialState = {
        uid: Date.now(),
        itemName: "",
        itemQuantity: 0,
        itemUnitPrice: 0,
        itemSubTotal: 0,
    }

 
    useEffect(()=>{
        if(cartItems.length<1) cartFunction([initialState]);
    }, [cartItems]);

    const updateNameInput = (item, value)=>{
        cartFunction( prevState =>(
            prevState.map( prev =>
                prev.uid === item.uid ? { ...prev, itemName: value} : prev)
            ))
    };

    const updateQuantityInput = (item, value)=>{
        cartFunction( prevState =>(
            prevState.map( prev =>
                prev.uid === item.uid ? { ...prev, itemQuantity: value} : prev)
            ))
    };

    const updatePriceInput = (item, value)=>{

        cartFunction( prevState =>(
            prevState.map( prev =>
                prev.uid === item.uid ? { ...prev, itemUnitPrice: value} : prev)
            ))
    };

    const computeSubTotal = (item)=>{
        return moneyFormatter.format(item.itemQuantity * item.itemUnitPrice);
    }


    const rowItem = (item)=>
    <>
                <ListGroupItem>
                    <FormInput placeholder="Item description"
                        className="standard-input"
                        onChange={(e)=>{updateNameInput(item, e.target.value)}}
                        >
                    </FormInput>
                    <FormInput placeholder="Quantity"
                        className="standard-input"
                        type="number"
                        onChange={(e)=>{updateQuantityInput(item, e.target.value)}}
                        >
                    </FormInput>
                    <CurrencyInput
                        className="standard-input"
                        placeholder="Please enter a number"
                        defaultValue={1000}
                        decimalsLimit={2}
                        onValueChange={(value, name) => {
                            updatePriceInput(item, value)
                            console.log(value, name)}}
                        />
                    <Badge placeholder="Amount ($)"
                        className="standard-input"
                        type="number"
                        theme="warning"
                        >
                           {computeSubTotal(item)}
                    </Badge>
                    <Button onClick={()=>{ removeRow(item)}}>
                        erase
                    </Button>
                </ListGroupItem>
        </>
        const insertEmptyRow = ()=>{
            cartFunction([...cartItems, initialState])
        }
        const removeRow = (item)=>{
            cartFunction(cartItems.filter(x => x.uid!== item.uid))
        };

    const simpleTable = ()=>{
        return(
            <Container className="demo-table">
                <Row>
                    <Col> 1 header</Col>
                    <Col> 2 header</Col>
                    <Col> 3 header</Col>
                </Row>
            </Container>
        )
    }

   
    return (
        <div className="basket-div">
               <div className="new-basket-item">
                <Button onClick={()=>{insertEmptyRow()}}>
                    Insert item
                </Button>
                <Container>
                <Row>
                    <Col> Description</Col>
                    <Col>Units</Col>
                    <Col>Price per unit</Col>
                </Row>
                </Container>
            </div>
        
            <ListGroup className="basket-table">
                {cartItems.map(x=>rowItem(x))}
            </ListGroup>
            <div className="table-1">
            {simpleTable()}
            </div>
        </div>
    )
}

export default ItemsBasket;