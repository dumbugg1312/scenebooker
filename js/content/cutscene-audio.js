/* Scene Booker — content/cutscene-audio.js
 * What a cutscene sounds like (js/audio/cutscene-audio.js plays it). Nothing here is used anywhere else in the game.
 * Data only: one assignment, no functions.
 *
 *   MOODS         the score moods. A cutscene plays one cue of its mood (assets/cutscene/music/<mood>-NN.mp3).
 *                   warm   fond, small room, friends          tense  cops at the door, a fight, money short
 *                   sad    a room lost, a bad month           big    a packed night, milestones, stage dives
 *                   road   vans, tours, postcards, maps       quiet  late, the empty room after, phone glow
 *   MOOD          cutscene key -> mood. A cutscene's own `mood` field (content/story.js) wins over this.
 *   MOOD_PREFIX   [prefix, mood] for keys not listed (new moments and milestones); the first match wins.
 *   MOOD_DEFAULT  when nothing matches.
 *   ART           art key -> { amb, bleed, hit, hold }
 *                   amb    the ambience bed under that picture (assets/cutscene/amb/<id>.mp3) or null for none
 *                   hold   true: a close-up; when a bed is already playing it keeps playing, `amb` is only for a cold start
 *                   bleed  'near' (in the room with the band, heard through the crowd), 'far' (through a wall, from
 *                          the yard) or null. The band is the frame's band; its loop (SB.Audio.loopFor) is what bleeds.
 *                   hit    a cue (SB.Sfx 'cs.*'), a list of cues, or null: the moment in the picture
 *   FRAMES        cutscene key -> { frame index: { amb, bleed, hit } }: what the words of that frame call for. A field
 *                 that is present (even null) replaces the picture's.
 *   HIT_PREFIX    [prefix, frame index, cue] for keys with no FRAMES entry of their own (new versions of a moment).
 *   DROP          a DROP cutscene sits on the desk: this bed under every object, no bleed, no picture hit.
 * A frame in content/story.js may also set `amb`, `bleed` or `sfx` itself; that wins over everything here.
 */
SB.Content.cutsceneAudio = {

  MOODS: ['warm', 'tense', 'sad', 'big', 'road', 'quiet'],
  MOOD_DEFAULT: 'quiet',

  MOOD: {
    GOING_AWAY_open: 'warm',
    GOING_AWAY_name: 'warm',
    GOING_AWAY_setup: 'warm',
    DOORS_AT_8_close: 'warm',
    ANSWER_EVERYONE_open: 'tense',
    OUT_OF_STATE_open: 'road',
    OUT_OF_STATE_close: 'warm',
    THIN_open: 'sad',
    FACES_open: 'warm',
    ASK_FOR_YOU_open: 'warm',
    POSTCARD_open: 'road',
    SWAP_open: 'road',
    YOUR_BAND_open: 'big',
    LAST_CALL_open: 'sad',
    LAST_CALL_close: 'warm',
    ALL_AGES_open: 'big',
    ALL_AGES_close: 'quiet',
    WATCHING_open: 'tense',
    DANA_BRIDGE: 'road',
    DANA_BAR_DOOR: 'warm',
    DANA_TUESDAY: 'quiet',
    DANA_BAD_MONTH: 'sad',
    ROOM_GONE: 'sad',
    COUCH: 'sad',
    M_LINE_IN_1: 'big',
    M_LINE_IN_2: 'big',
    M_LINE_CAP_1: 'tense',
    M_LINE_OUT_1: 'warm',
    M_KNOCK_TALK_1: 'tense',
    M_KNOCK_TALK_2: 'tense',
    M_KNOCK_DOWN_1: 'tense',
    M_KNOCK_END_1: 'tense',
    M_FIGHT_1: 'tense',
    M_FIGHT_CALL_1: 'tense',
    M_PA_THROUGH_1: 'warm',
    M_PA_BORROW_1: 'warm',
    M_ROOMMATE_1: 'quiet',
    M_VAN_LATE_1: 'road',
    M_RAIN_1: 'quiet',
    M_HURT_1: 'tense',
    M_TIN_SHORT_1: 'tense',
    M_GOOD_1: 'big',
    M_GOOD_2: 'big',
    M_GOOD_3: 'big',
    M_ROUGH_1: 'quiet',
    M_ROUGH_2: 'quiet',
    MS_TEN: 'warm',
    MS_KIDS_BAND: 'warm',
    MS_BACK_THROUGH: 'road',
    MS_A_YEAR: 'warm',
    MS_FIRST_PACKED: 'big',
    MS_FIFTY: 'big'
  },

  MOOD_PREFIX: [
    ['M_GOOD_', 'big'], ['M_LINE_IN_', 'big'], ['M_LINE_CAP_', 'tense'], ['M_LINE_', 'warm'],
    ['M_ROUGH_', 'quiet'], ['M_KNOCK_', 'tense'], ['M_FIGHT', 'tense'], ['M_HURT_', 'tense'], ['M_TIN_', 'tense'],
    ['M_VAN_', 'road'], ['M_RAIN_', 'quiet'], ['M_ROOMMATE_', 'quiet'], ['M_PA_', 'warm'], ['M_', 'warm'],
    ['MS_FIRST_', 'big'], ['MS_BACK_', 'road'], ['MS_', 'warm'],
    ['DANA_BAD', 'sad'], ['DANA_', 'quiet'], ['ROOM_', 'sad']
  ],

  ART: {
    /* the show, from inside */
    STAGE_BAND:     { amb: 'crowd',    bleed: 'near', hit: null },
    CROWD_FRONT:    { amb: 'crowd',    bleed: 'near', hit: null },
    STAGE_DIVE:     { amb: 'crowd',    bleed: 'near', hit: 'cs.roar' },
    SOLO_SET:       { amb: 'crowd',    bleed: 'near', hit: null },
    /* the show, from outside it */
    CARPORT_NIGHT:  { amb: 'chatter',  bleed: 'far',  hit: null },
    SIDEWALK_LINE:  { amb: 'chatter',  bleed: 'far',  hit: null },
    YARD_NIGHT:     { amb: 'chatter',  bleed: 'far',  hit: null },
    DOOR_TABLE:     { amb: 'chatter',  bleed: 'far',  hit: null },
    RAIN_CARPORT:   { amb: 'rain',     bleed: 'far',  hit: 'cs.thunder' },
    POLICE_LIGHTS:  { amb: 'radio',    bleed: null,   hit: 'cs.chirp' },     /* the amps go off */
    /* after, and the rooms */
    CARPORT_EMPTY:  { amb: 'crickets', bleed: null,   hit: null },
    STACK_CHAIRS:   { amb: 'fluoro',   bleed: null,   hit: 'cs.chairs' },
    EMPTY_ROOM:     { amb: 'fluoro',   bleed: null,   hit: null },
    BROKEN_GLASS:   { amb: 'fluoro',   bleed: null,   hit: 'cs.bottle' },
    STOREFRONT:     { amb: 'street',   bleed: null,   hit: null },
    FOR_SALE:       { amb: 'street',   bleed: null,   hit: null },
    FLYER_WALL:     { amb: 'street',   bleed: null,   hit: 'cs.staple' },
    BAR_DOOR:       { amb: 'bar',      bleed: null,   hit: null },
    /* the road */
    VAN_CURB:       { amb: 'van',      bleed: null,   hit: 'cs.vanDoor' },
    MAP_ROUTE:      { amb: 'highway',  bleed: null,   hit: null },
    BRIDGE:         { amb: 'wind',     bleed: null,   hit: null },
    /* home */
    KITCHEN_FLOOR:  { amb: 'kitchen',  bleed: null,   hit: null },
    FLOOR_SLEEP:    { amb: 'room',     bleed: null,   hit: null },
    INBOX_STACK:    { amb: 'room',     bleed: null,   hit: null },
    PHONE_SCREEN:   { amb: 'room',     bleed: null,   hit: 'cs.buzz' },
    POSTCARD_FRONT: { amb: 'room',     bleed: null,   hit: 'cs.mailslot' },
    HANDS_TIN:      { amb: 'kitchen',  bleed: null,   hit: 'cs.coins', hold: true }
  },

  FRAMES: {
    OUT_OF_STATE_close: { 1: { amb: 'street' } },                              /* swept in the morning */
    ANSWER_EVERYONE_open: { 2: { hit: null } },                                /* one buzz is enough */
    LAST_CALL_close:    { 0: { hit: 'cs.doorSlam' } },
    ALL_AGES_open:      { 0: { hit: 'cs.doorSlam' } },
    M_LINE_IN_1:        { 1: { hit: 'cs.cheer' } },
    M_KNOCK_TALK_1:     { 0: { hit: ['cs.knock', 'cs.chirp'] }, 1: { bleed: null } },   /* hands off the strings */
    M_KNOCK_TALK_2:     { 0: { hit: 'cs.knock' } },
    M_KNOCK_DOWN_1:     { 0: { hit: 'cs.knock' } },
    M_KNOCK_END_1:      { 0: { hit: ['cs.knock', 'cs.chirp'] }, 1: { bleed: null } },   /* lights on */
    M_FIGHT_1:          { 1: { hit: 'cs.bottle' } },
    M_FIGHT_CALL_1:     { 0: { hit: 'cs.bottle', bleed: null }, 1: { bleed: null } },
    M_PA_THROUGH_1:     { 0: { hit: 'cs.feedback' } },
    M_PA_BORROW_1:      { 0: { hit: 'cs.feedback', bleed: null } },
    M_ROOMMATE_1:       { 1: { bleed: null, hit: 'cs.cheer' } },                /* a borrowed guitar, not the band */
    M_VAN_LATE_1:       { 0: { amb: 'chatter' } },                              /* 9:30, at the door */
    M_HURT_1:           { 0: { bleed: null }, 1: { bleed: null } },             /* the music stopped */
    M_GOOD_1:           { 0: { hit: ['cs.roar', 'cs.cheer'] } },
    M_GOOD_2:           { 0: { hit: 'cs.cheer' }, 1: { bleed: null } },         /* the porch light, after */
    M_GOOD_3:           { 0: { hit: 'cs.cheer' } },
    MS_KIDS_BAND:       { 2: { hit: 'cs.cheer' } },
    MS_FIRST_PACKED:    { 2: { hit: 'cs.roar' } },
    ROOM_GONE:          { 0: { amb: 'street' } },                               /* the note is the tape: DROP 'note' */
    DANA_BRIDGE:        { 0: { amb: 'room' } }
  },

  HIT_PREFIX: [
    ['M_KNOCK_', 0, 'cs.knock'],
    ['M_GOOD_', 0, 'cs.cheer']
  ],

  DROP: { amb: 'room' }
};
