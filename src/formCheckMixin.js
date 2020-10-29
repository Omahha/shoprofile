export const handleErrorsMixin = {
  methods: {
    handleErrors (fieldName, fieldName2, fieldName3) {
      const errors = []
      let $route = this.$v.data[fieldName]
      if (fieldName2) {
        if (fieldName3) {
          $route = this.$v.data[fieldName][fieldName2][fieldName3]
        } else {
          $route = this.$v.data[fieldName][fieldName2]
        }
      }

      if (!$route.$dirty) return errors

      if ('required' in $route) {
        !$route.required && errors.push('This field is required.')
      }

      if ('minLen' in $route) {
        !$route.minLen && errors.push('The input is too short.')
      }

      if ('maxLen' in $route) {
        !$route.maxLen && errors.push('The input is too long.')
      }

      if ('imgSize' in $route) {
        !$route.imgSize && errors.push('The image is too big.')
      }

      if ('email' in $route) {
        !this.$v.data[fieldName].email && errors.push('The input must be an email.')
      }

      if ('same' in $route) {
        !$route.same && errors.push('Confirm password must be the same as Password.')
      }

      return errors
    }
  }
}

export const onFileChangeMixin = {
  data () {
    return {
      previewUrl: null
    }
  },
  methods: {
    onFileChange (e) {
      if (this.data.photo) {
        this.previewUrl = URL.createObjectURL(e)
      }
    },
    onFileChange2 (e) {
      if (this.data.set) {
        this.setPreviewUrl = URL.createObjectURL(e)
      }
    }
  }
}
