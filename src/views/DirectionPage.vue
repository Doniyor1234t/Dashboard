<template>
  <el-container>
    <el-header class="header">
      <el-row class="header__row">
        <div class="header__greating">
          <h1 class="header__welcome">Welcome, Alexa A.</h1>
          <div class="header__date">Tue, 07 June 2022</div>
        </div>
        <el-form class="header__form">
          <el-icon size="24"><Search/></el-icon>
          <input placeholder="Search" clearable />
        </el-form>
        <el-button class="header__button" @click="toggle = !toggle, spending={}, toggleBtn = true">
          <el-icon><Plus/></el-icon>
        </el-button>
      </el-row>
    </el-header>
  </el-container>

  <el-table :data="directions"  style="width: 100%">
    <el-table-column prop="title" label="Hunar" />
    <el-table-column label="Vaqt">
      <template #default="scope">
        {{getdata(scope.row.createdAt)}}
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #default="scope">
          <el-button type="warning" @click="edit(scope.row._id)">
            <el-icon><Edit/></el-icon>
          </el-button>
          <el-button type="danger" @click="remove(scope.row._id)">
            <el-icon><Delete /></el-icon>
          </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="toggle" width="600px">
    <el-form :model="direction" label-position="top" ref="formRef"
    label-width="100px">
      <el-form-item label="Yonalish">
        <el-input v-model="direction.title" />
      </el-form-item>
      <el-form-item v-show="direction.title">
        <el-button v-show="toggleBtn" @click="add()">Add</el-button>
        <el-button v-show="!toggleBtn" @click="save()">Save</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
        direction: {},
        findDirection: "",
        toggle:false,
        toggleBtn:true,
    }
  },
  computed:{
    directions(){
      return this.$store.getters.directions
    },
  },

  methods: {
    getdata(data){
      let d  = new Date(data)
      return data = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('-')
      
    },
    save(){
      this.$store.dispatch('saveDirection',this.direction)
      this.$message({
        message:'Changed!',
        type:'success'
      })
      this.newProduct = {}
      this.toggle = false
      this.toggleBtn = true
    },
    edit(_id){
      this.$store.dispatch('getDirection',_id)
      .then(res => {
        console.log(res.status)
        if (res.status === 200){
          this.direction = res.data
          this.toggleBtn = false
          this.toggle = true
        }
      })
    },
    remove(id){
      this.$store.dispatch('removeDirection',id)
    },
    add(){
      this.$store.dispatch('addDirection',this.direction)
      this.$message({
        message:'Done',
        type:'success'
      })
      this.direction = {}
      this.toggle = false
    },
  },
  mounted() {
    this.$store.dispatch('count',2)
  },
}
</script>

<style lang="scss">

</style>