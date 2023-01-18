import { mapObject } from '../helpers'
import { css } from '../css'

const config = {transform(props) {
  const { gapX, gapY, gap = gapX || gapY ? void 0 : "10px", align, justify, ...rest } = props;
  return {
    display: "flex",
    flexWrap: "wrap",
    alignItems: align,
    justifyContent: justify,
    gap,
    columnGap: gapX,
    rowGap: gapY,
    ...rest
  };
}}

export const getWrapStyle = (styles) => config.transform(styles, { map: mapObject })

export const wrap = (styles) => css(getWrapStyle(styles))