import { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Jumbotron } from 'reactstrap'
import Ride from './RenderRide';
import FindRide from './FindRide'
import PostRide from './PostRide'
import RideForms from './RideForms'
import RideRequest from './RideRequestForm'

export default class MiddleComponent extends Component {

    render() {
        return(
            <div>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Find Your Cheapest Ride Here!</h1>
                                <p>We provide rideshare for intercity as well as intracity</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <RideForms/>  
                <Switch>
                <Route path="/findride" component={()=><FindRide rides={this.props.store.rides} findRide={this.props.store.findRide} />} />
                <Route path="/postride" component={()=><PostRide postRide={this.props.store.postRide}/>} />
                <Route path="/requestride" component={()=><RideRequest autoRide={this.props.store.autoRide} autoRideRequest={this.props.store.autoRideRequest}/>} />
                </Switch>
                <div><br/><br/></div>
                <Ride rides={this.props.store.rides} />
            </div>
        )
    }

}