//// --- Sliders ---
let mainHeight   = Slider("Altezza Cilindro", 150, 50, 300);
let mainRadius   = Slider("Raggio Cilindro", 35/2, 10, 100);
let wall         = Slider("Spessore Foro", 1, 0.2, 5);
let coreRadius   = Slider("Raggio Core", 0.5, 0.1, 5);
let outerFillet  = Slider("Fillet Esterno", 0.5, 0, 5);
let innerFillet  = Slider("Fillet Interno Foro", 0.5, 0, 5);
let coreFillet   = Slider("Fillet Core", 0.3, 0, 3);

//// --- Checkbox ---
let showCore = Checkbox("Mostra Core", true);

//// --- Funzioni base ---
function makeCylinder(radius, height, filletR){
  let prof = Polygon([[0,0,0],[radius,0,0],[radius,0,height],[0,0,height]]);
  let cyl = Revolve(prof, 360, [0,0,1]);
  if(filletR>0){
    let edges = Edges(cyl).max([0,0,1]).ofType("Circle").indices();
    cyl = FilletEdges(cyl, filletR, edges);
  }
  return cyl;
}

function makeHole(radius, height){
  let prof = Polygon([[0,0,0],[radius,0,0],[radius,0,height],[0,0,height]]);
  return Revolve(prof, 360, [0,0,1]);
}

function makeCore(radius, height, filletR){
  let prof = Polygon([[0,0,0],[radius,0,0],[radius,0,height],[0,0,height]]);
  let core = Revolve(prof, 360, [0,0,1]);
  if(filletR>0){
    let edges = Edges(core).min([0,0,1]).ofType("Circle").indices();
    core = FilletEdges(core, filletR, edges);
  }
  return core;
}

//// --- Generazione cilindri ---
let mainCyl = makeCylinder(mainRadius, mainHeight, outerFillet);

let holeCyl = makeHole(mainRadius - wall, mainHeight + 2);
let cylWithHole = Difference(mainCyl, holeCyl);

let innerEdges = Edges(cylWithHole).min([0,0,1]).ofType("Circle").indices();
cylWithHole = FilletEdges(cylWithHole, innerFillet, innerEdges);

Translate([0,0,0], cylWithHole);

if(showCore){
  let coreCyl = makeCore(coreRadius, mainHeight - wall, coreFillet);
  Translate([0,0,0], coreCyl);
  coreCyl;
}

cylWithHole;