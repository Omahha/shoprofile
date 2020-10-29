import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    typeData: [
      { id: null, name: null, password: null },
      { id: null, name: null, password: null },
      { id: null, name: null, password: null },
      { id: null, name: null, password: null }
    ],
    photos: {
      textile: [],
      graphic: [],
      illustration: [],
      home: []
    },
    setPhotos: {
      textile: [],
      graphic: [],
      illustration: [],
      home: []
    },
    typeHasPassword: {
      textile: null,
      graphic: null,
      illustration: null,
      home: null
    }
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.idToken
      state.userId = userData.userId
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
    },
    'SET_TYPEDATA_TEXTILE' (state, typeData) {
      state.typeData[0].id = typeData.id
      state.typeData[0].name = typeData.name
      state.typeData[0].password = typeData.password
    },
    'SET_TYPEDATA_GRAPHIC' (state, typeData) {
      state.typeData[1].id = typeData.id
      state.typeData[1].name = typeData.name
      state.typeData[1].password = typeData.password
    },
    'SET_TYPEDATA_ILLUSTRATION' (state, typeData) {
      state.typeData[2].id = typeData.id
      state.typeData[2].name = typeData.name
      state.typeData[2].password = typeData.password
    },
    'SET_TYPEDATA_HOME' (state, typeData) {
      state.typeData[3].id = typeData.id
      state.typeData[3].name = typeData.name
      state.typeData[3].password = typeData.password
    },
    'CLEAR_TYPEDATA' (state) {
      state.typeData[0].id = null
      state.typeData[0].name = null
      state.typeData[0].password = null
      state.typeData[1].id = null
      state.typeData[1].name = null
      state.typeData[1].password = null
      state.typeData[2].id = null
      state.typeData[2].name = null
      state.typeData[2].password = null
      state.typeData[3].id = null
      state.typeData[3].name = null
      state.typeData[3].password = null
    },
    'SET_PHOTO' (state, photoData) {
      state.photos[photoData.type] = photoData.resData.data
    },
    'SET_SETPHOTO' (state, setPhoto) {
      state.setPhotos[setPhoto.type] = setPhoto.resData.data
    },
    'ADD_PHOTO' (state, photoData) {
      state.photos[photoData.type].push(photoData)
    },
    'ADD_SETPHOTO' (state, setPhoto) {
      state.setPhotos[setPhoto.type].push(setPhoto)
    },
    'REMOVE_PHOTO' (state, idData) {
      const typeArray = ['textile', 'graphic', 'illustration', 'home']
      for (var i = 0; i < state.photos[typeArray[idData.typeId - 1]].length; i++) {
        console.log('count: ' + i)
        if (state.photos[typeArray[idData.typeId - 1]][i].id === idData.id) {
          state.photos[typeArray[idData.typeId - 1]].splice(i, 1)
          // console.log(state.photos[typeArray[idData.typeId - 1]][i].id)
          break
        }
      }
    },
    'REMOVE_SETPHOTO' (state, idData) {
      const typeArray = ['textile', 'graphic', 'illustration', 'home']
      for (var i = 0; i < state.setPhotos[typeArray[idData.typeId - 1]].length; i++) {
        // console.log('count: ' + i)
        if (state.setPhotos[typeArray[idData.typeId - 1]][i].id === idData.id) {
          state.setPhotos[typeArray[idData.typeId - 1]].splice(i, 1)
          // console.log(state.photos[typeArray[idData.typeId - 1]][i].id)
          break
        }
      }
    },
    'CLEAR_PHOTO' (state) {
      state.photos.textile = []
      state.photos.graphic = []
      state.photos.illustration = []
      state.photos.home = []
    },
    'CLEAR_SETPHOTO' (state) {
      state.setPhotos.textile = []
      state.setPhotos.graphic = []
      state.setPhotos.illustration = []
      state.setPhotos.home = []
    },
    'SET_TYPEHASPASSWORD' (state, hasPasswordData) {
      state.typeHasPassword.textile = hasPasswordData.textile
      state.typeHasPassword.graphic = hasPasswordData.graphic
      state.typeHasPassword.illustration = hasPasswordData.illustration
      state.typeHasPassword.home = hasPasswordData.home
    },
    'CLEAR_TYPEHASPASSWORD' (state) {
      state.typeHasPassword.textile = null
      state.typeHasPassword.graphic = null
      state.typeHasPassword.illustration = null
      state.typeHasPassword.home = null
    }
  },
  actions: {
    /* eslint-disable func-call-spacing */
    login ({ commit }, authData) {
      axios.post ('/login', {
        email: authData.email,
        password: authData.password
      })
        .then (res => {
          if (res.data.success) {
            commit ('authUser', {
              idToken: res.data.data.token,
              userId: res.data.data.id
            })

            const now = new Date()
            const tokenLife = 3600
            const expirationTime = new Date(now.getTime() + tokenLife * 1000)
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('userId', res.data.data.id)
            localStorage.setItem('expirationTime', expirationTime)

            axios.defaults.headers.common.Authorization = 'Bearer' + res.data.data.token

            router.replace('/edit')
          }
        })
    },
    logout ({ commit }) {
      commit('clearAuthData')
      commit('CLEAR_TYPEDATA')
      commit('CLEAR_PHOTO')
      commit('CLEAR_SETPHOTO')
      localStorage.clear()
      delete axios.defaults.headers.common.Authorization
      router.replace('/admin')
    },
    tryAutoLogin ({ commit, dispatch }) {
      const token = localStorage.getItem('token')
      if (!token) {
        console.log('no token')
        return
      }

      const expirationTime = localStorage.getItem('expirationTime')
      const now = new Date()
      if (now >= expirationTime) {
        console.log('token expired')
        return
      }

      const userId = localStorage.getItem('userId')
      commit('authUser', {
        idToken: token,
        userId: userId
      })

      axios.defaults.headers.common.Authorization = 'Bearer' + token

      // dispatch ('fetchType0Data')
    },
    fetchType0Data ({ commit }) {
      axios.get('types')
        .then (res => {
          const data = res.data.data.data
          commit('SET_TYPEDATA_TEXTILE', data[0])
        })
    },

    fetchType1Data ({ commit }) {
      axios.get('types')
        .then (res => {
          const data = res.data.data.data
          commit('SET_TYPEDATA_GRAPHIC', data[1])
        })
    },
    fetchType2Data ({ commit }) {
      axios.get('types')
        .then (res => {
          const data = res.data.data.data
          commit('SET_TYPEDATA_ILLUSTRATION', data[2])
        })
    },
    fetchType3Data ({ commit }) {
      axios.get('types')
        .then (res => {
          const data = res.data.data.data
          commit('SET_TYPEDATA_HOME', data[3])
        })
    },

    updateType0Data ({ state }, typeData) {
      var formData = new FormData()
      for (const key in typeData) {
        formData.append(key, typeData[key])
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      config.headers['X-HTTP-Method-Override'] = 'PUT'
      axios.post('/types/' + state.typeData[0].id, formData, config)
        .then (res => {
          console.log(res)
        })
    },
    updateType1Data ({ state }, typeData) {
      var formData = new FormData()
      for (const key in typeData) {
        formData.append(key, typeData[key])
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      config.headers['X-HTTP-Method-Override'] = 'PUT'
      axios.post('/types/' + state.typeData[1].id, formData, config)
        .then (res => {
          console.log(res)
        })
    },
    updateType2Data ({ state }, typeData) {
      var formData = new FormData()
      for (const key in typeData) {
        formData.append(key, typeData[key])
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      config.headers['X-HTTP-Method-Override'] = 'PUT'
      axios.post('/types/' + state.typeData[2].id, formData, config)
        .then (res => {
          console.log(res)
        })
    },
    updateType3Data ({ state }, typeData) {
      var formData = new FormData()
      for (const key in typeData) {
        formData.append(key, typeData[key])
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      config.headers['X-HTTP-Method-Override'] = 'PUT'
      axios.post('/types/' + state.typeData[3].id, formData, config)
        .then (res => {
          console.log(res)
        })
    },

    fetchPhotos ({ commit, state }, typeData) {
      axios.get('photos/' + typeData.type)
        .then (res => {
          const data = {
            type: typeData.type,
            resData: res.data.data
          }
          commit('SET_PHOTO', data)
        })
    },
    fetchSetPhotos ({ commit, state }, typeData) {
      axios.get('sets/' + typeData.type)
        .then (res => {
          const data = {
            type: typeData.type,
            resData: res.data.data
          }
          commit('SET_SETPHOTO', data)
        })
    },
    storePhoto ({ commit }, photoData) {
      var formData = new FormData()
      for (const key in photoData) {
        formData.append(key, photoData[key])
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      axios.post('photos', formData, config)
        .then (res => {
          const data = res.data.data
          commit ('ADD_PHOTO', data)
        })
    },
    storeSetPhoto ({ commit }, photoData) {
      var formData = new FormData()
      for (const key in photoData) {
        formData.append(key, photoData[key])
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      axios.post('sets', formData, config)
        .then (res => {
          const data = res.data.data
          commit ('ADD_SETPHOTO', data)
        })
    },
    deletePhoto ({ commit }, idData) {
      axios.delete ('photos/' + idData.id)
        .then (res => {
          commit ('REMOVE_PHOTO', idData)
        })
    },
    deleteSetPhoto ({ commit }, idData) {
      axios.delete ('sets/' + idData.id)
        .then (res => {
          commit ('REMOVE_SETPHOTO', idData)
        })
    },
    fetchHasPassword ({ commit }) {
      axios.get ('/hasPassword')
        .then (res => {
          const data = res.data.data
          commit('SET_TYPEHASPASSWORD', data)
        })
    },
    fetchCheckPassword ({ commit }, passwordData) {
      var formData = new FormData()
      for (const key in passwordData) {
        formData.append(key, passwordData[key])
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }
      axios.post ('/checkPassword', formData, config)
        .then (res => {
          console.log(res)
        })
    }
  },
  getters: {
    type0Data (state) {
      return {
        id: state.typeData[0].id,
        password: state.typeData[0].password
      }
    },
    type1Data (state) {
      return {
        id: state.typeData[1].id,
        password: state.typeData[1].password
      }
    },
    type2Data (state) {
      return {
        id: state.typeData[2].id,
        password: state.typeData[2].password
      }
    },
    type3Data (state) {
      return {
        id: state.typeData[3].id,
        password: state.typeData[3].password
      }
    },
    textilePhotos (state) {
      return state.photos.textile
    },
    graphicPhotos (state) {
      return state.photos.graphic
    },
    illustrationPhotos (state) {
      return state.photos.illustration
    },
    homePhotos (state) {
      return state.photos.home
    },
    textileSetPhotos (state) {
      return state.setPhotos.textile
    },
    graphicSetPhotos (state) {
      return state.setPhotos.graphic
    },
    illustrationSetPhotos (state) {
      return state.setPhotos.illustration
    },
    homeSetPhotos (state) {
      return state.setPhotos.home
    },
    hasPassword (state) {
      return state.typeHasPassword
    }
  },
  modules: {
  }
})
