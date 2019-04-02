
import qrcode from '../../../public/utils/qrcode'
import barcode from '../../../public/utils/barcode'
import SetTitle from '../common/setTitle'

export default {
  name: 'RyQrcode',

  mixins: [SetTitle],

  data () {
    return {
      qrCodeUrl: '',
      barCodeUrl: '',
      code: '1016924283487',
      codeFormate: '',
      title: '宝贝豆美术课程500元代金券',
      startAt: '2018.07.20',
      endAt: '2018.10.02',
      codeSource: 1,
      codeStatus: 6,
      codeStatusOpts: {
        4: '已过期',
        5: '已退款',
        6: '已作废',
      },
    }
  },

  computed: {
    isUn () {
      return '456'.indexOf(this.codeStatus) >= 0
    },
  },

  mounted () {
    this.formateCode()
    this.getQrcode()
    this.getBarcode()
  },

  methods: {
    formateCode () {
      this.codeFormate = this.code.replace(/(\d{4})/g, '$1 ').replace(/\s$/g, '')
    },
    getQrcode () {
      const fg = '#000000'
      const bg = '#F5F5F5'
      let qrcodeCanvas = document.createElement('canvas')
      qrcodeCanvas.width = 325
      qrcodeCanvas.height = 325

      qrcode.draw(this.code, {
        ctx: qrcodeCanvas,
        width: 345,
        height: 345,
        fg,
        bg,
      })

      this.qrCodeUrl = qrcodeCanvas.toDataURL()
      qrcodeCanvas = undefined
    },
    getBarcode () {
      const fg = '#000000'
      const bg = '#F5F5F5'
      let barcodeCanvas = document.createElement('canvas')
      barcodeCanvas.width = 471
      barcodeCanvas.height = 124

      barcode(this.code, {
        ctx: barcodeCanvas,
        width: 471,
        height: 124,
        fg,
        bg,
      })

      this.barCodeUrl = barcodeCanvas.toDataURL()
      barcodeCanvas = undefined
    },
  },
}
