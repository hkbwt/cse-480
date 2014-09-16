Node = function(){
	this.xloc;
	this.yloc;
	this.zloc;
	this.radius;
	this.rings;
	this.text;
}

Node.prototype = {
	setXLocation : function(x){
		this.xloc = x;
	},

	setYLocation : function(y){
		this.yloc = y;
	},
	setZLocation : function(z){
		this.zloc = z;
	},
	setLocation : function (x,y,z){
		this.xloc = x;
		this.yloc = y;
		this.zloc = z;
	},
	setRadius : function(r){
		if(r > 0)
		{
			this.radius = r;
		}
		else{ r = 0;}
	},
	getRadius : function(){return this.radius;},
	getXlocation : function(){return this.xloc;},
	getYLocation : function(){return this.yloc;},
	getZLocation : function(){return this.zloc;},
	getLocation : function (){return {this.xloc,
					this.yloc,
					this.zloc};}
};

Node.createNode.prototype