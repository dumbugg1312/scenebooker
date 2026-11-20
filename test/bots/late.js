'use strict';
// test/bots/late.js — the Late bot (06-harness section 4): the Checklist bot, but it plans no job of the TELLING group for a show
// until 8 days before it. Everything else is the usual. Its balance target is heads / Par of 0.40 to 0.50, Name under 12 after a year
// and regulars under 25 (06-harness 5.2): lateness is the largest lever the player controls (mechanics 3.5).
const checklist = require('./checklist.js');

module.exports = checklist.make({ name: 'late', lateTelling: 8 });
