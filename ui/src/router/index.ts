import Vue from "vue"
import VueRouter, { Route, RouteConfig, RouteMeta } from "vue-router"
import ViewComponent1 from "@/views/ViewComponent1.vue"
import ViewComponent2 from "@/views/ViewComponent2.vue"
import ViewComponent3 from "@/views/ViewComponent3.vue"
import ViewComponent4 from "@/views/ViewComponent4.vue"
import App from "../App.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "App",
    component: App,
    children: [
      {
        path: "view-1",
        name: "ViewComponent1",
        component: ViewComponent1,
        meta: { id: "view-1", topPosition: 0 },
      },
      {
        path: "view-2",
        name: "ViewComponent2",
        component: ViewComponent2,
        meta: { id: "view-2", topPosition: 0 },
      },
      {
        path: "view-3",
        name: "ViewComponent3",
        component: ViewComponent3,
        meta: { id: "view-3", topPosition: 0 },
      },
      {
        path: "view-4",
        name: "ViewComponent4",
        component: ViewComponent4,
        meta: { id: "view-4", topPosition: 0 },
      },
    ],
  },
]

const app = document.getElementById("app")

const router = new VueRouter({
  mode: "history",
  routes,
  // scrollBehavior(to: Route, from: Route, savedPosition) {
  //   console.log(from)
  //   if (to !== undefined && from.meta !== undefined) {
  //     // const elementId: string = from.meta.id
  //     const elementTop: number = from.meta.topPosition
  //     // const elementTop = findElementTopPosition(elementId)
  //     console.log({ selector: "app", top: elementTop, behavior: "smooth" })
  //     return { selector: "app", top: elementTop, behavior: "smooth" }
  //   }
  //   console.log("howdy")
  //   return null
  // },
})

// router.beforeEach((to, from, next) => {
//   // console.log("to")
//   // console.log(to)
//   // console.log("FROM")
//   // console.log(from)
//   if (to.meta !== undefined && from.meta !== undefined && app !== null) {
//     const elementTop: number = to.meta.topPosition
//     // console.log({ top: elementTop, left: 0, behavior: "smooth" })
//     console.log("END")
//     app.scrollTo({ top: elementTop, left: 0, behavior: "smooth" })
//   }
//   next()
// })

export default router
