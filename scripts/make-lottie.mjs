/**
 * Generates the site's Lottie animations in brand colours.
 *   node scripts/make-lottie.mjs
 * Writes src/lottie/step-1.json ... step-6.json and success.json.
 * Icons are 96x96, 60fps, drawn with trim paths and small pops so they
 * read as line icons that assemble themselves.
 */
import { mkdirSync, writeFileSync } from "node:fs";

const FR = 60;
const SIZE = 96;
const BLUE = [0.18, 0.42, 1];
const CYAN = [0.169, 0.769, 0.925];
const NAVY = [0.039, 0.149, 0.278];
const GREEN = [0.09, 0.698, 0.416];

const k = (v) => ({ a: 0, k: v });
const dims = (v) => (Array.isArray(v) ? v.length : 1);
const easeOut = (n) => ({ i: { x: Array(n).fill(0.16), y: Array(n).fill(1) }, o: { x: Array(n).fill(0.3), y: Array(n).fill(0) } });
const kf = (frames) => ({
  a: 1,
  k: frames.map((f, idx) => {
    const next = frames[idx + 1];
    return next ? { t: f.t, s: f.s, e: next.s, ...easeOut(dims(f.s)) } : { t: f.t, s: f.s };
  }),
});

/** Points on an arc, screen coordinates (y down), angles in degrees, any sweep direction. */
const arc = (cx, cy, r, from, to) => {
  const rad = (d) => (d * Math.PI) / 180;
  const sweep = to - from;
  const segments = Math.max(1, Math.ceil(Math.abs(sweep) / 90));
  const step = sweep / segments;
  const t = (4 / 3) * Math.tan(rad(Math.abs(step)) / 4) * r * Math.sign(step);
  const v = [];
  const i = [];
  const o = [];
  for (let n = 0; n <= segments; n += 1) {
    const a = rad(from + step * n);
    const px = cx + r * Math.cos(a);
    const py = cy - r * Math.sin(a);
    // Tangent direction for increasing angle is (-sin a, -cos a) in screen space.
    const tx = -Math.sin(a) * t;
    const ty = -Math.cos(a) * t;
    v.push([px, py]);
    o.push(n < segments ? [tx, ty] : [0, 0]);
    i.push(n > 0 ? [-tx, -ty] : [0, 0]);
  }
  return { v, i, o };
};

const path = ({ v, i, o }, closed = false) => ({
  ty: "sh",
  ks: k({ i: i ?? v.map(() => [0, 0]), o: o ?? v.map(() => [0, 0]), v, c: closed }),
});
const line = (points, closed = false) => path({ v: points }, closed);
const ellipse = (cx, cy, w, h = w) => ({ ty: "el", p: k([cx, cy]), s: k([w, h]), d: 1 });
const rect = (cx, cy, w, h, r = 0) => ({ ty: "rc", p: k([cx, cy]), s: k([w, h]), r: k(r), d: 1 });
const stroke = (c, w = 4) => ({ ty: "st", c: k([...c, 1]), o: k(100), w: k(w), lc: 2, lj: 2, ml: 4 });
const fill = (c) => ({ ty: "fl", c: k([...c, 1]), o: k(100), r: 1 });
const trim = (from, to) => ({ ty: "tm", s: k(0), e: kf([{ t: from, s: [0] }, { t: to, s: [100] }]), o: k(0), m: 1 });
const transform = ({ anchor = [0, 0], position = anchor, scale = k([100, 100]), opacity = k(100) } = {}) => ({
  ty: "tr", p: k(position), a: k(anchor), s: scale, r: k(0), o: opacity, sk: k(0), sa: k(0),
});
const group = (name, items) => ({ ty: "gr", nm: name, it: items, np: items.length });

/** Draws the shapes as strokes over the given frames. */
const draw = (name, shapes, colour, from, to, width = 4) => group(name, [...shapes, trim(from, to), stroke(colour, width), transform()]);
/** Pops the shapes in from nothing around a centre point. */
const pop = (name, shapes, colour, from, to, [cx, cy], mode = "fill") =>
  group(name, [
    ...shapes,
    mode === "fill" ? fill(colour) : stroke(colour, 4),
    transform({ anchor: [cx, cy], scale: kf([{ t: from, s: [0, 0] }, { t: to, s: [100, 100] }]), opacity: kf([{ t: from, s: [0] }, { t: from + 4, s: [100] }]) }),
  ]);
/** A ring that swells and fades, for a pulse. */
const pulse = (name, [cx, cy], radius, colour, from, to) =>
  group(name, [
    ellipse(cx, cy, radius * 2),
    stroke(colour, 3),
    transform({ anchor: [cx, cy], scale: kf([{ t: from, s: [70, 70] }, { t: to, s: [150, 150] }]), opacity: kf([{ t: from, s: [0] }, { t: from + 6, s: [70] }, { t: to, s: [0] }]) }),
  ]);
/** Grows a bar upward from its base. */
const grow = (name, shape, colour, base, from, to) =>
  group(name, [shape, fill(colour), transform({ anchor: base, scale: kf([{ t: from, s: [100, 0] }, { t: to, s: [100, 100] }]) })]);

const animation = (name, shapes, op) => ({
  v: "5.7.4", fr: FR, ip: 0, op, w: SIZE, h: SIZE, nm: name, ddd: 0, assets: [],
  layers: [{ ddd: 0, ind: 1, ty: 4, nm: name, sr: 1, ks: { o: k(100), r: k(0), p: k([0, 0, 0]), a: k([0, 0, 0]), s: k([100, 100, 100]) }, ao: 0, shapes, ip: 0, op, st: 0, bm: 0 }],
});

const files = {
  "step-1": animation("Diagnose", [
    draw("lens", [ellipse(42, 42, 40)], BLUE, 0, 36),
    draw("handle", [line([[57, 57], [76, 76]])], BLUE, 30, 46),
    draw("tick", [line([[33, 43], [39, 49], [51, 35]])], CYAN, 44, 60),
    pulse("pulse", [42, 42], 20, CYAN, 56, 96),
  ], 100),
  "step-2": animation("Quote", [
    draw("sheet", [rect(48, 48, 40, 56, 6)], BLUE, 0, 40),
    draw("line-1", [line([[36, 36], [60, 36]])], CYAN, 34, 48),
    draw("line-2", [line([[36, 48], [56, 48]])], CYAN, 42, 56),
    draw("line-3", [line([[36, 60], [50, 60]])], CYAN, 50, 64),
    pop("total", [ellipse(60, 62, 8)], CYAN, 62, 76, [60, 62]),
  ], 96),
  "step-3": animation("Contract", [
    draw("sheet", [rect(48, 48, 40, 56, 6)], BLUE, 0, 36),
    draw("signature", [path({
      v: [[34, 58], [42, 50], [48, 62], [54, 50], [62, 58]],
      i: [[0, 0], [-4, 4], [-3, -4], [-3, 4], [-4, -3]],
      o: [[4, -4], [3, 4], [3, -4], [4, 3], [0, 0]],
    })], CYAN, 34, 60, 4),
    pop("seal", [ellipse(70, 70, 16)], BLUE, 56, 70, [70, 70]),
    draw("seal-tick", [line([[64, 70], [68, 74], [76, 66]])], [1, 1, 1], 66, 80, 3),
  ], 96),
  "step-4": animation("Mobilise", [
    pop("person-left", [ellipse(30, 40, 12), path(arc(30, 62, 11, 180, 0))], BLUE, 0, 18, [30, 52], "stroke"),
    pop("person-right", [ellipse(66, 40, 12), path(arc(66, 62, 11, 180, 0))], BLUE, 10, 28, [66, 52], "stroke"),
    pop("person-centre", [ellipse(48, 34, 16), path(arc(48, 66, 15, 180, 0))], NAVY, 20, 40, [48, 52], "stroke"),
    draw("plus", [line([[78, 16], [78, 32]]), line([[70, 24], [86, 24]])], CYAN, 40, 56),
  ], 90),
  "step-5": animation("Deploy", [
    draw("pin", [path((() => {
      const top = arc(48, 40, 18, 215, -35);
      return { v: [[48, 74], ...top.v], i: [[0, 0], ...top.i], o: [[0, 0], ...top.o] };
    })(), true)], BLUE, 0, 44),
    pop("dot", [ellipse(48, 40, 12)], CYAN, 40, 54, [48, 40]),
    pulse("ripple", [48, 74], 12, CYAN, 52, 92),
  ], 96),
  "step-6": animation("Operate", [
    grow("bar-1", rect(30, 62, 12, 20, 3), BLUE, [30, 72], 0, 24),
    grow("bar-2", rect(48, 54, 12, 36, 3), CYAN, [48, 72], 10, 34),
    grow("bar-3", rect(66, 46, 12, 52, 3), BLUE, [66, 72], 20, 44),
    draw("trend", [line([[24, 40], [44, 30], [58, 34], [76, 18]])], NAVY, 40, 68, 3),
    pop("trend-dot", [ellipse(76, 18, 8)], NAVY, 64, 76, [76, 18]),
  ], 92),
  success: animation("Success", [
    draw("ring", [ellipse(48, 48, 64)], GREEN, 0, 34, 5),
    draw("check", [line([[32, 50], [44, 62], [66, 36]])], GREEN, 26, 50, 6),
    pulse("burst", [48, 48], 32, CYAN, 36, 80),
  ], 90),
};

mkdirSync("src/lottie", { recursive: true });
for (const [name, data] of Object.entries(files)) {
  writeFileSync(`src/lottie/${name}.json`, JSON.stringify(data));
  console.log(`wrote src/lottie/${name}.json (${JSON.stringify(data).length} bytes, ${data.layers[0].shapes.length} groups)`);
}
