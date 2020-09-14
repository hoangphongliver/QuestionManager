import { API } from "../../service/service"
const types = {
  GET_QUESTION_TYPE_LIST: "GET_QUESTION_TYPE_LIST",
  GET_QUESTION_TYPE_LIST_SUCCESS: "GET_QUESTION_TYPE_LIST_SUCCESS",
  GET_QUESTION_TYPE_LIST_FAIL: "GET_QUESTION_TYPE_LIST_FAIL",

  GET_ALL_QUESTION_TYPE_LIST: "GET_ALL_QUESTION_TYPE_LIST",
  GET_ALL_QUESTION_TYPE_LIST_SUCCESS: "GET_ALL_QUESTION_TYPE_LIST_SUCCESS",
  GET_ALL_QUESTION_TYPE_LIST_FAIL: "GET_ALL_QUESTION_TYPE_LIST_FAIL",

  ADD_QUESTION_TYPE_LIST: "ADD_QUESTION_TYPE_LIST",
  ADD_QUESTION_TYPE_LIST_SUCCESS: "ADD_QUESTION_TYPE_LIST_SUCCESS",
  ADD_QUESTION_TYPE_LIST_FAIL: "ADD_QUESTION_TYPE_LIST_FAIL",

  UPDATE_QUESTION_TYPE_LIST: "UPDATE_QUESTION_TYPE_LIST",
  UPDATE_QUESTION_TYPE_LIST_SUCCESS: "UPDATE_QUESTION_TYPE_LIST_SUCCESS",
  UPDATE_QUESTION_TYPE_LIST_FAIL: "GET_QUESTION_TYPE_LIST_FAIL",

  DELETE_QUESTION_TYPE_LIST: "DELETE_QUESTION_TYPE_LIST",
  DELETE_QUESTION_TYPE_LIST_SUCCESS: "DELETE_QUESTION_TYPE_LIST_SUCCESS",
  DELETE_QUESTION_TYPE_LIST_FAIL: "DELETE_QUESTION_TYPE_LIST_FAIL",
};

const getAllQuestionTypeParams = {
  page: "",
  limit: "",
  search: "",
  sortBy: ""
}

let sampleData = [];
for (let i = 0; i <= 4; i++) {
  sampleData.push({ isLoadingItem: true })
}

const QuestionType = {
  namespaced: true,
  state: () => ({
    allQuestionTypeList: [],
    questionTypeList: sampleData,
    questionList: [],
    isLoading: false,
    alertText: {
      status: false,
      text: ""
    }
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

    [types.GET_ALL_QUESTION_TYPE_LIST](state) {
      state.isLoading = true;
    },

    [types.GET_ALL_QUESTION_TYPE_LIST_SUCCESS](state, response) {
      state.allQuestionTypeList = response;
      state.isLoading = false
    },

    [types.GET_ALL_QUESTION_TYPE_LIST_FAIL](state, err) {
      state.allQuestionTypeList = err;
      state.isLoading = false
    },

    [types.ADD_QUESTION_TYPE_LIST](state) {
      state.isLoading = true
    },

    [types.ADD_QUESTION_TYPE_LIST_SUCCESS](state, response) {
      state.isLoading = false;
      state.alertText = {
        status: true,
        text: "Add Question Type Successfully"
      }
    },

    [types.ADD_QUESTION_TYPE_LIST_FAIL](state, err) {
      state.questionTypeList = err;
      state.isLoading = false;
      state.alertText = {
        status: false,
        text: "Add Question Type Fail"
      }
    },

    [types.UPDATE_QUESTION_TYPE_LIST](state) {
      state.isLoading = true
    },

    [types.UPDATE_QUESTION_TYPE_LIST_SUCCESS](state, response) {
      state.isLoading = false;
      state.alertText = {
        status: true,
        text: "Updated Question Type Successfully"
      }
    },

    [types.UPDATE_QUESTION_TYPE_LIST_FAIL](state, err) {
      state.questionTypeList = err;
      state.isLoading = false;
      state.alertText = {
        status: false,
        text: "Updated Question Type Fail"
      }
    },

    [types.DELETE_QUESTION_TYPE_LIST](state) {
      state.isLoading = true;
    },

    [types.DELETE_QUESTION_TYPE_LIST_SUCCESS](state, response) {
      state.isLoading = false;
      state.alertText = {
        status: true,
        text: "Deleted Question Type Successfully"
      }
    },

    [types.DELETE_QUESTION_TYPE_LIST_FAIL](state, err) {
      state.questionTypeList = err;
      state.isLoading = false;
      state.alertText = {
        status: false,
        text: "Deleted Question Type Fail"
      }
    }
  },
  actions: {
    getQuestionTypeList({ commit }, payload) {
      commit(types.GET_QUESTION_TYPE_LIST);
      API.getQuestionTypeList(payload).then(res => {
        commit(types.GET_QUESTION_TYPE_LIST_SUCCESS, res.data);
      }).catch(err => {
        commit(types.GET_QUESTION_TYPE_LIST_FAIL, err);
      })
    },

    getAllQuestionTypeList({ commit }, payload) {
      commit(types.GET_ALL_QUESTION_TYPE_LIST);
      API.getQuestionTypeList(payload).then(res => {
        commit(types.GET_ALL_QUESTION_TYPE_LIST_SUCCESS, res.data);
      }).catch(err => {
        commit(types.GET_ALL_QUESTION_TYPE_LIST_FAIL, err);
      })
    },

    addQuestionTypeList({ commit, dispatch }, payload) {
      commit(types.ADD_QUESTION_TYPE_LIST);
      API.addQuestionTypeList(payload).then(res => {
        commit(types.ADD_QUESTION_TYPE_LIST_SUCCESS, res.data);
        dispatch('getQuestionTypeList', payload.params);
        dispatch('getAllQuestionTypeList', getAllQuestionTypeParams)
      }).catch(err => {
        commit(types.ADD_QUESTION_TYPE_LIST_FAIL, err);
      })
    },

    updateQuestionTypeList({ commit, dispatch }, payload) {
      commit(types.UPDATE_QUESTION_TYPE_LIST);
      API.updateQuestionTypeList(payload).then(res => {
        commit(types.UPDATE_QUESTION_TYPE_LIST_SUCCESS, res.data);
        dispatch('getQuestionTypeList', payload.params);
        dispatch('getAllQuestionTypeList', getAllQuestionTypeParams)
      }).catch(err => {
        commit(types.UPDATE_QUESTION_TYPE_LIST_FAIL, err);
      })
    },

    deleteQuestionTypeList({ commit, dispatch }, payload) {
      commit(types.DELETE_QUESTION_TYPE_LIST);
      API.deleteQuestionTypeList(payload.questionID).then(res => {
        commit(types.DELETE_QUESTION_TYPE_LIST_SUCCESS, res.data);
        dispatch('getQuestionTypeList', payload.params);
        dispatch('getAllQuestionTypeList', getAllQuestionTypeParams)
      }).catch(err => {
        commit(types.DELETE_QUESTION_TYPE_LIST_FAIL, err);
      })
    }
  },
  getters: {
    questionTypeList: state => state.questionTypeList,
    isLoading: state => state.isLoading,
    allQuestionTypeList: state => state.allQuestionTypeList,
    numberQuestionType: state => state.allQuestionTypeList.length,
    alertText: state => state.alertText
  }
}

export default QuestionType
