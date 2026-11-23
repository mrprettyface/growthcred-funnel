// GrowthCred /private-ai scenes. Original drawings for this page.
// Runtime: vendored stick.js (MIT © Kamran Ahmed, nilbuild/stick-scene).
// Load after /scenes/stick.js. No numbers, prices, client names or product logos.
(function () {
  const SC = (window.SCENES = window.SCENES || {});
  const R = window.RIG;
  const {
    C, E, P, mix, legs, walkSeg, fig, inkFill, rr, ln, text, seg, breathe,
    pulse, lp, sparks, tickBadge, circle,
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

  function cloud(g, x, y, s) {
    s = s || 1;
    g.save();
    g.translate(x, y);
    g.scale(s, s);
    g.beginPath();
    g.arc(-16, 4, 12, 0, Math.PI * 2);
    g.arc(0, -2, 16, 0, Math.PI * 2);
    g.arc(16, 4, 12, 0, Math.PI * 2);
    g.closePath();
    inkFill(g, C.sky, 1.6);
    g.restore();
  }

  function globe(g, x, y, r) {
    circle(g, x, y, r);
    inkFill(g, C.paper, 1.7);
    ln(g, x - r, y, x + r, y, 1.3);
    g.save();
    g.beginPath();
    g.ellipse(x, y, r * 0.45, r, 0, 0, Math.PI * 2);
    g.strokeStyle = C.ink;
    g.lineWidth = 1.3;
    g.stroke();
    g.beginPath();
    g.ellipse(x, y, r * 0.85, r * 0.35, 0, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }

  function axes(g, x, y, w, h) {
    ln(g, x, y, x, y - h, 2);
    ln(g, x, y, x + w, y, 2);
  }

  function desk(g, x, y, w) {
    rr(g, x, y, w, 6, 2);
    inkFill(g, C.wood, 1.5);
    ln(g, x + 8, y + 6, x + 4, 0, 2);
    ln(g, x + w - 8, y + 6, x + w - 4, 0, 2);
  }

  function laptop(g, x, y) {
    rr(g, x, y - 22, 28, 18, 2);
    inkFill(g, '#2b2b2b', 1.4);
    rr(g, x - 4, y - 4, 36, 5, 1.5);
    inkFill(g, '#e9e9e9', 1.3);
  }

  function chair(g, x) {
    ln(g, x, -52, x, 0, 2);
    ln(g, x, -22, x + 22, -22, 2);
    ln(g, x + 22, -22, x + 22, 0, 2);
    ln(g, x + 22, -22, x + 22, -30, 2);
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

  function core(g, x, y, s) {
    s = s || 1;
    circle(g, x, y, 8 * s);
    inkFill(g, GOLD_SOFT, 1.6, GOLD);
  }

  function label(g, s, x) {
    // Just under the feet, not down in the floor band where muted type disappears.
    text(g, s, x, 8, 8.5, C.ink);
  }

  function restPose(t) {
    return breathe(P({ hF: [12, -60], hB: [-4, -52] }), t);
  }

  function idleGlance(pose, t, period) {
    return mix(pose, P({ hF: [10, -96], head: [7, -116], hB: [-4, -54] }), pulse(t, period || 6, 2, 2.2));
  }

  // ---------- hero: your own AI, inside your building ----------
  SC.hero = {
    dur: 6.4,
    width: 400,
    label: 'A person walks to their building, their own AI lights up inside, and they stand beside it.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const HOME = -150;
      const AT = -28;
      let x = HOME;
      let gait = { ph: 0, amp: 0 };
      let pose = restPose(t);
      let lit = 0.18;
      if (T < 0) {
        pose = idleGlance(pose, t);
      } else {
        const fade = 1 - seg(T, this.dur - 0.5, this.dur);
        const ws = T < 3.4 ? walkSeg(T, 0, 0.9, HOME, AT) : walkSeg(T, 5.1, 5.8, AT, HOME);
        x = ws.x;
        gait = ws;
        const reach = E.soft(seg(T, 0.95, 1.4)) * (1 - E.soft(seg(T, 2.3, 2.7)));
        const cheer = E.back(seg(T, 3.2, 3.6)) * (1 - E.soft(seg(T, 4.4, 4.9)));
        lit = 0.18 + E.soft(seg(T, 2.4, 3.2)) * 0.82 * fade;
        pose = mix(pose, P({ hF: lp([40, -70], x, 0, 1), hB: [-4, -54], head: [8, -114] }), reach);
        pose = mix(pose, P({ hF: [14, -132], hB: [-10, -130], head: [3, -118] }), cheer);
      }
      pose = legs(pose, gait.ph, gait.amp, { arms: false });
      house(g, 48, -150, 130, 150, lit);
      core(g, 113, -72, 1 + (lit - 0.18) * 0.4);
      fig(g, pose, x, 0, { wave: S.wave, wt: S.wt });
      sparks(g, 113, -90, seg(T, 2.5, 3.3), 18, 7, GOLD);
      label(g, 'you', x);
    },
  };

  // ---------- paste: a document leaves the laptop for a cloud far away ----------
  SC.paste = {
    dur: 6,
    width: 400,
    label: 'A person pastes a document from a laptop and it flies away into a distant cloud.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const HOME = -150;
      let pose = restPose(t);
      if (T < 0) {
        pose = mix(pose, P({ hF: lp([-96, -58], HOME, 0, 1), hB: lp([-110, -56], HOME, 0, 1), head: [6, -114] }), 0.8);
        pose = idleGlance(pose, t, 5.5);
      } else {
        const typ = E.soft(seg(T, 0.2, 0.7)) * (1 - E.soft(seg(T, 1.5, 1.9)));
        const point = E.soft(seg(T, 1.8, 2.2)) * (1 - E.soft(seg(T, 4.6, 5.2)));
        pose = mix(pose, P({ hF: lp([-96, -58], HOME, 0, 1), hB: lp([-110, -56], HOME, 0, 1), head: [6, -114] }), typ);
        pose = mix(pose, P({ hF: [40, -100], hB: [-4, -54], head: [10, -116] }), point);
      }
      desk(g, -170, -46, 90);
      laptop(g, -132, -50);
      cloud(g, 150, -130, 1.15);
      const fly = T < 0 ? 0 : E.soft(seg(T, 1.6, 3.4));
      const dx = -100 + 250 * fly;
      const dy = -70 + -50 * Math.sin(fly * Math.PI);
      const fadeDoc = T < 0 ? 1 : 1 - seg(T, 3.2, 4.0);
      if (T < 0 || T < 1.6) doc(g, -100, -70, -0.15, true);
      else doc(g, dx, dy, -0.2 - fly * 0.4, true, fadeDoc);
      fig(g, pose, HOME, 0, { wave: S.wave, wt: S.wt });
      if (T > 3.4) bubble(g, HOME + 8, -134, 'where did it go?', E.soft(seg(T, 3.6, 4.0)) * (1 - seg(T, 5.3, 5.8)));
      label(g, 'you', HOME);
      text(g, 'away', 150, -100, 8.5, C.muted);
    },
  };

  // ---------- meter: the bill climbs with every seat ----------
  SC.meter = {
    dur: 6,
    width: 400,
    label: 'Three people stand while a gold line on a chart climbs with the headcount.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const xs = [-160, -110, -60];
      axes(g, 20, 0, 170, 150);
      const climb = T < 0 ? 0.25 : 0.25 + 0.7 * E.out3(seg(T, 0.6, 3.6)) * (1 - seg(T, 5.5, 6));
      const pts = [
        [28, -20],
        [70, -20 - 40 * climb],
        [110, -20 - 70 * climb],
        [170, -20 - 110 * climb],
      ];
      for (let i = 1; i < pts.length; i++) ln(g, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], 2.4, GOLD);
      const last = pts[pts.length - 1];
      circle(g, last[0], last[1], 4);
      inkFill(g, GOLD, 1);
      xs.forEach((x, i) => {
        let pose = restPose(t + i);
        if (T < 0) pose = idleGlance(pose, t + i * 0.7, 6 + i);
        else {
          const wave = E.back(seg(T, 0.4 + i * 0.35, 0.8 + i * 0.35)) * (1 - E.soft(seg(T, 2.2 + i * 0.2, 2.8 + i * 0.2)));
          pose = mix(pose, P({ hF: [14, -132], hB: [-4, -54], head: [3, -118] }), wave);
        }
        fig(g, pose, x, 0, { wave: i === 0 ? S.wave : 0, wt: S.wt });
      });
    },
  };

  // ---------- border: a document crosses to another country ----------
  SC.border = {
    dur: 6,
    width: 400,
    label: 'A gold document is carried across a border to a globe on the other side.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const HOME = -160;
      const AT = -30;
      let x = HOME;
      let gait = { ph: 0, amp: 0 };
      let pose = restPose(t);
      const carry = T < 0 ? 0 : E.soft(seg(T, 0.2, 0.6)) * (1 - E.soft(seg(T, 3.0, 3.5)));
      if (T < 0) {
        pose = idleGlance(pose, t);
      } else {
        const fadeWalkHome = walkSeg(T, 4.6, 5.4, AT, HOME);
        const ws = T < 3.2 ? walkSeg(T, 0.4, 1.3, HOME, AT) : fadeWalkHome;
        x = T < 0.4 ? HOME : ws.x;
        gait = T < 0.4 ? gait : ws;
        pose = mix(pose, P({ hF: lp([x + 20, -70], x, 0, 1), hB: [-4, -54], head: [8, -114] }), carry);
        const point = E.soft(seg(T, 3.1, 3.5)) * (1 - E.soft(seg(T, 4.2, 4.7)));
        pose = mix(pose, P({ hF: [40, -100], hB: [-4, -54], head: [10, -116] }), point);
      }
      pose = legs(pose, gait.ph, gait.amp, { arms: false });
      // dashed border
      ln(g, 20, -160, 20, 0, 1.8, C.muted);
      globe(g, 130, -80, 32);
      const docX = carry > 0.05 ? x + 22 : (T < 0 ? HOME + 22 : 20 + 80 * E.soft(seg(T, 3.0, 4.2)));
      const docY = carry > 0.05 ? -72 : (T < 0 ? -72 : -72 - 8 * E.soft(seg(T, 3.0, 4.2)));
      const docK = T < 0 ? 1 : (carry > 0.05 ? 1 : (1 - seg(T, 4.0, 4.8)));
      if (T < 0 || T < 4.8) doc(g, T < 0 ? HOME + 22 : docX, T < 0 ? -72 : docY, 0.1, true, docK);
      fig(g, pose, x, 0, { wave: S.wave, wt: S.wt });
      label(g, 'you', x);
    },
  };

  // ---------- ban: the phone under the desk ----------
  SC.ban = {
    dur: 5.8,
    width: 360,
    label: 'A person hides a phone under the desk, and a cross appears above it.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const HOME = -20;
      let pose = restPose(t);
      const hide = T < 0 ? 0 : E.soft(seg(T, 0.6, 1.4));
      if (T < 0) pose = idleGlance(pose, t);
      else {
        const reach = E.soft(seg(T, 0.3, 0.8)) * (1 - E.soft(seg(T, 1.5, 2.0)));
        const shrug = E.back(seg(T, 2.4, 2.8)) * (1 - E.soft(seg(T, 3.8, 4.4)));
        pose = mix(pose, P({ hF: lp([20, -20], HOME, 0, 1), hB: [-4, -54], head: [10, -114], chest: [4, -89] }), reach);
        pose = mix(pose, P({ hF: [18, -120], hB: [-12, -118], head: [2, -116] }), shrug);
      }
      desk(g, -80, -46, 160);
      // phone
      const px = 20;
      const py = T < 0 ? -58 : -58 + 36 * hide;
      g.save();
      g.translate(px, py);
      rr(g, -6, -10, 12, 20, 2);
      inkFill(g, GOLD_SOFT, 1.5, GOLD);
      g.restore();
      fig(g, pose, HOME, 0, { wave: S.wave, wt: S.wt });
      const xk = T < 0 ? 0 : E.back(seg(T, 2.2, 2.8)) * (1 - seg(T, 5.2, 5.8));
      if (xk > 0) {
        g.save();
        g.translate(70, -130);
        g.scale(xk, xk);
        ln(g, -12, -12, 12, 12, 3, C.redInk);
        ln(g, 12, -12, -12, 12, 3, C.redInk);
        g.restore();
      }
    },
  };

  // ---------- seats: chairs, each with a price tag ----------
  SC.seats = {
    dur: 6,
    width: 400,
    label: 'Three chairs stand in a row and a gold price tag drops onto each one.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const xs = [-130, -20, 90];
      xs.forEach((x, i) => {
        chair(g, x);
        const drop = T < 0 ? 0 : E.out3(seg(T, 0.5 + i * 0.7, 1.2 + i * 0.7)) * (1 - seg(T, 5.4, 6));
        if (T < 0) return;
        if (drop > 0) {
          const y = -90 + 20 * (1 - drop);
          g.save();
          g.translate(x + 16, y);
          g.scale(0.7 + 0.3 * drop, 0.7 + 0.3 * drop);
          rr(g, -8, 6, 16, 14, 2);
          inkFill(g, GOLD_SOFT, 1.5, GOLD);
          ln(g, 0, 6, 0, 0, 1.4, GOLD);
          circle(g, 0, 0, 2);
          inkFill(g, GOLD, 1);
          g.restore();
        }
      });
    },
  };

  // ---------- build: a spanner, and a box that has started to smoke ----------
  SC.build = {
    dur: 6.2,
    width: 400,
    label: 'A person tries to fix a smoking box with a spanner.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const HOME = -120;
      const AT = -40;
      let x = HOME;
      let gait = { ph: 0, amp: 0 };
      let pose = restPose(t);
      if (T < 0) pose = idleGlance(pose, t, 5.2);
      else {
        const ws = T < 3.6 ? walkSeg(T, 0, 0.7, HOME, AT) : walkSeg(T, 5.0, 5.7, AT, HOME);
        x = ws.x;
        gait = ws;
        const work = E.soft(seg(T, 0.8, 1.2)) * (1 - E.soft(seg(T, 4.4, 4.9)));
        const bob = Math.sin((T - 1.2) * 10) * 6 * work;
        pose = mix(pose, P({ hF: lp([40, -70 + bob], x, 0, 1), hB: [-4, -54], head: [8, -114] }), work);
      }
      pose = legs(pose, gait.ph, gait.amp, { arms: false });
      rr(g, 50, -90, 70, 50, 5);
      inkFill(g, C.paper, 1.7);
      ln(g, 62, -72, 108, -72, 1.4, C.muted);
      ln(g, 62, -58, 96, -58, 1.4, C.muted);
      // smoke
      const smokeT = T < 0 ? t : T;
      for (let i = 0; i < 3; i++) {
        const k = 0.5 + 0.5 * Math.sin(smokeT * 1.6 + i);
        const sy = -100 - i * 16 - k * 10;
        g.save();
        g.globalAlpha *= 0.45;
        circle(g, 96 + i * 8, sy, 6 + i * 2);
        inkFill(g, C.muted, 1.2, C.muted);
        g.restore();
      }
      fig(g, pose, x, 0, { wave: S.wave, wt: S.wt });
      // spanner in hand during work
      if (T > 0.8 && T < 5.0) {
        const Jx = x + 28;
        const Jy = -68;
        g.save();
        g.translate(Jx, Jy);
        g.rotate(-0.6);
        ln(g, 0, 0, 22, -8, 2.4, C.ink);
        circle(g, 24, -9, 5);
        inkFill(g, C.paper, 1.5);
        g.restore();
      }
      label(g, 'you', x);
    },
  };

  // ---------- stays: a padlock on the building ----------
  SC.stays = {
    dur: 5.8,
    width: 360,
    label: 'A gold padlock drops onto a building and closes, so the data stays inside.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      house(g, -70, -150, 140, 150, T < 0 ? 0.2 : 0.2 + 0.6 * E.soft(seg(T, 2.0, 2.8)) * (1 - seg(T, 5.3, 5.8)));
      const drop = T < 0 ? 1 : E.out3(seg(T, 0.4, 1.4));
      const y = T < 0 ? -70 : -140 + 70 * drop;
      const closed = T < 0 ? true : T > 1.5;
      const k = T < 0 ? 1 : Math.max(drop, 1 - seg(T, 5.3, 5.8));
      padlock(g, 0, y, k, closed);
      sparks(g, 0, -78, seg(T, 1.6, 2.3), 14, 6, GOLD);
      // small idle glance figure to the side
      let pose = restPose(t);
      if (T < 0) pose = idleGlance(pose, t);
      else {
        const cheer = E.back(seg(T, 2.2, 2.7)) * (1 - E.soft(seg(T, 3.8, 4.4)));
        pose = mix(pose, P({ hF: [14, -132], hB: [-10, -130], head: [3, -118] }), cheer);
      }
      fig(g, pose, -140, 0, { wave: S.wave, wt: S.wt });
    },
  };

  // ---------- flat: the cost line goes flat ----------
  SC.flat = {
    dur: 6,
    width: 380,
    label: 'A cost line climbs and then goes flat in gold.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      axes(g, -160, 0, 320, 150);
      const climb = T < 0 ? 1 : E.soft(seg(T, 0.3, 2.2));
      const flatK = T < 0 ? 1 : E.soft(seg(T, 2.2, 3.0)) * (1 - 0 * seg(T, 5.5, 6));
      const peakX = -160 + 120;
      const peakY = -20 - 80 * climb;
      ln(g, -150, -20, peakX, peakY, 2.2);
      const endX = peakX + 170 * (T < 0 ? 1 : flatK);
      if (T < 0 || T > 2.2) ln(g, peakX, T < 0 ? -100 : peakY, endX, T < 0 ? -100 : peakY, 2.6, GOLD);
      const fade = T < 0 ? 1 : 1 - seg(T, 5.4, 6);
      if (T < 0 || T > 2.3) {
        g.save();
        g.globalAlpha *= fade;
        circle(g, peakX, T < 0 ? -100 : peakY, 5);
        inkFill(g, GOLD, 1);
        g.restore();
      }
    },
  };

  // ---------- knows: a document gets a gold tick ----------
  SC.knows = {
    dur: 5.8,
    width: 380,
    label: 'A person shows a document of their own work, and a gold tick appears on it.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const HOME = -90;
      let pose = restPose(t);
      if (T < 0) pose = idleGlance(pose, t);
      else {
        const point = E.soft(seg(T, 0.4, 0.9)) * (1 - E.soft(seg(T, 3.8, 4.4)));
        pose = mix(pose, P({ hF: [40, -100], hB: [-4, -54], head: [10, -116] }), point);
      }
      rr(g, 20, -140, 70, 90, 5);
      inkFill(g, C.paper, 1.7);
      ln(g, 32, -120, 76, -120, 1.4, C.muted);
      ln(g, 32, -106, 76, -106, 1.4, C.muted);
      ln(g, 32, -92, 60, -92, 1.4, C.muted);
      const tk = T < 0 ? 0 : E.soft(seg(T, 1.4, 2.2)) * (1 - seg(T, 5.2, 5.8));
      tickBadge(g, 72, -70, tk, 12, GOLD_SOFT, GOLD);
      fig(g, pose, HOME, 0, { wave: S.wave, wt: S.wt });
      label(g, 'you', HOME);
    },
  };

  // ---------- market: a rising bar chart ----------
  SC.market = {
    dur: 6,
    width: 380,
    label: 'Three bars on a chart rise, and the tallest one is gold.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      axes(g, -140, 0, 280, 150);
      const hs = [40, 70, 110];
      const xs = [-90, -20, 50];
      xs.forEach((x, i) => {
        const k = T < 0 ? 0.35 + i * 0.15 : E.out3(seg(T, 0.4 + i * 0.45, 1.6 + i * 0.45)) * (1 - 0 * seg(T, 5.5, 6));
        const h = hs[i] * (T < 0 ? (0.4 + 0.6 * (i / 2)) : Math.max(k, 0.08));
        const gold = i === 2;
        rr(g, x, -h, 36, h, 3);
        inkFill(g, gold ? GOLD_SOFT : C.paper, 1.7, gold ? GOLD : C.ink);
      });
      const lineK = T < 0 ? 1 : E.soft(seg(T, 1.8, 3.0));
      if (T < 0 || lineK > 0) {
        g.save();
        g.globalAlpha *= T < 0 ? 0.8 : lineK;
        ln(g, -90, -40, -20, -70, 1.6, C.muted);
        ln(g, -20, -70, 50, -110, 1.6, C.muted);
        g.restore();
      }
    },
  };

  // ---------- breakeven: rent climbs, owning stays flat, they cross ----------
  SC.breakeven = {
    dur: 6.2,
    width: 400,
    label: 'A climbing rent line crosses a flat owning line at a gold point.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      axes(g, -170, 0, 340, 155);
      const k = T < 0 ? 1 : E.soft(seg(T, 0.3, 3.2)) * (1 - 0 * seg(T, 5.7, 6.2));
      const x1 = -160;
      const x2 = -160 + 300 * (T < 0 ? 1 : k);
      // rent climbs
      const rentY = (x) => -16 - ((x + 160) / 300) * 120;
      // own is flat
      const ownY = -78;
      ln(g, x1, rentY(x1), x2, rentY(x2), 2.1);
      ln(g, x1, ownY, x2, ownY, 2.4, GOLD);
      const crossed = T < 0 || T > 2.0;
      const cx = -160 + 300 * ((78 - 16) / 120);
      if (crossed) {
        const pop = T < 0 ? 1 : E.back(seg(T, 2.0, 2.6)) * (1 - seg(T, 5.6, 6.2));
        g.save();
        g.translate(cx, ownY);
        g.scale(pop, pop);
        circle(g, 0, 0, 8);
        inkFill(g, GOLD_SOFT, 1.8, GOLD);
        g.restore();
        sparks(g, cx, ownY - 10, seg(T, 2.2, 2.9), 14, 6, GOLD);
      }
    },
  };

  // ---------- law: the scales ----------
  SC.law = {
    dur: 5.6,
    width: 340,
    label: 'A set of scales tips, and one pan settles in gold.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const tip = T < 0 ? 0.18 : 0.18 + 0.32 * E.soft(seg(T, 0.5, 2.2)) * (1 - seg(T, 5.0, 5.6));
      const a = -tip;
      ln(g, 0, -140, 0, -20, 2.2);
      ln(g, -30, -20, 30, -20, 2.2);
      g.save();
      g.translate(0, -120);
      g.rotate(a);
      ln(g, -80, 0, 80, 0, 2.2);
      // left pan
      ln(g, -70, 0, -70, 16, 1.6);
      rr(g, -88, 16, 36, 8, 2);
      inkFill(g, C.paper, 1.5);
      // right gold pan
      ln(g, 70, 0, 70, 16, 1.6, GOLD);
      rr(g, 52, 16, 36, 8, 2);
      inkFill(g, GOLD_SOFT, 1.6, GOLD);
      g.restore();
      circle(g, 0, -120, 5);
      inkFill(g, C.paper, 1.5);
    },
  };

  // ---------- finance: coins, stacked ----------
  SC.finance = {
    dur: 5.8,
    width: 340,
    label: 'Coins stack up, and a gold coin lands on the pile.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      function coin(x, y, gold, k) {
        if (k !== undefined && k <= 0) return;
        g.save();
        g.translate(x, y);
        if (k !== undefined) g.scale(k, k);
        g.beginPath();
        g.ellipse(0, 0, 26, 8, 0, 0, Math.PI * 2);
        inkFill(g, gold ? GOLD_SOFT : C.paper, 1.6, gold ? GOLD : C.ink);
        g.restore();
      }
      const ys = [-16, -30, -44];
      ys.forEach((y, i) => {
        const k = T < 0 ? 1 : E.back(seg(T, 0.3 + i * 0.4, 0.9 + i * 0.4));
        coin(-40, T < 0 ? y : y - 20 * (1 - k), false, T < 0 ? 1 : k);
      });
      const gk = T < 0 ? 0 : E.out3(seg(T, 1.8, 2.6)) * (1 - 0 * seg(T, 5.3, 5.8));
      if (T < 0 || gk > 0) {
        const gy = T < 0 ? -40 : -80 + 40 * gk;
        coin(70, T < 0 ? -40 : gy, true, T < 0 ? 1 : Math.min(1, gk + 0.2));
      }
    },
  };

  // ---------- health: a patient file with a cross ----------
  SC.health = {
    dur: 5.4,
    width: 320,
    label: 'A gold cross is drawn on a patient file.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      rr(g, -40, -140, 80, 110, 6);
      inkFill(g, C.paper, 1.8);
      const k = T < 0 ? 0 : E.soft(seg(T, 0.5, 1.8)) * (1 - seg(T, 4.9, 5.4));
      const show = T < 0 ? 0.15 : Math.max(k, 0.05);
      ln(g, 0, -110, 0, -70, 4 * show, GOLD);
      ln(g, -16, -90, 16, -90, 4 * show, GOLD);
      ln(g, -20, -48, 20, -48, 1.4, C.muted);
      ln(g, -20, -36, 10, -36, 1.4, C.muted);
    },
  };

  // ---------- owner: the briefcase ----------
  SC.owner = {
    dur: 5.6,
    width: 340,
    label: 'A briefcase closes and a gold latch clicks shut.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const close = T < 0 ? 1 : E.soft(seg(T, 0.6, 1.8));
      const lid = T < 0 ? 0 : (1 - close) * -0.9;
      // body
      rr(g, -60, -70, 120, 70, 6);
      inkFill(g, C.paper, 1.8);
      ln(g, -60, -36, 60, -36, 1.5);
      // lid hint
      g.save();
      g.translate(-60, -70);
      g.rotate(lid);
      rr(g, 0, -8, 120, 10, 3);
      inkFill(g, C.paper, 1.6);
      g.restore();
      const latch = T < 0 ? 1 : E.back(seg(T, 1.8, 2.4)) * (1 - 0 * seg(T, 5.1, 5.6));
      if (T < 0 || latch > 0) {
        g.save();
        g.translate(0, -36);
        g.scale(T < 0 ? 1 : latch, T < 0 ? 1 : latch);
        rr(g, -10, -8, 20, 16, 3);
        inkFill(g, GOLD_SOFT, 1.6, GOLD);
        g.restore();
      }
      sparks(g, 0, -50, seg(T, 2.1, 2.8), 12, 5, GOLD);
    },
  };

  // ---------- messy: files scattered ----------
  SC.messy = {
    dur: 5.8,
    width: 380,
    label: 'A person stands among scattered files that slide further out of order.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const HOME = -130;
      let pose = restPose(t);
      if (T < 0) pose = idleGlance(pose, t);
      else {
        const up = E.back(seg(T, 0.5, 1.0)) * (1 - E.soft(seg(T, 2.4, 3.0)));
        pose = mix(pose, P({ hF: [16, -130], hB: [-12, -128], head: [0, -116] }), up);
      }
      const files = [
        { x: 10, y: -40, r: -0.3, gold: false },
        { x: 50, y: -70, r: 0.25, gold: false },
        { x: 90, y: -30, r: -0.1, gold: true },
        { x: 40, y: -20, r: 0.4, gold: false },
      ];
      const scatter = T < 0 ? 0 : E.soft(seg(T, 0.6, 1.8)) * (1 - seg(T, 5.2, 5.8));
      files.forEach((f, i) => {
        const dx = (i % 2 === 0 ? -1 : 1) * 28 * scatter;
        const dy = -16 * scatter * ((i % 3) - 1);
        doc(g, f.x + dx, f.y + dy, f.r + scatter * 0.3 * (i - 1), f.gold);
      });
      fig(g, pose, HOME, 0, { wave: S.wave, wt: S.wt });
    },
  };

  // ---------- bulb: a lightbulb for the creative all-rounder ----------
  SC.bulb = {
    dur: 5.6,
    width: 360,
    label: 'A person looks at a lightbulb as it lights up in gold.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const HOME = -110;
      let pose = restPose(t);
      if (T < 0) pose = idleGlance(pose, t);
      else {
        const point = E.soft(seg(T, 0.4, 0.9)) * (1 - E.soft(seg(T, 3.6, 4.2)));
        pose = mix(pose, P({ hF: [40, -100], hB: [-4, -54], head: [10, -116] }), point);
      }
      const lit = T < 0 ? 0.2 : 0.2 + 0.8 * E.soft(seg(T, 1.2, 2.2)) * (1 - seg(T, 5.1, 5.6));
      g.save();
      g.globalAlpha *= 0.35 * lit;
      circle(g, 80, -110, 28 + lit * 10);
      g.fillStyle = GOLD_SOFT;
      g.fill();
      g.restore();
      circle(g, 80, -110, 22);
      inkFill(g, lit > 0.4 ? GOLD_SOFT : C.paper, 1.7, lit > 0.4 ? GOLD : C.ink);
      rr(g, 70, -88, 20, 14, 2);
      inkFill(g, C.paper, 1.4);
      ln(g, 74, -72, 86, -72, 2);
      fig(g, pose, HOME, 0, { wave: S.wave, wt: S.wt });
      sparks(g, 80, -138, seg(T, 1.5, 2.3), 16, 6, GOLD);
    },
  };

  // ---------- seed: start smaller, a seedling ----------
  SC.seed = {
    dur: 6.2,
    width: 380,
    label: 'A person watches a seedling grow from a pot; one leaf turns gold.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const YOU = -110;
      let pose = restPose(t);
      const look = T < 0 ? 0.35 : E.soft(seg(T, 0.2, 1.0)) * (1 - E.soft(seg(T, 5.4, 6.0)));
      if (T < 0) pose = idleGlance(pose, t);
      else pose = mix(pose, P({ hF: [36, -96], hB: [-6, -54], head: [12, -114] }), look);
      fig(g, pose, YOU, 0, { wave: S.wave, wt: S.wt });
      label(g, 'you', YOU);
      // pot
      rr(g, 8, -16, 56, 16, 3);
      inkFill(g, C.wood || '#8b6914', 1.6);
      rr(g, 2, -22, 68, 8, 2);
      inkFill(g, C.wood || '#8b6914', 1.5);
      const grow = T < 0 ? 1 : E.soft(seg(T, 0.4, 3.0));
      const h = 108 * (T < 0 ? 1 : grow);
      const px = 36;
      ln(g, px, -22, px, -22 - h, 3.2, '#3d5a2c');
      const leaf = T < 0 ? 1 : E.soft(seg(T, 1.6, 3.2));
      if (T < 0 || leaf > 0) {
        const s = T < 0 ? 1 : leaf;
        g.save();
        g.translate(px, -22 - h * 0.5);
        g.scale(s, s);
        g.beginPath();
        g.moveTo(0, 0);
        g.quadraticCurveTo(-36, -10, -32, -32);
        g.quadraticCurveTo(-10, -10, 0, 0);
        inkFill(g, '#7ea35c', 1.7, '#3d5a2c');
        g.restore();
        g.save();
        g.translate(px, -22 - h * 0.72);
        g.scale(s, s);
        g.beginPath();
        g.moveTo(0, 0);
        g.quadraticCurveTo(38, -14, 32, -36);
        g.quadraticCurveTo(10, -10, 0, 0);
        inkFill(g, GOLD_SOFT, 2, GOLD);
        g.restore();
      }
      sparks(g, px + 18, -22 - h * 0.8, T < 0 ? 0 : seg(T, 2.6, 3.6), 18, 7, GOLD);
    },
  };

  // ---------- audit: a magnifying glass over a document ----------
  SC.audit = {
    dur: 6,
    width: 380,
    label: 'A magnifying glass moves across a document and a gold highlight follows it.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      rr(g, -150, -140, 90, 110, 5);
      inkFill(g, C.paper, 1.7);
      ln(g, -136, -120, -76, -120, 1.4, C.muted);
      ln(g, -136, -104, -76, -104, 1.4, C.muted);
      ln(g, -136, -88, -96, -88, 1.4, C.muted);
      const u = T < 0 ? 0.2 + 0.15 * Math.sin(t * 0.8) : E.soft(seg(T, 0.4, 3.6));
      const mx = -110 + 80 * u;
      const my = -100 + 30 * Math.sin(u * Math.PI);
      // highlight
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

  // ---------- deploy: the box goes into the building ----------
  SC.deploy = {
    dur: 6,
    width: 400,
    label: 'A gold box slides into a building.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      house(g, 40, -150, 130, 150, T < 0 ? 0.15 : 0.15 + 0.7 * E.soft(seg(T, 2.6, 3.4)) * (1 - seg(T, 5.5, 6)));
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
      if (T < 0) {
        // idle: box already inside, shown as gold door/core
        core(g, 105, -70, 1);
      } else if (T > 2.8) {
        core(g, 105, -70, 1);
        sparks(g, 105, -90, seg(T, 2.9, 3.6), 16, 6, GOLD);
      }
    },
  };

  // ---------- embed: it keeps running, a loop ----------
  SC.embed = {
    dur: 6,
    width: 340,
    label: 'A gold core sits in the middle of a loop that turns once and keeps going.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const spin = T < 0 ? t * 0.15 : E.soft(seg(T, 0.3, 3.4)) * Math.PI * 2;
      g.save();
      g.translate(0, -80);
      g.rotate(T < 0 ? 0 : spin);
      g.beginPath();
      g.arc(0, 0, 50, 0.4, Math.PI * 2 - 0.6);
      g.strokeStyle = C.ink;
      g.lineWidth = 2.2;
      g.stroke();
      // arrow head
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
      core(g, 0, -80, 1.15);
      sparks(g, 0, -100, seg(T, 3.2, 4.0), 14, 6, GOLD);
    },
  };

  // ---------- key: the key, handed over ----------
  SC.key = {
    dur: 6,
    width: 380,
    label: 'A person holds out a gold key.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const HOME = -40;
      let pose = restPose(t);
      const offer = T < 0 ? 0.15 : E.soft(seg(T, 0.4, 1.2)) * (1 - E.soft(seg(T, 5.2, 5.8)));
      if (T < 0) pose = idleGlance(pose, t);
      else {
        pose = mix(pose, P({ hF: [46, -90], hB: [-4, -54], head: [10, -114], chest: [4, -89] }), offer);
      }
      const J = fig(g, pose, HOME, 0, { wave: S.wave, wt: S.wt });
      // key at the front hand
      const hx = T < 0 ? HOME + 36 : (J && J.w && J.w.handF ? J.w.handF[0] : HOME + 40);
      const hy = T < 0 ? -88 : (J && J.w && J.w.handF ? J.w.handF[1] : -90);
      g.save();
      g.translate(hx + 8, hy);
      g.rotate(-0.2);
      circle(g, 0, 0, 10);
      inkFill(g, GOLD_SOFT, 2.2, GOLD);
      ln(g, 10, 0, 38, 0, 3, GOLD);
      ln(g, 28, 0, 28, 8, 2.4, GOLD);
      ln(g, 35, 0, 35, 6, 2.4, GOLD);
      g.restore();
      label(g, 'you', HOME);
    },
  };
})();
