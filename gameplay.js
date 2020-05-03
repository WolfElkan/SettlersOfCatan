class Game {
	constructor() {
		this.board = []
		this.ports = []
		this.players = []
	}
	push(obj) {
		if (type(obj) == Settlement || type(obj) == City) {
			this.board[obj.center.label] = obj
		} else if (type(obj) == Road) {
			this.board[obj.label] = obj
		} else if (type(obj) == Token) {
			var hex = this.board[obj.center.label]
			// console.log(hex)
			this.board[obj.center.label] = obj
			if (hex) {
				// console.log(obj.center.label)
				obj.set_resource(hex)
			}
		}
	}
	sethex(labelpoint,hex) {
		var label = labelpoint.label
		var token = this.board[label]
		// console.log(token)
		if (token) {
			token.set_resource(hex)
		} else {
			this.board[label] = hex
		}
	}
}

function roll(dice) {
	for (var i = 130; i <= 530; i += 10) {
		var token = GAME.board[i]
		if (token && token.number == dice && !token.robber) {
			var harvest = token.center.neighbors()
			for (var j = 0; j < harvest.length; j++) {
				var harvester = GAME.board[harvest[j]]
				if (type(harvester) == Settlement) {
					harvester.player.resources[token.resource] += 1;
				} else {}
			}
		}
	}
	UPDATE_RESOURCE_TABLE()
}

function UPDATE_RESOURCE_TABLE() {
	for (var i = 0; i < GAME.players.length; i++) {
		var player = GAME.players[i]
		// console.log($(player.color))
		$(player.color).replaceWith(player.tr())
	}
}