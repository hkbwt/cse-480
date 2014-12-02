/*procedure DFS-iterative(G,v):
      let S be a stack
      S.push(v)
      while S is not empty
            v <- S.pop() 
            if v is not labeled as discovered:
                label v as discovered
                for all edges from v to w in G.adjacentEdges(v) do
                    S.push(w)
*/

var DFS = function(graph, model,scene)
{
	this.stringVersion;
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


DFS.prototype = {
	runDFS: function(startPoint){
		this.stateMachineArray.push(new stateMachineData(2, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].setAllVerticeMeshData(0);
		this.newGraphADT.clearMarks();
		//
		//edit stack on screen
		//
		//
		this.stateMachineArray.push(new stateMachineData(3, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].setAllVerticeMeshData(0);
		this.stack = [];
		//
		this.stateMachineArray.push(new stateMachineData(4, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].setAllVerticeMeshData(0);
		this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(startPoint,1);
		this.newGraphADT.markVertex(startPoint);
		//
		this.stateMachineArray.push(new stateMachineData(5, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
		this.stack.push(startPoint);
		//
		this.stateMachineArray.push(new stateMachineData(6, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
		while(this.stack.length >0){
			this.stateMachineArray.push(new stateMachineData(7, this.scene, this.graphModel.theme));
			this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
			var v = this.stack.pop();
			//
			this.stateMachineArray.push(new stateMachineData(8, this.scene, this.graphModel.theme));
			this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
			this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(v,2);
			//this.newGraphADT.markVertex(v);
			//console.log("Visited Vertex: " + v);
				var adjList = this.newGraphADT.getToVertices(this.newGraphADT.getVertexNameById(v));
				this.stateMachineArray.push(new stateMachineData(9, this.scene, this.graphModel.theme));
				this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
				for(var i =0; i < adjList.length; i++){
					//
					this.stateMachineArray.push(new stateMachineData(10, this.scene, this.graphModel.theme));
					this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
					if(!this.newGraphADT.isMark(adjList[i])){
						//
						this.stateMachineArray.push(new stateMachineData(11, this.scene, this.graphModel.theme));
						this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
						this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(adjList[i],1);
						this.newGraphADT.markVertex(adjList[i]);
						//
						this.stateMachineArray.push(new stateMachineData(12, this.scene, this.graphModel.theme));
						this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
						this.stack.push(adjList[i]);
					}
				}
		}
		this.stateMachineArray.push(new stateMachineData(16, this.scene, this.graphModel.theme));
		this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
		return this.stateMachineArray;
		
	},
	getStringVersion: function(){
		this.stringVersion ="procedure DFS(G,v):\n      clear marks in G\n      let S be a stack\n	mark v\n      S.push(v)\n      while S is not empty\n          v <- S.pop() \n	    mark v\n               for all edges from v to w in G.adjacentEdges(v) do\n		    if w is not marked:\n                    	mark w\n			S.push(w)\n		    end if\n               end loop\n      end loop\nend DFS"

		return this.stringVersion;
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