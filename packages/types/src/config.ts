import { Conditions as TConditions } from './conditions'
import { Utility } from './css-utility'
import { Dict, RequiredBy } from './helper'
import type { CssProperty, Keyframes } from './panda-csstype'
import { Pattern } from './pattern'
import { Recipe } from './recipe'
import type { DotPath, TDotPath } from './shared'

type TBreakpoints = {
  [breakpoint: string]: string
}

export type TTokens = {
  [key: string]: string | TTokens
}

export type SemanticTokens<Tokens extends TDotPath = Dict, Conditions = Dict, Breakpoints = Dict> = {
  [K in keyof Tokens]?: {
    [token: string]: {
      [P in keyof Conditions | keyof Breakpoints | '_' | 'base']?: DotPath<Tokens>
    }
  }
}

type Shorthands = {
  [shorthand: string]: Array<CssProperty>
}

export type Config<
  Conditions extends TConditions = TConditions,
  Breakpoints extends TBreakpoints = TBreakpoints,
  Tokens extends TTokens = TTokens,
> = {
  cwd?: string
  hash?: boolean
  clean?: boolean
  outdir?: string
  prefix?: string
  include?: string[]
  exclude?: string[]
  watch?: boolean
  conditions?: TConditions
  breakpoints?: Breakpoints
  keyframes?: Keyframes
  tokens?: Tokens
  semanticTokens?: SemanticTokens<Tokens, Conditions, Breakpoints>
  shorthands?: Shorthands
  utilities?: Utility<Tokens>[]
  recipes?: Recipe[]
  patterns?: Pattern[]
}

export type TConfig = Config<TConditions, TBreakpoints, TTokens>

export function defineConfig<Conditions extends TConditions, Breakpoints extends TBreakpoints, Tokens extends TTokens>(
  config: Partial<Config<Conditions, Breakpoints, Tokens>>,
): Partial<Config<Conditions, Breakpoints, Tokens>> {
  return config
}

export type UserConfig = RequiredBy<Config, 'outdir' | 'cwd' | 'include'>
