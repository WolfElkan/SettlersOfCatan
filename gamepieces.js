class Settlement extends Polygon {
	constructor(player, center) {
		if (type(center) == Number) {
			center = new LabelPoint(center)
		}
		super()
		this.center = center
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
			'points':this.points,
		}
		GAME.push(this)
		this.player.resources.brick -= 1;
		this.player.resources.woods -= 1;
		this.player.resources.grain -= 1;
		this.player.resources.sheep -= 1;
	}
}

class City extends Polygon {
	constructor(player, center) {
		if (type(center) == Number) {
			center = new LabelPoint(center)
		}
		super()
		this.center = center
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
		this.options = {
			'fill':this.player.color,
			'points':this.points,
		}
		GAME.push(this)
		this.player.resources.wheat -= 2;
		this.player.resources.stone -= 3;
	}
}

class Road extends Polygon {
	constructor (player, pointA, pointB) {
		super()
		if (type(pointA) == Number && !pointB) {
			this.label = pointA
			if (pointA % 10 == 1) {
				pointB = new LabelPoint(pointA+ 1)
				pointA = new LabelPoint(pointA+93)
			} else if (pointA % 10 == 3) {
				pointB = new LabelPoint(pointA+ 1)
				pointA = new LabelPoint(pointA- 1)
			} else if (pointA % 10 == 5) {
				pointB = new LabelPoint(pointA+ 7)
				pointA = new LabelPoint(pointA- 1)
			}
		}

		this.player = player

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
		this.options = {
			'fill':this.player.color,
			'points':this.points,
		}
		GAME.push(this)
		this.player.resources.brick -= 1;
		this.player.resources.woods -= 1;
	}
}

class Token {
	constructor(center, number, letter='', robber=false) {
		this.center = center
		this.number = number
		this.letter = letter
		this.robber = robber
		this.resource = undefined
		this.nDots = 6 - Math.abs(7-number);


		if (robber) {
			this.textcolor = '#999999';
		} else if (this.nDots > 4) {
			this.textcolor = '#bb0000';
		} else {
			this.textcolor = '#000000';
		}
		GAME.push(this)
	}

	set_resource(resource) {
		this.resource = resource
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
		this.center = center
		this.color = color
		this.rate = rate
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
		GAME.push(this)
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