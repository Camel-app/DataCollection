const interactionEdge = `
<div class="properties" id="interactionEdge">
            <div style="padding-bottom: 30px;">
                <button id="deleteEdge" class="material-icons deleteButton" style="color:red;" title="Delete Connector">
                    delete </button>
            </div>
            

            <!-- > adjust type and strength of connector -->
            <div class="properties-align" style="margin-bottom:20px" id="hideSliderDisAgree">
                <div class="properties-size-naming">
                ${languageFileOut.cd_01}
                </div>

                <div class="spacing-connector">
                    <span class="redColorTick">${languageFileOut.cd_02}</span>
                    <span class="greenColorTick">${languageFileOut.cd_03}</span>
                </div>
                <div class="outerConnectorSlider">
                    <div class="greenConnectorColorSlider">
                        <div class="redColorConnectorSlider">
                            <input type="range" min="1" max="6" step="1" value="4" id="edgeSlider" autofocus>
                        </div>
                    </div>
                    <div class="labelsConnectorSlider">
                        <span>-3</span>
                        <span>-2</span>
                        <span>-1</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                </div>
            </div>


            <div class="properties-align" id="hideSliderAgreementOnly">
                <div class="properties-size-naming">
                ${languageFileOut.cd_01a}
                </div>
                <div class="outerConnectorSlider">
                    <div class="greenConnectorColorSliderAgreementOnly">
                        <input type="range" min="4" max="6" step="1" value="4" id="edgeSliderAgreementOnly" autofocus>
                    </div>
                </div>
                <div class="labelsConnectorSliderAgreementOnly">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
            </div>




            <!-- > adjust of connectivity of edge -->
            <div id="hideConnectorDirInfluence">
                <div class="properties-size-naming" style="margin-top: 25px;">
                ${languageFileOut.cd_04}
                </div>

                <div style="text-align: center;">
                    <div>
                        <button id="bidirectional" type="button" class="material-icons"
                            title="Concepts influence each other"
                            style="font-size: 50px;">sync_alt</button>
                        <button id="monodirectional" type="button" class="material-icons"
                            title="Concepts influence each other in a one-sided direction. Press button multiple times to change direction"
                            class="connectorButton" style="font-size: 50px;">trending_flat</button>
                    </div>
                </div>
            </div>
            <!-- for researcher only -->
            <div id="hideResearcherButtonsConnector">
                <div style="margin-top: 20px; font-size:16px; font-style: italic;">
                    The following functions are only available to researchers:
                </div>
                <div>
                    <button id="ResErasabilityConnector" type="button" class="typeResearcherButton">
                        deletable
                    </button>
                </div>
            </div>

        </div>`;

var target = document.getElementById("dialogInteractionEdge");
target.innerHTML += interactionEdge;

const colourPalette = [
	COLOUR.white,
	COLOUR.red1,
	COLOUR.red2,
	COLOUR.red3,
	COLOUR.green3,
	COLOUR.green2,
	COLOUR.green1,
];

// language file
$(function () {
	document.getElementById("deleteEdge").title =
		languageFileOut.cd_07buttonDelete;
	document.getElementById("bidirectional").title =
		languageFileOut.cd_05button; // buttons top right (btr)
	document.getElementById("monodirectional").title =
		languageFileOut.cd_06button; // buttons top right (btr)
});

if (config.ShowResearcherButtons) {
	$("#hideResearcherButtonsNode").show();
	$("#hideResearcherButtonsConnector").show();
	$("#hideResearcherButtonsTop").show();
} else {
	$("#hideResearcherButtonsNode").hide();
	$("#hideResearcherButtonsConnector").hide();
	$("#hideResearcherButtonsTop").hide();
}
if (config.showOnlyPosSlid) {
	$("#hideSliderDisAgree").hide();
	$("#hideSliderAgreementOnly").show();
} else {
	$("#hideSliderDisAgree").show();
	$("#hideSliderAgreementOnly").hide();
}

$("#edgeSlider").on("input", function () {
	var intensitySlider = document.querySelector("#edgeSlider");
	var intensity = 0;

	var myGreenColorSlider = document.querySelector(
		".greenConnectorColorSlider"
	);
	var myGreenColorTick = document.querySelector(".greenColorTick");

	var myRedColorSlider = document.querySelector(".redColorConnectorSlider");
	var myRedColorTick = document.querySelector(".redColorTick");

	var agreement = intensitySlider.value <= 3 ? false : true;
	CAM.currentConnector.setAgreement(agreement);

	myRedColorSlider.style.backgroundColor =
		intensitySlider.value <= 3
			? colourPalette[intensitySlider.value]
			: colourPalette[0];
	myRedColorTick.style.backgroundColor =
		intensitySlider.value <= 3
			? colourPalette[intensitySlider.value]
			: colourPalette[0];

	myGreenColorSlider.style.backgroundColor =
		intensitySlider.value > 3
			? colourPalette[intensitySlider.value]
			: colourPalette[0];
	myGreenColorTick.style.backgroundColor =
		intensitySlider.value > 3
			? colourPalette[intensitySlider.value]
			: colourPalette[0];

	intensity =
		intensitySlider.value <= 3
			? (4 - intensitySlider.value) * IncreaseSliderIntensity
			: (intensitySlider.value - 3) * IncreaseSliderIntensity;

	CAM.currentConnector.intensity = intensity;
	CAM.draw();
});

$("#edgeSliderAgreementOnly").on("input", function () {
	var intensitySlider = document.querySelector("#edgeSliderAgreementOnly");
	var intensity = 0;

	var myGreenColorSlider = document.querySelector(
		".greenConnectorColorSliderAgreementOnly"
	);

	myGreenColorSlider.style.backgroundColor =
		intensitySlider.value > 3
			? colourPalette[intensitySlider.value]
			: colourPalette[0];

	intensity =
		intensitySlider.value <= 3
			? (4 - intensitySlider.value) * IncreaseSliderIntensity
			: (intensitySlider.value - 3) * IncreaseSliderIntensity;

	CAM.currentConnector.intensity = intensity;
	CAM.draw();
});

$("#bidirectional").on("click", () => {
	if (CAM.currentConnector != null) {
		CAM.updateElement("Connector", "bidirection", true);
		CAM.draw();
	}
});

$("#monodirectional").on("click", () => {
	if (CAM.currentConnector != null) {
		CAM.updateElement("Connector", "direction", null);
		CAM.draw();
	}
});

// > delete
$("#deleteEdge").on("click", (evt) => {
	var success = CAM.deleteElement();
	if (!success) {
		CAM.currentConnector.enterLog({
			type: "connector was deleted",
			value: -99,
		});

		toastr.info(
			languageFileOut.edw_01notDeleteConnector,
			languageFileOut.edw_02notDeleteConnector,
			{
				closeButton: true,
				timeOut: 2000,
				positionClass: "toast-top-center",
				preventDuplicates: true,
			}
		);
	}
	$("#dialogInteractionEdge").dialog("close"); // close pop-up
	CAM.draw();
});

$("#ResErasabilityConnector").on("click", (evt) => {
	if (CAM.currentConnector != null) {
		if (CAM.currentConnector.isDeletable == true) {
			CAM.currentConnector.isDeletable = false;
			toastr.info("The connector is now not deletable.");
		} else if (CAM.currentConnector.isDeletable == false) {
			CAM.currentConnector.isDeletable = true;
			toastr.info("The connector is now deletable.");
		}
	}
});

// hide arrows
if (config.hideArrows) {
	$("#hideConnectorDirInfluence").hide();
} else {
	$("#hideConnectorDirInfluence").show();
}

// hide / show slider reference
if (config.showOnlyPosSlid) {
	$("#hideSliderDisAgreeRef").hide();
	$("#hideSliderDisAgreeRef2").hide();
	$("#showSliderAgreeOnlyRef").show();
} else {
	$("#hideSliderDisAgreeRef").show();
	$("#hideSliderDisAgreeRef2").show();
	$("#showSliderAgreeOnlyRef").hide();
}
