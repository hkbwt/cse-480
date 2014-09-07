cse-480
=======

The goal of this project is to visualize common computer science ideas, structures and theories in Webgl using three.js. Our development browser will be chrome, as it is the furthest along in implementing Webgl. Webgl provides the Opengl library in JavaScript. Webgl is used to render 3d hardware accelerated graphics in the web browser. Three.js is a high-level wrapper library to encapsulate the Webgl library; as well as implementing helper libraries.

Further_reading
* http://www.khronos.org/webgl/wiki/Main_Page
* http://www.opengl.org/wiki/Main_Page
* http://threejs.org/

Getting Started
===============
The first thing to do is to download git. if you're using windows download git here:
* http://msysgit.github.io/

or if you're using linux download git from the official repositories in you're preferred distribution.
an example for arch linux
```
# pacman -S git
```
Afterwards git needs to be configured.
```
$ git config --global user.name "Your Name"
$ git config --global user.email "your_email@whatever.com"
```
Then for Linux, Mac:
```
$ git config --global core.autocrlf input
$ git config --global core.safecrlf true
```
Or for Windows:
```
$ git config --global core.autocrlf true
$ git config --global core.safecrlf true
```
NOTE: if you get an error about crlf use this:
```
$ git config --global core.autocrlf false
```

Now that git is setup, the next thing to do is to setup your work area and download the project from github. First navigate to your desired directory. Then clone the repository
```
$ git clone https://github.com/lakkthereof/cse-480.git
```

now navigate to the cse-480 folder and create your own branch to work on
```
$ git checkout -b your_name
```
Now you are ready to code. Once finished and you want to push your changes to the remote repository you will need to do the following:
```
$ git add .
$ git commit -m "what did I do in this commit"
$ git push origin your_name
```
NOTE: It should ask you for your username and password for github.

Congratulations, you have successfully contributed to the project!

Further_reading
* http://gitimmersion.com/lab_01.html
* http://gitref.org/

Basic Project Outline
=====================
After picking your subject matter, create a copy of the base file with the name of your subject in the tutorials directory 
```
$ cp skeleton-canvas.html tutorials/your-subject-matter.html
```
Now open tutorials/your-subject-matter.html in your favorite text editor like notepad++ or brackets and place your code in the highlighted area labeled do Webgl stuff here...
All dependencies should be taken care of. The skeleton file uses css from the css/lean.css file. it also uses the debug version of three.js, jquery, stats and dat.gui libraries. If you are having performance issues on older hardware I would suggest using the "min" versions of these files. They can also be found in the libs folder. Some extra css files are add in case they are needed. but currently they are not used in the skeleton file.

Three.js Primer
===============
An example file can be found in the tutorials folder. In it you can see how to do the basics of rendering and updating the screen and using the stats and the gui libraries. I have also compiled a list of tutorials and books and real code for you to look at.

Further_reading
* https://www.youtube.com/channel/UCQakTdADmS_hLgGw6afzFNg
* https://github.com/josdirksen/learning-threejs
* https://drive.google.com/file/d/0B1D_AELyf6cGOWxTcFhNU2lLczg/edit?usp=sharing
* http://threejs.org/docs/#Manual/Introduction/Creating_a_scene

Computer Science Subject
========================
1. Tree Traversal 
2. BFS / DFS
3. Minimum Spanning Trees
4. All-Pairs Shortest Paths / Single Source SP
5. ?
6. ?
7. ?
8. ?
9. ?
10. ?
