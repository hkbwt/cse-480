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

/*Graph Model
*/

function GraphModel (scene, vertices, theme, size) {
	if(vertices == undefined) {
		vertices = 0;
	}

	this.graph = new Graph(vertices);
	this.theme = theme;
	this.scene = scene;
	this.meshSize = 5.0;
	this.meshSegments = 5.0;


	if(size == 'small') {
		this.meshSize = 3.0;
		this.meshSegments = 3.0;
	}
	else if (size == 'medium') {
		this.meshSize = 6.0;
		this.meshSegments = 6.0;
	}
	else if (size == 'large') {
		this.meshSize = 10.0;
		this.meshSegments = 10.0;
	}


	this.init();
}

GraphModel.prototype = {

	init: function() {		

		for(var currVertex = 0; currVertex < this.graph.vertCount; currVertex++) {
			var currVertexMesh = BABYLON.Mesh.CreateSphere(this.graph.getVertexNameById(currVertex), 
						this.meshSegments, this.meshSize, this.scene);
			currVertexMesh.setMaterialByID(this.theme.vertexMat);
			BABYLON.Tags.EnableFor(currVertexMesh);
			currVertexMesh.addTags("vertex");
		}

		this.organizeModel();
	},
	
	addEdgeByValues: function(v, w) {

		var fromVertexName = this.graph.getVertexNameById(v);
		var toVertexName = this.graph.getVertexNameById(w);

		var fromVertex = this.scene.getMeshByName(fromVertexName);
		var toVertex = this.scene.getMeshByName(toVertexName);

		this.graph.addEdge(v, w);

		var edge = BABYLON.Mesh.CreateLines(this.graph.getEdgeNameById(v,w),
			 		[fromVertex.position, toVertex.position], this.scene);
		
		edge.color = this.scene.getMaterialByID(this.theme.edgeMat).diffuseColor;
		BABYLON.Tags.EnableFor(edge);
		edge.addTags("edge")
	},


	addEdgeByMeshes: function(fromVertex, toVertex) {

		var v = this.graph.getVertexIdByName(fromVertex.name);
		var w = this.graph.getVertexIdByName(toVertex.name);

		this.graph.addEdge(v, w);


		var edge = BABYLON.Mesh.CreateLines(this.graph.getEdgeNameById(v,w),
			 		[fromVertex.position, toVertex.position], this.scene);
		
		edge.color = this.scene.getMaterialByID(this.theme.edgeMat).diffuseColor;
		BABYLON.Tags.EnableFor(edge);
		edge.addTags("edge")
	},	

	addVertex: function(value, position){
		this.graph.addVertex(value);
		var vertex = BABYLON.Mesh.CreateSphere(this.graph.getVertexNameById(this.vertCount - 1), 
					this.meshSegments, this.meshSize, this.scene);
		vertex.position = position;
		vertex.setMaterialByID(this.theme.vertexMat);

		BABYLON.Tags.EnableFor(vertex);
		vertex.addTags("vertex");
	},

	removeEdge: function(name) {
		//code here	
	},

	removeVertex: function(name) {
		//code here
	},

	organizeModel: function() {

		var currVertexCount = 0;	//number of node in current circle
		var vertexLimit = 1;		//max number of nodes allowed in current circle 
		var radius = 0;				//current circles radius
		var theta = 0;				//angle of current circle
		var dtheta = 0;				//rate of change in the arch of the circle

		var vertexList = this.scene.getMeshesByTags("vertex");

		for(var vertex = 0; vertex < vertexList.length; vertex++) {
			var coord = this.getCircleCoords(radius, theta);
			vertexList[vertex].position = new BABYLON.Vector3(coord.x, 5, coord.y);

			currVertexCount++;

			if(currVertexCount >= vertexLimit) {
				vertexLimit += 2;
				currVertexCount = 0;
				radius = 6.5 * vertexLimit;
				
				theta +=  Math.sqrt(3) / 2 * vertexLimit;
				dtheta = 2 * Math.PI / vertexLimit;
			}
			else {
				theta += dtheta;
			}  

		}
	},

	getCircleCoords: function(radius, theta){
		return {x: radius * Math.cos(theta) , y: radius * Math.sin(theta)};
	}
};
		

