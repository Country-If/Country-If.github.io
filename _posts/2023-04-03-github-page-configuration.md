---
title: Github Page Configuration
date: 2023-04-03 10:00:00 +0800
categories: [Tutorial]
tags: [github page]
pin: true
---


### Run Locally (Strongly recommended)

1. Install Git, Ruby, RubyGems. See: [搭建个人博客(Jekyll+Github)](https://blog.csdn.net/m0_46578941/article/details/126489793)
2. Clone your github.io repository
3. cd in the repository
4. `bundle install`
5. `bundle exec jekyll server`
6. Open web browser, visit: [http://localhost:4000](http://localhost:4000)

## Installation

### Creating a New Site

Using the Chirpy Starter: Sign in to GitHub and browse to [**Chirpy Starter**](https://github.com/cotes2020/chirpy-starter/), click the button <kbd>Use this template</kbd> > <kbd>Create a new repository</kbd>, and name the new repository `USERNAME.github.io`, where `USERNAME` represents your GitHub username.

### Check

After the creation step, the source codes will generate automatically in the repository. It's better to check whether the folders (eg. _layouts, _includes, etc) are the same as the original repository. I suggest downloading the git repository locally to add/delete folders/files more conveniently. 

### Configuration

Generally, go to `_config.yml` and configure the variables as needed. Some of them are typical options:

- `url`
- `avatar`
- `timezone`
- `theme_mode`

### Deployment

Before the deployment begins, checkout the file `_config.yml` and make sure the `url` is configured correctly. 

Configure the *Pages* service. 

1. Browse to your repository on GitHub. Select the tab *Settings*, then click *Pages* in the left navigation bar. Then, in the **Source** section (under *Build and deployment*), select [**GitHub Actions**](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) from the dropdown menu.
2. Push any commits to GitHub to trigger the *Actions* workflow. In the *Actions* tab of your repository, you should see the workflow *Build and Deploy* running. Once the build is complete and successful, the site will be deployed automatically.

## Reference

> [Getting-Started-Tutorial](https://chirpy.cotes.page/posts/getting-started/)
> 
> [Jekyll-Github](https://github.com/cotes2020/jekyll-theme-chirpy)
> 
> [Github+Jekyll 搭建个人网站详细教程-简书](https://www.jianshu.com/p/9f71e260925d)
> 
> [Jekyll + Github Pages 搭建个人免费博客-知乎](https://zhuanlan.zhihu.com/p/87225594)
> 
> [2020-08-20-github-page的搭建过程](https://blog.csdn.net/sinat_38816924/article/details/108236046)
> 
> [搭建个人博客(Jekyll+Github)](https://blog.csdn.net/m0_46578941/article/details/126489793)
