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

    //initialize starting values for each vertex
    this.valueList = [];
    for (var i = 0; i < this.vertCount; i++) {
        this.valueList.push(i);
    }

    //initialize starting adjacency lists
    for(var i = 0; i < this.vertCount; i++){
        this.adjList.push([]);
    }

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

	    this.adjList[v].push(w);
	    this.adjList[w].push(v);
	    this.edgeCount++;
    },
    removeEdge: function(v){
		
	},

    addVertex: function(value) {
    	this.adjList.push([]);
    	this.valueList.push(value);
    	this.VertCount++;
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

