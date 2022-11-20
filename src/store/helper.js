import axios from "axios"

const helper = {
    actions:{
        getAxios(context,payload){
            return axios.get(`${context.getters.url}/${payload}`)
        },
        deleteAxios(context,payload){
            return axios.delete(`${context.getters.url}/${payload}`)
        },
        postAxios(context,payload){
            return axios.post(`${context.getters.url}/${payload.url}`,payload.data)
        },
    }
}
export default helper