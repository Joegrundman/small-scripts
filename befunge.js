
function interpret(code) {
	const matrix = code.split('\n').map(line => line.split(""))
	const height = matrix.length
	var pointer = [0, 0]
	let stack = []
	let output = ""
	let dir = ""
	let stringMode = false
	
	const moveRight = ptr =>  [ptr[0], (ptr[1] + 1) % matrix[ptr[0]].length]
	const moveDown = ptr => [(ptr[0] + 1) % height, ptr[1]]
	const moveLeft = ptr => [ptr[0], (ptr[1] + matrix[ptr[0]].length -1) % matrix[ptr[0]].length]
	const moveUp = ptr => [(ptr[0] + height -1) % height, ptr[1]]
	const moveRandom = () => {
		var num = Math.floor(Math.random() * 4)
		switch(num) {
			case 0: dir = '>'; break;
			case 1: dir = 'v'; break;
			case 2: dir = '<'; break;
			case 3: dir = '^'; break;
			default: break;
		}
	}	
	const move = (ptr) => {
		switch(dir) {
			case '>': ptr = moveRight(ptr); break;
			case 'v': ptr = moveDown(ptr); break;
			case '<': ptr = moveLeft(ptr); break;
			case '^': ptr = moveUp(ptr); break;
			default:  ptr = moveRight(ptr); break;
		}
		return ptr
	}
	
	const math = (op) => {
		var a = stack.pop() || 0
		var b = stack.pop() || 0
		switch(op) {
			case 'add': stack.push(a + b); break;
			case 'subtract': stack.push(b - a); break;
			case 'multiply': stack.push(a * b); break;
			case 'divide': stack.push(Math.floor(b / a)); break;
			case 'modulo': stack.push(b % a); break;
			case 'gtThan': b > a ? stack.push(1) : stack.push(0); break;
			case 'swap': stack.push(a, b); break;
			default: break;
		}
	}
	const single = (op) => {
		const num = stack.pop() || 0
		switch(op) {
			case 'not': num == 0 ? stack.push(1) : stack.push(0); break;
			case 'leftOrRight': num == 0 ? dir = '>' : dir = '<'; break;
			case 'upOrDown': num == 0 ? dir = 'v' : dir = '^'; break;
			case 'outputInt': output += num; break;
			case 'outputChar': output += String.fromCharCode(num); break; 
			case 'discard': break;
			default: break;
		}
	}

	const duplicate = () => {
		var lastVal = stack.length ? stack[stack.length - 1] : 0
		stack.push(lastVal)
	}
	
	const put = () => {
		var y = stack.pop()
		var x = stack.pop()
		var v = stack.pop()
		matrix[y][x] = String.fromCharCode(v)
	}
	
	const get = () => {
		var y = stack.pop()
		var x = stack.pop()
		var v = matrix[y][x].charCodeAt(0)
		stack.push(v)
	}

	let running = true
	
	while (running){
		var el = matrix[pointer[0]][pointer[1]]
		if (stringMode) {
			if (el == '"') {
				stringMode = false
			} else {
				stack.push(el.charCodeAt(0))
			}
		} else {
			switch(el) {
				case '>': dir = '>'; break;
				case 'v': dir = 'v'; break;
				case '<': dir = '<'; break;
				case '^': dir = '^'; break;
				case '?': moveRandom(); break;
				case '+': math('add'); break;
				case '-': math('subtract'); break;
				case '*': math('multiply'); break;
				case '/': math('divide'); break;
				case '%': math('modulo'); break;
				case '!': single('not'); break;
				case '`': math('gtThan'); break;
				case '_': single('leftOrRight'); break;
				case '|': single('upOrDown'); break;
				case '"': stringMode = true; break;
				case ':': duplicate(); break;
				case '\\': math('swap'); break;
				case '$': single('discard'); break;
				case '.': single('outputInt'); break;
				case ',': single('outputChar'); break;
				case '#': pointer = move(pointer); break;
				case 'p': put(); break;
				case 'g': get(); break;
				case ' ': break;
				case '@': running = false; break;
				default: stack.push(parseInt(el)); break;
			}
		}
		pointer = move(pointer)
	}

	return output
}
console.log('finished', interpret('01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@'))
//console.log('finished!', interpret('>987v>.v\nv456<  :\n>321 ^ _@'))
//console.log('finished!', interpret("08>:1-:v v *_$.@\n  ^    _$>\\:^  "))
//console.assert(interpret('>987v>.v\nv456<  :\n>321 ^ _@') == '123456789', 'Failed to interpret the code')