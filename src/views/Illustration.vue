<template>

    <Work :picListData="picListData" :setListData="setListData" :combineData="combineData"></Work>

</template>

<script>
import Work from './Work'
export default {
  components: {
    Work
  },
  created () {
    /* eslint-disable func-call-spacing */
    const str = this.$route.path
    const route = str.substring(1, str.length)
    this.$store.dispatch('fetchPhotos', {
      type: route
    })
    this.$store.dispatch('fetchSetPhotos', {
      type: route
    })
  },
  computed: {
    picListData () {
      return this.$store.getters.illustrationPhotos
    },
    setListData () {
      return this.$store.getters.illustrationSetPhotos
    },
    combineData () {
      const mainArray = []
      this.picListData.forEach(value => {
        mainArray.push([value])
      })

      this.setListData.forEach(value => {
        for (let i = 0; i < mainArray.length; i++) {
          if (value.photo_id === mainArray[i][0].id) {
            mainArray[i].push(value)
          }
        }
      })
      return mainArray
    }
  }
}
</script>
