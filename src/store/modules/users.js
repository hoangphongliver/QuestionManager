import { userAPI } from "../../service/user";

const types = {
  SHOW_APP_LOGIN: 'SHOW_APP_LOGIN',
  ON_LOGIN: 'ON_LOGIN',

  GET_USER_LIST: 'GET_USER_LIST',
  GET_USER_LIST_SUCCESS: 'GET_USER_LIST_SUCCESS',
  GET_USER_LIST_FAIL: 'GET_USER_LIST_FAIL',

  ADD_USER: 'ADD_USER',
  ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
  ADD_USER_FAIL: 'ADD_USER_FAIL'
}

const currentUser = localStorage.getItem('currentUser');

const Users = {
  namespaced: true,
  state: () => ({
    isLogin: JSON.parse(currentUser)?.id ? true : false,
    currentUser: JSON.parse(currentUser)?.id ? JSON.parse(currentUser) : {},
    userList: [],
    isLoading: false,
    userStatus: {
      status: false,
      text: ""
    },
    loginState: {
      status: false,
      text: ""
    }
  }),

  actions: {
    showLoginModal({ commit }) {
      commit(types.SHOW_APP_LOGIN)
    },

    onLogin({ commit }, payload) {
      commit(types.GET_USER_LIST);
      userAPI.getUserList().then(res => {
        commit(types.GET_USER_LIST_SUCCESS, res.data);
        commit(types.ON_LOGIN, payload);
      }).catch(err => {
        commit(types.GET_USER_LIST_FAIL, err);
      })
    },

    onAddUser({ commit }, payload) {
      commit(types.ADD_USER);
      userAPI.addUser(payload).then(res => {
        commit(types.ADD_USER_SUCCESS, res.data);
      }).catch(err => {
        commit(types.ADD_USER_FAIL, err);
      })
    }
  },

  mutations: {
    [types.SHOW_APP_LOGIN](state) {
      state.isShowLoginModal = !state.isShowLoginModal
    },

    [types.ON_LOGIN](state, payload) {
      console.log(state.userList, payload);
      for (let index = 0; index < state.userList.length; index++) {
        const user = state.userList[index];
        if (user.email === payload.userName && user.password === payload.password) {
          localStorage.setItem("currentUser", JSON.stringify(user))
          state.currentUser = user;
          state.isLogin = true;
          state.loginState = {
            status: true,
            text: "Login Successfully!"
          }
          break;
        } else {
          state.loginState = {
            status: false,
            text: "Tài khoản hoặc mật khẩu không chính xác!"
          }
        }
      }

    },

    [types.GET_USER_LIST](state) {
      state.isLoading = true
    },

    [types.GET_USER_LIST_SUCCESS](state, response) {
      state.userList = response;
      state.isLoading = false
    },

    [types.GET_USER_LIST_FAIL](state, err) {
      state.userList = err;
      state.isLoading = false
    },

    [types.ADD_USER](state) {
      state.isLoading = true
    },

    [types.ADD_USER_SUCCESS](state, response) {
      state.userList = response;
      state.isLoading = false;
      state.userStatus = {
        status: true,
        text: "Register Successfully"
      }
    },

    [types.ADD_USER_FAIL](state, err) {
      state.userList = err;
      state.isLoading = false;
      state.userStatus = {
        status: true,
        text: "Register Fail"
      }
    },
  },

  getters: {
    isLogin: state => state.isLogin,
    currentUser: state => state.currentUser,
    isLoading: state => state.isLoading,
    userStatus: state => state.userStatus,
    loginState: state => state.loginState
  }
}

export default Users
