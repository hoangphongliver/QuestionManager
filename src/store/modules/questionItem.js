import { API } from "../../service/service"
const types = {
  GET_QUESTION_LIST: "GET_QUESTION_LIST",
  GET_QUESTION_LIST_SUCCESS: "GET_QUESTION_LIST_SUCCESS",
  GET_QUESTION_LIST_FAIL: "GET_QUESTION_LIST_FAIL",

  GET_ALL_QUESTION_LIST: "GET_ALL_QUESTION_LIST",
  GET_ALL_QUESTION_LIST_SUCCESS: "GET_ALL_QUESTION_LIST_SUCCESS",
  GET_ALL_QUESTION_LIST_FAIL: "GET_ALL_QUESTION_LIST_FAIL",

  ADD_QUESTION_LIST: "ADD_QUESTION_LIST",
  ADD_QUESTION_LIST_SUCCESS: "ADD_QUESTION_LIST_SUCCESS",
  ADD_QUESTION_LIST_FAIL: "ADD_QUESTION_LIST_FAIL",

  UPDATE_QUESTION_LIST: "UPDATE_QUESTION_LIST",
  UPDATE_QUESTION_LIST_SUCCESS: "UPDATE_QUESTION_LIST_SUCCESS",
  UPDATE_QUESTION_LIST_FAIL: "GET_QUESTION_LIST_FAIL",

  DELETE_QUESTION_LIST: "DELETE_QUESTION_LIST",
  DELETE_QUESTION_LIST_SUCCESS: "DELETE_QUESTION_LIST_SUCCESS",
  DELETE_QUESTION_LIST_FAIL: "DELETE_QUESTION_LIST_FAIL",
};

const getAllQuestionParams = {
  page: "",
  limit: "",
  search: "",
  sortBy: ""
}

let sampleData = [];
for (let i = 0; i <= 4; i++) {
  sampleData.push({ isLoadingItem: true })
}

const Question = {
  namespaced: true,
  state: () => ({
    questionList: sampleData,
    allQuestionList: [],
    questionList: [],
    isLoading: false,
    alertText: {
      status: false,
      text: ""
    }
  }),

  actions: {
    getQuestionList({ commit }, payload) {
      commit(types.GET_QUESTION_LIST);
      API.getQuestionList(payload).then(res => {
        commit(types.GET_QUESTION_LIST_SUCCESS, res.data);
      }).catch(err => {
        commit(types.GET_QUESTION_LIST_FAIL, err);
      })
    },

    getAllQuestionList({ commit }, payload) {
      commit(types.GET_ALL_QUESTION_LIST);
      API.getQuestionList(payload).then(res => {
        commit(types.GET_ALL_QUESTION_LIST_SUCCESS, res.data);
      }).catch(err => {
        commit(types.GET_ALL_QUESTION_LIST_FAIL, err);
      })
    },

    addQuestionList({ commit, dispatch }, payload) {
      commit(types.ADD_QUESTION_LIST);
      API.addQuestionList(payload).then(res => {
        commit(types.ADD_QUESTION_LIST_SUCCESS, res.data);
        dispatch('getQuestionList', payload);
        dispatch('getAllQuestionList', getAllQuestionParams)
      }).catch(err => {
        commit(types.ADD_QUESTION_LIST_FAIL, err);
      })
    },

    updateQuestionList({ commit, dispatch }, payload) {
      commit(types.UPDATE_QUESTION_LIST);
      API.updateQuestionList(payload).then(res => {
        commit(types.UPDATE_QUESTION_LIST_SUCCESS, res.data);
        dispatch('getQuestionList', payload);
        dispatch('getAllQuestionList', getAllQuestionParams)
      }).catch(err => {
        commit(types.UPDATE_QUESTION_LIST_FAIL, err);
      })
    },

    deleteQuestionList({ commit, dispatch }, payload) {
      commit(types.DELETE_QUESTION_LIST);
      API.deleteQuestionList(payload).then(res => {
        commit(types.DELETE_QUESTION_LIST_SUCCESS, res.data);
        dispatch('getQuestionList', payload);
        dispatch('getAllQuestionList', getAllQuestionParams)
      }).catch(err => {
        commit(types.DELETE_QUESTION_LIST_FAIL, err);
      })
    }
  },

  mutations: {
    [types.GET_QUESTION_LIST](state) {
      state.isLoading = true;
      state.questionList = sampleData
    },

    [types.GET_QUESTION_LIST_SUCCESS](state, response) {
      state.questionList = response;
      state.isLoading = false
    },

    [types.GET_QUESTION_LIST_FAIL](state, err) {
      state.questionList = err;
      state.isLoading = false
    },

    [types.GET_ALL_QUESTION_LIST](state) {
      state.isLoading = true;
    },

    [types.GET_ALL_QUESTION_LIST_SUCCESS](state, response) {
      state.allQuestionList = response;
      state.isLoading = false
    },

    [types.GET_ALL_QUESTION_LIST_FAIL](state, err) {
      state.allQuestionList = err;
      state.isLoading = false
    },

    [types.ADD_QUESTION_LIST](state) {
      state.isLoading = true;
      state.alertText = ""
    },

    [types.ADD_QUESTION_LIST_SUCCESS](state, response) {
      state.isLoading = false;
      state.alertText = {
        status: true,
        text: "Add Question Successfully"
      }
    },

    [types.ADD_QUESTION_LIST_FAIL](state, err) {
      state.questionList = err;
      state.isLoading = false;
      state.alertText = {
        status: false,
        text: "Added Question Fail"
      }
    },

    [types.UPDATE_QUESTION_LIST](state) {
      state.isLoading = true;
      state.alertText = ""
    },

    [types.UPDATE_QUESTION_LIST_SUCCESS](state, response) {
      state.isLoading = false;
      state.alertText = {
        status: true,
        text: "Updated Question Successfully"
      }
    },

    [types.UPDATE_QUESTION_LIST_FAIL](state, err) {
      state.questionList = err;
      state.isLoading = false;
      state.alertText = {
        status: false,
        text: "Updated Question Fail"
      }
    },

    [types.DELETE_QUESTION_LIST](state) {
      state.isLoading = true;
      state.alertText = ""
    },

    [types.DELETE_QUESTION_LIST_SUCCESS](state, response) {
      state.isLoading = false;
      state.alertText = {
        status: true,
        text: "Deleted Question Successfully"
      }
    },

    [types.DELETE_QUESTION_LIST_FAIL](state, err) {
      state.isLoading = false;
      state.alertText = {
        status: false,
        text: "Deleted Question Fail"
      }
    }
  },

  getters: {
    questionList: state => state.questionList,
    isLoading: state => state.isLoading,
    alertText: state => state.alertText,
    allQuestionList: state => state.allQuestionList,
    numberQuestion: state => state.allQuestionList.length
  }
}

export default Question
