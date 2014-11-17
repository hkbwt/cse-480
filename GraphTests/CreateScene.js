var newGraphObject;
var createGraphScene = function () {
            var scene = new BABYLON.Scene(engine);
            newGraphObject = new graphObject();
		
            // setup environment
            var light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 50, 0), scene);
            var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
            camera.setPosition(new BABYLON.Vector3(0, 15, -30));

	    var wall = BABYLON.Mesh.CreatePlane("wall", 80.0, scene);
            wall.material = new BABYLON.StandardMaterial("wallMat", scene);
            wall.material.emissiveColor = new BABYLON.Color3(0.5, 1, 0.5);
            wall.material.alpha = 0.0;


            // Impact impostor
            
        
	    
            //When pointer down event is raised
            scene.onPointerDown = function (evt, pickResult) {
                // if the click hits the ground object, we change the impact position
                if (pickResult.hit && state == "addVertice") {
                    scene = newGraphObject.addVertex(scene, pickResult.pickedPoint.x, pickResult.pickedPoint.y);
		
		}
            };
            return scene;
        };

