// console.log('node.js');
// const pro = new Promise(()=>{})
// console.log(pro)

// const pro1 = new Promise((resolve, reject)=>{
//     console.log("开始")
//     setTimeout(()=>{
//         resolve(1)
//     }, 1000)
// })

// const pro2 = pro1.then((data)=>{
//     console.log(data)
//     return new Promise(()=>{})
// })

// console.log(pro2)

// 下面代码输出什么
// const pro1 = new Promise((resolve)=>{
//     setTimeout(()=>{
//         resolve(1)
//     })
// })

// const pro2 = pro1.then(data=>{
//     console.log(data);
//     return data+1
// })
// const pro3 = pro2.then(data=>{
//     console.log(data)
// })

// console.log(pro1, pro2, pro3)

// setTimeout(()=>{
//     console.log(pro1, pro2, pro3)
// }, 2000)
// 答案
// pending pending pending 1 2  
// resolve 1
// resolve 2
// resolve undefined

// const pro = new Promise((resolve, reject)=>{
//     resolve(1)
// }).then(res=>{
//     console.log(res)
//     return 2
// }).catch(err=>{
//     return 3
// }).then((res)=>{
//     console.log(res)
// })

// setTimeout(()=>{
//     console.log(pro)
// },2000)

// 1 2 fulfill<undefined>


// new Promise((resolve)=>{
//     resolve()
// }).then(res=>{
//     console.log(res.toString())
//     return 2
// }).catch(err=>{
//     return 3
// }).then(res=>{
//     console.log(res)
// })
//3

new Promise((resolve, reject)=>{
    // throw new Error(1)  // 无法执行下去
}).then(res=>{
    console.log(res)
    return new Error(2)
}).catch(err=>{
    console.log(err)
    throw err
    return 3
}).then(res=>{
    console.log(res)
})
// 无法执行，直接抛出错误