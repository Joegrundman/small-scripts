var dataset = require('./dataset')

function processData(input) {
	var splitInput = input.split('\n')
	var queries = splitInput.slice(1)
	var numCommunities = splitInput[0].split(' ')[0]
	var network = {}
    
    // create network object. Initially each network node is in its own community with size 1 and references
    // to each other node in its community (initially itself only)
	for (var i = 1; i <= numCommunities; i++) {
		i = '' + i
        var community = new Set()
        community.add(i)  
        network[i] = {community: community}
	}

	function merge(a, b) {
        //check whether community references are the same, if so do early return
		if(network[a].community == network[b].community) { return }
        
        //more efficient to merge the smaller community into the large community, so find which is smaller and mark as toMove
        var toMove, toMerge
		if(network[a].community.size < network[b].community.size) {
            toMove = network[a]
            toMerge = network[b]
        } else {
            toMove = network[b]
            toMerge = network[a]         
        }
        // add community sizes together
		// toMerge.community.size += toMove.community.size

        for (var item of toMove.community) {
            // add each member of toMove to the toMerge community
            toMerge.community.add(item)
            // assign reference to the merged community to each member of toMove
            network[item].community = toMerge.community 			
        }
		
	}
	
	function query(id) {
		console.log(network[id].community.size)
	}
	
	queries.forEach(q => {
		q = q.split(' ')
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
processData(dataset)
//console.assert(result == 225432, "does not give correct result")
//console.timeEnd('aaa')
