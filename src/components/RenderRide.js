import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

    function RenderRide({ ride }) {
        return(
            <Card>
                <CardBody>
                    <CardText style={{color:'blue', fontWeight:'bold'}}>{ride.src} to {ride.dst}</CardText>
                    
                    <CardText style={{fontWeight:'bold'}}> Leaving: {ride.rideDate} at {ride.rideTime}</CardText>
                    <CardText style={{fontWeight:'bold'}}> Returning: {ride.rideDate} at {ride.rideTime}</CardText>

                    <br/>

                    <CardText style={{color:'GrayText'}}> Pickup: {ride.src}</CardText>
                    <CardText style={{color:'GrayText'}}> Dropoff: {ride.dst}</CardText>
                </CardBody>
            </Card>
        );
    }

    const Ride = (props) => {

        const ride = props.rides.rides.map((ride) => {
            return (
                
                <div key={ride._id} className="col-12 ">
                    <RenderRide ride={ride} />
                    <hr style={{width:'15%', margin:'20px 0px 20px 0px'}} />
                </div>
                
            );
        });

        if (props.rides.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        {/*<Loading />*/}
                    </div>
                </div>
            );
        }
        else if (props.rides.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.rides.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container">
                    <div className="row">
                        <h1>Available Rides</h1>  
                    </div>
                    <hr style={{width:'15%', margin:'50px 0px 50px 0px'}} />
                    <div className='row'>
                        {ride}
                    </div>
                </div>
            );
    }

export default Ride;