#### 自定义 Hooks 封装业务逻辑的体现

###### 数据加载逻辑

```js
function useLoadQuestionData() {
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有问卷id");
      const data = await getQuestionService(id);
      return data;
    },
    { manual: true }
  );
  useEffect(() => {
    if (!data) return;
    const { title, desc, componentList, isPublished } = data;
    dispatch(resetComponents({ componentList, selectedId }));
    dispatch(resetPageInfo({ title, desc, isPublished }));
  }, [data]);
  return { loading, error };
}
```

比如 useLoadQuestiondata 这个 hook，封装了问卷数据加载的完整流程，包括 API 调用、redux 状态更新、错误处理，在编辑页面和统计页面都可以直接使用这个 hook，不需要重复写数据加载逻辑
还封装了 useBindCanvasKeyPress 处理画布的快捷键操作，将删除、复制、粘贴、撤销等交互逻辑封装在一个 hook 中，自动处理焦点状态判断，避免在输入框中误触快捷键

#### 使用 redux 而不用 zustand

##### 需要时间旅行功能

redux 生态有成熟的 **redux-undo** 库，开箱即用
编辑器需要频繁的撤销重做操作

##### 复杂的状态管理需求

componentsReducer 包含 14 个复杂 action：
添加、删除、移动组件
复制、粘贴组件
修改组件属性和标题

##### Redux Toolkit 内置 Immer，写法简洁

Immer 是用于简化不可变数据更新的 JavaScript 库
核心作用是让 **不可变数据** 更新变得简单
有很多复杂的状态更新，不用 immer 需要用很多展开运算符和 map 函数，代码容易出错，使用 immer 后，直接 find 找到对象，直接修改属性

```js
import { produce } from "immer";
const reducer = produce((draft, action) => {
  switch (action.type) {
    case "UPDATE_COMPONENT_PROP":
      const component = draft.componentList.find(
        (c) => c.fe_id === action.fe_id
      );
      if (component) {
        component.props = { ...component.props, ...action.newProps };
      }
  }
});
```
###### 修改组件属性
```js
changeComponentProps:produce(
  (draft:ComponentStateType,action:PayloadAction<{fe_id:string;newProps:ComponentPropsType}>)=>{
    const {fe_id,newProps}=action.payload
    //从action的payload中解构出需要的数据
    const curComp=draft.componentList.find(c=>c.fe_id===fe_id)
    //从组件列表中查找需要修改的组件
    if(curComp){
      curComp.props={...curComp.props,...newProps}
    }
  }
)
//使用了redux toolkit中的PayloadAction
//在蓝图上的修改操作，就是一个修改的描述，它不是毫无意义的，它在向immer下达一个
```
###### 删除组件
```js
removeSelectedComponent:produce((draft:ComponentStateType)=>{
  const {componentList=[],seletedId:removedId}=draft
  //从draft中解构并重命名变量
  const newSelected=getNextSelected(removeId,componentList)
  //计算下一个应该被选中的组件的id
  draft.selectedId=newSelectedId
  //更新draft状态中的selectedId
  const index=componentList.findIndex(c=>c.fe_id===removedId)
  //找到要被删除组件在数组中的索引
  componentList.splice(index,1)//从index开始，删除一个元素
  //从组件列表中移除该组件
})
```

##### 使用 React18 的特性

使用 React.lazy 对编辑页进行路由级别的代码分割，减少了首屏加载体积，提升了性能

### 使用了 SCSS Modules 来构建响应式布局

技术选择：
1.scss modules：样式模块化，避免命名冲突
2.FlexBox 布局：实现三栏自适应布局
左栏：组件库，固定 285px
中栏：画布区，flex:1 自适应
右栏：属性面板，固定 300px
3.Ant Design:UI 组件库
**px**
是绝对单位，不灵活，无法随用户设置缩放
**em**
相对单位，参考基准是父元素的 font-size，适合创建可伸缩的组件级样式
**rem**
相对单位，参考基准是根元素的 font-size,适合全局尺寸统一、可预测、利于无障碍和响应式


### 使用type而不是interface
type&对同名属性更宽容，如果用interface extends会严格检查类型兼容性，可能报错
用type进行合并对象，语义更准确
ComponentPropsType不是继承关系，而是包含所有组件可能用到的属性，表示属性的并集

### 项目之间的组件通信

#### 使用redux-跨层级组件通信
用户在画布点击组件，右边的rightpenal显示对应属性
##### 点击组件，派发action
```js
const EditCanvas:FC=()=>{
  const {componentList,selectedId}=useGetComponentInfo()
  const dispatch=useDispatch()
  function handleClick(event:MouseEvent,id:string){
    dispatch(changeSelectedId(id))//派发action修改redux
  }
  return{
    <div onClick={e=>handleClick(e,fe_id)} >
      {genComponent(c)}
    </div>
  }
}
```
##### 监听选中状态变化
```js
const ComponentProp:FC=()=>{
  const {selectedComponent}=useGetComponentInfo()
  if(selectedComponent==null)return <NoProp />
  const {type,props}=selectedComponent
  return <PropComponent {...props} onChange={changeProps} >
}
```
##### 同时响应选中状态变化
```js
const Layers:FC=()=>{
  const {componentList,selectedId}=useGetComponentInfo()
  return componentList.map(c=>{
    const titleClassName=classNames({
      [seletedClassName]:c.fe_id===selectedId
    })
    return <div className={titleClassName} >
  })
}

```

通信链路：
Canvas(点击)
->dispatch(changeSelectedId)
->redux Store(更新)
->rightPenal重新渲染
->Layers同时响应选中状态
#### 父子组件之间的通信
##### 传递loading状态，通过**Props**向下传递
```js
//edit/index.tsx父组件
const Edit:FC=()=>{
  const {loading}=useLoadQuestionData()
  return <EditCanvas loading={loading}/>
}
const EditCanvas:FC<PropsType>=({loading})=>{
  if(loading){
    return <Spin/>//根据props显示加载状态
  }
  return <div>
}
```
### 自定义Hooks-逻辑复用
#### useGetComponentInfo-封装redux逻辑，使用useSelector
```js
function useGetComponentInfo(){
  const components=useSelector<StateType>(
    state=>state.components.present
  )as ComponentStateType
  const {componentList,selectedId,copiedComponent}=components
  const selectedComponent=componentList.find(c=>c.fe_id===selectedId)
  return {
    componentList,//组件列表
    selectedId,//当前选中id
    selectedComponent,//当前选中组件
    copiedComponent//复制的组件
  }
}
```
**useSelector**:它允许你的react组件从redux store中提取数据
**<StateType>**属于类型检查，应该期望整个state的类型是statetype，并且此hook返回的值的类型被断言为ComponentStateType
使用场景：多个组件都需要读取组件信息
```js
//在EditCanvas.tsx中
const {componentList,selectedId}=useGetComponentInfo()
```

### 泛型-类型参数化
#### 应用场景1：数组泛型
```js
export type ComponentListStateType={
  componentList:Array<ComponentInfoType>
}
```
为什么使用泛型:
明确数组元素类型、获得类型推断和智能提示、避免any[]失去类型安全

#### 应用场景2:react组件泛型
```js
export type ComponentConfType={
  Component:FC<ComponentPropsType>
  PropComponent:FC<ComponentPropsType>
  StatComponent?:FC<ComponentStatPropsType>
}
```
FC<props>是react函数组件类型
明确组件接收的props类型
获得完整的react类型定义

#### Redux ToolKit泛型
```js
changeSelectedId:produce(
  draft:ComponentStateType,action:PayloadAction<string>
)=>{
  draft.selectedId=action.payload
}
```
PayloadAction<T>指定payload类型
类型安全：action.payload自动推断为string
避免手动类型断言

### 项目是如何解决跨域的
使用的是Webpack DevServer Proxy解决跨域问题
原理解释：前端代码请求/api/question/123，浏览器实际请求的是地址localhost:8000,**DevServer拦截**后转发到后端localhost:7777,因为代理是服务器端端行为，不存在跨域问题。后端响应后，DevServer再返回给浏览器，浏览器收到的是同源响应，devserver作为中间层转发请求，服务器之间没有跨域限制

```js
//craco.config.js
module.exports={
  devServer:{
    port:8000,
    proxy:{
      'api':'http://localhost:7777'
    }
  }
}
const url=`/api/question/${id}`
```

### useMemo和useCallback
#### useMemo统计数据求和
```js
const StatComponent:FC<QuestionRadioStatPropsType>=({stat=[]})=>{
  const sum=useMemo(()=>{
    let s=0
    stat.forEach(i=>s+=i.count)
    return s
  },[stat])//只有stat变化时才重新计算
  return (
    <PieChart>
  )
}

```