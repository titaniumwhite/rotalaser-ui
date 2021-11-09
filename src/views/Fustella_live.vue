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

          <v-tabs
            v-model="tab"
            align-with-title
          >
            <v-tabs-slider color="secondary"></v-tabs-slider>
  
            <v-tab
              class="secondary--text"
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        
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
  

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
        <v-container fluid >
          <div class="text-center">
              <v-progress-circular
              v-if="loading || annotation_loading"
              :size="50"
              color="secondary"
              indeterminate
            ></v-progress-circular>
          </div>
        

       
          <!-- PAGINA GRAFICI -->
          
          <v-card v-if="!loading && !err && item=='grafici'">

          <v-card-title>Fustella {{$route.params.id}} Live</v-card-title>
          <v-card-text><h3>Ultimo aggiornamento: {{last_update}}</h3></v-card-text>
            <v-row centered>

              <v-col
                lg="2"
                md="2"
                sm="1"
                cols="1"
              > </v-col>
                  
              <v-col 
              lg="8"
              md="8"
              sm="12"
              cols="12"
              >   <v-card>
                    <div>
                      <!-- ROTAZIONI PER SESSIONE -->
                      <div id="chart-line1">
                        <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaRotation" :series="seriesAreaRotation"></apexchart>
                      </div>
                    </div>
                  </v-card>
              
              </v-col>

              <v-col 
                lg="2"
                md="2"
                sm="1"
                cols="1"
              > </v-col>

            </v-row>


            <v-card>
            <v-row>
              <v-col lg="4"
              md="4"
              sm="12"
              cols="12" >
                    <!-- UMIDITÀ -->
                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaHumidity" :series="seriesAreaHumidity"></apexchart>
                    </div>
              </v-col>
              <v-col lg="4"
                md="4"
                sm="12"
                cols="12" 
              >
                    <!-- TEMPERATURA -->
                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaTemperature" :series="seriesAreaTemperature"></apexchart>
                    </div>
                
              </v-col>
              <v-col lg="4"
                md="4"
                sm="12"
                cols="12" 
              >
                    <!-- VELOCITÀ -->
                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaSpeed" :series="seriesAreaSpeed"></apexchart>
                    </div>
                
              </v-col>
            </v-row>
            </v-card>

          </v-card>

          <v-card v-if="err">
            <v-card-text>
              <h2>Nessun dato recente da mostrare</h2>
            </v-card-text>
          </v-card>


          </v-container>
        </v-tab-item>
      </v-tabs-items>
  </v-app>
</div>

</template>

<script src="./Fustella_live.js">
</script>

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

