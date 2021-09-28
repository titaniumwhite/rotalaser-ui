<template>
   <v-app id="inspire">
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
                              filled
                              rounded
                              dense
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                              filled
                              rounded
                              dense
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
   props: {
      source: String,
   },
};
</script>

