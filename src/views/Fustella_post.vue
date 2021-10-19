<template>
  <div id="app">
  <v-app id="inspire">
    <v-card>

      <v-toolbar
        color="secondary"
      >

        <v-btn icon 
          @click.stop="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
  
        <v-toolbar-title class="font-weight-bold"></v-toolbar-title>

        <v-spacer></v-spacer>

          <v-tabs
            dark
            v-model="tab"
            align-with-title
          >
            <v-tabs-slider color="primary"></v-tabs-slider>
  
            <v-tab
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
              color="secondary"
              indeterminate
            ></v-progress-circular>
          </div>

          <!-- PAGINA INFORMAZIONI -->
          <v-fade-transition>

              <v-form v-if="!loading && !err && item=='informazioni'">
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        :value="diecutter_name"
                        label="Nome fustella"
                        outlined
                        readonly
                      ></v-text-field>
                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        :value="total_sessions"
                        label="Sessioni totali"
                        outlined
                        readonly
                      ></v-text-field>
                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        value="IN ATTESA DI API"
                        label="Cliente"
                        outlined
                        readonly
                      ></v-text-field>
                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        :value="total_rotations"
                        label="Rotazioni totali"
                        outlined
                        readonly
                      ></v-text-field>
                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        value="IN ATTESA DI API"
                        label="Fabbrica"
                        outlined
                        readonly
                      ></v-text-field>
                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        :value="total_errors"
                        label="Errori totali"
                        outlined
                        readonly
                      ></v-text-field>
                    </v-col>
            
                  </v-row>
                </v-container>
              </v-form>

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
              >   <v-card  v-if="!totali">
                    <div>
                      <div id="chart-line1">
                        <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaRotation" :series="seriesAreaRotation"></apexchart>
                      </div>
                      
                    
                      <div id="chart-line2" >
                        <apexchart width='100%' height="100" type="area" :options="chartOptionsLineBrush" :series="seriesLineBrush"></apexchart>
                      </div>
                    </div>
                 
                    <v-card-actions>
                      
                      <v-btn
                        text
                        color="secondary"
                        @click="create_totali()">
                          Rotazioni Complessive
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <v-card v-else >
                    <div id="chart-line3" >
                        <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaTotalRotation" :series="seriesAreaTotalRotation"></apexchart>
                    </div>

                    <v-card-actions>
                    
                      <v-btn
                        text
                        color="secondary"
                        @click="create_totali()">
                          Rotazioni per Sessione
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


            <v-card v-if="ses && !ses_loading">
            <v-card-title>Sessione {{numero_sessione}}</v-card-title>
            <v-card-text><h3>Inizio: {{from}}</h3></v-card-text>
            <v-card-text><h3>Fine: {{to}}</h3></v-card-text>
            <v-row>
              <v-col lg="4"
              md="4"
              sm="12"
              cols="12" >
                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaHumidity" :series="seriesAreaHumidity"></apexchart>
                    </div>
              </v-col>
              <v-col lg="4"
                md="4"
                sm="12"
                cols="12" 
              >
                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaTemperature" :series="seriesAreaTemperature"></apexchart>
                    </div>
                
              </v-col>
              <v-col lg="4"
                md="4"
                sm="12"
                cols="12" 
              >
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
          
              <v-form 
                v-if="!loading && !err && item=='modifica'"
                ref="form"
                v-model="valid"
              >
                <v-container>
                  <v-row>
                      <v-col
                      cols="12"
                      sm="12"
                    >

                      <v-text-field
                        v-model="chosen_diecuttername"
                        label="Nome fustella"
                        required
                        outlined
                        :rules="rules"
                      ></v-text-field>
                    
                      <v-select
                        v-model="chosen_customer"
                        :items="customers_name"
                        label="Cliente"
                        required
                        :rules="rules"
                        v-on:change="get_factory_of_customer"
                      ></v-select>  

                      <v-select
                        v-model="chosen_factory"
                        :items="customer_factories"
                        :key="render"
                        label="Fabbrica"
                        required
                        :rules="rules"
                        :disabled="!selectCustomer"
                      ></v-select>

                    <v-file-input
                      label="CAD"
                      required
                      :rules="rules"
                      prepend-icon="mdi-file-cad"
                    ></v-file-input>
                    
                    <v-btn
                      :disabled="!valid"
                      @click="validate"
                    >
                      submit
                    </v-btn>
                    
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

