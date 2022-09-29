import { walkObject } from '@css-panda/shared'
import type { Dict, SemanticTokens } from '@css-panda/types'
import { match } from 'ts-pattern'
import { TokenData } from './token-data'
import { transform } from './transform'

type IterFn = (data: TokenData, condition: string) => void
type Options = { prefix?: string }

export function createSemanticTokenFn(tokens: SemanticTokens, options: Options = {}) {
  const { prefix } = options
  return function forEach(fn: IterFn) {
    for (const [category, values] of Object.entries(tokens)) {
      const map = createSemanticTokenMap(values)
      match(category)
        .with('spacing', () => {
          map.forEach((values, condition) => {
            values.forEach((value, key) => {
              const data = { category, entry: [key, value] } as const
              fn(new TokenData(data, { prefix }), condition)
              fn(new TokenData(data, { negative: true, prefix }), condition)
            })
          })
        })
        .otherwise(() => {
          map.forEach((values, condition) => {
            values.forEach((value, key) => {
              const data = { category, entry: [key, transform(category, value)] } as const
              fn(new TokenData(data, { prefix }), condition)
            })
          })
        })
    }
  }
}

export function createSemanticTokenMap(values: Dict = {}) {
  const map = new Map<string, Map<string, string>>()

  walkObject(
    values,
    function resolve(value, path) {
      const condition = path.pop()!
      const key = path.join('.')

      const isDefault = condition === '_' || condition === 'base'
      const prop = isDefault ? 'base' : condition

      map.get(prop) ?? map.set(prop, new Map())
      map.get(prop)?.set(key, value)
    },
    {
      stop(value) {
        return Array.isArray(value)
      },
    },
  )

  return map
}