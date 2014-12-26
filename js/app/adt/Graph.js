/********************************************************
*
*           Date: 9.10.2014
*           Filename: Graph.js
*
*
*
*
*********************************************************/
/*
	the Graph model uses the Vetex and Edge Objects to keep track of
	the respecting inside of a graph. each vertex object is identified with
	a primary key id and model name which is a string of the primary id and the adj array.
	that holds for the vertex ids of all known adjcent vertices. the edge class
	keep track of two ids w and v each the id for the two connected vertices.

	the id is converted into a string for the name of the model that will repersented.
	helper functions are used to make the conversions

	In the undirected graph edge_2_3 is the same as edge_3_2. only one will be saved in
	the edge array. So to retrive an edge you must check if either case is in the edge arrary.

	edge names will always have the smaller vertex id first to maintain consistancey 

	Undirected Graph
 */

/**
*
* Graph Object
*
**/
var Graph = function() {
	this._idCount    = 0;
	this._vertexList = [];
	this._edgeList   = [];

};

Graph.prototype.initialize = function(count) {
		this.clearGraph();

		while(count > 0) {
			this.addVertex();
			count--;
		}
};

////==================================================
//  		access vertex objects
////==================================================

Graph.prototype.getVertexByName = function(name){

	for( var vertex in this._vertexList ) {
		if (vertex.name == name) { return vertex; }
	}
	return null;
};

Graph.prototype.getVertexById = function(vertexId) {
	for( var vertex = 0; vertex < this._vertexList.length; vertex++ ) {
		if (this._vertexList[vertex].id == vertexId) { return this._vertexList[vertex]; }
	}
	return null;
};
		
Graph.prototype.getVertexByIndex = function(index) {
	if(index < this._vertexList.length) {
		return this._vertexList[index];
	}
	return null;
};

Graph.prototype.getEdgeByName = function(name) {
	for( var index = 0; index < this._edgeList.length; index++  ) {
		if (this._edgeList[index].name == name) { return this._edgeList[index]; }
	}
	return null;
};

Graph.prototype.getEdgeById = function(v, w) {
	var smaller;
	var larger;

	if(v < w) {
		smaller = v;
		larger = w;
	}
	else {
		smaller = w;
		larger = v;
	}

	var edge = this.getEdgeByName(this.getEdgeNameById(smaller, larger));
	return edge;
};

Graph.prototype.getEdgeByIndex = function(index) {
	if(index < this._edgeList.length) {
		return this._edgeList[index];
	}
	return null;
};

////==================================================
// defines the relationship between names and ids
// for both vetices and edges
////==================================================

Graph.prototype.getVertexNameById = function(vertexId) {
	return "vertex_" + vertexId;
};

Graph.prototype.getVertexIdByName = function(name) {
	var parts = name.split("_");
	return parseInt(parts[1]);
};

Graph.prototype.getEdgeNameById = function(vertexIdOne, vertexIdTwo) {
	if(vertexIdOne < vertexIdTwo) {
		return "edge" + '_' + vertexIdOne + "_" + vertexIdTwo;
	}
	return "edge" + '_' + vertexIdTwo + "_" + vertexIdOne;
};

Graph.prototype.getEdgeIdByName = function(name) {
	var parts = name.split("_");
	return {v: parseInt(parts[0]), w: parseInt(parts[1])};
};

////==================================================
//	Add and Remove Vertices and Edges from Graph Class
////==================================================

Graph.prototype.addVertex = function(value) {
	
	if(typeof(value) == "undefined"){
		value = this._idCount;
	}
	var name = this.getVertexNameById(this._idCount);

	var vertex = new GraphVertex(this._idCount, name, value);
	this._vertexList.push(vertex);
	this._idCount++;
};

Graph.prototype.removeVertexById = function(vertexId){
	var vertex = this.getVertexById(vertexId);
	if(vertex === null) { return;}

	//remove adjacent edges
	var v = vertex.id;
	for( var index = 0; index < vertex.adjVertIdList.length; index++  ) {
		var w = vertex.adjVertIdList[index];
		this.removeEdgeByValue(v, w);
	}

	//remove vertex
	for(index = 0; index < this._vertexList.length; index++) {
		if (this._vertexList[index].id == vertexId) {
			this._vertexList.splice(index, 1);
			break;
		}
	}
};

Graph.prototype.removeVertexByName = function(name) {
	var id = this.getVertexIdByName(name);
	this.removeVertexById(id);
};

Graph.prototype.addEdge = function(v,w) {
	if(this.hasEdgeById(v, w)) { return; }

	var fromVertex = this.getVertexById(v);
	var toVertex = this.getVertexById(w);

	var edge = new GraphEdge(this.getEdgeNameById(v,w), v, w, 1.0);
	this._edgeList.push(edge);

    fromVertex.addAdjacentVertex(w);
    toVertex.addAdjacentVertex(v);   
};

Graph.prototype.removeEdgeByValue = function(v, w){
	for( var index = 0; index < this._edgeList.length; index++) {
		var edge = this._edgeList[index];

		if(edge.isEdge(v,w)){
			var to = this.getVertexById(v);
			var from = this.getVertexById(w);

			to.removeAdjacentVertex(w);
			from.removeAdjacentVertex(v);

			this._edgeList.splice(index,1);
			break;
		}
	}
};

Graph.prototype.removeEdgeByName = function(name) {
	for( var index = 0; index < this._edgeList.length; index++) {
		var edge = this._edgeList[index];

		if(edge.name == name) {
			var to = this.getVertexById(edge.v);
			var from = this.getVertexById(edge.w);

			to.removeAdjacentVertex(edge.w);
			from.removeAdjacentVertex(edge.v);

			this._edgeList.splice(index,1);
			break;
		}
	}
};

////==================================================
//	Helper Methods
////==================================================

Graph.prototype.getVertexCount = function() {
	return this._vertexList.length;
};

Graph.prototype.getEdgeCount = function() {
	return this._edgeList.length;
};

Graph.prototype.hasEdgeById = function(v,w){
	for( var edgeId = 0; edgeId < this._edgeList.length; edgeId++) {
		if(this._edgeList[edgeId].isEdge(v, w)) {
			return true;
		}
	}
	return false;
};

Graph.prototype.hasEdgeByName = function(name) {
	for( var edge in this._edgeList) {
		if(edge.name == name) {
			return true;
		}
	}
	return false;
};

Graph.prototype.printGraph = function() {
    var msg = "=";

    for(var vertexId = 0; vertexId < this._vertexList.length; vertexId++ ) {
    	var vertex = this._vertexList[vertexId];
    	msg += vertex.toString();
    }

    for(var edgeId = 0; edgeId < this._edgeList.length; edgeId++ ) {
    	var edge = this._edgeList[edgeId];
    	msg += edge.toString();
    }

    msg +=  "\n\n" + "Total Vertices: " + this.getVertexCount() + "\n" +
    	   "Total Edges: " + this.getEdgeCount() + "\n";

    return msg;
};

Graph.prototype.removeAllEdges = function() {
	for(var vertexId = 0; vertexId < this._vertexList.length; vertexId++) {
		var vertex = this._vertexList[vertexId];

		while(vertex.adjVertIdList.length > 0){
			vertex.adjVertIdList.pop();

		}
	}

	while(this.getEdgeCount() > 0 ) {
		this._edgeList.pop();
	}
};

Graph.prototype.clearGraph = function() {
	while(this.getVertexCount() > 0 ) {
		this._vertexList.pop();
	}

	while(this.getEdgeCount() > 0){
		this._edgeList.pop();
	}

	this._idCount = 0;
};

Graph.prototype.createRandomGraph = function(ubVertexNumber, ubEdgeNumber) {
	var edgeCount = Math.floor((Math.random() * ubEdgeNumber));
	var vertCount = Math.floor((Math.random() * ubVertexNumber) + 1);

	this.clearGraph();

	while(vertCount > 0) {
		var value = Math.floor((Math.random() * 100) + 1);
		this.addVertex(value);
		vertCount--;
	}

	while(edgeCount > 0) {
		var v = Math.floor((Math.random() * (this.getVertexCount() - 1) ));
		var w = Math.floor((Math.random() * (this.getVertexCount() - 1) ));

			if((w != v) && !this.hasEdgeById(v, w)) {
				this.addEdge(v,w);
				edgeCount--;
			}
	}
};

Graph.prototype.clearAllMarks = function() {
	for(var id = 0; id < this._vertexList.length; id++) {
		this._vertexList[id].marked = false;
	}
};



/**
*
* GraphVertex Object
*
**/
var GraphVertex = function(id, name, value){
	this.id            = id;
	this.name          = name;
	this.value         = value;
	this.marked        = false;
	this.adjVertIdList = [];
};

GraphVertex.prototype.addAdjacentVertex = function(vertexId) {
	this.adjVertIdList.push(vertexId);
};

GraphVertex.prototype.removeAdjacentVertex = function(vertexId){
	for(var curr = 0; curr < this.adjVertIdList.length; curr++) {
		var vertex = this.adjVertIdList[curr];
		if(vertex.id == vertexId) {
			this.adjVertIdList.splice(curr, 1);
			return true;
		}
	}

	return false;		
};

GraphVertex.prototype.toString = function() {
	var adjString = "Adjacent Vertices:";

	for(var id = 0; id < this.adjVertIdList.length; id++) {
		adjString += " " + this.adjVertIdList[id].toString();
	}

	return "===============" + this.name + "================\n" +
			"id: " + this.id.toString() + "\n" +
			"value: "  + this.value.toString() + "\n" +
			"marked: " + this.marked.toString() + "\n" +
			adjString + "\n" +
			"========================================" + "\n";
};



/**
*
* GraphEdge Object
*
**/
var GraphEdge = function(name, v, w, weight) {
	this.name   = name;
	
	//ids of vertices this edge connects
	this.v      = v;
	this.w      = w;
	this.weight = weight;
};

GraphEdge.prototype.isEdge = function(v, w) {
	if ((this.v == v && this.w == w) || 
	   (this.v == w && this.w == v)) {
	   	return true;
	}

	return false;
};

GraphEdge.prototype.toString = function() {
	return "===============" + this.name + "===============" + "\n" +
	"v: " + this.v.toString() + "\n" +
	"w: " + this.w.toString() + "\n" +
	"weight: " + this.weight.toString() + "\n" +
	"========================================" + "\n";
};


