// const K = 75
const K = 60

const origin = {
	x: K*5,
	y: K*5,
}
$('#board').width(origin.x * 2)
$('#board').height(origin.y * 2)

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
		this.hx = x
		this.hy = y
		this.x = origin.x + (x * K * Math.sqrt(3) / 2)
		this.y = origin.y - (y * K / 2)
	}
}

class SynPoint extends Point {
	constructor(x, y, z) {
		super()
		this.sx = x
		this.sy = y
		this.sz = z
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

// // Make LabelPoint a class
// // Add support for triangles

class LabelPoint extends HexPoint {
	constructor(label) {
		var xy_offsets = [
			[ 0  , 0  ],
			[-1  , 0  ],
			[-1  , 1  ],
			[-0.5, 1.5],
			[ 0  , 2  ],
			[ 0.5, 1.5],
		]
		var tri_offsets = [
			[ 0  , 0  ],
			[-0.5, 0  ],
			[-0.5, 1  ],
			[ 0.5, 1  ],
			[ 0.5, 0  ],
			[ 0.5,-1  ],
			[-0.5,-1  ],
		]
		var h = label
		var o = h % 10
		var d = o %  1
		d *= 10
		d = Math.round(d)
		o = Math.floor(o)
		h = Math.floor(h / 10)
		var t = h % 10
		h = Math.floor(h / 10)
		var x = h + (2 * t) - 9
		var y = 9 - (3 * h)
		var major_offset = xy_offsets[o]
		var minor_offset = tri_offsets[d]
		x += major_offset[0] + minor_offset[0]
		y += major_offset[1] + minor_offset[1]
		super(x,y)
		this.label = label
	}
	neighbors() {
		var offsets
		// Multiplied by 10 to avoid floating point errors.
		switch (Math.round((this.label % 10) * 10)) {
			// Hex
			case  0: offsets = [2,4,12,104,102,94]; break;
			// Roads
			case 10: offsets = [93,1]; break;
			case 30: offsets = [-1,1]; break;
			case 50: offsets = [-1,7]; break;
			// Vertices
			case 20: offsets = [ -8,2,92]; break;
			case 40: offsets = [-92,8,-2]; break;
			// Triangles
			case  1: offsets = [-0.1, 93.9,  1.9]; break;
			case  2: offsets = [-0.2,  1.8,  3.8]; break;
			case  3: offsets = [-0.3,  3.7, 11.7]; break;
			case  4: offsets = [-0.4, 11.6,103.6]; break;
			case  5: offsets = [-0.5,103.5,101.5]; break;
			case  6: offsets = [-0.6,101.4, 93.4]; break;
		}
		for (var i = 0; i < offsets.length; i++) {
			offsets[i] += this.label
		}
		return offsets
	}
}

var hex_labels = [510,520,530,440,350,250,150,140,130,220,310,410,420,430,340,240,230,320,330]

var road_label_offsets = [1,3,5,11,103,95]
var vert_label_offsets = [2,4,12,104,102,94]

var road_labels = []
var vert_labels = []

var hex_positions = []
for (var i = 0; i < hex_labels.length; i++) {

	hex_positions.push(new LabelPoint(hex_labels[i]))
	
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
