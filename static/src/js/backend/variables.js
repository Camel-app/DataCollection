/* initiate CAM */
let CAM = new Elements();
const svgns = "http://www.w3.org/2000/svg";
const WEBSOCKET = false;

/* camera option -> move SVG within broader frame*/
// speed of CAM movement
const moveCAMSpeed = 10;
// stopping condition X coordinates
let stopConX = 0;
let stopConY = 0;
let offsetXY = [0, 0]; // for smooth movements
let cameraOffset = { x: 0, y: 0 };
let camPosition = { x: 0, y: 0 };
let zoom = 1;
let lastClickDelta = 500;

/* !!! partly RENAME within code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
//let LengthSentence = config.LengthSentence; // if >= X characters
//let LengthWords = config.LengthWords; // after each word with cumsum >= X characters

/* GLOBAL variables */
// hide connector: direction of influence

//working env variables
let camMother = null;
let linkRedirect = null;
let token = null;

// save only part of positions in eventLog when moving node
let arrayPositions;

// show researcher buttons
//let ShowResearcherButtons;

// after 2x show information regarding changing ambivalent node turn off
let CounterChangeAmbiConcept = 0;

/* DEFAULT values */
// change zoom level of svg elements
let zoomScaleNode = 0.45;
//let zoomScaleConnector = 1;

// increase slider intensity by X (thicker lines)
const IncreaseSliderIntensity = 3;
