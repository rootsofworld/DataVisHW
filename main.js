
let svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.01);

let x1 = d3.scaleBand()
            .padding(0.005);

let y = d3.scaleLinear()
        .rangeRound([height, 0]);

var z = d3.scaleOrdinal().range(["#f5c500","#b9abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00","#eac6a8","#f6dbcc"]);

years = [96,97,98,99,100,101,102,103,104];
x0.domain(years);
ages = [6,7,8,9,10,11,12,13,14,15];
x1.domain(ages).rangeRound([0, x0.bandwidth()]);
y.domain([20,60]);

g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d) { return "translate(" + x0(d.year) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return d.data; })
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.age); })
      .attr("y", function(d) { return y(d.total); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.total); })
      .attr("fill", function(d) { return z(d.age); });

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0))
      .text("學年度");

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("WEIGHT");



  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(ages)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });



  legend.append("rect")
      .attr("x", width)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d + "歲"; });

