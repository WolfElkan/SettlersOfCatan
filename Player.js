class Player {
	constructor(name, color) {
		this.player_name = name
		this.color = color

		this.resources = {
			'brick':4,
			'woods':4,
			'grain':2,
			'sheep':2,
			'stone':0,
		}
		GAME.players.push(this)
	}
	tr() {
		var element = document.createElement('tr')
		$(element).attr('id',this.color.substring(1))
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