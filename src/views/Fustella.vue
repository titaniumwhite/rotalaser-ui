<!-- /* PER GABBO:
    vuetify non supporta i label sull'asse y,
    purtoppo fondamentale per i nostri scopi.
    Ho trovato una libreria sempre per vue che si chiama MDB (https://mdbootstrap.com/docs/vue/advanced/charts/#docsTabsOverview) 
    */
-->
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

        <v-text-field 
            transition="slide-x-reverse-transition"
            solo
            dense 
            hide-details
            rounded
            clearable
            single-line
            background-color="primary darken-3"
            label="Cerca"
            prepend-inner-icon="mdi-magnify"
        > 
        </v-text-field>
  
        <v-spacer></v-spacer>

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
          <v-row>
            <v-col auto v-if="item=='grafici'">
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

            <v-col auto>
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
            
          </v-row>
        
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</div>

</template>

<script>
import { mdbLineChart} from "mdbvue";
  export default {
    name: "ChartPage",
    components: {
      mdbLineChart
    },
    data() {
      return {
        tab: null,
        items: [
          'grafici', 'cad', 'analisi predittiva'
        ],
        lineChartData: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July"
          ],
          datasets: [
            {
              label: "Grafico Rosso",
              backgroundColor: "rgba(255, 99, 132, 0)",
              borderColor: this.$vuetify.theme.themes.light.primary ,
              pointBorderColor: "rgba(255, 255, 255, 0)",
              borderWidth: 0.7,
              data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
              label: "grafico Blu",
              backgroundColor: "rgba(151,187,205,0)",
              borderColor: this.$vuetify.theme.themes.light.secondary,
              pointBorderColor: "rgba(255, 255, 255, 0)",
              borderWidth: 0.8,
              data: [28, 48, 40, 19, 86, 27, 90]
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
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "Sept",
            "Oct"
          ],
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
    }
  };
</script>