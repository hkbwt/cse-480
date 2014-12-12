/*
*   "We want you to feel the algorithm"
*/

var BabylonEngine = function(documentId) {
    thisFeelGoRythm          = this;
    //main babylonjs componets
    this._documentId         = documentId;
    this._canvas             = undefined;
    this.engine              = undefined;
    this.scene               = undefined;
    
    
    //app variables
    //
    // 3d model variable
    this.model               = undefined;
    
    //current themes
    this.currentGraphTheme  = "Halloween";
    this.currentSkybox      = "alien";
    this.currentGroundTheme = "grid-me";
    this.currentVertexSize  = "medium";
    
    //model options
    this.bDisplayGraphValues = false;
    this.bEnableTutorial     = false;
    
    //asset paths
    this._SKYBOXTEXTUREPATH  = "textures/skybox/";
    this._GROUNDTEXTUREPATH  = "textures/ground/";
};

BabylonEngine.prototype = {

    initCamera: function() {
        this.camera = new BABYLON.ArcRotateCamera("ArcRotCamera",
                     0.0, 0.0, 200.0,
                     new BABYLON.Vector3(0, 0, 0), this.scene);
        
        this.camera.lowerRadiusLimit = 20;
        this.camera.upperRadiusLimit = 650;
        this.camera.upperBetaLimit   = 0.334 * Math.PI;
        this.camera.upperAlphaLimit  = Math.PI;
        this.camera.maxZ             = 2000;

        this.camera.attachControl(this._canvas, false);
    },

    initBabylon: function() {

        this._canvas = document.getElementById(this._documentId);
        this.engine = new BABYLON.Engine(this._canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.initMoveFunction();

        window.addEventListener("resize", function () {
                thisFeelGoRythm.engine.resize();    
        }); 
    },

    loadTextures: function() {

        this.loadGraphThemeMaterials();
        this.loadSkyboxTextureThemes();
        this.loadGroundThemes();
    },

    initScene: function() {
        
        this.initCamera();
        this.initGround();
        this.initDefaultLights();
        this.initSkyBox();

        //resize loop for web browser
        this.engine.runRenderLoop(function() {
            thisFeelGoRythm.scene.render();
        });     
    },

    initGround: function() {
        var ground = new BABYLON.Mesh.CreateGround( "ground", 1000, 1000, 8, this.scene);
        ground.material = this.scene.getMaterialByID("mat_" + this.currentGroundTheme);
    }, 

    initSkyBox: function() {

        var skybox = BABYLON.Mesh.CreateBox("skybox", 2000.0, this.scene);
        skybox.material = this.scene.getMaterialByID("mat_" + this.currentSkybox);
        skybox.infiniteDistance = true;
    },

    loadGraphThemeMaterials: function() {

        for(var theme = 0; theme < GraphThemes.length; theme++) {
            var currTheme = GraphThemes[theme];
            for(var color in Palettes[currTheme.name]) {
                var mat = new BABYLON.StandardMaterial( currTheme.name + "_"+ color.toString(), this.scene);
                mat.diffuseColor = Palettes[currTheme.name][color];
            }
        }
    },

    loadSkyboxTextureThemes: function() {
        
        for (var theme = 0; theme < SkyBoxThemes.length; theme++) {
            var currSkyboxTexture = SkyBoxThemes[theme];
            var skyboxMaterial = new BABYLON.StandardMaterial("mat_" + currSkyboxTexture.name, this.scene);
            skyboxMaterial.backFaceCulling = false;

            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
                                            this._SKYBOXTEXTUREPATH + currSkyboxTexture.path, this.scene);

            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

        }
    },

    loadGroundThemes: function() {
        for (var theme = 0; theme < GroundThemes.length; theme++) {
            var currGroundTheme = GroundThemes[theme];
            var groundMaterial = new BABYLON.StandardMaterial("mat_" + currGroundTheme.name, this.scene);
            var texture = new BABYLON.Texture(this._GROUNDTEXTUREPATH + currGroundTheme.filename, this.scene);
            texture.uScale = 1.0;
            texture.vScale = 1.5;

            groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            groundMaterial.diffuseTexture = texture;
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

    initGraphModel: function() {
        var index = this._getIndexOfObjectArray(this.currentGraphTheme, GraphThemes);
        this.model = new GraphModel( this.scene, 0, GraphThemes[index].colortheme, this.currentVertexSize);
    },

    updateSkybox: function(index) {
        var newSkyBoxTheme = SkyBoxThemes[index];
        var skyboxMesh = thisFeelGoRythm.scene.getMeshByName("skybox");
        skyboxMesh.material = thisFeelGoRythm.scene.getMaterialByID("mat_" + newSkyBoxTheme.name);
    },

    updateGround: function(index) {
        console.log(index);


        var newGroundTheme = GroundThemes[index];
        console.log(newGroundTheme);

        var groundMesh = thisFeelGoRythm.scene.getMeshByName("ground");
        console.log(thisFeelGoRythm.scene.getMaterialByID("mat_" + newGroundTheme.name));
        groundMesh.material = thisFeelGoRythm.scene.getMaterialByID("mat_" + newGroundTheme.name);
    },
    
    dumpDebug: function() {
        console.log(this);
    },

    _getIndexOfObjectArray: function(name, objArray){
        for(var i = 0; i < objArray.length; i++) {
                if(objArray[i].name == name) return i;
        }
        return -1;
    },

    getGroundPosition: function () {
        // Use a predicate to get position on the ground
        var pickinfo = thisFeelGoRythm.scene.pick(
                thisFeelGoRythm.scene.pointerX,
                thisFeelGoRythm.scene.pointerY, 
                function (mesh) { 
                    return mesh == thisFeelGoRythm.scene.meshes[0]; 
             });

        if (pickinfo.hit) { return pickinfo.pickedPoint; }
        return null;
    },
    
    onPointerDown: function(evt){
        var gmodel = thisFeelGoRythm.model;
        if(evt.button !== 0){ return; }

        var pickInfo = thisFeelGoRythm.scene.pick(
                thisFeelGoRythm.scene.pointerX, 
                thisFeelGoRythm.scene.pointerY, 
                function (mesh) { 
                    return (mesh !== thisFeelGoRythm.scene.meshes[0] &&
                            mesh !== thisFeelGoRythm.scene.meshes[1]); 
            });

        if (pickInfo.pickedMesh !== null &&
            pickInfo.pickedMesh.matchesTagsQuery("vertex") &&
            pickInfo.hit) {

            gmodel.setSelectedVertex(pickInfo.pickedMesh);
            gmodel.startingPoint = thisFeelGoRythm.getGroundPosition(evt);

            if (gmodel.startingPoint) { 
                // we need to disconnect camera from canvas
                setTimeout(function () {
                        thisFeelGoRythm.scene.cameras[0].detachControl(thisFeelGoRythm.engine.getRenderingCanvas());
                }, 0);
            }
        }
        
    },

    onPointerUp: function () {
        var gmodel = thisFeelGoRythm.model;

        if (gmodel.startingPoint) {
            thisFeelGoRythm.scene.cameras[0].attachControl(
                thisFeelGoRythm.engine.getRenderingCanvas(), true);
            
            gmodel.startingPoint = null;
            return;
        }
    },

    onPointerMove: function (evt) {
        var gmodel = thisFeelGoRythm.model;

        if (!gmodel.startingPoint) {
            return;
        }

        var currentPointerPosition = thisFeelGoRythm.getGroundPosition(evt);

        if (!currentPointerPosition) {
            return;
        }

        var diff = currentPointerPosition.subtract(gmodel.startingPoint);
        var selectedMesh = gmodel.getSelectedVertex();
        
        selectedMesh.position.addInPlace(diff);
        gmodel.updateEdges(selectedMesh);
        gmodel.startingPoint = currentPointerPosition;
    },

    initMoveFunction: function(){
        this.engine.getRenderingCanvas().addEventListener("pointerdown", thisFeelGoRythm.onPointerDown, false);
        this.engine.getRenderingCanvas().addEventListener("pointerup", thisFeelGoRythm.onPointerUp, false);
        this.engine.getRenderingCanvas().addEventListener("pointermove", thisFeelGoRythm.onPointerMove, false);
    }
    
};
