import { v4 as uuidv4 } from 'uuid'

export const state = () => {
  return {
    files: {},
    currentFile: null,
    additionalFiles: [],
    coverPhotoID: null,
    showPins: true,
  }
}

export const getters = {
  isFileUploading: (state) => (id) => {
    return !state.files[id]?.uploaded || false
  },
  isFileProcessing: (state) => (id) => {
    return !state.files[id]?.processed || false
  },
  getFile: (state) => (id) => {
    return state.files[id]
  },
  getAdditionalFiles(state) {
    return state.additionalFiles
  },
  getCoverPhotoID(state) {
    return state.coverPhotoID
  },
}

export const mutations = {
  setPinStatus(state, status) {
    state.showPins = status
  },
  addUpload(state, file) {
    state.files[file.id] = file
  },
  update(state, file) {
    if (!file) return
    const current = state.files[file.id]
    if (!current) {
      state.files[file.id] = file
    } else {
      Object.assign(current, file)
      state.currentFile = file
    }
  },
  removeFile(state, id) {
    delete state.files[id]
  },
  setAdditionalFiles(state, data) {
    state.additionalFiles.push(data)
  },
  removeAdditionalFiles(state, index) {
    state.additionalFiles.splice(index, 1)
  },
  clearAdditionalFiles(state) {
    state.additionalFiles = []
  },
  setCoverPhotoID(state, data) {
    state.coverPhotoID = data
  },
}

export const actions = {
  upload({ commit, getters }, { file, data: customMetadata }) {
    if (!this.getters['auth/isLoggedIn']) {
      throw new Error('Not logged in.')
    }

    const uid = this.state.auth.uid
    const root = this.$router.app.$root

    /** @type { import('firebase').default.storage.Storage } */
    const storage = this.$fire.storage
    const fileID = uuidv4()

    const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
    const ref = storage.ref(`users/${uid}/uploads/${fileID}.${ext}`)

    this.commit('control/setWaiting', { name: `file/upload:${fileID}`, value: true })
    const start = performance ? performance.now() + performance.timeOrigin : new Date().getTime()
    const task = ref.put(file, { customMetadata })

    commit('update', { id: fileID })
    root.$emit('file', { type: 'initializing', file: getters.getFile(fileID), nativeFile: file })

    const waitForUpload = new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes
          this.commit('control/setProgress', { name: `file/upload:${fileID}`, value: progress })
          this.commit('control/setPaused', { name: `file/upload:${fileID}`, value: snapshot.state === 'paused' })
          commit('update', { id: fileID, progress })
          root.$emit('file', { type: 'progress', file: getters.getFile(fileID), nativeFile: file })
        },
        (error) => {
          this.commit('control/setError', { name: `file/upload:${fileID}`, value: error })
          reject(error)
          commit('update', { id: fileID, error })
          root.$emit('file', { type: 'error', file: getters.getFile(fileID), nativeFile: file })

          const end = performance ? performance.now() + performance.timeOrigin : new Date().getTime()
          const duration = end - start
          this.app.$toast?.error(`File Upload Failed (${file.name}) ${duration.toFixed(2)}ms`, {
            duration: 2000,
            position: 'bottom-right',
          })
        },
        () => {
          this.commit('control/setWaiting', { name: `file/upload:${fileID}`, value: false })
          resolve(fileID)
          commit('update', { id: fileID, uploaded: true })
          root.$emit('file', { type: 'uploaded', file: getters.getFile(fileID), nativeFile: file })

          const end = performance ? performance.now() + performance.timeOrigin : new Date().getTime()
          const duration = end - start
          if (!process.env.NUXT_ENV_PRODUCTION) {
            this.app.$toast?.success(`File Upload Successful (${file.name}) ${duration.toFixed(2)}ms`, {
              duration: 2000,
              position: 'bottom-right',
            })
          }
        }
      )
    })

    /** @type { import('firebase').default.firestore.Firestore } */
    const firestore = this.$fire.firestore
    const docRef = firestore.doc(`users/${uid}/uploads/${fileID}.${ext}`)
    const waitForProcess = new Promise((resolve, reject) => {
      this.commit('control/setWaiting', { name: `file/upload:${fileID}:processing`, value: true })
      const finish = docRef.onSnapshot((doc) => {
        const data = doc.data()
        commit('update', { id: fileID, data })

        if (data?.processedAt) {
          finish()
          resolve(data)
          commit('update', { id: fileID, processed: true })
          root.$emit('file', { type: 'processed', file: getters.getFile(fileID), nativeFile: file })
          this.commit('control/setWaiting', { name: `file/upload:${fileID}:processing`, value: false })

          const end = performance ? performance.now() + performance.timeOrigin : new Date().getTime()
          const duration = end - start
          if (!process.env.NUXT_ENV_PRODUCTION)
            this.$toast?.success(`File Upload Processed as ${data.objectType}: ${duration.toFixed(2)}ms`, {
              duration: 2000,
              position: 'bottom-right',
            })
        }
      }, reject)
    })

    return { id: fileID, waitForUpload, waitForProcess }
  },
  uploadAdditionalFile({ commit, getters }, { file, data: customMetadata }) {
    if (!this.getters['auth/isLoggedIn']) {
      throw new Error('Not logged in.')
    }

    const uid = this.state.auth.uid
    const root = this.$router.app.$root

    /** @type { import('firebase').default.storage.Storage } */
    const storage = this.$fire.storage
    const fileID = uuidv4()

    const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
    const ref = storage.ref(`files/${fileID}.${ext}`)

    this.commit('control/setWaiting', { name: `file/upload:${fileID}`, value: true })
    const start = performance ? performance.now() + performance.timeOrigin : new Date().getTime()
    const task = ref.put(file, { customMetadata })

    commit('update', { id: fileID })
    root.$emit('file', { type: 'initializing', file: getters.getFile(fileID), nativeFile: file })

    const waitForUpload = new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes
          this.commit('control/setProgress', { name: `file/upload:${fileID}`, value: progress })
          this.commit('control/setPaused', { name: `file/upload:${fileID}`, value: snapshot.state === 'paused' })
          commit('update', { id: fileID, progress })
          root.$emit('file', { type: 'progress', file: getters.getFile(fileID), nativeFile: file })
        },
        (error) => {
          this.commit('control/setError', { name: `file/upload:${fileID}`, value: error })
          reject(error)
          commit('update', { id: fileID, error })
          root.$emit('file', { type: 'error', file: getters.getFile(fileID), nativeFile: file })

          const end = performance ? performance.now() + performance.timeOrigin : new Date().getTime()
          const duration = end - start
          this.app.$toast?.error(`File Upload Failed (${file.name}) ${duration.toFixed(2)}ms`, {
            duration: 2000,
            position: 'bottom-right',
          })
        },
        () => {
          this.commit('control/setWaiting', { name: `file/upload:${fileID}`, value: false })
          resolve(fileID)
          commit('update', { id: fileID, uploaded: true })
          root.$emit('file', { type: 'uploaded', file: getters.getFile(fileID), nativeFile: file })

          const end = performance ? performance.now() + performance.timeOrigin : new Date().getTime()
          const duration = end - start
          if (!process.env.NUXT_ENV_PRODUCTION) {
            this.app.$toast?.success(`File Upload Successful (${file.name}) ${duration.toFixed(2)}ms`, {
              duration: 2000,
              position: 'bottom-right',
            })
          }
        }
      )
    })

    /** @type { import('firebase').default.firestore.Firestore } */
    const firestore = this.$fire.firestore
    const docRef = firestore.doc(`users/${uid}/uploads/${fileID}.${ext}`)
    const waitForProcess = new Promise((resolve, reject) => {
      this.commit('control/setWaiting', { name: `file/upload:${fileID}:processing`, value: true })
      const finish = docRef.onSnapshot((doc) => {
        const data = doc.data()
        commit('update', { id: fileID, data })

        if (data?.processedAt) {
          finish()
          resolve(data)
          commit('update', { id: fileID, processed: true })
          root.$emit('file', { type: 'processed', file: getters.getFile(fileID), nativeFile: file })
          this.commit('control/setWaiting', { name: `file/upload:${fileID}:processing`, value: false })

          const end = performance ? performance.now() + performance.timeOrigin : new Date().getTime()
          const duration = end - start
          if (!process.env.NUXT_ENV_PRODUCTION)
            this.$toast?.success(`File Upload Processed as ${data.objectType}: ${duration.toFixed(2)}ms`, {
              duration: 2000,
              position: 'bottom-right',
            })
        }
      }, reject)
    })

    return { file, id: fileID, waitForUpload, waitForProcess }
  },
  setAdditionalFiles({ commit }, data) {
    commit('setAdditionalFiles', data)
  },
  removeAdditionalFiles({ commit }, index) {
    commit('removeAdditionalFiles', index)
  },
  setCoverPhotoID({ commit }, data) {
    commit('setCoverPhotoID', data)
  },
}
