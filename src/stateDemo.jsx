import React, { useState } from 'react';

// 示例 1: 简单的计数器
function Counter() {
  // 首次渲染时，count 初始化为 0
  // rerender 时，useState 返回当前的 count 值
  const [count, setCount] = useState(0);
  console.log('Counter 渲染了, count:', count);

  const handleIncrement = () => {
    // 直接传递新值
    // setCount(count + 1);
    // setCount(count + 1); // 多次调用，在同一事件循环中会被合并，只会+1

    // 使用函数式更新：保证基于最新的状态进行更新
    setCount(prevCount => prevCount + 1);
    // setCount(prevCount => prevCount + 1); // 多次调用，会依次执行，最终+2
    console.log('Increment clicked');
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
    console.log('Decrement clicked');
  };

  // 示例：惰性初始 state (计算开销大时使用)
  const [expensiveValue, setExpensiveValue] = useState(() => {
    console.log('计算昂贵的初始值...');
    // 假设这里有一个复杂的计算
    let sum = 0;
    for (let i = 0; i < 1000; i++) {
      sum += i;
    }
    return sum; // 这个函数只会在首次渲染时执行一次
  });

  return (
    <div>
      <h2>计数器</h2>
      <p>当前计数值: {count}</p>
      <button onClick={handleIncrement}>增加</button>
      <button onClick={handleDecrement}>减少</button>
      <p>昂贵的初始值: {expensiveValue}</p>
      <button onClick={() => setExpensiveValue(v => v + 1)}>改变昂贵值</button>
    </div>
  );
}

// 示例 2: 管理对象状态
function UserProfileForm(){
    const [profile,setProfile]=useState({name:'',email:''})
    const handleInputChange=(event)=>{
        const {name,value}=event.target
        setProfile(prevProfile=>({
            ...prevProfile,
            [name]:value
        }))
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        alert(`提交成功:Name:${profile.name},Email:${profile.email}`)
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>用户资料</h2>
            <div>
                <label>
                    姓名：
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    邮箱:
                    <input
                        type="email"
                        name="email"
                        value={profile.name}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <button type="submit">提交</button>
        </form>
    )
}

function App() {
  return (
    <div>
      <Counter />
      <hr />
      <UserProfileForm />
    </div>
  );
}

export default App;


