var algoArea = function(algoID){
	this.algoID = algoID;
	thisObject = this;
}

algoArea.prototype = {
	createArea: function(){
		$(thisObject.algoID).linedtextarea();
	},
	selectLine: function(lineNum){
		lineNum--;
		var lines = thisObject.algoID.value.split("\n");
		
		var startPos = 0, endPos = thisObject.algoID.value.length;
		for(var x = 0; x < lines.length; x++){
			if(x == lineNum){
				break;
			}
			startPos += (lines[x].length+1);
		}
		endPos = lines[lineNum].length+ startPos;
		
		if(typeof(thisObject.algoID.selectionStart) != "undefined") {
		thisObject.algoID.focus();
		thisObject.algoID.selectionStart = startPos;
		thisObject.algoID.selectionEnd = endPos;
		return true;
		}
		else{
			return false;
		}

	},
	setText: function(text){
		$(thisObject.algoID).val(text); 
	}
}