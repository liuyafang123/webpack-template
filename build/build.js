'use strict'
//版本检查node的版本号  立即执行
//require('./check-versions')()

const ora = require('ora')//是一个命令行圈圈动画插件
const rm = require('rimraf')//是用来执行UNIX命令rm和-rf的用来删除文件夹和文件的插件，清空旧文件
const path = require('path')
const chalk = require('chalk')//用来在命令行输入不同的文字
const webpack = require('webpack')//引入webpack模块使用内置插件和webpack方法
const config = require('../config')//引入模块，分为文件模块和内置模块
const webpackConfig = require('./webpack.prod.conf')//
var connect = require('connect')
var serveStatic = require('serve-static')//静态文件

const spinner = ora(
  'building for ' + process.env.env_config + ' environment...'
)
spinner.start()
//调用rm方法 ，绝对/工程名/dist/static，表示删除这个路径下面的所有文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
//在删除过程中出现错误，抛出这个错误，程序终止
    if (err) throw err
    //没有错误就执行webpack编译
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()//停止圈圈
    //错误，抛出错误
    if (err) throw err
 //没有错误就继续执行，proces.stdout.write.与console.log类似，输出对象
    process.stdout.write(
//static保存着所有编译过程的消息。
      stats.toString({
        colors: true,//增加控制台的颜色
        modules: false,//不增加内置模块信息
        children: false,//不增加子级信息
        chunks: false,//允许较少的输出
        chunkModules: false//部将内置模块的信息加到包信息
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red(' Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan(' Build complete.\n'))
    console.log(
      chalk.yellow(
        ' Tip: built files are meant to be served over an HTTP server.\n' +
          " Opening index.html over file:// won't work.\n"
      )
    )

    if (process.env.npm_config_preview) {
      const port = 9526
      const host = 'http://localhost:' + port
      const basePath = config.build.assetsPublicPath
      const app = connect()

      app.use(
        basePath,
        serveStatic('./dist', {
          index: ['index.html', '/']
        })
      )

      app.listen(port, function() {
        console.log(
          chalk.green(`> Listening at  http://localhost:${port}${basePath}`)
        )
      })
    }
  })
})