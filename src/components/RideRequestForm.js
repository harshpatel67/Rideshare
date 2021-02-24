import React, { Component } from 'react'
import { Form, FormGroup, Input,Button, Label } from 'reactstrap';

class RideRequest extends Component {

    constructor(props){
        super(props)

        const tomorrowDate = this.tomorrowDate()

        this.state = {
            pickupAddress: "",
            pickupCity: "",
            destAddress: "",
            destCity: "",
            isRideTwoWay: false,
            rideDate: tomorrowDate,
            rideTime: "06:00",
            returnDate: tomorrowDate,
            returnTime: "06:00"
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

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.checked
        })
    }

    sendRequest = e => {
        e.preventDefault();

        // Inserting the request into database
        this.props.autoRideRequest({ rideDetail:this.state })

        const tomorrowDate = this.tomorrowDate()

        // Setting back to the original state
        this.setState({
            pickupAddress: "",
            pickupCity: "",
            destAddress: "",
            destCity: "",
            isRideTwoWay: false,
            rideDate: tomorrowDate,
            rideTime: "06:00",
            returnDate: tomorrowDate,
            returnTime: "06:00"
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <h1>Enter Ride Details</h1>  
                </div>
                <hr style={{width:'15%', margin:'50px 0px 50px 0px'}} />

                <div className="row">
                    <Form onSubmit={this.sendRequest}>
                        
                        <h4>Pickup Details</h4>
                        
                        <FormGroup>
                            <Label>Address</Label>
                            <Input type="text" name="pickupAddress" placeholder="Address" onChange={this.updateInput} value={this.state.pickupAddress} required />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label>City</Label>
                            <Input type="text" name="pickupCity" placeholder="City" onChange={this.updateInput} value={this.state.pickupCity} required />
                        </FormGroup>
                        
                        <h4>Destination Detail</h4>
                        
                        <FormGroup>
                            <Label>Address</Label>
                            <Input type="text" name="destAddress" placeholder="Address" onChange={this.updateInput} value={this.state.destAddress} required />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label>City</Label>
                            <Input type="text" name="destCity" placeholder="City" onChange={this.updateInput} value={this.state.destCity} required />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label>
                            Do you need a return ride as well?</Label>
                            <Input type="checkbox" name="isRideTwoWay" onChange={this.handleChange} checked={this.state.isRideTwoWay} style={{marginLeft:'5px'}}/>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label>Date of Ride</Label>
                            <Input type="date" name="rideDate" min={this.state.rideDate} onChange={this.updateInput} value={this.state.rideDate} required />
                        </FormGroup>

                        <FormGroup>
                            <Label>Time of Ride</Label>
                            <Input type="time" name="rideTime" onChange={this.updateInput} value={this.state.rideTime} required />
                        </FormGroup>
                        
                        {
                            this.state.isRideTwoWay ?
                            
                                <FormGroup>
                                    <Label>Return Ride Date</Label>
                                    <Input type="date" name="returnDate" min={this.state.rideDate} onChange={this.updateInput} value={this.state.returnDate} required />
                                    <Label>Return Ride Time</Label>
                                    <Input type="time" name="returnTime" onChange={this.updateInput} value={this.state.returnTime} required />
                                </FormGroup>
                            
                            : null
                        }
                        <FormGroup>
                            <Button type="submit" color="primary">Request Ride</Button>
                        </FormGroup>
                
                    </Form>
                </div>
            </div>
        )
    }
}

export default RideRequest
