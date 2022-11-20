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

    <el-table :data="spendings"  style="width: 100%">
      <el-table-column label="Xarajat (mln so'm )" >
        <template #default="scope">
          {{scope.row.summa/1000000}}
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="Izoh"/>
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
{{spendings}}
    <el-dialog v-model="toggle" width="600px">
      <el-form :model="spending" label-position="top" >
        <el-form-item label="Summa">
          <el-input v-model="spending.summa" type="number"/>
        </el-form-item>
        <el-form-item v-show="spending.summa" label="Commetaria">
          <el-input v-model="spending.comment"/>
        </el-form-item>
        <el-form-item v-show="spending.comment">
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
        spending:{},
        toggle:false,
        toggleBtn:true
      }
    },
    computed:{
      spendings(){
        return this.$store.getters.spendings
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
        this.$store.dispatch('saveSpending',this.spending)
        this.$message({
          message:'Changed!',
          type:'success'
        })
        this.spending = {}
        this.toggle = false
        this.toggleBtn = true
      },
      edit(_id){
        this.$store.dispatch('getnSpending',_id)
        .then(res => {
          console.log(res.status)
          if (res.status === 200){
            this.spending = res.data
            this.toggleBtn = false
            this.toggle = true
          }
        })
      },
      remove(id){
        this.$store.dispatch('removeSpending',id)
      },
      add(){
      this.$store.dispatch('addSpending',this.spending)
      this.$message({
        message:'Done',
        type:'success'
      })
      this.spending = {}
      this.toggle = false
      },
    },
  }
  </script>
  
  <style>
  
  </style>