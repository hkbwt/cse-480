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

function barObj(mesh, height, value, state) {
	this.mesh = mesh;
	this.height = height;
	this.value = value;
	this.state = state;
}


/*function materials(mat, name) {
	this.mat = mat;
	this.name = name;

	return this;
}
*/

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

	//console.log(this.nodeList);

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

/*Sorting Model
	
*/

/* this class assumes up is in the positive Z axis and that the array of positions the bars
fill is located somwhere on the x-y plane */

function SortingModel(data, colorsList, rect, boardheight) {
	this.data = data;
	this.colorsList = colorsList;

	// width and depth
	this.baseX = rect.x;
	this.baseY = rect.y;
	this.boardZHeight = boardheight;
	this.padding = 5;
	this.heightStep = 5;

	//this.barCount = data.length;
	this.spaceMulti = 2;
	this.boardheight = boardheight;

	this.barObjList = [];
	this.materials = {};

	this.init();
}

SortingModel.prototype.init = function() {

	this.materials.selected = Factories.Materials.createLambertMaterial(this.colorsList.selected);
	this.materials.unselected = Factories.Materials.createLambertMaterial(this.colorsList.unselected);

	for(var i = 0; i < this.data.length; i++) {
		var barHeight = this.heightStep * this.data[i];
		var bar = Factories.Shapes.createBox(this.baseX, this.baseY, barHeight,
											 this.materials.unselected);

		//set height of model;
		bar.position.set(0,0, this.boardZHeight + this.padding + (barHeight / 2) );
		this.barObjList.push(new barObj(bar, barHeight, this.data[i], 'unselected'));
	}


	this.positionBars();

	console.log(this.barObjList);


}

SortingModel.prototype.positionBars = function() {


	var currentPos = new THREE.Vector3(0,0,0);

	currentPos.x = -( ( (this.baseX * this.data.length) +
										(this.baseX * this.spaceMulti * (this.data.length - 1))  ) / 2 ); 


	var step = this.baseX + (this.baseX * this.spaceMulti); 

	for(var i = 0; i < this.barObjList.length; i++) {
		this.barObjList[i].mesh.position.x = currentPos.x;
		// this.barObjList[i].mesh.position.y = currentPos.y; 
		currentPos.x += step;
	}
}
