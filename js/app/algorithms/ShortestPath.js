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
  
  //position 2
  this.stateMachineArray.push(new stateMachineData(2, this.scene, this.graphModel.theme));
  this.stateMachineArray[this.stateMachineArray.length -1].setAllVerticeMeshData(0);
  this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(start,2);
  this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(end,2);
  distance[start] = 0;
     
  //position 3
  this.stateMachineArray.push(new stateMachineData(3, this.scene, this.graphModel.theme));
  this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
  for (var i = 0; i < this.newGraphADT.vertexQueue.length; i++) {
    //position 4
    this.stateMachineArray.push(new stateMachineData(4, this.scene, this.graphModel.theme));
    this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
    var minDist = inf, closest;
    //position 5
    this.stateMachineArray.push(new stateMachineData(5, this.scene, this.graphModel.theme));
    this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
    for (var j = 0; j < this.newGraphADT.vertexQueue.length; j++) {
      //position 6
      this.stateMachineArray.push(new stateMachineData(6, this.scene, this.graphModel.theme));
      this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
      if (!done[j]) {
      	      //position 7
      	      this.stateMachineArray.push(new stateMachineData(7, this.scene, this.graphModel.theme));
      	      this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
        if (distance[j] <= minDist) {
        	//position 8
        	this.stateMachineArray.push(new stateMachineData(8, this.scene, this.graphModel.theme));
        	this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
          minDist = distance[j];
          	//position 9
          	this.stateMachineArray.push(new stateMachineData(9, this.scene, this.graphModel.theme));
          	this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
          closest = j;
        }
      }
    }
    //position 13
    this.stateMachineArray.push(new stateMachineData(13, this.scene, this.graphModel.theme));
    this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
    done[closest] = true;
        
    var adjList = this.newGraphADT.getToVertices(this.newGraphADT.getVertexNameById(closest));
    	//position 14
   	 this.stateMachineArray.push(new stateMachineData(14, this.scene, this.graphModel.theme));
      	 this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
    
      	 
      	 for (var adj = 0; adj < adjList.length; adj++) {
      //get values of the points
      var w;
      for(var verticeSearch = 0; verticeSearch < this.newGraphADT.vertexQueue.length; verticeSearch++){
      	      if(this.newGraphADT.vertexQueue[verticeSearch].name == this.newGraphADT.getVertexNameById(adjList[adj])){
      	      	      var w =  this.newGraphADT.vertexQueue[verticeSearch].value;
      	      	      break;
      	      }
      }
      //position 15
      	 this.stateMachineArray.push(new stateMachineData(15, this.scene, this.graphModel.theme));
      	 this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
      if (!done[adjList[adj]]) { 
      	      //position 16
      	 this.stateMachineArray.push(new stateMachineData(16, this.scene, this.graphModel.theme));
      	 this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
        if (distance[closest] + w < distance[adjList[adj]]) {
        	//position 17
      	 this.stateMachineArray.push(new stateMachineData(17, this.scene, this.graphModel.theme));
      	 this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
          distance[adjList[adj]] = distance[closest] + w;
          //18
          this.stateMachineArray.push(new stateMachineData(18, this.scene, this.graphModel.theme));
      	 this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
         this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(adjList[adj],1);
          pred[adjList[adj]] = closest;
 
      	}
      }
    } 
    //position 22
    this.stateMachineArray.push(new stateMachineData(22, this.scene, this.graphModel.theme));
      	 this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
     if (closest === end) {
      break;
    }
  }
   
  // Done, now print.
  var i = end;
  //position 27
  this.stateMachineArray.push(new stateMachineData(27, this.scene, this.graphModel.theme));
  this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
  if (distance[i] < inf) {
  	  //28
  	  this.stateMachineArray.push(new stateMachineData(28, this.scene, this.graphModel.theme));
      	 this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
    var thePath = i;
    //29
    this.stateMachineArray.push(new stateMachineData(29, this.scene, this.graphModel.theme));
      	 this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
      	 var place = i;
 this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(place,2);   
    do {
    	    //30
    this.stateMachineArray.push(new stateMachineData(30, this.scene, this.graphModel.theme));
      	 this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
    	    
      	 //31
    	    
      place = pred[place];
      	this.stateMachineArray.push(new stateMachineData(31, this.scene, this.graphModel.theme));
      	 this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
      	 this.stateMachineArray[this.stateMachineArray.length -1].setVerticeMeshData(place,2);
      if (place !== start) {
        thePath = place + '->' + thePath;
      }
    }while(place !== start)
    thePath = place + '->' + thePath;
    console.log("Distance from " + start + "-->" + end + " : " +
            distance[i] + ' (' + thePath + ')');
  } else {
    console.log("no path");
  }
  this.stateMachineArray.push(new stateMachineData(35, this.scene, this.graphModel.theme));
  this.stateMachineArray[this.stateMachineArray.length -1].copyVerticeMeshData(this.stateMachineArray[this.stateMachineArray.length -2].getVerticeMeshData());
  return  this.stateMachineArray;
},
getStringVersion: function(){
	var n ="procedure shortestPath(G(v),v(start),v(end)):\n	distance[v(start)] = 0;\n	for e in G(v):\n	   minDist = infinite\n	   for j in G(v):\n	      if !done[j]:\n		if distance[j] <= minDist:\n		   minDist = distance[j]\n		   closest = j\n		end if\n	      end if\n	   end loop \n	   done[closest] = true;\n	   for k in closest.adjacent:\n	      if !done[k]:\n	         if distance[closest] + k.weight < distance[k]:\n		    distance[k] = distance[closest] + k.weight\n		    pred[adjList[adj]] = closest;\n		 end if\n	      end if\n	   end loop\n	   if closest == end:\n		print Shortest Path found!\n	   end if\n	end loop\n      if (distance[i] < inf)\n    	   var thePath = i;\n    	   var place = i;\n  	   do\n     	      place = pred[place];\n	   while (place !== start)\n	else\n	   print No Path Found\n      end if\n    end shortestPath";
	return n;
}
	
	//
}
