// META

function type(obj) {
	return obj.__proto__.constructor
}

// function log(str) {
// 	var p = document.createElement('p')
// 	p.innerText = str
// 	console.log([p])
// 	$('#log').appendChild(p)
// }

// GEOMETRY

const K = 75

const origin = {
	x: K*5,
	y: K*5,
}
$('#board').width(origin.x * 2)
$('#board').height(origin.y * 2)

var svg = ''

function RENDER(code=svg) {
	$('#board').html(code)
}

class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
	seq() {
		return `${this.x},${this.y} `
	}
	plus(vector) {
		return new Vector(this.x + vector.x, this.y + vector.y)
	}
	rotate(about, degrees) {
		var dx = this.x - about.x
		var dy = this.y - about.y
		var sin = Math.sin(degrees * Math.PI / 180)
		var cos = Math.cos(degrees * Math.PI / 180)
		this.x = (dx * cos) - (dy * sin) + about.x
		this.y = (dy * cos) + (dx * sin) + about.y
		return this
	}
}

class Vector extends Point {
	times(coef) {
		return new Vector(this.x * coef, this.y * coef)
	}
}

class Origin extends Point {
	constructor(x, y) {
		super()
		this.x = x * K + origin.x
		this.y = y * K + origin.y
	}	
}

class HexPoint extends Point {
	constructor(x, y) {
		super()
		this.nx = x
		this.ny = y
		this.x = origin.x + (x * K * Math.sqrt(3) / 2)
		this.y = origin.y - (y * K / 2)
	}
}

class SynPoint extends Point {
	constructor(x, y, z) {
		super()
		this.nx = x
		this.ny = y
		this.nz = z
		this.x = origin.x + (y - z) * Math.sqrt(3) * K / 2;
		this.y = origin.y + (x - ((y + z) / 2)) * K;
	}
}

function pointSVGP(points) {
	var result = ''
	for (var i = 0; i < points.length; i++) {
		result += points[i].seq()
	}
	return result
}

function kwargSVGP(obj, isStyle=false) {
	var result = ''
	for (var key in obj) {
		var val = obj[key]
		if (key == 'points') {
			val = pointSVGP(val)
		}
		if (key == 'style') {
			val = kwargSVGP(val, true)
		}
		result += isStyle ? `${key}:${val}; ` : `${key}="${val}" `
	}
	return result
}

function labelpoint(label) {
	var xy_offsets = [
		[ 0,   0  ],
		[-1,   0  ],
		[-1,   1  ],
		[-0.5, 1.5],
		[ 0  , 2  ],
		[ 0.5, 1.5]
	]
	var h = label
	var o = h % 10
	h = Math.floor(h / 10)
	var t = h % 10
	h = Math.floor(h / 10)
	var x = h + (2 * t) - 9
	var y = 9 - (3 * h)
	var offset = xy_offsets[o]
	x += offset[0]
	y += offset[1]
	return new HexPoint(x,y)
}

// ELEMENTS

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

// GAME PIECES

class Settlement extends Polygon {
	constructor(player, center) {
		if (type(center) == Number) {
			center = labelpoint(center)
		}
		super()
		this.player = player
		this.parallels = {
			x : {
				lef : center.x - (K * 0.15),
				cen : center.x,
				rig : center.x + (K * 0.15),
			},
			y : {
				top : center.y - (K * 0.20),
				mid : center.y - (K * 0.05),
				bot : center.y + (K * 0.15),
			}
		}
		this.points = [
			new Point(this.parallels.x.cen, this.parallels.y.top), 
			new Point(this.parallels.x.rig, this.parallels.y.mid), 
			new Point(this.parallels.x.rig, this.parallels.y.bot), 
			new Point(this.parallels.x.lef, this.parallels.y.bot), 
			new Point(this.parallels.x.lef, this.parallels.y.mid)
		]
		this.options = {
			'fill':this.player.color,
		}
	}
}

class City extends Polygon {
	constructor(player, center) {
		if (type(center) == Number) {
			center = labelpoint(center)
		}
		super()
		this.player = player
		this.parallels = {
			x : {
				lef : center.x - (K * 0.22),
				apx : center.x - (K * 0.07),
				ext : center.x + (K * 0.08),
				rig : center.x + (K * 0.22),
			},
			y : {
				top : center.y - (K * 0.20),
				mid : center.y - (K * 0.05),
				bot : center.y + (K * 0.15),
			}
		}
		this.points = [
		// return [[apx,top], [ext,mid], [rig,mid], [rig,bot], [lef,bot], [lef,mid]];
			new Point(this.parallels.x.apx, this.parallels.y.top), 
			new Point(this.parallels.x.ext, this.parallels.y.mid), 
			new Point(this.parallels.x.rig, this.parallels.y.mid), 
			new Point(this.parallels.x.rig, this.parallels.y.bot), 
			new Point(this.parallels.x.lef, this.parallels.y.bot),
			new Point(this.parallels.x.lef, this.parallels.y.mid),
		]
	}
}

class Road extends Polygon {
	constructor (player, pointA, pointB) {
		super()

		var staticWidth = K * 0.05
		var staticShort = K * 0.23

		var vector = new Vector(pointB.x - pointA.x, pointB.y - pointA.y)
		this.tangent = vector.x / vector.y
		this.absdist = (vector.x**2 + vector.y**2) ** 0.5

		this.width = staticWidth / this.absdist
		this.short = staticShort / this.absdist

		this.forw = vector
		this.back = new Vector(-vector.x, -vector.y)
		this.left = new Vector(-vector.y,  vector.x)
		this.righ = new Vector( vector.y, -vector.x)

		this.points = [
			pointA.plus(this.forw.times(this.short)).plus(this.left.times(this.width)),
			pointA.plus(this.forw.times(this.short)).plus(this.righ.times(this.width)),
			pointB.plus(this.back.times(this.short)).plus(this.righ.times(this.width)),
			pointB.plus(this.back.times(this.short)).plus(this.left.times(this.width))
		]
	}
}

class Token {
	constructor(center, number, letter='', robber=false) {
		this.center = center
		this.number = number
		this.letter = letter
		this.robber = robber

		this.nDots = 6 - Math.abs(7-number);


		if (robber) {
			this.textcolor = '#999999';
		} else if (this.nDots > 4) {
			this.textcolor = '#bb0000';
		} else {
			this.textcolor = '#000000';
		}
	}

	get_circle() {
		var radius = 0.43 * K
		return new Element('circle', {
			fill: '#ffd175',
			stroke: '#000000',
			'stroke-width': 1,
			cx: this.center.x,
			cy: this.center.y,
			r: radius,
		})
	}

	get_letter() {
		var size = 0.15 * K
		var base = 0.23 * K
		return new Element('text', {
			x: this.center.x,
			y: this.center.y - base,
			fill: this.textcolor,
			'text-anchor': 'middle',
			style: {
				'font-family':'serif',
				'font-size': size,
				'font-weight':'normal'
			}
		}, this.letter)
	}

	get_number() {
		var size = 0.50 * K
		var base = -.17 * K
		return new Element('text', {
			x: this.center.x,
			y: this.center.y - base,
			fill: this.textcolor,
			'text-anchor': 'middle',
			style: {
				'font-family':'serif',
				'font-size': size,
				'font-weight':'bold'
			}
		}, this.number)
	}

	get_dots() {
		var size = 0.14 * K
		var base = -.30 * K
		var dots = '';
		for (var i = 0; i < this.nDots; i++) {
			dots += '&#x2b25;';
		}
		return new Element('text', {
			x: this.center.x,
			y: this.center.y - base,
			fill: this.textcolor,
			'text-anchor': 'middle',
			style: {
				'font-family':'serif',
				'font-size': size,
				'font-weight':'normal'
			}
		}, dots)
	}

	render() {
		this.get_circle().render()
		this.get_letter().render()
		this.get_number().render()
		this.get_dots().render()
	}
}

class Port {
	constructor(center, color, rate) {
		// center.x += 0.27 * K
		this.center = center
		this.color = color
		this.rate = rate

		// var parallels = {
		// 	x : {
		// 		lef : center.x - (K * 0.03),
		// 		cen : center.x + (K * 0.27),
		// 		rig : center.x + (K * 0.57),
		// 	},
		// 	y : {
		// 		top : center.y - (K * 0.34),
		// 		hig : center.y - (K * 0.23),
		// 		mid : center.y - (K * 0.08),
		// 		bot : center.y + (K * 0.34),
		// 	}
		// }
		if ((center.nx + 0.5 + center.ny) % 2) {
			this.points = [
				new HexPoint(center.nx+0.5,center.ny+1),
				new HexPoint(center.nx-0.5,center.ny),
				new HexPoint(center.nx+0.5,center.ny-1),
			]
		} else {
			this.points = [
				new HexPoint(center.nx-0.5,center.ny+1),
				new HexPoint(center.nx+0.5,center.ny),
				new HexPoint(center.nx-0.5,center.ny-1),
			]
		}
		// [
		// 	new Point(center.x,center.y), 
		// 	new Point(parallels.x.rig, parallels.y.mid), 
		// 	new Point(parallels.x.rig, parallels.y.bot), 
		// ]
		// for (var i = 0; i < this.points.length; i++) {
		// 	this.points[i].rotate(center, rotation)
		// }
	}
	poly() {
		return new Polygon(this.points, {fill:this.color})
	}
	text() {
		var size = 0.25 * K
		var base = 0.10 * K
		var move = 0.00 * K
		// move.rotate(this.center, this.rotation)
		return new Element('text', {
			x: (this.points[0].x+this.points[1].x+this.points[2].x)/3 + move,
			y: (this.points[0].y+this.points[1].y+this.points[2].y)/3 + base,
			fill: this.textcolor,
			'text-anchor': 'middle',
			style: {
				'font-family':'serif',
				'font-size': size,
				'font-weight':'bold',
				// 'transform': `rotate(${this.rotation}deg)`
			}
		}, this.rate)
	}
	render() {
		this.poly().render()
		this.text().render()
	}
}

// LABELS

class Text extends Element {
	constructor(content, position) {
		super('text',{
			'x': position.x - 10,
			'y': position.y + 5,
		},content)
		this.render()
	}
}

// SETUP

var brick = '#9a2700' // U+1F9F1
var woods = '#06741e' // U+1FAB5
var grain = '#ffe537' // U+1F33E
var sheep = '#93ff37' // U+1F411
var stone = '#68616c' // U+1FAA8
var desert = '#ffd175'

$('.brick').css('background-color',brick)
$('.woods').css('background-color',woods)
$('.grain').css('background-color',grain)
$('.sheep').css('background-color',sheep)
$('.stone').css('background-color',stone)

// var resources = [ // sorted
// 	grain, grain, grain, grain,
// 	woods, woods, woods, woods,
// 	sheep, sheep, sheep, sheep,
// 	brick, brick, brick,
// 	stone, stone, stone,
// 	desert,
// ]

var resources = [ // beginner setup
	stone, 
	grain, 
	woods, 
	stone, 
	grain, 
	sheep, 
	grain, 
	sheep, 
	woods, 
	brick,
	desert,
	brick,
	sheep,
	sheep,
	woods,
	brick,
	stone,
	woods,
	grain
]

// var resources = [ // custom
// 	woods, 
// 	brick,
// 	grain, 
// 	woods, 
// 	sheep, 
// 	grain,
// 	woods,
// 	sheep, 
// 	stone, 
// 	grain, 
// 	sheep,
// 	brick,
// 	grain, 
// 	sheep,
// 	stone, 
// 	brick,
// 	woods,
// 	stone,
// 	desert,
// ]

var hex_labels = [510,520,530,440,350,250,150,140,130,220,310,410,420,430,340,240,230,320,330]

var road_label_offsets = [1,3,5,11,103,95]
var vert_label_offsets = [2,4,12,104,102,94]

var road_labels = []
var vert_labels = []

var hex_positions = []
for (var i = 0; i < hex_labels.length; i++) {

	hex_positions.push(labelpoint(hex_labels[i]))
	
	for (var j = 0; j < road_label_offsets.length; j++) {
		let new_label = hex_labels[i] + road_label_offsets[j]
		if (!road_labels.includes(new_label)) {
			road_labels.push(new_label)
		}
	}
	
	for (var j = 0; j < vert_label_offsets.length; j++) {
		let new_label = hex_labels[i] + vert_label_offsets[j]
		if (!vert_labels.includes(new_label)) {
			vert_labels.push(new_label)
		}
	}

}

var text_lists = [
	hex_labels,
	road_labels,
	vert_labels
]
var class_lists = [
	'hex label',
	'road label',
	'vertex label'
]

for (var i = 0; i < text_lists.length; i++) {
	var texts = text_lists[i]
	var class_label = class_lists[i]

	$(document).ready(function() {
		for (var i = 0; i < texts.length; i++) {
			new Text(texts[i], labelpoint(texts[i])).render()
		}
	})
}
var token_numbers = [5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11]
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var tokens = []
for (var i = 0; i < 18; i++) {
	tokens.push({
		num: token_numbers[i],
		let: alphabet[i],
	})
}

shuffle(tokens)
shuffle(resources)

var red    = '#ff0000'
var blue   = '#0000ff'
var white  = '#dddddd'
var orange = '#ff8000'

// new Port(new HexPoint(-3,-8), white, 0, '3:1').render()
// new Port(new HexPoint(-5,-3), grain, 60, '2:1').render()

var t = 0
for (var i = 0; i < 19; i++) {
	var center = hex_positions[i]
	var resource = resources[i]
	var hex = new Hexagon(center,{fill:resource})
	hex.render()

	if (resource != desert) {
		var tok = tokens[t]
		var token = new Token(center, tok.num, tok.let)
		token.render()
		t++
	}
}

// f.render()

// var bench_width =  2*K
// var bench_depth =  30

var br = {
	'x': origin.x * 2,
	'y': origin.y * 2,
}

// bench_width /= 2

// var bench_sides = [
// //	lef,	rig,	bot,	top
// 	[origin.x - bench_width, origin.x + bench_width, br.y - bench_depth, br.y], // South
// 	[br.x - bench_depth, br.x, origin.y - bench_width, origin.x + bench_width], // East
// 	[origin.x - bench_width, origin.x + bench_width, bench_depth, 0], // North
// 	[0, bench_depth, origin.y - bench_width, origin.x + bench_width], // West
// ]

// class PlayerBench extends Rectangle {
// 	constructor(xxyy, options) {
// 		super(xxyy[0], xxyy[1], xxyy[2], xxyy[3], options)
// 	}
// }


class Player {
	constructor(name, color, side) {
		this.player_name = name
		this.color = color
		// this.bench = new PlayerBench(bench_sides[side],{'fill':color})
		// this.bench.render()
		this.resources = {
			'brick':0,
			'woods':0,
			'grain':0,
			'sheep':0,
			'stone':0,
		}
		this.table_row = this.tr()
		$('#resources')[0].appendChild(this.table_row)
	}
	tr() {
		var element = document.createElement('tr')
		var thead = $('#resources')[0].children[0].children[0].children
		var td = document.createElement('th')
			$(td).css('background-color',this.color)
			td.innerText = this.player_name
			element.appendChild(td)
		for (var i = 1; i <= 5; i++) {
			resource = thead[i].className
			var value = this.resources[resource]
			var td = document.createElement('td')
				td.innerText = value
				element.appendChild(td)
		}
		return element
	}
}

// Coordinate Labels 

// for (var i = -9; i <= 9; i++) {
// 	new Text(i,new HexPoint(-5.4,i)).render()
// 	new Text(i,new HexPoint(i,-9)).render()
// }
