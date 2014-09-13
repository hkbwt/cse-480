var ENGINE = {
	initStats: function() {
		var stats = new Stats();

		stats.setMode(0); // 0: fps, 1: ms
		$("#Stats-output").append( stats.domElement );

		return stats;
	},

	initViewPort: function() {
		var this.scene =  THREE.Scene();

		initCamera();
		initRenderer();

		
		this.initCamera = function() {
			var this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		}
	
		this.initRenderer = function() {
			var this.renderer = new THREE.WebGLRenderer();
			renderer.setClearColorHex(0xEEEEEE);
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		this.addAxes = function() {
			var axes = new THREE.AxisHelper(20);
			this.scene.add(axes);
		}

		

	} 



}