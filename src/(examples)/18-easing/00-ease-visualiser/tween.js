import { interpolateNumber } from "./interpolate.js";

export function tween(initial, options, onFrame) {
  options = options || {};
  const interpolate = options.interpolate || interpolateNumber;
  let current = initial;
  let frame = null;

  onFrame(current);

  function set(target, opts) {
    opts = opts || {};
    const duration =
      opts.duration != null
        ? opts.duration
        : options.duration != null
          ? options.duration
          : 400;
    const easing = opts.easing || options.easing || ((t) => t);

    cancelAnimationFrame(frame);

    if (duration <= 0) {
      current = target;
      onFrame(current);
      return Promise.resolve();
    }

    const interp = interpolate(current, target);
    const start = performance.now();

    return new Promise((resolve) => {
      (function loop(now) {
        const t = Math.min(1, (now - start) / duration);
        current = interp(easing(t));
        onFrame(current);
        if (t < 1) {
          frame = requestAnimationFrame(loop);
        } else {
          current = target;
          onFrame(current);
          resolve();
        }
      })(start);
    });
  }

  return { set, cancel: () => cancelAnimationFrame(frame) };
}
