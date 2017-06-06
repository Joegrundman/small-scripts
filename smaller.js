const smaller1 = arr =>  arr.map((el, i, arr) => arr.slice(i).filter(n => n <el).length)

const smaller2 = arr => {
	const memo = {}
	
	return arr.reduceRight((map, n, i, arr) =>{		
		if(memo.hasOwnProperty(n)) {
			memo[n] ++
		} else {
			memo[n] = 1
		}
		var total = Object.keys(memo).filter(key => key < n).reduce((acc, key) => acc + memo[key], 0)
		map[i] = total
		return map
	}, new Array(arr.length))
}

const smaller3 = arr => {
	var max = 0
	var min = 1000	
	arr.forEach(v => {
		if (v > max) {max = v}
		if (v < min) { min = v}
	})

	const memo = new Array((max - min) + 1).fill(0)
	
	return arr.reduceRight((map, n, i, arr) => {
		n = parseInt(n) - min
		memo[n]++
		var total = memo.slice(0, n).reduce((a,b) => a + b, 0)
		map[i] = total
		return map
	}, new Array(arr.length))
}

const smaller4 = arr => {

	const memo = {}
		
	return arr.reduceRight((map, n, i, arr) => {	
		
		if(memo.hasOwnProperty(n)) {
			memo[n] ++
		} else {
			memo[n] = 1
		}
		var total = 0		
		for(key in memo) {
			if (parseInt(key) < n) {total += memo[key] }
		}

		map[i] = total
		return map
	}, new Array(arr.length))	
}

const smaller5 = arr => {
	var max = arr[0]
	var min = arr[0]
	let memo = [0]	
	return arr.reduceRight((map, n, i) => {
		if (n > max) {
			memo.push(...new Array(n - max).fill(0))
			max = n
		}
		if (n < min) {
			memo.unshift(...new Array(min - n).fill(0))
			min = n
		}
		n = parseInt(n) - min
		memo[n]++

		var total = 0
		for (var j = 0; j < n; j++ ){
			total += memo[j] || 0
		}

		map[i] = total
		return map
	}, new Array(arr.length))
}

const smaller6 = arr => {
	var max = 0
	var min = 1000	
	
	arr.forEach(v => {
		if (v > max) {max = v}
		if (v < min) { min = v}
	})

	const memo = new Array((max - min) + 1).fill(0)
	
	return arr.reduceRight((map, n, i, arr) => {
		n = n - min
		memo[n]++
		
		var total = 0
		for (var j = 0; j < n; j++ ){
			total += memo[j] || 0
		}
		map[i] = total
		return map
	}, arr)
}

const smaller7 = arr => {
	var max = arr[0]
	var min = arr[0]
	var memo = [0]

	for (var i = arr.length - 1; i >= 0; i--) {		
		var n = arr[i]
		if (n > max) {
			for(var ii = 0; ii < n - max; ii++) {
				memo.push(0)
			}
			max = n
		}
		if (n < min) {
			for(var iii = 0; iii < min - n; iii++){
			memo.unshift(0)
			}
			min = n
		}
		n = parseInt(n) - min
		memo[n]++

		var total = 0
		for (var j = 0; j < n; j++ ){
			total += memo[j] 
		}
		arr[i] = total
	}
	i = null
	ii = null
	iii = null
	memo = null
	total = null
	j = null
	min = null
	max = null
	n = null
	return arr
}

const smaller8 = arr => {
	var max = 0
	var min = 1000
	for(var l = 0; l < arr.length; l++) {
	 if(arr[l] > max) max = arr[l]
	 if(arr[l] < min) min = arr[l]
	}
	var memo = new Array(max - min + 1).fill(0)
	for (var i = arr.length - 1; i >= 0; i--) {		
		var n = arr[i] - min
		memo[n]++

		var total = 0
		for (var j = 0; j < n; j++ ){
			total += memo[j] 
		}

		arr[i] = total
	}
	return arr
}

const smaller9 = arr => {
	function BinaryTree(){}
function Empty (){}
	function Node (value, left, right, count = 1) {
		this.value = value
		this.left = left
		this.right = right
		this.count = count
		this.red = true
	}
	Node.prototype = new BinaryTree()
	Node.prototype.constructor = Node
	Empty.prototype = new BinaryTree()
	Empty.prototype.constructor = Empty
	
	Node.prototype.increment = function(value) {
		if(this.value == value) {this.count ++; return true}	
		return this.value > value ? this.left.increment(value): this.right.increment(value)		
	}
	
	Node.prototype.insert = function(val){
		return val < this.value ?
		  new Node(this.value, this.left.insert(val), this.right, this.count) :
		  new Node(this.value, this.left, this.right.insert(val), this.count)
	}
	
	Node.prototype.sum = function (value) {
		var res = this.value < value ? this.count : 0
		return this.left.sum(value) + this.right.sum(value) + res
	}
	
	Empty.prototype.insert = function(x) { return new Node(x, this, this) }
	Empty.prototype.increment = function() { return false }
	Empty.prototype.sum = function() {return 0}
	var memo = new Empty()
	
	for (var i = arr.length - 1; i >= 0; i--) {	
		var n = arr[i]
		if(!memo.increment(n)){
			memo = memo.insert(n)
		}
		arr[i] = memo.sum(n)
	}
	return arr
}

const smaller10 = arr => {
	function BinaryTree(){
		this.root = null
	}

	function Node (val, count = 1 ) {
		this.val = val
		this.left = null
		this.right = null
		this.count = count
		//this.red = true
	}

	
	BinaryTree.prototype.push = function(val){
		var root = this.root
		if(!root){
			this.root = new Node(val)
			return
		}
		
		var currentNode = root
		var newNode = new Node(val)
		while(currentNode) {
			if(val < currentNode.val) {
				if(!currentNode.left) {
					currentNode.left = newNode
					break
				}
				else {
					currentNode = currentNode.left
				}
			}
			else {
				if(!currentNode.right) {
					currentNode.right = newNode
					break
				} 
				else {
					currentNode =currentNode.right
				}
			}
		}
	}	
	
	BinaryTree.prototype.increment = function(val) {
		var root = this.root
		if(!root) return false
		var node = root
		
		while(node) {
			if(node.val == val) {
				node.count ++
				return true
			} 
			
			if(val < node.val) {
					if(!node.left) {
						currentNode.left = newNode
						break
					}
					else {
						node = node.left
					}
				}
				else {
					if(!currentNode.right) {
						currentNode.right = newNode
						break
					} 
					else {
						currentNode =currentNode.right
					}
				}
		    }
	}
	Node.prototype.increment = function(value) {
		if(this.value == value) {this.count ++; return true}	
		return this.value > value ? this.left.increment(value): this.right.increment(value)		
	}
	
	Node.prototype.insert = function(val){
		return val < this.value ?
		  new Node(this.value, this.left.insert(val), this.right, this.count) :
		  new Node(this.value, this.left, this.right.insert(val), this.count)
	}
	
	Node.prototype.sum = function (value) {
		var res = this.value < value ? this.count : 0
		return this.left.sum(value) + this.right.sum(value) + res
	}
	
	var memo = new Empty()
	
	for (var i = arr.length - 1; i >= 0; i--) {	
		var n = arr[i]
		if(!memo.increment(n)){
			memo = memo.insert(n)
		}
		arr[i] = memo.sum(n)
	}
	return arr
}



var start = Date.now()
const smaller = smaller7

console.assert(JSON.stringify(smaller([6])) == JSON.stringify([0]), "1: [6] => [0] Does not match", JSON.stringify(smaller([6])))
console.assert(JSON.stringify(smaller([7, 6])) == JSON.stringify([1, 0]), "2: [7, 6] => [1, 0] Does not match", JSON.stringify(smaller([7, 6])))
console.assert(JSON.stringify(smaller([7, 6, 5])) == JSON.stringify([2, 1, 0]), "3 : [7, 6, 5] => [2, 1, 0] Does not match:", JSON.stringify(smaller([7, 6, 5])))
console.assert(JSON.stringify(smaller([4, 7, 6, 5])) == JSON.stringify([0, 2, 1, 0]), "4 Does not match")
console.assert(JSON.stringify(smaller([1, 1, -1, 0, 0])) == JSON.stringify([3, 3, 0, 0, 0]), "5: [1, 1, -1, 0, 0] => [3, 3, 0, 0, 0] Does not match", JSON.stringify(smaller([1, 1, -1, 0, 0])))
console.assert(JSON.stringify(smaller([5, 4, 7, 6, 5])) == JSON.stringify([1, 0, 2, 1, 0]), "6 Does not match")
console.assert(JSON.stringify(smaller([7, 5, 4, 7, 6, 5])) == JSON.stringify([4, 1, 0, 2, 1, 0]), "7 Does not match")
console.assert(JSON.stringify(smaller([5, 4, 7, 9, 2, 4, 4, 5, 6])) == JSON.stringify([4, 1, 5, 5, 0, 0, 0, 0, 0]), "8 Does not match")

var longArray = (la) => {
	for(var i = 0; i < 100000; i++){
		la[i] = Math.floor(Math.random() * 1000 - 500)
	}
	return la
}

var seriousTest = (stop) => {
	var counter = 0
	var array = new Array(100000)
	while(counter < stop) {
		array = longArray(array)
		smaller(array)
		console.log(counter)
		counter++
	}
	
}

seriousTest(100)
//var res = smaller(longArray()).reduce((a, b) => a + b)
//console.log(res)
// var res = smaller(longArray).reduce((a, b) => a + b) == smaller2(longArray).reduce((a,b) => a + b)
// console.assert(res == true, 'failed equality')
console.log('timetaken', Date.now() - start, "ms")

// var longTotal = smaller1(longArray).reduce((a, b) => a + b)
// console.log('long total', longTotal)
// var longTotal2 = smaller2(longArray).reduce((a, b) => a + b)
// console.log('long total2', longTotal2)
console.log('all tests passed')

