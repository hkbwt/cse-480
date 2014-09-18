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

var Factories = {
	Shapes: {
		createSphere: function(radius, material) {
			var sphereGeo = new THREE.SphereGeometry(radius, 20, 20);
			var sphere = new THREE.Mesh(sphereGeo, material);
			sphere.castShadow = true;

			return sphere;
		},

		createBox: function(width, height, depth, material) {
			var cubeGeo = new THREE.BoxGeometry(width, height, depth);
			var cube = new THREE.Mesh(cubeGeo, material);
			cube.castShadow = true;
			return cube;
		},

		createPlane: function(rect, material) {
			var planeGeo = new THREE.PlaneGeometry(rect.x, rect.y);
	     	var plane = new THREE.Mesh(planeGeo, material);
	        plane.receiveShadow  = true;

	        return plane
		}

	},

	Lights: {

		createSpotLight: function(pos, hexColor) {
			hexColor = ( hexColor != undefined ) ? hexColor : 0xffffff;
			var spotLight = new THREE.SpotLight(hexColor);
			spotLight.position.set( pos.x, pos.y, pos.z);
	        spotLight.castShadow = true;
			
			return spotLight;
		}

	},

	Materials: {
		createLambertMaterial: function(hexColor) {
			hexColor = ( hexColor != undefined ) ? hexColor : 0xffffff;
			return new THREE.MeshLambertMaterial({color: hexColor});


		}
	}

}