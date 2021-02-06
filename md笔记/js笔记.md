1、**JS 引擎是单线程的，是通过 “轮转时间片” 来模拟多线程的。**

**轮转时间片**：短时间内轮流执行多个任务的片段。

```
流程：

1. 任务一、任务二
2. 切分任务一和任务二，分别将任务一和任务二切分为多个片段
3. 随机排列这些任务的片段，组成一个队列（注意：是随机排列的）
4. 按照这个队列顺序，将任务片段送进JS进程
5. JS进程执行一个又一个的任务片段

由于JS进程执行的很快，我们感受不到，所以感觉是多线程的。
```

2、web标准：结构 行为 样式 相分离

js是解释性语言、动态语言  解释一行执行一行 

3、c  = a+b   //先运算（高优先级）a+b  再赋值给（低优先级）c

4、数据类型：原始值（基本数据类型） 引用值（引用数据类型）

​    基本数据类型：Number（浮点型）

​								Boolean（1true,0false） 

​								String （“”中都是字符串）

​								undefined (没有定义的)

​								null   （占位）

引用数据类型：array object function ... data RegExp

5、

```
引用数据类型：存储在堆中（赋值为指向堆的地址）
var a = 1; var b = a; a = 2;//b = 1
基本数据类型：存储在栈中（赋值为值本身） 
var arr = [1];var arr1 = arr; arr.push('2');//arr[1,2] arr1[1,2]
```

6、

```
"+"  1 数学运算
	 2 字符串拼接
	 3 0/0 = NaN (NOT A NUMBER)
	 4 1/0 = Infinity(无限的)
	 
&&和||   都遵循短路原理（即通过最短路径达到目的 不需要把所有条件都执行和判断）
当逻辑或||时，找到为true的分项就停止处理，并返回该分项的值，否则执行完，并返回最后分项的值。
当逻辑与&&时，找到为false的分项就停止处理，并返回该分项的值。否则执行完，并返回最后分项的值

!!和! 	“!!“操作符是判断变量是否真正为真（非0/null/undefined/false/NaN/””、’'等）的很简明的实现方式，省去了大量的&&运算
		！a返回a的相反布尔值
		！！a返回a的布尔值
```

7、typeof可以返回 number string Boolean object undefined function 

typeof（typeof（'abc'））//string 

instanceof运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上

两者缺点：typeof适用于基础数据类型判断，引用类型判断都是object。 instanceof 判断一个实例是否属于某种类型，但严重存在原型继承，所以判断最好在两个对象之间

8、显示类型转换 Number(mix)   parseInt(string,radix)    parseFloat(string)   Boolean（）

String（demo）  demo.toString（）

9、隐士类型转换

 isNaN（）把变量转换为number类型 转后不是number类型返回true  是number类型返回false

++ /--  先把非number类型转换成Number类型 在++/--

=== /!==不发生类型转换

10、函数

（1）函数声明    function theFirstName(){}

（2）（匿名）函数表达式var text = function(){}    

（3）arguments：实参列表数组  

函数名.length:形参数组长度

（4）不定参数

```javascript
function sum(){
  	var result = 0;
  	for(var i = 0;i<arguments.length;i++){
  		result +=arguments[i];
  	}
}
sum(1,2,3,4,5,6,7,8,9,10)//55
```

11、全局变量和局部变量

全局变量：在script标签里定义的（不可以访问函数里的）

局部变量：在函数中定义的（可以访问全局的或者上级函数的，但不可以访问下级函数的变量）

12、递归：阶乘

```
function mul(n){
	if(n == 1){
		return 1;
	}
	return n*mul(n-1);
}
5的阶乘：mul(5);
```

13、变量 声明提升

```
 console.log(a);
 var a =  123;//又var定义的变量在编译是会先开辟存储空间 定义为undefined
```

函数声明整体提升 

```
test();
function test(){}//又function定义的函数在编译时会先开辟存储空间 且优先级最高
```

14、预编译

```
（1）全局作用域（window）未经声明的变量直接赋值归window所有
function (){
	//b = 123=>var a=>a = 123
	var a = b = 123;//window.b = 10   window.a = undefined;
}
(2)预编译规则
1、创建AO(局部)/GO(全局)对象（执行上下文）
2、找形参和变量声明，将变量和形参名作为AO属性名 值为undefined
3、将实参值和形参统一(实参赋值给形参)
4、在函数体里面找函数声明 值赋予函数体（function声明优先级最高）
（3）函数作用域内先访问自己的AO  没有在去GO里找
```

15、作用域

```
[[scope]]：函数作用域链：执行上下文的集合
function a(){}//a defined a.[[scope]]-->0:GO{}
var glob = 100;
a();//a doing a.[[scope]]-->0:AO{}(开头) 1:GO{}（末尾）  执行完消失
```

![1608624190338](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608624190338.png)

![1608624494547](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608624494547.png)

![1608625824352](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608625824352.png)

​																														1：aAO

​																														2：GO

​						c defined       c.[[scope]]  --> 0:bAO 1:aAO 2:GO

​						c doing       c.[[scope]]  --> 0:cAO   1:bAO 2:aAO 3:GO

16、闭包

![1608814336137](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608814336137.png)

```
规律：但凡是内部的函数保存在了外部 必定形成闭包
(1)function test(){							(2)	function test(){
	var num = 100;									var arr = [];
	function a(){									for(var i =0;i<10;i++){
		num++;											arr[i] = function(){
		console.log(num);									document.write(i+" ");
	}													}
	function b(){								}
		num--;										return arr;
		console.log(num);							}
	}											var myArr = test();
	return [a,b];								for(var j = 0;j<10;j++){
}													myArr[j]();//10 10 10 10.....10
var myArr = test();								}
myArr[0]();//101
myArr[1]();//99

(3)立即执行函数套函数传i  i是123456..
function test(){								(4)var demo;
		var arr = []								function test(){
		// var j = 0;									var abc = 100;
		for(var i = 0;i<10; i++) {						function a(){
			(function(j){									console.log(abc);
				arr[j] = function(){					}
					document.write(j);					demo = a;
				}									}
			}(i));									test();
			}										demo();
			return arr;
		}
	var myArr = test();
	for (var j = 0; j <10; j++) {
		myArr[j]();
	}


```

![1608776036946](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608776036946.png)

17、匿名函数,立即执行函数

```
var num = (function(a,b,c){
	var d = a+b+c;
	return d;
}(1,2,3));

注意：function foo(x){
		console.log(arguments);
		return x
	}(1,2,3,4,5)//不报错 但也不执行  因为只定义了函数foo 
	(function foo(x){
		console.log(arguments);
		return x
	})(1,2,3,4,5)//立即执行函数可以执行 输出[1,2,3,4,5]
```

18、构造函数

```
(1)构造函数命名规则：大驼峰式命名规则
(2)有new的构造函数  返回值只能是对象 如果写return 123；浏览器会自动忽略 返回对象
```

19、this

![1608877896666](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608877896666.png)

```
function Person(name,height){
	//构造函数被调用 
	//首先创建一个var this = {}
	this.name  = name;
	this.height = height;
	this.say = function(){
		console.log(this.say);
	}
	//最后默认返回this
	//return this
}
console.log(new Person('小王',180).name);//小王

var deng = {
	wife1:{name:'xiaozhang1'};
	wife2:{name:'xiaozhang2'};
	wife3:{name:'xiaozhang3'};
	sayWife:function(num){
		//obj.name --> obj['name']//隐式转换
		return this['wife'+num]
	}
}
```

20、包装类

```
1、原始值没有属性和方法
toString() Number() Boolean()
2、var num = 4;
	num.len = 3;
	//num Number(4).len = 3; delete
	//
	//new Number(4).len;//undefined
	console.log(num.len)
```

21、call/apply：改变this指向 区别：传参列表不同（apply以数组形式传参）

```
function Person(name, age){
	//this = obj{}
	this.name = name;
	this.age = age;
}
var person = new Person('小王',100);
var obj = {}
person.call(obj,'小王',100);
//把person中的this全部换成obj
//第二个实参开始 传值给形参
```

![1608801381932](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608801381932.png)

![1608801715218](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608801715218.png)

2、原型链

```
函数：prototype对象
对象：__proto__属性
（1）Object.prototype.__proto__ 的值为 null
（2）特:function().prototype是一个function
       function.prototype.__proto = Object.prototype
(3)实例对象.__proto__ == 实例对象的构造函数.prototype

```

![34de631e4a3ff096f0669066d7ce9f7a(1)](C:\Users\Administrator\Desktop\笔记\34de631e4a3ff096f0669066d7ce9f7a(1).png)

22、继承

![1608803078379](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608803078379.png)

```javascript
1、共享原型
Father.prototype.lastname = '小王';
function Father(){}
function Son(){}
function inherit(Target,Origin){
	Target.prototype = Origin.prototype;
}
inherit(Son,Father);//先继承
var son  = new Son();//后用
缺点：给Son.prototype加属性  Father.prototype也新增属性

2、圣杯模式
function F(){}
F.prototype = Father.prototype
Son.prototype = new F();

//son.__proto__ -->new F().__proto__ -->Father.prototype

var inherit = (function(){
	var F = function(){};    //闭包，变成私有化变量，在函数外部无法调用
	return function(Target, Origin)
	{
		F.prototype = Origin.prototype;
		Target.prototype = new F();
		Target.prototype.constuctor = Target;
		Target.prototype.uber = Origin.prototype;
	}
}());
```

23、对象的枚举（枚举是指对象中的属性是否可以被遍历。）

![1608866210396](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608866210396.png)

```
var obj = {
	name:'13',
	age:123,
	sex:'male',
	height:180,
	weight:75,
	__proto__:{
		lastName:'deng',
		__proto__:Object.prototype
	}
}
(1)for in 遍历数组或者对象的属性.(只会遍历我们自定义的属性，原型上默认的属性不会遍历出来)
for(var prop in obj){
	console.log(obj[prop])
}
(2)hasOwnProperty
(Object.hasOwnProperty(prop) 用来判断某个对象是否含有指定的属性的，返回值为Boolean ，该方法会忽略掉那些从原型链上继承到的属性(__proto__)。)
for(var prop in obj){
	if(obj.hasOwnProperty(prop)){
		console.log(obj[prop]);
	}
}
(3)in 用来判断某个对象是否含某个属性  返回值为Boolean
(4)instanceof:A对象  是不是 B构造函数构造出来的 返回布尔值
				看A的原型链上有没有B的原型
A instanceof B
```

24、try...catch

![1608881428488](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608881428488.png)

25、事件

![1608882897705](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608882897705.png)

```
(2)addEventListener('click',function(){},false).除ie9
注：绑定事件中的function会形成闭包
(3)attachEvent(‘onclick’,function(){}).ie9独用
```

![1608884766921](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608884766921.png)

26、事件冒泡、捕获（事件流）

![1608884936735](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608884936735.png)

```
一个对象的一个事件类型只能存在一个事件模型（冒泡或捕获）
(1)捕获：只有谷歌浏览器实现
addEventListener('click',function(){},true)
```

![1608885686831](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608885686831.png)



```
取消冒泡
事件对象：
div.onclick = function(e){//e会传一个事件对象，记载了事件发生时的一系列信息
	console.log(e);
	（1）e.stopPropagation()//阻止冒泡
}
//封装取消冒泡函数
(2)function stopBubble(event){
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
}
```

```
阻止默认事件
（1）document.oncontextmenu = function(){
	console.log('a');//右键控制谈打印a
	return false;//默认事件取消
}
（2）document.oncontextmenu = function(e){
	console.log('a');//右键控制谈打印a
	e.preventDefault()//默认事件取消
}
(3)<a href = 'javascript:void(false/0)'>demo</a>//void(false)返回false 组织默认事件
封装组织默认事件方法：
function cancelHandler(event){
	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
}
```

27、事件对象

```
事件对象：
div.onclick = function(e){//e会传一个事件对象，记载了事件发生时的一系列信息
	console.log(e);
	（1）e.stopPropagation()//阻止冒泡
}

var event = e || window.event//ie和其他浏览器不同 ie的this指向window
```

事件源对象：在事件中，当前操作的那个元素就是事件源。

```
var target = event.target || event.srcElement;
```

![1608968840811](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608968840811.png)

![1608968879426](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1608968879426.png)

28、json

![1609122274141](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609122274141.png)

29、css行内元素 块级元素

![1609297914416](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609297914416.png)

![1609297957738](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609297957738.png)

30、居中

```
相对于文档/窗口居中：{
	position:absolute;//position:fixed
	left:50%;
	top:50%;
	width:100px;
	height:100px;
	margin-left:-50px;
	margin-top:-50px;
}
```

31、两栏布局

```
.right{
	position:absolute;
	right:0;
	width:0;
	width:100px;
	height:100px;
}
.left{
	margin-right:100px;
	height:100px;
}
```

32、两个经典bug

```
1、父元素中有子元素  父子元素的magin-top取他俩中最大的 一起挪动
解决方法1：给父亲加一个border-top(不推荐)
解决方法2：btc（block format context）
		触发btc四种方式
		（1）position:absolute;
		（2）display:inline-block;
		（3）float:left/right;
		（4）overflow:hidden;
2、上一个元素设置了magin-bottom 下一个元素设置magin-top无效
解决方法： 同一只设置magin-bottom或magin-top
```

33、绝对定位和相对定位区别

```
（1）相对定位relative：相对于原来位置定位  保留原来位置的空间 后面元素不会改变位置
（2）绝对定位absolute：相对于开启相对定位的父元素定位 不保留原来位置的空间 后面元素会改变位置
```

33、高度塌陷

```
问题描述：float子元素后 子元素脱离文档流 父元素没有了内容  不能被撑开
解决方式：浮动元素后新增一个元素开启clear:'both'(必须是块级元素)
（1）在父元素中添加一个<p>或其他标签  设置样式clear：both清除左右浮动 （不推荐）
（2）伪元素:父元素 ::after{content:'';display:block;clear:'both';}
（3）父级元素也变成bfc元素
```

bfc元素

```
可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。
二、形成BFC的条件
      1、浮动元素，float 除 none 以外的值； 
      2、绝对定位元素，position（absolute，fixed）； 
      3、display 为以下其中之一的值 inline-block，table-cell，table-caption、flex； 
      4、overflow 除了 visible 以外的值（hidden，auto，scroll）；
	  5、body 根元素
三、BFC的特性
      1.内部的Box会在垂直方向上一个接一个的放置。
      2.垂直方向上的距离由margin决定
      3.bfc的区域不会与float的元素区域重叠。
      4.计算bfc的高度时，浮动元素也参与计算
      5.bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。
```

34、float浮动元素

```
浮动流只有一种排版方式, 就是水平排版. 它只能设置某个元素左对齐或者右对齐
注意点：
1、浮动流中没有居中对齐, 也就是没有float:center这个取值
2、在浮动流中是不可以使用margin: 0 auto;
浮动元素在哪停止？
1、当碰到父级元素的边界
2、当碰到前面有浮动元素（紧贴在前一个浮动元素的后面）
3、碰到前面没有浮动的元素，在该元素后面停止（注意：没有浮动的元素需为块元素）
浮动元素字围现象
浮动元素不会挡住没有浮动元素中的文字, 没有浮动的文字会自动给浮动的元素让位置,这个就是浮动元素字围现象
```

35、伪元素:可以当元素来操作 但是不在html出现

```
::before { content：‘元素前添加内容’}
::after{ content：‘元素后添加内容’}
```

36、单行文字溢出:多出容器文字...展示

```
p{
	white-epace:nowrap;取消自动换行
	over-flow:hidden;溢出文字隐藏
	text-overflow:ellipsis;...
}
```

37、背景图片

![1609400209247](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609400209247.png)

38、特殊点

（1）p标签不能套块级元素

​         a标签里不能套a标签

（2）position:absolute;  float:left/right;

​		开启这两个属性后  该元素自动变为display：inline-block  可以设置宽高

（3）vertical-align：2px  同一行对齐

39、盒模型

![1609815635693](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609815635693.png)

40、背景+文字链接仅显示图片

![1609815684511](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609815684511.png)

41、flex布局

Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为Flex布局。

采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

```
注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
.box{
	display:flex;
	display:inline-flex;//行内元素
	//Webkit内核的浏览器 必须加上-webkit前缀
	display:-webkit-flex;
}
```



![1609819103952](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1609819103952.png)

```
容器的属性
flex-direction：决定主轴的方向 row↑ row-reverse↓ column→ column-reverse←;
flex-wrap：如何换行 nowrap不换行|wrap换行第一行在上方|wrap-reverse换行第一行在下方。
flex-flow：flex-flow属性是前两种属性的简写形式，默认值为row nowrap。
			flex-flow: <flex-direction> || <flex-wrap>;
			
justify-content：justify-content属性定义了项目在主轴上的对齐方式。
	justify-content: flex-start | flex-end | center | space-between | 		space-around;
		flex-start（默认值）：左对齐
		flex-end：右对齐
		center： 居中
		space-between：两端对齐，项目之间的间隔都相等。
		space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

align-items：align-items属性定义项目在交叉轴上如何对齐。
  	align-items: flex-start | flex-end | center | baseline | stretch;
        flex-start：交叉轴的起点对齐。
        flex-end：交叉轴的终点对齐。
        center：交叉轴的中点对齐。
        baseline: 项目的第一行文字的基线对齐。
        stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
        
align-content：align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
	 align-content: flex-start | flex-end | center | space-between | space-		around | stretch;
	 	flex-start：与交叉轴的起点对齐。
        flex-end：与交叉轴的终点对齐。
        center：与交叉轴的中点对齐。
        space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
        space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
        stretch（默认值）：轴线占满整个交叉轴。
```

子元素（项目）的属性：

- order ：order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- flex-grow：flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
- flex-shrink：flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- flex-basis：flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）
- flex：flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。
- align-self：align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。

42、webkit内核的浏览器

- Google Chrome   
- Safari 
- 遨游浏览器 3.x                          
- 搜狗浏览器
- 阿里云浏览器
- QQ浏览器
- 360浏览器

43、z-index属性

- 所有主流浏览器都支持 z-index 属性。
- z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。

45、键盘事件

```javascript
键盘事件

键盘事件主要有三个：keydown、keypress、keyup。

触发顺序分别是keydown、keypress、keyup。

  document.onkeydown = function (e) {
      console.log(‘keydown’);
  }
  document.onkeypress = function (e) {
      console.log(‘keypress’);
  }
  document.onkeyup = function (e) {
      console.log(‘keyup’);
  }
```

监听滚动条

```javascript
这个方法是监听滚轮滚动的事件，我们可以用这个事件来写一个兼容版的fix定位。

 function beFixed(ele){
      var initPosX = ele.getPosition().w,
          initPosY = ele.getPosition().h;
      addEvent(window, ‘scroll’, function(e){
          ele.style.top =  initPosY + getScrollOffset().h + ‘px’;
          ele.style.left =  initPosX + getScrollOffset().w + ‘px’;
      })
  }
```

46、transform旋转

```javascript
div
{
    transform:rotate(7deg);
    -ms-transform:rotate(7deg); /* IE 9 */
    -webkit-transform:rotate(7deg); /* Safari and Chrome */
}
```

47、querySelection('.startBtn button');

48、定时器

```
 this.timer = setInterval(function(){
            snake.getNextPos();
        },300);
clearInterval(this.timer);
```

49、css选择器优先级介绍

```
	1.属性后面加!important 会覆盖页面内任何位置定义的元素样式
	2.作为style属性写在元素内的样式
	3.id选择器
	4.类选择器
	5.标签选择器
	6.通配符选择器（*）
	7.浏览器自定义或继承
```

50、CSS中 link 和@import 的区别

```
link属于HTML标签，而@import是CSS提供的页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载
link方式的样式的权重 高于@import的权重.
```

51、雪碧图

```
    多个图片集成在一个图片中的图
	使用雪碧图可以减少网络请求的次数，加快允许的速度
	通过background-position，去定位图片在屏幕的哪个位置
```

52、Cookie、sessionStorage、localStorage的区别

**参考回答：**

共同点：都是保存在浏览器端，并且是同源的

Cookie：cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下,存储的大小很小只有4K左右。 （key：可以在浏览器和服务器端来回传递，存储容量小，只有大约4K左右）

sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持，localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。（key：本身就是一个回话过程，关闭浏览器后消失，session为一个回话，当页面不同即使是同一页面打开两次，也被视为同一次回话）

localStorage：localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。

css样式

```
 outline:#00FF00 dotted thick;边框
 cursor: pointer;光标移动到元素时变成手
 background-size: cover;子元素和父元素一样大
 vertical-align: middle;该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐
 text-decoration: none;无下划线
 outline:none;点击时去掉边框颜色
 text-indent: 10px;首行缩进
 z-index: 2;属性设置元素的堆叠顺序 必须开启绝对定位
 background-color: transparent;透明
 text-align 属性规定元素中的文本的水平对齐方式。
 box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;阴影
 vertical-align：2px  同一行对齐
 visibility:hidden 隐藏对应的元素，但是在文档布局中仍保留原来的空间。
 display:none 隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢，就当他从来不存在。
 text-overflow：ellipsis   很长一段文字三个点
```

