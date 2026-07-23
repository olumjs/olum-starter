const isNum = (v) => typeof v === "number";
const mapNums = (obj, fn) =>
  Object.fromEntries(Object.keys(obj).map((k) => [k, fn(obj[k], k)]));

export function spring(
  initial,
  { stiffness = 0.15, damping = 0.8 } = {},
  onFrame,
) {
  let current = initial;
  let target = initial;
  let velocity = isNum(initial) ? 0 : mapNums(initial, () => 0);
  let frame = null;
  let running = false;

  onFrame(current);

  const controller = {
    stiffness,
    damping,
    set(next) {
      target = next;
      if (!running) {
        running = true;
        frame = requestAnimationFrame(step);
      }
    },
    cancel() {
      cancelAnimationFrame(frame);
      running = false;
    },
  };

  function integrate(pos, tgt, vel) {
    const acceleration =
      controller.stiffness * (tgt - pos) - controller.damping * vel;
    vel += acceleration;
    pos += vel;
    const settled = Math.abs(tgt - pos) < 0.05 && Math.abs(vel) < 0.05;
    return [settled ? tgt : pos, vel, settled];
  }

  function step() {
    let settled = true;

    if (isNum(target)) {
      const [p, v, s] = integrate(current, target, velocity);
      current = p;
      velocity = v;
      settled = s;
    } else {
      const nextPos = {};
      const nextVel = {};
      for (const k in target) {
        const [p, v, s] = integrate(current[k], target[k], velocity[k]);
        nextPos[k] = p;
        nextVel[k] = v;
        if (!s) settled = false;
      }
      current = nextPos;
      velocity = nextVel;
    }

    onFrame(current);

    if (settled) running = false;
    else frame = requestAnimationFrame(step);
  }

  return controller;
}
