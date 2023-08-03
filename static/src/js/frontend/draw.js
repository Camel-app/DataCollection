let width = 1300;
let height = 800;

function draw() {
	var nodes = CAM.nodes.filter((elt) => elt.isActive);
	var edges = CAM.connectors
		.filter((elt) => elt.isActive)
		.map((elt) => {
			var relt = {};
			relt["source"] = elt.source;
			relt["target"] = elt.target;
			relt["value"] = elt.value;
			relt["left"] = true;
			relt["id"] = elt.id;
			return relt;
		});

	const svg = d3.select("#CAMSVG");
	svg.selectAll("*").remove();
	svg.attr("width", width).attr("height", height);

	const subGroup = svg.append("g");

	subGroup
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("id", "background")
		.attr("fill", "white")
		.on("click", (event) => {
			clickOnBackground(event);
		})
		.call(d3.drag().on("drag", dragBackground));

	subGroup
		.append("g")
		.selectAll("line")
		.data(edges)
		.enter()
		.append("line")
		.style("stroke", "red")
		.style("stroke-width", 25)
		.style("stroke-dasharray", (d) => {
			return d.value > 0 ? "0,0" : "5,5";
		})
		.attr("id", function (connector) {
			console.log(connector);
			return connector.id;
		})
		.attr("x1", function (d) {
			return getPosition(d.source).x + camPosition.x;
		})
		.attr("y1", function (d) {
			return getPosition(d.source).y + camPosition.y;
		})
		.attr("x2", function (d) {
			return getPosition(d.target).x + camPosition.x;
		})
		.attr("y2", function (d) {
			return getPosition(d.target).y + camPosition.y;
		})
		.on("click", (connector) => {
			clickOnConnector(connector);
		});

	subGroup
		.append("g")
		.selectAll("dot")
		.data(nodes)
		.enter()
		.append("ellipse")
		.attr("cx", function (node) {
			return node.position.x + camPosition.x;
		})
		.attr("cy", function (node) {
			return node.position.y + camPosition.y;
		})
		.attr("rx", 60)
		.attr("ry", 40)
		.attr("id", function (node) {
			return node.id;
		})
		.attr("stroke", function (node) {
			if (node.isConnectorSelected) return "blue";
			return !node.isSelected
				? getColourNodeStroke(node)
				: d3
						.select(this)
						.transition()
						.duration(300)
						.attr("stroke", "black");
		})
		.attr("stroke-width", function (node) {
			return (Math.abs(node.value) + 1) * 2;
		})
		.attr("fill", function (node) {
			return getColourNodeFill(node);
		})
		.call(
			d3
				.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended)
		);
	//		.on("mouseenter", function (d, i) {
	//			d3.select(this).transition().duration(300).attr("fill", "#ff0000");
	//		})
	//		.on("mouseout", function (d, i) {
	//			d3.select(this)
	//				.transition()
	//				.duration(300)
	//				.attr("fill", (node) => {
	//					return getColourNodeFill(node);
	//				});
	//		});

	subGroup
		.append("g")
		.selectAll("text")
		.data(nodes)
		.enter()
		.append("text")
		.attr("x", function (node) {
			return node.position.x + camPosition.x;
		})
		.attr("y", function (node) {
			return node.position.y + camPosition.y;
		})
		.attr("dx", function (node) {
			return -100;
		})
		.text(function (node) {
			return node.text;
		})
		.attr("id", function (node) {
			return node.id;
		})
		.on("click");
}

function getPosition(elt) {
	const node = CAM.getNodeById(elt);
	return {
		x: node.position.x,
		y: node.position.y,
	};
}

function setOverlay() {
	let background = document.createElementNS(svgns, "rect");
	background.setAttribute("id", "overlay");
	background.setAttribute("x", 0);
	background.setAttribute("y", 0);
	background.setAttribute("width", "100%");
	background.setAttribute("height", "100%");
	background.setAttribute("fill", "#aaaaaa");
	background.setAttribute("opacity", 0.1);
	return background;
}

function drawOverlay() {
	const svg = document.querySelector("#CAMSVG");
	svg.innerHTML = "";

	svg.appendChild(setOverlay());
}

function resetConnectorSelection() {
	if (CAM.hasSelectedConnector) {
		CAM.unselectConnection();
		return true;
	}
	return false;
}

function resetNodeSelection() {
	if (CAM.hasSelectedNode) {
		CAM.unselectNode();
		return true;
	}
	return false;
}
