import React, { Component } from "react";
import { Table, Button, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faThumbsDown,
  faThumbsUp,
  faImage,
  faMoneyCheckAlt,
  faSearchDollar,
} from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(){
  super()
  this.state = { isLoading: false, invoices: [], Des: '' };
  this.approveInvoice = this.approveInvoice.bind(this);
  };
  async componentDidMount() {
    const response = await axios.get("/invoices");
    //const body = await response.json();
    this.setState({ invoices: response.data, isLoading: false });
    //console.log(this.state.invoices);
  }

  async approveInvoice(id, Des) {
  //  let idnum =  parseInt(id);
   let response = await axios.put("/invoices", {
        "resource": "",
        // "path": "",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
        "httpMethod": "PUT",
        "queryStringParameters": {
          "id": id,
          "Des": Des,
        }
    });
   // let invoiceresponse = await response.json();
    //let updatedInvoices = [...this.state.invoices].filter((i) => i.id !== id);
    let invoices = [...this.state.invoices];
    // console.log((invoices.filter((i) => i.id === id))[0].Des);
      (invoices.filter((i) => i.id === id))[0].Des = response.data.Des;
    this.setState({invoices});
    // this.setState({ invoices: body, isLoading: false });
  }

  render() {
    const isLoading = this.state.isLoading;
    
    if (isLoading) return <div>Loading...</div>;
    
    return (
      <div className="container border border-secondary rounded center">
        <div className="row">
          <div className="col-12">
            <h4>Pending Invoices - The Test Company</h4>
          </div>
        </div>
        <div className="row">
          <div className=".col-xs-12 center text-center">
            <Table dark responsive striped bordered hover>
              <thead>
                <tr>
                  <th scope="row">Vendor</th>
                  <th scope="row">Amount</th>
                  <th scope="row">Invoice #</th>
                  <th scope="row">Date</th>
                  <th scope="row" colSpan="4">
                    Actions
                  </th>
                  <th scope="row">Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.invoices.length !== 0 ? (
                  
                
                  this.state.invoices.map((invoice) => (
                    
                      <tr key={invoice.id}>
                        <td>{invoice.Vendor}</td>
                        <td>{invoice.Amount}</td>
                        <td>{invoice.Invoice}</td>
                        <td>{invoice.Date}</td>
                
                
                        <td>
                          <Button
                            className="btn btn-lg btn-success"
                            // value = {invoice.id, "Approved"}
                             onClick={() => this.approveInvoice(invoice.id, "Approved")}
                          >
                            <FontAwesomeIcon icon={faThumbsUp} /> OK{" "}
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="btn btn-lg btn-danger"
                            onClick={() => this.approveInvoice(invoice.id, "Declined")}
                          >
                            <FontAwesomeIcon icon={faThumbsDown} /> NotOk{" "}
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="btn btn-lg btn-info"
                            onClick={() => this.approveInvoice(invoice.id, "Give discount by 50%")}
                          >
                            <FontAwesomeIcon icon={faMoneyCheckAlt} /> 50%{" "}
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="btn btn-lg btn-warning"
                            onClick={() => this.approveInvoice(invoice.id, "Need extra information")}
                          >
                            <FontAwesomeIcon icon={faSearchDollar} /> ??{" "}
                          </Button>
                        </td>
                        <td>{invoice.Des}</td>
                      </tr>
                      ))
                  
                ): (<tr><td colSpan="9">All caught up!</td></tr>)
              }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
