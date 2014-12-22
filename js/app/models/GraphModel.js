/********************************************************
*
*           Date: 9.18.2014
*           Filename: GraphMdoel.js
*
*
*
*
*********************************************************/

/**
*
* Graph States that control what mouse events will trigger
*
**/

var GraphStates = {
        disabled      : 'disabled',
        dragndrop     : 'dragndrop',
        
        addEdge       : 'addEdge',
        addVertex     : 'addVertex',
        removeVertex  : 'removeVertex',
        
        algorithmDFS  : 'dfs',
        algorithmBFS  : 'bfs',
        algorithmSSSP : 'short'
};

/**
*
* Graph Model Object
*
**/

var GraphModel = function (scene, groundName, theme, size) {    
    Graph.call(this);

    if(typeof(size) == "undefined") {
        size = 5.0;
    }

    if(typeof(theme) == "undefined") {
        theme = GraphThemes[0];
    }  

    this._scene                  = scene;                              
    this._theme                  = theme;                            
    this._meshSize               = size;                                
    this._meshSegments           = 10.0;
    this._selectedQueue          = [];
    this._graphState             = GraphStates.disabled;
    this._groundName             = groundName;
    this._distanceBetweenModels  = 3.0;
    this._bEnableValueBillboards = false;

    this._MATERIALIDS = {
        vertex   : "vertex_mat",
        edge     : "edge_mat",
        active   : "active_mat",
        selected : "selected_mat",
    };

    this._LABELSIZE = 5;

    this._MESHTAGS = {
        vertex : "vertex",
        edge   : "edge"
    };
};

/*========================================================
=            prototype ihneritance from Graph            =
========================================================*/

GraphModel.prototype = new Graph();
GraphModel.constructor = GraphModel;
GraphModel.prototype.parent = Graph.prototype;

/*-----  End of prototype ihneritance from Graph  ------*/


/*============================
=            init            =
============================*/
GraphModel.prototype.initialize = function(count) {
    this._createGraphMaterials();
    this.parent.initialize.call(this, count);
};

GraphModel.prototype._createGraphMaterials = function() {
    var matVertex   = new BABYLON.StandardMaterial(this._MATERIALIDS.vertex, this._scene);
    var matEdge     = new BABYLON.StandardMaterial(this._MATERIALIDS.edge, this._scene);
    var matActive   = new BABYLON.StandardMaterial(this._MATERIALIDS.active, this._scene);
    var matSelected = new BABYLON.StandardMaterial(this._MATERIALIDS.slected, this._scene);

    matVertex.diffuseColor   = this._theme.vertex;
    matEdge.diffuseColor     = this._theme.edge;
    matActive.diffuseColor   = this._theme.active;
    matSelected.diffuseColor = this._theme.selected;    
};
/*-----  End of init  ------*/


/*=====================================================
=            Graph Componets Manipulations            =
=====================================================*/

GraphModel.prototype.addVertex = function(value, position) {
    this.parent.addVertex.call(this, value);

    var index = this.parent.getVertexCount.call(this) - 1;
    var adt_vertex = this.parent.getVertexByIndex.call(this, index);

    var mVertex = BABYLON.Mesh.CreateSphere(adt_vertex.name, 
                this._meshSegments, this._meshSize, this._scene);

    mVertex.material = this._scene.getMaterialByID(this._MATERIALIDS.vertex);   
    
    if(typeof(position) == "undefined"){
        position = this.getCirclePatternPosition(this._idCount);
    }

    mVertex.position = new BABYLON.Vector3(position.x, (this._meshSize * 0.5) + 3, position.y);
    mVertex.adt = adt_vertex;

    BABYLON.Tags.EnableFor(mVertex);
    mVertex.addTags("vertex");

    this._addVertexLabel(mVertex);
};

GraphModel.prototype.removeVertexById = function(vertexId) {
    var name = this.getVertexNameById(vertexId);
    var vertex = this._scene.getMeshByName(name);

    vertex.dispose();
    this.parent.removeVertexById.call(this, vertexId);
};

GraphModel.prototype.removeVertexByName = function(name) {
    var vertex = this._scene.getMeshByName(name);

    vertex.dispose();
    this.parent.removeVertexByName.call(this, name);
};

GraphModel.prototype._addVertexLabel = function(vertex_mesh) {

    var label = BABYLON.Mesh.CreatePlane("label_" + vertex_mesh.name, this._LABELSIZE, this._scene, false);
    var label_mat = new BABYLON.StandardMaterial("label_mat_" + vertex_mesh.name, this._scene);
    var label_texture = new BABYLON.DynamicTexture("label_texture_" + vertex_mesh.name, 512, this._scene, true );
    
    label.material = label_mat;
    label_texture.hasAlpha = true;
    label.material.diffuseTexture = label_texture;
    label.material.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);

    var size = label_texture.getSize();
    label_texture.drawText(
                        vertex_mesh.adt.value,                      // text
                        180,                                        // x coord
                        size.height / 2 + 30,                       // y coord
                        "bold 180px Segoe UI",                      // font
                        "white",                                    // text color
                        "transparent",                              // clear color
                        true);                                      // invertY

    label.parent = vertex_mesh;
    label.position.y += 5.0;
    label.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

    BABYLON.Tags.EnableFor(label);
    label.addTags("label_vertex");

    if(!this._bEnableValueBillboards) {
        label.isVisible = false;
    }

        
};

GraphModel.prototype.addEdge = function(v, w) {


    var vObj = this.parent.getVertexById.call(this, v);
    var wObj = this.parent.getVertexById.call(this, w);

    var fromVertex = this._scene.getMeshByName(vObj.name);
    var toVertex = this._scene.getMeshByName(wObj.name);

    this.addEdgeByMesh(toVertex, fromVertex);
};

GraphModel.prototype.addEdgeByMesh = function(mesh_v, mesh_w) {

    this.parent.addEdge.call(this, mesh_v.adt.id, mesh_w.adt.id);

    var index = this.parent.getEdgeCount.call(this) - 1;
    var adt_edge = this.parent.getEdgeByIndex.call(this, index);


    var distance = BABYLON.Vector3.Distance(mesh_v.position, mesh_w.position);
    var edge_name = this.parent.getEdgeNameById.call(this, mesh_v.adt.id, mesh_w.adt.id);

    var edge = BABYLON.Mesh.CreateCylinder( edge_name, distance, 1, 1, 0, 1, this._scene, true);
    
    this._positionEdge(edge, mesh_v.position, mesh_w.position, distance);
    edge.material = this._scene.getMaterialByID(this._MATERIALIDS.edge);

    BABYLON.Tags.EnableFor(edge);
    edge.addTags("edge");

    edge.adt = adt_edge;

    //this.addEdgeDetectEvent(edge);
};

GraphModel.prototype.removeEdgeByValue = function(v, w) {
    var name = this.parent.getEdgeNameById.call(this,v, w);
    var edge = this._scene.getMeshByName(name);

    edge.dispose();

    this.parent.removeEdgeByValue.call(this, v, w);
};

GraphModel.prototype.removeEdgeByName = function(name) {
    var edge = this._scene.getMeshByName(name);
    edge.dispose();

    this.parent.removeEdgeByName.call(this,name);
};

/*-----  End of Graph Componets Manipulations  ------*/


/*=======================================
=            Graph Positioning         =
=======================================*/
GraphModel.prototype._positionEdge = function(edge, start, end, distance) {
    
    // First of all we have to set the pivot not in the center of the cylinder:
    edge.setPivotMatrix(BABYLON.Matrix.Translation(0, -distance / 2, 0));
    
    // Then move the cylinder to red sphere
    edge.position = end;
    
    // Then find the vector between spheres
    var v1 = end.subtract(start);
    v1.normalize();
    var v2 = new BABYLON.Vector3(0, 1, 0);
    
    // Using cross we will have a vector perpendicular to both vectors
    var axis = BABYLON.Vector3.Cross(v1, v2);
    axis.normalize();
    
    // Angle between vectors
    var angle = BABYLON.Vector3.Dot(v1, v2);
    
    // Then using axis rotation the result is obvious
    edge.rotationQuaternion = BABYLON.Quaternion.RotationAxis(axis, -Math.PI / 2 + angle);
};

GraphModel.prototype.updateEdges = function() {
    var edgeList = this._scene.getMeshesByTags("edge");

    for(var index = 0; index < edgeList.length; index++) {
        var edge = edgeList[index];

        var v = edge.adt.v;
        var w = edge.adt.w;

        nameV = this.getVertexNameById(v);
        nameW = this.getVertexNameById(w);

        var vertex_v = this._scene.getMeshByName(nameV);
        var vertex_w = this._scene.getMeshByName(nameW);

        var distance = BABYLON.Vector3.Distance(vertex_v.position, vertex_w.position);
        this._positionEdge(edge, vertex_v.position, vertex_w.position, distance);

    }
};

GraphModel.prototype.organizeModel = function() {

    var vertexList = this._scene.getMeshesByTags("vertex");

    for(var vertexCount = 0; vertexCount < vertexList.length; vertexCount++) {
        var coord = this.getCirclePatternPosition(vertexCount);
        vertexList[vertexCount].position = new BABYLON.Vector3(coord.x, this._meshSize + 5, coord.y);
    }

    this.updateEdges();
};
/*-----  End of Graph Positioning-----*/


/*========================================
=            helper methods              =
========================================*/
GraphModel.prototype.getCirclePatternPosition = function(nth) {
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
        radius = (this._distanceBetweenModels * nthcircle * nthcircle) + nthcircle + this._distanceBetweenModels;
    }
    
    //rate of change in the arch of the circle
    var dtheta = 2 * Math.PI / (2 * nthcircle + 1);     
    //current angle in the current circle
    var theta =  positionInCircle * dtheta + thetaOffset;               
    return this.getCircleCoords(radius, theta);
};

GraphModel.prototype.getCircleCoords = function(radius, theta){
    return {x: radius * Math.cos(theta) , y: radius * Math.sin(theta)};
};

GraphModel.prototype.removeAllEdges = function() {
    var edges = this._scene.getMeshesByTags("edge");
    if(edges.length < 1) {return;}

    for(var index = 0; index < edges.length; index++) {
        edges[index].dispose();
    }

    this.parent.removeAllEdges.call(this);
};

GraphModel.prototype.clearGraph = function() {

    var vertices = this._scene.getMeshesByTags("vertex");
    if(vertices.length < 1) {return;}

    for(var index = 0; index < vertices.length; index++) {
        vertices[index].dispose();
    }

    this.removeAllEdges();

    this.parent.clearGraph.call(this);
};

GraphModel.prototype.toggleVertexLables = function() {
    this._bEnableValueBillboards = !this._bEnableValueBillboards;

    if(this._bEnableValueBillboards) {
        this._showVertexLabels();
    }
    else {
        this._hideVertexLabels();
    }
};

GraphModel.prototype._showVertexLabels = function() {
    var labels = this._scene.getMeshesByTags("label_vertex");

    for(var index = 0; index < labels.length; index++) {
        labels[index].isVisible = true;
    }
};

GraphModel.prototype._hideVertexLabels = function() {
    var labels = this._scene.getMeshesByTags("label_vertex");

    for(var index = 0; index < labels.length; index++) {
        labels[index].isVisible = false;
    }
};
/*-----  End of helper methods     ------*/





