import random
secret = random.randint(1,10)#生成1到10的随机数
temp = input("请输入一个数字")
guess = int(temp)
if guess == secret:
    print('猜对啦~')
while guess != secret:
    if guess>secret:
            print("大了")
    else:
            print("小了")
    temp = input('猜错啦 请重新输入') 
    guess = int(temp)
    if guess == secret:
        print("猜对了")
print('游戏结束')
    
