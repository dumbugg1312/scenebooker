/* State lines for the national maps: interior borders of the lower 48, coarse, as runs of [lat, lon].
 * Coastlines are the outline's job; each map clips these to its own outline. */
(function () {
  'use strict';
  var LINES = [
      [[46.25, -124], [46.2, -123], [45.6, -122.3], [45.7, -121.2], [45.9, -119.3], [46, -118.98], [46, -116.92]],
      [[46, -116.92], [46.4, -117.04], [49, -117.04]],
      [[46, -116.92], [45.6, -116.5], [44.9, -116.85], [44.3, -117.2], [43.8, -117.03], [42, -117.03]],
      [[42, -124.3], [42, -111.05]],
      [[42, -120], [39, -120], [35, -114.63]],
      [[35, -114.63], [34.3, -114.15], [33.4, -114.7], [32.72, -114.72]],
      [[35, -114.63], [35.5, -114.67], [36.1, -114.74], [36.1, -114.05], [42, -114.05]],
      [[49, -116.05], [48, -116.05], [47.4, -115.7], [46.6, -114.4], [45.6, -114.5], [45.5, -113.8], [44.4, -112.8], [44.5, -111.5], [44.5, -111.05], [42, -111.05], [41, -111.05], [41, -102.05], [40, -102.05], [40, -95.3]],
      [[44.5, -111.05], [45, -111.05], [45, -104.05]],
      [[49, -104.05], [41, -104.05]],
      [[37, -114.05], [37, -94.62]],
      [[41, -109.05], [31.33, -109.05]],
      [[40, -102.05], [37, -102.05]],
      [[37, -103], [32, -103], [32, -106.6], [31.8, -106.5]],
      [[36.5, -103], [36.5, -100], [34.56, -100], [33.9, -98.5], [33.8, -97], [33.7, -96], [33.6, -94.5], [33.55, -94.04], [32, -94.04], [31, -93.6], [29.7, -93.8]],
      [[45.94, -104.05], [45.94, -96.56]],
      [[43, -104.05], [43, -98.5], [42.8, -97], [42.5, -96.5], [41.5, -96], [40.6, -95.8], [40, -95.3], [39.1, -94.6], [37, -94.62], [36.5, -94.62], [35.4, -94.43], [33.6, -94.5]],
      [[49, -97.2], [47.9, -97.1], [46.6, -96.8], [45.94, -96.56], [45.3, -96.45], [43.5, -96.45], [42.5, -96.5]],
      [[43.5, -96.45], [43.5, -91.22], [44.3, -91.9], [44.8, -92.8], [45.6, -92.9], [46.1, -92.3], [46.7, -92.1]],
      [[40.6, -95.8], [40.6, -91.7], [40.4, -91.4]],
      [[43.5, -91.22], [42.5, -90.65], [41.5, -90.6], [40.6, -91.1], [40.4, -91.4], [39.7, -91.3], [38.9, -90.2], [38, -89.9], [37, -89.2], [36.5, -89.5], [36, -89.7], [35, -90.1], [34, -91], [33, -91.15], [32, -91.3], [31, -91.6], [31, -89.73], [30.2, -89.6]],
      [[42.5, -90.65], [42.5, -87.8]],
      [[46.6, -90.4], [46, -90], [45.9, -88.1], [45.1, -87.6]],
      [[41.76, -87.53], [39.4, -87.53], [38.6, -87.6], [37.8, -88], [37.4, -88.1], [37, -89.2]],
      [[41.76, -86.8], [41.76, -84.8], [41.7, -83.45]],
      [[41.76, -84.8], [39.1, -84.82]],
      [[37.8, -88], [37.9, -87], [38, -86.5], [38.3, -85.8], [38.8, -84.9], [39.1, -84.82], [38.7, -83.7], [38.4, -82.6], [39, -82], [39.7, -80.8], [40.6, -80.52], [42.27, -80.52]],
      [[39.72, -80.52], [39.72, -75.79]],
      [[38.4, -82.6], [37.5, -82], [37.3, -81.7], [37.5, -81], [38, -80], [38.5, -79.6], [39.2, -78.4], [39.4, -77.8]],
      [[39.72, -79.48], [39.2, -79.48], [39.6, -78.5], [39.4, -77.8], [38.9, -77.1], [38, -76.3]],
      [[37.3, -81.7], [36.6, -83.7]],
      [[36.5, -89.5], [36.6, -88.05], [36.6, -83.7], [36.55, -75.9]],
      [[36.55, -81.7], [36, -82.6], [35.6, -83.5], [35, -84.3], [35, -90.1]],
      [[36.5, -94.62], [36.5, -90.15], [36, -90.4], [36, -89.7]],
      [[33, -94.04], [33, -91.15]],
      [[35, -88.2], [34, -88.1], [31.9, -88.45], [30.4, -88.4]],
      [[35, -85.6], [32.8, -85.2], [31.9, -85.1], [31, -85], [30.7, -84.9], [30.7, -82.1], [30.6, -81.5]],
      [[31, -87.6], [31, -85]],
      [[31, -87.6], [30.3, -87.5]],
      [[35, -84.3], [35, -83.1], [34.5, -82.9], [33.6, -82.2], [32.5, -81.4], [32, -80.9]],
      [[35.2, -83.1], [35.2, -82], [35.1, -81], [34.8, -80.8], [34.8, -79.7], [33.85, -78.55]],
      [[38, -75.6], [38, -75.2]],
      [[39.83, -75.4], [39.72, -75.79], [38.45, -75.7], [38.45, -75.05]],
      [[42.27, -79.76], [42, -79.76], [42, -75.35], [41.36, -74.7], [40.8, -75.1], [40.2, -74.8], [39.85, -75.3], [39.4, -75.55], [38.9, -74.95]],
      [[41.36, -74.7], [41, -73.9]],
      [[41, -73.65], [42.05, -73.5], [42.75, -73.27], [43.6, -73.3], [45, -73.35]],
      [[42.05, -73.5], [42.02, -71.8], [41.95, -71.38], [41.5, -71.1]],
      [[42.02, -71.8], [41.33, -71.85]],
      [[42.73, -72.46], [43.6, -72.3], [44.3, -72], [45, -71.5]],
      [[42.75, -73.27], [42.73, -72.46], [42.7, -71.2], [42.87, -70.8]],
      [[43.08, -70.7], [43.6, -71], [45.3, -71.08]]
    ];
  /** SVG path data for the state lines in SB.geo.project space, shifted by (dx, dy). */
  /** The same lines as runs of [x, y] points, shifted by (dx, dy): for telling which side of a line a point is on. */
  SB.stateLinesPts = function (dx, dy) {
    dx = dx || 0; dy = dy || 0;
    return LINES.map(function (run) { return run.map(function (c) { var q = SB.geo.project(c[0], c[1]); return [q.x + dx, q.y + dy]; }); });
  };
  /** The closed areas a set of lines cuts the map into, as polygons of [x, y] (the outer area left out).
   *  runs: polylines of [x, y]; the coast goes in as one closed run. A line that stops just short of another line
   *  (coarse data) is stretched until it meets one, up to `reach` units; ends that still meet nothing are dropped. */
  SB.lineFaces = function (runs, reach) {
    var segs = [], EPS = 1e-7, i, j;
    reach = reach || 20;
    runs.forEach(function (run) { for (var k = 1; k < run.length; k++) segs.push([run[k - 1].slice(), run[k].slice()]); });
    function hit(a, b, c, d) {   /* where segment ab meets cd: [t on ab, u on cd] or null */
      var rx = b[0] - a[0], ry = b[1] - a[1], sx = d[0] - c[0], sy = d[1] - c[1], den = rx * sy - ry * sx, t, u;
      if (Math.abs(den) < 1e-12) return null;
      t = ((c[0] - a[0]) * sy - (c[1] - a[1]) * sx) / den; u = ((c[0] - a[0]) * ry - (c[1] - a[1]) * rx) / den;
      return t > -EPS && t < 1 + EPS && u > -EPS && u < 1 + EPS ? [t, u] : null;
    }
    /* points closer than TOL are one point: looked up in the grid cell and its neighbours, so rounding never splits a corner */
    var TOL = 0.08, grid = {}, nextId = 0;
    function key(p) {
      var gx = Math.floor(p[0] / TOL), gy = Math.floor(p[1] / TOL), a, b, c, n;
      for (a = -1; a <= 1; a++) for (b = -1; b <= 1; b++) {
        c = grid[(gx + a) + ',' + (gy + b)];
        if (c) for (n = 0; n < c.length; n++) if (Math.hypot(c[n].p[0] - p[0], c[n].p[1] - p[1]) < TOL) return c[n].id;
      }
      c = grid[gx + ',' + gy] = grid[gx + ',' + gy] || [];
      c.push({ p: p, id: 'n' + (nextId++) });
      return c[c.length - 1].id;
    }
    /* stretch loose ends: an end point no other segment touches is pushed along its own direction to the nearest line */
    var count = {};
    segs.forEach(function (s) { count[key(s[0])] = (count[key(s[0])] || 0) + 1; count[key(s[1])] = (count[key(s[1])] || 0) + 1; });
    segs.forEach(function (s, si) {
      [0, 1].forEach(function (end) {
        var p = s[end], q = s[1 - end], dx, dy, len, far, best = null;
        if (count[key(p)] !== 1) return;
        dx = p[0] - q[0]; dy = p[1] - q[1]; len = Math.hypot(dx, dy) || 1;
        far = [p[0] + dx / len * reach, p[1] + dy / len * reach];
        segs.forEach(function (o, oi) {
          var h;
          if (oi === si) return;
          h = hit(p, far, o[0], o[1]);
          if (h && (best === null || h[0] < best)) best = h[0];
        });
        /* already resting on a line (best about 0): leave it; otherwise stretch it to the first line ahead */
        if (best !== null && best * reach <= 0.05) return;
        if (best !== null) { s[end] = [p[0] + (far[0] - p[0]) * best, p[1] + (far[1] - p[1]) * best]; return; }
        /* nothing straight ahead: join the closest point of any other line within reach */
        var near = null, nd = reach;
        segs.forEach(function (o, oi) {
          if (oi === si) return;
          var ax = o[0][0], ay = o[0][1], bx = o[1][0] - ax, by = o[1][1] - ay, L2 = bx * bx + by * by, t, cx, cy, d;
          t = L2 ? Math.max(0, Math.min(1, ((p[0] - ax) * bx + (p[1] - ay) * by) / L2)) : 0;
          cx = ax + bx * t; cy = ay + by * t; d = Math.hypot(cx - p[0], cy - p[1]);
          if (d > 0.05 && d < nd) { nd = d; near = [cx, cy]; }
        });
        if (near) segs.push([p.slice(), near]);
      });
    });
    /* cut every segment where it meets another, and join the pieces at shared points */
    var cuts = segs.map(function () { return [0, 1]; });
    for (i = 0; i < segs.length; i++) for (j = i + 1; j < segs.length; j++) {
      var h = hit(segs[i][0], segs[i][1], segs[j][0], segs[j][1]);
      if (h) { cuts[i].push(Math.min(1, Math.max(0, h[0]))); cuts[j].push(Math.min(1, Math.max(0, h[1]))); }
    }
    var pts = {}, adj = {};
    function node(p) { var k = key(p); if (!pts[k]) { pts[k] = p; adj[k] = {}; } return k; }
    segs.forEach(function (s, si) {
      var ts = cuts[si].sort(function (a, b) { return a - b; }), prev = null;
      ts.forEach(function (t) {
        var k = node([s[0][0] + (s[1][0] - s[0][0]) * t, s[0][1] + (s[1][1] - s[0][1]) * t]);
        if (prev !== null && prev !== k) { adj[prev][k] = true; adj[k][prev] = true; }
        prev = k;
      });
    });
    /* drop loose ends (lines poking past the coast, dead ends) until every point closes a loop */
    var gone = true, k2;
    while (gone) {
      gone = false;
      for (k2 in adj) {
        var nb = Object.keys(adj[k2]);
        if (nb.length < 2) { nb.forEach(function (n) { delete adj[n][k2]; }); delete adj[k2]; gone = true; }
      }
    }
    /* walk each face: from edge u->v, turn to the neighbour of v that comes next clockwise after u */
    var order = {};
    Object.keys(adj).forEach(function (u) {
      var p = pts[u];
      order[u] = Object.keys(adj[u]).sort(function (a, b) {
        return Math.atan2(pts[a][1] - p[1], pts[a][0] - p[0]) - Math.atan2(pts[b][1] - p[1], pts[b][0] - p[0]);
      });
    });
    var used = {}, faces = [];
    Object.keys(adj).forEach(function (u0) {
      order[u0].forEach(function (v0) {
        var u = u0, v = v0, ring = [], guard = 0, area = 0, o, at, w;
        if (used[u + '>' + v]) return;
        while (!used[u + '>' + v] && guard++ < 5000) {
          used[u + '>' + v] = true;
          ring.push(pts[u]);
          o = order[v]; at = o.indexOf(u);
          w = o[(at - 1 + o.length) % o.length];
          u = v; v = w;
        }
        for (var n = 0; n < ring.length; n++) { var a = ring[n], b = ring[(n + 1) % ring.length]; area += a[0] * b[1] - b[0] * a[1]; }
        if (ring.length > 2) faces.push({ pts: ring, area: area / 2 });
      });
    });
    /* in screen space (y down) the faces come out one way round and the outside the other: keep the inside ones */
    var sign = faces.reduce(function (m, f) { return Math.abs(f.area) > Math.abs(m.area) ? f : m; }, { area: 0 }).area;
    return faces.filter(function (f) { return f.area * sign < 0; }).map(function (f) { return f.pts; });
  };
  SB.stateLinesD = function (dx, dy) {
    dx = dx || 0; dy = dy || 0;
    return LINES.map(function (run) {
      return run.map(function (c, i) { var q = SB.geo.project(c[0], c[1]); return (i ? 'L' : 'M') + (q.x + dx).toFixed(1) + ' ' + (q.y + dy).toFixed(1); }).join('');
    }).join('');
  };
})();
