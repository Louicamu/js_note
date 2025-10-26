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

redux 生态有成熟的 redux-undo 库，开箱即用
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
