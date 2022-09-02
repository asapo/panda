import { error, info } from '@css-panda/logger'
import type { InternalContext } from '../create-context'
import { createConfigWatcher, createContentWatcher, createTempWatcher } from './watchers'

process.setMaxListeners(Infinity)

type Options = {
  onConfigChange: () => Promise<void>
  onContentChange: (file: string) => void
  onTmpChange: () => Promise<void>
}

export async function watch(ctx: InternalContext, options: Options) {
  const temp = await createTempWatcher(ctx, options.onTmpChange)
  const content = await createContentWatcher(ctx, options.onContentChange)
  const config = await createConfigWatcher(ctx.conf)

  async function close() {
    await config.close()
    await temp.close()
    await content.close()
  }

  config.on('update', async () => {
    await close()
    info('⚙️ Config updated, restarting...')
    await options.onConfigChange()
  })
}

process.on('unhandledRejection', (reason) => {
  error(reason)
})
process.on('uncaughtException', (err) => {
  error(err)
})