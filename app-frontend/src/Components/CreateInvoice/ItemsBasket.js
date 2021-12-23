import React, {useState, useEffect} from "react";
import "shards-ui/dist/css/shards.min.css";
import "./invoice.scss";



import {
    FormInput, Button, FormRadio, Container, Row, Col,
    Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem,
    Card, CardHeader, CardTitle, CardBody,
    ListGroup,
    ListGroupItem
} from "shards-react";

function ItemsBasket() {
    const initialState = {
        uid: Date.now(),
        itemName: "",
        itemQuantity: 0,
        itemUnitPrice: 0,
        itemSubTotal: 0,
    }
    const [listItems, setItems] = useState([{
        uid: 1,
        itemName: "",
        itemQuantity: 0,
        itemUnitPrice: 0,
        itemSubTotal: 0,
    }]);

    useEffect(()=>{
        if(listItems.length<1) setItems([initialState]);
    }, [listItems]);


    const rowItem = (item)=>
    <>
                <ListGroupItem>
                    <FormInput placeholder="Item description"
                        className="standard-input"
                        onChange={(e)=>{updateFields(item.uid, "pass", e.target.value)}}
                        >
                    </FormInput>
                    <FormInput placeholder="Quantity"
                        className="standard-input"
                        type="number"
                        >
                    </FormInput>
                    <FormInput placeholder="Unit price ($)"
                        className="standard-input"
                        type="number"
                        >
                    </FormInput>
                    <FormInput placeholder="Amount ($)"
                        className="standard-input"
                        type="number"
                        >
                    </FormInput>
                    <Button onClick={()=>{ removeRow(item)}}>
                        erase
                    </Button>
                </ListGroupItem>
        </>
        const insertEmptyRow = ()=>{
            setItems([...listItems, initialState])
        }
        const removeRow = (item)=>{
            setItems(listItems.filter(x => x.uid!== item.uid))
        };

        const updateFields = (uid, field, text)=>{
            const copyItems = listItems;


            setItems(listItems.map( previousItem=> previousItem.uid === uid ? {...previousItem, itenName: text}: previousItem)
            )
        }
    
    return (
        <div className="basket-div">
               <div className="new-basket-item">
                <Button onClick={()=>{insertEmptyRow()}}>
                    Insert item
                </Button>
            </div>
            <ListGroup className="basket-table">
                {listItems.map(x=>rowItem(x))}
            </ListGroup>
        </div>
    )
}

export default ItemsBasket;