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


var GraphStates = {
        disabled: 'disabled',
        dragndrop: 'dragndrop',

        addEdge: 'addEdge',
        addVertex: 'addVertex',
        removeVertex: 'removeVertex',

        algorithmDFS: 'dfs',
        algorithmSSSP: 'short',
        algorithmBFS: 'bfs'
};


var GraphModel = function (scene, vertices, theme, size) {    

    Graph.call(this);           
    this.scene          = scene;                              
    this.theme          = theme;   

    if(typeof(size) == "undefined") {
        size = 5.0;
    }                           
    this.meshSize       = size;                                
    this.meshSegments   = 5.0;                                
    this.circleRaidus   = 10.0;
    
    this._selectedQueue = [];
};

GraphModel.prototype = new Graph();
GraphModel.prototype.constructor = GraphModel;

//var g = new Graph();


