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
	that = this;

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
			//var currVertexMesh = BABYLON.Mesh.CreateSphere(this.graph.getVertexNameById(currVertex), 
						//this.meshSegments, this.meshSize, this.scene);
			//currVertexMesh.setMaterialByID(this.theme.vertexMat);
			//BABYLON.Tags.EnableFor(currVertexMesh);
			//currVertexMesh.addTags("vertex");
			this.addVertex(currVertex, [0,0,0]);
		}

		this.organizeModel();
	},
	
	addEdgeByValues: function(v, w) {

		//point to point
		
		var fromVertexName = this.graph.getVertexNameById(v);
		var toVertexName = this.graph.getVertexNameById(w);
		var fromVertex = this.scene.getMeshByName(fromVertexName);
		var toVertex = this.scene.getMeshByName(toVertexName);
		var distance = BABYLON.Vector3.Distance(fromVertex.position, toVertex.position);
		var edge = BABYLON.Mesh.CreateCylinder(this.graph.getEdgeNameById(v,w), (BABYLON.Vector3.Distance(fromVertex.position, toVertex.position)), 1, 1, 0, 1, this.scene, true)
		// First of all we have to set the pivot not in the center of the cylinder:
		edge.setPivotMatrix(BABYLON.Matrix.Translation(0, -distance / 2, 0));
		// Then move the cylinder to red sphere
		edge.position = toVertex.position;
		// Then find the vector between spheres
		var v1 = toVertex.position.subtract(fromVertex.position);
		v1.normalize();
		var v2 = new BABYLON.Vector3(0, 1, 0);
		// Using cross we will have a vector perpendicular to both vectors
		var axis = BABYLON.Vector3.Cross(v1, v2);
		axis.normalize();
		// Angle between vectors
		var angle = BABYLON.Vector3.Dot(v1, v2);
		console.log(angle);
		// Then using axis rotation the result is obvious
		edge.rotationQuaternion = BABYLON.Quaternion.RotationAxis(axis, -Math.PI / 2 + angle);
		

		this.graph.addEdge(v, w);
		//edge.isPickable = true;
		edge.material = this.scene.getMaterialByID(this.theme.edgeMat);
		BABYLON.Tags.EnableFor(edge);
		edge.addTags("edge")
		this.addEdgeDetectEvent(edge);
	},


	addEdgeByMeshes: function(fromVertex, toVertex) {
		
		var v = this.graph.getVertexIdByName(fromVertex.name);
		var w = this.graph.getVertexIdByName(toVertex.name);
		//
		var distance = BABYLON.Vector3.Distance(fromVertex.position, toVertex.position);
		var edge = BABYLON.Mesh.CreateCylinder(this.graph.getEdgeNameById(v,w), (BABYLON.Vector3.Distance(fromVertex.position, toVertex.position)), 1, 1, 0, 1, this.scene, true)
		// First of all we have to set the pivot not in the center of the cylinder:
		edge.setPivotMatrix(BABYLON.Matrix.Translation(0, -distance / 2, 0));
		// Then move the cylinder to red sphere
		edge.position = toVertex.position;
		// Then find the vector between spheres
		var v1 = toVertex.position.subtract(fromVertex.position);
		v1.normalize();
		var v2 = new BABYLON.Vector3(0, 1, 0);
		// Using cross we will have a vector perpendicular to both vectors
		var axis = BABYLON.Vector3.Cross(v1, v2);
		axis.normalize();
		// Angle between vectors
		var angle = BABYLON.Vector3.Dot(v1, v2);
		// Then using axis rotation the result is obvious
		edge.rotationQuaternion = BABYLON.Quaternion.RotationAxis(axis, -Math.PI / 2 + angle);
		edge.material = this.scene.getMaterialByID(this.theme.edgeMat);
		BABYLON.Tags.EnableFor(edge);
		edge.addTags("edge")
		//
		this.graph.addEdge(v, w);
		//old funcitonality
		//var edge = BABYLON.Mesh.CreateLines(this.graph.getEdgeNameById(v,w),
		//	 		[fromVertex.position, toVertex.position], this.scene);
		this.addEdgeDetectEvent(edge);
	},	
	addEdgeDetectEvent: function(edge){
		edge.actionManager = new BABYLON.ActionManager(this.scene);
		edge.actionManager.registerAction(
			new BABYLON.SetValueAction(BABYLON.ActionManager.OnPickTrigger, edge, "emissiveColor", that.scene.getMaterialByID(that.theme.activeMatOne).diffuseColor));
            	edge.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
		function(){
		if(true /*state*/){
			edge.dispose();
		}
		}));
	},

	addVertex: function(value, position){
		this.graph.addVertex(value);
		var defaultMaterial = new BABYLON.StandardMaterial("wallMat", this.scene);
		var vertex = BABYLON.Mesh.CreateSphere(this.graph.getVertexNameById(value), 
					this.meshSegments, this.meshSize, this.scene);
		vertex.position = position;
		//vertex.setMaterialByID(this.theme.vertexMat);
		//defaultMaterial.emissiveColor = this.scene.getMaterialByID(this.theme.activeMatOne).diffuseColor;
		vertex.material = this.scene.getMaterialByID(this.theme.activeMatOne);
		this.addVertexClickEvent(vertex);
		BABYLON.Tags.EnableFor(vertex);
		vertex.addTags("vertex");
	},
	
	addVertexClickEvent: function( mesh){
		mesh.actionManager = new BABYLON.ActionManager(this.scene);
		mesh.actionManager.registerAction(
            new BABYLON.SetValueAction(BABYLON.ActionManager.OnPickTrigger, mesh, "material", that.scene.getMaterialByID(that.theme.activeMatTwo)));
		that.nodeCountArray = [];
		mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
		function(){
			that.thatter;
			switch(true /*state*/){
			case "addVertice":
				//do nothing
				break;
			case true:
				//add an edge to the vertices
				that.nodeCountArray.push(mesh)
			
				if(that.nodeCountArray.length >= 2){
					that.addEdgeByMeshes(that.nodeCountArray[0], that.nodeCountArray[1]);
					for(var i = 0; i < that.nodeCountArray.length; i++){
						that.nodeCountArray[i].material = that.scene.getMaterialByID(that.theme.activeMatOne);
				//get positions
					}
					that.nodeCountArray = [];		
				}
				break;
			case "bfs":
				thatter.push(mesh);
				if(that.nodeCountArray.length >= 1){
					bfsPauseTest();
				//get positions
					that.nodeCountArray = [];
				}		
				break;
			}
			}));
		 
	},

	removeEdge: function(name) {
		var allEdgeArray = scene.getMeshesByTags("edge");
		for(var i = 0; i<allEdgeArray.length; i++){
			if(allEdgeArray[i].name == name){
				allEdgeArray[i].dispose();	
			}
			
		}
			
	},

	removeVertex: function(name) {
		//code here
		var edgeArray= [];
		var allEdgeArray = scene.getMeshesByTags("edge");
		var vertex = this.graph.getVertexIdByName(name);
		for(var i = 0; i<allEdgeArray.length; i++){
			if(allEdgeArray[i].name.indexOf("_" + vertex.toString() + "_") > -1){
				edgeArray.push(allEdgeArray[i].name);		
			}
			else if(allEdgeArray[i].name.indexOf("_" + vertex.toString()) > -1){
				edgeArray.push(allEdgeArray[i].name);	
			}
		}
		var vertices = scene.getMeshesByTags("vertex");
		for(var i = 0; i< vertices.length; i++){
			if(vertices[i].name = name){
				vertices[i].dispose();
				for(var j = 0; j < edgeArray.length; j++){
					this.removeEdge(edgeArray[j]);
				}
				break;
			}
		}

		
		
		
	},
	removeAll: function(){
		var n = scene.getMeshesByTags("edge");
		var m = scene.getMeshesByTags("vertex");
		console.log(n);
		console.log(m);
		for(var i = 0; i< n.length; i++){
			n[i].dispose();
		}	
		for(var i = 0; i< m.length; i++){
			m[i].dispose();
		}
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
		

