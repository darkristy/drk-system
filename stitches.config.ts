import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";
import { leadingTrim } from "leading-trim";

import { composeUtil } from "./src/utils";

export type { VariantProps } from "@stitches/react";

export const colors = {
	black: "hsl(60, 3%, 7%)",
	cyan: "hsl(179, 50%, 60%)",
	orange: "hsl(28, 100%, 67%)",
	purple: "hsl(299, 34%, 70%)",
	yellow: "hsl(41, 92%, 65%)",
	green: "hsl(125, 69%, 70%)",
	red: "hsl(358, 65%, 68%)",
	gray: "hsl(253, 8%, 79%)",
	"dark-gray": "hsl(0, 0%, 9%)",
	"cool-gray": "hsl(212, 9%, 58%)",
	"light-gray": "hsl(24, 19%, 85%)",

	"blue-0": "hsl(207, 100%, 82%)",
	"blue-1": "hsl(210, 51%, 59%)",

	"neutral-0": "hsl(0, 0%, 20%)",
	"neutral-1": "hsl(0, 0%, 33%)",
	"neutral-2": "hsl(0, 0%, 47%)",
	"neutral-3": "hsl(0, 0%, 67%)",
	"neutral-4": "hsl(0, 0%, 80%)",
	"neutral-5": "hsl(0, 0%, 93%)",
	"neutral-6": "hsl(0, 0%, 96%)",
	"neutral-7": "hsl(0, 0%, 100%)",
};

export const fontSizes = {
	xxxs: "0.6em",
	xxs: "0.83em",
	xs: "1.46em",
	sm: "2.5em",
	md: "3.8em",
	lg: "5em",
	xl: "6.25em",
	xxl: "7.5em",
};

type Sizes = keyof typeof fontSizes;

export const { styled, theme, createTheme, getCssText, globalCss, config } = createStitches({
	theme: {
		colors: {
			...colors,
			bgDefault: colors["neutral-7"],
			bgInverse: colors.black,
			textHeadingDefault: colors["neutral-7"],
			textHeadingInverse: colors.black,
			textBodyDefault: colors.black,
			textBodyInverse: colors["neutral-7"],
			textMuted: colors["neutral-4"],
			borderDefault: colors.black,
			borderMuted: colors["neutral-4"],
			borderInverse: colors["neutral-7"],
		},
		fonts: {
			heading:
				"Inter, -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif",
			body: "Roboto, sans-serif",
			mono: "'Roboto Mono', Consolas, monaco, monospace",
		},
		fontSizes,
		sizes: {
			1: 0,
			2: "4px",
			3: "8px",
			4: "16px",
			5: "32px",
			6: "64px",
			7: "128px",
			8: "256px",
			9: "512px",
		},
		space: {
			1: 0,
			2: "4px",
			3: "8px",
			4: "16px",
			5: "32px",
			6: "64px",
			7: "128px",
			8: "256px",
			9: "512px",
		},
		fontWeights: {},
		lineHeights: { solid: "1", title: "1.25", copy: "125%" },
		radii: { full: "99999px" },
	},
	media: {
		mobile: "(min-width: 40em)",
		tablet: "(min-width: 52em)",
		desktop: "(min-width: 64em)",
		widescreen: "(min-width: 80em)",
		dark: "(prefers-color-scheme: dark)",
	},
	utils: {
		p: composeUtil("paddingLeft", "paddingRight", "paddingTop", "paddingBottom"),
		pl: composeUtil("paddingLeft"),
		pr: composeUtil("paddingRight"),
		pt: composeUtil("paddingTop"),
		pb: composeUtil("paddingBottom"),
		px: composeUtil("paddingLeft", "paddingRight"),
		py: composeUtil("paddingTop", "paddingBottom"),
		m: composeUtil("marginLeft", "marginRight", "marginTop", "marginBottom"),
		mx: composeUtil("marginLeft", "marginRight"),
		my: composeUtil("marginTop", "marginBottom"),
		ml: composeUtil("marginLeft"),
		mr: composeUtil("marginRight"),
		mt: composeUtil("marginTop"),
		mb: composeUtil("marginBottom"),
		size: composeUtil("width", "height"),
		bg: composeUtil("backgroundColor"),
		textSize: (value: Stitches.PropertyValue<"fontSize">) => {
			const sizes = Object.keys(fontSizes) as Array<Sizes>;

			const createCrops = (...values: number[]) =>
				sizes.reduce((val, key, i) => ({ ...val, [key]: values[i] }), {}) as Record<Sizes, number>;

			const top = { ...createCrops(6, 4, 4, 5.3, 5.2, 5.2, 5.2, 5.2) };
			const bottom = { ...createCrops(2, 4.4, 7.3, 5.2, 4, 4.9, 4.6, 4.9) };

			const size = (value as unknown as string).replace("$", "") as Sizes;

			return {
				fontSize: value,
				margin: 0,
				...leadingTrim({
					lineHeight: 1.2,
					reference: {
						fontSize: 40,
						lineHeight: 1,
						topCrop: (value as unknown as string) === "1.88em" ? 4 : top[size],
						bottomCrop: (value as unknown as string) === "1.88em" ? 6 : bottom[size],
					},
				}),
			};
		},
	},
});

export type CSS = Stitches.CSS<typeof config>;

export const darkTheme = createTheme("dark", {
	colors: {
		...colors,
		bgDefault: colors.black,
		bgInverse: colors["neutral-7"],
		textHeadingDefault: colors["neutral-7"],
		textHeadingInverse: colors.black,
		textBodyDefault: colors.gray,
		textBodyInverse: colors.black,
		textMuted: colors["neutral-4"],
		borderDefault: colors["neutral-7"],
		borderMuted: colors["neutral-4"],
		borderInverse: colors.black,
	},
});
