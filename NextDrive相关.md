##### 项目的难点是什么

使用的 react hooks

###### useState-组件状态管理

UploadModal.tsx

```js
const [files,setFiles]=useState<FileWithProgress[]>([])
const [uploadError,setUploadError]=useState<string>('')
```

文件上传队列管理：跟踪多文件上传
Navbar.tsx

```js
const [searchQuery, setSearchQuery] = useState("");
const [showUploadModal, setShowUploadModal] = useState < string > "";
```

搜索关键字：实时绑定搜索框输入
模态框开关：控制上传对话框

###### useEffect-副作用与同步

```js
useEffect(() => {
  if (status === "unauthenticated") {
    router.push("/auth/signin");
  }
}, [status, router]);
useEffect(() => {
  if (session) {
    fetchFiles();
  }
}, [session, currentParenId]);
```

鉴权守卫：未登录自动跳转到登录页
数据同步：会话建立或目录切换时重新拉取文件列表

```js
useEffect(() => {
  if (session) {
    fetchDeletedFiles();
  }
}, [session]);
```

回收站文件拉取：登录后立即加载已删除文件列表

##### useDropzone(react-dropzone 第三方 hook)

```js
const { getRootProps, getInputProps, isDragActive } = useDropZone({
  onDrop,
  multiple: true,
});
```

拖拽上传：监听拖放事件，解析文件
视觉反馈：isDragActive 控制拖拽时的蓝色边框与提示文本
多文件支持:multiple:true 允许批量选择

##### useCallback-稳定引用与性能优化

```js
const onDrop = useCallback((acceptedFiles: File[]) => {
  const newFiles = acceptedFiles.map((file) => ({
    file,
    progress: 0,
    status: "pending",
  }));
  setFiles((prev) => [...prev, ...newFiles]);
}, []);
```

react-dropzone 集成：拖拽上传的回调需稳定引用，避免重复注册监听器

##### useStore(Zustand 全局状态管理)

```js
const { viewMode, setViewMode } = useStore();
const { currentParentId, currentPath, setCurrentParentId } = useStore();
const { files, setFiles } = useStore();
```

管理的全局状态：
视图模式：'grid'|'list'(网格/列表切换)
当前目录：currentParentId(文件夹 ID),currentPath(路径字符串)
文件列表：files[]
为什么使用 zustand 而不是 Context
·避免 Context 的 Provider 嵌套地狱
·支持跨组件细粒度的订阅
·无需 useReducer，API 简洁
本项目的全局状态只有 5 个字段(当前路径、文件列表、视图模式)可以不需要 redux，无需 dispatch，直接调用 setFiles(newData)

##### 使用 Turbopack 作为打包工具

1. Turbopack 是 nextjs 推荐的打包器，冷启动速度比 webpack 快 10 倍
2. 零配置，无需手动配置 webpack.config.js，自动处理 TS,CSS
3. 如果考虑用其他框架考虑 vite

##### React19 特性

1. 本项目使用 use() hook 解析 nextjs15 的异步路由参数，相比 react18 需要 useEffect+Promise.then(),代码简化，无需处理加载态
2. 隐式使用，自动批处理优化(包括异步回调)

##### 为什么选用next.js
###### 单一代码库：前后端代码在同一个仓库

###### API routes
文件系统路由
```js
export async function GET(req:NextRequest){
  //处理GET请求
}
```
文件即路由
RESTful设计：通过http方法区分操作
类型安全：ts提供完整类型支持

###### 统一的api结构：
```js
await fetch('/api/files')
await fetch('/api/files/123/')
```
无需cors:同一域名，不需要跨域配置
相对路径：开发和生产环境自动适配
