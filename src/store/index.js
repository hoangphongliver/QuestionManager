import Vue from 'vue'
import Vuex from 'vuex'
import questionType from './modules/questionType';
import questionItem from './modules/questionItem';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    questionType: questionType,
    questionItem: questionItem
  }
})
