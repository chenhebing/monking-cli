# monking-cli

生成 [monking](https://github.com/chenhebing/monking) demo 的脚手架

### 用法

```bash
$ npm install monking-cli -g
$ monking create project-name

# 如果已经 clone 了一个空的新项目, 可以直接在项目下生成 demo
$ monking create .
```

除了提供了生成项目的脚手架，也提供了生成 page 及 spa 的选项，你可以这样：

```bash
# 具体可以使用 monking create --help 查看。

$ monking create -p home
# 或者
$ monking create --page home
```
