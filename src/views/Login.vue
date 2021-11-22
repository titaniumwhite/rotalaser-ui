<template>
   <v-app>
      <v-main >
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar  color="primary">
                        <v-img src="./rotalaser-logo_min.png"
                        max-height="40"
                        max-width="40"></v-img>
                        <v-spacer />
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer />
                     </v-toolbar>
                     
                     <v-card-text>
                        <v-form @submit.prevent="validate()">
                           <v-text-field
                              prepend-inner-icon="email"
                              name="email"
                              label="Email"
                              type="email"
                              v-model="email"
                              :rules="emailRules"
                              filled
                              rounded
                              color="secondary"
                              dense
                              required
                             
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-inner-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="password"
                              filled
                              rounded
                              color="secondary"
                              dense
                              required
                             
                           ></v-text-field>
                           <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="secondary" 
                        type="submit"
                        
                        >Accedi</v-btn>
                     </v-card-actions>
                        </v-form>
                     </v-card-text>

                     

                     <v-fab-transition>
                        <v-btn  
                        color="secondary" 
                        fab 
                        absolute
                        small 
                         
                        bottom 
                        left 
                        class="v-btn--example"
                        @click="$vuetify.theme.dark=!$vuetify.theme.dark">
                           <v-icon>{{ activeFab.icon }}</v-icon>
                        </v-btn>
                     </v-fab-transition>

                  </v-card>

                  <v-snackbar
                     v-model="snackbar"
                     >
                     {{ text }}
               
                     <template v-slot:action="{ attrs }">
                        <v-btn
                           color="pink"
                           text
                           v-bind="attrs"
                           
                           @click="snackbar = false"
                        >
                           Close
                        </v-btn>
                     </template>
                  </v-snackbar>
                  
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
      password: '',
      text: 'Credenziali Errate',
      snackbar: false,
      emailRules: [ 
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email non valida.',
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
      const creds = JSON.parse('{"username": "rotalaser.software@gmail.com", "password": "$2b$10$Vgk0LvHqeznUms/ejMsEauKyPYL.mGnvxjZTdi89BM8sgcH2UjrJm"}')
      axios.post('http://195.231.3.173:8080/v1/login/',creds,{}).then(
         response =>{
            let k;
            k = response.data.data.accessToken
            this.$root.key = k
            this.$session.set("key", k);
      })
   },
   methods: {
      validate(){
         if(this.email == "admin@admin.com" && this.password == "Rotalaser2021!")
            this.$router.push("/clienti")
         else
            this.snackbar = true
      }
   }
};
</script>

