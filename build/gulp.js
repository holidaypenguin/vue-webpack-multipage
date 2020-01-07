
const config = require('../config')
const {task, src, watch} = require('gulp')
const sftp = require('gulp-sftp-up4')

const upload = () => {
  watch([config.build.assetsRoot], {
    ignoreInitial: false,
  }, function () {
    return src('../output/**')
      .pipe(sftp({
        host: '123.57.63.198',
        user: 'htmlftp',
        pass: 'a0125758fc9AA',
        remotePath: '/home/htmlftp/html',
      }))
  })
}

task('upload', () => {
  return upload('')
})
