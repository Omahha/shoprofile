<template>
<v-row class="mr-0 ml-0 fill-height">
<v-carousel v-model="model" hide-delimiters show-arrows-on-hover height="100%" cycle>
    <v-carousel-item
      v-for="(value, i) in homePhotos"
      :key="i"
    >
      <v-sheet
        color="#fff"
        height="100%"
        tile
        class="d-flex align-center"
      >
        <v-img
          :src="value.path"
          :height="$vuetify.breakpoint.smAndUp ? '100vh': '100%'"
          width="100%">
        </v-img>
        <!-- <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">
            Slide {{ i + 1 }}
          </div>
        </v-row> -->
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</v-row>

</template>

<script>

export default {
  data () {
    return {
      model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange'
      ]
    }
  },
  components: {
  },
  created () {
    this.$store.dispatch('fetchPhotos', {
      type: 'home'
    })
  },
  computed: {
    homePhotos () {
      return this.$store.getters.homePhotos
    }
  }
}
</script>
