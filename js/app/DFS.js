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
		this.newGraphADT.clearMarks();
		
		//edit stack on screen
		//
		//
		this.stack = [];
		this.stack.push(that.newGraphADT.getVertexIdByName(startPoint.name));
		while(this.stack.length >0){
			var v = this.stack.pop();
			this.newGraphADT.markVertex(v);
			console.log("Visited Vertex: " + v);
				var adjList = this.newGraphADT.getToVertices(v);
				for(var i =0; i < adjList.length; i++){
					if(!this.newGraphADT.isMark(adjList[i])){
						this.newGraphADT.markVertex(adjList[i]);
						this.stack.push(adjList[i]);
					}
				}
		}
		
		
	}
}