const spendings = {
    state:{
      spendings:[],
      spending:{},
    },
    getters:{
      spending(state){return state.spending},
      spendings(state){return state.spendings}
    },
    mutations:{
      spending(state,payload){return state.spending = payload},
      spendings(state,payload){return state.spendings = payload},
      addSpending(state,payload){return state.spendings.unshift(payload)},
      deleteSpending(state,payload){
        return state.spendings = state.spendings.filter(spending => {
          if (spending._id === payload) {
            return false
          }
          return spending
        })
      },
      saveSpending(state,payload){
        state.spendings = state.spendings.map(spending => {
            if (spending._id === payload._id){
                return payload
            }
            return spending
        })
      }
    }, 
    actions:{
      saveSpending(context,payload){
        context.dispatch('postAxios',{
            url:`spending/save/${payload._id}`,
            data: payload
        })
        .then(res => {
            if(res.status === 200){
                context.commit('saveSpending',payload)
            }
        })
      },
      getnSpending(context,payload){
        return context.dispatch('getAxios',`spending/edit/${payload}`)
      },
      removeSpending(context,payload){
        context.dispatch('deleteAxios',`spending/delete/${payload}`)
        .then(res => {
          if (res.status === 200){
            
            context.commit('deleteSpending',payload)
          }
        })
      },
      addSpending(context,payload){
        context.dispatch('postAxios',{
          url:'spending/create',
          data: payload
        })
        .then(res => {
          if(res.status === 200){
            context.commit('addSpending',res.data)
          }
        })
      },
      allSpendings(context){
        context.dispatch('getAxios','spending')
        .then(res => {
          if(res.status === 200){
            console.log(res.data);
            context.commit('spendings',res.data)
          }
        })
      }
    }
  }
  export default spendings