const direction = {
  state:{
    directions:[],
    direction:{},
  },
  getters:{
    direction(state){return state.direction},
    directions(state){return state.directions}
  },
  mutations:{
    direction(state,payload){return state.direction = payload},
    directions(state,payload){return state.directions = payload},
    addDirections(state,payload){return state.directions.unshift(payload)},
    deleteDirection(state,payload){
      return state.directions = state.directions.filter(direction => {
        if (direction._id === payload) {
          return false
        }
        return direction
      })
    },
    saveDirection(state,payload){
      state.directions = state.directions.map(direction => {
          if (direction._id === payload._id){
              return payload
          }
          return direction
      })
    }
  },
  actions:{
    saveDirection(context,payload){
      context.dispatch('postAxios',{
          url:`direction/save/${payload._id}`,
          data: payload
      })
      .then(res => {
          if(res.status === 200){
              context.commit('saveDirection',payload)
          }
      })
    },
    getDirection(context,payload){
      return  context.dispatch('getAxios',`direction/edit/${payload}`)
    },
    removeDirection(context,payload){
      context.dispatch('deleteAxios',`direction/delete/${payload}`)
      .then(res => {
        if (res.status === 200){
          
          context.commit('deleteDirection',payload)
        }
      })
    },
    addDirection(context,payload){
      context.dispatch('postAxios',{
        url:'direction/create',
        data: payload
      })
      .then(res => {
        if(res.status === 200){
            context.commit('addDirections',res.data)
        }
      })
    },
    allDirections(context){
      context.dispatch('getAxios','direction')
      .then(res => {
        if(res.status === 200){
          console.log(res.data);
          context.commit('directions',res.data)
        }
      })
    },
  }
}
export default direction