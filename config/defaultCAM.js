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

    CAM.addElement(new NodeCAM(0, "central (change me!)", {
      x: 600,
      y: 400
    }, true, true, true));

    CAM.addElement(new NodeCAM(-1, "11", {
      x: 100,
      y: 300
    }, true, true, true));

    CAM.addElement(new NodeCAM(-2, "22", {
      x: 200,
      y: 300
    }, true, true, true));

    CAM.addElement(new NodeCAM(-3, "33", {
      x: 300,
      y: 300
    }, true, true, true));

    CAM.addElement(new NodeCAM(1, "11", {
      x: 300,
      y: 400
    }, true, true, true));

    CAM.addElement(new NodeCAM(2, "22", {
      x: 400,
      y: 400
    }, true, true, true));

    CAM.addElement(new NodeCAM(3, "33", {
      x: 500,
      y: 400
    }, true, true, true));



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