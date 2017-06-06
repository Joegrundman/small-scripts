var calc = function(expression){
  expression = calcParentheses(expression);
  expression = multiplyAndDivide(expression);
  expression = addAndSubtract(expression);
  return Number(expression)
}

function calcParentheses(expression){
   while (/\(/.test(expression)){
    var parenGrp = /\([\s\d\.\/\+\-\*]+\)/;
    var subExp = expression.match(parenGrp)[0]; 
    subExp = stripDown(subExp);
    subExp = multiplyAndDivide(subExp);
    subExp = addAndSubtract(subExp);
    expression = expression.replace(parenGrp, subExp) 
  } 
  return expression;
}

function multiplyAndDivide(expression){
   while (/[\*\/]/.test(expression)){ 
    var multOrDivGrp = /\s?-?\d+(\.\d+)?\s?[\/\*]\s?-*\d+(\.\d+)?/;
    expression = expression.replace(multOrDivGrp, resolveGrp)
  }
  return expression;
}

function addAndSubtract(expression){
   while (/\d\s?[+\-]\s?-*\d/.test(expression)){
    var plusOrMinusGrp = /\s?-?\d+(\.\d+)?\s?[+\-]\s?-*\d+(\.\d+)?/;
    expression = expression.replace(plusOrMinusGrp, resolveGrp)
  }
  return expression;
}
function stripDown(expression){
    expression = expression.replace(/[\(\)]/g, '');   // Remove brackets
    if(/[\/\*\-\+]\s?-\s?-\s?/.test(expression)){   // Reduce double minuses
      expression = expression.replace(/\s?-\s?-\s?/, '')
    };
  return expression;
}

function resolveGrp (expression) {
    expression = stripDown(expression);
     var simpleDigits = /(\s?-?\d+(?:\.\d+)?\s?)([+\-\/\*])(\s?-?\d+(?:\.\d+)?)/; //matches too far with negatives
     var matched = expression.match(simpleDigits);
     if (!matched){return expression;}
     var a = Number(matched[1].trim());
     var operator = matched[2];
     var b = Number(matched[3].trim());
     var result = doMath(a, operator, b);
     return result;
};

function doMath(a, operator, b){
   var result = 0;
     switch(operator){
       case "+": 
        result =  a + b;
        break;
       case "-": 
        result =  a - b;
        break;
       case "*": 
        result =  a * b;
        break;
       case "/": 
        result =  a / b;
        break;
     }
     return result;
}