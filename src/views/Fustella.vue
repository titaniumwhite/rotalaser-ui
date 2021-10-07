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
        <v-container fluid >
          <div class="text-center">
              <v-progress-circular
              v-if="loading"
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>

          <v-fade-transition>
          <v-row v-if="!loading" >
            
            
            <v-col :cols=12 >
              <div>
              <v-card>
              <v-card-title>Grafico Rotazioni</v-card-title>
              <div>
               <apexchart  type="line" :options="options" :series="series"></apexchart>
              </div>
              </v-card>
              </div>
            </v-col>
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
  export default {
    name: "ChartPage",
    data() {
      return {
        loading:true,
        got: '',
        date: '',
        searching: false,
        tab: null,
        datacollection: null,
        items: [
          'grafici', 'cad', 'analisi predittiva'
        ],
        options: {
          chart: {
            id: 'vuechart-example',
            width: '100%',
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                  enabled: true,
                  delay: 150
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 350
              }
            }
          },
          responsive: [{
            breakpoint: 1000,
            options: {
              dataLabels: {
                enabled: false
              },
            },
          }],
          title: {
              text: "Rotazioni",
              align: 'left',
              margin: 10,
              offsetX: 0,
              offsetY: 0,
              floating: false,
              style: {
                fontSize:  '14px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#263238'
              },
          },
          series: [{
            name: 'rotazioni',
          }],
        },
      };
    },
    mounted(){
          function timeConverter(UNIX_timestamp){
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            return time;
          }

          axios.get('https://foiadev.diag.uniroma1.it:5002/v1/diecutters/'+this.$route.params.id+'/cycles',{
          headers:{
            'key':this.$session.get("key")
          }
        }).then(response =>{
                            let newData = []
                            this.got = response.data 
                            for(let i=0; i<1555;i++){
                              let couple = "{"

                              couple += ' "x": "' + timeConverter(Date.parse(this.got[i].id.slice(0,-9))/1000) + '",'
                              
                              //this.date=couple[0]
                              couple += ' "y": ' + this.got[i].rotations+"\n"

                              couple += "}"
                              newData.push(JSON.parse(couple))
                            }
                            //newData = "]"
                            //this.date=newData
                            this.series = [{
                              data: newData
                            }]
                          
                            this.loading=false                        
                            
                          }
                )

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