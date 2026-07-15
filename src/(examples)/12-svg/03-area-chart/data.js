// Illustrative sample series, generated rather than hard-coded so the example
// stays about drawing the path — a wave that settles towards its mean.
export default Array.from({ length: 40 }, (_, i) => ({
	x: i,
	y: +(5 + 2 * Math.sin(i / 3) * Math.exp(-i / 30)).toFixed(2)
}));
