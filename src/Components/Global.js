import React, { useEffect } from 'react'
import { fetchGlobal } from "../Action/action";
import { connect } from 'react-redux'

function dispatchStateToProps(state) {
    return { globe: state.global }
}

var GlobeUI = (props) => {
    useEffect(() => {
        props.fetchGlobal("timeline")
    }, [])

    return props.globe && (
        <div className="row p-3">
            <div className="text-white bg-danger col-12 col-md-3 col-lg-2 boxall" style={{margin:"10px auto"}}>
                <div className="card-header">Confirmed</div>
                <div className="card-body">
                    <h4 className="card-title">{props.globe.data[0]["confirmed"]}</h4>
                </div>
            </div>
            <div className="card text-white bg-success col-12 col-md-3 col-lg-2 boxall" style={{margin:"10px auto"}}>
                <div className="card-header">Recovered</div>
                <div className="card-body">
                    <h4 className="card-title">{props.globe.data[0]["recovered"]}</h4>
                </div>
            </div>
            <div className="card text-white bg-secondary col-12 col-md-3 col-lg-2 boxall" style={{margin:"10px auto"}}>
                <div className="card-header">Deaths</div>
                <div className="card-body">
                    <h4 className="card-title">{props.globe.data[0]["deaths"]}</h4>
                </div>
            </div>
            <div className="card text-white bg-info col-12 col-md-4 col-lg-2 boxall" style={{margin:"10px auto"}}>
                <div className="card-header">Active</div>
                <div className="card-body">
                    <h4 className="card-title">{props.globe.data[0]["active"]}</h4>
                </div>
            </div>
            <div className="card text-white bg-warning col-12 col-md-4 col-lg-2 boxall" style={{margin:"10px auto"}}>
                <div className="card-header">New Confirmed</div>
                <div className="card-body">
                    <h4 className="card-title">{props.globe.data[0]["new_confirmed"]}</h4>
                </div>
            </div>
        </div>
    )
}

const globe = connect(dispatchStateToProps, { fetchGlobal })(GlobeUI)

export default globe;