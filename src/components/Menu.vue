<template>
  <div class="font">
    <v-row justify="space-between">
      <div class="pr-0 pl-0" @click="hideMenu">
        <router-link
          to="/biography"
          :class="{'text-h6': $vuetify.breakpoint.smAndUp, 'text-subtitle-2': $vuetify.breakpoint.mobile}">
            BIOGRAPHY
        </router-link>
      </div>

      <div class="pr-0 pl-0" style="position: relative; text-align: center;">
          <span
            href="#"
            class="mb-0 work"
            :class="{'text-h6': $vuetify.breakpoint.smAndUp, 'text-subtitle-2': $vuetify.breakpoint.mobile}"
            @click="toggleMenu">
              WORK
          </span>
          <div :style="submenuLine"></div>
          <div
            class="d-flex flex-column"
            style="position: absolute;"
            :class="{
              menuStyleWindow: $vuetify.breakpoint.smAndUp,
              menuStyleMobile: $vuetify.breakpoint.mobile
            }" >
            <transition name="move1">
              <!-- <router-link
                to="/work"
                class="pb-3 submenuStyle"
                v-if="menu">
                  textile
              </router-link> -->
              <a
                href="#"
                class="pb-3 submenuStyle"
                v-if="menu"
                @click.prevent="toWork(0)"
                id="textile">
                  <span :class="{
                    focusClass: setFocus==='textile'
                    }">
                    textile
                  </span>
              </a>
            </transition>
            <transition name="move2">
              <!-- <router-link
                to="/work"
                class="pb-3 submenuStyle"
                :class="{
                  menu2: $vuetify.breakpoint.smAndUp,
                  menu2Mobile: $vuetify.breakpoint.mobile
                }"
                v-if="menu">
                  graphic
              </router-link> -->
              <a
                href="#"
                class="pb-3 submenuStyle"
                :class="{
                  menu2: $vuetify.breakpoint.smAndUp,
                  menu2Mobile: $vuetify.breakpoint.mobile
                }"
                v-if="menu"
                @click.prevent="toWork(1)"
                id="graphic">
                  <span :class="{
                    focusClass: setFocus==='graphic'
                    }">
                    graphic
                  </span>
              </a>
            </transition>
            <transition name="move3">
              <!-- <router-link
                to="/work"
                class="pb-3 submenuStyle"
                :class="{
                  menu3: $vuetify.breakpoint.smAndUp,
                  menu3Mobile: $vuetify.breakpoint.mobile
                }"
                v-if="menu">
                  illustration
              </router-link> -->
              <a
                href="#"
                class="pb-3 submenuStyle"
                :class="{
                  menu3: $vuetify.breakpoint.smAndUp,
                  menu3Mobile: $vuetify.breakpoint.mobile
                }"
                v-if="menu"
                @click.prevent="toWork(2)"
                id="illustration">
                  <span :class="{
                    focusClass: setFocus==='illustration'
                    }">
                    illustration
                  </span>
              </a>
            </transition>
        </div>
      </div>

      <div class="pr-0 pl-0" style="text-align: end;" @click="hideMenu">
        <router-link
          to="/contact"
          :class="{'text-h6': $vuetify.breakpoint.smAndUp, 'text-subtitle-2': $vuetify.breakpoint.mobile}">
            CONTACT
        </router-link>
      </div>

      <!-- password modal ------------------------------- -->
        <!-- <v-dialog
          v-model="dialog"
          max-width="300px">
          <v-app-bar
            color="blue-grey darken-4"
            dark>
            <v-toolbar-title>Password</v-toolbar-title>
          </v-app-bar>

            <v-card tile>
              <v-card-text class="pt-5">
                <v-row>
                  <v-col>
                    <v-form class="d-flex justify-center">
                      <v-text-field
                        v-model="data.password"
                        type="text"
                        label="PASSWORD"
                        style="maxWidth: 100%"
                        @blur="$v.data.password.$touch()"
                        :error-messages="passwordErrors">
                      </v-text-field>
                    </v-form>
                  </v-col>
                </v-row>
            </v-card-text>

            <v-card-text>
              <v-row justify="center">
                <v-col cols="10">
                  <v-row justify="center">
                    <v-btn tile
                      color="primary"
                      class="white--text"
                      :disabled="$v.$invalid"
                      @click.prevent="redirectToWork">
                      Enter
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog> -->

        <!-- ------------------------------------- -->
    </v-row>
  </div>
</template>
<script>
// import { required } from 'vuelidate/lib/validators'
// import { handleErrorsMixin } from '../formCheckMixin'
import axios from 'axios'

export default {
  // mixins: [handleErrorsMixin],

  data () {
    return {
      submenuLine: {
        position: 'absolute',
        top: '40px',
        height: '0px',
        width: '1px',
        backgroundColor: 'black',
        transition: 'all 1.1s'
      },
      // dialog: false,
      // data: {
      //   password: null
      // },
      selectedEvent: null
    }
  },
  props: {
    menu: Boolean,
    hideMenu: Function,
    toggleMenu: Function,
    submenuLineHeight: String,
    lineTop: String
  },
  // validations: {
  //   data: {
  //     password: {
  //       required
  //     }
  //   }
  // },
  created () {
    if (this.$vuetify.breakpoint.smAndUp) {
      this.submenuLine.top = '40px'
    } else {
      this.submenuLine.top = '30px'
    }
    this.$store.dispatch('fetchHasPassword')
  },
  computed: {
    // passwordErrors () {
    //   return this.handleErrors('password')
    // },
    setFocus () {
      const str = this.$route.path
      return str.substring(1, str.length)
    }

  },
  watch: {
    submenuLineHeight () {
      this.submenuLine.height = this.submenuLineHeight
    },
    lineTop () {
      this.submenuLine.top = this.lineTop
    }
  },
  methods: {
    /* eslint-disable func-call-spacing */
    redirectToWork () {
      const passwordData = {
        type: this.selectedEvent,
        password: this.data.password
      }
      var formData = new FormData()
      for (const key in passwordData) {
        formData.append(key, passwordData[key])
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      axios.post ('/checkPassword', formData, config)
        .then (res => {
          const data = res.data.data
          if (data === 'pass') {
            this.dialog = false
            if (this.$route.path !== ('/' + this.selectedEvent)) {
              this.$router.push('/' + this.selectedEvent)
            }
          } else {
            this.dialog = false
          }
        })
    },
    checkOpenPasswordModal (type) {
      const typeArray = ['textile', 'graphic', 'illustration']
      if (this.$store.getters.hasPassword[typeArray[type]] === 'yes') {
        this.dialog = !this.dialog
        this.selectedEvent = typeArray[type]
      } else {
        if (this.$router.path !== '/' + typeArray[type]) {
          this.$router.push('/' + typeArray[type])
        }
      }
    },
    toWork (type) {
      const typeArray = ['textile', 'graphic', 'illustration']
      this.$router.push('/' + typeArray[type])
    }
  }
}
</script>

<style lang="scss" scoped>
.v-application .text-h6, .v-application .text-subtitle-2 {
  font-family: 'Skia' !important;
}
a {
  text-decoration: none;
  // color: black;

  &:link {
    color: black;
  }
  &:visited {
    color: black;
  }
  &:focus {
    color: rgb(153, 83, 17) !important;
    text-shadow: 0 0 5px #d9d9d9 !important;
  }
}
.focusClass {
  color: rgb(153, 83, 17);
  text-shadow: 0 0 5px #d9d9d9
}
.work {
  &:hover {
    cursor: pointer;
  }
}
.menuStyleWindow {
  top: 42px;
  left: 20px;
}
.menuStyleMobile {
  top: 28px;
  left: 14px;
}
.submenuStyle {
  position: absolute
}
.menu2 {
  top: 35px
}
.menu2Mobile {
  top: 28px
}
.menu3 {
  top: 70px
}
.menu3Mobile {
  top: 56px
}
.move1-enter-active {
  animation: move-in .5s forwards;
}
.move1-leave-active {
  animation: move-in reverse 1.1s forwards;
}
.move2-enter-active {
  animation: move-in .8s forwards;
}
.move2-leave-active {
  animation: move-in reverse .8s forwards;
}
.move3-enter-active {
  animation: move-in 1.1s forwards;
}
.move3-leave-active {
  animation: move-in reverse .5s forwards;
}
@keyframes move-in {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100%{
    opacity: 1;
    transform: translateX(0px);
  }
}

</style>
