class Player {
	constructor(name, color) {
		this.player_name = name
		this.color = color

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