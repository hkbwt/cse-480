
NodeObject = function(){
	this.xloc =0;
	this.yloc =0;
	this.zloc =0;
}

NodeObject.prototype = {
	setXLocation: function(x){
		this.xloc = x;
	},

	setYLocation: function(y){
		this.yloc = y;
	},
	setZLocation: function(z){
		this.zloc = z;
	},
	setLocation: function (x,y,z){
		this.xloc = x;
		this.yloc = y;
		this.zloc = z;
	},
	getXlocation: function(){return this.xloc;},
	getYLocation: function(){return this.yloc;},
	getZLocation: function(){return this.zloc;},
	getLocation: function (){return new Array( 
					this.xloc,
					this.yloc,
					this.zloc);}
};
