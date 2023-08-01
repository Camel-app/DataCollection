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
			if (!(resetConnectorSelection() || resetNodeSelection())) {
				const positionClick = {
					x:
						event.clientX -
						$("#CAMSVG").position().left -
						camPosition.x, // / zoomScale,
					y:
						event.clientY -
						$("#CAMSVG").position().top -
						camPosition.y, // / zoomScale
				};
				CAM.addElement(new NodeCAM(0, "", positionClick, 1, 1, 1));
			}
			CAM.draw();
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
			if (new Date().getTime() - lastClickDelta < 1000) {
				CAM.selectConnection(connector.srcElement.id);
				var backendGreenColorSlider = document.querySelector(
					".greenConnectorColorSlider"
				);
				var backendGreenColorTick =
					document.querySelector(".greenColorTick");

				var backendRedColorSlider = document.querySelector(
					".redColorConnectorSlider"
				);
				var backendRedColorTick =
					document.querySelector(".redColorTick");
				console.log(CAM.currentConnector);
				if (CAM.currentConnector.agreement) {
					//backendRedColorSlider.style.backgroundColor = "white";
					//backendRedColorTick.style.backgroundColor = "white";

					document.getElementById("edgeSlider").value =
						CAM.currentConnector.intensity /
							IncreaseSliderIntensity +
						3;
					if (document.getElementById("edgeSlider").value == 4) {
						backendGreenColorSlider.style.backgroundColor =
							"hsl(110, 100%, 70%)";
						backendGreenColorTick.style.backgroundColor =
							"hsl(110, 100%, 70%)";
					} else if (
						document.getElementById("edgeSlider").value == 5
					) {
						backendGreenColorSlider.style.backgroundColor =
							"hsl(110, 100%, 50%)";
						backendGreenColorTick.style.backgroundColor =
							"hsl(110, 100%, 50%)";
					}
					if (document.getElementById("edgeSlider").value == 6) {
						backendGreenColorSlider.style.backgroundColor =
							"hsl(110, 100%, 40%)";
						backendGreenColorTick.style.backgroundColor =
							"hsl(110, 100%, 40%)";
					}
				} else if (!CAM.currentConnector.agreement) {
					backendGreenColorSlider.style.backgroundColor = "white";
					backendGreenColorTick.style.backgroundColor = "white";

					if (
						CAM.currentConnector.intensity ==
						IncreaseSliderIntensity
					) {
						document.getElementById("edgeSlider").value = 3;
						backendRedColorSlider.style.backgroundColor =
							"hsl(0, 100%, 70%)";
						backendRedColorTick.style.backgroundColor =
							"hsl(0, 100%, 70%)";
					} else if (
						CAM.currentConnector.intensity ==
						IncreaseSliderIntensity * 2
					) {
						document.getElementById("edgeSlider").value = 2;
						backendRedColorSlider.style.backgroundColor =
							"hsl(0, 100%, 50%)";
						backendRedColorTick.style.backgroundColor =
							"hsl(0, 100%, 50%)";
					} else if (
						CAM.currentConnector.intensity ==
						IncreaseSliderIntensity * 3
					) {
						document.getElementById("edgeSlider").value = 1;
						backendRedColorSlider.style.backgroundColor =
							"hsl(0, 100%, 40%)";
						backendRedColorTick.style.backgroundColor =
							"hsl(0, 100%, 40%)";
					}
				}

				$("#dialogInteractionEdge").dialog("open");
			} else {
				resetConnectorSelection();
				resetNodeSelection();
				CAM.selectConnection(connector.srcElement.id);
			}
			lastClickDelta = new Date().getTime();

			CAM.draw();
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
			return !node.isSelected ? getColourNodeStroke(node) : "black";
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
	//.on("mouseover", function (d, i) {
	//	console.log("mouseover on", this);
	//	d3.select(this).transition().duration(50).attr("fill", "#ff0000");
	//})
	//.on("mouseout", function (node) {
	//	console.log("mouseout on", node);
	//
	//	d3.select(this)
	//		.transition()
	//		.duration(50)
	//		.style("fill", COLOUR.green2);
	//	draw();
	//});

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

function dragBackground(event) {
	const coord = d3.pointer(event);
	const board = document.querySelector("#CAMSVG").getBoundingClientRect();

	camPosition = {
		x: camPosition.x + event.sourceEvent.movementX,
		y: camPosition.y + event.sourceEvent.movementY,
	};
	draw();
}
function dragstarted(event) {
	const node = CAM.getNodeById(this.id);
	const position = node.position;
	CAM.selecteNode(this.id);
	offsetXY = [
		d3.pointer(event)[0] - position.x,
		d3.pointer(event)[1] - position.y,
	];
	if (new Date().getTime() - lastClickDelta < 200) {
		clickOnNode(CAM.getNodeById(this.id));
		event.sourceEvent.stopPropagation();
	}
	lastClickDelta = new Date().getTime();
	draw();
}

// Update the subject (dragged node) position during drag.
function dragged(event) {
	const coord = d3.pointer(event);
	const board = document.querySelector("#CAMSVG").getBoundingClientRect();

	event.subject.position = {
		x: coord[0] - offsetXY[0] - board.x,
		y: coord[1] - offsetXY[1] - board.y,
	};
	draw();
}

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
function dragended(event) {
	offsetXY = [0, 0];
	draw();
}

function getColourNodeStroke(node) {
	const colourPaletteRed = ["white", COLOUR.red1, COLOUR.red2, COLOUR.red3];
	const colourPaletteGreen = [
		"white",
		COLOUR.green3,
		COLOUR.green2,
		COLOUR.green1,
	];

	if (node.value == 0) {
		return COLOUR.neutralLine;
	}
	if (node.value == 10) {
		return COLOUR.ambivalentLine;
	}
	if (node.value > 0) {
		return colourPaletteGreen[node.value];
	}
	if (node.value < 0) {
		return colourPaletteRed[-node.value];
	}
}

function getColourNodeFill(node) {
	if (node.value == 0) {
		return COLOUR.neutralNode;
	}
	if (node.value == 10) {
		return COLOUR.ambivalentNode;
	}
	if (node.value > 0) {
		return COLOUR.green3;
	}
	if (node.value < 0) {
		return COLOUR.red3;
	}
}

function clickOnNode(event) {
	if (CAM.currentNode != null) {
		document.getElementById("inptextnode").value = CAM.currentNode.text;
		document.getElementById("inpcommentnode").value =
			CAM.currentNode.comment;
		var backendGreenColorNodeSlider = document.querySelector(
			".greenColorNodeSlider"
		);
		var backendRedColorNodeSlider = document.querySelector(
			".redColorNodeSlider"
		);

		if (CAM.currentNode.value == 0) {
			document.getElementById("nodeSlider").value = 4;
			document.getElementById("checkboxAmbivalent").checked = false;
			document.getElementById("nodeSlider").disabled = false;
			backendRedColorNodeSlider.style.backgroundColor =
				"hsl(0, 50%, 60%)";
			backendGreenColorNodeSlider.style.backgroundColor =
				"hsl(110, 50%, 60%)";
		} else if (CAM.currentNode.value == 10) {
			document.getElementById("nodeSlider").value = 4;
			backendRedColorNodeSlider.style.backgroundColor =
				"hsl(0, 50%, 60%)";
			backendGreenColorNodeSlider.style.backgroundColor =
				"hsl(110, 50%, 60%)";

			document.getElementById("checkboxAmbivalent").checked = true;
			document.getElementById("nodeSlider").disabled = true;
		} else if (CAM.currentNode.value < 0) {
			document.getElementById("checkboxAmbivalent").checked = false;
			document.getElementById("nodeSlider").disabled = false;
			if (CAM.currentNode.value == -1) {
				document.getElementById("nodeSlider").value = 3;
				backendRedColorNodeSlider.style.backgroundColor =
					"hsl(0, 50%, 60%)";
			} else if (CAM.currentNode.value == -2) {
				document.getElementById("nodeSlider").value = 2;
				backendRedColorNodeSlider.style.backgroundColor =
					"hsl(0, 50%, 50%)";
			} else if (CAM.currentNode.value == -3) {
				document.getElementById("nodeSlider").value = 1;
				backendRedColorNodeSlider.style.backgroundColor =
					"hsl(0, 50%, 40%)";
			}
		} else if (CAM.currentNode.value > 0 && CAM.currentNode.value <= 4) {
			document.getElementById("checkboxAmbivalent").checked = false;
			document.getElementById("nodeSlider").disabled = false;
			if (CAM.currentNode.value == 1) {
				document.getElementById("nodeSlider").value = 5;
				backendGreenColorNodeSlider.style.backgroundColor =
					"hsl(110, 50%, 60%)";
			} else if (CAM.currentNode.value == 2) {
				document.getElementById("nodeSlider").value = 6;
				backendGreenColorNodeSlider.style.backgroundColor =
					"hsl(110, 50%, 50%)";
			} else if (CAM.currentNode.value == 3) {
				document.getElementById("nodeSlider").value = 7;
				backendGreenColorNodeSlider.style.backgroundColor =
					"hsl(110, 50%, 40%)";
			}
		}

		/* change position of pop up */
		if (CAM.currentNode.position.x - 380 < 0) {
			var changeAtLeft = "left+" + (CAM.currentNode.position.x + 70); // to far left position to right
		} else {
			var changeAtLeft = "left+" + (CAM.currentNode.position.x - 360); // position to left
		}
		var changeAtTop = "top+" + (CAM.currentNode.position.y - 10);

		$("#dialogInteractionNode").dialog("open");
	}
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
