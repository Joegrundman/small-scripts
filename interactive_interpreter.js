class Interpreter {
  constructor() {
    this.vars = {}
    this.functions = {}
  }

  tokenize(program) {
    if (program === "")
        return [];

    var regex = /\s*([-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
    return program.split(regex).filter(function (s) { return !s.match(/^\s*$/); });
  }

  input(expr) {
    var tokens = this.tokenize(expr)
    return this.parse(tokens)
  }

  math(tokenA, op, tokenB) {
    var a = parseInt(tokenA, 10)
    if(isNaN(a)) {
      a = this.vars[tokenA]
    }
    var b = parseInt(tokenB, 10)
    if(isNaN(b)) {
      b = this.vars[tokenB]
    }
    switch(op) {
      case '+': return a + b
      case '-': return a - b
      case '*': return a * b
      case '/': return a / b
      case '%': return a % b
    }
  
  }

  assign(key, val) {
    console.log('assigning', key, val)
    this.vars[key] = parseInt(val, 10)
  }

  calcParenthesis(tokenStr) {
    var matcher = /\(([\s\d\.\/\+\-\*]+)\)/
    var subExpr = tokenStr.match(matcher)[1]
    subExpr = this.multiplyAndDivide(subExpr)
    subExpr = this.addAndSubtract(subExpr)
    return tokenStr.replace(matcher, subExpr.trim())
  }

  multiplyAndDivide(subExpr) {
    var matcher = /\w+(\.\w+)?\s?[\/\*\%]\s?-*\w+(\.\w+)?/
    var mOrD = subExpr.match(matcher)[0]
    var resolved  = this.process(mOrD.split(" "))
    subExpr =  subExpr.replace(matcher, resolved)
    return subExpr
  }

  addAndSubtract(subExpr) {
    var matcher = /\w+(\.\w+)?\s?[+\-]\s?-*\w+(\.\w+)?/
    var aOrS = subExpr.match(matcher)[0].trim().split(" ")
    var resolved = this.process(aOrS)
    subExpr = subExpr.replace(matcher, resolved) 
    return subExpr
  }

  parse (tokens) {
console.log('start:', tokens.join(" "))
    if (!tokens.length) return ''
    while(tokens.length > 3) {
	console.log('parsecycle:', tokens.join('_'))
      var tokenStr = tokens.join(' ')
      if(/\(/.test(tokenStr)) {
        tokenStr = this.calcParenthesis(tokenStr)
      } else if(/[\*\/\%]/.test(tokenStr)) {
        tokenStr = this.multiplyAndDivide(tokenStr)
      } else if(/[\+\-]/.test(tokenStr)) {
        tokenStr = this.addAndSubtract(tokenStr)
      }
      tokens = tokenStr.split(" ")
    }
    return this.process(tokens)
  }

  process(tokens) {
  console.log(tokens)  
    var result = ''    
    
      var tokenA = tokens[0] || null
      var operator = tokens[1] || null
      var tokenB = tokens[2] || null
      switch(operator) {
        case '+': 
        case '-':
        case '/':
        case '*':
        case '%': result = this.math(tokenA, operator, tokenB); break
        case '=': this.assign(tokenA, tokenB); result = this.vars[tokenA]; break
        default: result = this.vars[tokenA]; if (!result) throw new Error("No such variable: " + tokenA ) 
      }
    return result
  }
}

var interpreter = new Interpreter()
console.log(interpreter.input("1 + 1"), " :should be 2")
console.log(interpreter.input("1 + 1 + 4"), " :should be 6")
console.log(interpreter.input("3 * 4 + 1"), " :should be 13")
console.log(interpreter.input("10 * 12 + 3 * 2"), " :should be 126")
console.log(interpreter.input("10 * 12 + 3 * 2"), " :should be 126")