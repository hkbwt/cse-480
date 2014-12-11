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
    {name: "Halloween", colortheme: new ColorTheme('Halloween', 'white', 'orange', 'green', 'purple', 'black' )}
];

var SkyBoxThemes = [
    {name: "alien", path: "alien/alien"},
    {name: "blood_sport", path: "blood_sport/blood_sport" },
    {name: "calm",path: "calm/calm"},
    {name: "canyon",path: "canyon/canyon"},
    {name:"moon", path: "moon/moon"},
    {name: "space2",path: "space2/space2"},
    {name: "tron",path: "tron/tron"}
];


var GroundThemes = [
    {name: "gplay", filename: "gplay-1920x1080.png"},
    {name: "grid-me", filename: "grid-me-1920x1080.png"},
    {name: "subtle-grey", filename: "subtle-grey-1920x1080.png"},
];