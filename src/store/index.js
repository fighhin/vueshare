import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default  new vuex.Store({
    state:{
        count:0,
        collapse:false
    },
    mutations:{
        changeCollapse(state){
            state.collapse =!state.collapse;
        },
        increment(state){
            state.count++;
        }

    }

})
