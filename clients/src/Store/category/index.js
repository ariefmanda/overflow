let axios = require('axios').create({
    baseURL: 'http://localhost:3004/api', //35.200.153.228
  });
const category = {
    state: {
        categories : [],
    },
    mutations: {
        setCategories(state, payload){
            state.categories = payload
          },
    },
    actions: {
        getCategories({ commit }) {
            axios.get('/category')
              .then(({payload})=>{
                commit('setCategories', payload);
              })
              .catch(err=>{
                console.error(err);
              })
          },
    }
}
export default category