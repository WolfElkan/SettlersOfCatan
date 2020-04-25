var hex_labels = [510,520,530,440,350,250,150,140,130,220,310,410,420,430,340,240,230,320,330]

var road_label_offsets = [1,3,5,11,103,95]
var vert_label_offsets = [2,4,12,104,102,94]

var road_labels = []
var vert_labels = []

var hex_positions = []
for (var i = 0; i < hex_labels.length; i++) {

	hex_positions.push(labelpoint(hex_labels[i]))
	
	for (var j = 0; j < road_label_offsets.length; j++) {
		let new_label = hex_labels[i] + road_label_offsets[j]
		if (!road_labels.includes(new_label)) {
			road_labels.push(new_label)
		}
	}
	
	for (var j = 0; j < vert_label_offsets.length; j++) {
		let new_label = hex_labels[i] + vert_label_offsets[j]
		if (!vert_labels.includes(new_label)) {
			vert_labels.push(new_label)
		}
	}

}

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