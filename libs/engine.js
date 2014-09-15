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

var ENGINE = {


engine: function() {

		function initStats(){
			var stats = new Stats();
			stats.setMode(0);
			$("#Stats-output").append( stats.domElement );
			return stats;
		}

		function createScene(){
			return new THREE.Scene();
		}

		function createCamera() {
			return new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		}

		function createRenderer() {
			var renderer = new THREE.WebGLRenderer();
			renderer.setClearColorHex(0xEEEEEE, 1.0);
			renderer.setSize(window.innerWidth, window.innerHeight);
			//renderer.shadowMapEnabled = true;

			$("#WebGL-output").append(renderer.domElement);
			return renderer;
		}

		this.stats = initStats();
		this.scene = createScene();
		this.camera = createCamera();
		this.renderer = createRenderer();


		this.render = ENGINE.render;
		this.addAxes = ENGINE.addAxes;

	},


	render: function(){

		this.stats.update();
	    this.renderer.render(this.scene, this.camera);

	},

	addAxes: function() {
		var axes = new THREE.AxisHelper(20);
		this.scene.add(axes);
	}


}