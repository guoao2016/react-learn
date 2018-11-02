# 学习资源汇总


1. [视频学习地址](
https://www.rails365.net/movies/you-ren-de-react-shi-pin-jiao-cheng-ji-chu-pian-6-tong-guo-props-chuan-di-shu-ju -)


2. [中文官网](https://react.docschina.org/docs/)

3. [react-router](http://react-guide.github.io)
   [视频](https://www.rails365.net/movies/qing-song-react-router-01-jie-shao)

   https://github.com/ReactTraining/react-router/blob/v3/docs/Introduction.md

# 本项目要点

1. 组件prop
2. react-router  注意版本差异


# 总结
### 生命周期
```
    1.Mounting 已插入真实DOM componentWillMount() componentDidMount()
    componentDidMount(){console.log(1)}
    2.Updating 正在被重新渲染 componentWillUpdate(object nextProps, object nextState) componentDidUpdate(object prevProps, object prevState)
    3.Unmounting 已移除真实DOM componentWillUnmount()
    4.React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

    componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
    shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
```   
### redux (actions、reducers、store)
store 中定义变量，
action中定义操作可以传入变量，
reducers连接store和action 根据action中传入type和参数操作store
1. actions:
```
    function changeTable(index) {
            return { type: "channgTable", data:index }
    }
```

2. reducers:
```
    const reducer = function(state={"tableIndex":0}, action={}) {
        switch(action.type){
              //当发出type为changeTable的action对state的操作
              case "changeTable":
                    let backup = state;
                    backup["tableIndex"] = action.data;
                    return Object.assign({}, state,backup);
              default :
                    return Object.assign({}, state);
        }
    }

```

3. store:
store.getState()
store.dispatch(action)
store.subscribe(listener)
```
    var store = createStore(reducer);
```

### react-redux  (provider和connect)
