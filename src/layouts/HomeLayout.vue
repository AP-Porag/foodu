<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          class="lt-md"
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

        <div class="gt-sm">
          <q-list>
            <q-btn
              class="q-mr-sm"
              v-for="menu in menus" :key="menu.title"
              flat
              color="secondary"
              :label="menu.title"
              :to="menu.link"
            />
          </q-list>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <div class="q-pa-md" style="max-width: 350px">
        <q-list >
          <q-item
            v-for="menu in menus" :key="menu.title"
            clickable
            v-ripple
            :to="menu.link"
          >
            <q-item-section class="text-capitalize">
              {{menu.title}}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container class="bg-accent">
      <router-view />
    </q-page-container>
    <div class="row bg-secondary q-pa-lg">
      <div class="social_links text-center" style="width: 100%;">
        <q-btn round color="primary" glossy icon="facebook" class="q-mr-md"/>
        <q-btn round color="primary" glossy icon="instagram" class="q-mr-md"/>
        <q-btn round color="primary" glossy icon="tweeter"/>
      </div>
      <div class="copyright text-center q-pt-md" style="width: 100%;">
        <p>copyright<span>2021 - All rights reserved.</span></p>
        <p>Designed & developed By <a href="#" style="color: white;text-decoration: none;">S. Asraf </a></p>
      </div>
    </div>
  </q-layout>
</template>

<script>


export default {
  name: 'AdminLayout',
  data () {
    return {
      leftDrawerOpen: false,
      menus:[
        {title:"home",link:"/"},
        {title:"categories",link:"/categories"},
        {title:"foods",link:"/foods"},
        {title:"contacts",link:"/contacts"},
        {title:"about-us",link:"/about"},
      ],

    }
  }
}
</script>
