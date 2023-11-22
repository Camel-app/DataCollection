/* default CAM which will be redrawn if CAM is deleted
function shuffle(queslist) {
    let array_emp = [];
    for (var i = 0; i < queslist.length; i++) {
      array_emp.push(i);
    }
  
    let j, x;
    for (i = array_emp.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array_emp[i];
      array_emp[i] = array_emp[j];
      array_emp[j] = x;
    }
    return array_emp;
  }

const ConceptsCAM = ["A1", "A2"];
const index_ConceptsCAM = shuffle(ConceptsCAM);
console.log("index_ConceptsCAM:", index_ConceptsCAM);
 */

function defaultCAM() {
  if (!usingMangoDB) {
    /* MAKE CHANGES: start*/

    CAM.addElement(new NodeCAM(3, "sustainability", {
      x: 650,
      y: 400
  }, false, false, false));


  CAM.addElement(new NodeCAM(0, "in economy", {
      x: 850,
      y: 400
  }, true, false, false));

  CAM.addElement(new NodeCAM(0, "in society", {
      x: 450,
      y: 400
  }, true, false, false));
  
  CAM.addElement(new NodeCAM(10, "future times", {
    x: 250,
    y: 200
}, true, true, true));


  var connector1 = new ConnectorCAM();
  connector1.establishConnection(CAM.nodes[0], CAM.nodes[1], IncreaseSliderIntensity, true);
  connector1.value = 1;
  connector1.isDeletable = false;
  CAM.addElement(connector1);

  var connector2 = new ConnectorCAM();
  connector2.establishConnection(CAM.nodes[0], CAM.nodes[2], IncreaseSliderIntensity, true);
  connector2.value = 1
  connector2.isDeletable = false;
  CAM.addElement(connector2);

  var connector3 = new ConnectorCAM();
  connector3.establishConnection(CAM.nodes[2], CAM.nodes[3], IncreaseSliderIntensity, true);
  connector3.value = 1
  connector3.isDeletable = false;
  CAM.addElement(connector3);


  CAM.nodes[0].comment = "Dave goes to school"
  CAM.nodes[1].comment = "Jane goes to school"
  CAM.connectors[0].comment = "Dave and Jane go to school"

    /* MAKE Changes: end*/
  } else {
    // add nodes from fetched data
    camMother.nodes.forEach((element) => {
      element.kind = "Node";
      element.comment = "";
      element.eventLog = [];
      element.isActive = true;
      element.isConnectorSelected = false;
      element.isSelected = false;
      CAM.importElement(element);
    });
    // add connectors from fetched data
    camMother.connectors.forEach((element) => {
      element.kind = "Connector";
      element.eventLog = "";
      CAM.importElement(element);
    });
  }

  CAM.draw();
}