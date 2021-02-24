import React from "react"
import { Link } from "react-router-dom"
import "../shared/RideForms.css"

export default function RideForms () {
    return(
        <div className="container" style={{backgroundColor: "lightgreen"}}>
            <div className="row" >
                <div className="col-4">
                    <Link to="/findride" className="btn btn-primary form-btn">Find Ride</Link>
                </div>
                <div className="col-4">
                    <Link to="/postride" className="btn btn-primary form-btn">Post Ride</Link>
                </div>
                <div className="col-4">
                    <Link to="/requestride" className="btn btn-primary form-btn">Request Ride</Link>
                </div>
            </div>    
        </div>
    )
}