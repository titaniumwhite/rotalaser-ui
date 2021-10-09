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
  
        <v-toolbar-title class="font-weight-bold"></v-toolbar-title>

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
          <v-card v-if="!loading && !err && item=='grafici'">
          <v-card-title>Fustella {{$route.params.id}}</v-card-title>
            <v-row centered>

              <v-col
                lg="2"
                md="2"
                sm="2"
                cols="2"
              > </v-col>
                  
              <v-col 
              lg="8"
              md="8"
              sm="8"
              cols="8"
              >
                  <div>
                      <div id="chart-line">
                        <apexchart width='100%' height="300" type="area" :options="chartOptionsArea" :series="seriesArea"></apexchart>
                      </div>
                     <div id="chart-line">
                        <apexchart width='100%' height="100" type="area" :options="chartOptionsLine" :series="seriesLine"></apexchart>
                      </div>
                  </div>
              </v-col>

              <v-col 
                lg="2"
                md="2"
                sm="2"
                cols="2"
              > </v-col>

            </v-row>

            <v-row>
              <v-col lg="6"
              md="6"
              sm="12"
              cols="12" >


                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsArea3" :series="seriesArea3"></apexchart>
                    </div>
              </v-col>
              <v-col lg="6"
                md="6"
                sm="12"
                cols="12" 
              >
                    <div id="chart-line">
                      <apexchart width='100%' height="300" type="area" :options="chartOptionsArea2" :series="seriesArea2"></apexchart>
                    </div>
                
              </v-col>
            </v-row>

          </v-card>

          <v-card v-if="err">
            <v-layout align-center>
              <h2>Nessun dato recente da mostrare</h2>
            </v-layout>
          </v-card>

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
        true: true,
        err: false,
        loading:true,
        got: '',
        date: '',
        initialTime: undefined,
        finalTime: undefined,
        searching: false,
        tab: null,
        datacollection: null,
        cad: undefined,
        items: [
          'grafici', 'cad', 'analisi predittiva'
        ],
        seriesArea: [{
          name: 'Rotazioni',
        }],
        chartOptionsArea: {
          chart: {
            id: 'rotazioni',
            height: 100,
            type: 'area',
            group: 'sync',
            toolbar: {
              autoSelected: 'pan',
              show: true
            },
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
          stroke: {
            width: 3
          },
          dataLabels: {
              enabled: false
            },
          markers: {
            size: 0
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
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
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            labels: {
              minWidth: 40
            }
          },
        },

        seriesLine: [{
            name: 'RotazioniBrush'
          }],
          chartOptionsLine: {
            chart: {
              id: 'brushChart',
              height: 120,
              type: 'area',
              brush:{
                targets: ['rotazioni', 'velocità', 'sessione'],
                enabled: true
              }, 
            },

            colors: ['#008FFB'],
            fill: {
              type: 'gradient',
              gradient: {
                opacityFrom: 0.91,
                opacityTo: 0.1,
              }
            },
            xaxis: {
              type: 'datetime',
              tooltip: {
                enabled: false
              }
            },
            yaxis: {
              tickAmount: 2,
              labels: {
                minWidth: 40
              }
            } 
          },

        seriesArea2: [{
          name: 'velocità',
        }],
        chartOptionsArea2: {
          chart: {
            id: 'velocità',
            height: 160,
            type: 'area',
            group: 'sync',
            toolbar: {
              autoSelected: 'pan',
              show: true
            },
    
          },
          stroke: {
            curve: 'stepline'
          },
          
          colors: ["#00b359"],
          dataLabels: {
              enabled: false
          },
          markers: {
            size: 0
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 50, 80]
            }
          },
          title: {
            text: "Velocità",
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
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            labels: {
              minWidth: 40
            }
          },
        },

        seriesArea3: [{
          name: 'Sessione',
        }],
        chartOptionsArea3: {
          chart: {
            id: 'sessione',
            height: 160,
            type: 'area',
            group: 'sync',
            toolbar: {
              autoSelected: 'pan',
              show: true
            },
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
          stroke: {
            curve: 'stepline'
          },
          colors: ["#7E36AF"],
          dataLabels: {
              enabled: false
          },
          markers: {
            size: 0
          },
          fill: {
            colors: ["#7E36AF"],
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
          title: {
              text: "Sessione",
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
          xaxis: {
            type: 'datetime'

          },
          yaxis: {
            labels: {
              minWidth: 40
            }
          }
        }, 
        
      };
    },
    mounted(){
          /*function timeConverter(UNIX_timestamp){
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
          }*/
          
          if(/*!this.$session.exists("fustellaR") || (this.$session.get("id") !== this.$route.params.id)*/ this.true){
            console.log(this.$route.params.id)
            axios.get('https://foiadev.diag.uniroma1.it:5002/v1/diecutters/'+this.$route.params.id+'/cycles',{
              headers:{
                'key':this.$session.get("key")
              }
            }).then(response =>{
                                let rotationData = []
                                let speedData = []
                                let sessionData = []
                                this.got = response.data 
                                if(this.got.length<1){
                                  this.loading = false
                                  this.err=true
                                  return
                                }
                                let my_min = 0
                                let my_max = 0
                                for(let i=this.got.length-1000; i<this.got.length-1;i++){

                                  let rotationCouple;
                                  let speedCouple;    
                                  let sessionCouple;                              
                                  let time = Date.parse(this.got[i].id.slice(0,-9))
                                  
                                  if(!isNaN(time)){
                                    if (i == this.got.length-500){ 
                                      my_min = time
                                      console.log("min"+ my_min)
                                    }
                                    else if (i == this.got.length-2){
                                       my_max=time
                                       console.log("max"+my_max)
                                    }
                                    let timeCouple = "{ "
                                    
                                  //  timeCouple += ' "x": "' + timeConverter(Date.parse(this.got[i].id.slice(0,-9))/1000) + '",'
                                    timeCouple += '"x": ' + time + ', '
                                    //console.log( timeConverter(Date.parse(this.got[i].id.slice(0,-9))/1000))
                                  
                                  
                                    rotationCouple = timeCouple + ' "y": '+ this.got[i].rotations + " }"
                                    speedCouple = timeCouple + ' "y": '   + this.got[i].speed + " }"
                                    sessionCouple = timeCouple + ' "y": ' + this.got[i].session_id + " }"
                                    
                                    rotationData.push(JSON.parse(rotationCouple))
                                    speedData.push(JSON.parse(speedCouple))
                                    sessionData.push(JSON.parse(sessionCouple))
                                  }

                                }
                                
                                this.$session.set("fustellaR",rotationData)
                                this.$session.set("fustellaSpe",speedData)
                                this.$session.set("fustellaSes",sessionData)
                                this.$session.set("id",this.$route.params.id)
                                
                                if(this.$vuetify.theme.dark){
                                  this.seriesArea.xaxis.style.colors=["#FFFFFF","#FFFFFF","#FFFFFF"]
                                }

                              
                               

                                this.seriesLine = [{
                                  name: "RotazioniBrush",
                                  data: rotationData
                                }]

                                console.log(this.chartOptionsLine)
                                this.chartOptionsLine = {...this.chartOptionsLine, 
                                chart: {
                                  id: 'brushChart',
                                  height: 120,
                                  type: 'area',
                                  brush:{
                                    targets: ['rotazioni', 'velocità', 'sessione'],
                                    enabled: true
                                  }, 
                                  
                                  selection:{
                                      enabled: true,
                                      xaxis: {
                                        min: my_min,
                                        max: my_max
                                      }
                                  }
                                }
                                }

                                console.log(this.chartOptionsLine)
                                
                                this.seriesArea = [{
                                  name: "Rotazioni",
                                  data: rotationData
                                }]

                                this.seriesArea2 = [{
                                  name: "Velocità",
                                  data: speedData
                                }]

                                this.seriesArea3 = [{
                                  name: "Sessione",
                                  data: sessionData
                                }]
                              
                                this.loading=false                        
                                
                              }
              ).catch( (error) => {
                console.log(error)
                this.$router.push("/")
              })
            
            /* get the effin CAD */
            axios.get('https://foiadev.diag.uniroma1.it:5002/v1/diecutters/'+this.$route.params.id,{
              headers:{
                'key':this.$session.get("key")
              }
            }).then(response =>{
            
                this.cad = response.data.cadimage
                this.$session.set("cad",response.data.cadimage)

            }).catch( (error) => {
                console.log(error)
                this.$router.push("/")
              })
          }else{
              this.cad =this.$session.get("cad")
              
              this.seriesLine = [{
                name: "RotazioniBrush",
                data: this.$session.get("fustellaR")
              }]

              this.seriesArea = [{
                name: "Rotazioni",
                data: this.$session.get("fustellaR")
              }]

              this.seriesArea2 = [{
                name: "Velocità",
                data: this.$session.get("fustellaSpe")
              }]

              this.seriesArea3 = [{
                name: "Sessione",
                data: this.$session.get("fustellaSes")
              }]
            
              this.loading=false 
          }

    },
    methods: {
      // when blur the searchbox, if there is no text, just make the box disappear
      is_text_empty: function (event, value) {
        if (event && value === '') {
          this.searching =! this.searching
        }
      },
    }
  };
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