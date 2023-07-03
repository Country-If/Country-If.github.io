---
title: Pycharm Connect Remote Anaconda
date: 2023-07-03 10:30:00 +0800
categories: [Remote Control]
tags: [remote control]
pin: false

---

# Pycharm Connect Remote Anaconda

## Pre-Setting

- Ubuntu install Anaconda: [CSDN](https://blog.csdn.net/weixin_40964777/article/details/126308001), path: /root/anaconda3
- Pycharm in Windows

## Pycharm Setting

### Set up Deployment

- Menu - Tools - Deployment - Configuration

- add SFTP

  - set up Connection

    ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202307031045874.png)

  - set up Mappings

    ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202307031047183.png)

### Set up Python Interpreter

- Menu - File - Settings - Python Interpreter

- Add Interpreter - On SSH

  - Step 1: choose Existing, select above SSH Server, Next

    ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202307031051452.png)

  - Step 2: Next

  - Step 3: choose System Interpreter, Interpreter select the Python interpreter in anaconda path, Sync folders select the server path where to save the files, Create

    ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202307031055305.png)