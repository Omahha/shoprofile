<template>
  <v-row class="fill-height" align="center" justify="center">
    <v-col>
      <v-card tile elevation="0">
          <v-card-text class="pt-5">
              <v-form>
                  <v-text-field
                      v-model="data.email"
                      type="text"
                      label="Email"
                      @blur="$v.data.email.$touch()"
                      :error-messages="emailErrors"
                  ></v-text-field>
                  <v-text-field
                      v-model="data.password"
                      type="password"
                      label="Password"
                      @blur="$v.data.password.$touch()"
                      :error-messages="passwordErrors"
                  ></v-text-field>
              </v-form>
          </v-card-text>
          <v-card-text>
              <v-row justify="center">
                  <v-col cols="10">
                      <v-row justify="space-around">
                          <!-- <v-btn tile
                              color="red accent-4"
                              class="white--text"
                              @click.prevent="closeLoginModal"
                          >Cancel</v-btn> -->

                          <v-btn tile
                              color="primary"
                              class="white--text"
                              @click.prevent="login"
                              :disabled="$v.$invalid"
                          >Login</v-btn>
                          <!-- <router-link
                            to="/edit"
                            tag="button"
                            class="v-btn white--text v-btn--contained v-btn--tile theme--light v-size--default primary"
                            :class="{'v-btn--disabled': $v.$invalid}"
                            @click.prevent="login"
                            :disabled="$v.$invalid"
                          >
                            Login
                          </router-link> -->
                      </v-row>
                  </v-col>
              </v-row>
          </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { handleErrorsMixin } from '../../formCheckMixin.js'
export default {
  mixins: [handleErrorsMixin],

  data () {
    return {
      data: {
        email: 'test@test.com',
        password: 'password'
      }
    }
  },
  validations: {
    data: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLen: minLength(4),
        maxLen: maxLength(20)
      }
    }
  },
  computed: {
    emailErrors () {
      return this.handleErrors('email')
    },
    passwordErrors () {
      return this.handleErrors('password')
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.data.email,
        password: this.data.password
      })

      this.data.email = null
      this.data.password = null
    }
  }
}
</script>
