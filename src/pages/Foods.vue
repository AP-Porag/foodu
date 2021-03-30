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
    <section id="product" style="padding-top: 30px;padding-bottom: 30px;">
      <div class="container" style="margin-right: 15%;margin-left: 15%;">
        <div class="text-h4 text-weight-bold text-center q-pb-md text-capitalize" style="color: #fdfefd;">Food menu</div>
        <div class="row">
          <div class="col-12 col-md-6"
               v-for="product in products" :key="product.id"
          >
            <div class="q-pa-md">
              <q-card class="my-card">
                <q-card-section horizontal>
                  <q-img
                    class="col-5"
                    :src="product.thumbnail"
                  />

                  <q-card-section>
                    <div class="text-h5">{{product.name}}</div>
                    <div class="text-h6">${{product.price}}</div>
                    <div class="">
                      {{product.summary}}
                    </div>
                  </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions class="justify-around">
                  <q-rating v-model="stars" :max="5" size="32px" color="primary"/>
                  <q-btn flat color="primary" class="text-capitalize q-mr-md" icon="shopping_cart">
                    Add to cart
                  </q-btn>
                  <q-btn flat color="primary" class="text-capitalize" icon="dollar">
                    Order now
                  </q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
        <div class="text-h6 text-center q-pt-md">
          <router-link to="/categories" style="color: #6f1a07; text-decoration: none;">
            See all foods
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
      products:[
        {id:1,name:'coffee',slug:'coffee',thumbnail:'https://cdn.quasar.dev/img/chicken-salad.jpg',price:'10',summary:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id:2,name:'coffee',slug:'coffee',thumbnail:'https://cdn.quasar.dev/img/chicken-salad.jpg',price:'10',summary:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id:3,name:'coffee',slug:'coffee',thumbnail:'https://cdn.quasar.dev/img/chicken-salad.jpg',price:'10',summary:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id:4,name:'coffee',slug:'coffee',thumbnail:'https://cdn.quasar.dev/img/chicken-salad.jpg',price:'10',summary:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id:5,name:'coffee',slug:'coffee',thumbnail:'https://cdn.quasar.dev/img/chicken-salad.jpg',price:'10',summary:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id:6,name:'coffee',slug:'coffee',thumbnail:'https://cdn.quasar.dev/img/chicken-salad.jpg',price:'10',summary:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id:7,name:'coffee',slug:'coffee',thumbnail:'https://cdn.quasar.dev/img/chicken-salad.jpg',price:'10',summary:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
      ],
      slide: '1',
      autoplay: true,
      stars: 4
    }
  }
}
</script>
<style>
.my-card{
  width: 100%;
}

</style>
