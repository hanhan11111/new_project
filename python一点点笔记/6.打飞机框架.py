加载背景音乐
播放背景音乐（设置单曲循环）
我方飞机诞生
interval = 0

while True:
    if 用户是否点击了关闭按钮:
        退出程序
        break
    
    interval += 1
    if interval == 50:
        interval = 0
        小飞机诞生
    
    小飞机移动一个位置
    屏幕刷新

    if 用户鼠标产生移动:
        我方飞机中心位置 = 用户鼠标位置
        屏幕刷新
    
    if 我方飞机与小飞机发生肢体冲突:
        我方挂 播放状机音乐
        修改我方撞击图案
        打印game over
        停止背景音乐:最好淡出停止

