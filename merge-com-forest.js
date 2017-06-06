var dataset = require('./dataset')

function processData(input) {
	
	// using forest of trees and path compression
	
	var splitInput = input.split('\n')
	var queries = splitInput.slice(1)
	var numCommunities = splitInput[0].split(' ')[0]
	
	// the network is an array. Negative numbers mean it is root of true, 
	// and abs value is size of tree
	// positive values indicate the address of the parent
	var network = new Array(parseInt(numCommunities, 10))
    network.fill(-1)

	function merge(a, b) {

		var toMove, toMerge, networkA, networkB
		networkA = a
		networkB = b
		
		// find the root of the current merging communities
		while (network[networkA] > -1) {
			networkA = network[networkA]
		}
		while (network[networkB] > -1) {
			networkB = network[networkB]
		}
		// merge smaller into bigger (maybe not necessary with this)	
		if(networkA > networkB) {
            toMove = networkA
            toMerge = networkB
        } else {
            toMove = networkB
            toMerge = networkA       
        } 
		// early return if at same root
		if(networkA == networkB) {
			return
		}
		// increase the root size by the size of the merging element
		network[toMerge] += network[toMove]
		// set the merging element to indicate the root address
		network[toMove] = toMerge	

	}
	
	function query(id) {
		//find root
		var current = id
		while(network[current] > -1) {
			current = network[current]
		}
		// compress the tree by linking the element directly to the root
		// to speed up subsequent searches
		if (network[id] != network[current]){
			network[id] = current
		}
		
		console.log(Math.abs(network[current]))
	}
	
	queries.forEach(q => {
		q = q.split(' ').map((el, i) => i > 0 ? parseInt(el, 10) - 1 : el)
		switch(q[0]) {
			case 'M': merge(q[1], q[2]); break;
			case 'Q': query(q[1]); break;
			default: break;
		}
	})
} 


var sample = '3 6\nQ 1\nM 1 2\nQ 2\nM 2 3\nQ 3\nM 2 3\nQ 2'


//console.time('aaa')
processData(sample)
//processData(sample2)
processData(dataset)
//console.assert(result == 225432, "does not give correct result")
//console.timeEnd('aaa')
