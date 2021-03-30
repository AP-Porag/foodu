<template>
  <q-page>
    <section id="login-registration" style="padding-top: 30px;padding-bottom: 60px;" >
      <div class="q-pa-lg">
        <div class="row">
          <div class="col-12 col-md-4 gt-sm">
            <div class="">
              <h6 class="text-primary text-capitalize text-weight-bold">You are near to complete , Please give delivery address details !</h6>
            </div>
            <q-img src="../static/images/near-to-complete.svg" style="width: 100%;height: 100%;" />
          </div>
          <div class="col-12 col-md-8">
            <div class="q-pa-md auth-form">
              <div class="q-gutter-y-md">
                <div class="row">
                  <div class="col-12 col-md-8">
                    <q-card class="q-ma-sm" flat>
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
                  <div class="col-12 col-md-4">
                    <q-card class="q-ma-sm" flat>
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
