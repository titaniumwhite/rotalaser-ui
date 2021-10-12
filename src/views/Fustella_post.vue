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

              <v-form v-if="!loading && !err && item=='informazioni'">
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      {{total_rotations}}
                      <v-text-field
                        :value="$route.params.id"
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
                        class="my-2"
                        :items="items"
                        label="Cliente"
                        dense
                        filled
                      ></v-overflow-btn>

                      <v-overflow-btn
                        class="my-2"
                        :items="items"
                        label="Fabbrica"
                        dense
                        filled
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

<script>
import axios from 'axios'
  export default {
    name: "ChartPage",
    data() {
      return {
        true: true,
        err: false,
        loading: true,
        got: '',
        date: '',
        initialTime: undefined,
        finalTime: undefined,
        searching: false,
        tab: null,
        datacollection: null,
        cad: undefined,
        session_id: 0,
        total_errors: 0,
        total_rotations: 0,
        customers: null,
        customer_factories: null,
        items: [
          'informazioni', 'grafici', 'cad', 'modifica'
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
                enabled: true,
                autoScaleYaxis: false 
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
 
          if(!this.$session.exists("fustellaR") || (this.$session.get("id") !== this.$route.params.id)){
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
                                let total_errors = 0;
                                let total_rotations = 0;
                                let total_sessions = 0;
                                total_sessions = this.got[this.got.length-2].session_id;


                                for(let i=this.got.length-1000; i<this.got.length-1;i++){

                                  let rotationCouple;
                                  let speedCouple;    
                                  let sessionCouple;                              
                                  let time = Date.parse(this.got[i].id.slice(0,-9))
                                  total_errors += this.got[i].errors
                                  total_rotations += this.got[i].rotations

                                  if(!isNaN(time)){
                                    if (i == this.got.length-500){ 
                                      my_min = time
                                      //console.log("min"+ my_min)
                                    }
                                    else if (i == this.got.length-2){
                                       my_max=time
                                       //console.log("max"+my_max)
                                    }
                                    let timeCouple = "{ "
                                    
                                    //timeCouple += ' "x": "' + timeConverter(Date.parse(this.got[i].id.slice(0,-9))/1000) + '",'
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
                                this.$session.set("min",my_min)
                                this.$session.set("max",my_max)
                                this.$session.set("total_errors",total_errors)
                                this.$session.set("total_sessions",total_sessions)
                                this.$session.set("total_rotations",total_rotations)

                                
                                /*
                                if(this.$vuetify.theme.dark){
                                  this.seriesArea.xaxis.style.colors=["#FFFFFF","#FFFFFF","#FFFFFF"]
                                }
                                */
                                this.chartOptionsLine = {...this.chartOptionsLine, 
                                chart: {
                                  id: 'brushChart',
                                  height: 120,
                                  type: 'area',
                                  brush:{
                                    target: 'rotazioni',
                                    enabled: true,
                                    autoScaleYaxis: false 
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

                                this.seriesLine = [{
                                  name: "RotazioniBrush",
                                  data: rotationData
                                }]

                                this.total_errors = total_errors;
                                this.total_rotations = total_rotations;
                                this.total_sessions = total_sessions;

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

                this.chartOptionsLine = {...this.chartOptionsLine, 
                  chart: {
                    id: 'brushChart',
                    height: 120,
                    type: 'area',
                    brush:{
                      target: 'rotazioni',
                      enabled: true
                    }, 
                    
                    selection:{
                        enabled: true,
                        xaxis: {
                          min: this.$session.get("min"),
                          max: this.$session.get("max")
                        }
                    }
                  }
                }

              this.seriesArea2 = [{
                name: "Velocità",
                data: this.$session.get("fustellaSpe")
              }]

              this.seriesArea3 = [{
                name: "Sessione",
                data: this.$session.get("fustellaSes")
              }]

              this.total_errors = this.$session.get("errors")
              this.total_rotations = this.$session.get("rotations")

              this.loading=false 
          }
/* CHIAMATE API PER MODIFICA */
          axios.get('https://foiadev.diag.uniroma1.it:5002/v1/customers/'+this.$route.params.id,{
              headers:{
                'key':this.$session.get("key")
              }
            }).then(response =>{
            
              this.customers = response.data.name

            }).catch( (error) => {
                console.log(error)
                this.$router.push("/")
            })

          axios.get('https://foiadev.diag.uniroma1.it:5002/v1/customers/'+this.$route.params.id+'/factories',{
              headers:{
                'key':this.$session.get("key")
              }
            }).then(response =>{
            
              this.customer_factories = response.data.location

            }).catch( (error) => {
                console.log(error)
                this.$router.push("/")
            })

    },
    methods: {
      
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