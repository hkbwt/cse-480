var runBFS = function(graph, model, scene){
	this.newGraphADT = graph
	this.graphModel = model;
	this.scene = scene;
	that = this;
	this.queue = [];
	this.StartVertice;
	this.newAdjArray;
	this.currentPos = 0; 
	this.stateMachineArray = [];
	
}


runBFS.prototype ={
	bfsTest: function(startVertice){
	//
	this.stateMachineArray.push(new stateMachineData(1, this.scene, this.graphModel.theme));
	this.stateMachineArray[this.stateMachineArray.length -1].setAllVerticeMeshData(0);
	this.newGraphADT.clearMarks();
	//
	this.stateMachineArray.push(new stateMachineData(2, this.scene, this.graphModel.theme));
	this.stateMachineArray[this.stateMachineArray.length -1].setAllVerticeMeshData(0);
	this.queue = [];
	//
	this.stateMachineArray.push(new stateMachineData(3, this.scene, this.graphModel.theme));
	this.stateMachineArray[this.stateMachineArray.length -1].setAllVerticeMeshData(0);
	this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(startVertice,1);
	this.newGraphADT.markVertex(startVertice);
	//
	this.stateMachineArray.push(new stateMachineData(4, this.scene, this.graphModel.theme));
	this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
	this.queue.push(this.newGraphADT.vertexQueue[startVertice]);
	//
	this.stateMachineArray.push(new stateMachineData(5, this.scene, this.graphModel.theme));
	this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
	while(this.queue.length >0){
		//
		this.stateMachineArray.push(new stateMachineData(6, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
		var v = this.queue.shift();
		//
		this.stateMachineArray.push(new stateMachineData(7, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
		if(v != "undefined"){
		//
			this.stateMachineArray.push(new stateMachineData(8, this.scene, this.graphModel.theme));
			this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
			this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(v.name,2);
			console.log("Visited vertex: " + v.name);
			//
		}
		
		this.stateMachineArray.push(new stateMachineData(9, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
		this.newGraphADT.getToVertices(v.name).forEach(
		//
			function(entry){
			//
			that.stateMachineArray.push(new stateMachineData(10, that.scene, that.graphModel.theme));
			that.stateMachineArray[that.stateMachineArray.length -1].copyVerticeMeshData(that.stateMachineArray[that.stateMachineArray.length -2].getVerticeMeshData());
			if(!that.newGraphADT.isMark(entry)){
				//
				that.stateMachineArray.push(new stateMachineData(11, that.scene, that.graphModel.theme));
				that.stateMachineArray[that.stateMachineArray.length -1].copyVerticeMeshData(that.stateMachineArray[that.stateMachineArray.length -2].getVerticeMeshData());
				that.stateMachineArray[that.stateMachineArray.length -1].setVerticeMeshData(entry,1);
				that.newGraphADT.markVertex(entry);
				//
				that.stateMachineArray.push(new stateMachineData(12, that.scene, that.graphModel.theme));
				that.stateMachineArray[that.stateMachineArray.length -1].copyVerticeMeshData(that.stateMachineArray[that.stateMachineArray.length -2].getVerticeMeshData());
				that.queue.push(that.newGraphADT.vertexQueue[entry]);
			}
		});
	}
	return this.stateMachineArray;
}


}




var algoState = function(currentState){
	//points to line in file
	switch(currentState){
	case 0:
		//clearMarks()
		break;
	case 1:
		//createQueue()
		break;
	case 2:
		//graph.markVertex
		break;
	case 3:
		//queue.push(vertexQueue)
		break;
	case 4:
		//enter while loop
		break;
	case 5:
		//var v = queue.shift()
		break;
	case 6:
		//clearMarks()
		break;
	case 7:
		//if statement
		break;
	case 8:
		//console.log print visited
		break;
	case 9:
		//newGraphObject.getToVertices(v.name).foreach(entry){
		break;
	case 10:
		//if(!newGraphobject.isMark(entry))
		break;
	case 11:
		//newGraphobject.markVertex
		break;
	case 12:
		//queue.push(vertexQueue[entry])
		break;
	}
}

var stateMachineData = function(currentState, scene, themes){
	this.scene = scene;
	this.currentState = currentState;
	this.VerticeMeshes = scene.getMeshesByTags("vertex");
	this.VerticeMeshData = [];
	this.themes = themes;
	
}
stateMachineData.prototype = {
	setVerticeMeshData: function(name, value){
		this.VerticeMeshData[this.getIndexOfName("vertex_" + name)] = value;
		
	},
	getIndexOfName: function(name){
		for(var i = 0; i < this.VerticeMeshes.length; i++){
			if(this.VerticeMeshes[i].name == name){
				return i;
			}	
		}
	},
	getVerticeMeshData: function(){
		return this.VerticeMeshData;
	},
	setAllVerticeMeshData: function(meshData){
		for(var i = 0; i< this.VerticeMeshes.length; i++){
			this.VerticeMeshData[i] = meshData;
		}
	},
	createScene: function(){
		for(var i =0; i < this.VerticeMeshes.length; i++){
			switch(this.VerticeMeshData[i]){
			case 0:
				this.VerticeMeshes[i].material = this.scene.getMaterialByID(this.themes.vertexMat);
				break;
			case 1:
				this.VerticeMeshes[i].material = this.scene.getMaterialByID(this.themes.activeMatOne);
				break;
			case 2:
				this.VerticeMeshes[i].material = this.scene.getMaterialByID(this.themes.activeMatTwo);
				break;
			}
		}
		return this.scene;
	},
	copyVerticeMeshData: function(meshArrayData){
		for(var i = 0; i < meshArrayData.length; i++){
			this.VerticeMeshData.push(meshArrayData[i]);
		}
	},
	play: function(){
		
	}
	
	
};