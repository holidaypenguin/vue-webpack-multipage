# vue-webpack-multipage

> A Vue.js project

## Build Setup

``` bash
# 安装依赖
npm install

# 本地启动并打开第一个模块
npm run local

# 本地启动并打开第一个模块，可指定模块进行开发
npm run local index about

# 测试环境编译
npm run qa

# 测试环境编译，可指定模块进行开发
npm run qa index about

# 预发布环境编译
npm run preview

# 预发布环境编译，可指定模块进行开发
npm run preview index about

# 线上环境编译
npm run online

# 线上环境编译，可指定模块进行开发
npm run online index about
```

## 说明
本分支是在master分支基础上做的更改，同时做了个性化的修改。

module 文件夹下的文件夹路径作为模块的id，因此在指定发布模块时需要使用除module外玩转的路径名称。

每个模块下面有一个setting.js文件，里面指定当前模块的id（只能手动填写），便于路由进行配置，具体内容在index模块下查看。

项目的参数配置主要在config/index.js内，暂不支持produceName指定为空，因此该项目暂不支持在项目根目录的存放，需要修改。

## 该项目的对应的nginx配置

``` bash
# 路由配置页面无缓存
location ~ ^/(pos)/ {
    root /xxx/dist;
    index  index.html index.htm;
    expires -1;
    add_header Cache-Control no-cache;
    try_files $uri $uri/ @rewrites;
}
location @rewrites {
      rewrite ^/(pos)\/module\/(index|about)/ /$1_static/module/$2.html break;
}
```

## 缺陷
无esline
无测试用例
entry编译后为序号不是模块名字
vendor没有注入
