<template>
  <q-page>
    <section id="banner">
      <div class="row">
        <div class="col">
          <div style="margin-right: 25%;margin-left: 25%;">
            <q-input
              v-model="search"
              debounce="500"
              bg-color="white"
              filled
              placeholder="Search Food"
            >
              <template v-slot:append>
                <q-btn flat icon="search" color="secondary" class="q-pa-sm">Search</q-btn>
              </template>
            </q-input>
          </div>
        </div>
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
               v-for="category in categories" :key="category.id"
          >
            <div class="q-pa-md">
              <q-card class="my-card">
                <q-card-section horizontal>
                  <q-img
                    class="col-5"
                    src="https://cdn.quasar.dev/img/chicken-salad.jpg"
                  />

                  <q-card-section>
                    <div class="text-h5">Food Title</div>
                    <div class="text-h6">$10</div>
                    <div class="">
                      {{ lorem }}
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
      categories:[
        {id:1,name:'coffee',slug:'coffee',thumbnail:'../static/images/pizza.jpg'},
        {id:2,name:'Burger',slug:'burger',thumbnail:'../static/images/burger.jpg'},
        {id:3,name:'pizza',slug:'pizza',thumbnail:'../static/images/momo.jpg'},
        {id:4,name:'Momo',slug:'momo',thumbnail:'../static/images/momo.jpg'},
      ],
      slide: '1',
      autoplay: true,
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      stars: 4
    }
  }
}
</script>
<style>
#banner{
  background-image: url(../static/images/banner-bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 7% 0;
}
.my-card{
  width: 100%;
}

</style>
