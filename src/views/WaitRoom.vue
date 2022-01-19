<template>
  <div id="app">
  <v-app id="inspire">
    <v-card>

      <v-toolbar
        color="primary"
      >

        <v-btn icon 
          @click.stop="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
  
        <v-toolbar-title class="font-weight-bold" ></v-toolbar-title>

        <v-spacer></v-spacer>

         
       

      
    
  
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="$router.push('/')"
                color="secondary"
                >
                <v-icon>mdi-logout-variant</v-icon>
                </v-btn>
            </template>
            <span>Logout</span>
        </v-tooltip>

      </v-toolbar>
        </v-card>
  

      
        <v-container fluid >        

       
        
            <v-card>
                <v-card-title>
                    Attendi che una fustella venga installata...
                </v-card-title>
                <v-card-text>
                   Ultimo aggiornamento: {{last_update}}
                </v-card-text>
            </v-card>
       

          </v-container>    
  </v-app>
</div>

</template>


<style>
/* Fixing selected tab invisible in dark mode */
.v-tabs-slider-wrapper, .v-tab--active {
  color: #fff !important;
}
#synced-charts {
  max-width: 760px;
  min-height: 300px;
  margin: 35px auto;
  opacity: 0.9;
}

.basil {
  background-color: #caa900 !important;
}
.basil--text {
  color: #356859 !important;
}

</style>


<script src="./WaitRoom.js">
</script>