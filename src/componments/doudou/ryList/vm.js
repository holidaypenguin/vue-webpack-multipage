// import Dom from '../../../public/utils/dom'
import Masonry from 'masonry-layout'
import SetTitle from '../common/setTitle'

export default {

  name: 'RyList',

  mixins: [SetTitle],

  components: {
  },

  data () {
    return {
      code: '',
      msnryEl: undefined,
    }
  },

  mounted () {
    this.setMasonryLayout()
  },
  methods: {
    setMasonryLayout () {
      this.msnry = new Masonry('.ry-list', {
        itemSelector: '.ry-item-wrap',
        columnWidth: parseInt(this.$refs.list.clientWidth / 2, 10), // 当有宽度有小数位时，会自动进一位，因此减去1
      })
    },
  },
  destroyed () {
  },
}
