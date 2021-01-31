const path = require('path')
const packagePath = path.join(path.resolve('./'), 'package.json')
const { dependencies } = require(packagePath)

console.log(dependencies, 33333333333333)

module.exports = ({ config, env }) => {
  const port = 8001
  const projectName = 'empReactBase'
  const publicPath = `http://localhost:${port}/`
  // 设置项目URL
  config.output.publicPath(publicPath)
  // 设置项目端口
  config.devServer.port(port)
  config.resolve.alias.set('@', path.resolve('./', 'src'))
  config.plugin('mf').tap((args) => {
    args[0] = {
      ...args[0],
      // 项目名称
      name: 'empReactBase',
      remotes: {
        // 远程项目别名：远程引入的项目名
        '@emp/react-project': 'empReactProject@http://localhost:8002/emp.js',
      },
      // 需要暴露的东西
      exposes: {
        './configs/index': 'src/configs/index',
        './components/Demo': 'src/components/Demo',
        './components/Hello': 'src/components/Hello',
      },
      // 需要共享的依赖
      shared: {},
      // 被远程引入的文件名
      filename: 'emp.js',
      // 暴露项目的全局变量名
      library: { type: 'var', name: projectName },
    }
    return args
  })
  // 配置 index.html
  config.plugin('html').tap((args) => {
    args[0] = {
      ...args[0],
      ...{
        // head 的 title
        title: 'EMP-Base-Project',
        // 远程调用项目的文件链接
        files: {},
      },
    }
    return args
  })
}
