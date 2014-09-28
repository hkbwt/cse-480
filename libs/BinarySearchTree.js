var TreeNode = function (info, left, right) {
	this.info = info;
	this.left = left;
	this.right = right;
	//store ThreeNode Elemet
}

var BinarySearchTree = function(root) {
	this.size = this.height = 0;
	this.root = new TreeNode(root);
	this.currentNode;
	
}
BinarySearchTree.prototype = {
 setInfo: function (info){
	
 },
 getInfo: function (){
	return TreeNode.info;
 },
 setRight: function(right){
 	 this.currentNode.right = new TreeNode(right);
 },
 setLeft: function(left){
 	 this.currentNode.left = new TreeNode(left);
 },
 contains: function(value){
 	 var bst = this;
 	 var n = this.root;
 	 this.currentNode = this.root;
 	 while(typeof(n) != 'undefined'){
 	 	 alert(n.info);
 	 	 if(n.info == value){
 	 	 	 return true;
 	 	 }
 	 	 else if (n.info > value){
 	 	 	 n = bst.getLeft();
 	 	 	 this.currentNode = bst.getLeft();
 	 	 }
 	 	 else{
 	 	 	 n = bst.getRight();
 	 	 	 this.currentNode = bst.getRight();
 	 	 }
 	 }
 	 return false;
 },
getLeft: function(){
	return this.currentNode.left;
},
getRight: function(){
	return this.currentNode.right;
},
 recSize: function(root){
 	 var bst = this;
 	 if (bst.getLeft() == null && bst.getRight() == null){
 	 	 return 1;
 	 }
 	 else
 	 {
 	 	 return recSize(bst.getLeft()) + recSize(bst.getRight()) + 1;
 	 }
 	 
},
add: function(value){
 	 var bst = this;
 	 if(typeof(this.root.info) == 'undefined'){
		this.root = new TreeNode(value);
		this.currentNode = this.root;
	}
 	 else{
 	 	 this.currentNode = this.root;
 	 	 var n = this.root;
		while(typeof(n) != 'undefined'){
			if(n == value){
				break;
			}
			else if (n.info > value){
				if(typeof(n.left) == 'undefined'){
					bst.setLeft(value);
					break;
				}
				else{ n = bst.getLeft();this.currentNode = bst.getLeft();}
			}
			else{
				if(typeof(n.right) == 'undefined'){
					bst.setRight(value);
					break;
				}
				else{n = bst.getRight();this.currentNode = bst.getRight();}
			}
		}
	}
	this.currentNode = this.root;
 },
 inorder: function(root){
 	 bst= this;
 	 bst.beginInorderTraversal(this.currentNode = this.root);
},
beginInorderTraversal: function(root){
	 var bst= this;
	 if (typeof(root.left) != 'undefined') 
 	 	bst.beginInorderTraversal(root.left);
 	 console.log(root.info);
 	 if (typeof(root.right) != 'undefined') 
 	 	 bst.beginInorderTraversal(root.right);
},
 preOrder: function(){
 	 bst = this;
 	 bst.beginPreOrderTraversal(this.currentNode = this.root);
 },
 beginPreOrderTraversal: function(root){
 	 var bst= this;
	 if (typeof(root) == 'undefined'){
	 	 return;
	 }
	 console.log(root.info);
	 bst.beginPreOrderTraversal(root.left);
	 bst.beginPreOrderTraversal(root.right);
 },
 postOrder: function(){
 	 bst = this;
 	 bst.beginPostOrderTraversal(this.currentNode = this.root); 
 },
 beginPostOrderTraversal: function(root){
  if (typeof(root) == 'undefined'){return}
  	bst.beginPostOrderTraversal(root.left)
  	bst.beginPostOrderTraversal(root.right)
  	console.log(root.info);
 },
 reset: function(){
 	 this.root = new TreeNode();
 }
}