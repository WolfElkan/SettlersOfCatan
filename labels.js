var text_lists = [hex_labels,road_labels,vert_labels]
var class_lists = ['hex label','road label','vertex label']

for (var i = 0; i < text_lists.length; i++) {
	var texts = text_lists[i]
	var class_label = class_lists[i]

	$(document).ready(function() {
		for (var i = 0; i < texts.length; i++) {
			new Text(texts[i], labelpoint(texts[i])).render()
		}
	})
}

class Text extends Element {
	constructor(content, position) {
		super('text',{
			'x': position.x - 10,
			'y': position.y + 5,
		},content)
		this.render()
	}
}