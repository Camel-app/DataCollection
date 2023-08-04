/* add button: */
const testButton = `<button id="teststuff" class="material-icons" title="Test stuff" style="color:blue; margin-left: 10px; margin-right: 5px;"">unpublished </button>`;
let hideResearcherButtonsToptestButton = document.getElementById(
	"hideResearcherButtonsTop"
);
hideResearcherButtonsToptestButton.innerHTML += testButton;

function updateQueryStringParameter(uri, key, value) {
	let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	let separator = uri.indexOf("?") !== -1 ? "&" : "?";

	if (uri.match(re)) {
		return uri.replace(re, "$1" + key + "=" + value + "$2");
	} else {
		return uri + separator + key + "=" + value;
	}
}

$(function () {
	$("#teststuff").on("click", (evt) => {
		/*
        let a = getActiveListNodes();
        a.unshift(getMeanValenceNodes(a))
        a.unshift(CAM.idCAM); // id of single CAM
        a.unshift(CAM.projectCAM); // id of current project
        console.log(a);
        //You can reload the url like so
        let encodedCAM = Base64.encode(JSON.stringify(a));
        let newUrl = updateQueryStringParameter(config.ADAPTIVESTUDYurl, "encoded", encodedCAM);

        let decodedCAM = Base64.decode(encodedCAM);
        console.log("encode: ", encodedCAM);
        console.log("decode: ", decodedCAM);

        console.log("URL:", newUrl);
        */

		let tmpActiveNodes = getActiveListNodes();
		let outtmp = getMeanValenceNodes(tmpActiveNodes);
		addElementsCy();
		//let outtmp2 = addElementsCy();

		console.log(outtmp);
		console.log(cy);
		//You can reload the url like so
		let encodedCAM = Base64.encode(JSON.stringify(tmpActiveNodes));
		let newUrl = updateQueryStringParameter(
			config.ADAPTIVESTUDYurl,
			"encoded",
			encodedCAM
		);

		let decodedCAM = Base64.decode(encodedCAM);
		console.log("encode: ", encodedCAM);
		console.log("decode: ", decodedCAM);

		console.log("URL:", newUrl);
	});
});
