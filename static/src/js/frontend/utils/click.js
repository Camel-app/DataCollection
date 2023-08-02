
function clickOnConnector(connector){
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
}

function clickOnNode() {
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

		$("#dialogInteractionNode").dialog("open");
	}
    CAM.draw();
}

function clickOnBackground(event){
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
}