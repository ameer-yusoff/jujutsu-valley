// Gameplay collision is independent of sprite pose, weapon bounds and level.
export const BODY_GEOMETRY=Object.freeze({radius:.45,anchor:Object.freeze({x:64,y:116}),neutralBodyPixels:156,viewport:512,renderUnits:2.2*512/192,debugRect:Object.freeze({x:53,y:77,w:22,h:39})});
export function bodyGeometry(){return BODY_GEOMETRY;}
