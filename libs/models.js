/********************************************************
*
*           Author: Shawn Scott
*           Date: 9.18.2014
*           Filename: models.js
*
*
*
*
*********************************************************/

/*Class used for drawing and representing the graph in THREE.js with Meshes */

//a dsObject3d can be a vertex or an edge
var dsObject3d = {text, threeObj, bActive, bSelected};

// THREENode.prototype = {	
// };

function GraphModel (v, selectedMat, aciveMat, unactiveMat, linkMat) {

	//this.dsGraph = new Graph(v);
	this.selectedMat = selectedMat;
	this.aciveMat = aciveMat;
	this.unactiveMat = unactiveMat;
	this.linkMat = linkMat;

	//uses THREENode to store info about pieces of the graph
	this.nodeList = [];
	this.edgeList = [];

	this.init();
}

var GraphModel.prototype = {
	init: function() {
		/* Find the vertex with the most edges ~ MAX(E(w,v));
		 * Place MAX(node) in the center of the scene ~ (0,0,0)
		 * Place connected vertices (and edges) in a circle around max node 
		 * Place their connected vertices (and edges) in a bigger circle around them...
		 * And so on, in a loop until you have visited all vertices in V
		*/

		/* Start with the most connected node and work your way
		 * down to the least connected node in a spiral*/

		 /* create the node position it with positioning function
		  * create a its adjacent nodes and postition them with positioning function
		  * create all edges
		  * loop through adjecent nodes
		  */


	},


	getCircleCoords: function(step, level, half){
		// step - increment of the arc of the circl
		// level - which circle or radius from the center are you on
		// half - positive of negitive side of y
		// y^2 = r^2 - x^2 
		// half * return^2 = level^2 - step^2


	}

	/* As states change or vertices or edges are deleted this model
     * should not change unless update() is called which will then alter this
     * object. the update should eventually be animated.
	 */

};