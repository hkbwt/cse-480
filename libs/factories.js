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
        },

        createCylinder: function(radiusTop, radiusBottom, height, material) {
            var cylinderGeo = new THREE.CylinderGeometry( 
                radiusTop, radiusBottom, height, 32 );
            var cylinder = new THREE.Mesh( cylinderGeo, material );
            cylinder.castShadow = true;

            return cylinder;
        },

        createTube: function(points, segments, radius, radiusSegments, isclosed, material) {
            var tubeGeo = new THREE.TubeGeometry( new THREE.SplineCurve3(points),
                segments, radius, radiusSegments, isclosed);
            var tube = new THREE.Mesh(tubeGeo, material);
            tube.castShadow = true;

            return tube;
        }

        //add more shapes
    },

    Lights: {

        createSpotLight: function(pos, hexColor) {
            hexColor = ( hexColor != undefined ) ? hexColor : 0xffffff;
            var spotLight = new THREE.SpotLight(hexColor);
            spotLight.position.set( pos.x, pos.y, pos.z);
            spotLight.castShadow = true;
            
            return spotLight;
        }

        //add more lights or light sources

    },

    Materials: {
        createLambertMaterial: function(hexColor) {
            hexColor = ( hexColor != undefined ) ? hexColor : 0xffffff;
            return new THREE.MeshLambertMaterial({color: hexColor});
        }

        //add different material or custom shader
    }

};