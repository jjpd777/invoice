import React, {useState, useEffect} from "react";
import "shards-ui/dist/css/shards.min.css";
import "./invoice.scss";
import {moneyFormatter, inverseMoney} from "../../Utils/Money";


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
        const x = inverseMoney(value);
        cartFunction( prevState =>(
            prevState.map( prev =>
                prev.uid === item.uid ? { ...prev, itemUnitPrice: x} : prev)
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
                    <FormInput placeholder="Unit price ($)"
                        className="standard-input"
                        value = {moneyFormatter.format(item.itemUnitPrice)}
                        onChange={(e)=>{
                            const temp = e.target.value.split("$").join("").split(".").join("")
                            const checkInt = /^\d+$/.test(temp);
                            console.log(checkInt);
                            console.log("Target", e.target.value)
                            if(checkInt) {
                                updatePriceInput(item, e.target.value)
                            }

                            }}
                        type="text"
                        >
                    </FormInput>
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

   
    return (
        <div className="basket-div">
               <div className="new-basket-item">
                <Button onClick={()=>{insertEmptyRow()}}>
                    Insert item
                </Button>
            </div>
            <ListGroup className="basket-table">
                {cartItems.map(x=>rowItem(x))}
            </ListGroup>
        </div>
    )
}

export default ItemsBasket;