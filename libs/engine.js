/********************************************************
*
*           Author: Shawn Scott
*           Date: 9.13.2014
*           Filename: engine.js
*
*
*
*
*********************************************************/

function Engine(domElement, bRenderStats) {

		this.stats = undefined;
		this.scene = undefined;
		this.camera = undefined;
		this.renderer = undefined;
		this.ambientLight = undefined;
		this.bStats = ( bRenderStats != undefined ) ? bRenderStats : true;
		this.domElement = domElement;

		this.init();
}

Engine.prototype.init = function() {
	if (Detector.webgl) {

		if (this.bStats == true) {
			this.stats = this.initStats();
		}

		this.scene = this.createScene();
		this.camera = this.createCamera();
		this.renderer = this.createRenderer();
		this.ambientLight = this.createAmbientLight();

		this.scene.add(this.ambientLight);
	}
	else {
		Detector.addGetWebGLMessage();
	}
}


Engine.prototype.initStats = function() {
	if(this.bStats == false){
		this.bStats = true;
	}

	var stats = new Stats();
	stats.setMode(0);
	$("#Stats-output").append( stats.domElement );
	return stats;
}

Engine.prototype.createScene = function() {
	return new THREE.Scene();
}

Engine.prototype.createCamera = function() {
	return new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
}

Engine.prototype.createRenderer = function() {
	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColorHex(0xEEEEEE, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	$(this.domElement).append(renderer.domElement);
	return renderer;
}

Engine.prototype.createAmbientLight =  function() {
	return new THREE.AmbientLight(0x0c0c0c);
}


 Engine.prototype.render = function() {
 	if(this.bStats) {
 		this.stats.update();
 	}
	
	window.requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);

}

Engine.prototype.addAxes = function() {
	var axes = new THREE.AxisHelper(20);
	this.scene.add(axes);
}
