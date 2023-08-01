$(document).on("click", ".outer-connector", function (event) {
	resetConnectorSelection();
	resetNodeSelection();
	CAM.selectConnection($(this)[0].id);
	CAM.draw();
});

$(document).on("mousedown", ".connector, .outer-connector", function (event) {
	/* if double click */

	if (event.detail == 2) {
		resetConnectorSelection();
		resetNodeSelection();
		CAM.selectConnection($(this)[0].id);

		if (CAM.currentConnector != null) {
			var backendGreenColorSlider = document.querySelector(
				".greenConnectorColorSlider"
			);
			var backendGreenColorTick =
				document.querySelector(".greenColorTick");

			var backendRedColorSlider = document.querySelector(
				".redColorConnectorSlider"
			);
			var backendRedColorTick = document.querySelector(".redColorTick");

			if (CAM.currentConnector.agreement) {
				backendRedColorSlider.style.backgroundColor = "white";
				backendRedColorTick.style.backgroundColor = "white";

				document.getElementById("edgeSlider").value =
					CAM.currentConnector.intensity / IncreaseSliderIntensity +
					3;
				if (document.getElementById("edgeSlider").value == 4) {
					backendGreenColorSlider.style.backgroundColor =
						"hsl(110, 100%, 70%)";
					backendGreenColorTick.style.backgroundColor =
						"hsl(110, 100%, 70%)";
				} else if (document.getElementById("edgeSlider").value == 5) {
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

				if (CAM.currentConnector.intensity == IncreaseSliderIntensity) {
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

			/* change position of pop up */
			// > get current mother / daugther
			var currentMotherNode = CAM.nodes.filter(
				(el) => el.id === CAM.currentConnector.source
			)[0];
			var currentDaughterNode = CAM.nodes.filter(
				(el) => el.id === CAM.currentConnector.target
			)[0];
			// > get midpoint of connector
			var MeanPositionX =
				(currentMotherNode.position.x +
					currentDaughterNode.position.x) /
				2;
			var MeanPositionY =
				(currentMotherNode.position.y +
					currentDaughterNode.position.y) /
				2;

			if (MeanPositionX - 380 < 0) {
				var changeAtLeft = "left+" + (MeanPositionX + 40); // to far left position to right
			} else {
				var changeAtLeft = "left+" + (MeanPositionX - 340); // position to left
			}

			if (
				Math.abs(
					currentMotherNode.position.x -
						currentDaughterNode.position.x
				) < 300
			) {
				var changeAtTop = "top+" + (MeanPositionY - 130); // x = horizontal spacing less than 300
			} else {
				var changeAtTop = "top+" + MeanPositionY;
			}

			$("#dialogInteractionEdge").dialog("open");
		}

		CAM.draw();
	}
});
