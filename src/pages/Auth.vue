<template>
  <q-page>
    <section id="slider" style="padding-top: 0px;padding-bottom: 30px;" >
      <div class="">
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="300px"
          :autoplay="autoplay"
          infinite
          class="bg-primary text-white shadow-1 rounded-borders"
        >
          <template v-slot:navigation-icon="{ active, btnProps, onClick }">
            <q-btn v-if="active" size="lg" icon="home" color="primary" flat round dense @click="onClick" />
            <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
          </template>

          <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
        </q-carousel>
      </div>
    </section>
    <section id="login-registration" style="padding-top: 30px;padding-bottom: 60px;" >
      <div class="q-pa-lg">
        <div class="row">
          <div class="col-12 col-md-6 gt-sm">
            <q-img src="../static/images/having-fun.svg" style="width: 100%;height: 100%;" />
          </div>
          <div class="col-12 col-md-6">
            <div class="q-pa-md auth-form">
              <div class="q-gutter-y-md">
                <q-card class="" flat>
                  <q-tabs
                    v-model="tab"
                    class="text-grey"
                    active-color="white"
                    indicator-color="white"
                    align="justify"
                    narrow-indicator
                  >
                    <q-tab name="login" label="login" class="text-black"/>
                    <q-tab name="registration" label="registration" class="text-black"/>
                  </q-tabs>

                  <q-separator/>

                  <q-tab-panels v-model="tab" animated class="">
                    <q-tab-panel name="login">
                      <login-register :tab="tab"></login-register>
                    </q-tab-panel>

                    <q-tab-panel name="registration">
                      <login-register :tab="tab"></login-register>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>


export default {
  name: 'Home',
  components:{
    'login-register': require('../components/LoginRegister').default
  },
  data () {
    return {
      tab: 'login',
      slide: '1',
      autoplay: true,
    }
  }
}
</script>
<style>

</style>
