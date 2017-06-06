class BinaryTree {
	constructor(){}
}

class BinaryTreeNode extends BinaryTree {
	constructor(value, left, right){
		super()
		this.value = value
		this.left = left
		this.right = right
		Object.freeze(this)
	}
	
	count () {
		return this.left.count() + this.right.count() + 1
	}
	
	depth () {
		return Math.max(this.left.depth(), this.right.depth()) + 1
	}
	
	isEmpty () {
		return false
	}
	
	inorder (fn) { 
		if (this.isEmpty()) { return }
		this.left.inorder(fn)
		fn(this.value)
		this.right.inorder(fn)
	}
	
	preorder (fn) {
		if(this.isEmpty()) return
		fn(this.value)
		this.left.preorder(fn)
		this.right.preorder(fn)
	}

	postorder (fn) {    
		if (this.isEmpty()) { return }
		this.left.postorder( fn)
		this.right.postorder(fn)
		fn(this.value)
	}
	
	contains (x) {
		if (this.value == x) return true
		return this.value > x ? this.left.contains(x) : this.right.contains(x)
	}
	
	insert (x) {
		return x < this.value ?
		    new BinaryTreeNode(this.value, this.left.insert(x), this.right) :
		    new BinaryTreeNode(this.value, this.left, this.right.insert(x))
	}

	insertElement (el) {
		if(this.value < el.value) {
			if(!this.left || this.left.isEmpty()) {
				return new BinaryTreeNode(this.value, el, this.right)
				} else {
					return new BinaryTreeNode(this.value, this.left.insertElement(el), this.right)
				}		
		} else {
			if(!this.right || this.right.isEmpty()){
				return new BinaryTreeNode(this.value, this.left, el)
			} else {
				return new BinaryTreeNode(this.value, this.left, this.right.insertElement(el))
			}
		}
	}
	

	remove (x, last) { 
		   if(!this.contains(x)) return this
		if(x == this.value) { 
		  if((!this.left || this.left.isEmpty()) && (!this.right || this.right.isEmpty())) { 
			  return new EmptyBinaryTree()
			  
		  } else if (!this.left || this.left.isEmpty()) {
			  return new BinaryTreeNode(this.right.value, this.right.left, this.right.right)
			  
		  } else if (!this.right || this.right.isEmpty()) {
			  return new BinaryTreeNode(this.left.value, this.left.left, this.left.right)
			  
		  } else {
		return this.left.insertElement(this.right)
		  }
		} else if (x < this.value) { 
			return new BinaryTreeNode(this.value, this.left.remove(x), this.right)
		}  else {
			return new BinaryTreeNode (this.value, this.left, this.right.remove(x))
		}
	 }
 
	print (target) {
		var _this = this
		function printPreorder(){
			let printNodes = []
			_this.preorder(a => printNodes.push(a))
			console.log('preordered nodes', printNodes.join(', '))
		}
		switch(target) {
			case 'depth': console.log('depth', this.depth()); break;
			case 'size': console.log('size', this.count()); break;
			case 'preorder': printPreorder(); break;
			default: break;
		}
	}

}

class EmptyBinaryTree extends BinaryTree {
	isEmpty () { return true }
	depth () { return 0	};
	count () { return 0 };
	inorder (fn) { return };
	preorder (fn) { return };
	postorder (fn) { return };
	contains (x) { return false };
	insert (x) { return new BinaryTreeNode(x, this, this) };
	remove (x) { return };
}

var mt, tree
tree = new EmptyBinaryTree()
var data = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15]
data.forEach(d => tree = tree.insert(d))

tree.print('preorder')
tree.print('size')
tree.print('depth')
console.log('contains 4 => true: ', tree.contains(4))
console.log('contains 16 => false: ', tree.contains(16))
console.log('remove 8')
var after = tree.remove(8)
console.log('contains 8 => false: ', after.contains(8))
after.print('preorder')
after.print('size')
after.print('depth')