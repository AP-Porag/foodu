<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <q-btn
            flat
            to="/"
          >
            <q-img src="../static/images/logo.svg" style="width: 50px; margin-right: 15px"></q-img>
            Foodu
          </q-btn>
        </q-toolbar-title>

        <div>
          <q-btn-dropdown
            class="glossy"
            color="accent"
            label="Profile"
          >
            <div class="row no-wrap q-pa-md">

              <div class="column items-center">
                <q-avatar size="72px">
                  <img :src="user.avatar">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">{{user.name}}</div>

                <div >
                  <q-btn
                    @click="logoutUser"
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
                    v-close-popup
                  />
                </div>
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-accent"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          <q-btn
            flat
            to="/"
          >
            <q-img src="../static/images/logo.svg" style="width: 50px; margin-right: 15px"></q-img>
            Foodu
          </q-btn>
        </q-item-label>
        <q-item
          v-for="menu in menus"
          :key="menu.title"
          clickable
          v-ripple
          :active="active"
          active-class="bg-primary"
          :to="menu.link"
        >
          <q-item-section avatar>
            <q-icon class="text-white" :name="menu.icon" />
          </q-item-section>

          <q-item-section class="text-h6 text-capitalize text-white">{{ menu.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'AdminLayout',
  data () {
    return {
      leftDrawerOpen: false,
      active:true,
      menus :[
        {title:'dashboard',icon:'dashboard',link:'/admin/dashboard'},
        {title:'categories',icon:'list',link:'/admin/categories'},
        {title:'products',icon:'facebook',link:'/admin/products'},
        {title:'orders',icon:'shopping_cart',link:'/admin/orders'},
        {title:'users',icon:'shopping_cart',link:'/admin/users'},
      ]
    }
  },
  computed:{
    user(){
      return this.$store.getters['user/userDetails']
    }
  },
  methods:{
    async logoutUser(){
      await this.$store.dispatch('user/logoutUser')
    },
  }
}
</script>
