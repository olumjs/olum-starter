import { easings } from "olum";

const processed = {};

for (const ease in easings) {
  if (ease === "linear") {
    processed.linear = easings.linear;
  } else {
    const name = ease.replace(/In$|InOut$|Out$/, "");
    const typeMatch = ease.match(/In$|InOut$|Out$/);
    if (!typeMatch) continue;
    const type = typeMatch[0];

    if (!(name in processed)) processed[name] = {};
    processed[name][type] = { fn: easings[ease] };

    let shape = "M0 1000";
    for (let i = 1; i <= 1000; i++) {
      shape = `${shape} L${(i / 1000) * 1000} ${1000 - easings[ease](i / 1000) * 1000} `;
    }
    processed[name][type].shape = shape;
  }
}

const sorted_eases = new Map([
  ["sine", processed.sine],
  ["quad", processed.quad],
  ["cubic", processed.cubic],
  ["quart", processed.quart],
  ["quint", processed.quint],
  ["expo", processed.expo],
  ["circ", processed.circ],
  ["back", processed.back],
  ["elastic", processed.elastic],
  ["bounce", processed.bounce],
]);

export const types = [
  ["Ease In", "In"],
  ["Ease Out", "Out"],
  ["Ease In Out", "InOut"],
];

export { sorted_eases as eases };
