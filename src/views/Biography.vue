<template>
    <v-row class="fill-height" align="center" justify="center">
      <v-col>
        <v-row class="ml-0 mr-0" justify="center">
          <!-- <v-img
            src=""
            max-height="50vh"
            max-width="80%"
            :aspect-ratio="0.7143"
            :class="{'profileImage': true, 'profileImage_active': !loading}"
            @load="setLoading">
          </v-img> -->
          <v-img
            src="https://dummyimage.com/d6d6d6/ff00ff.jpg&text=PHOTO"
            max-height="50vh"
            max-width="80%"
            :aspect-ratio="19/27"
            contain>
          </v-img>
          <!-- <v-skeleton-loader
            tile
            type="image"
            width="1000px"
            max-width="80%"
            height="1000"
            max-height="50vh"
            v-show="loading"
          /> -->
        </v-row>
        <v-row class="ml-3 mr-3 mt-5" justify="center">
          <v-skeleton-loader type="image"
          />
          <p
            class="font"
            :style="{
              'letter-spacing': $vuetify.breakpoint.smAndUp ? '.2rem' : '0.15rem',
              'font-size': $vuetify.breakpoint.smAndUp ? '1rem' : '0.875rem'}"
            >
            1991年生まれ。多摩美術大学美術学部生産デザイン学科テキスタイルデザイン専攻卒業。<br>アパレル企業にて、グラフィック•テキスタイルデザイナーとして五年間勤務を経て独立。<br>
2019年サンゲツ壁紙デザインアワードにて大賞を受賞。</p>
        </v-row>
      </v-col>
    </v-row>
</template>

<script>
export default {
  data () {
    return {
      loading: true
    }
  },
  methods: {
    setLoading () {
      this.loading = !this.loading
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  line-height: 1.8em;
}
.profileImage {
  opacity: 0;
  position: absolute;

  &_active {
    opacity: 1;
    position: relative;
  }
}
.skeleton {
  position: relative;
  top: 0;
  z-index: 100;
}
</style>
