
var BabylonEngine = function(documentId) {
    //main babylonjs componets
    this._documentId         = documentId;
    this._canvas             = undefined;
    this.engine              = undefined;
    this.scene               = undefined;
    
    
    //app variables
    //
    // 3d model variable
    this.model               = undefined;
    this.groundName          = "ground";
    this.skyboxName          = "skybox";
    
    //current themes
    this.currentGraphTheme   = "Halloween";
    this.currentSkybox       = "alien";
    this.currentGroundTheme  = "grid-me";
    this.currentVertexSize   = "medium";
    
    //model options
    this.bDisplayGraphValues = false;
    this.bEnableTutorial     = false;
    
    //asset paths
    this._SKYBOXTEXTUREPATH  = "textures/skybox/";
    this._GROUNDTEXTUREPATH  = "textures/ground/";


    this.initCamera = function() {
        this.camera = new BABYLON.ArcRotateCamera("ArcRotCamera",
                     0.0, 0.0, 200.0,
                     new BABYLON.Vector3(0, 0, 0), this.scene);
        
        this.camera.lowerRadiusLimit = 20;
        this.camera.upperRadiusLimit = 650;
        this.camera.upperBetaLimit   = 0.334 * Math.PI;
        this.camera.upperAlphaLimit  = Math.PI;
        this.camera.maxZ             = 2000;

        this.camera.attachControl(this._canvas, false);
    };

    this.initBabylon = function() {

        this._canvas = document.getElementById(this._documentId);
        this.engine = new BABYLON.Engine(this._canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.initMoveFunction();

        window.addEventListener("resize", function () {
                this.engine.resize();    
        }.bind(this)); 
    };

    this.loadTextures = function() {

        this.loadGraphThemeMaterials();
        this.loadSkyboxTextureThemes();
        this.loadGroundThemes();
    };

    this.initScene = function() {
        
        this.initCamera();
        this.initGround();
        this.initDefaultLights();
        this.initSkyBox();

        //resize loop for web browser
        this.engine.runRenderLoop(function() {
            this.scene.render();
        }.bind(this));     
    };

    this.initGround = function() {
        var ground = new BABYLON.Mesh.CreateGround( "ground", 1000, 1000, 8, this.scene);
        ground.material = this.scene.getMaterialByID("mat_" + this.currentGroundTheme);
    };

    this.initSkyBox = function() {

        var skybox = BABYLON.Mesh.CreateBox("skybox", 2000.0, this.scene);
        skybox.material = this.scene.getMaterialByID("mat_" + this.currentSkybox);
        skybox.infiniteDistance = true;
    };


    this.loadSkyboxTextureThemes = function() {
        
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
    };

    this.loadGroundThemes = function() {
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
    };

    this.initDefaultLights = function() {
        var light = new BABYLON.HemisphericLight("light_" + this.scene.lights.length,
        new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
        this.lightcount++;
    };

    this.initGraphModel = function() {
        var index = this._getIndexOfObjectArray(this.currentGraphTheme, GraphThemes);
        this.model = new GraphModel( this.scene, 0, GraphThemes[index].colortheme, this.currentVertexSize);
    };

    this.updateSkybox = function(index) {
        var newSkyBoxTheme = SkyBoxThemes[index];
        var skyboxMesh = this.scene.getMeshByName("skybox");
        skyboxMesh.material = this.scene.getMaterialByID("mat_" + newSkyBoxTheme.name);
    };

    this.updateGround = function(index) {
        console.log(index);


        var newGroundTheme = GroundThemes[index];
        console.log(newGroundTheme);

        var groundMesh = this.scene.getMeshByName("ground");
        console.log(this.scene.getMaterialByID("mat_" + newGroundTheme.name));
        groundMesh.material = this.scene.getMaterialByID("mat_" + newGroundTheme.name);
    };

    this._getIndexOfObjectArray = function(name, objArray){
        for(var i = 0; i < objArray.length; i++) {
                if(objArray[i].name == name) return i;
        }
        return -1;
    };

    this.getGroundPosition = function () {
        // Use a predicate to get position on the ground
        var pickinfo = this.scene.pick(
                this.scene.pointerX,
                this.scene.pointerY, 
                function (mesh) { 
                    return mesh == this.scene.meshes[0]; 
             }.bind(this));

        if (pickinfo.hit) { return pickinfo.pickedPoint; }
        return null;
    };
    
    this.onPointerDown = function(evt){
        var gmodel = this.model;
        console.log(gmodel);
        if(evt.button !== 0){ return; }

        var pickInfo = this.scene.pick(
                this.scene.pointerX, 
                this.scene.pointerY, 
                function (mesh) { 
                    return (mesh !== this.scene.meshes[0] &&
                            mesh !== this.scene.meshes[1]); 
            }.bind(this));

        if (pickInfo.pickedMesh !== null &&
            pickInfo.pickedMesh.matchesTagsQuery("vertex") &&
            pickInfo.hit) {

            gmodel.setSelectedVertex(pickInfo.pickedMesh);
            gmodel.startingPoint = this.getGroundPosition(evt);

            if (gmodel.startingPoint) { 
                // we need to disconnect camera from canvas
                setTimeout(function () {
                        this.scene.cameras[0].detachControl(this.engine.getRenderingCanvas());
                }.bind(this), 0);
            }
        }    
    };

    this.onPointerUp = function () {
        var gmodel = this.model;

        if (gmodel.startingPoint) {
            this.scene.cameras[0].attachControl(
                this.engine.getRenderingCanvas(), true);
            
            gmodel.startingPoint = null;
            return;
        }
    };

    this.onPointerMove = function (evt) {
        var gmodel = this.model;

        if (!gmodel.startingPoint) {
            return;
        }

        var currentMousePosition = this.getGroundPosition(evt);

        if (!currentMousePosition) {
            return;
        }

        var diff = currentMousePosition.subtract(gmodel.startingPoint);
        var selectedMesh = gmodel.getSelectedVertex();
        
        selectedMesh.position.addInPlace(diff);
        gmodel.updateEdges(selectedMesh);
        gmodel.startingPoint = currentMousePosition;
    };

    this.initMoveFunction = function(){
        this.engine.getRenderingCanvas().addEventListener("pointerdown", this.onPointerDown.bind(this), false);
        this.engine.getRenderingCanvas().addEventListener("pointerup", this.onPointerUp.bind(this), false);
        this.engine.getRenderingCanvas().addEventListener("pointermove", this.onPointerMove.bind(this), false);
    };

    this.dumpDebug = function() {
        console.log(this);
    };

};