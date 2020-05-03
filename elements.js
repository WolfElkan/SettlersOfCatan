const ELEMENT_COUNTER = {
	// element
}

class Element {
	constructor(name, options={}, content='') {
		this.name = name
		this.options = options
		this.content = content
	}
	svg() {
		return `<${this.name.toLowerCase()} ${kwargSVGP(this.options)}>${this.content}</${this.name.toLowerCase()}>\n`
	}
	render() {
		this.element = document.createElement(this.name.toUpperCase())
		board.appendChild(this.element)
		svg += this.svg()
		// RENDER()
	}
}

class Polygon extends Element {
	constructor(points, options={}) {
		options.points = points
		super('polygon', options)
		this.options = options
	}
	render() {
		svg += this.svg()
		// RENDER()
	}
}

class Hexagon extends Polygon {
	constructor(center, options={}) {
		if (type(center) == Array) {
			center = new HexPoint(center[0], center[1])
		}
		if (type(options) == String) {
			options = {'fill':options}
		}
		let lef = center.x - (Math.sqrt(3) * K / 2);
		let cen = center.x;
		let rig = center.x + (Math.sqrt(3) * K / 2);
		let top = center.y - K;
		let hiy = center.y - K / 2;
		let loy = center.y + K / 2;
		let bot = center.y + K;
		super([
			new Point(cen, top),
			new Point(rig, hiy),
			new Point(rig, loy),
			new Point(cen, bot),
			new Point(lef, loy),
			new Point(lef, hiy),
		],options)
		this.center = center
		this.name = 'Polygon'
	}
}

class Rectangle extends Polygon {
	constructor(x1, x2, y1, y2, options={}) {
		if (type(x1) == Array) {
			var lef = x1[0]
			var rig = x1[1]
			var bot = x1[2]
			var top = x1[3]
			options = x2
		} else {
			var lef = x1
			var rig = x2
			var bot = y1
			var top = y2
		}
		super([
			new Point(lef,bot),
			new Point(lef,top),
			new Point(rig,top),
			new Point(rig,bot)
		],options)
	}
}