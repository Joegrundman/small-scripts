function processData(input) {
	
	// using disjoint union data structure to find if two nodes are in the same set
	
	// create network Sets. At start each node is in set of itself
	var netSets = {}
	var nodes = parseInt(input.split('\n')[0].split(' ')[0], 10)
	for (let i = 1; i <= nodes; i++) {
		netSets[i] = new Set().add("" + i)
	}

	// create network links and weights structure from the input
    var graph = input.split('\n').slice(1).map(line => line.split(' ').map((chr, i) => {
			if(i == 2) chr = parseInt(chr, 10)
			return chr
		}))
		
	
	// merging to disjoint sets into one using quickfind algorithm	
	var unionSets = function(a, b) {
		if(netSets[a] == netSets[b]) { return }
		
		var toMove, toMerge
		if(netSets[a].size < netSets[b].size) {
            toMove = netSets[a]
            toMerge = netSets[b]
        } else {
            toMove = netSets[b]
            toMerge = netSets[a]         
        }
		
	    for (var item of toMove) {
            toMerge.add(item)
            netSets[item] = toMerge			
        }
	} 
	
	// tests if both are in set
	var isInSameSet = function(a, b) {
		return netSets[a] === netSets[b]
	}

	// Kruskal's algorithm calls for sorting the graph in order of weighting, 
	// and a means of sorting if weighting is equal by adding the node values too
	// if still equal, it doesn't matter which goes first
    var sortedGraph = graph.sort((a, b) => {
        if (a[2] < b[2]) return -1
		else if(a[2] == b[2]) {
			var totalA = a.map(chr => parseInt(chr, 10)).reduce((tot, cur) => tot + cur)
			var totalB = b.map(chr => parseInt(chr, 10)).reduce((tot, cur) => tot + cur)
			if (totalA <= totalB) return -1
			else return 1
		}
        else return 1
    })

	// go through the sorted graph. If in same set, ignore, otherwise add the 
	// weight to total, then merge the sets
    var totalWeight = 0
	
    sortedGraph.forEach(line => {
        if(isInSameSet(line[0], line[1])) { return }
        totalWeight += line[2]
		unionSets(line[0], line[1])
    })
    console.log(totalWeight)
} 




var data =`4 6
1 2 5
1 3 3
4 1 6
2 4 7
3 2 4
3 4 5`

processData(data)

var data2 = `4 5
1 2 1
3 2 150
4 3 99
1 4 100
3 1 200`

processData(data2)

var dataset = require('./kruskal-dataset')

processData(dataset) // expect result to be 49950000