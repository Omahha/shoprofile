<template>
  <v-app>
      <v-container fluid fill-height class="pt-0 pb-0"
        :class="{
        }">
        <v-row
          :class="{
            'fill-height': true,
            'flex-column': $vuetify.breakpoint.mobile
          }"
          >
          <v-col
            sm="5"
            class="d-flex pb-0 leftCol"
            :class="{
              'align-center': $vuetify.breakpoint.smAndUp,
              'justify-center': $vuetify.breakpoint.smAndUp
            }"
            :style="menuMarginBottom">
              <div class="mr-3 ml-3">
                <v-row>
                  <v-col class="pl-0 pr-0" @click="hideMenu">
                    <router-link
                      to="/"
                      tag="p"
                      :class="{
                        titleWindow: $vuetify.breakpoint.smAndUp,
                        titleMobile: $vuetify.breakpoint.mobile
                      }"
                      class="home mb-0 font">
                        SHO OTANI
                      </router-link>
                  </v-col>
                </v-row>

                <Menu
                  :menu="menu"
                  :hideMenu="hideMenu"
                  :toggleMenu="toggleMenu"
                  :submenuLineHeight="submenuLine.height"
                  :lineTop="lineTop">
                </Menu>
              </div>
          </v-col>
          <v-col mobile="12" sm="7" class="pt-0 pb-0 pr-0 pl-0 rightCol">
            <transition name="fadeIn" mode="out-in">
              <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
import '../src/scss/styles.scss'
import Menu from './components/Menu.vue'
export default {
  name: 'App',

  components: {
    Menu
  },

  data: () => ({
    menu: false,
    submenuLine: {
      height: '0px',
      top: '0px'
    },
    ans: 0
  }),
  computed: {
    maxLength () {
      let length
      if (this.$vuetify.breakpoint.smAndUp) {
        length = 90
      } else {
        length = 70
      }
      return length
    },
    lineTop () {
      let top
      if (this.$vuetify.breakpoint.smAndUp) {
        top = '40'
      } else {
        top = '30px'
      }
      return top
    },
    menuMarginBottom () {
      const mb = '90px'
      // if (this.$route.name === 'Home' && this.$vuetify.breakpoint.mobile) {
      //   mb = '90px'
      // } else {
      //   mb = '0px'
      // }
      return {
        'margin-bottom': mb
      }
    }
  },
  methods: {
    hideMenu () {
      this.submenuLine.height = '0px'
      this.menu = false
    },
    toggleMenu () {
      this.menu = !this.menu
      if (this.menu) {
        this.submenuLine.height = this.maxLength + 'px'
        this.submenuLine.top = this.lineTop + 'px'
      } else {
        this.submenuLine.height = '0px'
        this.submenuLine.top = this.lineTop
      }
    }
  }
}
</script>

<style scoped>
.mobileContainer {
  align-items: start;
}
.leftCol {
  flex-grow:0 ;
  flex-basis:auto;
}
.leftMb {
  margin-bottom: 90px;
}
.rightCol {
  flex-grow:1;
}
.home {
  cursor: pointer;
}
.titleWindow {
  font-size: 5em;
  text-align: center;
}
.titleMobile {
  font-size: 3em;
  text-align: left;
}
.fadeIn-enter-active {
  animation: fade-in .5s;
}
.fadeIn-leave-active {
  animation: fade-in reverse .5s;
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

.fade-enter-active {
  animation: fade .5s;
}
.fade-leave-active {
  animation: fade reverse .5s;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
