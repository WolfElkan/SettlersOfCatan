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
		if ((center.hx + 0.5 + center.hy) % 2) {
			this.points = [
				new HexPoint(center.hx+0.5,center.hy+1),
				new HexPoint(center.hx-0.5,center.hy),
				new HexPoint(center.hx+0.5,center.hy-1),
			]
		} else {
			this.points = [
				new HexPoint(center.hx-0.5,center.hy+1),
				new HexPoint(center.hx+0.5,center.hy),
				new HexPoint(center.hx-0.5,center.hy-1),
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