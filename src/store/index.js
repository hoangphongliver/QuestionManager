import Vue from 'vue'
import Vuex from 'vuex'
import questionType from './modules/questionType';
import questionItem from './modules/questionItem';
import homePage from "./modules/homePage";
import users from "./modules/users";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    questionType: questionType,
    questionItem: questionItem,
    homePage: homePage,
    users: users
  }
})
