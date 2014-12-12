var pause = 0;
var play = 1;
var rewind = -1;
var GraphState = function() {
	this.currentState;
	this.playState = 1;
	this.pauseState = 0;
	this.rewindState = -1;
};

GraphState.prototype = {

	setPlayState: function(){
		this.currentState = this.playState;
	},
	setPauseState: function(){
		this.currentState = this.pauseState;
	},
	setRewindState: function(){
		this.currentState = this.rewindState;
	},
	getState: function(){
		switch(currentState){
		case this.playState:
				return "play";
		case this.pauseState:
				return "pause";
		case this.rewind:
				return "rewind";
		}
	}

};