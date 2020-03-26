import pygame #導入
import sys
from pygame.locals import * #導入常量名

pygame.init() #初始化模塊

size = width , height = 600,400
speed = [-1 , 1]
bg = (255,255,255)

print(0)
#偵數
clock = pygame.time.Clock()
#創建指定大小的窗口
screen = pygame.display.set_mode(size)
#設置窗口標題
pygame.display.set_caption("我是標題")

#加載圖片
image1 = pygame.image.load("static/images/image1.png")
#獲得圖像的位置矩形
position = image1.get_rect()


image1_L = image1
image1_R = pygame.transform.flip(image1,True,False)
#字型
#font = pygame.font.Font(None , 20)
#行高
#line_height = font.get_linesize()
#填充背景
screen.fill(bg)
#更新圖像
screen.blit(image1,position)
#更新介面
pygame.display.flip()