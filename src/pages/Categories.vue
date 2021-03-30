<template>
  <q-page>
    <section id="slider" style="padding-top: 30px;padding-bottom: 30px;" >
      <div class="q-pa-lg">
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
    <section id="category" style="padding-top: 60px;padding-bottom: 30px">
      <div class="container" style="margin-right: 15%;margin-left: 15%;">
        <div class="text-h4 text-weight-bold text-center q-pb-md" style="color: #fdfefd;">Explore Foods</div>
        <div class="row">
          <div class="col-12 col-md-3"
               v-for="category in categories" :key="category.id"
          >
            <div class="q-pa-md">
              <q-card class="my-card">
                <router-link :to="'/category/'+ category.slug">
                  <q-img src="../static/images/pizza.jpg">
                    <div class="text-h5 absolute-bottom text-right text-capitalize">
                      {{category.name}}
                    </div>
                  </q-img>
                </router-link>
              </q-card>
            </div>
          </div>
        </div>
        <div class="text-h6 text-center q-pt-md">
          <router-link to="/categories" style="color: #6f1a07; text-decoration: none;">
            See all category
          </router-link>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>


export default {
  name: 'Home',
  data () {
    return {
      categories:[
        {id:1,name:'coffee',slug:'coffee',thumbnail:'../static/images/pizza.jpg'},
        {id:2,name:'Burger',slug:'burger',thumbnail:'../static/images/burger.jpg'},
        {id:3,name:'pizza',slug:'pizza',thumbnail:'../static/images/momo.jpg'},
        {id:4,name:'Momo',slug:'momo',thumbnail:'../static/images/momo.jpg'},
      ],
      slide: '1',
      autoplay: true,
    }
  }
}
</script>
<style>

.my-card{
  width: 100%;
}

</style>
