import React from 'react'
import { connect } from 'react-redux'
import Like from '../Icons/Like.png'
import Dislike from '../Icons/Dislike.png'
import CountryBar from '../Components/CountryBar'

const stateProps = (state) => {
    return {
        rate: state.local
    }
}

const Rate = (props) => {
    let rec_rate = null;
    let death_rate = null;
    if (props.rate) {
        rec_rate = props.rate.data.latest_data.calculated["recovery_rate"] > 20;
        death_rate = props.rate.data.latest_data.calculated["death_rate"] < 5;
    }
    return (
        <div className="col-12 col-md-6"style={{margin:"0 auto"}}>
            <br></br>
            <CountryBar></CountryBar>
            <br></br>
            <div className="row">
                <div className={(rec_rate ? "bg-success" : "bg-danger") + " border border-rounded border-secondary col-6 col-md-4 pt-1 boxall"} style={{margin:"0 auto"}}>
                    <img src={rec_rate ? Like : Dislike} className="card-img-top" alt="..." style={{ width: "100px", height: "100px" }}></img>
                    <div className="card-body">
                        <h5 className="card-title" >Recovery Rate</h5>
                    </div>
                </div>
                <div className={(death_rate ? "bg-success" : "bg-danger") + " border border-rounded border-secondary col-6 col-md-4 pt-1 boxall"} style={{margin:"0 auto"}}>
                    <img src={death_rate ? Like : Dislike} className="card-img-top" alt="..." style={{ width: "100px", height: "100px" }}></img>
                    <div className="card-body">
                        <h5 className="card-title">Death Rate</h5>
                    </div>
                </div>
            </div>
            <br></br>
            
            <h1 className="border rounded border-secondary">TODAY</h1>
            <div className="row" style={{marginTop:"20px"}}>
                <div className="col-5 col-md-4 border-danger boxall" style={{margin:"0 auto",padding:"unset"}}>
                    <div className="card-header text-danger">Confirmed</div>
                    <div className="card-body text-danger">
                        <h5 className="card-title">{props.rate?props.rate.data.today["confirmed"]:null}</h5>
                    </div>
                </div>
                <div className="col-5 col-md-4 border-secondary boxall" style={{margin:"0 auto",padding:"unset"}}>
                    <div className="card-header text-secondary">Deaths</div>
                    <div className="card-body text-secondary">
                        <h5 className="card-title">{props.rate?props.rate.data.today["deaths"]:null}</h5>
                    </div>
                </div>
            </div>
            <br></br>
            <h1 className="border rounded border-secondary">STATS</h1>
        </div >
    )
}

const Info = connect(stateProps, null)(Rate);
export default Info;