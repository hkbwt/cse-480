/********************************************************
*
*           Date: 9.10.2014
*           Filename: adt.js
*
*
*
*
*********************************************************/
/*
	the Graph model uses the Vetex and Edge Objects to keep track of
	the respecting inside a graph. each vertex object has is identified with
	a primary key id and has with it the model name and most importantly the adj array.
	that holds for the vertex class the ids of all known adjcent vertices. the edge class
	keep track of two ids w and v each the id for the two connected vertices.
 */


var  Graph = function(vertCount) {
	this._vertCount  = 0;
	this._edgeCount  = 0;
	this._vertexList = [];
	this._edgeList   = [];

	this._init(vertCount);

	this._init = function(count) {
		var total = count;
		while(count > 0) {
			this.addVertex(total - count);
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
		for( var vertex in this._vertexList ) {
			if (vertex.id == id) { return vertex; }
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
		return "edge" + '_' + vertexIdOne + "_" + vertexIdTwo;
	};

	this.getEdgeIdByName = function(name) {
		var parts = name.split("_");
		return [parseInt(parts[0]), parseInt(parts[1])];

	};

	////==================================================
	//	Add and Remove Vertices and Edges from Graph Class
	////==================================================

	this.addVertex = function(value) {
		
    	if(typeof(value) == "undefined"){
    		value = this._vertexCount;
    	}
    	var name = this.getVertexNameById(this._vertCount);

    	var _vertex = new GraphVertex(this._vertCount, name, value);
    	this._vertexList.push(_vertex);
    	this._vertexCount++;
    };


	this.removeVertex = function(v){
		var a = [];
		for( var i = 0; i< this.vertexQueue.length; i++){
			if(this.vertexQueue[i].name != this.getVertexIdByName(v)){
				a.push(this.vertexQueue[i]);
			}
		}
		this.vertexQueue = a;
		this.vertCount--;
	};


	this.addEdge = function(v,w) {
		var fromVertex = this.getVertexById(v);
		var toVertex = this.getVertexById(w);

		var _edge = new GraphEdge(this.getEdgeNameById(v,w), fromVertex, toVertex, 1.0);
		this._edgeList.push(_edge);

	    fromVertex.adjacentVertexList.push(w);
	    toVertex.adjacentVertexList.push(v);

	    this._edgeCount++;    
    };

   	this.removeEdge = function(v){
		var vertice = this.getEdgeIdByName(v);
		this.vertexQueue[vertice[0]].removeAdjacentVertex(vertice[1]);
		this.vertexQueue[vertice[1]].removeAdjacentVertex(vertice[0]);
		this.edgeCount--;
	};

	////==================================================
	//	Helper Methods
	////==================================================


	this.getVertexCount = function() {
		return this._vertCount;
	};

	this.getEdgeCount = function() {
		return this._edgeCount;
	};

   	this.edgeExist = function(v,w){
	    for(var i = 0; i< this.vertexQueue.length; i++){
		if(this.vertexQueue[i] == v){
			for(var j = i; j< this.vertexQueue.length; j++){
				if(this.vertexQueue[j] == w){
					return true;	
				}
			}
		}
	}
	return false;
    };

	
	this.printGraph = function() {
	    var msg = " ";

	    for(var i = 0; i < this.vertCount; i++) {
	        msg += + i + " -> ";  

	        for(var j = 0; j < this.vertCount; j++) {
	            if(this.adjList[i][j] !== undefined) {
	                msg += this.adjList[i][j] + ' ';
	            }
	        }

	        msg += "<br>";
	    }
	        return msg;
    };

};



var GraphVertex = function(id, name, value){
	this.id            = id;
	this.name          = name;
	this.value         = value;
	this.marked        = false;

	//vertex adjacency array of vertex ids
	this.adjacentVertexList = [];

	this.addAdjacentVertex = function(vertexId) {
		this.adjacentVertexList.push(vertexId);
	};

	this.removeAdjacentVertex = function(vertexId){
		for(var curr = 0; curr < this.adjacentVertexList.length; curr++) {
			var vertex = this.adjacentVertexList[curr];
			if(vertex.id == vertexId) {
				this.adjacentVertexList.splice(curr, 1);
				return true;
			}
		}

		return false;		
	};
	
};

var GraphEdge = function(name, v, w, weight) {
	this.name = name;

	//ids of vertices this edge connects
	this.v = v;
	this.w = w;
	this.weight = weight;
};





