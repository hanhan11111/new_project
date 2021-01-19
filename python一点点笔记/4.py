guess = 0
for i in (0,3+1):
    temp = input('输入一个数字')
    guess = int(temp)
    if guess == 8 :
        print('猜对了！')
        break
    else:
        if guess >8:
            print('大了')
        else:
            print('小了')
print('游戏结束')
