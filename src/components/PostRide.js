import React, { Component } from 'react';
import { Form, FormGroup, Input,Button, Label } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import { Control, Form, Errors } from 'react-redux-form';
import google from 'google'

class PostRide extends Component {

    constructor(props) {
        super(props);

        const tomorrowDate = this.tomorrowDate();

        this.state = {
            src: "",
            dst: "",
            rideDate: tomorrowDate,
            rideTime: "06:00"
        }
    }

    tomorrowDate = () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrow_date = tomorrow.getFullYear() + "-" + this.padZero(parseInt(tomorrow.getMonth())+1) + "-" + this.padZero(tomorrow.getDate())
        return tomorrow_date
    }

    padZero = e => {
        const remainder = parseInt(parseInt(e) / 10)
        if(remainder !== 0) return e
        else return "0"+e
    }

    handleSubmit = (event) => {
        
        this.props.postRide(this.state);
        event.preventDefault();

        const tomorrowDate = this.tomorrowDate()
        
        this.setState({
            src: "",
            dst: "",
            rideDate: tomorrowDate,
            rideTime: "06:00"
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    

    

    render() {
        return(
            <div className="container">
                <div className="row">
                    <h1>Post a trip</h1>  
                </div>
                <hr style={{width:'15%', margin:'50px 0px 50px 0px'}} />

                <div className="row">
                    <h2>Itinerary</h2>
                </div>
                    
                <div className="row">
                    <p>Your origin, destination, and stops you're willing to make along the way.</p>
                </div>
                    
                <div className="row">
                    <Form onSubmit={this.handleSubmit}>
                        
                        <FormGroup>
                            <Label>Origin</Label>
                            <Input type="text" id="src" name="src"  placeholder="Enter an Origin"
                                onChange={this.handleChange} value={this.state.src} required/>  
                        </FormGroup>
                        <FormGroup>
                            <Label>Destination</Label>
                            <Input type="text" id="dst" name="dst" placeholder="Enter a destination"
                                onChange={this.handleChange} value={this.state.dst} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Date</Label>
                            <Input type="date" name="rideDate" min={this.state.rideDate} onChange={this.handleChange} 
                                value={this.state.rideDate} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Time</Label>
                            <Input type="time" name="rideTime" onChange={this.handleChange} 
                                value={this.state.rideTime} required />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Post</Button>
                        
                    </Form>
                </div>
            </div>
        );
    }
}

export default PostRide;