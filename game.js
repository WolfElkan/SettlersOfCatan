var p1 = new Player('Red'   ,'#ff0000',0)
var p2 = new Player('Blue'  ,'#0000ff',1)
var p3 = new Player('White' ,'#ffffff',2)
var p4 = new Player('Orange','#ff8000',3)
var p5 = new Player('Purple','#8800ff',4)
var p6 = new Player('Brown' ,'#884400',5)
var p7 = new Player('Pink'  ,'#ff77dd',6)
var p8 = new Player('Cyan'  ,'#00ffff',7)
var p9 = new Player('Green' ,'#00cc22',8)
var pX = new Player('Yellow','#ffff00',9)
var pE = new Player('Teal'  ,'#00aaaa',10)
var pT = new Player('Black' ,'#000000',11)

new Settlement(p1,334).render()
new Road(p1,241).render()
new Settlement(p2,624).render()
new Road(p2,623).render()
new Settlement(p3,232).render()
new Road(p3,233).render()
new Settlement(p4,254).render()
new Road(p4,253).render()

new Settlement(p4,352).render()
new Road(p4,351).render()
new Settlement(p3,534).render()
new Road(p3,533).render()
new Settlement(p2,514).render()
new Road(p2,421).render()
new Settlement(p1,434).render()
new Road(p1,341).render()
