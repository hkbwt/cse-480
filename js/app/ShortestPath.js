var ShortestPathBFS = function(graph,model,scene){
	this.newGraphADT = graph
	this.graphModel = model;
	this.scene = scene;
	that = this;
	this.queue = [];
	this.StartVertice;
	this.newAdjArray;
	this.currentPos = 0; 
	this.stateMachineArray = [];
	this.dist = [];
	this.pred = [];
}
/*
ShortestPathBFS.prototype = { 
	function(startPoint, endPoint){
		this.newGraphADT.clearMarks();
		this.dist = [];
		this.pred = [];
		this.stack = [];
		var smallest;
		for(var v = 0; v < this.newGraphADT.vertCount; i++){
			this.dist[v] = Infinity;
		}
		this.dist[startPoint] = 0.0;
		//edit stack on screen
		//
		//
		this.stack.push(that.newGraphADT.getVertexIdByName(startPoint.name));
		while(this.stack.length >0){
			if(smallest ===endPoint){
				pred;
			}
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
*/




ShortestPathBFS.prototype= { 
	
	runShortestPath:function(start, end){
	//function Dijkstra(roads, source, dest) {
  var inf = Number.POSITIVE_INFINITY;
  var distance = {};
  var done = {};
  var pred = {};
  for (var i = 0; i < this.newGraphADT.vertexQueue.length; i++) {
    // Unknown distance function from source to i.
    distance[i] = inf;
    pred[i] = 0;
    done[i] = false;
  }
  
  // Distance from source to source = 0
  distance[that.newGraphADT.getVertexIdByName(start.name)] = 0;
     
  for (var i = 0; i < this.newGraphADT.vertexQueue.length; i++) {
    var minDist = inf, closest;
    for (var j = 0; j < this.newGraphADT.vertexQueue.length; j++) {
      if (!done[j]) {
        if (distance[j] <= minDist) {
          minDist = distance[j];
          closest = j;
        }
      }
    }
    done[closest] = true;
        
    var adjList = this.newGraphADT.getToVertices(closest);
    for (var adj = 0; adj < adjList.length; adj++) {
      //get values of the points
      var w;
      for(var verticeSearch = 0; verticeSearch < this.newGraphADT.vertexQueue.length; verticeSearch++){
      	      if(this.newGraphADT.vertexQueue[verticeSearch].name == this.newGraphADT.getVertexNameById(adjList[adj])){
      	      	      var w =  this.newGraphADT.vertexQueue[verticeSearch].value;
      	      	      break;
      	      }
      }
      //not complete!!!
      if (!done[adjList[adj]]) { 
        if (distance[closest] + w < distance[adjList[adj]]) {
          distance[adjList[adj]] = distance[closest] + w;
          pred[adjList[adj]] = closest;
        }
      }
    } 
     if (closest === that.newGraphADT.getVertexIdByName(end.name)) {
      break;
    }
  }
   
  // Done, now print.
  var i = that.newGraphADT.getVertexIdByName(end.name);
  if (distance[i] < inf) {
    var thePath = i;
    var place = i;
    while (place !== that.newGraphADT.getVertexIdByName(start.name)) {
      place = pred[place];
      if (place !== that.newGraphADT.getVertexIdByName(start.name)) {
        thePath = place + '->' + thePath;
      }
    }
    thePath = place + '->' + thePath;
    console.log("Distance from " + that.newGraphADT.getVertexIdByName(start.name) + "-->" + that.newGraphADT.getVertexIdByName(end.name) + " : " +
            distance[i] + ' (' + thePath + ')');
  } else {
    console.log("no path");
  }
}
	
	
	//
}

var PQ = function(){

}