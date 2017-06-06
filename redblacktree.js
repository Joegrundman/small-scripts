//red black tree

var Node = function (value, left, right) {
	this.value = value
	this.left = left
	this.right = right
	this.data = 1
	this.red = true
}

Node.prototype.find = function(value) {
	if(this.value == value) {
		return this.data
	}
	return value < this.value ? this.left.find(value) : this.right.find(value)
}

Node.prototype.increment = function(value) {
	if(this.value == value) {
		this.data ++
	}
	return value < this.value ? this.left.increment(value) : this.right.increment(value)
}

Node.prototype.setColor = function(value, isRed) {
	if(this.value == value) {
		this.color = isRed
	}
	return value < this.value ? this.left.setColo(value, isRed) : this.right.setColor(value, isRed)
}

Node.prototype.insert = function(node){
	return node.value < this.value ? this.left.insert(node) : this.right.insert(node)
}

Node.prototype.rotateRight = function(node) {
	
}

Node.prototype.rotateLeft = function(node) {
	
}