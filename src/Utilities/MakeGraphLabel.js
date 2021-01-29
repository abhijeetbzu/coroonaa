import * as d3 from 'd3'

export default (colors, id, parent) => {
    if (document.getElementById(id))
        return
    const svg = d3.select(parent).append("svg").attr("height", "100").attr("id", id).style("vertical-align","top").attr("class","col-12").style("margin","0 auto")

    svg.selectAll("circle").data(colors).join("circle").attr("cx", "20").attr("cy", (d, i) => {
        return (3 * i) * 10 + 20;
    }).attr("r", "5").attr("fill", (d) => {
        return d.color
    })

    svg.selectAll("text").data(colors).join("text").text((d) => {
        return d.name
    }).attr("x", "40").attr("y", (d, i) => {
        return (3 * i) * 10 + 25;
    }).attr("fill", (d) => {
        return d.color
    })
}