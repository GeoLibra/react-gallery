## 项目概览
链接：https://luvjia.github.io/react-gallery/ <br />


## 在本地打开项目
```bash
# 在终端执行以下命令安装环境依赖
  npm install

# 安装成功后执行以下命令，即可在浏览器中打开
  npm start

# build文件的编译，执行
  npm run build
```
## GitHub Page 发布
GitHub Page 需要使用相对路径，修改：
在yarn run build后该项目会生成一个build文件，但是点击其中的index.html文件打开后浏览器是空白页面。
解决办法:
```
去掉.gitignore文件中的/build,另外在在package.json配置文件中加一句："homepage": "./",然后进行打包(yarn run build)
```

然后打包项目：
```bash
yarn run build
```

将 `build` 提交到 Git 仓库：
```bash
git add -A
git commit -m "release project"
git push origin master
```

推送到 GitHub Page：
```bash
git subtree push --prefix=build origin gh-pages
```
## 项目预览
地址：https://luvjia.github.io/react-gallery/
