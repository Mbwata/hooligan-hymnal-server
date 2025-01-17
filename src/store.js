import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";

Vue.use(Vuex);
Vue.use(VueSweetalert2);

const store = new Vuex.Store({
  state: {
    API_KEY: null,
    user: null,
    global_message: {
      type: null,
      message: null
    },
    players: null,
    player: null,
    songs: null,
    song: null,
    songbooks: null,
    songbook: null,
    rosters: null,
    roster: null,
    goalkeepersnicknames: null,
    goalkeepersnickname: null,
    foes: null,
    foe: null,
    users: null,
    single_user: null,
    pushTokens: null,
    pushToken: null,
    notifications: null,
    notification: null,
    latestNotification: null,
    profile: null
  },
  mutations: {
    SET_API_KEY(state, key) {
      state.API_KEY = key;
    },
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },
    LOGOUT() {
      localStorage.removeItem("user");
      location.reload();
    },
    SET_GLOBAL_MESSAGE(state, message) {
      state.global_message = message;
    },
    SET_ALL_PLAYERS(state, data) {
      state.players = data;
    },
    SET_PLAYER(state, data) {
      state.player = data;
    },
    SET_ALL_SONGS(state, data) {
      state.songs = data;
    },
    SET_SONG(state, data) {
      state.song = data;
    },
    SET_ALL_SONGBOOKS(state, data) {
      state.songbooks = data;
    },
    SET_SONGBOOK(state, data) {
      state.songbook = data;
    },
    SET_ALL_ROSTERS(state, data) {
      state.rosters = data;
    },
    SET_ROSTER(state, data) {
      state.roster = data;
    },
    SET_ALL_GOALKEEPERS_NICKNAMES(state, data) {
      state.goalkeepersnicknames = data;
    },
    SET_GOALKEEPERS_NICKNAME(state, data) {
      state.goalkeepersnickname = data;
    },
    SET_PUSH_TOKENS(state, data) {
      state.pushTokens = data;
    },
    SET_PUSH_TOKEN(state, data) {
      state.pushToken = data;
    },
    SET_NOTIFICATIONS(state, data) {
      state.notifications = data;
    },
    SET_NOTIFICATION(state, data) {
      state.notification = data;
    },
    SET_LATEST_NOTIFICATION(state, data) {
      state.latestNotification = data;
    },
    SET_USER_PROFILE(state, data) {
      state.profile = data;
    },
    SET_ALL_USERS(state, data) {
      state.users = data;
    }
  },
  actions: {
    fetchAPIKey({ commit }, key) {
      commit("SET_API_KEY", key);
    },
    register({ commit }, credentials) {
      return axios.post("/api/users/register", credentials).then(({ data }) => {
        commit("SET_GLOBAL_MESSAGE", data);
      });
    },
    login({ commit }, credentials) {
      return axios.post("/api/users/login", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    setUserData({ commit }, data) {
      commit("SET_USER_DATA", data);
    },
    global_message({ commit }, message) {
      commit("SET_GLOBAL_MESSAGE", message);
    },
    fetchPlayers({ commit }) {
      return axios.get(`/api/players`).then(({ data }) => {
        commit("SET_ALL_PLAYERS", data);
      });
    },
    fetchPlayer({ commit }, id) {
      return axios.get(`/api/players/${id}`).then(({ data }) => {
        commit("SET_PLAYER", data);
      });
    },
    fetchSongs({ commit }) {
      return axios.get(`/api/songs`).then(({ data }) => {
        commit("SET_ALL_SONGS", data);
      });
    },
    fetchSong({ commit }, id) {
      return axios.get(`/api/song/${id}`).then(({ data }) => {
        commit("SET_SONG", data);
      });
    },
    fetchSongbooks({ commit }) {
      return axios.get(`/api/songbooks`).then(({ data }) => {
        commit("SET_ALL_SONGBOOKS", data);
      });
    },
    fetchSongbook({ commit }, id) {
      return axios.get(`/api/songbooks/${id}`).then(({ data }) => {
        commit("SET_SONGBOOK", data);
      });
    },
    fetchRosters({ commit }) {
      return axios.get(`/api/rosters`).then(({ data }) => {
        commit("SET_ALL_ROSTERS", data);
      });
    },
    fetchRoster({ commit }, id) {
      return axios.get(`/api/rosters/${id}`).then(({ data }) => {
        commit("SET_ROSTER", data);
      });
    },
    fetchGoalkeepersNicknames({ commit }) {
      return axios.get(`/api/goalkeeperNicknames`).then(({ data }) => {
        commit("SET_ALL_GOALKEEPERS_NICKNAMES", data);
      });
    },
    // fetchNickname({ commit }, id) {
    //   // return axios.get(`/api/goalkeeper`);
    // }
    fetchPushTokens({ commit }) {
      return axios.get(`/api/pushToken`).then(({ data }) => {
        commit("SET_PUSH_TOKENS", data);
      });
    },
    fetchPushToken({ commit }, id) {
      return axios.get(`/api/pushToken/${id}`).then(({ data }) => {
        commit("SET_PUSH_TOKEN", data);
      });
    },
    fetchNotifications({ commit }) {
      return axios.get(`/api/notifications`).then(({ data }) => {
        commit("SET_NOTIFICATIONS", data);
      });
    },
    fetchNotification({ commit }, id) {
      return axios.get(`/api/notifications/${id}`).then(({ data }) => {
        commit("SET_NOTIFICATION", data);
      });
    },
    fetchLatestNotification({ commit }) {
      return axios.get(`/api/notifications/last`).then(({ data }) => {
        commit("SET_LATEST_NOTIFICATION", data);
      });
    },
    fetchUsers({ commit }) {
      return axios.get(`/api/users`).then(({ data }) => {
        commit("SET_ALL_USERS", data);
      });
    },
    authCheck() {
      return axios.get(`/api/users/me`).then(() => {
        return true;
      });
    }
  },
  getters: {
    loggedIn: state => !!state.user,
    // loggedIn(state) {
    //   return !!state.user;
    // },
    user(state) {
      if (state.user) {
        return state.user.user;
      }
    },
    getMessage: state => state.global_message,
    // getMessage(state) {
    //   return state.global_message;
    // },
    players: state => state.players,
    // players(state) {
    //   return state.players;
    // },
    player: state => state.player,
    // player(state) {
    //   return state.player;
    // },
    songs: state => state.songs,
    // songs(state) {
    //   return state.songs;
    // },
    song: state => state.song,
    // song(state) {
    //   return state.song;
    // },
    songbooks: state => state.songbooks,
    // songbooks(state) {
    //   return state.songbooks;
    // },
    songbook: state => state.songbook,
    goalkeepers: state => state.goalkeepersnicknames,
    // goalkeepers(state) {
    //   return state.goalkeepersnicknames;
    // },
    rosters: state => state.rosters,
    roster: state => state.roster,
    users: state => state.users
    // users(state) {
    //   return state.users;
    // }
  }
});
if (process.env.NODE_ENV !== "production") {
  axios.defaults.baseURL = "//localhost:5000";
}
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // this.$swal({
      // title: "Your session has expired please log back in.",
      // icon: "danger"
      // }).then(() => {
      store.dispatch("logout");
      // });
    }
    return Promise.reject(error);
  }
);
const userString = localStorage.getItem("user");
if (userString) {
  const userData = JSON.parse(userString);
  store.commit("SET_USER_DATA", userData);
  store.dispatch("authCheck");
}
axios.defaults.headers.common["x-api-key"] = process.env.VUE_APP_API_KEY;

export default store;
