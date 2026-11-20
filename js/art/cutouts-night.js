/* Scene Booker: js/art/cutouts-night.js (ART)
 * More photo cut-outs for the show night (the line at the door), appended to SB.Cutouts. Load after cutouts.js.
 * Same rules as cutouts.js: printed photos from the booker's own scrap kits, cut out, grayscale, alpha kept.
 *   line-01..03  the Muffs strip in Flipside #74 (1991), RIOT_GRRRL_90S_KIT/09_SCENES_PHOTOS, one person per panel,
 *                cut with the kit's subject mask, waist up (they stand behind the door table).
 * role 'line' = somebody waiting at the door; the night scene also uses the 'standing' and 'back' roles.
 */
(function (SB) {
  'use strict';
  var list = SB.Cutouts;
  if (!list) return;
  /* 2026-11-19: the PUNK_SHOW kits brought a whole 'line' pool into cutouts.js (ids line-01..), which replaced the three
   * Muffs panels this file used to add. Nothing left to append; the hook stays for later additions. */
  [].forEach(function (k) {
    for (var i = 0; i < list.length; i++) if (list[i].id === k.id) return;
    list.push(k);
  });
})(SB);
