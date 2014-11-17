//Methods used to create a graph
//will contain all graph objects
//for this week imma just include generic graphs and BFS
var vertexQueue = [];
var edgeMeshArray = [];
var vertexMeshArray = [];
var scene;
var state = "addVertice";
var graphObject =  function(scene){
	this.maxSize = 50;
	this.size = 0;
	scene = scene;
};

function ChangeState(num){
	switch(num){
		case 1:
			state = "addVertice";
			break;
		case 2: 
			state = "addEdge";
			break;
		case 3:
			state = "bfs";
			break;
	}
}

graphObject.prototype = {
	isEmpty: function(){
	if(this.vertexMeshArray.length == 0){
		return true;
	}
	else{
		return false;
	}
	},
	isFull: function(){
	//return true if maxSize
		if(this.maxSize <= this.size){
			return true;
		}
		else{
			return false;
		}
	},
	addVertex: function(scene,locationX, locationY){
		
		var a = new graphVertex(vertexMeshArray.length.toString(),vertexMeshArray.length.toString());
		//addEdgeEvent(vertexMeshArray[vertexMeshArray.length -1]);
		vertexQueue.push(a)
		var newScene = a.Create(scene ,vertexMeshArray.length.toString() ,locationX, locationY);
		addEdgeEvent(this ,vertexMeshArray[vertexMeshArray.length -1]);
		return newScene;
	//If graph is not full
	// vertex is not already added to graph
	
	},
	hasVertex: function(vertexObject){
	//returns true if graph has vertex
		return 0;
	},
	addEdge: function(fromVertexObject, toVertexObject){
	//add edge to vertices
	var exists = false;
	var edgeName = nodeCountArray[0].name.toString() + "to" +nodeCountArray[1].name.toString()
	var altName = nodeCountArray[1].name.toString() + "to" +nodeCountArray[0].name.toString()
		for(var i = 0; i< vertexQueue.length; i++){
			if(vertexQueue[i].name == nodeCountArray[0].name){
				for(var j = 0; j< edgeMeshArray.length; j++){
					if(edgeMeshArray[j].name == edgeName || edgeMeshArray[j].name == altName){
						return scene;	
					}
				}
				edgeMeshArray.push(BABYLON.Mesh.CreateLines(edgeName , [nodeCountArray[0].position, nodeCountArray[1].position], scene));
				vertexQueue[i].adjacentQueue.push(nodeCountArray[1].name);
			}
			if(vertexQueue[i].name == nodeCountArray[1].name){
				vertexQueue[i].adjacentQueue.push(nodeCountArray[0].name);
			}
		}
		//add line to connect
		return scene;
	},
	weightIs: function(fromVertexObject, toVertexObject){
		return 0;
	},
	getToVertices: function(verticeName){
	//return queue of the vertices that are adjacent from vertex
	return vertexQueue[verticeName].getAdjacentVertice();	
	//return vertexQueue[verticeName].adjacentQueue;
	},
	clearMarks: function(){
		for(var i = 0; i < vertexMeshArray.length; i++){
			vertexMeshArray[i].material.emissiveColor = BABYLON.Color3.Blue();
			vertexQueue[i].marked = false;
		}
	},
	markVertex: function(verticeName){
		vertexQueue[verticeName].setMark();
	},
	getUnmarked: function(){
	//returns an unmarked vertex if any exist: otherwise, return null
	},
	isMark: function(verticeName){
		return vertexQueue[verticeName].getMark();
	}
	

}; 

var graphVertex = function(value, name){
	this.marked = false;
	this.value = value;
	this.name = name;
	this.adjacentQueue = [];
	
}

//graphVertex.prototype = {//whatever contains the webgl creation methods.

graphVertex.prototype.Create = function(scene, name, x, y){

	var defaultMaterial = new BABYLON.StandardMaterial("wallMat", scene);
		
		var backgroundTexture2 = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
		
		backgroundTexture2.drawText(name, null, 350, "bold 100px Segoe UI", "white", "#555555");
		defaultTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    		defaultTexture.hasAlpha = true;
		defaultMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    		defaultMaterial.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
 		defaultMaterial.emissiveColor = BABYLON.Color3.Blue();
		vertexMeshArray.push(BABYLON.Mesh.CreateSphere(name, 8.0, 4.0, scene));
		vertexMeshArray[vertexMeshArray.length -1].position = new BABYLON.Vector3(x, y, -0.1);
		vertexMeshArray[vertexMeshArray.length -1].material = defaultMaterial;
		vertexMeshArray[vertexMeshArray.length -1].material.diffuseTexture = backgroundTexture2;
		
		return scene;
}
graphVertex.prototype.getMark = function(){
	return this.marked;
}
var nodeCountArray = [];

function addEdgeEvent(graphObject,mesh){
	var defaultMaterial = new BABYLON.StandardMaterial("wallMat", scene);
	
    		
 		defaultMaterial.emissiveColor = BABYLON.Color3.Blue();


		var redMat = new BABYLON.StandardMaterial("wallMat", scene);
    		
 		redMat.emissiveColor = BABYLON.Color3.Red();		


		mesh.actionManager = new BABYLON.ActionManager(scene);
		mesh.actionManager.registerAction(
            new BABYLON.SetValueAction(BABYLON.ActionManager.OnPickTrigger, mesh.material, "emissiveColor", new BABYLON.Color3.Red()))
		
		mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
		function(){
			switch(state){
			case "addVertice":
				//do nothing
				break;
			case "addEdge":
				//add an edge to the vertices
				nodeCountArray.push(mesh);
			
				if(nodeCountArray.length >= 2){
					graphObject.addEdge(scene,nodeCountArray[0], nodeCountArray[1]);
					for(var i = 0; i < nodeCountArray.length; i++){
						nodeCountArray[i].material.emissiveColor = new BABYLON.Color3.Blue();;
				//get positions
					}
					nodeCountArray = [];
					edgeCounter = 0;		
				}
				break;
			case "bfs":
				nodeCountArray.push(mesh);
				if(nodeCountArray.length >= 1){
					bfsPauseTest();
				//get positions
					nodeCountArray = [];
					edgeCounter = 0;
				}		
				break;
			}
			
			}));
}


graphVertex.prototype.color = function(mesh, color){
	//takes a mesh object and changes its color property
	//sphereObject function call
	mesh.material.emissiveColor = color;
}
graphVertex.prototype.setMark = function(){
	//used Searches
	//based on color return true or false
	for(var i = 0; i < vertexMeshArray.length; i++){
		if(vertexMeshArray[i].name == this.name){
			vertexMeshArray[i].material.emissiveColor = new BABYLON.Color3.Red();
		}
	}
	this.marked = true;	
}
graphVertex.prototype.getAdjacentVertice = function(){
	var newArray = [];
	for (var i = 0 ; i < this.adjacentQueue.length; i++){
		newArray.push(this.adjacentQueue[i]);
	}
	return newArray;
};

//normal bfs
//

var bfsTest = function(){
	newGraphObject.clearMarks();
	var queue = [];
	newGraphObject.markVertex(nodeCountArray[0].name);
	queue.push(vertexQueue[nodeCountArray[0].name]);
	while(queue.length >0){
		var v = queue.shift();
		if(v != "undefined"){
			console.log("Visited vertex: " + v.name);
		}
		
		newGraphObject.getToVertices(v.name).forEach(function(entry){
			if(!newGraphObject.isMark(entry)){
				//mark edge
				newGraphObject.markVertex(entry);
				queue.push(vertexQueue[entry]);
			}
		});
	}
}


//split the function up so it always the engine to update the scene
var queue = [];
var bfsPauseTest = function(){
	newGraphObject.clearMarks();
	
	newGraphObject.markVertex(nodeCountArray[0].name);
	queue.push(vertexQueue[nodeCountArray[0].name]);
	bfsPauseTest_helper();
	
}

var bfsPauseTest_helper = function(){
	if(queue.length >0){
		var v = queue.shift();
		if(v != "undefined"){
			v.color(vertexMeshArray[v.name], BABYLON.Color3.Green());
			console.log("Visited vertex: " + v.name);
		}
		var newAdjArray = newGraphObject.getToVertices(v.name);
		setTimeout(function(){loop(newAdjArray);}, 500);
	}
}

function loop(newAdjArray){
	if(newAdjArray.length != 0){
			var checkVertex = newAdjArray.pop();
			if(!newGraphObject.isMark(checkVertex)){
				//mark edge
				newGraphObject.markVertex(checkVertex);
				queue.push(vertexQueue[checkVertex]);
			}
			setTimeout(function(){loop(newAdjArray);}, 500);
	}
	else{
		setTimeout(function(){bfsPauseTest_helper();}, 500);}	
}