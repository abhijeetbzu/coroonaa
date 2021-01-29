import * as d3 from 'd3'

//to be assumed that svg returned from the function is not altered in any way for successfull update

export const createOrUpdateAxis = (min, max, axis_svg_id, h, parent, create, left,top,leftP) => {
    const y_scale = d3.scaleLinear().domain([min, max]).range([h , 5])
    const y_axis = left ? d3.axisLeft() : d3.axisRight();
    y_axis.scale(y_scale).ticks(5).tickFormat((d, i) => {
        var funct = d3.format(".2s")
        if(i!==0)
            return funct(d)
    }).tickPadding(5).tickSizeOuter(0)

    var axis_svg = null;
    var axis = null;
    var side_pad = 0;
    if (create) { //create axis
        axis_svg = d3.select(parent).append("svg").attr(
            "height", h
        ).attr("id", axis_svg_id).style("position","absolute")

        axis = axis_svg.append("g").attr("id", "axis").call(y_axis)

        side_pad = axis_svg.select("g").node().getBoundingClientRect().width
    }
    else { //update axis
        axis_svg = d3.select("#" + axis_svg_id)
        axis = axis_svg.select("g").call(y_axis)
        side_pad = axis_svg.select("g").node().getBoundingClientRect().width
    }

    axis_svg.attr("width", `${2*side_pad}`)
    axis.attr("transform", `translate(${side_pad},0)`)
    
    return axis_svg;
}