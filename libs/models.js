/********************************************************
*
*           Author: Shawn Scott
*           Date: 9.18.2014
*           Filename: models.js
*
*
*
*
*********************************************************/

/*Class used for drawing and representing the graph in THREE.js with Meshes */



function vertexObj(mesh, vertexId, lable, state) {
	this.mesh = mesh;
	this.vertexId = vertexId;
	this.lable = lable;
	this.state = state;

	return this;

}

function edgeObj(mesh, v, w, state) {
	this.mesh = mesh;
	this.v = v;
	this.w = w;
	this.state = state;

	return this;
}


function materials(mat, name) {
	this.mat = mat;
	this.name = name;

	return this;
}


function GraphModel (graph, lables, colors) {
	this.graph = graph;
	this.lables = lables;
	this.colors = colors;
	this.materials = {};
	this.nodeList = [];
	this.edgeList = [];

	this.graphObj = undefined;

	this.init();
}

GraphModel.prototype.init = function() {		
		this.createMaterials();
		this.createNodes();
		this.positionNodes();
		this.createEdgeModels();
	}

GraphModel.prototype.createNodes = function() {
	for( var i = 0; i < this.graph.vertices; i++) {
		var sp = Factories.Shapes.createSphere(5, this.materials.nodeMat);
		if(this.lables != undefined) {
			this.nodeList.push(new vertexObj(sp, i, this.lables[i]));
		}
		else {
			this.nodeList.push(new vertexObj(sp, i, "Vertex " + i.toString()));
		}
	}

	console.log(this.nodeList);

}

GraphModel.prototype.createMaterials = function() {
	this.materials.nodeMat = Factories.Materials.createLambertMaterial(this.colors.nodeColor);
	this.materials.linkMat = Factories.Materials.createLambertMaterial(this.colors.linkColor);

}

GraphModel.prototype.positionNodes = function() {

	var nodeCount = 0;	//number of node in current circle
	var nodeLimit = 1;	//max number of nodes allowed in current circle 
	var radius = 0;		//current circles radius
	var theta = 0;		//angle of current circle
	var dtheta = 0;		//rate of change in the arch of the circle

	for(var node = 0; node < this.nodeList.length; node++) {
		var coord = this.getCircleCoords(radius, theta);
		this.nodeList[node].mesh.position.set(coord.x, coord.y, 10);

		nodeCount++;

		if(nodeCount >= nodeLimit) {
			nodeLimit += 2;
			nodeCount = 0;
			radius = 10 * nodeLimit;
			
			theta +=  Math.sqrt(3) / 2 * nodeLimit;
			dtheta = 2 * Math.PI / nodeLimit;
		}
		else {
			theta += dtheta;
		}

	}
}

GraphModel.prototype.createEdgeModels = function() {
	var isConnecteMatrix = [];
	
	for (var i = 0; i < this.graph.vertices; i++) {
		isConnecteMatrix[i] = [];
		for(var j = 0; j < this.graph.vertices; j++){
			isConnecteMatrix[i].push(false);
		}
	}

	for (var v = 0; v < this.graph.adj.length; v++) {

		var w = 0;
		while( w < this.graph.adj[v].length ) {
			var linkedEdge = this.graph.adj[v][w];
			if(isConnecteMatrix[v][linkedEdge] == false && isConnecteMatrix[linkedEdge][v] == false){
				var points = [this.nodeList[v].mesh.position, this.nodeList[linkedEdge].mesh.position ];
				var edgeMesh = Factories.Shapes.createTube(
					points, 32, 0.5, 8, false, this.materials.linkMat);

				this.edgeList.push(new edgeObj(edgeMesh, v, linkedEdge));
				isConnecteMatrix[v][linkedEdge] = isConnecteMatrix[linkedEdge][v] = true;

			}
			w++;
		}
	}
		

}


GraphModel.prototype.getCircleCoords = function(radius, theta){
	return {x: radius * Math.cos(theta) , y: radius * Math.sin(theta)};
}

