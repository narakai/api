# api [![Build Status](https://travis-ci.org/yobook/api.svg?branch=master)](https://travis-ci.org/yobook/api)
> api service, nodejs based

# code style
> indent 2 space

# API列表
> 打开[swagger.io编辑器](http://editor.swagger.io/#/edit), 上传项目内的swagger.yaml即可使用

# 数据库迁移
> 采用[sequelizejs自带migration](http://docs.sequelizejs.com/en/latest/docs/migrations//)进行数据库迁移， 并且已经加入到gulp豪华套餐中

# 持续集成服务
> 采用[Travis](travis-ci.org)进行部署和测试

# 构建工具
## 安装
采用gulp进行构建， 请本地安装gulp
```
npm install -g gulp
```
## tasks
### install
将会对src内的package.json进行安装
### db:migrate
将会对src/migrations内的脚本进行迁移
### db:create
将会产生一个src/migrations内的迁移脚本
这个脚本包含up和down脚本，在编写脚本的时候请明确正向迁移up和回滚down方法
### db:undo
将会回滚上一个操作


# IDE
## IntelliJ Idea
> 使用idea已经支持nodejs debug，请确认勾选上preference -> javascript -> lib内的nodejs相关lib