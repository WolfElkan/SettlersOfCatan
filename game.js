var nwe = new Player('Wolf',red,0)

new Settlement(nwe,444)

// woods_port = new Port(origin,'#cccccc',0,'1')
// woods_port.points = [
// 	new HexPoint(1,9),
// 	new HexPoint(0,8),
// 	new HexPoint(1,7),
// ]
// woods_port.render()

// woods_port = new Port(origin,'#cccccc',0,'2')
// woods_port.points = [
// 	new HexPoint(1,9),
// 	new HexPoint(2,8),
// 	new HexPoint(1,7),
// ]
// woods_port.render()

// woods_port = new Port(origin,'#cccccc',0,'3')
// woods_port.points = [
// 	new HexPoint(3,9),
// 	new HexPoint(2,8),
// 	new HexPoint(3,7),
// ]
// woods_port.render()

// woods_port = new Port(origin,'#cccccc',0,'4')
// woods_port.points = [
// 	new HexPoint(1,9),
// 	new HexPoint(0,8),
// 	new HexPoint(1,7),
// ]
// // woods_port.render()

var other = "#cccccc"

new Port(new HexPoint( 0.5, 8),sheep,"2:1").render()
// new Port(new HexPoint( 1.5, 8),'#cccccc', 2).render()
// new Port(new HexPoint( 2.5, 8),'#cccccc', 3).render()
// new Port(new HexPoint( 3.5, 6),'#cccccc', 4).render()
new Port(new HexPoint( 3.5, 5),other,"3:1").render()
// new Port(new HexPoint( 4.5, 3),'#cccccc', 6).render()
// new Port(new HexPoint( 4.5, 2),'#cccccc', 7).render()
new Port(new HexPoint( 5.5, 0),other,"3:1").render()
// new Port(new HexPoint( 4.5,-2),'#cccccc', 9).render()
// new Port(new HexPoint( 4.5,-3),'#cccccc',10).render()
new Port(new HexPoint( 3.5,-5),brick,"2:1").render()
// new Port(new HexPoint( 3.5,-6),'#cccccc',12).render()
// new Port(new HexPoint( 2.5,-8),'#cccccc',13).render()
// new Port(new HexPoint( 1.5,-8),'#cccccc',14).render()
new Port(new HexPoint( 0.5,-8),woods,"2:1").render()
// new Port(new HexPoint(-0.5,-8),'#cccccc',16).render()
// new Port(new HexPoint(-1.5,-8),'#cccccc',17).render()
new Port(new HexPoint(-2.5,-8),other,"3:1").render()
// new Port(new HexPoint(-3.5,-6),'#cccccc',19).render()
// new Port(new HexPoint(-3.5,-5),'#cccccc',20).render()
new Port(new HexPoint(-4.5,-3),grain,"2:1").render()
// new Port(new HexPoint(-4.5,-2),'#cccccc',22).render()
// new Port(new HexPoint(-5.5, 0),'#cccccc',23).render()
// new Port(new HexPoint(-4.5, 2),'#cccccc',24).render()
new Port(new HexPoint(-4.5, 3),stone,"2:1").render()
// new Port(new HexPoint(-3.5, 5),'#cccccc',26).render()
// new Port(new HexPoint(-3.5, 6),'#cccccc',27).render()
new Port(new HexPoint(-2.5, 8),other,"3:1").render()
// new Port(new HexPoint(-1.5, 8),'#cccccc',29).render()
// new Port(new HexPoint(-0.5, 8),'#cccccc',30).render()