import { API } from "../../service/service"
const types = {
  GET_QUESTION_TYPE_LIST: "GET_QUESTION_TYPE_LIST",
  GET_QUESTION_TYPE_LIST_SUCCESS: "GET_QUESTION_TYPE_LIST_SUCCESS",
  GET_QUESTION_TYPE_LIST_FAIL: "GET_QUESTION_TYPE_LIST_FAIL",

  ADD_QUESTION_TYPE_LIST: "ADD_QUESTION_TYPE_LIST",
  ADD_QUESTION_TYPE_LIST_SUCCESS: "ADD_QUESTION_TYPE_LIST_SUCCESS",
  ADD_QUESTION_TYPE_LIST_FAIL: "ADD_QUESTION_TYPE_LIST_FAIL",

  UPDATE_QUESTION_TYPE_LIST: "UPDATE_QUESTION_TYPE_LIST",
  UPDATE_QUESTION_TYPE_LIST_SUCCESS: "UPDATE_QUESTION_TYPE_LIST_SUCCESS",
  UPDATE_QUESTION_TYPE_LIST_FAIL: "GET_QUESTION_TYPE_LIST_FAIL",

  DELETE_QUESTION_TYPE_LIST: "DELETE_QUESTION_TYPE_LIST",
  DELETE_QUESTION_TYPE_LIST_SUCCESS: "DELETE_QUESTION_TYPE_LIST_SUCCESS",
  DELETE_QUESTION_TYPE_LIST_FAIL: "DELETE_QUESTION_TYPE_LIST_FAIL",
}

let sampleData = [];
for (let i = 0; i < 4; i++) {
  sampleData.push({ isLoadingItem: true })
}

const QuestionType = {
  namespaced: true,
  state: () => ({
    questionTypeList: sampleData,
    questionList: [],
    isLoading: false,
    alertText: ""
  }),
  mutations: {
    [types.GET_QUESTION_TYPE_LIST](state) {
      state.isLoading = true;
      state.questionTypeList = sampleData
    },

    [types.GET_QUESTION_TYPE_LIST_SUCCESS](state, response) {
      state.questionTypeList = response;
      state.isLoading = false
    },

    [types.GET_QUESTION_TYPE_LIST_FAIL](state, err) {
      state.questionTypeList = err;
      state.isLoading = false
    },

    [types.ADD_QUESTION_TYPE_LIST](state) {
      state.isLoading = true
    },

    [types.ADD_QUESTION_TYPE_LIST_SUCCESS](state, response) {
      state.isLoading = false
    },

    [types.ADD_QUESTION_TYPE_LIST_FAIL](state, err) {
      state.questionTypeList = err;
      state.isLoading = false
    },

    [types.UPDATE_QUESTION_TYPE_LIST](state) {
      state.isLoading = true
    },

    [types.UPDATE_QUESTION_TYPE_LIST_SUCCESS](state, response) {
      state.isLoading = false
    },

    [types.UPDATE_QUESTION_TYPE_LIST_FAIL](state, err) {
      state.questionTypeList = err;
      state.isLoading = false
    },

    [types.DELETE_QUESTION_TYPE_LIST](state) {
      state.isLoading = true;
    },

    [types.DELETE_QUESTION_TYPE_LIST_SUCCESS](state, response) {
      state.isLoading = false
    },

    [types.DELETE_QUESTION_TYPE_LIST_FAIL](state, err) {
      state.questionTypeList = err;
      state.isLoading = false
    }
  },
  actions: {
    getQuestionTypeList({ commit }, payload) {
      commit(types.GET_QUESTION_TYPE_LIST);
      API.getQuestionTypeList().then(res => {
        commit(types.GET_QUESTION_TYPE_LIST_SUCCESS, res.data);
      }).catch(err => {
        commit(types.GET_QUESTION_TYPE_LIST_FAIL, err);
      })
    },

    addQuestionTypeList({ commit, dispatch }, payload) {
      commit(types.ADD_QUESTION_TYPE_LIST);
      API.addQuestionTypeList(payload).then(res => {
        commit(types.ADD_QUESTION_TYPE_LIST_SUCCESS, res.data);
        dispatch('getQuestionTypeList', payload)
      }).catch(err => {
        commit(types.ADD_QUESTION_TYPE_LIST_FAIL, err);
      })
    },

    updateQuestionTypeList({ commit, dispatch }, payload) {
      commit(types.UPDATE_QUESTION_TYPE_LIST);
      API.updateQuestionTypeList(payload).then(res => {
        commit(types.UPDATE_QUESTION_TYPE_LIST_SUCCESS, res.data);
        dispatch('getQuestionTypeList', payload)
      }).catch(err => {
        commit(types.UPDATE_QUESTION_TYPE_LIST_FAIL, err);
      })
    },

    deleteQuestionTypeList({ commit, dispatch }, payload) {
      commit(types.DELETE_QUESTION_TYPE_LIST);
      API.deleteQuestionTypeList(payload.questionID).then(res => {
        commit(types.DELETE_QUESTION_TYPE_LIST_SUCCESS, res.data);
        dispatch('getQuestionTypeList', payload.body)
      }).catch(err => {
        commit(types.DELETE_QUESTION_TYPE_LIST_FAIL, err);
      })
    }
  },
  getters: {
    questionTypeList: state => state.questionTypeList,
    isLoading: state => state.isLoading
  }
}

export default QuestionType
