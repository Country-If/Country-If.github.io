---
title: 云端Docker搭建HElib库以及本地CLion远程开发
date: 2023-04-03 17:00:00 +0800
categories: [Cyber Engineering]
tags: [cyber engineering]
pin: false
---


## 需求
- [HElib](https://github.com/homenc/HElib)库是用C++编写的同态加密开源库，一般在Linux下使用
- 为了不混淆生产环境，使用Docker搭建HElib运行环境
- 本地在Windows下开发，使用的IDE为Clion，本地无HElib运行环境
- 综上，需求是，让CLion连接搭建好HElib的Docker上，在本地CLion中编写代码，在远程服务器的Docker里运行代码


## Docker内配置HElib库
> 参考官方文档：[HElib/INSTALL.md](https://github.com/homenc/HElib/blob/master/INSTALL.md)


- apt安装依赖

  ```bash	
  apt update && apt install git g++ make cmake clang-format m4 patchelf -y
  ```

- 克隆项目，在Docker内或者在Docker外对应挂载的目录下克隆都行

- 编译安装依赖库 (安装到系统环境)

  ```bash
  mkdir build && cd build
  cmake -DPACKAGE_BUILD=ON .. && make -j50 && make install
  ```

  注：

  1. make中，`-j50`指定线程数，可以不加或者自行调整
  2. 安装后的路径在`/usr/local/helib_pack`
  3. 安装后HElib就没用了，可以删掉HElib目录 (但建议还是留着...)

- 测试用例：[HElib/examples/README.md](https://github.com/homenc/HElib/blob/master/examples/README.md)

- 下面给出我自己的测试过程：

  - 测试代码：HElib_test.cpp

    ```cpp
    #include <helib/helib.h>
    
    int main() {
        return 0;
    }
    ```

  - 写一个CMakeLists.txt

    ```cmake
    cmake_minimum_required(VERSION 3.12)
      
    set(CMAKE_CXX_STANDARD 17)
    
    project(Prj LANGUAGES CXX)	# 设置项目名
    
    # set up HElib
    find_package(helib 2.2.0 EXACT REQUIRED)	# 引入HElib
    
    add_executable(H HElib_test.cpp)	# 创建可执行文件
    target_link_libraries(H helib)	# 链接HElib库
    ```

  - 编译测试

    ```bash
    mkdir build && cd build
    cmake .. && make
    ./H
    ```



## Clion配置

- Clion挂载Docker，详细请移步：[Clion Connect Remote Server (Docker)](../Clion_Remote_Server/)

- 挂载项目目录，修改Mapping

  ![在这里插入图片描述](/assets/img/posts/feda4de96e124c87ba772c0af94ebe93.png)



## 效果

- CLion能够检索到HElib的库

	![lib](/assets/img/posts/1f9f046e0a434844a1752abc2625f9a2.png)
- 代码里导入头文件不报错

	![include](/assets/img/posts/2d8b64ec6d7b4a58b5d42aa656b39311.png)

