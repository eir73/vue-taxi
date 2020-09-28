<template>
  <div class="login">
   <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <p class="card-heading">Войдите в систему</p>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Введите email</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Email введен некрректно</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >Введите пароль</small>
      </div>
      <span 
        class="helper-text invalid"
        v-if="message"
      >{{ message }}</span>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect blue auth-submit" type="submit">
          Login
        </button>
      </div>
    </div>
  </form>
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    email: '',
    password: '',
    message: ''
  }),
  validations: {
    email: { email, required },
    password: { required }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {
        this.message = 'Неправильный логин или пароль'
        this.email = ''
        this.password = ''
        setTimeout(M.updateTextFields, 0)
        return
      }
    }
  }
}
</script>