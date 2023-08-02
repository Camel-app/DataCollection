function dragBackground(event) {
	camPosition = {
		x: camPosition.x + event.sourceEvent.movementX,
		y: camPosition.y + event.sourceEvent.movementY,
	};
    draw()
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


function dragended() {
	offsetXY = [0, 0];
}