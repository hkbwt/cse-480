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
    
    Babylon Materials and Colors
    Pointer events; Pick events
    Mimicing Graph Structure with model objects on screen

    Things to do:
    create materials
    set a defualt color theme for 
        vertex color
        edge color
        active or marked color
        selected color

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


var GraphModel = function (scene, theme, size) {    

    //initialize Graph ADT
    Graph.call(this);

    if(typeof(size) == "undefined") {
        size = 5.0;
    }

    if(typeof(theme) == "undefined") {
        theme = {/*defualt theme*/};
    }  

    this._scene         = scene;                              
    this._theme         = theme;                            
    this._meshSize      = size;                                
    this._meshSegments  = 10.0;
    
    this._selectedQueue = [];
};

GraphModel.prototype = new Graph();
GraphModel.prototype.constructor = GraphModel;


