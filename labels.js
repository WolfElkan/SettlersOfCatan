class Text extends Element {
	constructor(content, position) {
		if (type(content) == Number && !position) {
			position = new LabelPoint(content)
		}
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
	// new Text(hex_labels[i], new LabelPoint(hex_labels[i])).render()
}

for (var i = 0; i < vert_labels.length; i++) {
	// new Text(vert_labels[i], new LabelPoint(vert_labels[i])).render()
}

for (var i = 0; i < road_labels.length; i++) {
	// new Text(road_labels[i], new LabelPoint(road_labels[i])).render()
}

// new Text( 50).render()
// new Text( 50).render()
// new Text( 60).render()
// new Text(160).render()
// new Text(260).render()
// new Text(360).render()
// new Text(450).render()
// new Text(540).render()
// new Text(630).render()
// new Text(620).render()
// new Text(610).render()
// new Text(600).render()
// new Text(500).render()
// new Text(400).render()
// new Text(300).render()
// new Text(210).render()
// new Text(120).render()
// new Text( 30).render()
// new Text( 40).render()


// for (var i = 0; i < text_lists.length; i++) {
// 	var texts = text_lists[i]
// 	var class_label = class_lists[i]

// 	$(document).ready(function() {
// 		for (var i = 0; i < texts.length; i++) {
// 			new Text(texts[i], new LabelPoint(texts[i])).render()
// 		}
// 	})
// }