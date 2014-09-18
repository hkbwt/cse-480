var FACTORIES = {

	createSphere: function(radius, pos) {
		var sphereGeo = new THREE.SphereGeometry(radius, 20, 20);
		var sphereMat = new THREE.MeshLambertMaterial({color: 0xff0000});
		var sphere = new THREE.Mesh(sphereGeo, sphereMat);
		sphere.castShadow = true;

		//inital position
		sphere.position.x = pos.x;
		sphere.position.y = pos.y;
		sphere.position.z = pos.z;

		return sphere;
	},

	createCube: function(width, height, depth) {
		var cubeGeo = new THREE.CubeGeometry(width, height, depth);
		var cubeMat = new THREE.MeshLambertMaterial({color: 0xff0000});
		var cube = new THREE.Mesh(cubeGeo, cubeMat);
		cube.castShadow = true;

		//inital position
		cube.position.x = 8;
		cube.position.y = 4;
		cube.position.z = 0;

		return cube;
	},

	createPlane: function() {
		var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
        var planeMaterial =    new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.receiveShadow  = true;

        plane.rotation.x=-0.5*Math.PI;
        plane.position.x=15
        plane.position.y=-4
        plane.position.z=0

        return plane
	},

	createSpotLight: function(color, pos) {
		var spotLight = new THREE.SpotLight(0xffffff);
		spotLight.position.set( -40, 60, -10 );
        spotLight.castShadow = true;
		
		return spotLight;
	}


}