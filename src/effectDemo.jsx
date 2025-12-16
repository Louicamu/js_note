import React, { useState, useEffect } from 'react';

// 示例 1: 组件挂载时获取数据
function FetchDataComponent({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(`WorkspaceDataComponent 渲染了, userId: ${userId}, loading: ${loading}`);

  // useEffect 用于处理副作用：数据获取
  useEffect(() => {
    console.log(`Effect: 开始获取 userId=${userId} 的数据`);
    setLoading(true); // 开始加载
    setError(null);   // 重置错误状态

    // 定义一个异步函数来获取数据
    const fetchData = async () => {
      try {
        // 模拟 API 请求
        const response = await new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ id: userId, name: `User ${userId}`, timestamp: Date.now() })
        }), 1000));

        if (!response.ok) {
          throw new Error('网络响应错误');
        }
        const result = await response.json();
        console.log(`Effect: 数据获取成功 for userId=${userId}`, result);
        setData(result);
      } catch (err) {
        console.error(`Effect: 数据获取失败 for userId=${userId}`, err);
        setError(err.message);
      } finally {
        setLoading(false); // 加载结束
        console.log(`Effect: 加载状态结束 for userId=${userId}`);
      }
    };

    fetchData(); // 执行数据获取

    // 清理函数 (可选)
    // 在这个例子中，如果 userId 变化非常快，我们可能想取消之前的请求
    // 这里简化处理，没有添加请求取消逻辑
    return () => {
      console.log(`Cleanup: Effect for userId=${userId} 即将重新运行或组件卸载`);
      // 可以在这里执行清理操作，例如取消正在进行的 fetch 请求
      // controller.abort(); // 如果使用了 AbortController
    };
  }, [userId]); // 依赖项数组：只有 userId 变化时，effect 才重新执行

  if (loading) {
    return <p>正在加载用户 {userId} 的数据...</p>;
  }

  if (error) {
    return <p>加载数据出错: {error}</p>;
  }

  return (
    <div>
      <h2>用户数据 (ID: {data?.id})</h2>
      <p>姓名: {data?.name}</p>
      <p>获取时间戳: {data?.timestamp}</p>
    </div>
  );
}

// 示例 2: 监听窗口大小变化
function WindowSizeReporter() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  console.log('WindowSizeReporter 渲染了, size:', windowSize);

  useEffect(() => {
    // 定义处理窗口大小变化的函数
    const handleResize = () => {
      console.log('窗口大小发生变化');
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    console.log('Effect: 添加 resize 事件监听器');
    // 添加事件监听器
    window.addEventListener('resize', handleResize);

    // 清理函数：在组件卸载时移除事件监听器
    return () => {
      console.log('Cleanup: 移除 resize 事件监听器');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依赖数组，表示这个 effect 只在挂载和卸载时运行

  return (
    <div>
      <h2>窗口大小</h2>
      <p>宽度: {windowSize.width}px</p>
      <p>高度: {windowSize.height}px</p>
    </div>
  );
}


// 示例 3: 依赖项变化触发的 Effect
function TimerComponent() {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);

    console.log(`TimerComponent 渲染了, seconds: ${seconds}, isActive: ${isActive}`);

    useEffect(() => {
        console.log(`Effect: 当前 isActive=${isActive}`);
        let intervalId = null;

        if (isActive) {
            console.log('Effect: 启动定时器');
            intervalId = setInterval(() => {
                // 注意：这里使用函数式更新，避免依赖 seconds
                setSeconds(s => s + 1);
            }, 1000);
        } else {
            console.log('Effect: 定时器未激活或已暂停');
        }

        // 清理函数
        return () => {
            if (intervalId) {
                console.log(`Cleanup: 清除定时器 (intervalId: ${intervalId})`);
                clearInterval(intervalId);
            } else {
                console.log('Cleanup: 无需清除定时器');
            }
        };
    }, [isActive]); // 依赖于 isActive 状态

    return (
        <div>
            <h2>定时器</h2>
            <p>秒数: {seconds}</p>
            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? '暂停' : '启动'}
            </button>
            <button onClick={() => setSeconds(0)}>
                重置
            </button>
        </div>
    );
}


function App() {
  const [currentUserId, setCurrentUserId] = useState(1);
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div>
      <h1>useEffect 示例</h1>
      <button onClick={() => setCurrentUserId(id => id + 1)}>
        加载下一个用户 (ID: {currentUserId + 1})
      </button>
      <FetchDataComponent userId={currentUserId} />
      <hr />
      <WindowSizeReporter />
      <hr />
      <button onClick={() => setShowTimer(s => !s)}>
        {showTimer ? '隐藏定时器' : '显示定时器'}
      </button>
      {showTimer && <TimerComponent />}
    </div>
  );
}

export default App;
