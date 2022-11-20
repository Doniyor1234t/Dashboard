const types = {
    state: () => ({
        types:['Ishlovchi','Oqituvchi'],
        who:['Front-end','Back-end','Python']
    }),
    getters:{
        types(state){
            return state.types
        },
        who(state){
            return state.who
        },
    }
}
export default types