export function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}

export function tween(
  initial,
  { duration = 400, easing = (t) => t } = {},
  onFrame,
) {
  let current = initial;
  let frame = null;

  onFrame(current);

  function set(target) {
    const from = current;
    const start = performance.now();
    cancelAnimationFrame(frame);

    (function loop(now) {
      const t = Math.min(1, (now - start) / duration);
      current = from + (target - from) * easing(t);
      onFrame(current);
      if (t < 1) frame = requestAnimationFrame(loop);
    })(start);
  }

  return {
    set,
    cancel: () => cancelAnimationFrame(frame),
  };
}
