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

function Engine(domElement, bRenderStats, worldcolor, fogdensity, bDebug) {

		this.stats = undefined;
		this.scene = undefined;
		this.camera = undefined;
		this.renderer = undefined;
		this.ambientLight = undefined;
		this.bStats = ( bRenderStats != undefined ) ? bRenderStats : true;
		this.domElement = domElement;
		this.worldcolor = (worldcolor != undefined) ? worldcolor : 0xEEEEEE;
		this.alpha = (fogdensity != undefined) ? fogdensity : 1.0;

		this.cameraControls = undefined;
		this.clock = undefined;
		this.bDebug = bDebug;

		this.init();
}

Engine.prototype.init = function() {
	if (Detector.webgl) {

		if (this.bStats == true) {
			this.stats = this.initStats();
		}

		this.camera = this.createCamera();
		this.scene = this.createScene();
		this.clock = this.createClock();

		this.ambientLight = this.createAmbientLight();
		this.scene.add(this.ambientLight);

		this.renderer = this.createRenderer();
		// window.addEventListener('resize', this.onWindowResize, false);

		//debug engine
		if (this.bDebug) {
			console.log(this.scene);
			console.log(this.camera);
			console.log(this.renderer);
			console.log(this.cameraControls);
			console.log(this.bStats);
			console.log(this.domElement);
			console.log(this.worldcolor);
			console.log(this.alpha);
		}

	}
	else {
		Detector.addGetWebGLMessage();
	}
}


 Engine.prototype.render = function() {
 	if(this.bStats) {
 		this.stats.update();
 	}

 	//console.log(this);
 	window.requestAnimationFrame(this.render.bind(this));

 	var delta = this.clock.getDelta();

	// this.cameraControls.update();	
    this.renderer.render(this.scene, this.camera); 
}

Engine.prototype.createOrbitControls = function() {
	var cameraControls = new THREE.OrbitControls( this.camera );
	cameraControls.damping = 0.2;
	cameraControls.addEventListener( 'change', this.render );
	return cameraControls;
}

Engine.prototype.createClock = function() {
	return new THREE.Clock();
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
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(this.worldcolor, this.alpha);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	$(this.domElement).append(renderer.domElement);

	return renderer;
}

Engine.prototype.createAmbientLight =  function() {
	return new THREE.AmbientLight(0x0c0c0c);
}

Engine.prototype.addAxes = function() {
	var axes = new THREE.AxisHelper(20);
	this.scene.add(axes);
}
/*
Engine.prototype.onWindowResize = function() {

	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.render();

}
*/