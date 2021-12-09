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

        <v-dialog
          v-model="dialog_modify"
          max-width="600px"
          :retain-focus="false"
        >
          <template #activator="{ on: dialog_modify }">
          <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip_modify }">
            <v-btn
              icon
              color="secondary"
              v-on="{ ...tooltip_modify, ...dialog_modify }"
            >
            <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
            <span>Modifica fustella</span>
          </v-tooltip>
        </template>

          <v-card>
            <v-form v-model="valid">

            <v-card-title class="text-h5">
              <b>Modifica fustella</b>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                
                  <v-col cols="12">
                    <v-text-field
                        v-model="chosen_diecuttername"
                        label="Nome fustella"
                        required
                        outlined
                        :rules="rules"
                        :value="diecutter_name"
                        color="secondary"
                      ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                        v-model="chosen_mac"
                        label="Identificativo MAC"
                        required
                        outlined
                        :rules="rules"
                        :value="diecutter_mac"
                        color="secondary"
                      ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-autocomplete
                        v-model="chosen_factory"
                        :value="chosen_factory"
                        :items="factories_name"
                        label="Fabbrica"
                        required
                        :rules="rules"
                        color="secondary"
                        item-color="secondary"
                      ></v-autocomplete>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      label="Altezza"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      v-model="chosen_cardboardHeight"
                      :value="cardboardHeight"
                      color="secondary"
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      label="Larghezza"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      v-model="chosen_cardboardWidth"
                      :value="cardboardWidth"
                      color="secondary"
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text
                @click="dialog_modify = false"
              >
                Annulla
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                :disabled="!valid"
                @click="modify_diecutter"
              >
                Salva
              </v-btn>
            </v-card-actions>
          </v-form>

          </v-card>

        </v-dialog>

        <v-dialog
          v-model="dialog_delete"
          max-width="600px"
          :retain-focus="false"
        >
          <template #activator="{ on: dialog_delete }">
          <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip_delete }">
            <v-btn
              icon
              color="secondary"
              type="submit"
              v-on="{ ...tooltip_delete, ...dialog_delete }"
            >
            <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
            <span>Elimina fustella</span>
          </v-tooltip>
        </template>


          <v-card>
            <v-card-title class="text-h5">
              <b>Elimina {{diecutter_name}}</b>
            </v-card-title>

            <v-card-text>
              Sei sicuro di voler eliminare {{diecutter_name}}? <br>
              <b> Il processo è irreversibile e comporterà l'eliminazione di tutti i dati associati alla fustella.</b>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text
                @click="dialog_delete = false"
              >
                Annulla
              </v-btn>

              <v-btn
                color="error"
                text
                @click="delete_diecutter"
              >
                Elimina
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>

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
        

          <!-- PAGINA INFORMAZIONI -->
          <v-fade-transition>

              <v-card v-if="!loading && !err && item=='informazioni'">
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
                        color="secondary"
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
                        color="secondary"
                      ></v-text-field>
                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        :value="diecutter_customer"
                        label="Cliente"
                        outlined
                        readonly
                        color="secondary"
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
                        color="secondary"
                      ></v-text-field>
                    </v-col>
            
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        :value="diecutter_factory"
                        label="Fabbrica"
                        outlined
                        readonly
                        color="secondary"
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
                        color="secondary"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        :value="n_cardboards"
                        label="Cartoni totali"
                        outlined
                        readonly
                        color="secondary"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        :value="cr_ratio"
                        label="Cartoni per rotazioni"
                        outlined
                        readonly
                        color="secondary"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>

          </v-fade-transition>
          <v-fade-transition>
          <!-- PAGINA GRAFICI -->
          
          <v-card v-if="!loading && !err && item=='grafici' && !annotation_loading">
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
                      <!-- ROTAZIONI PER SESSIONE -->
                      <div id="chart-line1">
                        <apexchart width='100%' height="300" type="area" :options="chartOptionsAreaRotation" :series="seriesAreaRotation"></apexchart>
                      </div>
                      
                      <!-- ROTAZIONI BRUSH -->
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
                    <!-- ROTAZIONI TOTALI -->
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

            <v-row>
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

                    <v-switch
                      v-model="switch1"
                      color="secondary"
                      :label="`Unità di misura: ${switch1_text}`"
                      @change="switchClick()"
                    ></v-switch>
                
              </v-col>
            </v-row>
            </v-card>

            <v-card v-if="ses && !ses_loading">
            <v-card-title>Errori</v-card-title>          
              <v-data-table
                :headers="errortable_headers"
                :items="errors"
                :items-per-page="5"
                class="row-pointer"
                @click:row="rowClick"
              >
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
          </v-card>

          <v-card v-if="err">
            <v-card-text>
              <h2>Nessun dato recente da mostrare</h2>
            </v-card-text>
          </v-card>

          <!-- PAGINA CAD -->
          <v-col v-if="item =='cad'" 
            lg="6"
            md="12" 
            sm="12" 
            cols="12"
          >
            <v-card >
              <v-card-title>Cad</v-card-title>  
              <simple-svg
                  id="target"
                  v-bind:src="'data:image/svg+xml;base64,'+cad"
                  max-height="1000px"
                  @click="handleStateClick"
                >
              </simple-svg>
            </v-card>
          </v-col>

          <!-- PAGINA TAGLI A CAMPIONE -->
          <v-container v-if="item =='produzione a campione'" 
          >
            <v-row dense v-if="!no_cardboards">
              <v-col 
                v-for="item in campione"
                
                :key="item.message"
                lg="4"
                md="4"
                sm="12"
                cols="12"
              >
                <v-card>
                  <v-img
                    v-bind:src="'data:image/jpeg;base64,'+item.url"
                    height="200px">
                  </v-img>
                  <v-card-title v-text="item.title"></v-card-title>
                
                    <v-card-subtitle v-text="item.text"></v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              Ancora nessun Taglio a Campione da mostrare
            </v-row>
          </v-container>
          </v-fade-transition>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
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

.row-pointer > .v-data-table__wrapper > table > tbody > tr:hover {  
  cursor: pointer;
}

</style>

