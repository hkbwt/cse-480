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


var Themes = {
	Rainbowz: new ColorTheme('Rainbowz', 'blue', 'orange', 'yellow', 'red', 'green'),
	Halloween: new ColorTheme('Halloween', 'black', 'orange', 'green', 'purple', 'white')
};

var SkyBoxThemes = {
	alien: {name: "alien", path: "alien/alien"},
	ashcanyon: {name: "ashcanyon", path: "ashcanyon/ashcanyon"},
	bleached: {name: "bleached", path: "bleached/bleached" },
	blood_sport: "blood_sport/blood_sport",
	bluesky: "bluesky/bluesky",
	calm: "calm/calm",
	canyon: "canyon/canyon",
	city: "city/city",
	city2: "city2/city2",
	cliffsofinsanity: "cliffsofinsanity/cliffsofinsanity",
	clouds: "clouds/clouds",
	moon: "moon/moon",
	mountains: "mountains/mountains",
	sky: "sky/sky",
	space: "space/sky",
	space2: "space2/space2",
	tron: "tron/tron"
};