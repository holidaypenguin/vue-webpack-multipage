
const rm = require('rimraf')
const path = require('path')
const config = require('../config')
const {task, src, dest} = require('gulp')

const removeDist = (env) => {
  return new Promise((resolve, reject) => {
    rm(path.join(config.build.assetsStorage, env), () => {
      resolve()
    })
  })
}

const removeOutput = (env) => {
  return new Promise((resolve, reject) => {
    rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), () => {
      resolve()
    })
  })
}

task('copy:qa:dist', () => {
  return removeDist('qa').then(() => {
    return src(`${path.join(config.build.assetsRoot)}/**`)
      .pipe(dest(path.join(config.build.assetsStorage, 'qa')))
  })
})

task('copy:qa:output', () => {
  return removeOutput().then(() => {
    return src(`${path.join(config.build.assetsStorage, 'qa')}/**`)
      .pipe(dest(config.build.assetsRoot))
  })
})

task('copy:preview:dist', () => {
  return removeDist('preview').then(() => {
    return src(`${path.join(config.build.assetsRoot)}/**`)
      .pipe(dest(path.join(config.build.assetsStorage, 'preview')))
  })
})

task('copy:preview:output', () => {
  return removeOutput().then(() => {
    return src(`${path.join(config.build.assetsStorage, 'preview')}/**`)
      .pipe(dest(config.build.assetsRoot))
  })
})

task('copy:online:dist', () => {
  return removeDist('online').then(() => {
    return src(`${path.join(config.build.assetsRoot)}/**`)
      .pipe(dest(path.join(config.build.assetsStorage, 'online')))
  })
})

task('copy:online:output', () => {
  return removeOutput().then(() => {
    return src(`${path.join(config.build.assetsStorage, 'online')}/**`)
      .pipe(dest(config.build.assetsRoot))
  })
})
