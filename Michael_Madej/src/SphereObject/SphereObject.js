//needs a webgl scene as a constructor
 
SphereObject = function(scene){
	var scene;
	var radius;
	var rings;
	this.scene = scene;
	
}
SphereObject.prototype = new NodeObject();
SphereObject.prototype.testMethod = function(){alert("test");}