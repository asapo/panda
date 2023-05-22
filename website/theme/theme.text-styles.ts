import { defineTextStyles } from '@pandacss/dev'

export const textStyles = defineTextStyles({
  panda: {
    h1: {
      value: {
        fontSize: '14.5rem',
        lineHeight: '1.2',
        letterSpacing: 'tighter',
        fontWeight: 'bold'
      }
    },
    h2: {
      value: {
        fontSize: { base: '2.5rem', lg: '3rem' },
        lineHeight: '1.2',
        letterSpacing: 'tight',
        fontWeight: 'bold'
      }
    },
    h3: {
      value: {
        fontSize: { base: '1.875rem', lg: '2.25rem' },
        lineHeight: '1.2',
        letterSpacing: 'tight',
        fontWeight: 'semibold'
      }
    },
    h4: {
      value: {
        fontSize: '1.625rem',
        lineHeight: '1.2',
        letterSpacing: 'tight',
        fontWeight: 'medium'
      }
    }
  }
})