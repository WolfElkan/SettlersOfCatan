class Game {
	constructor() {
		this.board = []
		this.ports = []
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