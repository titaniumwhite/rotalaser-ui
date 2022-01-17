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
          <v-card-text v-if='live'><h2>Sessione in corso: {{name_}}</h2></v-card-text>
          <v-card-text v-else><h2>Sessione {{name_}} terminata, quando inizierà
            una nuova sessione la pagina verrà aggiornata in automatico</h2></v-card-text>
          <v-card-text><h3>Ultimo aggiornamento: {{last_update}}</h3></v-card-text>
          
            <v-row centered>
              <v-col 
              lg="4"
              md="4"
              sm="12"
              cols="12"
              >   <v-card>
                    <v-card-title><h3>Rotazioni al minuto</h3></v-card-title>
                    <div>
                      <!-- ROTAZIONI PER SESSIONE -->
                      <div id="chart-line1">
                        <apexchart width='100%' height="500" type="radialBar" :options="chartOptionsRadial" :series="seriesRadial"></apexchart>
                      </div>
                    </div>
                  </v-card>
              </v-col>


              <v-col
                lg="8"
                md="8"
                sm="12"
                cols="12"
              >
                <v-row>
                  <v-col 
                  lg="6"
                  md="4"
                  sm="4"
                  cols="4"
                  >   <v-card>
                        <v-card-title>Errori pieghe ultimi 30s</v-card-title>
                        <v-card-text
                          :class = 'class_folds'
                          class="text-h2"
                        ><h1>{{folds_last_30s}}</h1></v-card-text>
                        
                      </v-card>
                  
                  </v-col>

                  <v-col 
                  lg="6"
                  md="4"
                  sm="4"
                  cols="4"
                  >   <v-card>
                        <v-card-title>Errori buchi ultimi 30s</v-card-title>
                        <v-card-text
                          :class = 'class_holes'
                          class="text-h2"
                        ><h1>{{holes_last_30s}}</h1></v-card-text>
                      </v-card>
                  
                  </v-col>

                  <v-col 
                  lg="6"
                  md="4"
                  sm="4"
                  cols="4"
                  >   <v-card>
                        <v-card-title>Errori Totali sessione</v-card-title>
                        <v-card-text
                          :class = 'class_tot'
                          class="text-h2"
                        ><h1>{{total_overall_errors}}</h1></v-card-text>
                      </v-card>
                  
                  </v-col>

                  <v-col 
                  lg="6"
                  md="4"
                  sm="4"
                  cols="4"
                  >   <v-card>
                        <v-card-title>Errori Misurazioni Totali sessione</v-card-title>
                        <v-card-text
                          :class = 'class_tot'
                          class="text-h2"
                        ><h1>{{total_overall_errors}}</h1></v-card-text>
                      </v-card>
                  
                  </v-col>
                
                </v-row>
              </v-col>

            </v-row>

          
         
            <!--
            <v-card>
            <v-card-title>Errori</v-card-title>          
              <v-card-title>Errori</v-card-title>          
              <v-data-table
                :headers="cardboards_headers"
                :items="cardboards"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                :items-per-page="5"
                class="row-pointer elevation1"
                item-key="cardboardId"
                show-expand
                @click:row="rowClick"
                @item-expanded="getErrorData"
              >  
              
                <template v-slot:expanded-item="{ headers }">
                   
                  <td :colspan="headers.length">
                  
                    <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th>Id errore</th>
                                <th>Tipo</th>
                                <th>Id elemento</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in errorItem" :key="item.elemId">
                                <td>{{ item.elemId }}</td>
                                <td>{{ item.kind }}</td>
                                <td>{{ item.errorId }}</td>
                              </tr>
                            </tbody>
                          </template>
                    </v-simple-table>
                  </td>
                 
                </template>
              </v-data-table>


              <v-overlay
                :value="overlay"
                @click.native="overlay = false"
              >
                 <v-card>
                  <v-img
                    v-bind:src="'data:image/jpeg;base64,'+warningCad"
                    max-height="1000px"
                  >
                  </v-img>
                </v-card>
              </v-overlay>
            
            </v-card>
            -->

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

<script src="./Fustella_live_dash.js">
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

