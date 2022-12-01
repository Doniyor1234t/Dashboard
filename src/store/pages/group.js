const groups = {
    state:{
      groups:[],
      group:{},
    },
    getters:{
      group(state){return state.group},
      groups(state){return state.groups}
    },
    mutations:{
      group(state,payload){return state.group = payload},
      groups(state,payload){return state.groups = payload},
      addGroup(state,payload){return state.groups.unshift(payload)},
      deleteGroup(state,payload){
        return state.groups = state.groups.filter(group => {
          if (group._id === payload) {
            return false
          }
          return group
        })
      },
      saveGroup(state,payload){
        state.groups = state.groups.map(group => {
            if (group._id === payload._id){
                return payload
            }
            return group
        })
      }
    },

    actions:{
      saveGroup(context,payload){
        context.dispatch('postAxios',{
            url:`group/save/${payload._id}`,
            data: payload
        })
        .then(res => {
            if(res.status === 200){
                context.commit('saveGroup',payload)
            }
        })
      },
      getnGroup(context,payload){
        return context.dispatch('getAxios',`group/edit/${payload}`)
      },
      removeGroup(context,payload){
        context.dispatch('deleteAxios',`group/delete/${payload}`)
        .then(res => {
          if (res.status === 200){
            
            context.commit('deleteGroup',payload)
          }
        })
      },
      addGroup(context,payload){
        context.dispatch('postAxios',{
          url:'group/create',
          data: payload
        })
        .then(res => {
          if(res.status === 200){
            context.commit('addGroup',res.data)
          }
        })
      },
      allGroups(context){
        context.dispatch('getAxios','group')
        .then(res => {
          if(res.status === 200){
            console.log(res.data);
            context.commit('groups',res.data)
          }
        })
      }
    }
  }
  export default groups