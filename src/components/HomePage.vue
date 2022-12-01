<template>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="main-title">Guruhalar</div>
        <el-scrollbar>
          <div class="grid-content" >
            <div class="direction" v-for="itme of groups" :key="itme">
              <el-avatar :size="46">
                <img class="avatar" src="@/assets/icons/gallery.png" />
              </el-avatar>
              <div class="title">{{itme.title}}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-col>
      <el-col :span="12">
        <div class="main-title">Yonalishlar</div>
        <el-scrollbar>
          <div class="grid-content" >
            <div class="direction" v-for="itme of directions" :key="itme">
              <el-avatar :size="46">
                <img class="avatar" src="@/assets/icons/gallery.png" />
              </el-avatar>
              <div class="title">{{itme.title}}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content ep-bg-purple" >
          <el-table :data="pupils"  style="width: 100%">
            <el-table-column prop="name" label="O'quvchi ismi" />
            <el-table-column prop="phone" label="telefon raqam"/>
            <el-table-column prop="group.title" label="Gruppa"/>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content ep-bg-purple" >
          <el-table :data="pupils"  style="width: 100%">
            <el-table-column prop="name" label="O'quvchi ismi" />
            <el-table-column prop="phone" label="telefon raqam"/>
            <el-table-column prop="group.title" label="Gruppa"/>
          </el-table>
        </div>
      </el-col>
    </el-row>

</template>

<script>
export default {
  computed:{
    pupils(){
      return this.$store.getters.pupils
    },
    directions(){
      return this.$store.getters.directions
    },
    groups(){
      return this.$store.getters.groups
    },
  },
  mounted() {
    this.$store.dispatch('count',1)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el{
  &-col-8{
    background: #FFFFFF;
    border-radius: 10px;
  }
  &-table{
    background: #FFFFFF;
    border-radius: 10px;
    &-column{
      border: 0;
    }
  }
}
.el-avatar{
  padding: 11px;
  margin-bottom: -8px;
  background: #FFFFFF;
  border: 1px solid #ECECEC;
}
.el-scrollbar{
  background: #FFFFFF;
  height: auto;
}
.main-title{
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding: 24px 0 0 24px;
}
.grid-content {
  padding: 24px;
  display: flex;
  gap: 34px;
  
  .title{
    margin-top: 14px;
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    white-space: nowrap;
  }
  .direction{
    
    width: 82px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
