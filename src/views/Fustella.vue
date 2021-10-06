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
          <v-fade-transition>
          <v-row v-if="!loading">
            <!--<div>-->
            <v-col :cols=12 >
              <v-card>
              <v-card-title>Grafico</v-card-title>
              <v-layout justify-center>
                  <!--<mdb-line-chart
                    :data="lineChartData"
                    :options="lineChartOptions" 
                    ></mdb-line-chart>-->
                    <template>
                    </template>
              </v-layout>
              </v-card>
            </v-col>
           <!-- </div> -->

           <zingchart id ="myChart" :data="datacollection" ref="chart"></zingchart>

            
          </v-row>
          </v-fade-transition>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</div>

</template>

<script>
import axios from 'axios'
import 'zingchart/es6';
import zingchartVue from 'zingchart-vue';

  export default {
    name: "ChartPage",
    components: {
      zingchart: zingchartVue,
    },
    data() {
      return {
        loading:true,
        got: '',
        searching: false,
        tab: null,
        datacollection: null,
        items: [
          'grafici', 'cad', 'analisi predittiva'
        ],
        chartData: {
          type: 'line',
          series: [{
            values: [4,5,3,3,4,4]
          }]
        },
      };
    },
    mounted(){
          axios.get('https://foiadev.diag.uniroma1.it:5002/v1/diecutters/'+this.$route.params.id+'/cycles',{
          headers:{
            'key':this.$root.key
          }
        }).then(response =>{
                            this.got = response.data 
                            for(let i=0; i<1555;i++){
                              zingchart.exec('myChart', 'addplot', {
                              plotindex: 1,
                              data: this.got[i].rotations
                              });
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
      },

      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
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