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
            <q-btn
              v-if="user.userId"
              class="q-mr-sm"
              flat
              color="secondary"
              label="account"
              :to="user.role === 'admin'? '/admin': '/'"
            />
            <q-btn
              v-else
              class="q-mr-sm"
              flat
              color="secondary"
              label="Login"
              to="/login"
            />
            <q-btn-dropdown
              class="glossy"
              color="accent"
              icon="shopping_cart"
            >
              <div class="row no-wrap q-pa-md">
                <div class="column" v-if="user.role === 'customer'">
                  <div class="text-h6 q-mb-md">Products List</div>
                  <div class="q-pa-md q-gutter-md">

                    <q-list bordered class="rounded-borders" style="max-width: 600px">

                      <q-item
                        clickable
                        bordered
                      >
                        <q-item-section avatar top>
                          <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                          </q-avatar>
                        </q-item-section>

                        <q-item-section top class="col-2 gt-sm">
                          <q-item-label class="q-mt-sm">Title</q-item-label>
                          <q-item-label class="q-mt-sm">$10</q-item-label>
                        </q-item-section>

                        <q-item-section center>
                          <q-input
                            type="number"
                            borderless
                            style="max-width: 200px"
                          />
                        </q-item-section>

                        <q-item-section center side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn class="gt-xs" size="12px" flat dense round icon="plus" />
                            <q-btn class="gt-xs" size="12px" flat dense round icon="minus" />
                            <q-btn class="gt-xs" size="12px" flat dense round icon="cross" />
                          </div>
                        </q-item-section>
                      </q-item>

                      <q-separator spaced />

                      <q-item clickable v-ripple>
                        <div class="justify-between">
                          <span class="text-capitalize text-h6 text-weight-bold text-secondary">Sub-Total</span>
                          <span class="text-capitalize text-h6 text-weight-bold text-secondary">$750</span>
                        </div>
                      </q-item>
                      <q-item clickable v-ripple>
                        <div class="justify-between">
                          <span class="text-capitalize text-h5 text-weight-bold text-primary">Total to pay</span>
                          <span class="text-capitalize text-h5 text-weight-bold text-primary">$750</span>
                        </div>
                      </q-item>
                    </q-list>
                  </div>
                </div>

                <q-separator vertical inset class="q-mx-lg" v-if="user.role === 'customer'"/>

                <div class="column items-center">
                  <div class="column items-center"
                  v-if="user.userId"
                  >
                    <q-avatar size="72px">
                      <img :src="user.avatar">
                    </q-avatar>

                    <div class="text-subtitle1 q-mt-md q-mb-xs">{{user.name}}</div>

                    <div class="justify-between">
                      <q-btn
                        v-if="user.role === 'customer'"
                        color="primary"
                        label="checkout"
                        push
                        size="sm"
                        v-close-popup
                        to="/checkout"
                        class="q-mr-md"
                      />
                      <q-btn
                        v-if="user.userId"
                        color="primary"
                        label="Logout"
                        push
                        size="sm"
                        v-close-popup
                        @click="logoutUser"
                      />
                    </div>
                  </div>
                  <div class="column items-center text-primary text-h6"
                  v-else
                  >Please login or register</div>
                </div>
              </div>
            </q-btn-dropdown>
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
        <q-btn round color="primary" glossy icon="mdi-instagram" class="q-mr-md"/>
        <q-btn round color="primary" glossy icon="tweeter"/>
      </div>
      <div class="copyright text-center q-pt-md" style="width: 100%;">
        <p class="text-capitalize">&copy;<span> 2021 - All rights reserved.</span></p>
        <p class="text-capitalize">Designed & developed By <a href="#" style="color: white;text-decoration: none;">S. Asraf </a></p>
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
        {title:"foods",link:"/foods",},
      ],

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
