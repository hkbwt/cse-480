/********************************************************
*
*           Author: Various
*           Date: 9.10.2014
*           Filename: adt.js
*
*
*
*
*********************************************************/

function Graph(vertCount) {
	this.vertCount = vertCount;
	this.edgeCount = 0;
	this.adjList = [];
	this.vertexQueue = [];
	

    //initialize starting values for each vertex
    this.valueList = [];
    //for (var i = 0; i < this.vertCount; i++) {
    //    this.valueList.push(i);
    //}

    //initialize starting adjacency lists
   // for(var i = 0; i < this.vertCount; i++){
   //     this.adjList.push([]);
   // }

}

Graph.prototype =  {

	getVertexNameById: function(vertexId) {
		return "vertex_" + vertexId;
	},

	getEdgeNameById: function(vertexIdOne, vertexIdTwo) {
		return "edge" + '_' + vertexIdOne + "_" + vertexIdTwo;
	},

	getVertexIdByName: function(name) {
		var parts = name.split("_");
		return parseInt(parts[1]);

	},

	getEdgeIdByName: function(name) {
		var parts = name.split("_");
		return [parseInt(parts[1]), parseInt(parts[2])];

	},

	addEdge: function(v,w) {

	    //this.adjList[v].push(w);
	    //this.adjList[w].push(v);
	    this.vertexQueue[v].adjacentQueue.push(w);
	    this.vertexQueue[w].adjacentQueue.push(v);
	    this.edgeCount++;
	    
	    
    },
   	 edgeExist: function(v,w){
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
    },
   	 removeEdge: function(v){
		var vertice = this.getEdgeIdByName(v);
		this.vertexQueue[vertice[0]].removeAdjacentVertex(vertice[1]);
		this.vertexQueue[vertice[1]].removeAdjacentVertex(vertice[0]);
		this.edgeCount--;
	},
	removeVertex: function(v){
		var a = [];
		for( var i = 0; i< this.vertexQueue.length; i++){
			if(this.vertexQueue[i].name != this.getVertexIdByName(v)){
				a.push(this.vertexQueue[i]);
			}
		}
		this.vertexQueue = a;
		this.vertCount--;
	},

	addVertex: function(value) {
    	//this.adjList.push([]);
    	//this.valueList.push(value);
    	if(typeof(value) == "undefined"){
    		value = this.vertexQueue.length;
    	}
    	var a = new graphVertex(value, this.getVertexNameById(this.vertexQueue.length));
    	this.vertexQueue.push(a);
    	this.vertCount++;
    },
   	 getToVertices: function(verticeName){
    	    return this.vertexQueue[this.getVertexIdByName(verticeName)].getAdjacentVertice();
    },
   	 clearMarks: function(){
		for(var i = 0; i < this.vertexQueue.length; i++){
			
			this.vertexQueue[i].marked = false;
		}
	},
	markVertex: function(verticeName){
		this.vertexQueue[verticeName].setMark();
	},
	isMark: function(verticeName){
		return this.vertexQueue[verticeName].getMark();
	},
	
    

	printGraph: function() {
	    var msg = " ";

	    for(var i = 0; i < this.vertCount; i++) {
	        msg += + i + " -> ";  

	        for(var j = 0; j < this.vertCount; j++) {
	            if(this.adjList[i][j] != undefined) {
	                msg += this.adjList[i][j] + ' ';
	            }
	        }

	        msg += "<br>";
	    }
	        return msg;
    }

};


var graphVertex = function(value, name){
	this.marked = false;
	this.value = value;
	this.name = name;
	this.adjacentQueue = [];
	
};

//graphVertex.prototype = {//whatever contains the webgl creation methods.

graphVertex.prototype.getMark = function(){
	return this.marked;
};

graphVertex.prototype.setMark = function(){
	this.marked = true;	
};
graphVertex.prototype.getAdjacentVertice = function(){
	return this.adjacentQueue;
};
graphVertex.prototype.removeAdjacentVertex = function(w){
	var a = []
	for(var i = 0; i < this.adjacentQueue.length; i++){
		if(this.adjacentQueue[i] != w){
			a.push(this.adjacentQueue[i]);
		}
	}
	this.adjacentQueue = a;
};


