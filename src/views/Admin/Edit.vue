<template>
  <v-row justify="start">
    <v-col cols="8">
      <!-- photo dialog ------------------------------- -->
      <v-dialog
        v-model="dialog"
        max-width="600px"
        persistent>
        <v-app-bar
          color="blue-grey darken-4"
          dark>
          <v-toolbar-title>Add Photo</v-toolbar-title>
        </v-app-bar>

          <v-card tile>
            <v-card-text class="pt-5">
              <v-row>
                <v-col>
                  <v-form>
                    <v-file-input
                      v-model="data.photo"
                      accept="image/*"
                      clearable
                      show-size
                      @blur="$v.data.photo.$touch()"
                      :error-messages="photoErrors"
                      @change="onFileChange"
                      @click:clear="previewUrl=null"
                    ></v-file-input>

                    <v-select
                      v-model="selectItem"
                      :items="selectItemList"
                      item-text="value"
                      item-value="id"
                    ></v-select>
                  </v-form>
                </v-col>
                <v-col align-self="center">
                  <v-row>
                    <v-img
                      :src="previewUrl"
                      width="150"
                      height="200"
                      min-width="150"
                      min-height="200"
                    ></v-img>
                  </v-row>
                </v-col>
              </v-row>
          </v-card-text>

          <v-card-text>
            <v-row justify="center">
              <v-col cols="10">
                <v-row justify="space-around">
                  <v-btn tile
                    color="red accent-4"
                    class="white--text"
                    @click.prevent="closeRegisterModal"
                  >Cancel</v-btn>

                  <v-btn tile
                    color="primary"
                    class="white--text"
                    @click.prevent="register"
                    :disabled="$v.data.photo.$invalid"
                  >Register</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- ------------------------------------- -->

      <!-- set dialog ------------------------------- -->
      <v-dialog
        v-model="setDialog"
        max-width="600px"
        persistent>
        <v-app-bar
          color="blue-grey darken-4"
          dark>
          <v-toolbar-title>Add SetPhoto</v-toolbar-title>
        </v-app-bar>

          <v-card tile>
            <v-card-text class="pt-5">
              <v-row>
                <v-col>
                  <v-form>
                    <v-file-input
                      v-model="data.set"
                      accept="image/*"
                      clearable
                      show-size
                      @blur="$v.data.set.$touch()"
                      :error-messages="photoErrors"
                      @change="onFileChange2"
                      @click:clear="setPreviewUrl=null"
                    ></v-file-input>

                    <v-select
                      v-model="setSelectItem"
                      :items="setItemRefList"
                      item-text="id"
                      item-value="id"
                    ></v-select>
                  </v-form>
                </v-col>
                <v-col align-self="center">
                  <v-row>
                    <v-img
                      :src="setPreviewUrl"
                      width="150"
                      height="200"
                      min-width="150"
                      min-height="200"
                    ></v-img>
                  </v-row>
                </v-col>
              </v-row>
          </v-card-text>

          <v-card-text>
            <v-row justify="center">
              <v-col cols="10">
                <v-row justify="space-around">
                  <v-btn tile
                    color="red accent-4"
                    class="white--text"
                    @click.prevent="closeSetModal"
                  >Cancel</v-btn>

                  <v-btn tile
                    color="primary"
                    class="white--text"
                    @click.prevent="setRegister"
                    :disabled="$v.data.set.$invalid"
                  >Register</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- ------------------------------------- -->

      <v-card tile elevation="0">
        <v-card-text>

            <v-row class="ml-0 mr-0 mt-5" justify="start" style="paddingLeft: 0px">
              <div v-for="(value, name, index) in data.registered" :key="index" style="margin-bottom: 50px">
                <h2>{{ value.id }} : {{ name }}</h2>
                <div class="d-flex">
                  <v-form class="d-flex">
                    <v-text-field
                      v-model="value.password"
                      type="text"
                      label="PASSWORD"
                      @input="$v.data.registered[name].password.$touch()"
                      :error-messages="value.error"
                      style="maxWidth: 200px">
                    </v-text-field>
                    <v-btn
                      tile
                      small
                      color="warning"
                      style="textAlign: end"
                      :disabled="$v.data.registered[name].password.$invalid" @click="changePassword(name, index)">
                      CHANGE
                    </v-btn>
                  </v-form>
                </div>
                <!-- main slide group -->
                <v-slide-group show-arrows mandatory center-active style="width:90vw; height: 200px">
                  <v-slide-item
                    v-for="(v, n, ind) in value.photos"
                    :key="ind"
                    v-slot:default="{ active, toggle }">
                    <v-card
                      class="ma-4 d-flex align-center"
                      width="150px"
                      height="150px"
                      :elevation="active ? 10 : 0"
                      @click="toggle">
                      <v-img
                        :src="getImg(v.path)"
                        max-height="150"
                        max-width="150"
                        @click="mainId = v.id">
                      </v-img>
                      <v-btn tile x-small width="100%"
                          color="red accent-4"
                          class="white--text"
                          style="position: absolute; z-index: 100; bottom:-10%"
                          @click.prevent="deletePhoto(v.id, value.id)">
                          Delete {{ v.id }}
                        </v-btn>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>

                <!-- set slide group -->
                <v-slide-group show-arrows mandatory center-active style="width:90vw; height: 200px">
                  <v-slide-item
                    v-for="(v, n, ind) in value.sets"
                    :key="ind"
                    v-slot:default="{ active, toggle }">
                    <v-card
                      class="ma-4 d-flex align-center"
                      width="150px"
                      height="150px"
                      :elevation="active ? 10 : 0"
                      @click="toggle">
                      <v-img
                        :src="getImg(v.path)"
                        max-height="150"
                        max-width="150"
                        @click="mainId = v.id">
                      </v-img>
                      <v-btn tile x-small width="100%"
                          color="red accent-4"
                          class="white--text"
                          style="position: absolute; z-index: 100; bottom:-10%"
                          @click.prevent="deleteSetPhoto(v.id, value.id)">
                          Delete {{ v.photo_id }} - {{ v.id }}
                        </v-btn>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </div>
            </v-row>

        </v-card-text>

        <v-card-text>
          <div class="d-flex">
            <v-btn tile
              color="success"
              class="white--text mr-2"
              @click.prevent="dialog = true">
              Add Photo
            </v-btn>

            <v-btn tile
              color="warning"
              class="white--text mr-2"
              @click.prevent="setDialog = true">
              Add SetPhoto
            </v-btn>

            <v-btn tile
              color="red accent-4"
              class="white--text"
              @click.prevent="logout">
              Logout
            </v-btn>
          </div>
        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, maxLength, helpers } from 'vuelidate/lib/validators'
import { handleErrorsMixin, onFileChangeMixin } from '../../formCheckMixin.js'
import { mapGetters } from 'vuex'

const imgSize = (value) => !helpers.req(value) || value.size < 10000000

export default {
  mixins: [handleErrorsMixin, onFileChangeMixin],

  data () {
    return {
      dialog: false,
      previewUrl: null,

      setDialog: false,
      setPreviewUrl: null,

      selectItem: 1,
      selectItemList: [
        { id: 1, value: 'textile' },
        { id: 2, value: 'graphic' },
        { id: 3, value: 'illustration' },
        { id: 4, value: 'home' }
      ],

      setSelectItem: null,

      data: {
        email: '',
        photo: null,
        set: null,
        registered: {
          textile: {
            id: null,
            password: null,
            error: '',
            photos: [],
            sets: []
          },
          graphic: {
            id: null,
            password: null,
            error: '',
            photos: [],
            sets: []
          },
          illustration: {
            id: null,
            password: null,
            error: '',
            photos: [],
            sets: []
          },
          home: {
            id: null,
            password: null,
            error: '',
            photos: [],
            sets: []
          }
        }
      }
    }
  },
  validations: {
    data: {
      registered: {
        textile: {
          password: {
            maxLen: maxLength(20)
          }
        },
        graphic: {
          password: {
            maxLen: maxLength(20)
          }
        },
        illustration: {
          password: {
            maxLen: maxLength(20)
          }
        },
        home: {
          password: {
            maxLen: maxLength(20)
          }
        }
      },
      photo: {
        required,
        imgSize
      },
      set: {
        required,
        imgSize
      }
    }
  },
  computed: {
    textilePasswordErrors () {
      return this.handleErrors('registered', 'textile', 'password')
    },
    graphicPasswordErrors () {
      return this.handleErrors('registered', 'graphic', 'password')
    },
    illustrationPasswordErrors () {
      return this.handleErrors('registered', 'illustration', 'password')
    },
    homePasswordErrors () {
      return this.handleErrors('registered', 'home', 'password')
    },
    photoErrors () {
      return this.handleErrors('photo')
    },
    setErrors () {
      return this.handleErrors('set')
    },
    ...mapGetters([
      'type0Data',
      'type1Data',
      'type2Data',
      'type3Data',
      'textilePhotos',
      'graphicPhotos',
      'illustrationPhotos',
      'homePhotos',
      'textileSetPhotos',
      'graphicSetPhotos',
      'illustrationSetPhotos',
      'homeSetPhotos'
    ]),
    setItemRefList () {
      const set = []
      this.textilePhotos.forEach(value => {
        set.push(value)
      })
      this.graphicPhotos.forEach(value => {
        set.push(value)
      })
      this.illustrationPhotos.forEach(value => {
        set.push(value)
      })

      return set
    }
  },
  mounted () {
    this.$store.dispatch('fetchType0Data')
    this.$store.dispatch('fetchType1Data')
    this.$store.dispatch('fetchType2Data')
    this.$store.dispatch('fetchType3Data')

    const typeArray = ['textile', 'graphic', 'illustration', 'home']
    typeArray.forEach((value) => {
      this.$store.dispatch('fetchPhotos', {
        type: value
      })
    })

    typeArray.forEach((value) => {
      this.$store.dispatch('fetchSetPhotos', {
        type: value
      })
    })
  },
  watch: {
    /* eslint-disable func-call-spacing */
    textilePasswordErrors () {
      this.data.registered.textile.error = this.textilePasswordErrors
    },
    graphicPasswordErrors () {
      this.data.registered.graphic.error = this.graphicPasswordErrors
    },
    illustrationPasswordErrors () {
      this.data.registered.illustration.error = this.illustrationPasswordErrors
    },
    homePasswordErrors () {
      this.data.registered.home.error = this.homePasswordErrors
    },
    type0Data () {
      this.data.registered.textile.password = this.type0Data.password
      this.data.registered.textile.id = this.type0Data.id
    },
    type1Data () {
      this.data.registered.graphic.password = this.type1Data.password
      this.data.registered.graphic.id = this.type1Data.id
    },
    type2Data () {
      this.data.registered.illustration.password = this.type2Data.password
      this.data.registered.illustration.id = this.type2Data.id
    },
    type3Data () {
      this.data.registered.home.password = this.type3Data.password
      this.data.registered.home.id = this.type3Data.id
    },
    textilePhotos () {
      const photos = []
      this.textilePhotos.forEach ((value) => {
        photos.push(value)
      })
      this.data.registered.textile.photos = photos
    },
    graphicPhotos () {
      const photos = []
      this.graphicPhotos.forEach ((value) => {
        photos.push(value)
      })
      this.data.registered.graphic.photos = photos
    },
    illustrationPhotos () {
      const photos = []
      this.illustrationPhotos.forEach ((value) => {
        photos.push(value)
      })
      this.data.registered.illustration.photos = photos
    },
    homePhotos () {
      const photos = []
      this.homePhotos.forEach ((value) => {
        photos.push(value)
      })
      this.data.registered.home.photos = photos
    },

    textileSetPhotos () {
      const photos = []
      this.textileSetPhotos.forEach ((value) => {
        photos.push(value)
      })
      this.data.registered.textile.sets = photos
    },
    graphicSetPhotos () {
      const photos = []
      this.graphicSetPhotos.forEach ((value) => {
        photos.push(value)
      })
      this.data.registered.graphic.sets = photos
    },
    illustrationSetPhotos () {
      const photos = []
      this.illustrationSetPhotos.forEach ((value) => {
        photos.push(value)
      })
      this.data.registered.illustration.sets = photos
    },
    homeSetPhotos () {
      const photos = []
      this.homeSetPhotos.forEach ((value) => {
        photos.push(value)
      })
      this.data.registered.home.sets = photos
    },

    setItemRefList () {
      this.setSelectItem = this.setItemRefList[0].id
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      console.log('logout')
    },
    deletePhoto (id, typeId) {
      this.$store.dispatch ('deletePhoto', {
        id: id,
        typeId: typeId
      })
    },
    deleteSetPhoto (id, typeId) {
      this.$store.dispatch ('deleteSetPhoto', {
        id: id,
        typeId: typeId
      })
    },
    changePassword (name, index) {
      const dispatchActionArray = ['updateType0Data', 'updateType1Data', 'updateType2Data', 'updateType2Data']
      this.$store.dispatch(dispatchActionArray[index], {
        password: this.data.registered[name].password
      })
    },
    closeRegisterModal () {
      this.dialog = false
    },
    closeSetModal () {
      this.setDialog = false
    },
    register () {
      this.$store.dispatch('storePhoto', {
        path: this.data.photo,
        type: this.selectItem
      })
      this.dialog = false
      console.log(this.data.photo)
    },
    setRegister () {
      this.$store.dispatch('storeSetPhoto', {
        path: this.data.set,
        photo_id: this.setSelectItem
      })
      this.setDialog = false
    },
    getImg (path) {
      return `${path}`
    }
  }
}
</script>
