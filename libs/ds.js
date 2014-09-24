/********************************************************
*
*           Author: Shawn Scott
*           Date: 9.10.2014
*           Filename: ds.js
*
*
*
*
*********************************************************/

/*Class used for manipulating the graph data structure*/

function Graph(v) {
    this.vertices = v;
    this.edges = 0;
    this.adj = [];

    for(var i = 0; i < this.vertices; i++){
        this.adj[i] = [];
    }

}

Graph.prototype =  {
    addEdge: function(v,w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
    },

    printGraph: function() {
    var msg = " ";

    for(var i = 0; i < this.vertices; i++) {
        msg += + i + " -> ";  

        for(var j = 0; j < this.vertices; j++) {
            if(this.adj[i][j] != undefined) {
                msg += + this.adj[i][j] + ' ';
            }
        }

        msg += "<br>";
    }
        return msg;
    }
};
