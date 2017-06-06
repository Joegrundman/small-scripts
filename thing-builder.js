/**
* Thing class.
* Thing is constructed using new. 
*
* let fluffykins = new Thing('Fluffykins')
* 
* __define properties__
* fluffykins.is_a.cat
* fluffykins.is_a_cat // true
* fluffykins.is_not_a.dog
* fluffykins.is_a_dog // false
* fluffykins.is_the.terror_of.giant_rodents
* fluffykins.terror_of // giant_rodents
* fluffykins.has(4).legs
* fluffykins.legs.length // 4
* fluffykins.has(2).fangs.each(fang => being_the.slayer_of.heroes.and_the.tormentor_of.women)
* fluffykins.has(2).eyes.each(eye => having(1).laser_cannon)
* fluffkyins.eyes[0].name // eye
*
* __define methods__
* fluffykins.can(jumpOnto(place => `${name} jumps onto ${place}`)
* fluffykins.jumpOnto('table') // 'Fluffykins jumps onto table.'
*
* __remembers previous method calls in 'past-tense' attribute if defined__
* fluffykins.can(slitherInto('slitheredInto', place => `${name} slithers into ${place}`)
* fluffykins.slitherInto('corner') // 'Fluffykins slithers into corner'
* fluffykins.slitheredInto // ['Fluffykins slithers into corner']
*/


class Thing {
    constructor (name) {	  
		this.name = name
		
		Array.prototype.each = function(cb) {
			var cbStr = cb.toString()
			var arg = cbStr.match(/^\(?\w+/)[0]
			var fnBody = cbStr.replace(/\w+ => /, "")
			var newFnBody = arg + "." + fnBody
			this.forEach(new Function(arg, newFnBody))
		}
		
		this.is_a = new Proxy(this, {
			get: (target, property, receiver) => {
				const newProp = "is_a_" + property
				return target[newProp] = true
			}
		})
	 
		this.is_not_a = new Proxy(this, {
			get: (target, property, receiver) => {
				const newProp = "is_a_" + property
				return target[newProp] = false
			}
		})
		
		this.is_the = new Proxy(this, {
			get: (target, property, receiver) => {
				target[property] = new Proxy(this, {
					get: (nextTarget, nextProp, receiver) => {
						nextTarget[property] = nextProp
						return nextTarget
					}
				})
				return target[property]
			}
		})
		
		this.being_the = this.is_the
		this.and_the = this.is_the		
				
		this.can = new Proxy(this, {
			get: (target, property, receiver) => {
				target[property] = new Proxy(() => {}, {
					apply: (fnTarget, ctx, args) => {
						var fn
						var past
						if(args.length == 1) {
							fn = args[0]
						} else if (args.length == 2) {
							past = args[0]
							ctx[past] = []
							fn = args[1]
						}
					    var fnStr = fn.toString()
					    var fnArgs = fnStr.match(/\(?\S+/)[0].split(',')
					    var nextFn = fnStr.replace(/\${([A-Za-z0-9_]+)}/g, (match, p1) => fnArgs.indexOf(p1) > -1 ? match : '${target.' + p1 + '}')
						return ctx[property] = new Proxy(eval(nextFn), {
							apply: (nextTarget, nextCtx, nextArgs) => {
								var res =  nextTarget.apply(nextCtx, nextArgs)
								if(nextCtx[past]) {
									nextCtx[past].push(res.toString())
								}
								return res
								
							}
						})	
					}
				})		
				return target[property]
			}
		})			
	}
	
	has (num) {
		return new Proxy(this, {
			get: (target, property, receiver) => {
				if(num > 1) {
					var thingArray = new Array(num).fill(new Thing(property.replace(/s$/, "")))
					target[property] = thingArray
				} else {
					target[property] = new Thing(property)
				}
				return target[property]
			}
		})
	}
	
	having(num) {
		return this.has(num)
	}
		
}

const jane = new Thing('Jane')
console.log(typeof jane === 'object', 'should be true')
console.log(jane.name, "should be Jane")
jane.is_a.woman
console.log(jane.is_a_woman, "should be true")
console.log(jane.is_a_man, "should be undefined")
jane.is_not_a.man
console.log(jane.is_a_man, "should be false")
jane.is_the.parent_of.joe
console.log(jane.parent_of, "should be joe")
jane.has(4).legs
console.log(jane.legs.length, "should be 4")
jane.has(2).arms
console.log(jane.arms.length, "should be 2")
console.log(jane.arms.every(arm => arm instanceof Thing), "should be true")
console.log(jane.arms[0].name, "should be 'arm'")
jane.has(1).head.having(2).eyes
console.log(jane.head.eyes.length, "should be 2")
console.log(jane.head.eyes[0].name, "should be 'eye'")

const bob = new Thing("Bob")
bob.has(2).hands.each(hand => having(5).fingers)
console.log(bob.hands[0].fingers.length, "should be 5")
console.log(bob.hands[1].fingers.length, "should be 5")

const jack = new Thing('Jack');
jack.has(1).head.having(2).eyes.each(eye => being_the.color.green);

console.log(jack.head.eyes[1].color, "should be green")

const sue = new Thing('Sue')
sue.has(1).head.having(2).eyes.each(eye => being_the.color.blue.and_the.shape.round);
console.log(sue.head.eyes[0].color, "should be blue")
console.log(sue.head.eyes[0].shape, "should be round")
console.log(sue.name, 'should be Sue')
sue.can.speak(phrase => {return `${name} says: ${phrase}!`})
console.log(sue.speak('hello'), 'should be "Sue says: hello!"')

const bill = new Thing('Bill')
bill.can.speak('spoke', phrase => `${name} says: ${phrase}!`)
console.log(bill.speak('hi'), 'should be "Bill says: hi!"')
console.log(bill.spoke, 'should be "Bill says: hi!"')