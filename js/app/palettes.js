//Goto: http://www.color-hex.com/color-palettes/ to add more

var Palettes = {

	Rainbowz: {
		red: new BABYLON.Color3(1, 0, 0),
		orange: new BABYLON.Color3(1, 0.612, 0),
		yellow: new BABYLON.Color3(0.933, 1, 0),
		green: new BABYLON.Color3(0.118, 1, 0),
		blue:  new BABYLON.Color3(0, 0.745, 1)
	},

	Halloween: {
		orange: new BABYLON.Color3(1, 0.604, 0),
		black: new BABYLON.Color3(0, 0, 0), 
		green: new BABYLON.Color3(0.035, 1, 0),
		purple: new BABYLON.Color3(0.788, 0, 1),
		white: new BABYLON.Color3(0.984, 0.98, 0.957)
	}
};


/*
	name: name of the theme
	vertexMat: default vertex material
	edgeMat: default edge material
	activeMatOne: an active vertex or edge having to do with the current running algorithm
	activeMatTwo: an active vertex or edge having to do with the current running algorithm. use if needed
	selectedMat: a selected vertex or edge by the user or the algorithm as needed 

*/

function ColorTheme(name, vertexMat, edgeMat, activeMatOne, activeMatTwo, selectedMat) {
	this.name = name;
	this.vertexMat = name + '_' + vertexMat;
	this.edgeMat = name + '_' + edgeMat;
	this.activeMatOne = name + '_' + activeMatOne;
	this.activeMatTwo = name + '_' + activeMatTwo;
	this.selectedMat = name + '_' + selectedMat;

	return this;
}


var GraphThemes = [
	{name: "Rainbowz", colortheme: new ColorTheme('Rainbowz','blue', 'orange', 'yellow', 'red', 'green')},
	{name: "Halloween", colortheme: new ColorTheme('Halloween', 'black', 'orange', 'green', 'purple', 'white')}
];

var SkyBoxThemes = [
	{name: "alien", path: "alien/alien"},
	{name: "ashcanyon", path: "ashcanyon/ashcanyon"},
	{name: "bleached", path: "bleached/bleached" },
	{name: "blood_sport", path: "blood_sport/blood_sport" },
	{name: "bluesky", path: "bluesky/bluesky"},
	{name: "calm",path: "calm/calm"},
	{name: "canyon",path: "canyon/canyon"},
	{name: "city",path: "city/city"},
	{name: "city2", path: "city2/city2"},
	{name: "cliffsofinsanity", path: "cliffsofinsanity/cliffsofinsanity"},
	{name: "clouds",path: "clouds/clouds"},
	{name:"moon", path: "moon/moon"},
	{name: "mountains", path: "mountains/mountains"},
	{name: "sky",path:"sky/sky"},
	{name: "space",path: "space/sky"},
	{name: "space2",path: "space2/space2"},
	{name: "tron",path: "tron/tron"}
];


var GroundThemes = [
	{name: "blue_brick", filename: "blue_brick.jpg"},
	{name: "grey_brick", filename: "grey_brick.jpg"},
	{name: "red_brick", filename: "red_brick.jpg"},
	{name: "dry_wood", filename: "dry_wood.jpg"},
	{name: "cobble", filename: "cobble.jpg"},
	{name: "grass_and_daysies", filename: "grass_and_daysies.jpg"},
	{name: "water", filename: "water.jpg"},
	{name: "white_wall", filename: "white_wall.jpg"}
];