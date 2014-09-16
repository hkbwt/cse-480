//needs a webgl scene as a constructor
//render will be based on the engine
//will need scene though

SphereObject = function(scene, render){
	this.scene = 0;
	this.radius = 5;
	this.rings = 20;
	this.segments = 40;
	//commented out for test      this.scene = scene;
	this.color;
	this.material = new THREE.MeshLambertMaterial();
	this.sphere= null;
	//this.render= render;
	//test renderer
	this.VIEW_ANGLE = 45;
	this.NEAR = 0.1;
	this.FAR = 10000;
	this.WIDTH = 400,
	this.HEIGHT = 300;
	this.ASPECT = this.WIDTH/this.HEIGHT;
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(this.WIDTH, this.HEIGHT);
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR);
    	this.scene.add(this.camera);
    	this.camera.position.z = +300;
    // get the DOM element to attach to
    // - assume we've got jQuery to hand
        this.container = $('#container');
	this.container.append(this.renderer.domElement);
	
	//end test variables
	
}
SphereObject.prototype = new NodeObject();
SphereObject.prototype.setSegments = function(number){
		this.segments = number;
	};
SphereObject.prototype.getSegments = function(){
	return this.segments;
}
SphereObject.prototype.setColor = function(color){
	this.color;
}
SphereObject.prototype.getColor = function(){
	return this.color;
}
SphereObject.prototype.setMeshLambertMaterial = function(){
	
}
SphereObject.prototype.createSphere = function(){
	this.sphere = new THREE.Mesh(new THREE.SphereGeometry(this.radius, 
						this.segments,this.rings),this.material);
	this.sphere.scale.set(1,1,1);
}
SphereObject.prototype.setLocation = function(z){
	this.sphere.position.x = z[0];
	this.sphere.position.y = z[1];
	this.sphere.position.z = z[0];
}
SphereObject.prototype.addToScene = function(){
	this.scene.add(this.sphere);
	
}
SphereObject.prototype.Render = function(){
	var pointLight = new THREE.PointLight( 0xFFFFFF );
    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;
    // add to the scene
    this.scene.add(pointLight);
	this.renderer.render(this.scene,this.camera);
}