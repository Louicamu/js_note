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

## git rebase 和 git merge的区别
### git rebase
1. 重写了历史
2. 不会产生额外的合并提交
3. 不应该在共享的公共分支上使用，因为它改变了提交历史
4. 适用于个人
### git merge
1. 保留了完整的分支历史，有分叉
2. 会创建一个新的合并提交
3. 适用于任何分支，保留了历史的真实性
4. 在最终的合并提交中一次性解决所有冲突性问题
