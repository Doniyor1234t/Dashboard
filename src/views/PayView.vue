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
        <el-button class="header__button" @click="toggle = !toggle, payment={}, toggleBtn = true">
          <el-icon><Plus/></el-icon>
        </el-button>
      </el-row>
    </el-header>
  </el-container>

  <el-table :data="payments" style="width: 100%">
    <el-table-column prop="group.title" label="Gururh"/>
    <el-table-column prop="pupil.name" label="O'quvchi"/>
    <el-table-column prop="historysumma[0].summa" label="Summa tolovi"/>
    <el-table-column prop="historysumma[0].data" label="Sana">
      <template #default="scope">
        {{getdata(scope.row.historysumma[0].data)}}
      </template>
    </el-table-column>
    <el-table-column prop="historysumma[0].comment" label="Izoh"/>
    <el-table-column prop="historysumma[0].typepayment" label="Tolov turi"/>
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
    <el-form :model="payment" label-position="top" >
      <el-form-item label="Summa">
        <el-select v-model="payment.group" placeholder="Roo'hatdan tanlang">
          <el-option v-for="item of group" :key="item._id" :value="item._id" :label="item.title"/>
        </el-select>
      </el-form-item>
      <el-form-item v-show="payment.group" label="Commetaria">
        <el-select v-model="payment.pupil" placeholder="Roo'hatdan tanlang">
          <el-option v-for="item of pupil" :key="item._id" :value="item._id" :label="item.name"/>
        </el-select>
      </el-form-item>

        <el-form-item label="Summa">
          <input type="number" v-model="payment.summa"/>
        </el-form-item>
        <el-form-item label="Data">
          <el-input type="date" v-model="payment.data"/>
        </el-form-item>
        <el-form-item label="Comment">
          <el-input v-model="payment.typepayment"/>
        </el-form-item>
        <el-form-item label="Comment">
          <el-input v-model="payment.comment"/>
        </el-form-item>

      <el-form-item>
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
        payment:{
        },
        historysumma:{},
        toggle:false,
        toggleBtn:true
      }
    },
    computed:{
      payments(){
        return this.$store.getters.payments
      },
      group(){
        return this.$store.getters.groups
      },
      pupil(){
        return this.$store.getters.pupils
      }
    },
    directives: {maska},
    methods: {
      getdata(data){
      let d  = new Date(data)
      return data = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('-')
      },
      getTitle(id){
        this.worker.filter(teacher => {
          if(teacher._id===id ){
            return teacher
          }
        })
      },
      save(){
        this.$store.dispatch('savePayment',this.payment)
        this.$message({
          message:'Changed!',
          type:'success'
        })
        this.payment = {}
        this.toggle = false
        this.toggleBtn = true
      },
      edit(_id){
        this.$store.dispatch('getnPayment',_id)
        .then(res => {
          console.log(res.status)
          if (res.status === 200){
            this.payment = res.data
            this.toggleBtn = false
            this.toggle = true
          }
        })
      },
      remove(id){
        this.$store.dispatch('removePayment',id)
      },
      add(){
        
        this.$store.dispatch('addPayment',this.payment)
        this.$message({
          message:'Done',
          type:'success'
        })
        this.payment = {}
        this.toggle = false
      },
    },
    mounted() {
    this.$store.dispatch('count',7)
  },
  }
  </script>
  
  <style>

  </style>