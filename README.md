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

进一步理解vue生命周期钩子函数
https://segmentfault.com/a/1190000008010666#articleHeader7
address组件，当已经加载过地址数据，当重新刷新dom 获取数据需要在这里执行！
数组的操作方法
 //数组在后加slice创建 其副本，解决Do not mutate vuex store state outside mutation handlers（需要在mutation的回调函数中修改！）
 当数组执行删除操作arry.splice(index,1)，其本身就返回操作后的结果了！
 也千万不要removeList=removeList.splice(index,1)
