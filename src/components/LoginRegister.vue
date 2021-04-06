<template>
  <div class="">
    <div class="text-h6 text-center text-uppercase text-primary" style="margin-bottom: 30px">{{tab === 'registration' ? 'Start With foodu' : tab
      + ' Here'}}</div>
    <div class="">
      <q-form
        class="q-gutter-md"
      >
        <q-input
          v-if="tab === 'registration'"
          v-model="formData.name"
          filled
          type="text"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please give your name something']"
        />
        <q-input
          v-model="formData.email"
          filled
          type="email"
          label="Your email *"
        />
        <q-input
          v-model="formData.password"
          filled
          type="password"
          label="Your password *"
          hint="min 8 Char"
        />

        <div class="row">
          <q-btn
            :label="tab === 'registration' ? 'Create Account': 'Login'"
            color="primary"
            class="col"
          @click="submitForm"
          ></q-btn>
          <q-btn label="Reset" color="primary" class="q-ml-sm col" @click="onReset"/>
        </div>
      </q-form>
    </div>
  </div>
</template>
<script>
export default {
  props:['tab'],
  data(){
    return{
      formData:{
        name:'',
        email:'',
        password:''
      },
    }
  },
  methods:{
    async submitForm(){
      if (this.tab === 'login'){
        await this.$store.dispatch('user/loginUser',this.formData)
      }else {
        await this.$store.dispatch("user/registerUser",this.formData)
      }
    },
    mounted(){

    },
    onReset(){
      this.formData.name = ''
      this.formData.email = ''
      this.formData.password = ''
    },
  }
}
</script>
<style>

</style>
