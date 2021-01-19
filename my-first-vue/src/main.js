import App from "./App.js"

new Vue({
    components: {
        App,
    },
    // template:`<App></APP>`
    render:(h) =>h(App),
}).$mount("#app");