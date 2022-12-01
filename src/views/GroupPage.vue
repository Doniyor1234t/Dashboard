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
        <el-button class="header__button" @click="toggle = !toggle, group={}, toggleBtn = true">
          <el-icon><Plus/></el-icon>
        </el-button>
      </el-row>
    </el-header>
  </el-container>

  <el-table :data="groups"  style="width: 100%">
    <el-table-column prop="title" label="Gruih nomi" />
    <el-table-column prop="direction.title" label="Yonalis"/>
    <el-table-column prop="worker.name" label="Yonalis"/>
    <el-table-column label="Kurs narhi. (mln so'm)">
      <template #default="scope">
          {{scope.row.price/1000000}}
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
    <el-form :model="group" label-position="top" >
      <el-form-item label="Guruh nomi">
        <el-input v-model="group.title"/>
      </el-form-item>
      <el-form-item v-show="group.title" label="Lavozim">
        <el-select v-model="group.direction" placeholder="Roo'hatdan tanlang">
          <el-option v-for="item of type" :key="item._id" :value="item._id" :label="item.title"/>
        </el-select>
      </el-form-item>
      <el-form-item v-show="group.direction"  label="Ustoz">
        <el-select v-model="group.worker" placeholder="Roo'hatdan tanlang">
          <el-option v-for="item of worker" :key="item._id" :value="item._id" :label="item.name"/>
        </el-select>
      </el-form-item>
      <el-form-item v-show="group.worker"  label="Oqish narhi">
        <el-input v-model="group.price" type="number"/>
      </el-form-item>
      <el-form-item v-show="group.price">
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
      group:{},
      toggle:false,
      toggleBtn:true
    }
  },
  computed:{
    groups(){
      return this.$store.getters.groups
    },
    type(){
      return this.$store.getters.directions
    },
    worker(){
      return this.$store.getters.workers
    },
  },
  methods: {
    getTitle(id){
      this.worker.filter(teacher => {
        if(teacher._id===id ){
          return teacher
        }
      })
    },
    save(){
      this.$store.dispatch('saveGroup',this.group)
      this.$message({
        message:'Changed!',
        type:'success'
      })
      this.$store.dispatch("allGroups")
      this.group = {}
      this.toggle = false
      this.toggleBtn = true
    },
    edit(_id){
      this.$store.dispatch('getnGroup',_id)
      .then(res => {
        console.log(res.data)
        if (res.status === 200){
          this.group = res.data
          this.toggleBtn = false
          this.toggle = true
        }
      })
    },
    remove(id){
      this.$store.dispatch('removeGroup',id)
    },
    add(){
    this.$store.dispatch('addGroup',this.group)
    this.$message({
      message:'Done',
      type:'success'
    })
    this.group = {}
    this.toggle = false
    },
  },
  mounted() {
    this.$store.dispatch('count',4)
  },
}
</script>

<style>

</style>