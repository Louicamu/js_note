## git 撤回操作

### 文件在[工作区]，还没 add

```js
git restore
```

### 文件在[暂存区]，还没 commit

```js
git restore --staged <文件>//新版git

git reset HEAD <文件>//旧版git
```

### 文件已在本地仓库，还没 git push

1. 修改最后一次提交

```js
git commit --amend
```

2. 撤销最近的几次提交

```js
git reset --soft //代码和暂存区都不变，撤销的内容回到暂存区
git reset --mixed//重置暂存区，暂存区被清空
```

### 已经 git push

```js
git revert
```
