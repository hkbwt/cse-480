// initializes the html and handles calls from the user interface
// to the feelgorythm object

var Algorithm3dApp = function(canvasId) {
	this._canvasId = canvasId;
	this.feel = undefined;
};

Algorithm3dApp.prototype = {

	initBabylonEngine: function() {
		this.feel = new BabylonEngine(this._canvasId);
		this.feel.initBabylon();
		this.feel.loadTextures();
		this.feel.initScene();
	},

	initGraphModelMenus: function() {
		this._initTabs();
		this._initModelMenu();
		this._initSettingsMenu();
		this._initCodeMenu();

		// initialize semantic-ui modules
		$('.accordion').accordion();
		$('.dropdown').dropdown();
		$('.ui.checkbox').checkbox();
	},

	_initTabs: function() {
		/*Menu Tabs*/

		$('.app_menu').click( function() {

			var selected_sidebar = '#model_menu';

			if (this.id == 'btn_model' ) {
				selected_sidebar = '#model_menu';
			}

			else if (this.id == 'btn_settings' ) {
				selected_sidebar = '#settings_menu';
			}

			else if (this.id == 'btn_code' ) {
				selected_sidebar = '#code_menu';
			}

			else if (this.id == 'btn_main' ) {
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
	},

	_initModelMenu: function() {
		/*Model Menu*/
		var model = this.feel.model;

		$('.vertex_buttons').click(function() {

			$('.edge_buttons').removeClass('active');

			if( $(this).hasClass('active') ) {
				$(this).removeClass('active');
			}
			else {
				$('.vertex_buttons').removeClass('active');
				if(!$(this).is("#add_vertex")) {
					$(this).addClass('active');
				}
				
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
		
		//button actions for generic graph model
		
		//addVertices
		$('#add_vertex').click(function() {
			model.graphState = "addVertice"; 
			model.addVertex();
		});
		//remove vertices
		$('#remove_vertex').click(function() {
			model.graphState = "removeVertice";
		});
		//edit?
		$('#edit_vertex').click(function() {
			model.graphState = "edit";
			model.play();
		});
		
		//add edges
		$('#add_edge').click(function() {
			model.graphState = "addEdge";   
		});
		//remove edges
		$('#remove_edge').click(function() {
			model.graphState = "removeEdge"; 
		});

		//Clear graoh
		$('#remove_all').click(function() {
			model.removeAll();
			model.graphState = "";
		});

		$('#orgainze_graph').click(function() {
			model.organizeModel();
			model.graphState = "";
		});
	},

	_initSettingsMenu: function() {
		/*Settings Menu*/

		this._populateSettingsDropDowns();
		this._initSettingsDropDowns();
		this._initSettingsApply();
		this._initSettingsCancle();
		this._initSettingsDebug();
	},

	_initSettingsDebug: function() {
		var feel = this.feel;
		$('#btn_debug').click(function() {
			feel.dumpDebug();
		});
	},

	_initSettingsCancle: function() {
		var feel = this.feel;

		$('#btn_settings_cancel').click(function() {
			$('#dd_skybox').dropdown( 'set selected', feel._getIndexOfObjectArray(
				feel.currentSkybox, SkyBoxThemes).toString());
			$('#dd_vertexSize').dropdown( 'set selected',
				feel.currentVertexSize.toString());
			$('#dd_groundTexture').dropdown( 'set selected', feel._getIndexOfObjectArray(
				feel.currentGroundTheme, GroundThemes).toString());
			$('#dd_graphThemes').dropdown( 'set selected', feel._getIndexOfObjectArray(
				feel.currentGraphTheme, GraphThemes).toString());
		});
	},

	_initSettingsApply: function() {
		var feel = this.feel;

		$('#btn_settings_apply').click(function() {
			var skybox_selected = $("#dd_skybox").dropdown("get value");
			var size_selected = $("#dd_vertexSize").dropdown("get value");
			var ground_selected = $("#dd_groundTexture").dropdown("get value");


			// if(_app.feel.currentSkybox)

			feel.updateSkybox(skybox_selected);
			feel.model.updateModelSize(size_selected);
			feel.updateGround(ground_selected);
			/*feel.model.updateModelTheme();
			feel.model.updateDisplayGraphValues();
			feel.updateEnableTutorial(); */
		});
	},

	_populateSettingsDropDowns: function() {
		var i = 0;
		//setup Skybox dropdown box
		for(i = 0; i < SkyBoxThemes.length; i++) {
			$('#dd_skybox .menu').append("<div class='item' data-value='" + i + "'>" + SkyBoxThemes[i].name + " </div>");

		}
		// fill ground texture dropdown 
		for(i = 0; i < GroundThemes.length; i++) {
			$('#dd_groundTexture .menu').append("<div class='item' data-value='" + i + "'>" + GroundThemes[i].name + " </div>");

		}

		// fill graph themes dropdown 
		for(i = 0; i < GraphThemes.length; i++) {
			$('#dd_graphThemes .menu').append("<div class='item' data-value='" + i + "'>" + GraphThemes[i].name + " </div>");

		}
	},

	_initSettingsDropDowns: function() {
		var feel = this.feel;
		// initializing skybox dropdown
		$('#dd_skybox').dropdown();
		$('#dd_skybox').dropdown( 'set selected',
		feel._getIndexOfObjectArray(feel.currentSkybox, SkyBoxThemes).toString());
		
		// initializing vertex size
		$('#dd_vertexSize').dropdown( 'set selected',
		feel.currentVertexSize.toString());

		// initializing ground texture dropdown
		$('#dd_groundTexture').dropdown();
		$('#dd_groundTexture').dropdown( 'set selected',
		feel._getIndexOfObjectArray(feel.currentGroundTheme,
		GroundThemes).toString());

		//initializing  graph theme dropdown
	    $('#dd_graphThemes').dropdown();
	    $('#dd_graphThemes').dropdown( 'set selected',
	    feel._getIndexOfObjectArray(feel.currentGraphTheme,
	    GraphThemes).toString());
	},

	_initCodeMenu: function() {
		/*Run Code Menu*/
		var model = this.feel.model;
		
		//bfsStartPoint
		$('#bfs_start_point_graph').click(function() {
  		    model.algoSelected = "bfs";
  		    model.graphState = "bfs";
				    
		});
		$('#dfs_start_point_graph').click(function() {
	  		model.algoSelected = "dfs";
	  		model.graphState = "dfs";
				    
		});
		  
		$('#short_start_point_graph').click(function() {
	  		model.algoSelected = "short";
	  		model.graphState = "short";
				    
		});
		
		$('#Play_graph').click(function() {
 		    model.graphState = "play";
		    model.play(document.getElementById('algoArea'));
		});
		$('#Pause_graph').click(function() {
		 		    model.graphState = "pause";
		});
		$('#Rewind_graph').click(function() {
 		    model.graphState = "rewind";
		    model.play(document.getElementById('algoArea'));
		});
		$('#FastForward_graph').click(function() {
 		    model.graphState = "forward";
		    model.play(document.getElementById('algoArea'));
		});
		$('#selectAlgo').dropdown();
		$('#selectAlgo').dropdown( 'set selected', 'Breadth First Search');
		 
		//TextArea Formating
		var textArea = document.getElementById('algoArea');
		var TextArea = new AlgoArea(textArea);
		TextArea.createArea();
		$(textArea).prop('readonly', true);
	}


};


/*main function*/
$( document ).ready( function() {

	var app = new Algorithm3dApp('renderCanvas');
	app.initBabylonEngine();
	app.feel.initGraphModel();	
	app.initGraphModelMenus();
 
});