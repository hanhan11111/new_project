```javascript
       // eslint-disable-line no-unused-vars
		<!-- v-text文本输入 -->
        <p v-text="message"></p>
        <p>{{message}}</p>

        <!-- v-html解析代码 -->
        <p v-html="content"></p>

        <!-- v-on（@）为元素绑定事件 -->
        <input type="button" value="v-on指令" v-on:click="doIt">
        <input type="button" value="v-on简写" @click="doIt">
        <input type="button" value="双击事件" @dblclick="doIt">
        <h2 @click="changefood">{{food}}</h2>
        <input type="button" value="点击" @click="doIt(666,'字符串')">
        <input type="text" @keyup.enter="sayHi">

        <!-- v-show=布尔值  根据表达值的真假 切换样式(display)来显示和隐藏 频繁切换使用-->
        <img v-show='isShow' src="img\美女1.jpg">
        <input type="button" value="切换点击事件" @click = 'changeisShow'>
        <img v-show='age>=18' src="img\美女1.jpg">
        <input type="button" value="增加年龄" @click = "changeAge">

        <!-- v-if=布尔值  根据表达值的真假,表达式为真会存在dom树中,表达式为假会从dom树中移除-->
        <img v-if='isShow' src="img\美女1.jpg">
        <input type="button" value="切换点击事件" @click = 'changeisShow'>
        <img v-if='age>=18' src="img\美女1.jpg">
        <input type="button" value="增加年龄" @click = "changeAge">

        <!-- v-bind(:)设置元素的属性 -->
        <img v-bind:src="isImg" alt="">
        <img :src="isImg" alt="" :title="imgTitle+'!!!'">
        <div :class="isActive?'active':''" @click='toggleActive'></div>
        <div :class="{active:isActive}" @click='toggleActive'></div>

        <!-- v-for根据数据生成列表结构 -->
        <ul>
            <li v-for="(item,index1) in arr">{{item}}的序号是{{index1+1}}</li>
        </ul>
        <h2 v-for="item in vegetable" v-bind:title="item.name">{{item.name}}</h2>
        <input type="button" value="添加数据" @click="add">
        <input type="button" value="移除数据" @click="remove">

        <!-- v-model获取和设置表单元素的值（双向数据绑定） 当页面改变时 data里的值也改变-->
        <input v-model="food">
```



### 一、html部分**

1. ```
   1. {{ xxx }} 插值表达式：存在闪烁问题，但不会覆盖元素中原本的内容
   2. v-cloak：解决插值表达式闪烁的问题
   3. v-text：没有闪烁问题且覆盖元素中原本的内容，内容当作字符串显示
   4. v-html：没有闪烁问题且覆盖元素中原本的内容，内容当作html显示
   5. v-bind：Vue提供的属性绑定机制  缩写是 :
   6. v-on： Vue提供的事件绑定机制  缩写是 @
   7. v-model：可以实现表单元素和 Model 中数据的双向绑定，只能运用再表单元素中
   ```

   

### **二、js部分**

1. ```
   1. new Vue({ })：创建一个Vue实例
   2. el : '  '  ：绑定Vue的使用范围DOM
   3. data : {  } ：展示的数据
   4. methods : {  } ：调用的方法
   5. this：如果想要获取 data 上的数据，或者 想要调用 methods 中的 方法，必须通过 this.数据属性名  或  this.方法名来进行访问，这里的this，就表示 我们 new 出来的 VM 实例对象
   6. filters : {  }：定义私有过滤器
   ```

   

### **三、事件修饰符：**

1. ```
   1. .stop：阻止冒泡
   2. .prevent：阻止默认行为
   3. .capture：给元素添加一个监听器，当元素发生冒泡时，先触发带有该修饰符的元素。若有多个该修饰符，则由外而内触发
   4. .self：实现只有点击当前元素时候，才会触发事件处理函数
   5. .once：只触发一次事件处理函数
   ```

   

**四、在监听键盘事件时，我们经常需要监听常见的键值，vue允许v-on在监听键盘事件时添加按键修饰符：**

- ```
  - enter
  - table
  - delete (捕获‘删除’和‘退格’键)
  - esc
  - space
  - up
  - down
  - left
  - right
  ```

  

**五、组件**

```javascript
<!DOCTYPE html>
<html>
    <body>
        <div id="app">
            <!-- 3. #app是Vue实例挂载的元素，应该在挂载元素范围内使用组件-->
            <my-component></my-component>
        </div>
    </body>
    <script src="js/vue.js"></script>
    <script>
        // 1.创建一个组件构造器
        var myComponent = Vue.extend({
            template: '<div>This is my first component!</div>'
        })
        // 2.注册组件，并指定组件的标签，组件的HTML标签为<my-component>
        Vue.component('my-component', myComponent)
        new Vue({
            el: '#app'
        });
    </script>
</html>

1.  Vue.extend()是Vue构造器的扩展，调用 Vue.extend()创建的是一个组件构造器。 
2.  Vue.extend()构造器有一个选项对象，选项对象的 template属性用于定义组件要渲染的HTML。 
3. 使用 Vue.component()注册组件时，需要提供2个参数，第1个参数时组件的标签，第2个参数是组件构造器。 
4. 组件应该挂载到某个Vue实例下，否则它不会生效。
```

```javascript
**父组件和子组件**
<!DOCTYPE html>
<html>
    <body>
        <div id="app">
            <parent-component>
            </parent-component>
        </div>
    </body>
    <script src="js/vue.js"></script>
    <script>
        var Child = Vue.extend({
            template: '<p>This is a child component!</p>'
        })
        
        var Parent = Vue.extend({
            // 在Parent组件内使用<child-component>标签
            template :'<p>This is a Parent component</p><child-component></child-component>',
            components: {
                // 局部注册Child组件，该组件只能在Parent组件内使用
                'child-component': Child
            }
        })
        
        // 全局注册Parent组件
        Vue.component('parent-component', Parent)
        
        new Vue({
            el: '#app'
        })
        
    </script>
</html>

var Child = Vue.extend(...)定义一了个Child组件构造器
var Parent = Vue.extend(...)定义一个Parent组件构造器
components: { 'child-component': Child }，将Child组件注册到Parent组件，并将Child组件的标签设置为child-component。
template :'<p>This is a Parent component</p><child-component></child-component>'，在Parent组件内以标签的形式使用Child组件。
Vue.component('parent-component', Parent) 全局注册Parent组件
在页面中使用<parent-component>标签渲染Parent组件的内容，同时Child组件的内容也被渲染出来
```

```javascript
全局组件
// 全局注册，my-component1是标签名称
Vue.component('my-component1',{
    template: '<div>This is the first component!</div>',
     data: function(){
        return {a : 1}
    }

})
var vm1 = new Vue({
    el: '#app1'
})
Vue.component()的第1个参数是标签名称，第2个参数是一个选项对象，使用选项对象的template属性定义组件模板。
使用这种方式，Vue在背后会自动地调用Vue.extend()。
```

```javascript
局部注册

var vm2 = new Vue({
    el: '#app2',
    components: {
        // 局部注册，my-component2是标签名称
        'my-component2': {
            template: '<div>This is the second component!</div>'
        },
        // 局部注册，my-component3是标签名称
        'my-component3': {
            template: '<div>This is the third component!</div>'
        }
    }

```

```javascript
template里内容可写在body里
1、使用<script>标签
<!DOCTYPE html>
<html>
    <body>
        <div id="app">
            <my-component></my-component>
        </div>
        <script type="text/x-template" id="myComponent">
            <div>This is a component!</div>
        </script>
    </body>
    <script src="js/vue.js"></script>
    <script>
        Vue.component('my-component',{
            template: '#myComponent'
        }) 
        new Vue({
            el: '#app'
        })  
    </script>
2、使用<template>标签
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <div id="app">
            <my-component></my-component>
        </div>
        <template id="myComponent">
            <div>This is a component!</div>
        </template>
    </body>
    <script src="js/vue.js"></script>
    <script>
        Vue.component('my-component',{
            template: '#myComponent'
        })
        new Vue({
            el: '#app'
        })
    </script>
</html>
在理解了组件的创建和注册过程后，我建议使用<script>或<template>标签来定义组件的HTML模板。
这使得HTML代码和JavaScript代码是分离的，便于阅读和维护。
```

**六、父传子组件**

![1610442049375](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1610442049375.png)

```javascript
如果我们想使父组件的数据，则必须先在子组件中定义props属性
var vm = new Vue({
    el: '#app',
    data: {
        name: 'keepfool',
        age: 28
    },
    components: {
        'my-component': {
            template: '#myComponent',
            props: ['myName', 'myAge']
        }
    }
})
```


（1）定义子组件的HTML模板

```javascript
<template id="myComponent">
    <table>
        <tr>
            <th colspan="2">
                子组件数据
            </th>
        </tr>
        <tr>
            <td>my name</td>
            <td>{{ myName }}</td>
        </tr>
        <tr>
            <td>my age</td>
            <td>{{ myAge }}</td>
        </tr>
    </table>
</template>

props{
    myName:{
         type:String,
         required:true,//约束是否必填
         default:false,//默认值
    },
    myAge:{
         type:Number
    }
}
```

（2）将父组件数据通过已定义好的props属性传递给子组件：

```javascript
<div id="app">
    <my-component v-bind:my-name="name" v-bind:my-age="age"></my-component>
</div>
语法：
<child-component v-bind:子组件prop="父组件数据属性"></child-component>
```

注意：在子组件中定义prop时，使用了camelCase命名法。由于HTML特性不区分大小写，camelCase的prop用于特性时，需要转为 kebab-case（短横线隔开）。例如，在prop中定义的myName，在用作特性时需要转换为my-name。

（3）单向绑定

```
prop默认是单向绑定：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意修改了父组件的状态
```

（4）双向绑定

```javascript
可以使用.sync显式地指定双向绑定，这使得子组件的数据修改会回传给父组件。

<my-component v-bind:my-name.sync="name" v-bind:my-age.sync="age"></my-component>
```

**七、子组件传给父组件**

```
（1）子元素：
<template>
    <div class="item" :class={active:isactive} @click="handleClick">
        <!-- 插槽 -->
        <slot></slot>
    </div>
</template>

 methods: {
        handleClick(){
            this.$emit('active',123)//active为自定义事件名称 123为传给父元素的值也可以没
        }
    },

（2）父元素
<template>
<div>
  <div style="width:150px;height:100px;border:1px solid;">
    <!-- 宽高由父元素控制  -->
      <Item :isactive = "curActive === 'dongman'" @active = "getactive">
      										//接受自定义事件 并给予回应（getactive）
        <h1>动漫</h1>
      </Item>
  </div>
</template>

 methods: {
    getactive(e){
      alert(e);
    },
  }
  
```

![1610507900333](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1610507900333.png)

**八、vue-cli目录**

1. ```
   1. build 文件夹：用于存放 webpack 相关配置和脚本。开发中仅 偶尔使用 到此文件夹下 webpack.base.conf.js 用于配置 less、sass等css预编译库，或者配置一下 UI 库。
   2. config 文件夹：主要存放配置文件，用于区分开发环境、线上环境的不同。 常用到此文件夹下 config.js 配置开发环境的 端口号、是否开启热加载 或者 设置生产环境的静态资源相对路径、是否开启gzip压缩、npm run build 命令打包生成静态资源的名称和路径等。
   3. dist 文件夹：默认 npm run build 命令打包生成的静态资源文件，用于生产部署。
   4. node_modules：存放npm命令下载的开发环境和生产环境的依赖包。
   5. src: 存放项目源码及需要引用的资源文件。
   6. src下assets：存放项目中需要用到的资源文件，css、js、images等。
   7. src下componets：存放vue开发中一些公共组件：header.vue、footer.vue等。
   8. 1. src下emit：自己配置的vue集中式事件管理机制。
   9. src下router：vue-router vue路由的配置文件。
   10. src下service：自己配置的vue请求后台接口方法。远程的数据服务
   11. src下page：存在vue页面组件的文件夹。
   12. src下util：存放vue开发过程中一些公共的.js方法。
   13. src下vuex：存放 vuex 为vue专门开发的状态管理器。
   14. src下app.vue：使用标签`<route-view></router-view>`渲染整个工程的.vue组件。
   15. src下main.js：vue-cli工程的入口文件。
   16. index.html：设置项目的一些meta头信息和提供`<div id="app"></div>`用于挂载 vue 节点。
   17. package.json：用于 node_modules资源部 和 启动、打包项目的 npm 命令管理。
   ```

   



1、vue是前端的一种开发框架，它主要解决前端开发中的核心痛点：复杂的DOM操作

![1609728722009](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609728722009.png)

2、注入

![1609737823626](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609737823626.png)

3、DOM虚拟树（_vnode）

为了提高渲染效率 vue会把模板编译成为虚拟DOM树，然后再生成真实的DOM

![1609745964183](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609745964183.png)

因此 对于vue而言 提升效率重点着眼于两个方面

- 减少新的虚拟DOM的生成
- 保证对比之后 只有必要的节点的变化

![1609747435185](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609747435185.png)

因为虚拟DOM树是单根的  所以模板必须是单根的  模板是为形成虚拟DOM树存在的

原因：diff算法只能两棵树做对比

4、挂载、完整流程

![1610344905647](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1610344905647.png)

![1609748464317](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609748464317.png)

![1609748260967](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609748260967.png)

5、key值作用

diff算法会比对最小变动节点   当两个节点类型相同时 diff算法不会改变节点内内容  

解决方法：添加key属性 如果有key值 它只比对key值

vue强烈建议给循环生成的节点中给予稳定唯一的key值

6、计算属性computed

![1609814917305](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609814917305.png)

computed和methods区别：计算属性有缓存 如果依赖属性不变 计算属性值就不变

​												计算属性可以赋值

![1609815316092](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609815316092.png)

7、箭头函数：所有匿名函数都可以写成箭头函数（this永远指向定义位置）

![1610009249442](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1610009249442.png)

8、![1610012497439](C:/Users/Administrator/Desktop/md笔记/typora-user-images/1610012497439.png)

模块化

<script src='./main.js' type = 'module'></script>
作用：main.js中的全局函数、方法只能在main.js中使用 不能在window中访问

- 1、想要暴露出去的东西在编写时+export default 
- 2、引用时 import 定义名字 from ‘相对路径’

9、组件

- 全局注册

![1610083141248](C:/Users/Administrator/Desktop/md笔记/typora-user-images/1610083141248.png)

- 局部注册

![1610084548564](C:/Users/Administrator/Desktop/md笔记/typora-user-images/1610084548564.png)

十、![1610518900489](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1610518900489.png)

十一、data函数为方法的原因：每次调用data中的值要是function的返回值 保证数据的准确性

十二、生命周期

![1610618399505](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1610618399505.png)

![img](https://img2018.cnblogs.com/blog/1401779/201811/1401779-20181113183511366-1129112584.png)

十三、table组件

1.------------->   <el-table :data="usersList">

表格绑定了用于存储数据的数组,里面每一个元素都是数据对象

2.------------->   <template slot-scope="scope">

这是作用域插槽中定义一个对象(这里对象被定义为scope)来存储插槽上绑定的数据的用法

3.------------->   scope.row

在这里使用ElementUI表格模板渲染数据时,

"当前行数据的获取也会用到插槽,scope相当于一行的数据， scope.row相当于当前行的数据对象,"(这是在网上看到的一个解释,暂且记下)

十四、**同步执行和异步执行**

同步执行：类似于单窗口排队  只能等上一行执行完才能执行下一行（js是同步）

异步执行：类似于多窗口，不用等上一个执行完既可执行下一个（浏览器是异步）

由于发送ajax请求是仅发送出去就完成，不用等服务器回应，所以当函数包含ajax请求时 要在请求前加await把它变成同步执行  在函数前加async

十五、AJAX

##### HTTP协议（非常重要）组成：从客户端发送的http请求（request）从服务端返回的响应（response）

**http请求（request）**
主要有三个组成部分:请求行,请求头,请求主体   

> ```
> 请求行
> - 请求方法
> - 请求地址（url）
> - 协议版本
> 请求方法（所有方法全为大写）有多种：
> GET 请求获取Request-URI所标识的资源（常用）
> POST 在Request-URI所标识的资源后附加新的数据（常用）
> HEAD 请求获取由Request-URI所标识的资源的响应消息报头
> PUT 请求服务器存储一个资源，并用Request-URI作为其标识
> DELETE 请求服务器删除Request-URI所标识的资源
> TRACE 请求服务器回送收到的请求信息，主要用于测试或诊断
> CONNECT 保留将来使用
> OPTIONS 请求查询服务器的性能，或者查询与资源相关的选项和需求
> ```

- 

十六 、**跨域**

跨域：跨域是指一个域下的文档或脚本试图去请求另一个域下的资源，这里跨域是广义的。

同源策略："协议+域名+端口"三者相同，它是浏览器最核心也最基本的安全功能

前端代码部署到服务器Nginx上  后台代码部署到Tomcat上 前端想访问后台服务器 产生跨域



### **跨域解决方案**

1、 通过jsonp跨域
2、 document.domain + iframe跨域
3、 location.hash + iframe
4、 window.name + iframe跨域
5、 postMessage跨域
6、 跨域资源共享（CORS）：后台处理 规定那些可以访问服务器 *代表所有都可以访问
7、 nginx代理跨域：正向代理是有明确的要访问的地址   反向代理只要给正确的返回值就行，不关注访问的服务器是谁
8、 nodejs中间件代理跨域
9、 WebSocket协议跨域

十九、**Vue**

1、vue是一个单页面操作 即不更换页面  仅更换页面里的内容

2、写好的vue文件 会通过webpack打包形成js文件  浏览器只识别js、html、css文件





