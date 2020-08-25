import axios from 'axios';
export const API = {
  getQuestionTypeList() {
    return axios({
      method: 'GET',
      url: 'https://5e68fb97d426c00016b7e9bb.mockapi.io/api/v1/Category'
    })
  },

  addQuestionTypeList(body) {
    return axios({
      method: 'POST',
      url: 'https://5e68fb97d426c00016b7e9bb.mockapi.io/api/v1/Category',
      data: body
    })
  },

  updateQuestionTypeList(params) {
    return axios({
      method: 'PUT',
      url: `https://5e68fb97d426c00016b7e9bb.mockapi.io/api/v1/Category/${params.questionID}`,
      data: params.body
    })
  },

  deleteQuestionTypeList(questionID) {
    return axios({
      method: 'DELETE',
      url: `https://5e68fb97d426c00016b7e9bb.mockapi.io/api/v1/Category/${questionID}`
    })
  },

  getQuestionList(questionID) {
    return axios({
      method: 'GET',
      url: `https://5e68fb97d426c00016b7e9bb.mockapi.io/api/v1/Category/${questionID}/Questions`
    })
  },

  addQuestionList(params) {
    return axios({
      method: 'POST',
      url: `https://5e68fb97d426c00016b7e9bb.mockapi.io/api/v1/Category/${params.questionTypeID}/Questions`,
      data: params.body
    })
  },

  updateQuestionList(params) {
    return axios({
      method: 'PUT',
      url: `https://5e68fb97d426c00016b7e9bb.mockapi.io/api/v1/Category/${params.questionTypeID}/Questions/${params.questionID}`,
      data: params.body
    })
  },

  deleteQuestionList(payload) {
    return axios({
      method: 'DELETE',
      url: `https://5e68fb97d426c00016b7e9bb.mockapi.io/api/v1/Category/${payload.questionTypeID}/Questions/${payload.questionID}`
    })
  }
}
