const types = {
  SHOW_APP_LOGIN: 'SHOW_APP_LOGIN',
  SHOW_APP_SIGN_UP: 'SHOW_APP_SIGN_UP',
  SHOW_APP_SIGN_IN: 'SHOW_APP_SIGN_IN'
}

const Question = {
  namespaced: true,
  state: () => ({
    isShowLoginModal: false,
    isShowSignUp: false,
    isShowSignIn: true
  }),

  actions: {
    showLoginModal({ commit }) {
      commit(types.SHOW_APP_LOGIN)
    },
    showAppSignUp({ commit }) {
      commit(types.SHOW_APP_SIGN_UP)
    },

    showAppSignIn({ commit }) {
      commit(types.SHOW_APP_SIGN_IN)
    },
  },

  mutations: {
    SHOW_APP_LOGIN(state) {
      state.isShowLoginModal = !state.isShowLoginModal
    },

    SHOW_APP_SIGN_UP(state) {
      state.isShowSignUp = true;
      state.isShowSignIn = false;
    },

    SHOW_APP_SIGN_IN(state) {
      state.isShowSignIn = true;
      state.isShowSignUp = false;
    }
  },

  getters: {
    isShowLoginModal: state => state.isShowLoginModal,
    isShowSignUp: state => state.isShowSignUp,
    isShowSignIn: state => state.isShowSignIn
  }
}

export default Question
