import type { PropertiesFallback } from './csstype'
import type { PropertyValue } from './prop-type'

type String = string & {}
type Number = number & {}

/* -----------------------------------------------------------------------------
 * Shadowed export (in CLI): DO NOT REMOVE
 * -----------------------------------------------------------------------------*/

type CssProperties = PropertiesFallback<String | Number>

export type SystemProperties = {
  [K in keyof CssProperties]?: PropertyValue<K>
}