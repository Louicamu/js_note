import React, { useState } from 'react';
// 1. 引入刚才拆分出去的两个组件文件
// 注意：./ 表示当前目录
import StateDemo from './stateDemo';
import EffectDemo from './EffectDemo';

function App() {
  // 定义一个状态，用来控制显示哪个页面
  // 'state' 代表显示 useState 的旧代码
  // 'effect' 代表显示 useEffect 的新代码
  const [currentTab, setCurrentTab] = useState('effect');

  return (
    <div style={{ padding: '20px' }}>
      <h1>React 学习笔记本</h1>
      
      {/* 顶部导航按钮 */}
      <div style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
        <button 
          onClick={() => setCurrentTab('state')}
          style={{ marginRight: '10px', background: currentTab === 'state' ? '#646cff' : '' }}
        >
          查看示例 1 (useState)
        </button>
        <button 
          onClick={() => setCurrentTab('effect')}
          style={{ background: currentTab === 'effect' ? '#646cff' : '' }}
        >
          查看示例 2 (useEffect)
        </button>
      </div>

      {/* 根据状态条件渲染对应的组件 */}
      <div className="content-area">
        {currentTab === 'state' ? <StateDemo /> : <EffectDemo />}
      </div>
    </div>
  );
}

export default App;