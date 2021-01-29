import React from 'react'
import Line from './Components/Line'
import Info from './Components/Info'
import Countries from './Components/Countries'
import Global from './Components/Global'
import { connect } from 'react-redux'
import Footer from './Components/Footer'
import Header from './Components/Header'

const stateToProps = (state) => {
    return {
        country: state.local
    }
}

const Main = (props) => (
        <div className="container-fluid">
            <Global></Global>
            <div className="row">
                <Countries></Countries>
            </div>
            {
                (props.country && props.country.data.timeline.length>0)?
                (
                    <>
                        <div className="pt-3">
                            <Info></Info>
                        </div>
                        <div className="row">
                            <Line></Line>
                        </div>
                        <Footer></Footer>
                    </>
                )
                :
                (
                    <div className="border rounded" style={{background:"rgb(33,37,41)",color:"white",marginTop:"100px"}}>
                        <h1>NO DATA FOUND</h1>
                    </div>
                )
            }
    </div>
)

const Home = connect(stateToProps, null)(Main);
export default Home;