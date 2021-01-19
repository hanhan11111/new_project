//挂在整个vue应用
//根组件
import Products from "./components/Products.js"

var template = `
    <div>
        <h1>库存管理系统</h1>
        <Products></Products>
    </div>`;

export default{
    components: {
        Products,
    },
    template,
};