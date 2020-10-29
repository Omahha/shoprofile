<template>
  <v-row class="fill-height" align="center" justify="center">
      <v-col>
        <!-- with set photos -->
        <v-row>
          <v-carousel
            v-model="model"
            show-arrows-on-hover
            :height="$vuetify.breakpoint.smAndUp ? '70vh' : '50vh'"
            :show-arrows="arrayLengthmoreThanOne"
            :hide-delimiters="!arrayLengthmoreThanOne"
            >
            <v-carousel-item
              v-for="(value, i) in combineData[arrayId]"
              :key="i"
            >

              <v-sheet
                color="#d9d9d9"
                height="100%"
                tile
              >
                <v-img
                  :src="value.path"
                  :height="picHeight"
                  :class="{'profileImage': true, 'profileImage_active': !loading}"
                  @load="setLoading"
                  @click="toggleDialog(value.path)">
                </v-img>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-row>
        <!-- --------------------------------- -->

        <!-- modal -->
        <v-dialog
          v-model="dialog"
          max-width="90%">
          <v-img
            :src="modalImagePath"
            max-height="100%"
            max-width="100%"
            height="auto"
            width="auto"
            :class="{'profileImage': true, 'profileImage_active': !loading}"
            @load="setLoading"
            @click="dialog=false">
          </v-img>
        </v-dialog>
        <!-- ------------------------ -->

        <v-row class="ml-0 mr-0 mt-5" justify="start" :style="{paddingLeft: picWidth.listPadding}">
          <v-slide-group show-arrows mandatory center-active style="width:90%;">
            <v-slide-item v-for="(i, index) in combineData" :key="index" v-slot:default="{ active, toggle }">
              <v-card class="ma-4 d-flex align-center" height="50px" width="50px" :elevation="active ? 10 : 0" @click="toggle">
                <v-img :src="i[0].path" @click="resetMainIdAndArrayId(index)"></v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-row>
      </v-col>
    </v-row>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      hasSet: true,
      model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange'
      ],
      setPhotos: [
        { id: 1, src: 'https://dummyimage.com/d6d6d6/ff00ff.jpg&text=PHOTO' },
        { id: 2, src: 'https://dummyimage.com/d6d6d6/00ffff.jpg&text=PHOTO' }
      ],
      mainPicWidth: 80,
      mainId: null,
      arrayId: null,
      picList: [
        { id: 1, src: 'https://dummyimage.com/d6d6d6/ff00ff.jpg&text=PHOTO' },
        { id: 2, src: 'https://dummyimage.com/d6d6d6/00ffff.jpg&text=PHOTO' },
        { id: 3, src: 'https://dummyimage.com/d6d6d6/000066.jpg&text=PHOTO' },
        { id: 4, src: 'https://dummyimage.com/d6d6d6/f000ff.jpg&text=PHOTO' },
        { id: 5, src: 'https://dummyimage.com/d6d6d6/0f00ff.jpg&text=PHOTO' },
        { id: 6, src: 'https://dummyimage.com/d6d6d6/00f0ff.jpg&text=PHOTO' },
        { id: 7, src: 'https://dummyimage.com/d6d6d6/000fff.jpg&text=PHOTO' },
        { id: 8, src: 'https://dummyimage.com/d6d6d6/f0000f.jpg&text=PHOTO' },
        { id: 9, src: 'https://dummyimage.com/d6d6d6/0f000f.jpg&text=PHOTO' },
        { id: 10, src: 'https://dummyimage.com/d6d6d6/00f00f.jpg&text=PHOTO' },
        { id: 11, src: 'https://dummyimage.com/d6d6d6/000f0f.jpg&text=PHOTO' },
        { id: 12, src: 'https://dummyimage.com/d6d6d6/0ff00f.jpg&text=PHOTO' }
      ],
      dialog: false,
      modalImagePath: null
    }
  },
  props: {
    picListData: Array,
    setListData: Array,
    combineData: Array
  },
  computed: {
    picWidth () {
      return {
        main: this.mainPicWidth + '%',
        listPadding: ((100 - this.mainPicWidth) / 2) + '%'
      }
    },
    picHeight () {
      let height
      if (this.$vuetify.breakpoint.xs) {
        height = '50vh'
      } else {
        height = '70vh'
      }
      return height
    },
    mainSrc () {
      let path = null
      if (this.combineData && this.combineData[this.arrayId] && this.combineData[this.arrayId][this.mainId]) {
        path = this.combineData[this.arrayId][this.mainId].path
      }

      return path
    },
    arrayLengthmoreThanOne () {
      let flag = false
      if (this.combineData && this.combineData[this.arrayId]) {
        if (this.combineData[this.arrayId].length > 1) {
          flag = true
        }
      }
      return flag
    }
  },
  watch: {
    picListData () {
      this.mainId = this.picListData[0].id
    },
    combineData () {
      // console.log(this.combineData)
    }
  },
  beforeUpdate () {
    if (this.arrayId === null) {
      this.arrayId = 0
      this.mainId = 0
    }
  },
  methods: {
    setLoading () {
      this.loading = false
    },
    resetMainIdAndArrayId (arrayId) {
      this.mainId = 0
      this.arrayId = arrayId
    },
    toggleDialog (path) {
      this.dialog = true
      this.modalImagePath = null
      this.modalImagePath = path
    }
  }
}
</script>

<style lang="scss" scoped>
.picListItem {
  &:hover{
    cursor: pointer;
  }
}
.profileImage {
  opacity: 0;
  position: absolute;
  transition: all 1s;

  &_active {
    opacity: 1;
    position: relative;
  }
}
</style>
