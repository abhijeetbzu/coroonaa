import React, { useEffect, useRef, useState } from 'react'
import * as d3 from "d3";
import { connect } from 'react-redux';
import { createOrUpdateAxis } from "../Utilities/MakeAxis";
import makeLabel from "../Utilities/MakeGraphLabel";

const stateToProps = (state) => {
    return {
        plot: state.local
    }
}

const Line = (props) => {
    const [size, setSize] = useState(0)

    var triggerChange = () => {
        setSize(document.documentElement.clientWidth)
    }

    window.addEventListener("resize", triggerChange)

    const line = useRef(null)
    const w = 200;
    const h = 200;

    var dataset1 = [];
    var dataset2 = [];
    var dataset3 = [];
    const dates = [];

    props.plot.data.timeline.map((value) => {
        dataset1.push(value["confirmed"])
        dataset2.push(value["deaths"])
        dataset3.push(value["recovered"])
        dates.push(value["date"])
        return 1
    })

    dataset1.reverse()
    dataset2.reverse()
    dataset3.reverse()
    dates.reverse()

    const total_max = d3.max([d3.max(dataset2), d3.max(dataset1), d3.max(dataset3)])
    const total_min = d3.min([d3.min(dataset2), d3.min(dataset1), d3.min(dataset3)])

    const w_pad = Math.round(w / dataset2.length)

    var height_scale = d3.scaleLinear()
        .domain([0, total_max])
        .range([2, h])

    const points = Object.create(null)

    for (var i = 0; i < dataset2.length; i++) {
        var list_of_points = [];
        list_of_points.push(Math.round(height_scale(dataset1[i])))
        list_of_points.push(Math.round(height_scale(dataset2[i])))
        list_of_points.push(Math.round(height_scale(dataset3[i])))
        points[i * w_pad] = list_of_points;
    }

    function temp(event) {
        const x = event.offsetX;
        const yc = event.pageY;
        const xc = event.pageX;
        if (points[x]) {
            const temp_points = points[x]
            const circles = d3.select("#lineplot").selectAll("circle").data(temp_points).join("circle").attr("cx", x).attr("cy", (d) => h - d).style("display", "inline-block")
            circles.attr("r", "0").call(enter => (enter.transition(circles.transition().duration(200)).attr("r", "5")))
            const wi = document.getElementById("stats_info").getBoundingClientRect().width
            var stats_info = d3.select("#stats_info").style("display", "inline-block")
            stats_info.call(enter => (enter.transition(stats_info.transition().duration(200)).style("left", (xc - wi - 30) + "px").style("top", yc + "px")))
            const offset = x / w_pad;
            const d = [dataset1[offset], dataset2[offset], dataset3[offset]]
            stats_info.selectAll("h5").data([dates[offset]]).join("h5").attr("class", "border-bottom").text(d => d).style("color", "white")
            stats_info.selectAll("text").data(d).join("text").text(d => d).style("color", (d, i) => {
                if (i === 0) {
                    return "rgb(220,53,69)";
                }
                else if (i === 1) {
                    return "rgb(108,117,125)";
                }
                else if (i === 2) {
                    return "rgb(40,167,69)";
                }
            }).style("margin", "0px 5px")

        }

    }





    var drawLine = (w, h, dataset, stroke, path_id, axis_svg_id) => {


        var svg = null;
        if (!(document.getElementById("axis"))) {
            createOrUpdateAxis(total_min, total_max, axis_svg_id, h, line.current, true, true)
        }
        else {
            createOrUpdateAxis(total_min, total_max, axis_svg_id, h, line.current, false, true)
        }

        if (!(document.getElementById("lineplot"))) {

            svg = d3.select(line.current).append("svg").attr(
                "width", w
            ).attr(
                "height", h
            ).attr(
                "id", "lineplot"
            ).attr("class", "border border-secondary rounded box").style("vertical-align", "unset").style("margin","0 auto")

        }
        else {
            svg = d3.select(line.current).select("#lineplot")
        }




        var lineFunc = d3.line().x(
            function (d, i) {
                return i * w_pad;
            }
        ).y(
            function (d, i) {
                return h - Math.round(height_scale(d));
            }
        ).curve(d3.curveCatmullRom)
        var lineFuncinitial = d3.line().x(
            function (d, i) {
                return i * w_pad;
            }
        ).y(
            function (d, i) {
                return h;
            }
        ).curve(d3.curveCatmullRom)

        lineFunc(dataset)

        var path = null
        if (!(document.getElementById(path_id))) {
            path = svg.append("path").attr("stroke", stroke).attr("fill", "none").attr("id", path_id)
        }
        else {
            path = svg.select("#" + path_id)
        }
        path.attr("d", lineFuncinitial(dataset))
        path.call(enter => (enter.transition(path.transition().duration(1000)).attr("d", lineFunc(dataset))))

    }

    var line1 = (w, h, path_id, axis_svg_id) => {
        drawLine(w, h, dataset1, "rgb(220,53,69)", path_id, axis_svg_id)
    }

    var line2 = (w, h, path_id, axis_svg_id) => {
        drawLine(w, h, dataset2, "rgb(108,117,125)", path_id, axis_svg_id)
    }

    var line3 = (w, h, path_id, axis_svg_id) => {
        drawLine(w, h, dataset3, "rgb(40,167,69)", path_id, axis_svg_id)
    }



    useEffect(
        () => {

            line1(w, h, "path_1", "axis_svg")
            line2(w, h, "path_2", "axis_svg")
            line3(w, h, "path_3", "axis_svg")
            const names = ["Confirmed", "Deaths", "Recovered"]
            const c = ["rgb(220,53,69)", "rgb(108,117,125)", "rgb(40,167,69)"]
            const colors = names.map((d, i) => {
                return {
                    name: names[i],
                    color: c[i]
                }
            })

            makeLabel(colors, "info", line.current)

            var makePoints = (id1, id2, id3, svg_id) => {
                if (d3.select("#" + id1).empty()) {
                    const circles = [1, 2, 3]
                    d3.select("#" + svg_id).selectAll("circle").data(circles).join("circle").attr("cx", "0").attr("cy", "0").attr("r", "5")
                        .attr("id", (d, i) => {
                            if (i === 0) {
                                return id1;
                            }
                            else if (i === 1) {
                                return id2;
                            }
                            else if (i === 2) {
                                return id3;
                            }
                        }).style("position", "absolute").attr("fill", (d, i) => {
                            if (i === 0) {
                                return "rgb(220,53,69,0.6)";
                            }
                            else if (i === 1) {
                                return "rgb(108,117,125,0.6)";
                            }
                            else if (i === 2) {
                                return "rgb(40,167,69,0.6)";
                            }
                        }).style("display", "none")
                }
                else {
                    return
                }
            }
            makePoints("p1", "p2", "p3", "lineplot")
            document.getElementById("lineplot").addEventListener("mousemove", temp)
            document.getElementById("lineplot").addEventListener("click", temp)

            if (d3.select("#stats_info").empty()) {
                const l = document.getElementById("lineplot").getBoundingClientRect().left
                const temp_div = d3.select(line.current).append("div").style("position", "absolute").attr("id", "stats_info").style("display", "none").style("z-index", "100")
                temp_div.attr("class", "border border-secondary border-rounded").style("background", "rgb(50,50,50,0.9)").style("left", `${l}px`)

            }
            else {
                d3.select("#stats_info").style("display", "none")
                d3.select("#lineplot").selectAll("circle").style("display", "none")
            }
            const elem = document.getElementById("lineplot")
            const left = window.pageXOffset + elem.getBoundingClientRect().left
            const top = window.pageYOffset + elem.getBoundingClientRect().top
            const side_pad = document.getElementById("axis").getBoundingClientRect().width;
            d3.select("#axis_svg").style("left", `${left - 2 * side_pad}px`)
            d3.select("#axis_svg").style("top", `${top}px`)
            return () => {
                document.getElementById("lineplot").removeEventListener("mousemove", temp)
                document.getElementById("lineplot").removeEventListener("click", temp)
            }


        }, [props.plot, size]
    )

    return (
        <>
            <div ref={line} style={{ margin: "30px auto", position: "unset" }} className="col-12 col-md-6">

            </div>
        </>
    )
}

const LinePlot = connect(stateToProps, null)(Line);

export default LinePlot;