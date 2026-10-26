// Collection ownership is persistent; only one sorcerer is deployed.
export const COLLECTION=[
 {id:'yuji',quest:'first_light',hint:'Claim A place beyond the Curtain'},
 {id:'megumi',quest:'forest_supplies',hint:'Claim Supplies for the sanctuary'},
 {id:'nobara',quest:'womb_hunt',hint:'Defeat the Finger Bearer and claim the hunt'},
 {id:'maki',quest:'volcano_hunt',hint:'Defeat Jogo and claim the hunt'},
 {id:'yuta',quest:'soul_hunt',hint:'Defeat Mahito and claim the hunt'}
];
export function collectEligible(s){const added=[];for(const c of COLLECTION)if(s.quests?.claimed?.includes(c.quest)&&!s.recruited.includes(c.id)){s.recruited.push(c.id);added.push(c.id);}return added;}
export function soloRoster(s){s.recruited=[...new Set(['gojo',...(s.recruited||[]),...(s.party||[])])].filter(id=>s.heroes[id]);if(!s.recruited.includes(s.controlled))s.controlled='gojo';s.party=[s.controlled];return s;}
