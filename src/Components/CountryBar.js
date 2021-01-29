import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import * as d3 from 'd3'

const stateToProps = (state) => {
    return {
        c_info: state.local
    }
}

const HorzBar = (props) => {
    const [size, setSize] = useState(0);
    var triggerResize = () => {
        setSize(document.documentElement.clientWidth)
    }
    window.addEventListener("resize", triggerResize);

    const plot = useRef(null);

    var dataset = []

    if (props.c_info.data.timeline.length !== 0) {
        dataset.push(props.c_info.data.timeline[0]["confirmed"])
        dataset.push(props.c_info.data.timeline[0]["recovered"])
        dataset.push(props.c_info.data.timeline[0]["deaths"])
        dataset.push(props.c_info.data.timeline[0]["active"])
        dataset.push(props.c_info.data.timeline[0]["new_confirmed"])
    }

    var svg = null



    useEffect(() => {
        if (!document.getElementById("c_bar")) {
            svg = d3.select(plot.current).append("div").style("width", "60%").style("height", "100%").attr("id", "c_bar").style("margin", "0 auto")
        }
        else
            svg = d3.select(plot.current)
                .select("div")


        var ele = document.getElementById("c_bar")



        var width = ele.getBoundingClientRect().width;
        var x = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([0, width > d3.max(dataset) ? d3.max(dataset) : width])

        svg.selectAll("div").data(dataset).join("div").style(
            "width", 0).style("background", (d, i) => {
                if (i === 0) {
                    return "rgb(220,53,69)"
                }
                else if (i === 1) {
                    return "rgb(40,167,69)"
                }
                else if (i === 2) {
                    return "rgb(108,117,125)"
                }
                else if (i === 3) {
                    return "rgb(23,162,184)"
                } else if (i === 4) {
                    return "rgb(255,193,7)"
                }
            }).text(d => d).style("margin-bottom", "5px").attr("class", "border border-secondary rounded")
            .call(enter => (
                enter.transition(svg.transition().duration(1000)).style("width", (d) => {
                    return `${x(d)}px`
                })
            ))
    }, [size, props.c_info])

    return (
        <div ref={plot}>
        </div>
    )
}

const CountryBar = connect(stateToProps, null)(HorzBar);
export default CountryBar; 