var brick = '#9a2700' // U+1F9F1
var woods = '#06741e' // U+1FAB5
var grain = '#ffe537' // U+1F33E
var sheep = '#93ff37' // U+1F411
var stone = '#68616c' // U+1FAA8
var desert= '#ffd175'
var multi = "#ddddee"

var colors = {
	'brick' : brick,
	'woods' : woods,
	'grain' : grain,
	'sheep' : sheep,
	'stone' : stone,
	'desert': desert,
	'multi' : multi,
}

$('.brick').css('background-color',brick)
$('.woods').css('background-color',woods)
$('.grain').css('background-color',grain)
$('.sheep').css('background-color',sheep)
$('.stone').css('background-color',stone)

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

var token_numbers = [5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11]
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var tokens = []
for (var i = 0; i < 18; i++) {
	tokens.push({
		num: token_numbers[i],
		let: alphabet[i],
	})
}

var red    = '#ff0000'
var blue   = '#0000ff'
var white  = '#dddddd'
var orange = '#ff8000'

if (TOKENS === false) {
	shuffle(tokens)
} else if (type(TOKENS) == Number) {
	shuffle(tokens,TOKENS)
}

if (HEXES === false) {
	shuffle(resources)
} else if (type(HEXES) == Number) {
	shuffle(resources,HEXES)
}

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

port_slots = [
	new LabelPoint( 50.6),
	new LabelPoint( 50.5),
	new LabelPoint( 60.6),
	new LabelPoint(160.1),
	new LabelPoint(160.6),
	new LabelPoint(260.1),
	new LabelPoint(260.6),
	new LabelPoint(360.1),
	new LabelPoint(450.2),
	new LabelPoint(450.1),
	new LabelPoint(540.2),
	new LabelPoint(540.1),
	new LabelPoint(630.2),
	new LabelPoint(620.3),
	new LabelPoint(620.2),
	new LabelPoint(610.3),
	new LabelPoint(610.2),
	new LabelPoint(600.3),
	new LabelPoint(500.4),
	new LabelPoint(500.3),
	new LabelPoint(400.4),
	new LabelPoint(400.3),
	new LabelPoint(300.4),
	new LabelPoint(210.5),
	new LabelPoint(210.4),
	new LabelPoint(120.5),
	new LabelPoint(120.4),
	new LabelPoint( 30.5),
	new LabelPoint( 40.6),
	new LabelPoint( 40.5),
]

// 

if (PORTS !== null) {
	var ports
	if (PORTS === true) {
		ports = port_shuffle(2100004)
	} else if (PORTS === false) {
		ports = port_shuffle()
	} else if (type(PORTS) == Number) {
		ports = port_shuffle(PORTS)
	}

	for (var i = 0; i < RESOURCES.length; i++) {
		resource = RESOURCES[i]
		let slot = ports[resource]
		slot = port_slots[slot]
		new Port(slot,colors[resource],"2:1").render()
	}
	for (var i = 0; i < ports.multi.length; i++) {
		let slot = ports.multi[i]
		slot = port_slots[slot]
		new Port(slot,multi,"3:1").render()
	}
}


// function log(str) {
// 	var p = document.createElement('p')
// 	p.innerText = str
// 	console.log([p])
// 	$('#log').appendChild(p)
// }