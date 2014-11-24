
/*
*	"We want you to feel the algorithm"
*/


var model;
var FeelgoRhythm = function(documentId) {
	
	//old
	this.canvas = document.getElementById(documentId);
	this.engine = new BABYLON.Engine(this.canvas, true);
	this.scene = new BABYLON.Scene(this.engine);
	//this. hit mat 
	this.model = undefined;
	this.currentTheme = Themes.Rainbowz;
	var that = this;
	this.engine.runRenderLoop(function(){
		that.scene.render();});
	window.addEventListener("resize", function () {
			//this.engine.resize();
			that.engine.resize();	
	});
	
};

FeelgoRhythm.prototype = {

	initCamera: function() {
		this.camera = new BABYLON.ArcRotateCamera("ArcRotCamera",
					 1.5319001498871874, 1.3278950757638162, 180.04261169410753,
					 new BABYLON.Vector3(0, 0, 0), this.scene);
		
		this.camera.lowerRadiusLimit = 20;
		this.camera.upperRadiusLimit = 450;
		this.camera.upperBetaLimit = 0.483 * Math.PI;
		this.camera.maxZ = 1500;

		this.camera.attachControl(this.canvas, false);
	},

	initScene: function() {
		this.initCamera();
		this.initStandardMaterials();
		this.initGround();
		this.initDefaultLights();
		this.initSkyBox();
		

	},

	initGround: function() {

		// Part 1 : Creation of Tiled Ground
		// Parameters
		var xmin = -500;
		var zmin = -500;
		var xmax =  500;
		var zmax =  500;
		var precision = {
		    "w" : 2,
		    "h" : 2
		};
		var subdivisions = {
		    'h' : 12,
		    'w' : 12
		};

		var tiledGround = new BABYLON.Mesh.CreateTiledGround("Tiled Ground", xmin, zmin, xmax, zmax, 
															subdivisions, precision, this.scene);		 

		 tiledGround.material = this.scene.multiMaterials[0];
		
		 // Needed variables to set subMeshes
		 var verticesCount = tiledGround.getTotalVertices();
		 var tileIndicesLength = tiledGround.getIndices().length / (subdivisions.w * subdivisions.h);
		 
		 // Set subMeshes of the tiled ground
		 tiledGround.subMeshes = [];
		 var base = 0;
		 for (var row = 0; row < subdivisions.h; row++) {
		     for (var col = 0; col < subdivisions.w; col++) {
		         tiledGround.subMeshes.push(new BABYLON.SubMesh(row%2 ^ col%2, 0, verticesCount, base , tileIndicesLength, tiledGround));
		         base += tileIndicesLength;
		     }
		 }
	},

	initSkyBox: function() {
		var skybox = BABYLON.Mesh.CreateBox("skybox", 2000.0, this.scene);
		var skyboxMaterial = new BABYLON.StandardMaterial("skybox_mat", this.scene);
		skyboxMaterial.backFaceCulling = false;
		skybox.material = skyboxMaterial;
		skybox.infiniteDistance = true;

		skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

		skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/clouds/clouds", this.scene);
		skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

	},

	initStandardMaterials: function() {

		for(var color in Palettes.Rainbowz) {
			var mat = new BABYLON.StandardMaterial("Rainbowz_"+ color.toString(), this.scene);
			mat.diffuseColor = Palettes.Rainbowz[color];
		}

		for(var color in Palettes.Halloween) {
			var mat = new BABYLON.StandardMaterial("Halloween_"+ color.toString(), this.scene);
			mat.diffuseColor = Palettes.Halloween[color];
		} 


		var whiteMaterial = new BABYLON.StandardMaterial("ground_white", this.scene);
		 whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

		 var blackMaterial = new BABYLON.StandardMaterial("ground_black", this.scene);
		 blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

		 // Create Multi Material
		 var multimat = new BABYLON.MultiMaterial("ground_mat", this.scene);
		 multimat.subMaterials.push(whiteMaterial);
		 multimat.subMaterials.push(blackMaterial);
	},

	initDefaultLights: function() {
		var light = new BABYLON.HemisphericLight("light_" + this.scene.lights.length,
		new BABYLON.Vector3(0, 1, 0), this.scene);
		light.intensity = 0.7;
		this.lightcount++;
	},

	initGraphScene: function() {

		this.model = new GraphModel( this.scene, 10, this.currentTheme);
		this.model.addEdgeByValues(1,2);
		this.model.addEdgeByValues(5,2);
		this.model.addEdgeByValues(3,2);
		this.model.addEdgeByValues(5,1);
		this.model.addEdgeByValues(3,1);
		this.model.addEdgeByValues(0,9);
		console.log(this.model);
	},
	
	dumpDebug: function() {
		console.log(this);
	},
	addNewScene: function() {
		
		console.log(this.scene);
		console.log(test);
		
		
	}
	
};
var app;
/*main function*/
$( document ).ready( function() {
	//var app
	app = new FeelgoRhythm('renderCanvas');
	app.initScene();
	app.initGraphScene();
	/*Menu Tabs*/

	$('.app_menu').click( function() {

		if (this.id == 'btn_model' ) {
			var selected_sidebar = '#model_menu';
		}

		if (this.id == 'btn_settings' ) {
			var selected_sidebar = '#settings_menu';
		}

		if (this.id == 'btn_code' ) {
			var selected_sidebar = '#code_menu';
		}

		if (this.id == 'btn_main' ) {
			// $('.ui.sidebar').sidebar('hide');
			// code here
		}

		if($(selected_sidebar).hasClass('active')) {
			$('.ui.sidebar').sidebar('hide');
		}
		else {
			$('.ui.sidebar').sidebar('hide');
			$(selected_sidebar).sidebar('show');
		}

	});

	/*Menu Tabs Animations*/

	$('.app_menu').mouseenter(function() {
		$(this).stop().animate({width: '215px'}, 300, function() {
			$(this).find('.menu_text').show();
		});
	  });

	$('.app_menu').mouseleave(function() {
 		$(this).find('.menu_text').hide();
        $(this).stop().animate( { width: '80px'}, 300);
    });


    /*Model Menu*/

    $('.vertex_buttons').click(function() {

    	$('.edge_buttons').removeClass('active');

    	if( $(this).hasClass('active') ) {
    		$(this).removeClass('active');
    	}
    	else {
    		$('.vertex_buttons').removeClass('active');
    		$(this).addClass('active');
    	}
    });

    $('.edge_buttons').click(function() {
    	$('.vertex_buttons').removeClass('active');

    	if( $(this).hasClass('active') ) {
    		$(this).removeClass('active');
    	}
    	else {
    		$('.edge_buttons').removeClass('active');
    		$(this).addClass('active');
    	}
    });

});