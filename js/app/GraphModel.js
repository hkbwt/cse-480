/********************************************************
*
*           Date: 9.18.2014
*           Filename: GraphMdoel.js
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

    //initialize Graph ADT
    Graph.call(this);

    if(typeof(size) == "undefined") {
        size = 5.0;
    }  

    this.scene          = scene;                              
    this.theme          = theme;                            
    this.meshSize       = size;                                
    this.meshSegments   = 10.0;                                
    this.circleRaidus   = 10.0;
    
    this._selectedQueue = [];
};

GraphModel.prototype = new Graph();
GraphModel.prototype.constructor = GraphModel;


