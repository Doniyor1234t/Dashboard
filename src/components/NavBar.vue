<template>
  <el-aside width="230px" class="aside">
    <div class="avatar">
      <img src="@/assets/img/Rectangle.png" alt="">
    </div>
      <el-scrollbar>
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="`${active}`"
        >
        <el-menu-item @click="$router.push('/')"  index="1">
          <el-icon :size="24"><Menu /></el-icon>
          <template #title> Yo'nalish</template>
        </el-menu-item>
        <el-menu-item @click="$router.push('/direction')"  index="2">
          <el-icon :size="24"><List /></el-icon>
          <template #title> Yo'nalish</template>
        </el-menu-item>
          <el-menu-item @click="$router.push('/workers')"  index="3">
            <el-icon :size="24"><Avatar /></el-icon>
            <template #title> Xodimlar</template>
          </el-menu-item>
          <el-menu-item @click="$router.push('/group')"  index="4">
            <el-icon  :size="24"><House /></el-icon>
            <template #title>Kurslar va guruh</template>
          </el-menu-item>
          <el-menu-item @click="$router.push('/pupil')"  index="5">
            <el-icon  :size="24"><UserFilled /></el-icon>
            <template #title>O'quvchilar</template>
          </el-menu-item>
          <el-menu-item @click="$router.push('/msg')"  index="6">
            <el-icon  :size="24"><Sell /></el-icon>
            <template #title>Kassa</template>
          </el-menu-item>
          <el-menu-item @click="$router.push('/spending')" index="7">
            <el-icon  :size="24"><SoldOut /></el-icon>
            <template #title>Chiqimlar</template>
          </el-menu-item>
          <el-menu-item @click="$router.push('/pay')" index="8">
            <el-icon  :size="24"><Document /></el-icon>
            <template #title>Hisobot</template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
</template>

<script>


export default {
  computed:{
    active(){
      return this.$store.getters.count
    }
  }

}
</script>

<style lang="scss">
.avatar{
  width: 183px;
  height: 82px;
  margin: 34px auto;
}
.menu__title{
}
.el-aside{
  min-height: 100vh;
  background: #fff;
}
.el-menu{
  .el-menu-item {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing:0.00em;
    opacity: 0.25;
    color: #131313;
    
    .el-icon{
      margin-right: 16px;
    }
    &.is-active,&:hover{
      color: #0052CC;
      opacity: 1;
    }
    &.is-active{
      border-left:3px solid  #0052CC;
      opacity: 1;
    }
  }
}
</style>