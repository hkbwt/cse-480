/********************************************************
*
*           Author: Shawn Scott
*           Date: 9.18.2014
*           Filename: factories.js
*
*
*
*
*********************************************************/

var FACTORIES = {

	createSphere: function(radius, hexColor) {
		if (hexColor == undefined) {
			hexColor = 0xff0000;
		}
		var sphereGeo = new THREE.SphereGeometry(radius, 20, 20);
		var sphereMat = new THREE.MeshLambertMaterial({color: hexColor});
		var sphere = new THREE.Mesh(sphereGeo, sphereMat);
		sphere.castShadow = true;

		return sphere;
	},

	createBox: function(width, height, depth, hexColor) {
		if (hexColor == undefined) {
			hexColor = 0xff0000;
		}
		var cubeGeo = new THREE.BoxGeometry(width, height, depth);
		var cubeMat = new THREE.MeshLambertMaterial({color: hexColor});
		var cube = new THREE.Mesh(cubeGeo, cubeMat);
		cube.castShadow = true;
		return cube;
	},

	createPlane: function(rect, hexColor) {
		if (hexColor == undefined) {
			hexColor = 0xffffff;
		}
		var planeGeometry = new THREE.PlaneGeometry(rect.x, rect.y);
        var planeMaterial = new THREE.MeshLambertMaterial({color: hexColor});
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.receiveShadow  = true;

        return plane
	},

	createSpotLight: function(pos, hexColor) {
		if (hexColor == undefined) {
			hexColor = 0xffffff;
		}
		var spotLight = new THREE.SpotLight(hexColor);
		spotLight.position.set( pos.x, pos.y, pos.z);
        spotLight.castShadow = true;
		
		return spotLight;
	}


}