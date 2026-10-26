// Per-character stride, weight, attack follow-through and idle breathing.
export const MOTION={
 gojo:{stride:.10,bounce:1,sway:.5,attack:5,breath:.012,tempo:1},
 yuji:{stride:.19,bounce:1.45,sway:1.4,attack:10,breath:.018,tempo:1.2},
 megumi:{stride:.12,bounce:.65,sway:.6,attack:4,breath:.010,tempo:.95},
 nobara:{stride:.16,bounce:1.1,sway:1.6,attack:8,breath:.014,tempo:1.08},
 yuta:{stride:.13,bounce:.8,sway:.8,attack:6,breath:.016,tempo:1},
 maki:{stride:.20,bounce:.7,sway:1.2,attack:12,breath:.011,tempo:1.15},
 fly:{stride:.18,bounce:5,sway:3,attack:12,breath:.045,tempo:1.6},
 lurker:{stride:.17,bounce:2,sway:4,attack:10,breath:.035,tempo:.85},
 finger:{stride:.12,bounce:1,sway:2,attack:7,breath:.03,tempo:.8},
 jogo:{stride:.10,bounce:2,sway:1,attack:6,breath:.025,tempo:1.1},
 hanami:{stride:.08,bounce:1,sway:2,attack:8,breath:.02,tempo:.7},
 mahito:{stride:.19,bounce:3,sway:4,attack:13,breath:.04,tempo:1.2},
 sukuna:{stride:.13,bounce:1,sway:.6,attack:11,breath:.015,tempo:1},
 panda:{stride:.10,bounce:2,sway:2,attack:5,breath:.02,tempo:.8},
 dog:{stride:.20,bounce:3,sway:1,attack:12,breath:.015,tempo:1.3},
 nue:{stride:.2,bounce:6,sway:3,attack:10,breath:.04,tempo:1.4},
 rika:{stride:.12,bounce:4,sway:2,attack:15,breath:.03,tempo:.9}
};
export function motion(id){return MOTION[id]||MOTION.gojo;}
