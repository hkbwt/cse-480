//Node Object Test Cases
//assert statements Tests
function assertTrue(x){
	return (x)
}
function assertEqual(x, y){
	var i = 0;
	do{
		if(x[i] != y[i])
		{
			return false;
		}
		i= i +1;
	}while(x.length > i)
	return true;
}
function assertNotEqual(x, y){
	var i = 0;
	do{
		if(x[i] != y[i])
		{
			return true;
		}
		i= i +1;
	}while(x.length > i)
	return false;
}

NodeTest = function(){
	var n = new NodeObject();
	n.setXLocation(10);
	n.setYLocation(11);
	n.setZLocation(12);
	alert(assertEqual(n.getXlocation(), 10));
	alert(assertEqual(n.getYLocation(), 11));
	alert(assertEqual(n.getZLocation(), 12));
	alert(assertEqual(n.getLocation(), new Array(10, 11, 12)));
	alert(assertNotEqual(n.getLocation(), new Array(11, 11, 12)));
}

