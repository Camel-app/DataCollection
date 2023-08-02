$(document).on("click", ".outer-connector", function (event) {
	resetConnectorSelection();
	resetNodeSelection();
	CAM.selectConnection($(this)[0].id);
	CAM.draw();
});

