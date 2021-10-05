<template>
  <div id="app">
  <v-app id="inspire">
    <v-card>
       <v-system-bar 
          color="primary darken-3"
          height="30"
          window
          dark
      >
      </v-system-bar>

      <v-toolbar
        color="primary"
        dark
        flat
      >

        <v-btn icon 
          @click.stop="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
  
        <v-toolbar-title class="font-weight-bold">Fustella {{$route.params.id}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-scroll-x-reverse-transition>
          <v-text-field
            v-show="searching" 
            clearable
            transition="slide-x-reverse-transition"
            solo
            dense 
            hide-details
            rounded
            single-line
            autofocus
            background-color="primary darken-3"
            label="Cerca"
            prepend-inner-icon="mdi-magnify"
            @blur="is_text_empty($event, $event.target.value)"
          > 
          </v-text-field>
        </v-scroll-x-reverse-transition>
        
        <v-spacer></v-spacer>
        
        <v-btn icon 
          @click="searching=!searching"
          v-show="!searching">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-filter</v-icon>
        </v-btn>

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
  
        <template v-slot:extension>
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
        </template>
      </v-toolbar>
  

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
        <v-container fluid>
          <h1>{{got[0]}}</h1>
          <div class="text-center">
          <v-progress-circular
          v-if="loading"
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
          </div>
          <v-row v-if="!loading">
            <div>
            <v-col auto >
              <v-card>
              <v-card-title>Grafico</v-card-title>
              <v-layout justify-center>
                  <mdb-line-chart
                    :data="lineChartData"
                    :options="lineChartOptions"   
                    ></mdb-line-chart>
              </v-layout>
              </v-card>
            </v-col>
            </div>

            <div>
            <v-col auto v-if="item==!'grafici'">
              <v-card>
              <v-card-title>Grafico Brutto</v-card-title>
              <v-layout justify-center>
              <mdb-line-chart
                  :data="lineChartData1"
                  :options="lineChartOptions1"
                ></mdb-line-chart> 
              </v-layout>
              </v-card>     
            </v-col>
            </div>
            
          </v-row>
        
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</div>

</template>

<script>
import axios from 'axios'
import { mdbLineChart} from "mdbvue";
  export default {
    name: "ChartPage",
    components: {
      mdbLineChart
    },
    data() {
      return {
        loading:true,
        got: '',
        searching: false,
        tab: null,
        items: [
          'grafici', 'cad', 'analisi predittiva'
        ],
        lineChartData: {
          labels: [],
          datasets: [
            {
              label: "Grafico Rosso",
              backgroundColor: "rgba(255, 99, 132, 0)",
              borderColor: this.$vuetify.theme.themes.light.primary ,
              pointBorderColor: "rgba(255, 255, 255, 0)",
              borderWidth: 0.7,
              data: []
            }
          ]
        },
        lineChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ]
          }
        },
        lineChartData1: {
          labels: [],
          datasets: [
            {
              label: "Linea Rossa",
              backgroundColor: "rgba(255, 99, 132, 0)",
              borderColor: this.$vuetify.theme.themes.light.secondary,
              borderWidth: 0.7,
              data: [199, 69, 420, 81, 56, 55, 40,50,99]
            },
          ]
        },
        lineChartOptions1: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ]
          }
        }
      };
    },
    mounted(){
      axios.get('https://foiadev.diag.uniroma1.it:5002/v1/diecutters/'+this.$route.params.id+'/cycles',{
          headers:{
            'key':this.$root.key
          }
        }).then(response =>{
                            this.got = response.data 
                            for(let i=0; i<15;i++){
                              this.lineChartData.labels.push(this.got[i].id);
                              this.lineChartData.datasets[0].data.push(this.got[i].rotations);
                            }
                            this.loading=false
                          })

    },
    methods: {
      // when blur the searchbox, if there is no text, just make the box disappear
      is_text_empty: function (event, value) {
        if (event && value === '') {
          this.searching =! this.searching
        }
      }
    }
  };
</script>

<style>
/* Fixing selected tab invisible in dark mode */
.v-tabs-slider-wrapper, .v-tab--active {
  color: #fff !important;
}
</style>