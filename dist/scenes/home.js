// GrowthCred homepage stick scenes. Original drawings for this page.
// Runtime: vendored stick.js (MIT © Kamran Ahmed, nilbuild/stick-scene).
// Load after /scenes/stick.js. No numbers, prices, client names or product logos.
(function () {
  const SC = (window.SCENES = window.SCENES || {});
  const R = window.RIG;
  const {
    C, E, P, mix, fig, inkFill, rr, ln, text, seg, breathe, pulse, sparks, circle,
  } = R;

  const GOLD = '#c8a04a';
  const GOLD_SOFT = '#f2c86e';

  function house(g, x, y, w, h, lit) {
    const roofH = 28;
    ln(g, x + 8, y + roofH, x + w / 2, y, 2.2);
    ln(g, x + w / 2, y, x + w - 8, y + roofH, 2.2);
    rr(g, x + 10, y + roofH - 2, w - 20, h - roofH + 2, 3);
    inkFill(g, C.paper, 1.8);
    rr(g, x + w / 2 - 10, y + h - 28, 20, 28, 2);
    inkFill(g, lit > 0.3 ? GOLD_SOFT : C.paper, 1.5, lit > 0.3 ? GOLD : C.ink);
    rr(g, x + 22, y + roofH + 10, 18, 16, 2);
    inkFill(g, lit > 0.2 ? GOLD_SOFT : C.sky, 1.3, C.ink);
    if (lit > 0) {
      g.save();
      g.globalAlpha *= 0.28 * lit;
      circle(g, x + w / 2, y + h / 2 + 8, 26 + lit * 8);
      g.fillStyle = GOLD_SOFT;
      g.fill();
      g.restore();
    }
  }

  function doc(g, x, y, rot, gold, k) {
    if (k !== undefined && k <= 0) return;
    const a = k === undefined ? 1 : k;
    g.save();
    g.translate(x, y);
    g.rotate(rot || 0);
    g.globalAlpha *= a;
    rr(g, -8, -11, 16, 22, 2);
    inkFill(g, gold ? GOLD_SOFT : C.paper, 1.4, gold ? GOLD : C.ink);
    ln(g, -4, -5, 4, -5, 1.2, gold ? GOLD : C.muted);
    ln(g, -4, 0, 4, 0, 1.2, gold ? GOLD : C.muted);
    ln(g, -4, 5, 1, 5, 1.2, gold ? GOLD : C.muted);
    g.restore();
  }

  function core(g, x, y, s) {
    s = s || 1;
    circle(g, x, y, 8 * s);
    inkFill(g, GOLD_SOFT, 1.6, GOLD);
  }

  function padlock(g, x, y, k, closed) {
    if (k !== undefined && k <= 0) return;
    const z = k === undefined ? 1 : k;
    g.save();
    g.translate(x, y);
    g.scale(z, z);
    g.beginPath();
    g.arc(0, -10, 8, Math.PI, 0);
    g.strokeStyle = closed ? GOLD : C.ink;
    g.lineWidth = 2.4;
    g.stroke();
    ln(g, -8, -10, -8, -2, 2.4, closed ? GOLD : C.ink);
    ln(g, 8, -10, 8, -2, 2.4, closed ? GOLD : C.ink);
    rr(g, -12, -4, 24, 20, 4);
    inkFill(g, closed ? GOLD_SOFT : C.paper, 1.7, closed ? GOLD : C.ink);
    circle(g, 0, 6, 2.4);
    inkFill(g, closed ? GOLD : C.ink, 1);
    g.restore();
  }

  function label(g, s, x) {
    text(g, s, x, 8, 8.5, C.ink);
  }

  function restPose(t) {
    return breathe(P({ hF: [12, -60], hB: [-4, -52] }), t);
  }

  function idleGlance(pose, t, period) {
    return mix(pose, P({ hF: [10, -96], head: [7, -116], hB: [-4, -54] }), pulse(t, period || 6, 2, 2.2));
  }

  // ---------- homeHats: the work still runs through the owner ----------
  SC.homeHats = {
    dur: 6.4,
    width: 420,
    label: 'Papers fly to a person, then they walk to their own building and it lights up.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const START = -40;
      const AT = 80;
      let x = T < 0 ? AT : START;
      let pose = restPose(t);
      let lit = T < 0 ? 0.7 : 0.12;
      if (T < 0) {
        pose = idleGlance(pose, t);
        x = AT;
      } else if (T < 3.0) {
        const catchK = E.soft(seg(T, 0.2, 1.1));
        pose = mix(restPose(t), P({ hF: [28, -100], hB: [-28, -100], head: [4, -118] }), catchK);
        x = START;
      } else {
        const walkK = E.soft(seg(T, 3.0, 4.6));
        x = START + (AT - START) * walkK;
        const gait = { ph: walkK * 4.2, amp: 1 - E.soft(seg(T, 4.2, 4.8)) };
        pose = mix(restPose(t), P({ hF: [18, -70], hB: [-10, -62] }), gait.amp * 0.4);
        lit = 0.12 + 0.7 * E.soft(seg(T, 4.2, 5.2));
        if (T > 4.8) pose = idleGlance(restPose(t), t);
      }
      house(g, 40, -150, 130, 150, lit);
      if (lit > 0.4) core(g, 105, -70, 1);
      // Three papers (the work) fly in, then settle as the person leaves them.
      const origins = [
        { x: -180, y: -130, rot: -0.4 },
        { x: -40, y: -170, rot: 0.2 },
        { x: 20, y: -40, rot: 0.5 },
      ];
      origins.forEach((o, i) => {
        const arrive = T < 0 ? 1 : E.soft(seg(T, 0.15 + i * 0.25, 1.4 + i * 0.2));
        const leave = T < 0 ? 0 : E.soft(seg(T, 3.0, 3.8));
        const k = arrive * (1 - leave * 0.85);
        if (k <= 0.02 && T >= 3.0) return;
        const tx = T < 0 ? START + (i - 1) * 22 : o.x + (START + (i - 1) * 16 - o.x) * arrive;
        const ty = T < 0 ? -118 : o.y + (-118 - o.y) * arrive;
        doc(g, tx, ty, o.rot * (1 - arrive), i === 1, T < 0 ? 0.85 : k);
      });
      fig(g, pose, x, 0, { wave: S.wave, wt: S.wt });
      label(g, 'you', x);
    },
  };

  // ---------- homeOwn: your own intelligence, in the building ----------
  SC.homeOwn = {
    dur: 6.2,
    width: 400,
    label: 'A person walks to their building, a gold padlock closes on it, and a light comes on inside.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const HOME = -150;
      const AT = -20;
      let x = T < 0 ? AT : HOME;
      let pose = restPose(t);
      const lit = T < 0 ? 0.75 : 0.15 + 0.7 * E.soft(seg(T, 2.8, 3.8));
      if (T < 0) {
        pose = idleGlance(pose, t);
        x = AT;
      } else {
        const walkK = E.soft(seg(T, 0.2, 2.4));
        x = HOME + (AT - HOME) * walkK;
        if (T > 2.6) pose = mix(pose, P({ hF: [28, -90], hB: [-4, -54], head: [8, -114] }), E.soft(seg(T, 2.6, 3.4)));
        else pose = restPose(t);
      }
      house(g, 20, -150, 130, 150, lit);
      const lockK = T < 0 ? 1 : E.soft(seg(T, 3.2, 4.2));
      padlock(g, 85, -96, lockK, T < 0 || T > 3.6);
      if (T < 0 || T > 3.6) core(g, 85, -60, 1);
      sparks(g, 85, -118, T < 0 ? 0 : seg(T, 3.6, 4.5), 16, 6, GOLD);
      fig(g, pose, x, 0, { wave: S.wave, wt: S.wt });
      label(g, 'you', x);
    },
  };

  // ---------- homeAudit: a close look at the hours ----------
  SC.homeAudit = {
    dur: 6,
    width: 380,
    label: 'A person looks on as a magnifying glass moves across a document and a gold highlight follows it.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const YOU = -140;
      let pose = restPose(t);
      if (T < 0) pose = idleGlance(pose, t);
      else pose = mix(pose, P({ hF: [34, -94], hB: [-4, -54], head: [10, -114] }), E.soft(seg(T, 0.3, 1.1)) * (1 - E.soft(seg(T, 5.2, 5.8))));
      fig(g, pose, YOU, 0, { wave: S.wave, wt: S.wt });
      label(g, 'you', YOU);
      rr(g, -40, -140, 90, 110, 5);
      inkFill(g, C.paper, 1.7);
      ln(g, -26, -120, 34, -120, 1.4, C.muted);
      ln(g, -26, -104, 34, -104, 1.4, C.muted);
      ln(g, -26, -88, 14, -88, 1.4, C.muted);
      const u = T < 0 ? 0.2 + 0.15 * Math.sin(t * 0.8) : E.soft(seg(T, 0.4, 3.6));
      const mx = 0 + 50 * u;
      const my = -100 + 30 * Math.sin(u * Math.PI);
      g.save();
      g.globalAlpha *= T < 0 ? 0.35 : 0.5 * (1 - seg(T, 5.4, 6));
      rr(g, mx - 18, my - 8, 36, 16, 3);
      inkFill(g, GOLD_SOFT, 0.8, GOLD);
      g.restore();
      circle(g, mx, my, 24);
      inkFill(g, 'rgba(255,255,255,0.12)', 3, GOLD);
      const ang = 0.7;
      ln(g, mx + Math.cos(ang) * 24, my + Math.sin(ang) * 24, mx + Math.cos(ang) * 48, my + Math.sin(ang) * 48, 4, GOLD);
    },
  };

  // ---------- homeDeploy: the box goes into the building ----------
  SC.homeDeploy = {
    dur: 6,
    width: 400,
    label: 'A gold box slides into a building and a light comes on inside.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      house(g, 40, -150, 130, 150, T < 0 ? 0.15 : 0.15 + 0.7 * E.soft(seg(T, 2.6, 3.4)) * (1 - seg(T, 5.5, 6) * 0.3));
      const k = T < 0 ? 0 : E.soft(seg(T, 0.5, 2.8));
      const fade = T < 0 ? 0 : 1 - seg(T, 2.6, 3.4);
      const bx = T < 0 ? -140 : -140 + 190 * k;
      const by = -60;
      if (T < 0 || fade > 0.05) {
        g.save();
        g.globalAlpha *= T < 0 ? 1 : fade;
        rr(g, bx, by, 36, 28, 4);
        inkFill(g, GOLD_SOFT, 1.6, GOLD);
        g.restore();
      }
      if (T < 0 || T > 2.8) {
        core(g, 105, -70, 1);
        sparks(g, 105, -90, T < 0 ? 0 : seg(T, 2.9, 3.6), 16, 6, GOLD);
      }
    },
  };

  // ---------- homeEmbed: it keeps running ----------
  SC.homeEmbed = {
    dur: 6,
    width: 360,
    label: 'A person stands beside a gold core in a loop that turns and keeps going.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const YOU = -130;
      let pose = restPose(t);
      if (T < 0) pose = idleGlance(pose, t);
      else pose = mix(pose, P({ hF: [30, -92], head: [8, -114] }), E.soft(seg(T, 0.3, 1.0)) * (1 - E.soft(seg(T, 5.2, 5.8))));
      fig(g, pose, YOU, 0, { wave: S.wave, wt: S.wt });
      label(g, 'you', YOU);
      const spin = T < 0 ? t * 0.15 : E.soft(seg(T, 0.3, 3.4)) * Math.PI * 2;
      g.save();
      g.translate(50, -80);
      g.rotate(T < 0 ? 0 : spin);
      g.beginPath();
      g.arc(0, 0, 50, 0.4, Math.PI * 2 - 0.6);
      g.strokeStyle = C.ink;
      g.lineWidth = 2.2;
      g.stroke();
      const a = Math.PI * 2 - 0.6;
      const ax = Math.cos(a) * 50;
      const ay = Math.sin(a) * 50;
      g.save();
      g.translate(ax, ay);
      g.rotate(a + Math.PI / 2);
      ln(g, 0, 0, -8, -8, 2.2);
      ln(g, 0, 0, 8, -8, 2.2);
      g.restore();
      g.restore();
      core(g, 50, -80, 1.15);
      sparks(g, 50, -100, T < 0 ? 0 : seg(T, 3.2, 4.0), 14, 6, GOLD);
    },
  };
})();
