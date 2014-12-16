var runBFS = function(graph, model, scene){
	this.newGraphADT = graph
	this.graphModel = model;
	this.scene = scene;
	thisBFS = this;
	this.queue = [];
	this.StartVertice;
	this.newAdjArray;
	this.currentPos = 0; 
	this.stateMachineArray = [];
	
}


runBFS.prototype ={
	bfsTest: function(startVertice){
	//
	this.stateMachineArray.push(new stateMachineData(2, this.scene, this.graphModel.theme));
	this.stateMachineArray[this.stateMachineArray.length -1].setAllVerticeMeshData(0);
	this.newGraphADT.clearMarks();
	//
	this.stateMachineArray.push(new stateMachineData(3, this.scene, this.graphModel.theme));
	this.stateMachineArray[this.stateMachineArray.length -1].setAllVerticeMeshData(0);
	this.queue = [];
	//
	this.stateMachineArray.push(new stateMachineData(4, this.scene, this.graphModel.theme));
	this.stateMachineArray[this.stateMachineArray.length -1].setAllVerticeMeshData(0);
	this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(startVertice,1);
	this.newGraphADT.markVertex(startVertice);
	//
	this.stateMachineArray.push(new stateMachineData(5, this.scene, this.graphModel.theme));
	this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
	this.queue.push(this.newGraphADT.vertexQueue[startVertice]);
	//
	this.stateMachineArray.push(new stateMachineData(6, this.scene, this.graphModel.theme));
	this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
	while(this.queue.length >0){
		//
		this.stateMachineArray.push(new stateMachineData(7, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
		var v = this.queue.shift();
		//
		this.stateMachineArray.push(new stateMachineData(8, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
		if(v != "undefined"){
		//
			this.stateMachineArray.push(new stateMachineData(9, this.scene, this.graphModel.theme));
			this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
			this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(this.newGraphADT.getVertexIdByName(v.name),2);
			console.log("Visited vertex: " + v.name);
			//
		}
		
		this.stateMachineArray.push(new stateMachineData(11, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
		this.newGraphADT.getToVertices(v.name).forEach(
		//
			function(entry){
			//
			thisBFS.stateMachineArray.push(new stateMachineData(12, thisBFS.scene, thisBFS.graphModel.theme));
			thisBFS.stateMachineArray[thisBFS.stateMachineArray.length -1].copyVerticeMeshData(thisBFS.stateMachineArray[thisBFS.stateMachineArray.length -2].getVerticeMeshData());
			if(!thisBFS.newGraphADT.isMark(entry)){
				//
				thisBFS.stateMachineArray.push(new stateMachineData(13, thisBFS.scene, thisBFS.graphModel.theme));
				thisBFS.stateMachineArray[thisBFS.stateMachineArray.length -1].copyVerticeMeshData(thisBFS.stateMachineArray[thisBFS.stateMachineArray.length -2].getVerticeMeshData());
				thisBFS.stateMachineArray[thisBFS.stateMachineArray.length -1].setVerticeMeshData(entry,1);
				thisBFS.newGraphADT.markVertex(entry);
				//
				thisBFS.stateMachineArray.push(new stateMachineData(14, thisBFS.scene, thisBFS.graphModel.theme));
				thisBFS.stateMachineArray[thisBFS.stateMachineArray.length -1].copyVerticeMeshData(thisBFS.stateMachineArray[thisBFS.stateMachineArray.length -2].getVerticeMeshData());
				thisBFS.queue.push(thisBFS.newGraphADT.vertexQueue[entry]);
			}
		});
	}
	thisBFS.stateMachineArray.push(new stateMachineData(18, thisBFS.scene, thisBFS.graphModel.theme));
				thisBFS.stateMachineArray[thisBFS.stateMachineArray.length -1].copyVerticeMeshData(thisBFS.stateMachineArray[thisBFS.stateMachineArray.length -2].getVerticeMeshData());
	return this.stateMachineArray;
},
	getStringVersion: function(){
	var stringVersion = "  procedure BFS(G,v) is\n      clear marks in G\n      create a queue Q\n      mark v\n      enqueue v onto Q\n      while Q is not empty loop\n         t <- Q.dequeue()\n         if t != null)\n            print t.name\n	  end if\n        for all edges e in G.adjacentEdges(t) loop\n           if e is not marked then\n		 mark e\n               enqueue e onto Q\n           end if\n        end loop\n     end loop\n end BFS"
	return stringVersion;
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