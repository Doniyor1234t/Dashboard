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
          <el-button class="header__button" @click="toggle = true, pupil={}, toggleBtn = true">
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
            <el-popconfirm title="Qaroringiz qatiyimi?" @confirm="remove(scope.row._id)" confirm-button-text="Ha" cancel-button-text="Yoq" confirm-button-type="danger" cancel-button-type="success" icon-color="red">
              <template #reference>
                <el-button type="danger">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </template>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="toggle" width="600px">
      <el-form :model="pupil" ref="pupil">
        <el-form-item label="Guruh nomi">
          <el-input v-model="pupil.name"/>
        </el-form-item>
        <el-form-item label="Telefeon raqam" prop="phone" :rules="[{ required: true, message: 'age is required' }]">
          <el-input v-model="pupil.phone" v-maska="'+ 998 (##) ###-##-##'" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Ustoz">
          <el-select v-model="pupil.group" placeholder="Roo'hatdan tanlang">
            <el-option v-for="item of group" :key="item._id" :value="item._id" :label="item.title"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="add('pupil')">Add</el-button>
          <el-button v-show="!toggleBtn" @click="save()">Save</el-button>
        </el-form-item>
      </el-form>
      {{pupil}}
    </el-dialog>
  
  </template>
  
  <script>
import {maska} from 'maska'



  export default {
    data() {
      return {
        pupil:{},
        toggle:false,
        toggleBtn:true,
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
      add(formRef){
        if(this.toggle == true)
          this.$refs[formRef].validate((valid) => {
            if (valid) {
              this.$store.dispatch('addPupil',this.pupil)
              this.$message({
                message:'Done',
                type:'success'
              })
              this.pupil = {}
              this.toggle = false
            } else {
              return false;
            }
          })
      },
    },
    mounted() {
    this.$store.dispatch('count',5)
  },
}

</script>
  
  <style>
  
  </style>