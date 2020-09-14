import axios from 'axios';
export const userAPI = {
  getUserList() {
    return axios({
      method: 'GET',
      url: 'https://5e68fb97d426c00016b7e9bb.mockapi.io/api/v1/User'
    })
  },

  addUser(body) {
    return axios({
      method: 'POST',
      url: 'https://5e68fb97d426c00016b7e9bb.mockapi.io/api/v1/User',
      data: body
    })
  }
}
