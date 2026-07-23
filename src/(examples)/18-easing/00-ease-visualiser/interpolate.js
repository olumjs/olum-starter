export function interpolateNumber(a, b) {
  a = +a;
  b = +b;
  return (t) => a + (b - a) * t;
}

const NUM = /[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?/g;

export function interpolateString(a, b) {
  a = String(a);
  b = String(b);

  const parts = [];
  const bNums = [];
  let last = 0;
  let m;
  NUM.lastIndex = 0;
  while ((m = NUM.exec(b))) {
    parts.push(b.slice(last, m.index));
    bNums.push(+m[0]);
    last = m.index + m[0].length;
  }
  const tail = b.slice(last);

  const aNums = [];
  NUM.lastIndex = 0;
  while ((m = NUM.exec(a))) aNums.push(+m[0]);

  return (t) => {
    let out = "";
    for (let i = 0; i < parts.length; i++) {
      const from = i < aNums.length ? aNums[i] : bNums[i];
      out += parts[i] + (from + (bNums[i] - from) * t);
    }
    return out + tail;
  };
}
