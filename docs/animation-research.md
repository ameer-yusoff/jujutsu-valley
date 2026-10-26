# Combat animation research and implementation

Reviewed 2026-10-26. Research sources:

- Thomas Vasseur, Motion Twin, [Art Design Deep Dive: Using a 3D pipeline for 2D animation in Dead Cells](https://www.gamedeveloper.com/production/art-design-deep-dive-using-a-3d-pipeline-for-2d-animation-in-i-dead-cells-i-), January 25, 2018. Primary production account: establish key poses and timing first, add interpolation around key poses, use effects for movement and impact, render small without antialiasing. The article also acknowledges pixel flicker and detail limits.
- Mariel Cartwright, [Fluid and Powerful Animation within Frame Restrictions](https://www.gdcvault.com/play/1020575/Animation-Bootcamp-Fluid-and-Powerful), GDC 2014. The indexed session describes Skullgirls and other fighting games. The full Vault page was under maintenance during review; the complete talk was not reviewed. [Speaker slides](https://ubm-twvideo01.s3.amazonaws.com/o1/vault/GDC2014/Presentations/Cartwright_Muriel_Animation_Bootcamp_Fluid.pdf) are a further reading reference.

Applied decisions (our implementation choices, not numeric prescriptions from these sources):

1. Shared timing sampler for the animation library: longer anticipation and settling poses, fast transitions into contact. Keep total clip duration unchanged.
2. Preserve harvest and technique event times so visual contact stays aligned with gameplay. Frame metadata exports the actual variable durations.
3. Clamp one-shot playback at its last frame; idle and locomotion loop. A defeat must not repeatedly restart.
4. Add bounded 25–45ms hitstop for controlled-hero impacts. This is a visual pose hold; simulation event timers continue so combat damage does not change.
5. Reduce exaggerated joint rotation from the previous pass because the rectangular source layers visibly separate at extreme angles.
6. Retain character-specific choreography, pixel edges and staged ultimate sequences.

Quality review must examine silhouettes, foot contact, joint seams, effect readability, timing and recovery at actual game scale. Unique PNG hashes alone do not establish quality. The current renderer still articulates existing character artwork; it is not a newly hand-drawn frame-by-frame library. A complete redraw with character-specific occlusion and perspective remains a separate art production task.
