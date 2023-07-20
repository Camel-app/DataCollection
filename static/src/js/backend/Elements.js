class Elements {
	constructor() {
		this.idCAM = uuid.v4();
		this.creator = uuid.v4(); // id of the maker
		this.projectCAM = config.CAMproject;
		this.defocusCAM = null;
		this.date = new Date().getTime(); // representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date
		this.nodes = [];
		this.connectors = [];
		this.currentID = null;
		this.currentNode = null;
		this.hasSelectedNode = false;
		this.currentConnector = null;
		this.hasSelectedConnector = false;
		this.readyToMove = false;
		this.isIncoming = false;
	}

	addElement(newElement) {
		const kind = newElement.kind;
		if (kind === "Node") return this.addNode(newElement);
		if (kind === "Connector") return this.addConnector(newElement);
	}

	updateElement(kind, field, value) {
		switch (kind) {
			case "Node":
				if (this.currentNode != null) {
					this.currentNode.updateNode(field, value);
				}
				break;
			case "Connector":
				if (this.currentConnector != null) {
					this.currentConnector.updateConnector(field, value);
				}
				break;
		}
	}

	deleteElement() {
		if (this.hasSelectedNode) {
			return this.deleteNode();
		}

		if (this.hasSelectedConnector) {
			return this.deleteConnector();
		}
	}

	addConnector(connector) {
		if (this.isConnectorIn(connector) == false) {
			if (config.BidirectionalDefault) {
				connector.bidirection = true;
			}
			this.connectors.push(connector);
			console.log("Connector has been added.");
			return true;
		}
		let connector = this.findConnector(connector);
		connector.isActive = true;
		return false;
	}

	isConnectorIn(connector) {
		const st = this.findConnector(connector);
		if (st == undefined) return false;
		return true;
	}

	findConnector(connector) {
		const connector1 = this.connectors.filter(
			(elt) =>
				(elt.target === connector.target &&
					elt.source === connector.source) ||
				(elt.target === connector.source &&
					elt.source === connector.target)
		);
		return connector1[0];
	}
	getConnectorById(id) {
		for (let elt of this.connectors) {
			if (elt.id === id) return elt;
		}
		return null;
	}

	deleteConnector() {
		if (!this.currentConnector.isDeletable) {
			console.log("This element cannot be deleted.");
			return false;
		}
		this.currentConnector.deleteConnection();
		this.unselectConnection();

		this.currentConnector = null;
		this.hasSelectedConnector = false;

		return true;
	}

	addNode(node) {
		const elt = this.getNodeById(node.id);
		if (elt != null) {
			console.log("Already existing element.");
			return false;
		}
		this.nodes.push(node);
		console.log("Node has been added.");
		return true;
	}

	deleteNode() {
		const nodeID = this.currentNode.id;

		if (!this.currentNode.isDeletable) {
			console.log("This element cannot be deleted.");
			return false;
		}

		this.connectors.forEach((connector) => {
			if (connector.target === nodeID || connector.source === nodeID) {
				connector.deleteConnection();
			}
		});

		this.currentNode.updateNode("isActive", false);
		this.unselectNode();

		this.currentNode = null;
		this.hasSelectedNode = false;
		return true;
	}

	getIndex(id, kind) {
		switch (kind) {
			case "Node":
				for (let index = 0; index < this.nodes.length; index++) {
					if (this.nodes[index].id === id) return index;
				}
				break;
			case "Connector":
				for (let index = 0; index < this.connectors.length; index++) {
					if (this.connectors[index].id === id) return index;
				}
		}
		return -1;
	}

	selecteNode(id) {
		const index = this.getIndex(id, "Node");
		if (
			this.currentNode != null &&
			this.nodes[index].id != this.currentNode.id
		) {
			let connector = new ConnectorCAM();
			connector.establishConnection(
				this.currentNode,
				this.nodes[index],
				IncreaseSliderIntensity,
				true
			);
			this.addElement(connector);
			this.unselectNode();
			return;
		}

		this.hasSelectedNode = true;
		this.currentNode = this.nodes[index];
		this.currentID = this.currentNode.id;
		this.currentNode.updateNode("isSelected", !this.currentNode.isSelected);
	}

	unselectNode() {
		this.nodes.map((node) => {
			node.updateNode("isSelected", false);
		});
		this.currentNode = null;
		this.currentID = null;
		this.hasSelectedNode = false;
	}

	getNodeById(id) {
		for (let elt of this.nodes) {
			if (elt.id === id) return elt;
		}
		return null;
	}

	selectConnection(id) {
		const index = this.getIndex(id, "Connector");
		this.currentConnector = this.connectors[index];
		this.currentConnector.isSelected = true;
		this.currentID = this.currentConnector.id;
		this.hasSelectedConnector = true;

		const source = this.getNodeById(this.currentConnector.source);
		const target = this.getNodeById(this.currentConnector.target);

		target.updateNode("isConnectorSelected", true);
		source.updateNode("isConnectorSelected", true);
	}

	unselectConnection() {
		const source = this.getNodeById(this.currentConnector.source);
		const target = this.getNodeById(this.currentConnector.target);

		target.updateNode("isConnectorSelected", false);
		source.updateNode("isConnectorSelected", false);

		this.currentConnector.isSelected = false;

		this.currentID = null;
		this.currentConnector = null;
		this.hasSelectedConnector = false;
	}

	draw() {
		draw(this);
	}

	importElement(element) {
		if (element.kind === "Node") {
			let node = new NodeCAM(0, "");
			node.setNodeImport(element);
			this.nodes.push(node);
		}

		if (element.kind === "Connector") {
			const source = this.getNodeById(element.source);
			const target = this.getNodeById(element.target);
			let connector = new ConnectorCAM();
			connector.establishConnection(
				source,
				target,
				element.intensity,
				element.agreement
			);
			connector.id = element.id;
			connector.isDeletable = element.isDeletable;

			this.connectors.push(connector);
		}
		this.draw();
	}
}
