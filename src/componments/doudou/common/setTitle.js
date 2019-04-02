/* eslint-disable no-console */
import setTitle from '../../../public/utils/setTitle'

export default {
  beforeRouteEnter (to, from, next) {
    console.log('-----------------beforeRouteEnter------------------')
    setTitle((to.meta && to.meta.title) || 'doudou')
    next()
  },
}
