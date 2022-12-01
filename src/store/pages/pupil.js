const pupils = {
  state:{
    pupils:[],
    pupil:{},
  },
  getters:{
    pupil(state){return state.pupil},
    pupils(state){return state.pupils}
  },
  mutations:{
    pupil(state,payload){return state.pupil = payload},
    pupils(state,payload){return state.pupils = payload},
    addPupil(state,payload){return state.pupils.unshift(payload)},
    deletePupil(state,payload){
      return state.pupils = state.pupils.filter(pupil => {
        if (pupil._id === payload) {
          return false
        }
        return pupil
      })
    },
    savePupil(state,payload){
      state.pupils = state.pupils.map(pupil => {
          if (pupil._id === payload._id){
              return payload
          }
          return pupil
      })
    }
  }, 
  actions:{
    savePupil(context,payload){
      context.dispatch('postAxios',{
          url:`pupil/save/${payload._id}`,
          data: payload
      })
      .then(res => {
        res.data.group = context.getters.groups.find(group => group._id == payload.group)
        if(res.status === 200){
          context.commit('savePupil',payload)
        }
      })
    },
    getnPupil(context,payload){
      return context.dispatch('getAxios',`pupil/edit/${payload}`)
    },
    removePupil(context,payload){
      context.dispatch('deleteAxios',`pupil/delete/${payload}`)
      .then(res => {
        if (res.status === 200){
          
          context.commit('deletePupil',payload)
        }
      })
    },
    addPupil(context,payload){
      context.dispatch('postAxios',{
        url:'pupil/create',
        data: payload
      })
      .then(res => {
        
        if(res.status === 200){
          context.commit('addPupil',res.data)
        }
      })
    },
    allPupils(context){
      context.dispatch('getAxios','pupil')
      .then(res => {
        if(res.status === 200){
          console.log(res.data);
          context.commit('pupils',res.data)
        }
      })
    }
  }
}
export default pupils