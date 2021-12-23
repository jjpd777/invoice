import logo from './logo.svg';
import './App.css';
import "shards-ui/dist/css/shards.min.css";
import CreateInvoice from "./Components/CreateInvoice/index"


import {
  FormInput, Button, FormRadio, Container, Row, Col,
  Dropdown, DropdownToggle,
  DropdownMenu, DropdownItem
} from "shards-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CreateInvoice />
      </header>
    </div>
  );
}

export default App;
