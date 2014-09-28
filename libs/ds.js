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

function Graph(v, data) {
    this.vertices = v;
    this.edges = 0;
    this.adj = [];

    if (data != undefined){
        this.data = data;
    } 
    else {
        this.data = [];
        for (var i = 0; i < v; i++) {
            this.data.push(i);
        }
    }

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
                msg += this.adj[i][j] + ' ';
            }
        }

        msg += "<br>";
    }
        return msg;
    }
};


function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

function BST() {
    this.root = null;
}

BST.prototype = {
    insert: function(data) {
        var n = new Node(data, null, null);

        if (this.root == null) {
            this.root = n;
        }
        else {
            var current = this.root;
            var parent;

            while (true) {
                parent = current;
                if (data < current.data) {
                    current = current.left;
                    if (current == null) {
                        parent.left = n;
                        break;
                    }
                }
                else {
                    current = current.right;
                    if (current == null) {
                        parent.right = n;
                        break;
                    }
                }
            }
        }   
    }

/*    inOrder: function() {

    }
*/
};