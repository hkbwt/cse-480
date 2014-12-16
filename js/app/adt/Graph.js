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


var Graph = function() {
	this._idCount    = 0;
	this._vertexList = [];
	this._edgeList   = [];

	this.init = function(count) {
		this.clearGraph();

		while(count > 0) {
			this.addVertex();
			count--;
		}
	};

	////==================================================
	//  		access vertex objects
	////==================================================
	
	this.getVertexByName = function(name){

		for( var vertex in this._vertexList ) {
			if (vertex.name == name) { return vertex; }
		}
		return null;
	};

	this.getVertexById = function(vertexId) {
		for( var vertex = 0; vertex < this._vertexList.length; vertex++ ) {
			if (this._vertexList[vertex].id == vertexId) { return this._vertexList[vertex]; }
		}
		return null;
	};

	this.getEdgeByName = function(name) {
		for( var edge in this._edgeList ) {
			if (edge.name == edge) { return edge; }
		}
		return null;
	};

	this.getEdgeById = function(v, w) {
		var edge = this.getEdgeByName(this.getEdgeNameById(v,w));

		if(edge === null) {
			edge = this.getEdgeByName(this.getEdgeNameById(w,v));
		}

		return edge;
	};

    ////==================================================
    // defines the relationship between names and ids
    // for both vetices and edges
    ////==================================================

	this.getVertexNameById = function(vertexId) {
		return "vertex_" + vertexId;
	};

	this.getVertexIdByName = function(name) {
		var parts = name.split("_");
		return parseInt(parts[1]);
	};

	this.getEdgeNameById = function(vertexIdOne, vertexIdTwo) {
		if(vertexIdOne < vertexIdTwo) {
			return "edge" + '_' + vertexIdOne + "_" + vertexIdTwo;
		}
		return "edge" + '_' + vertexIdTwo + "_" + vertexIdOne;
	};

	this.getEdgeIdByName = function(name) {
		var parts = name.split("_");
		return [{v: parseInt(parts[0])}, {w: parseInt(parts[1])}];
	};

	////==================================================
	//	Add and Remove Vertices and Edges from Graph Class
	////==================================================

	this.addVertex = function(value) {
		
    	if(typeof(value) == "undefined"){
    		value = this._idCount;
    	}
    	var name = this.getVertexNameById(this._idCount);

    	var vertex = new GraphVertex(this._idCount, name, value);
    	this._vertexList.push(vertex);
    	this._idCount++;
    };

	this.removeVertexById = function(vertexId){
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

	this.removeVertexByName = function(name) {
		var id = this.getVertexIdByName(name);
		this.removeVertexById(id);
	};

	this.addEdge = function(v,w) {
		if(this.hasEdgeById(v, w)) { return; }

		var fromVertex = this.getVertexById(v);
		var toVertex = this.getVertexById(w);

		var edge = new GraphEdge(this.getEdgeNameById(v,w), v, w, 1.0);
		this._edgeList.push(edge);

	    fromVertex.addAdjacentVertex(w);
	    toVertex.addAdjacentVertex(v);   
    };

   	this.removeEdgeByValue = function(v, w){
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

	this.removeEdgeByName = function(name) {
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

	this.getVertexCount = function() {
		return this._vertexList.length;
	};

	this.getEdgeCount = function() {
		return this._edgeList.length;
	};

   	this.hasEdgeById = function(v,w){
   		for( var edgeId = 0; edgeId < this._edgeList.length; edgeId++) {
   			if(this._edgeList[edgeId].isEdge(v, w)) {
   				return true;
   			}
   		}
   		return false;
    };

    this.hasEdgeByName = function(name) {
    	for( var edge in this._edgeList) {
    		if(edge.name == name) {
    			return true;
    		}
    	}
    	return false;
    };
	
	this.printGraph = function() {
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

    this.removeAllEdges = function() {
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

    this.clearGraph = function() {
    	while(this.getVertexCount() > 0 ) {
    		this._vertexList.pop();
    	}

    	while(this.getEdgeCount() > 0){
    		this._edgeList.pop();
    	}

    	this._idCount = 0;
    };

    this.createRandomGraph = function(ubVertexNumber, ubEdgeNumber) {
    	var edgeCount = Math.floor((Math.random() * ubEdgeNumber) + 1);
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

    this.clearAllMarks = function() {
    	for(var id = 0; id < this._vertexList.length; id++) {
    		this._vertexList[id].mark = false;
    	}
    };

};

var GraphVertex = function(id, name, value){
	this.id            = id;
	this.name          = name;
	this.value         = value;
	this.marked        = false;

	//vertex adjacency array of vertex ids
	this.adjVertIdList = [];

	this.addAdjacentVertex = function(vertexId) {
		this.adjVertIdList.push(vertexId);
	};

	this.removeAdjacentVertex = function(vertexId){
		for(var curr = 0; curr < this.adjVertIdList.length; curr++) {
			var vertex = this.adjVertIdList[curr];
			if(vertex.id == vertexId) {
				this.adjVertIdList.splice(curr, 1);
				return true;
			}
		}

		return false;		
	};

	this.toString = function() {
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
};

var GraphEdge = function(name, v, w, weight) {
	this.name = name;

	//ids of vertices this edge connects
	this.v = v;
	this.w = w;
	this.weight = weight;

	this.isEdge = function(v, w) {
		if ((this.v == v && this.w == w) || 
		   (this.v == w && this.w == v)) {
		   	return true;
		}

		return false;
	};

	this.toString = function() {
		return "===============" + this.name + "===============" + "\n" +
		"v: " + this.v.toString() + "\n" +
		"w: " + this.w.toString() + "\n" +
		"weight: " + this.weight.toString() + "\n" +
		"========================================" + "\n";
	};
};





