import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
 
Vue.use(Router)
//import login from '@/views/login/index'
// export const constantRouterMap = [{
//     path: '/login',
//     component: login,

// }]

// export default new Router({
//     scrollBehavior:() =>({ y:0}),
//     routes: constantRouterMap
// })


export default new Router({
    routes:[
        {
            path: '/login',
            name:'login',
            component:Login
        }
    ]
})