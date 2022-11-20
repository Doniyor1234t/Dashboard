const workers = {
  state:{
    workers:[],
    worker:{},
  },
  getters:{
    worker(state){return state.worker},
    workers(state){return state.workers}
  },
  mutations:{
    worker(state,payload){return state.worker = payload},
    workers(state,payload){return state.workers = payload},
    addWorker(state,payload){return state.workers.unshift(payload)},
    deleteWorker(state,payload){
      return state.workers = state.workers.filter(worker => {
        if (worker._id === payload) {
          return false
        }
        return worker
      })
    },
    saveWorker(state,payload){
      state.workers = state.workers.map(worker => {
          if (worker._id === payload._id){
              return payload
          }
          return worker
      })
    }
  },
  actions:{
    saveWorker(context,payload){
      context.dispatch('postAxios',{
          url:`worker/save/${payload._id}`,
          data: payload
      })
      .then(res => {
          if(res.status === 200){
              context.commit('saveWorker',payload)
          }
      })
    },
    getnWorker(context,payload){
      return  context.dispatch('getAxios',`worker/edit/${payload}`)
    },
    removeWorker(context,payload){
      context.dispatch('deleteAxios',`worker/delete/${payload}`)
      .then(res => {
        if (res.status === 200){
          
          context.commit('deleteWorker',payload)
        }
      })
    },
    addWorker(context,payload){
      context.dispatch('postAxios',{
        url:'worker/create',
        data: payload
      })
      .then(res => {
        if(res.status === 200){
          console.log(res.data);
          context.commit('addWorker',res.data)
        }
      })
    },
    allWorkers(context){
      context.dispatch('getAxios','worker')
      .then(res => {
        if(res.status === 200){
          console.log(res.data);
          context.commit('workers',res.data)
        }
      })
    }
  }
}
export default workers