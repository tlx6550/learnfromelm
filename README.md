# myelm

> myelmdemo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

env：配置真实线上接口地址
fetch：对获取数据的方式进行包装整理，返回一个promis对象
getData：接口数据获取
新增mint-ui框架
新增loading组件，优化加载体验
head组件 注册路由暂时修改
新增登陆接口

header :mapState可以读取状态树状态
mUtils：封装本地存储
forget组件创建

header:当切换或者刷新home页面，提交把用户信息存入vuex中
从state读取用户信息（需优化，这里有异步操作）
mutations暂时修改

引入字体图标
优化路由切换动画（info组件）

info:体验异步的终极解决方案-ES7的Async/Await
