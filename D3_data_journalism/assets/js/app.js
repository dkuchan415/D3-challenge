// @TODO: YOUR CODE HERE!

//set up svg info

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Pull in csv file

d3.csv("/assets/data/data.csv").then(function(healthdata) {
    console.log(healthdata);
    
    //smokes vs. obesity

    healthdata.forEach(function(data) {
        //how to map and change to number?
        data.smokes = +data.smokes;
        data.obesity = +data.obesity;
        console.log("Smokes:", data.smokes);
        console.log("Obesity:", data.obesity);
    });

    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(healthdata, d => d.smokes)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([16, d3.max(healthdata, d => d.obesity)])
        .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //append axes to the chart

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    var circles = chartGroup.selectAll("circle")
        .data(healthdata)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.smokes))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", "15")
        .attr("fill", "grey")
        .attr("opacity", ".5");

    var text = chartGroup.selectAll(null)
    .data(healthdata)
    .enter()
    .append('text')
    .text(d => d.abbr)
    .attr('color', 'black')
    .attr('font-size', 12)
    .attr('x', d => xLinearScale(d.smokes))
    .attr("y", d => yLinearScale(d.obesity))
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle");

    // Y axis text

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "0em")
    .attr("class", "axisText")
    .attr("font-size", 25)
    .text("Obesity (%)");

    //x Axis text

    chartGroup.append("text")
    .attr("y", height + margin.top +20)
    .attr("x", (width / 2))
    .attr("dx", "0em")
    .attr("class", "axisText")
    .attr("font-size", 25)
    .text("Smoking (%)")
});