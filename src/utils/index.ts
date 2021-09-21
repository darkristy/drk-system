import type * as Stitches from "@stitches/react";

export const composeUtil =
	<P extends keyof Stitches.CSSProperties>(...properties: P[]) =>
	(value: any) =>
		properties.reduce(
			(final, cssProp) => ({
				...final,
				[cssProp]: value,
			}),
			{}
		);

export const hexToRgba = (hex: string, opacity: number): string => {
	let c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split("") as any;
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = `0x${c.join("")}` as any;
		// eslint-disable-next-line no-bitwise
		return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},${opacity})`;
	}
	throw new Error("Bad Hex");
};
