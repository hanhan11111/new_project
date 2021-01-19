var sw = 20, //一个方块的宽度
  sh = 20, //一个方块的高度
  tr = 30, //行数
  td = 30; //列数

var snake = null,//蛇的实例
    food = null,//食物的实例
    game = null;//游戏的实例
function Square(x, y, classname) {
  this.x = x * sw;
  this.y = y * sh;
  this.class = classname;

  this.viewContent = document.createElement("div"); //方块对应的dom元素
  this.viewContent.className = this.class;
  this.parent = document.getElementById("snakeWrap"); //方块的父级
}

Square.prototype = {
  create() {//对应添加到页面里
    this.viewContent.style.position = "absolute";
    this.viewContent.style.width = sw + "px";
    this.viewContent.style.height = sh + "px";
    this.viewContent.style.left = this.x + "px";
    this.viewContent.style.top = this.y + "px";

    this.parent.appendChild(this.viewContent);
  },
  remove(){//对应在页面删除
      this.parent.removeChild(this.viewContent);
  }
};

//蛇
function Snake(){
    this.head = null;//存蛇头信息
    this.tail = null;//存蛇尾
    this.pos = [//蛇身上每一个方块的位置。

    ];
    this.directionNum = {//存储蛇走的方向
        left:{
            x:-1,
            y:0,
            rotate:180//蛇头在不同的方向中应该进行旋转 要不始终向右
        },
        right:{
            x:+1,
            y:0,
            rotate:0
        },
        up:{
            x:0,
            y:-1,
            rotate:-90
        },
        down:{
            x:0,
            y:+1,
            rotate:90
        }
    }
}
Snake.prototype = {
    init(){//初始化
        //创建一个蛇头
        var snakeHead = new Square(2,0,'snakeHead');
        snakeHead.create();
        this.head = snakeHead;//存储舌头信息
        this.pos.push([2,0]);//把蛇头的位置存起来

        //创建蛇身1
        var snakeBody1 = new  Square(1,0,'snakeBody');
        snakeBody1.create();
        this.pos.push([1,0]);//把蛇身1的位置存起来


        //创建蛇身2
        var snakeBody2 = new  Square(0,0,'snakeBody');
        snakeBody2.create();
        this.tail = snakeBody2;//蛇尾信息存起来
        this.pos.push([0,0]);//把蛇身1的位置存起

        //形成链表关系
        snakeHead.last = null;
        snakeHead.next = snakeBody1;

        snakeBody1.last = snakeHead;
        snakeBody1.next = snakeBody2;

        snakeBody2.last = snakeBody1;
        snakeBody2.next = null;

        //给蛇添加一条属性，用来表示蛇走的方向 默认让蛇往右走
        this.direction = this.directionNum.right;
    },
    //这个方法用来获取蛇头的下一个位置对应的元素，要根据元素做不同的事情
    getNextPos(){
        var nextPos = [
            this.head.x/sw+this.direction.x,
            this.head.y/sh+this.direction.y
        ]

        //下个点是自己，代表撞到了自己 游戏结束
            var selfCollied = false;//是否撞到了自己
            this.pos.forEach(function(value){
                //因为对象和基本数据类型存储方式不同 所以不能直接用==对比
                if(value[0]==nextPos[0]&&value[1]==nextPos[1]){
                    selfCollied = true;//如果数组中的两个数据都相等 就说明下一个点在蛇身体里面能找到代表撞到自己了
                }
            });
            if(selfCollied){
                //撞到自己了
                this.strategies.die.call(this);
                return;//阻止函数向下走
            }

        //下个点是墙 游戏结束
            if(nextPos[0]<0 || nextPos[1]<0 || nextPos[0]>td-1 || nextPos[1]>tr-1){
                //撞墙了
                this.strategies.die.call(this);
                return;//阻止函数向下走
            }

        // //下个点是苹果  吃
            if(food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]){
                //条件成立 代表蛇下一个走的是食物的店
                this.strategies.eat.call(this);
                return;
            }

        //下个点什么都不是 走
        this.strategies.move.call(this);

    },
    //处理碰撞后要做的事
    strategies:{
        move(format){//format:决定是否删除最后一个蛇身 吃苹果不删
            //创建一个新身体  新身体在旧蛇头的位置
            var newBody = new Square(this.head.x/sw,this.head.y/sh,'snakeBody');
            //更新链表关系
            newBody.next = this.head.next;
            newBody.next.last = newBody;
            newBody.last = null;

            //把旧蛇头从原来的位置删除
            this.head.remove();
            newBody.create();

            //创建一个新的蛇头(蛇头下一个要走的点)
            var newHead = new Square(this.head.x/sw+this.direction.x,this.head.y/sh+this.direction.y,'snakeHead');
           

            //更新链表的关系
            newHead.next = newBody;
            newHead.last = null;
            newBody.last = newHead;
            newHead.viewContent.style.transform = 'rotate('+this.direction.rotate+'deg)'
            newHead.create();
            
            //蛇身上的每一个方块的坐标也要更新
            this.pos.unshift([this.head.x/sw+this.direction.x,this.head.y/sh+this.direction.y]);
            this.head = newHead;//还要把this.head信息更新一下


            if(!format){//如果format的值为false  需要删除 除了吃之外操作都删除最后一节蛇身
                this.tail.remove();
                this.tail = this.tail.last;

                this.pos.pop()//删除最后一个蛇身存在pos里的位置
            }
            

        },
        eat(){
            this.strategies.move.call(this,true);
            createFood();
            if(game.score<6){
                game.score++;
            }else{
                game.over();
            }
            

        },
        die(){
            game.over();
        }
    }
};

snake = new Snake();



//创建食物
function createFood(){
    //食物小方块的随机坐标
    var x = null;
    var y = null;

    var include = true;//循环跳出的条件，true标识食物的坐标在蛇身上，继续循环，false表示食物的坐标不在蛇身上 不继续循环
    while(include){
        x = Math.round(Math.random()*(td-1));
        y = Math.round(Math.random()*(tr-1));
        snake.pos.forEach(function(value){
            if(x!=value[0] && y!=value[1]){
                include = false;
            }
        });  
    }

    //生成食物
    food = new Square(x,y,'food');
    food.pos = [x,y];//存储依稀奥声称是无的坐标 用于跟蛇头要走的下一个点做对比
    var foodDom = document.querySelector('.food');
    if(foodDom){
        foodDom.style.left = x*sw+'px';
        foodDom.style.top = y*sh+'px';
    }else{
        food.create();
    }

}



//创建游戏逻辑
function Game(){
    this.timer = null;
    this.score = 0;
}
Game.prototype = {
    init(){
        snake.init();
        // snake.getNextPos();
        createFood();

        document.onkeydown = function(ev){
            if(ev.which == 37 && snake.direction != snake.directionNum.right){//用户按下左键时这条蛇不能是正在往右走
                snake.direction = snake.directionNum.left;
            }else if(ev.which == 38 && snake.direction != snake.directionNum.down){//用户按下左键时这条蛇不能是正在往右走
                snake.direction = snake.directionNum.up;
                // console.log('上');
            }else if(ev.which == 39 && snake.direction != snake.directionNum.left){//用户按下左键时这条蛇不能是正在往右走
                snake.direction = snake.directionNum.right;
            }else if(ev.which == 40 && snake.direction != snake.directionNum.up){//用户按下左键时这条蛇不能是正在往右走
                snake.direction = snake.directionNum.down;
                // console.log('下');
            }
        }
        this.start();
    },
    start(){//开始游戏
        this.timer = setInterval(function(){
            snake.getNextPos();
        },300);
    },
    over(){
        clearInterval(this.timer);
        alert("你的得分为"+game.score);

        //游戏回到初始状态
        var snakeWrap = document.getElementById('snakeWrap');
        snakeWrap.innerHTML = '';

        snake = new Square();
        game = new Game();
        var startBtnWrap = document.querySelector('.startBtn');
        startBtnWrap.style.display = 'none';
    },
    pause(){
        clearInterval(this.timer);
    }


}

game = new Game();
var startBtn = document.querySelector('.startBtn button');
startBtn.onclick = function(){
    startBtn.parentNode.style.display = 'none';
    game.init();
}

//暂停
var snakeWrap = document.getElementById('snakeWrap');
var pauseBtn = document.querySelector('.pauseBtn button');
snakeWrap.onclick = function(){
    game.pause();
    pauseBtn.parentNode.style.display = 'block';
}
pauseBtn.onclick = function(){
    game.start();
    pauseBtn.parentNode.style.display = 'none';
}

