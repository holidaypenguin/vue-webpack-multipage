
import VConsole from 'vconsole'

if (process.env.RUN_ENV !== 'online' && process.env.RUN_ENV !== 'local') {
  // eslint-disable-next-line no-new
  new VConsole()
}
