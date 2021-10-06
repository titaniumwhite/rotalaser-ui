<template>
   <v-app>
      <v-main >
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-spacer />
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer />
                     </v-toolbar>
                     
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-inner-icon="email"
                              name="email"
                              label="Email"
                              type="email"
                              :rules="emailRules"
                              filled
                              rounded
                              dense
                              required
                             
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-inner-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                              filled
                              rounded
                              dense
                              required
                             
                           ></v-text-field>
                        </v-form>
                     </v-card-text>

                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="secondary" 
                        to="/clienti">Accedi</v-btn>
                     </v-card-actions>

                     <v-fab-transition>
                        <v-btn  
                        color="secondary" 
                        fab 
                        absolute
                        small 
                        dark 
                        bottom 
                        left 
                        class="v-btn--example"
                        @click="$vuetify.theme.dark=!$vuetify.theme.dark">
                           <v-icon>{{ activeFab.icon }}</v-icon>
                        </v-btn>
                     </v-fab-transition>

                  </v-card>
                  
               </v-flex>
              
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import axios from 'axios'


export default {
   name: 'Login',
   data: () => ({
      email: '',
      emailRules: [ 
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email non valida.'
      ],
    }),
   computed: {
      activeFab () {
         if(!this.$vuetify.theme.dark) {
         return { color: 'success', icon: 'mdi-moon-waning-crescent' }      
         }else{
         return{ color: 'success', icon: 'mdi-white-balance-sunny'}
         }
      },
   },
   mounted(){
      const creds = JSON.parse('{"username": "123", "password": "ciao"}')
      axios.post('https://foiadev.diag.uniroma1.it:5002/v1/login/',creds,{}).then(
         response =>{
            let k;
            k = response.data.token
            this.$root.key = k
            this.$session.set("key", k);
      })
   }
};
</script>

