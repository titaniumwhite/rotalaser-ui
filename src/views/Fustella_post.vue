<template>
  <div id="app">
  <v-app id="inspire">
    <v-card>

      <v-toolbar
        color="primary"
        dark
        flat
      >

        <v-btn icon 
          @click.stop="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
  
        <v-toolbar-title class="font-weight-bold"></v-toolbar-title>

        <v-spacer></v-spacer>
        <v-tabs
            v-model="tab"
            align-with-title
          >
            <v-tabs-slider color="secondary"></v-tabs-slider>
  
            <v-tab
              dark
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
                color="white"
                icon
                v-bind="attrs"
                v-on="on"
                @click="$router.push('/')"
                >
                <v-icon>mdi-logout-variant</v-icon>
                </v-btn>
            </template>
            <span>Logout</span>
        </v-tooltip>

      </v-toolbar>
  

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
        <v-container fluid >
          <div class="text-center">
              <v-progress-circular
              v-if="loading"
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>

          <!-- PAGINA INFORMAZIONI -->
          <v-fade-transition>

              <v-card v-if="!loading && !err && item=='informazioni'">
                <v-card-title>{{$route.params.id}}</v-card-title>
                <v-container>
                  <v-row>
                    
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-card
                        
                      >
                        <v-card-title>Sessioni Totali</v-card-title>
                        <v-card-text>{{total_sessions}}</v-card-text>
                      </v-card>

                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      
                      <v-card
                        
                      >
                        <v-card-title>Cliente</v-card-title>
                        <v-card-text>IN ATTESA DI API</v-card-text>
                      </v-card>
                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >
                     

                      <v-card
                        
                      >
                        <v-card-title>Rotazioni Totali</v-card-title>
                        <v-card-text>{{total_rotations}}</v-card-text>
                      </v-card>
                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >

                      <v-card>
                        <v-card-title>Fabbrica</v-card-title>
                        <v-card-text>IN ATTESA DI API</v-card-text>
                      </v-card>

                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      
                      <v-card>
                        <v-card-title>Errori Totali</v-card-title>
                        <v-card-text>{{total_errors}}</v-card-text>
                      </v-card>
                    </v-col>
            
                  </v-row>
                
                </v-container>
              </v-card>

          </v-fade-transition>
          <v-fade-transition>
          <!-- PAGINA GRAFICI -->
          <v-card v-if="!loading && !err && item=='grafici'">
          <v-card-title>Fustella {{$route.params.id}}</v-card-title>
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
                      <div id="chart-line" v-if="!totali">
                        <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaRotation" :series="seriesAreaRotation"></apexchart>
                      </div>
                      <div id="chart-line" v-if="totali">
                        <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaTotalRotation" :series="seriesAreaTotalRotation"></apexchart>
                      </div>
                     <div id="chart-line" v-if="slider">
                        <apexchart width='100%' height="100" type="area" :options="chartOptionsLineBrush" :series="seriesLineBrush"></apexchart>
                      </div>
                  </div>
                  <v-card-actions>
                    <v-btn v-if="!totali"
                    @click="create_slider()">
                      Slider
                    </v-btn>
                     <v-btn
                    @click="create_totali()">
                      Rotazioni Complessive
                    </v-btn>
                  </v-card-actions>
                  </v-card>
              </v-col>

              <v-col 
                lg="2"
                md="2"
                sm="1"
                cols="1"
              > </v-col>

            </v-row>

            <v-row>
              <v-col lg="6"
              md="6"
              sm="12"
              cols="12" >
                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaSession" :series="seriesAreaSession"></apexchart>
                    </div>
              </v-col>
              <v-col lg="6"
                md="6"
                sm="12"
                cols="12" 
              >
                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaSpeed" :series="seriesAreaSpeed"></apexchart>
                    </div>
                
              </v-col>
            </v-row>

            <v-row>
              <v-col lg="6"
              md="6"
              sm="12"
              cols="12" >
                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaHumidity" :series="seriesAreaHumidity"></apexchart>
                    </div>
              </v-col>
              <v-col lg="6"
                md="6"
                sm="12"
                cols="12" 
              >
                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaTemperature" :series="seriesAreaTemperature"></apexchart>
                    </div>
                
              </v-col>
            </v-row>

          </v-card>

          <v-card v-if="err">
            <v-card-text>
              <h2>Nessun dato recente da mostrare</h2>
            </v-card-text>
          </v-card>

          <!-- PAGINA CAD -->
          <v-col v-if="item=='cad'" 
            lg="6"
            md="12" 
            sm="12" 
            cols="12"
          >
          <v-card >
            <v-card-title>Cad</v-card-title>
            
            <v-img
                v-bind:src="'data:image/jpeg;base64,'+cad"
                max-height="1000px"
              >
            </v-img>
          </v-card>
          </v-col>

          <!-- PAGINA MODIFICA -->
              <v-form v-if="!loading && !err && item=='modifica'">
                <v-container>
                  <v-row>
                      <v-col
                      cols="12"
                      sm="12"
                    >
                      <v-text-field
                        :value="$route.params.id"
                        label="Nome fustella"
                        dense
                        outlined
                      ></v-text-field>

                      <v-overflow-btn
                        :items="customers_name"
                        label="Cliente"
                        dense
                        filled
                        editable
                        v-model="chosen_customer"
                        v-on:change="get_factory_of_customer"
                      ></v-overflow-btn>

                      <v-overflow-btn
                        :items="customer_factories"
                        label="Fabbrica"
                        dense
                        filled
                        editable
                        :disabled="!selectCustomer"
                      ></v-overflow-btn>
                      </v-col>
                  </v-row>
                </v-container>
              </v-form>     
          </v-fade-transition>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</div>

</template>

<script src="./Fustella_post.js">
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

</style>