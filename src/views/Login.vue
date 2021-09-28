<template>
   <v-app>
      <v-content >
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="secondary">
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
                        <v-btn color="primary" to="/">Accedi</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
export default {
   name: 'Login',
   data: () => ({
      email: '',
      emailRules: [ 
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email non valida.'
      ],
    })
};
</script>

