function BinaryTree (){}

function BinaryTreeNode(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
  Object.freeze(this);
}

BinaryTreeNode.prototype = new BinaryTree();
BinaryTreeNode.prototype.constructor = BinaryTreeNode;
BinaryTreeNode.prototype.isEmpty = function() { 
  return false
};
// BinaryTreeNode.prototype.depth = function() { 
    // var node = this  
    // var counter = getDepth(node, 0);

	// function getDepth(tree, counter) {
		// if(!tree || tree.isEmpty()) return counter
		// var leftDepth = tree.left ? getDepth(tree.left, counter + 1) : counter
		// var rightDepth = tree.right ? getDepth(tree.right, counter + 1): counter
		// return Math.max(leftDepth, rightDepth)
	// }
	
	// return counter

 // };
 
 // BinaryTreeNode.prototype.depth = function(counter) {
	 // if(!counter) counter = 0
	 // console.log('counter', counter)
	 // var leftDepth = counter, rightDepth = counter
	// if(this.left) {
		// leftDepth = this.left.depth(counter + 1)
	// }
	// if(this.right) {
		// rightDepth = this.right.depth(counter + 1)
	// }
	// return leftDepth > rightDepth ? leftDepth : rightDepth
  // }
 
 BinaryTreeNode.prototype.depth = function () {
	 return Math.max(this.left.depth(), this.right.depth()) + 1
 } // ?
 
 BinaryTreeNode.prototype.depthTo = function(el) {
	if(!this.contains(el)){ return 0 }
	var counter = 1
	var done = false
	var node = this
	while (!done) {
		if(!node) {return 'undef'}
		else if(node.value == el) {
			done = true
		} else if (node.value > el) {
			node = node.left
			counter++
		} else {
			node = node.right
			counter++
		}
	}
	return counter
 }
 

// BinaryTreeNode.prototype.count = function() { 
	// var nodes = []
	// this.inorder(x => nodes.push(x))
	// return nodes.length
// }

BinaryTreeNode.prototype.count = function() { 
	return this.left.count() + this.right.count() + 1
} // ?

BinaryTreeNode.prototype.inorder = function(fn) { 
    process(this, fn)
    function process(node, fn) {
      if (node.isEmpty()) { return }
      process(node.left, fn)
      fn(node.value)
      process(node.right, fn)
    }
}

BinaryTreeNode.prototype.preorder = function(fn) { 
    process(this, fn)
    function process(node, fn) {
      if (node.isEmpty()) { return }
      fn(node.value)
      process(node.left, fn)
      process(node.right, fn)
  }
}

BinaryTreeNode.prototype.postorder = function(fn) {    
    process(this, fn)
    function process(node, fn) {
      if (node.isEmpty()) { return }
      process(node.left, fn)
      process(node.right, fn)
      fn(node.value)
  }
}

BinaryTreeNode.prototype.contains = function(x) { 
    var res = false;
    var x = x
    process(this)
    function process(node) {
        if (node.isEmpty()) { return }
        if (node.value == x) { res = true; return } 
		return x < node.value ? process(node.left) : process(node.right)
     }
     return res
};

BinaryTreeNode.prototype.insert = function(x) {
    return x < this.value ?
      new BinaryTreeNode(this.value, this.left.insert(x), this.right) :
      new BinaryTreeNode(this.value, this.left, this.right.insert(x))
}

BinaryTreeNode.prototype.insertElement = function(el) {
	console.log('inserting element of val', el.value)
	if(el.value > this.value) {
		if(this.right.isEmpty()) {
			return new BinaryTreeNode(this.value, this.left, el)
		} else {
			return new BinaryTreeNode(this.value, this.left, this.right.insertElement(el))
		}
	} else {
		if(this.left.isEmpty()){
			return new BinaryTreeNode(this.value, el, this.right)
		} else {
			return new BinaryTreeNode(this.value, this.left.insertElement(el), this.right)
		}
	}
}

BinaryTreeNode.prototype.remove = function(x) { 

  var nodes = []
  this.preorder(a => nodes.push(a))
	console.log("nodes:",nodes.join(" "))
    if(!this.contains(x)) return this
	
    if(x == this.value) { 
	console.log('x =',x)
      if(this.left.isEmpty() && this.right.isEmpty()) { 
	console.log('return empty tree')
          return null
		  
      } else if (this.left.isEmpty()) {
	console.log('left empty')
          return new BinaryTreeNode(this.right.value, this.right.left, this.right.right)
		  
      } else if (this.right.isEmpty()) {
	console.log('right empty')
          return new BinaryTreeNode(this.left.value, this.left.left, this.left.right)
		  
      } else {
	console.log('both full')
	return this.left.insertElement(this.right)
      }
    } else if (x < this.value) { 
        return new BinaryTreeNode(this.value, this.left.remove(x), this.right)
    }  else {
        return new BinaryTreeNode (this.value, this.left, this.right.remove(x))
    }
 }
 
 BinaryTreeNode.prototype.print = function(target) {
	var _this = this
	function printPreorder(){
		let printNodes = []
		_this.preorder(a => {
			let nodedata = []
			nodedata.push(a)
			nodedata.push(_this.depthTo(a))
			printNodes.push(nodedata.join(':'))
			})
		console.log('preordered nodes', printNodes.join(' -- '))
	}
	switch(target) {
		case 'depth': console.log('depth', this.depth()); break;
		case 'size': console.log('size', this.count()); break;
		case 'preorder': printPreorder(); break;
		default: break;
	}
}

////////////////////////////////////////////////////////////////////////
function EmptyBinaryTree() { 
  //Object.freeze(this); 
}
EmptyBinaryTree.prototype = new BinaryTree();
EmptyBinaryTree.prototype.constructor = EmptyBinaryTree;
EmptyBinaryTree.prototype.isEmpty = function() { 
    return true
 };
EmptyBinaryTree.prototype.depth = function() {
    return 0
 };
EmptyBinaryTree.prototype.count = function() { return 0 };
EmptyBinaryTree.prototype.inorder = function(fn) { return };
EmptyBinaryTree.prototype.preorder = function(fn) { return };
EmptyBinaryTree.prototype.postorder = function(fn) { return };
EmptyBinaryTree.prototype.contains = function(x) { return false };
EmptyBinaryTree.prototype.insert = function(x) { 
    return new BinaryTreeNode(x, this, this)
 };
EmptyBinaryTree.prototype.remove = function(x) { return };

var mt, tree
tree = new EmptyBinaryTree()
var data = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15]
data.forEach(d => tree = tree.insert(d))

console.log('=========== START =========')
tree.print('preorder')
tree.print('size')
tree.print('depth')
console.log('treecontains 6', tree.contains(6))
console.log('========== REMOVE 8 =========')
var after = tree.remove(8)
after.print('preorder')
after.print('size')
after.print('depth')
console.log('======== REMOVE 6===========')
var after2 = tree.remove(6)
after2.print('preorder')
after2.print('size')
after2.print('depth')

