import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: 'Dashboard', icon: 'dashboard' }
        }]
    },

    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: 'Example', icon: 'el-icon-s-help' },
        children: [{
                path: 'table',
                name: 'Table',
                component: () =>
                    import ('@/views/table/index'),
                meta: { title: 'Table', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () =>
                    import ('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'tree' }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: { title: 'Form', icon: 'form' }
        }]
    }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
        path: '/products',
        component: Layout,
        name: 'products',
        hidden: false,
        alwaysShow: true,
        meta: {
            title: '????????????',
            icon: 'product',
            roles: ['admin']
        },
        children: [{
                name: 'product.category',
                path: 'categories',
                component: () =>
                    import ('@/views/products/categories/index'),
                meta: {
                    title: '????????????',
                    icon: 'category',
                    roles: ['admin']
                }
            }, {
                name: 'product.index',
                path: 'index',
                component: () =>
                    import ('@/views/products/index'),
                meta: {
                    title: '????????????',
                    icon: 'product',
                    roles: ['admin']
                }
            }

        ]
    },
    {
        path: '/orders',
        component: Layout,
        redirect: '/orders/statistic',
        name: 'orders',
        hidden: false,
        alwaysShow: false,
        meta: {
            title: '????????????',
            role: ['admin'],
            icon: 'order',
        },
        children: [{
            path: 'statistic',
            name: 'orders.statistic',
            component: () =>
                import ('@/views/orders/statistic'),
            meta: {
                title: '???????????????',
                icon: 'order',
                roles: ['admin']
            }
        }, {
            path: 'all',
            name: 'orders.all',
            component: () =>
                import ('@/views/orders/all'),
            meta: {
                title: '?????????',
                icon: 'list',
                roles: ['admin']

            }
        }, {
            path: 'index',
            name: 'orders.index',
            component: () =>
                import ('@/views/orders/index'),
            meta: {
                title: '????????????',
                icon: 'list',
                roles: ['admin']

            }
        }]
    }, {
        path: '/purchase',
        component: Layout,
        name: 'purchase',
        hidden: false,
        alwaysShow: true,
        meta: {
            title: '????????????',
            icon: 'purchase',
            roles: ['admin']
        },
        children: [{
            name: 'purchase.index',
            path: 'index',
            meta: {
                title: '????????????',
                icon: 'purchase',
            },
            component: () =>
                import ("@/views/purchase/index")
        }, {
            name: 'purchase.supplier',
            path: 'supplier',
            component: () =>
                import ("@/views/purchase/supplier/index"),
            meta: {
                title: "???????????????",
                icon: "supplier",
            }
        }]

    }, {
        path: '/storehouse',
        name: 'storehouse',
        component: Layout,
        hidden: false,
        // alwaysShow: true,
        redirect: '/storehouse/index',
        children: [{
            name: 'storehouse.index',
            path: 'index',
            component: () =>
                import ("@/views/storehouse/index"),
            meta: {
                title: '????????????',
                icon: 'storehouse',
                roles: ['admin']
            },

        }]
    }, {
        path: '/ship',
        name: 'ship',
        component: Layout,
        hidden: false,
        redirect: '/ship/index',
        children: [{
            name: 'ship.index',
            path: 'index',
            component: () =>
                import ("@/views/ship/index"),
            meta: {
                title: '????????????',
                icon: 'wuliu',
                roles: ['admin']
            }
        }]
    },

    // {
    //   path: '/nested',
    //   component: Layout,
    //   redirect: '/nested/menu1',
    //   name: 'Nested',
    //   meta: {
    //     title: 'Nested',
    //     icon: 'nested'
    //   },
    //   children: [
    //     {
    //       path: 'menu1',
    //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
    //       name: 'Menu1',
    //       meta: { title: 'Menu1' },
    //       children: [
    //         {
    //           path: 'menu1-1',
    //           component: () => import('@/views/nested/menu1/menu1-1'),
    //           name: 'Menu1-1',
    //           meta: { title: 'Menu1-1' }
    //         },
    //         {
    //           path: 'menu1-2',
    //           component: () => import('@/views/nested/menu1/menu1-2'),
    //           name: 'Menu1-2',
    //           meta: { title: 'Menu1-2' },
    //           children: [
    //             {
    //               path: 'menu1-2-1',
    //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    //               name: 'Menu1-2-1',
    //               meta: { title: 'Menu1-2-1' }
    //             },
    //             {
    //               path: 'menu1-2-2',
    //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
    //               name: 'Menu1-2-2',
    //               meta: { title: 'Menu1-2-2' }
    //             }
    //           ]
    //         },
    //         {
    //           path: 'menu1-3',
    //           component: () => import('@/views/nested/menu1/menu1-3'),
    //           name: 'Menu1-3',
    //           meta: { title: 'Menu1-3' }
    //         }
    //       ]
    //     },
    //     {
    //       path: 'menu2',
    //       component: () => import('@/views/nested/menu2/index'),
    //       meta: { title: 'menu2' }
    //     }
    //   ]
    // },

    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
            meta: { title: 'External Link', icon: 'link' }
        }]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router