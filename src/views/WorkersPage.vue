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
        <el-button class="header__button" @click="toggle = !toggle, worker={}, toggleBtn = true">
          <el-icon><Plus/></el-icon>
        </el-button>
      </el-row>
    </el-header>
  </el-container>

  <el-table :data="workers"  style="width: 100%">
    <el-table-column prop="name" label="Ism" />
    <el-table-column prop="phone" label="Telefon raqam."/>
    <el-table-column label="Maosh (mln so'm)">
      <template #default="scope">
        {{scope.row.salary/1000000}} 
      </template>
    </el-table-column>
    <el-table-column label="Faoliyat">
      <template #default="scope">
          {{type[scope.row.who]}}
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
    <el-form :model="worker" label-position="top" >
      <el-form-item label="Ism">
        <el-input v-model="worker.name" />
      </el-form-item>
      <el-form-item v-show="worker.name" label="Telefon raqam">
        <el-input v-model="worker.phone" v-maska="'+ 998 (##) ### ## ##'"/>
      </el-form-item>
      <el-form-item v-show="worker.phone" label="Lavozim">
        <el-select v-model="worker.who" placeholder="Roo'hatdan tanlang">
          <el-option v-for="(item,index) in type" :key="index" :value="index" :label="item"/>
        </el-select>
      </el-form-item>
      <el-form-item v-show="worker.who >= 0"  label="Maosh">
        <el-input v-model="worker.salary" type="number"/>
      </el-form-item>
      <el-form-item v-show="worker.salary">
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
          worker: {},
          findWorker: "",
          toggle:false,
          toggleBtn:true,
      }
  },
  computed:{
    workers(){
      return this.$store.getters.workers
    },
    type(){
      return this.$store.getters.who
    },
  },
  directives: { maska },
  methods: {
    save(){
      this.$store.dispatch('saveWorker',this.worker)
      this.$message({
        message:'Changed!',
        type:'success'
      })
      this.newProduct = {}
      this.toggle = false
      this.toggleBtn = true
    },
    edit(_id){
      this.$store.dispatch('getnWorker',_id)
      .then(res => {
        console.log(res.status)
        if (res.status === 200){
          this.worker = res.data
          this.toggleBtn = false
          this.toggle = true
        }
      })
    },
    remove(id){
      this.$store.dispatch('removeWorker',id)
    },
    add(){
      this.$store.dispatch('addWorker',this.worker)
      this.$message({
        message:'Done',
        type:'success'
      })
      this.worker = {}
      this.toggle = false
      console.log(this.type);
    },
  },
}
</script>

<style lang="scss">
.header {

  &__row{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  // .header__greating

  &__greating {
  }

  // .header__welcome

  &__welcome {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    color: #3E435D;
    margin-bottom: 12px;
  }

  // .header__date

  &__date {
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #ADA7A7;
  }

  // .header__form

  &__form {
    display: flex;
    align-items: center;
    padding: 0px 20px;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    input{
      width: 294px;
      border: 0;
      background: #FFFFFF;
      margin-left: 16px;
      padding: 14px 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      &:focus{
        outline: 0;
      }
    }
  }
}

</style>