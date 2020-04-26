var bench_width =  2*K
var bench_depth =  30

var br = {
	'x': origin.x * 2,
	'y': origin.y * 2,
}

bench_width /= 2

var bench_sides = [
//	lef,	rig,	bot,	top
	[origin.x - bench_width, origin.x + bench_width, br.y - bench_depth, br.y], // South
	[br.x - bench_depth, br.x, origin.y - bench_width, origin.x + bench_width], // East
	[origin.x - bench_width, origin.x + bench_width, bench_depth, 0], // North
	[0, bench_depth, origin.y - bench_width, origin.x + bench_width], // West
]

class PlayerBench extends Rectangle {
	constructor(xxyy, options) {
		super(xxyy[0], xxyy[1], xxyy[2], xxyy[3], options)
	}
}

/// From Player constructor:
/// Player also had a parameter 'side'
// this.bench = new PlayerBench(bench_sides[side],{'fill':color})
// this.bench.render()