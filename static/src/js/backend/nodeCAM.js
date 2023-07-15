class NodeCAM {
	constructor(
		value,
		text,
		position = {
			x: 0,
			y: 0,
		},
		isDraggable = true,
		isDeletable = true,
		isTextChangeable = true
	) {
		this.id = uuid.v4();
		this.value = value;
		this.text = text;
		this.position = position;
		this.isDraggable = isDraggable;
		this.isDeletable = isDeletable;
		this.isTextChangeable = isTextChangeable;
		this.comment = "";
		this.isActive = true;
		this.date = new Date().getTime(); // representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date
		this.kind = "Node";
		this.isSelected = false;
		this.isConnectorSelected = false;
		this.hasElementMoved = false;
		this.eventLog = [];

		this.enterLog({
			type: "create node",
			value: value,
		});
	}

	setNodeImport(node) {
		this.id = node.id;
		this.value = node.value;
		this.text = node.text;
		this.comment = node.comment;
		this.position = node.position;
		this.isActive = node.isActive;
		this.date = node.date;
		this.kind = node.kind;
		this.isSelected = node.isSelected;
		this.isConnectorSelected = node.isConnectorSelected;
		this.isDraggable = node.isDraggable;
		this.isDeletable = node.isDeletable;
		this.eventLog = node.eventLog;
		this.isTextChangeable = node.isTextChangeable;
	}

	setValue(newValue) {
		this.value = newValue;
	}
	setText(newText) {
		this.text = newText;
	}
	setComment(newComment) {
		this.comment = newComment;
	}
	setPosition(newPosition) {
		this.position = this.isDraggable ? newPosition : this.position;
	}
	setIsActive(val) {
		this.isActive = this.isDeletable ? val : this.isActive;
	}
	setIsSelected(val) {
		this.isSelected = val;
	}
	setIsConnectorSelected(val) {
		this.isConnectorSelected = val;
	}

	setIsTextChangeable(val) {
		this.isTextChangeable = val;
	}

	updateNode(field, value) {
		if (field === "text") this.setText(value);
		if (field === "position") this.setPosition(value);
		if (field === "value") this.setValue(value);
		if (field === "comment") this.setComment(value);
		if (field === "isActive") this.setIsActive(value);
		if (field === "isSelected") this.setIsSelected(value);
		if (field === "isConnectorSelected") this.setIsConnectorSelected(value);
	}

	enterLog(log) {
		this.eventLog.push({
			time: new Date().getTime(),
			type: log.type,
			value: log.value,
		});
	}

	deletenode() {
		this.active = false;
	}

	isNode() {
		return true;
	}
}
