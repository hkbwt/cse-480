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
	this.graphState;
	this.graph = new Graph(vertices);
	this.theme = theme;
	this.scene = scene;
	this.meshSize = 5.0;
	this.meshSegments = 5.0;
	this.bfsFrames;
	this.playBFSPosition = 0;
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

		//print something pretty to the console
		console.log("0_0!");
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
			that.removeEdge(edge.name);
		}
		}));
	},

	addVertex: function(value, position){
		if(typeof(value) =="undefined" && typeof(this.graph.vertCount) == "undefined"){
			value = 0;
		}
		else{
			value = this.graph.vertCount;
		}
		this.graph.addVertex(value);
		var defaultMaterial = new BABYLON.StandardMaterial("wallMat", this.scene);
		var vertex = BABYLON.Mesh.CreateSphere(this.graph.getVertexNameById(value), 
					this.meshSegments, this.meshSize, this.scene);
		vertex.position = position;
		//vertex.setMaterialByID(this.theme.vertexMat);
		//defaultMaterial.emissiveColor = this.scene.getMaterialByID(this.theme.activeMatOne).diffuseColor;
		vertex.material = this.scene.getMaterialByID(this.theme.vertexMat);
		this.addVertexClickEvent(vertex);
		BABYLON.Tags.EnableFor(vertex);
		vertex.addTags("vertex");
		this.organizeModel();
	},
	
	addVertexClickEvent: function( mesh){
		mesh.actionManager = new BABYLON.ActionManager(this.scene);
		mesh.actionManager.registerAction(
            new BABYLON.SetValueAction(BABYLON.ActionManager.OnPickTrigger, mesh, "material", that.scene.getMaterialByID(that.theme.activeMatOne)));
		that.nodeCountArray = [];
		mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
		function(){
			switch(that.graphState /*state*/){
			case "addVertice":
				//do nothing
				//can be used later if 
				break;
			case "addEdge":
				//add an edge to the vertices
				that.nodeCountArray.push(mesh)
			
				if(that.nodeCountArray.length >= 2){
					that.addEdgeByMeshes(that.nodeCountArray[0], that.nodeCountArray[1]);
					for(var i = 0; i < that.nodeCountArray.length; i++){
						that.nodeCountArray[i].material = that.scene.getMaterialByID(that.theme.vertexMat);
				//get positions
					}
					that.nodeCountArray = [];		
				}
				break;
			case "removeVertice":
				that.removeVertex(mesh.name)
				break;
			case "bfs":
				that.nodeCountArray.push(mesh);
				that.playBFSPosition = 0;
				if(that.nodeCountArray.length >= 1){
					var that2 = that;
					var n = new runBFS(that.graph, that, that.scene);
					that2.bfsFrames = n.bfsTest(that2.graph.getVertexIdByName(that2.nodeCountArray[0].name));
					that = that2;
					that.nodeCountArray = [];
				}		
				break;
			case "shortest path":
				break;
			case "dfs":
				break;
			}
			}));
		 
	},

	removeEdge: function(name) {
		var allEdgeArray = this.scene.getMeshesByTags("edge");
		for(var i = 0; i<allEdgeArray.length; i++){
			if(allEdgeArray[i].name == name){
				allEdgeArray[i].dispose();	
			}
			this.graph.removeEdge(name);
			
		}
			
	},

	removeVertex: function(name) {
		//code here
		var edgeArray= [];
		var allEdgeArray = this.scene.getMeshesByTags("edge");
		var vertex = this.graph.getVertexIdByName(name);
		for(var i = 0; i<allEdgeArray.length; i++){
			if(allEdgeArray[i].name.indexOf("_" + vertex.toString() + "_") > -1){
				edgeArray.push(allEdgeArray[i].name);		
			}
			else if(allEdgeArray[i].name.indexOf("_" + vertex.toString()) > -1){
				edgeArray.push(allEdgeArray[i].name);	
			}
		}
		var vertices = this.scene.getMeshesByTags("vertex");
		for(var i = 0; i< vertices.length; i++){
			if(vertices[i].name = name){
				vertices[i].dispose();
				for(var j = 0; j < edgeArray.length; j++){
					this.removeEdge(edgeArray[j]);
				}
				break;
			}
		}
		this.graph.removeVertex(name);
		

		
		
		
	},
	removeAll: function(){
		var n = this.scene.getMeshesByTags("edge");
		var m = this.scene.getMeshesByTags("vertex");
		console.log(n);
		console.log(m);
		for(var i = 0; i< n.length; i++){
			n[i].dispose();
		}	
		for(var i = 0; i< m.length; i++){
			m[i].dispose();
		}
	},
	
	playBFS: function(){
		switch(this.graphState){
		case "play":
			if(this.playBFSPosition < this.bfsFrames.length){
			 this.scene = this.bfsFrames[this.playBFSPosition].createScene();
			 this.playBFSPosition++;
			 setTimeout(function(){that.playBFS();}, 500);
			}
			else{;
				this.graphState = "end";
			}
			break;
		case "pause":
			break;
		case "rewind":
			if(this.playBFSPosition > 0){
				this.playBFSPosition--;	
			}
			if(this.playBFSPosition < this.bfsFrames.length){
			 this.scene = this.bfsFrames[this.playBFSPosition].createScene();
			}
			break;
		case "forward":
			if(this.playBFSPosition < this.bfsFrames.length){
				this.playBFSPosition++;	
			}
			if(this.playBFSPosition < this.bfsFrames.length){
			 this.scene = this.bfsFrames[this.playBFSPosition].createScene();
			}
			break;
		case "end":
			break;
		}
	},

	organizeModel: function() {

		this.currVertexCount;		                //number of node in current circle
		if(typeof(this.currVertexCount) == "undefined")
		{
			this.currVertexCount = 0;
		}
		this.vertexLimit;				//max number of nodes allowed in current circle
		if(typeof(this.vertexLimit) == "undefined")
		{
			this.vertexLimit = 0;
		}
								 
		this.radius;					//current circles radius
		if(typeof(this.radius) == "undefined")
		{
			this.radius = 0;
		}
		this.theta;					//angle of current circle
		if(typeof(this.theta) == "undefined")
		{
			this.theta = 0;
		}
		this.dtheta;					//rate of change in the arch of the circle
		if(typeof(this.dtheta) == "undefined")
		{
			this.dtheta = 0;
		}

		var vertexList = this.scene.getMeshesByTags("vertex");

		for(var vertex = 0; vertex < vertexList.length; vertex++) {
			var coord = this.getCircleCoords(this.radius, this.theta);
			vertexList[vertex].position = new BABYLON.Vector3(coord.x, 5, coord.y);

			this.currVertexCount++;

			if(this.currVertexCount >= this.vertexLimit) {
				this.vertexLimit += 2;
				this.currVertexCount = 0;
				this.radius = 6.5 * this.vertexLimit;
				
				this.theta +=  Math.sqrt(3) / 2 * this.vertexLimit;
				this.dtheta = 2 * Math.PI / this.vertexLimit;
			}
			else {
				this.theta += this.dtheta;
			}  

		}
	},

	getCircleCoords: function(radius, theta){
		return {x: radius * Math.cos(theta) , y: radius * Math.sin(theta)};
	},
	
	randomGraph: function(){
		//generate a number of vertices and a number of edges
		this.removeAll();
		this.currVertexCount = 0;
		this.vertexLimit = 0;
		this.radius = 0;
		this.theta = 0;
		this.dtheta = 0;
		var randVertices = Math.floor((Math.random() * 30) + 1);
		var randEdges = Math.floor((Math.random() * (randVertices * (randVertices - 1))));
		
		for(var i = 0; i< randVertices; i++){
			this.addVertex(i,[0,0,0]);
		}
		this.organizeModel();
	}
};
		

