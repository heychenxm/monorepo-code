const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * 运行一个微队列任务
 * 把传递的函数放到微队列中
 * @param {} callback 
 */
function runMicroTask(callback){
    // 区分两个环境
    // 判断node环境
    if(process && process.nextTick){
        process.nextTick(callback)
    }else if(MutationObserver){
        const p = document.createElement('p')
        const observer = new MutationObserver(callback)
        observer.observe(p, {
            childList: true
        })
        p.innerHTML = 'p is change'

    }else{
        setTimeout(callback, 0)
    }
    // setTimeout(() => {
    //     callback
    // }, 0);
}

/**
 * 判断是否是promise对象
 * @param {any} obj 
 * @returns 
 */
function isPromise(obj){
    return obj && typeof obj === 'object'  && typeof obj.then === 'function '
}
class MyPromise {
    /**
     * 创建一个Promise
     * @param {Function} executor 任务执行器，立即执行
     */
    constructor(executor) {
        this._state = PENDING
        this._value = undefined
        this._handlers = []   // 处理函数形成的队列
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject(REJECTED, error)
        }
    }
    /**
     * 
     * @param {Function} executor 
     * @param {String} state 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    _pushHandler(executor, state, resolve, reject){
        this._handlers.push({
            executor,
            state,
            resolve,
            reject
        })
    }

    /**
     * 根据实际情况，执行队列
     */
    _runHandlers(){
        if(this._state === PENDING){
            // 目前任务仍在挂起
            return
        }
        // for(const handler of this._handlers){
        //     this._runOneHandler(handler)
        // }
        // 边遍历边删除队列
        while(this._handlers[0]){
            const handler = this._handlers[0]
            this._runOneHandler(handler)
            this._handlers.shift()
        }
    }

    /**
     * 处理一个handler
     * @param {Object} handler 
     */
    _runOneHandler({executor, state, resolve, reject}){
        runMicroTask(()=>{
            if(state !== this._state){
                // 状态不匹配,不处理
                return
            }
            if(typeof executor !== 'function'){
                // 传递后续处理并非一个函数
                this._state === FULFILLED ?
                resolve(this._value):reject(this._value)
                return
            }
            try {
                const result = executor(this._value)
                if(isPromise(result)){
                    result.then(resolve, reject)
                }else{
                    resolve(result)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Promise A+规范的then
     * @param {Function} onFulfilled 
     * @param {Function} onRejected 
     */
    then(onFulfilled, onRejected){
        return new MyPromise((resolve, reject)=>{
            this._pushHandler(onFulfilled, FULFILLED, resolve, reject)
            this._pushHandler(onRejected, REJECTED, resolve, reject)
            this._runHandlers() // 执行队列
        })
    }

    /**
     * 仅处理失败的场景
     * @param {Function} onFulfilled 
     */
    catch(onRejected){
        return this.then(null, onRejected)
    }

    /**
     * 无论成功还是失败都会执行回调
     * @param {Function} onSettled 
     */
    finally(onSettled){
        return this.then((data)=>{
            onSettled();
            return data
        }, (reason)=>{
            onSettled();
            return reason
        })
    }

    /**
     * 
     * @param {String} newState 新状态
     * @param {any} value 相关数据
     */
    _changeState(newState, value){
        if(this._state !== PENDING){
            // 目前状态已经更改
            return;
        }
        this._state = newState;
        this._value = value;
        this._runHandlers()
    }
    
    /**
     * 标记当前任务完成
     * @param {any} data 任务完成的相关数据
     */
    _resolve(data){
        // 改变状态和数据
        this._changeState(FULFILLED, data)
    }
    /**
     * 编辑当前任务失败
     * @param {any} reason 任务失败相关的数据 
     */
    _reject(reason){
        // 改变状态和数据
        this._changeState(REJECTED, reason)
    }

    /**
     * 返回一个已完成的Promise
     * 特殊情况
     * 1.传递的data本身就是es6的Promise对象
     * 2.传递的data是PromiseLike（Promise A+），返回新的Promise，状态和其保持一致即可
     * @param {any} data 
     */
    static resolve(data){
        if(data instanceof MyPromise){
            return data
        }
        return new MyPromise((resolve, reject)=>{
            if(isPromise(data)){
                data.then(resolve, reject)
            }else{
                resolve(data)
            }
        })
    }

    /**
     * 得到一个被拒绝的Promise
     * @param {any} reason 
     */
    static reject(reason){
        return new MyPromise((resolve, reject)=>{
            reject(reason)
        })
    }

    /**
     * 得到一个新的promise
     * 该promise的状态取决于proms的执行
     * proms是一个迭代器，包含多个Promise
     * 全部promise成功，则返回的promise成功，数据为所有promise成功的数据，并且顺序是按照传入的顺序排列
     * 只要有一个promise失败，则返回的promise失败，原因是第一个失败的promise原因
     * @param {iterator} proms 
     */
    static all(proms){
        return new MyPromise((resolve, reject)=>{
            try {
                const results = []  // 需要保证顺序
                let count = 0;  // Promise的计数
                let fulfilledCount = 0; // 已完成的数量
                for(const p of proms){  
                    let index = count;
                    count++
                    MyPromise.resolve(p).then((data)=>{
                        fulfilledCount++
                        results[index] = data
                        if(fulfilledCount === count){
                            resolve(results)
                        }
                    }, reject)
                }
                if(count === 0){
                    resolve(results)
                }
            } catch (error) {
                reject(error)
                console.log(error)
            }
        })
    }

    /**
     * 等待所有的Promise有结果之后
     * 该方法返回的Promise完成
     * 并按照顺序将所有结果汇总返回
     * @param {iterator} proms 
     */
    static allSettled(proms){
      const ps = [];
      for(const p of proms){
        ps.push(
            MyPromise.resolve(p).then((value)=>({status: FULFILLED, value}),(reason)=>({status: REJECTED, reason}))
        )
      }  
      return MyPromise.all(ps)
    }

    /**
     * 
     * @param {iterator} proms 
     */
    static race(proms){
        return new MyPromise((resolve, reject)=>{
            for(const p of proms){
                MyPromise.resolve(p).then(resolve, reject)
            }
        })
    }
}


// const p1 = new MyPromise((resolve, reject)=>{
//     setTimeout(() => {
//         resolve()
//     }, 1000);
// })

// p1.then(function A1(){}, function A2(){})
// p1.then(function B1(){}, function B2(){})

// console.log(p1)

// runMicroTask(()=>{
//     console.log('runMicroTask is running')
// })

// const p1 = new MyPromise((resolve)=>{
//     setTimeout(()=>{
//         resolve('test')
//     }, 1000)
// })
// MyPromise.all()

MyPromise.allSettled([1,2,3,4]).then(res=>{
    console.log(res)
})