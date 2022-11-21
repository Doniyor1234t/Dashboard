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
          <el-button class="header__button" @click="toggle = !toggle, pupil={}, toggleBtn = true">
            <el-icon><Plus/></el-icon>
          </el-button>
        </el-row>
      </el-header>
    </el-container>

    <el-table :data="pupils"  style="width: 100%">
      <el-table-column prop="name" label="O'quvchi ismi" />
      <el-table-column prop="phone" label="telefon raqam"/>
      <el-table-column prop="group.title" label="Gruppa"/>
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
{{pupil}}
{{toggleBtn}}
    <el-dialog v-model="toggle" width="600px">
      <el-form :model="pupil" label-position="top" >
        <el-form-item label="Guruh nomi">
          <el-input v-model="pupil.name"/>
        </el-form-item>
        <el-form-item v-show="pupil.name" label="Telefeon raqam">
          <el-input v-model="pupil.phone" v-maska="'+ 998 (##) ###-##-##'" />
        </el-form-item>
        <el-form-item v-show="pupil.phone"  label="Ustoz">
          <el-select v-model="pupil.group" placeholder="Roo'hatdan tanlang">
            <el-option v-for="item of group" :key="item._id" :value="item._id" :label="item.title"/>
          </el-select>
        </el-form-item>
        <el-form-item v-show="pupil.group">
          <el-button v-show="toggleBtn" @click="add()">Add</el-button>
          <el-button v-show="!toggleBtn" @click="save()">Save</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  
  </template>
  
  <script>
import {maska} from 'maska'
  export default {
    data() {
      return {
        pupil:{},
        toggle:false,
        toggleBtn:true
      }
    },
    computed:{
      pupils(){
        return this.$store.getters.pupils
      },
      group(){
        return this.$store.getters.groups
      },
    },
    directives: {maska},
    methods: {
      getTitle(id){
        this.worker.filter(teacher => {
          if(teacher._id===id ){
            return teacher
          }
        })
      },
      save(){
        this.$store.dispatch('savePupil',this.pupil)
        this.$message({
          message:'Changed!',
          type:'success'
        })
        this.pupil = {}
        this.toggle = false
        this.toggleBtn = true
      },
      edit(_id){
        this.$store.dispatch('getnPupil',_id)
        .then(res => {
          console.log(res.status)
          if (res.status === 200){
            this.pupil = res.data
            this.toggleBtn = false
            this.toggle = true
          }
        })
      },
      remove(id){
        this.$store.dispatch('removePupil',id)
      },
      add(){
      this.$store.dispatch('addPupil',this.pupil)
      this.$message({
        message:'Done',
        type:'success'
      })
      this.pupil = {}
      this.toggle = false
      },
    },
    mounted() {
    this.$store.dispatch('count',5)
  },
}
</script>
  
  <style>
  
  </style>