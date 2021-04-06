import {Store} from '../store/index';

const user = Store.state.user
// const json = Store.state.user
// const ami = JSON.parse(json)
// console.log(ami)


export default (to,from,next)=>{
  if (user){
    next()
  }else {
    next('/login')
  }
}
