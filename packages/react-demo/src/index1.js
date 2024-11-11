import React from 'react';
import ReactDOM from 'react-dom/client';


const a = 2, b = 3;
const cls = 'imageClass'
const styleObj = {
  marginTop: "100px",
  width: "100px"
}
const image = (
  <img className={cls} style={styleObj} src="https://img2.baidu.com/it/u=3663992314,1573104749&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067" alt="" />
)
const h1 = (
<React.Fragment>
  <h1>hello world</h1>
  <p>hello this is p</p>
  {/* 这个是注释内容 */}
  <div>{a} x {b} = {a*b}</div>
  {image}
</React.Fragment>
)
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(root)
// root.render(
//   <React.StrictMode>
//     h1
//   </React.StrictMode>
// );
root.render(h1)

