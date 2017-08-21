var Bar = function(element, data) {
	var elementMeasurements = element.getBoundingClientRect();
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = elementMeasurements.width - margin.left - margin.right,
	height = elementMeasurements.height - margin.top - margin.bottom;

	var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
	var y = d3.scaleLinear().rangeRound([height, 0]);

	var svg = d3.select(element).append("svg")
		.attr("width", elementMeasurements.width - 6)
		.attr("height", elementMeasurements.height - 6);

	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	x.domain(data.map(function(d) { return d.letter; }));
	y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

	g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	g.append("g")
		.attr("class", "axis axis--y")
		.call(d3.axisLeft(y).ticks(10, "%"))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Frequency");

	g.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.letter); })
		.attr("y", function(d) { return y(d.frequency); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return height - y(d.frequency); });
};

charts.bar = {
	render: Bar,
	type: 'bar',
	name: 'Bar'
};