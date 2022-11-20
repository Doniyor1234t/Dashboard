const payments = {
  state:{
    payments:[],
    historysummas:[],
    payment:{},
  },
  getters:{
    payment(state){return state.payment},
    payments(state){return state.payments},
  },
  mutations:{
    payment(state,payload){return state.payment = payload},
    payments(state,payload){return state.payments = payload},
    addPayment(state,payload){return state.payments.unshift(payload)},
    deletePayment(state,payload){
      return state.payments = state.payments.filter(payment => {
        if (payment._id === payload) {
          return false
        }
        return payment
      })
    },
    savePayment(state,payload){
      state.payments = state.payments.map(payment => {
          if (payment._id === payload._id){
              return payload
          }
          return payment
      })
    }
  }, 
  actions:{
    savePayment(context,payload){
      context.dispatch('postAxios',{
          url:`payment/save/${payload._id}`,
          data: payload
      })
      .then(res => {
          if(res.status === 200){
              context.commit('savePayment',payload)
          }
      })
    },
    getnPayment(context,payload){
      return context.dispatch('getAxios',`payment/edit/${payload}`)
    },
    removePayment(context,payload){
      context.dispatch('deleteAxios',`payment/delete/${payload}`)
      .then(res => {
        if (res.status === 200){
          
          context.commit('deletePayment',payload)
        }
      })
    },
    addPayment(context,payload){
      context.dispatch('postAxios',{
        url:'payment/create',
        data: payload
      })
      .then(res => {
        res.data.allsumma = 0
        if(res.status === 200){
          context.commit('addPayment',res.data)
        }
      })
    },
    allPayments(context){
      context.dispatch('getAxios','payment')
      .then(res => {
        if(res.status === 200){
          console.log(res.data);
          context.commit('payments',res.data)
        }
      })
    }
  }
}
export default payments