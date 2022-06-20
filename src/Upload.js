import React, {Component} from "react";
import {Button, Form, Label, FormGroup, FormText, Input} from "reactstrap"
import FileBase64 from 'react-file-base64';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, solid, regular, brands } from '@fortawesome/free-solid-svg-icons' // <-- import styles to be used
import './upload.css';
import '../package.json';
//import { useId } from "react/cjs/react.production.min";

class Upload extends Component{

    constructor(props){
        super(props);

    this.state = {
        confirmation : "",
        isLoading : "",
        files : "",
        Invoice : "",
        Amount : "",
        InvoiceDate : "",
        Vendor : "",
        Description : ""
    }
    this.handleChange= this.handleChange.bind(this);
}
    handleChange(event){
        event.preventDefault();
        const target = event.target
        const value =target.value
        const name  =target.name

        this.setState({name:value});

    }
    async handleSubmit(event){
        event.preventDefault();
        this.setState({confirmation : "Uploading....."})
    }
    async getFiles(files){
        this.setState({isLoading : "Extracting Data",
    files : files});

    
    const UID= Math.round(1+ Math.random() * (1000000-1)); 
    
    var date={
        fileExt:"png",
        imageID: UID,
        folder:UID,
        img : btoa(this.state.files[0])
    };
    await fetch('<Your Landing >',
    {
        method : "POST",
        headers :{
            Accept: "application/json",
            "Content-Type":"application.json"
        },
        body: JSON.stringify(date)

    }
    );

    let targetImage = UID+".png";
    const response = await fetch(<YOUR FUNCTION>,
    {
        method : "POST",
        headers :{
            Accept: "application/json",
            "Content-Type":"application.json"
        },
        body: JSON.stringify(targetImage)

    }
    );
    this.setState({confirmation : ""})
    const OCRBody =await response.json();
    console.log("OCRBody: " + OCRBody);

    this.setState({Amount :OCRBody.body[0] })
    this.setState({Invoice :OCRBody.body[1] })
    this.setState({InvoiceDate :OCRBody.body[2] })

}
    render() {
        const processing  = "Processing Document";
        return (<div className="row">
            <div className="col-6 offset-3">
                <Form onSubmit= {this.handleSubmit} >
                    <FormGroup>
                        <h3 className="text-danger">{processing}</h3>
                        <h6>Upload Invoice</h6>
                        <FormText color = "muted">PNG, JPG</FormText>
                        <div className="form-group files color">
                        <FileBase64
                        multiple ={true}
                        onDone= {this.getFiles.bind(this)}>
                        </FileBase64>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                        <h6>Invoice</h6>
                        <Input 
                        type ="text"
                        name = "Invoice"
                        id="Invoice"
                        value= {this.state.Invoice}
                        onChange = {this.handleChange}>
                        </Input>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                          <h6>Amount ($)</h6>  
                        </Label>
                        <Input 
                        type ="text"
                        name = "Amount"
                        id="Amount"
                        value= {this.state.Amount}
                        onChange = {this.handleChange}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                          <h6>Date</h6>  
                        </Label>
                        <Input 
                        type ="text"
                        name = "Date"
                        id="Date"
                        value= {this.state.InvoiceDate}
                        onChange = {this.handleChange}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                          <h6>Vendor</h6>  
                        </Label>
                        <Input 
                        type ="text"
                        name = "Vendor"
                        id="Vendor"
                        value= {this.state.Vendor}
                        onChange = {this.handleChange}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                          <h6>Description</h6>  
                        </Label>
                        <Input 
                        type ="text"
                        name = "Description"
                        id="Description"
                        value= {this.state.Description}
                        onChange = {this.handleChange}>
                        </Input>
                    </FormGroup>
                    <Button className="btn btn-lg btn-block btn-success">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>);
    }



}
export default Upload;
