cse-480
=======

The goal of this project is to visualize common computer science ideas, structures and theories in Webgl using three.js. Our development browser will be chrome, as it is the furthest along in implementing Webgl. Webgl provides the Opengl library in JavaScript. Opengl is used to render hardware accelerated 2d and 3d graphics; Webgl provides this in a web browser. Three.js is a high-level wrapper library to encapsulate the Webgl library; as well as implementing helper libraries for easier coding.


File Structure
==============


* ```/app``` - our code goes in here
    * ```app.js``` - initializes babylon and navigates through algorithm scenes, etc
    * ```adt.js``` - where all abstract data types should be kept
    * ```models.js``` - where our 3d models for the adt should be kept
    * ```palettes.js``` - where the color, lights and material themes should be kept 
* ```/css``` - styling for debug.html
* ```/libs``` -  3rd party JavaScript files like jQuery and Babylon go here
    * ```babylon.1.13.js``` - babylon engine
    * ```cannon.js``` - physics engine
    * ```hand.1.3.8.js``` - touch and mouse events
    * ```jquery-2.1.1.js``` - helper library
* ```readme.md``` - this file
* ```debug.html``` - testing our app

Computer Science Subject Ideas
===============================
1. Tree Traversal (Pre, In, Post)
2. BFS / DFS
3. Minimum Spanning Trees
4. All-Pairs Shortest Paths / Single Source SP

