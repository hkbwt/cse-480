/********************************************************
*
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
    if(vertices === undefined) {
        vertices = 0;
    }
    this.graphState;                                        // graph state
    this.graph        = new Graph(vertices);                // graph data type
    this.theme        = theme;                              // graph theme
    this.scene        = scene;                              // the scene the graph belongs to
    this.meshSize     = 5.0;                                // vertex size
    this.meshSegments = 5.0;                                // number of vertex model segments
    this.playPosition = 0;
    this.circleRaidus =10.0;
    that              = this;

    this.algoFrames;
    this.algoSelected;
    this.startingPoint;
    this.selectedVertexMesh;

    this.init();
}

GraphModel.prototype = {

    init: function() {      

        //print something pretty to the console
        console.log("0_0!");
    },

    getSizeByName: function(size) {

        if(size == 'small') {
            this.meshSize = 6.0;
            this.meshSegments = 6.0;
        }
        else if (size == 'medium') {
            this.meshSize = 10.0;
            this.meshSegments = 10.0;
        }
        else if (size == 'large') {
            this.meshSize = 15.0;
            this.meshSegments = 10.0;
        }
    },

    setSelectedVertex: function(mesh) {
        this.selectedVertexMesh = mesh;
    },

    getSelectedVertex: function() {
        return this.selectedVertexMesh;
    },
    
    addEdgeByValues: function(v, w) {

        //point to point
        
        var fromVertexName = this.graph.getVertexNameById(v);
        var toVertexName = this.graph.getVertexNameById(w);
        var fromVertex = this.scene.getMeshByName(fromVertexName);
        var toVertex = this.scene.getMeshByName(toVertexName);
        var distance = BABYLON.Vector3.Distance(fromVertex.position, toVertex.position);
        var edge = BABYLON.Mesh.CreateCylinder(this.graph.getEdgeNameById(v,w), (BABYLON.Vector3.Distance(fromVertex.position, toVertex.position)), 1, 1, 0, 1, this.scene, true);
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
        edge.addTags("edge");
        this.addEdgeDetectEvent(edge);
    },

    addEdgeByMeshes: function(fromVertex, toVertex) {
        
        var v = this.graph.getVertexIdByName(fromVertex.name);
        var w = this.graph.getVertexIdByName(toVertex.name);
        //
        var distance = BABYLON.Vector3.Distance(fromVertex.position, toVertex.position);
        var edge = BABYLON.Mesh.CreateCylinder(this.graph.getEdgeNameById(v,w), (BABYLON.Vector3.Distance(fromVertex.position, toVertex.position)), 1, 1, 0, 1, this.scene, true);
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
        edge.addTags("edge");
        //
        this.graph.addEdge(v, w);
        //old funcitonality
        //var edge = BABYLON.Mesh.CreateLines(this.graph.getEdgeNameById(v,w),
        //          [fromVertex.position, toVertex.position], this.scene);
        this.addEdgeDetectEvent(edge);
    },  

    addEdgeDetectEvent: function(edge){
        edge.actionManager = new BABYLON.ActionManager(this.scene);
        edge.actionManager.registerAction(
            new BABYLON.SetValueAction(BABYLON.ActionManager.OnPickTrigger, edge, "emissiveColor", that.scene.getMaterialByID(that.theme.activeMatOne).diffuseColor));
                edge.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
        function(){
        if(that.graphState == "removeEdge" /*state*/){
            
            that.removeEdge(edge.name);
        }
        }));
    },

    addVertex: function(value){
        if(typeof(value) =="undefined" && typeof(this.graph.vertCount) == "undefined"){
            value = 0;
        }
        else{
            value = this.graph.vertCount;
        }
        
        var coord = this.getCirclePatternPosition(this.graph.vertCount);

        this.graph.addVertex(value);

        var vertex = BABYLON.Mesh.CreateSphere(this.graph.getVertexNameById(value), 
                    this.meshSegments, this.meshSize, this.scene);
        
        vertex.position = new BABYLON.Vector3(coord.x, this.meshSize + 5, coord.y);
        vertex.material = this.scene.getMaterialByID(this.theme.vertexMat);
        
        this.addVertexClickEvent(vertex);
        
        BABYLON.Tags.EnableFor(vertex);
        vertex.addTags("vertex");
    },
    
    addVertexClickEvent: function( mesh){
        mesh.actionManager = new BABYLON.ActionManager(this.scene);
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
                that.nodeCountArray.push(mesh);
                mesh.material = that.scene.getMaterialByID(that.theme.activeMatOne);
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
                that.removeVertex(mesh.name);
                break;
            case "bfs":
                mesh.material = that.scene.getMaterialByID(that.theme.activeMatOne);
                that.nodeCountArray.push(mesh);
                that.playPosition = 0;
                if(that.nodeCountArray.length >= 1){
                    var that2 = that;
                    var n = new runBFS(that2.graph, that2, that2.scene);
                    that2.algoFrames = n.bfsTest(that2.graph.getVertexIdByName(that2.nodeCountArray[0].name));
                    //that = that2;
                    that.nodeCountArray = [];
                }       
                break;
            case "short":
                mesh.material = that.scene.getMaterialByID(that.theme.activeMatOne);
                that.nodeCountArray.push(mesh);
                that.playPosition = 0;
                if(that.nodeCountArray.length >= 2){
                    var that2 = that;
                    var n = new ShortestPathBFS(that.graph, that, that.scene);
                    that2.algoFrames = n.runShortestPath(that2.graph.getVertexIdByName(that2.nodeCountArray[0].name),that2.graph.getVertexIdByName(that2.nodeCountArray[1].name));
                    that = that2;
                    that.nodeCountArray = [];
                }       
                break;
            case "dfs":
                mesh.material = that.scene.getMaterialByID(that.theme.activeMatOne);
                that.nodeCountArray.push(mesh);
                that.playPosition = 0;
                if(that.nodeCountArray.length >= 1){
                    var that2 = that;
                    var n = new DFS(that2.graph, that, that.scene);
                    that2.algoFrames = n.runDFS(that2.graph.getVertexIdByName(that2.nodeCountArray[0].name));
                    that = that2;
                    that.nodeCountArray = [];
                }       
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
            if(vertices[i].name == name){
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

        this.graph.vertCount = 0;

        for(var i = 0; i< n.length; i++){
            n[i].dispose();
        }   
        for(var i = 0; i< m.length; i++){
            m[i].dispose();
        }
    },



    updateEdges: function(mesh){
        
        var edgeArray= [];
        var allEdgeArray = this.scene.getMeshesByTags("edge");
        for(var i = 0; i<allEdgeArray.length; i++){
            if(allEdgeArray[i].name.indexOf("_" + this.graph.getVertexIdByName(mesh.name.toString()) + "_") > -1){
                edgeArray.push(allEdgeArray[i]);        
            }
            else if(allEdgeArray[i].name.indexOf("_" + this.graph.getVertexIdByName(mesh.name).toString()) > -1){
                edgeArray.push(allEdgeArray[i]);    
            }
        }
        
        for(var i = 0; i<edgeArray.length; i++){
            var edgeVertices = this.graph.getEdgeIdByName(edgeArray[i].name);
            var fromVertex;
            var toVertex;
            for(var j = 0; j <that.scene.meshes.length; j++){
                if(this.graph.getVertexIdByName(that.scene.meshes[j].name) == edgeVertices[0]){
                    fromVertex = that.scene.meshes[j];
                    break;}
            }
            for(var j = 0; j<that.scene.meshes.length; j++){
                if(this.graph.getVertexIdByName(that.scene.meshes[j].name) == edgeVertices[1]){
                    toVertex = that.scene.meshes[j];
                    break;}
            }
            var v = this.graph.getVertexIdByName(fromVertex.name);
            var w = this.graph.getVertexIdByName(toVertex.name);
            var distance = BABYLON.Vector3.Distance(fromVertex.position, toVertex.position);
            var vertexData = new BABYLON.VertexData.CreateCylinder(distance,1,1,0,1);
        // First of all we have to set the pivot not in the center of the cylinder:
            edgeArray[i].setPivotMatrix(BABYLON.Matrix.Translation(0, -distance / 2, 0));
        // Then move the cylinder to red sphere
            edgeArray[i].position = toVertex.position;
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
            edgeArray[i].rotationQuaternion = BABYLON.Quaternion.RotationAxis(axis, -Math.PI / 2 + angle);
            var vertexData = new BABYLON.VertexData.CreateCylinder(distance,1,1,0,1);
            vertexData.applyToMesh(edgeArray[i],true);
        }       
    },

    
    play: function(initCodeScene){
        var n;
        that2 = that;
        switch(this.algoSelected)
        {
        case "bfs":
            n = new runBFS();
            break;
        case "dfs":
            n = new DFS();
            break;
        case "short":
            n = new ShortestPathBFS();
            break;
        }
        var Area = new algoArea(initCodeScene);
        Area.setText(n.getStringVersion);
        that = that2;
        that.play_helper(Area);
        
    },

    play_helper: function(Area){
        switch(this.graphState){
        case "play":
            if(this.playPosition < this.algoFrames.length){
             this.scene = this.algoFrames[this.playPosition].createScene();
             Area.selectLine(this.algoFrames[this.playPosition].currentState);
             this.playPosition++;
             setTimeout(function(){that.play_helper(Area);}, 100);
            }
            else{
                this.graphState = "end";
            }
            break;
        case "pause":
            break;
        case "rewind":
            if(this.playPosition > 0){
                this.playPosition--;    
            }
            if(this.playPosition < this.algoFrames.length){
             this.scene = this.algoFrames[this.playPosition].createScene();
             Area.selectLine(this.algoFrames[this.playPosition].currentState);
            }
            break;
        case "forward":
            if(this.playPosition < this.algoFrames.length){
                this.playPosition++;    
            }
            if(this.playPosition < this.algoFrames.length){
             this.scene = this.algoFrames[this.playPosition].createScene();
             Area.selectLine(this.algoFrames[this.playPosition].currentState);
            }
            break;
        case "end":
            break;
        }
    },

    organizeModel: function() {

        var vertexList = this.scene.getMeshesByTags("vertex");

        for(var vertexCount = 0; vertexCount < vertexList.length; vertexCount++) {
            var coord = this.getCirclePatternPosition(vertexCount);
            vertexList[vertexCount].position = new BABYLON.Vector3(coord.x, this.meshSize + 5, coord.y);
            that.updateEdges(vertexList[vertexCount]);
        }
    },

    getCirclePatternPosition: function(nth) {
        var nthcircle = 0;
        var positionInCircle = nth;

        if(nth > 0) {
            while (positionInCircle >= (2 * nthcircle) + 1) {
                positionInCircle -= (2 * nthcircle) + 1;
                nthcircle++;
            }
        
        }
        
        var thetaOffset = ( Math.sqrt(3) / 2 ) * nthcircle;
        //current circles radius

        var radius = 0;
        if(nthcircle > 0) {
            radius = (this.circleRaidus * nthcircle * nthcircle) + nthcircle + this.circleRaidus;
        }
        
        //rate of change in the arch of the circle
        var dtheta = 2 * Math.PI / (2 * nthcircle + 1);     
        //current angle in the current circle
        var theta =  positionInCircle * dtheta + thetaOffset;               
        return this.getCircleCoords(radius, theta);
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
            this.addVertex(i,new BABYLON.Vector3(Math.cos(i * (2 /(4 * Math.PI))))*(Math.pow(Math.E,(i * (2 /(4 * Math.PI))))) ,5 ,(Math.sin(i * (2 /(4 * Math.PI))))*(Math.pow(Math.E,(i * (2/(4 * Math.PI))))));
        }
    },

    updateModelSize: function(size) {
        var vertexList = this.scene.getMeshesByTags("vertex");
        this.getSizeByName(size);

        for (var vertexCount = 0; vertexCount < vertexList.length; vertexCount++) {
            var oldVertex = vertexList[vertexCount];

            var vertex = BABYLON.Mesh.CreateSphere(oldVertex.name, 
                        this.meshSegments, this.meshSize, this.scene);

            vertex.material = this.scene.getMaterialByID(oldVertex.material.name);
            vertex.position = new BABYLON.Vector3(oldVertex.position.x, oldVertex.position.y, oldVertex.position.z);

            oldVertex.dispose();

            this.addVertexClickEvent(vertex);

            BABYLON.Tags.EnableFor(vertex);
            vertex.addTags("vertex");

        }
    }
};
        

