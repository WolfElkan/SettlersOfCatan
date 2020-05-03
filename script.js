function type(obj) {
	if (obj) {
		return obj.__proto__.constructor
	}
}

var svg = ''

const GAME = new Game()