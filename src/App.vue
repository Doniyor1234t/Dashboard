<template>
  <el-container>
    <el-aside width="200">
      <NavBar/>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  mounted() {
        this.$store.dispatch("allDirections")
        this.$store.dispatch("allWorkers")
        this.$store.dispatch("allGroups")
        this.$store.dispatch("allPupils")
        this.$store.dispatch("allSpendings")
        this.$store.dispatch("allPayments")
    },
    components: { NavBar }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: 'Poppins';
  background: #FAFAFA;
}
.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
  border-bottom: none;
}
.is-leaf{
  color: #000;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
.td{
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  opacity: 0.5;
}
.header {
  margin-bottom: 20px;

  &__row{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  // .header__greating

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
