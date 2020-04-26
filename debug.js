//// Coordinate Labels 

for (var i = -9; i <= 9; i++) {
	new Text(i,new HexPoint(-5.4,i)).render()
	new Text(i,new HexPoint(i,-9)).render()
}