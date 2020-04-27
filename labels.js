class Text extends Element {
	constructor(content, position) {
		super('text',{
			'x': position.x - 10,
			'y': position.y + 5,
		},content)
		this.render()
	}
}

var text_lists = [hex_labels,road_labels,vert_labels]
var class_lists = ['hex label','road label','vertex label']

for (var i = 0; i < hex_labels.length; i++) {
	new Text(hex_labels[i], labelpoint(hex_labels[i])).render()
}

for (var i = 0; i < vert_labels.length; i++) {
	// new Text(vert_labels[i], labelpoint(vert_labels[i])).render()
}

for (var i = 0; i < road_labels.length; i++) {
	// new Text(road_labels[i], labelpoint(road_labels[i])).render()
}

// for (var i = 0; i < text_lists.length; i++) {
// 	var texts = text_lists[i]
// 	var class_label = class_lists[i]

// 	$(document).ready(function() {
// 		for (var i = 0; i < texts.length; i++) {
// 			new Text(texts[i], labelpoint(texts[i])).render()
// 		}
// 	})
// }