import axios from 'axios'
  export default {
    name: "ChartPage",
    data() {
      return {
        true: true,
        err: false,
        slider: false,
        loading:true,
        got: false,
        totali: false,
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
        total_sessions: 0,
        my_min:0,
        my_max:0,
        created: false,
        customers: null,
        customer_factories: null,
        items: [
          'informazioni', 'grafici', 'cad', 'modifica'
        ],
        seriesAreaRotation: [{
          name: 'Rotazioni',
        }],
        chartOptionsAreaRotation: {
          chart: {
            id: 'rotazioni',
            height: 100,
            type: 'area',
            /*
            events: {
                click: (event, chartContext, config) => {
                    console.log(config.config.series[config.seriesIndex])
                    console.log(config.config.series[config.seriesIndex].name)
                    console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex])
                    this.got = !this.got
                    console.log(this.got)
                }
            },*/
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
        seriesAreaTotalRotation: [{
          name: 'RotazioniTotali',
        }],
        chartOptionsAreaTotalRotation: {
          chart: {
            id: 'rotazioniTotali',
            height: 100,
            type: 'area',
            /*
            events: {
                click: (event, chartContext, config) => {
                    console.log(config.config.series[config.seriesIndex])
                    console.log(config.config.series[config.seriesIndex].name)
                    console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex])
                    this.got = !this.got
                    console.log(this.got)
                }
            },*/
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


        seriesLineBrush: [{
            name: 'RotazioniBrush'
          }],
          chartOptionsLineBrush: {
            chart: {
              id: 'brushChart',
              height: 120,
              type: 'area',
              brush:{
                targets: ['rotazioni', 'velocità', 'sessione', 'temperatura', 'umidità'],
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

        seriesAreaSpeed: [{
          name: 'Velocità',
        }],
        chartOptionsAreaSpeed: {
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

        seriesAreaSession: [{
          name: 'Sessione',
        }],
        chartOptionsAreaSession: {
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

        seriesAreaHumidity: [{
          name: 'Umidità',
        }],
        chartOptionsAreaHumidity: {
          chart: {
            id: 'umidità',
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
              text: "Umidità",
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

        seriesAreaTemperature: [{
          name: 'Temperatura',
        }],
        chartOptionsAreaTemperature: {
          chart: {
            id: 'temperatura',
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
              text: "Temperatura",
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
            axios.get('http://195.231.3.173:5002/v1/diecutters/'+this.$route.params.id+'/cycles',{
              headers:{
                'key':this.$session.get("key")
              }
            }).then(response =>{
                                let rotationData = []
                                let totalRotationData = []
                                let speedData = []
                                let sessionData = []
                                let temperatureData = []
                                let humidityData = []

                                this.got = response.data 
                                if(this.got.length<1){
                                  this.loading = false
                                  this.err=true
                                  return
                                }
                                let my_min = 0
                                let my_max = 0

                                let total_errors = 0
                                //let prev_errors  = 0;

                                let total_rotations = 0
                                let prev_rotations  = -1
                                
                                
                                let annotation_text = []


                                let last_session = -1
                                let total_session = 0

                                
                                
                                for(let i=0; i<this.got.length-1;i++){

                                  let rotationCouple;
                                  let totalRotationCouple;
                                  let speedCouple;    
                                  let sessionCouple;   
                                  let humidityCouple;
                                  let temperatureCouple;  
                                  
                                  

                                  let time = Date.parse(this.got[i].id.slice(0,-9))

                                

                                  if(!isNaN(time)){

                                    /* Total Count S**T */

                                    /* Errori totali */
                                    if(this.got[i].errors != 0){
                                      total_errors += this.got[i].errors //- prev_errors
                                      //prev_errors = this.got[i].errors
                                    }
                                    
                                    /* Rotazioni totali */
                                    if(this.got[i].rotations < prev_rotations && prev_rotations > 0){
                                      
                                      total_rotations += prev_rotations                                      
                                      
                                    }
                                    
                                    prev_rotations = this.got[i].rotations
                                    
                                    /* Sessioni totali */
                                    if(parseInt(this.got[i].session_id) != last_session){

                                      
                                      total_session+=1
                                      last_session = parseInt(this.got[i].session_id)
                                      
                                      let curr_text =     '{'+
                                                            '"x": '+ time +
                                                            ',"strokeDashArray": 0,"borderColor": "#775DD0",'+
                                                            '"label": {' +
                                                              '"borderColor": "#775DD0", "style":{' +
                                                                '"color": "#fff", "background": "#775DD0"' +
                                                                '},'+
                                                              '"text":"'+ "Sessione " + total_session 
                                                            +'"}'
                                                          +'}'
                                      annotation_text.push(JSON.parse(curr_text))
                                      
                                    }

                                    /* Settaggio window slider, ultimo quarto di dati  */
                                    if (i == ((this.got.length*3)/4)){ 
                                      my_min = time 
                                    }
                                    else if (i == this.got.length-2){
                                      my_max=time
                                    }


                                    /* INSERIMENTO DATI NEI GRAFICI */
                                    /* Prendiamo tutti i dati per le stat ma agghreghiamo la visualizzazione sennò ci perdiamo la vita */

                                    if(i%15 ==0){
                                      
                                      let timeCouple = "{ "
                                    
                                      timeCouple += '"x": ' + time + ', '
                                      
                                      rotationCouple = timeCouple + ' "y": '+ this.got[i].rotations + " }"
                                      totalRotationCouple = timeCouple + ' "y": '+ total_rotations + " }"
                                      speedCouple = timeCouple + ' "y": '   + this.got[i].speed + " }"
                                      sessionCouple = timeCouple + ' "y": ' + this.got[i].session_id + " }"
                                      temperatureCouple = timeCouple + ' "y": ' + this.got[i].temperature + " }"
                                      humidityCouple = timeCouple + ' "y": ' + this.got[i].humidity + " }"

                                      rotationData.push(JSON.parse(rotationCouple))
                                      totalRotationData.push(JSON.parse(totalRotationCouple))
                                      speedData.push(JSON.parse(speedCouple))
                                      sessionData.push(JSON.parse(sessionCouple))
                                      temperatureData.push(JSON.parse(temperatureCouple))
                                      humidityData.push(JSON.parse(humidityCouple))

                                    }                
                                     
  
                                  }
                                }
                                

                                /*  SESSION STORAGE  */
                                this.$session.set("fustellaR",rotationData)
                                this.$session.set("fustellaRT",totalRotationData)
                                this.$session.set("fustellaSpe",speedData)
                                this.$session.set("fustellaSes",sessionData)
                                this.$session.set("temperature",temperatureData)
                                this.$session.set("humidity",humidityData)
                                this.$session.set("id",this.$route.params.id)
                                this.$session.set("text",annotation_text)
                                this.$session.set("min",my_min)
                                this.$session.set("max",my_max)
                                this.$session.set("total_errors",total_errors)
                                this.$session.set("total_sessions",total_session)
                                this.$session.set("total_rotations",total_rotations)

                                

                                /* INSERIMENTO PARAMETRI */
                                this.chartOptionsAreaRotation ={...this.chartOptionsAreaRotation,
                                  annotations: {
                                    xaxis: annotation_text
                                  }
                                }
                                                              
                                this.seriesAreaRotation = [{
                                  name: "Rotazioni",
                                  data: rotationData
                                }]
                                
                                this.seriesAreaTotalRotation = [{
                                  name: "RotazioniTotali",
                                  data: totalRotationData
                                }]


                                this.seriesAreaSpeed = [{
                                  name: "Velocità",
                                  data: speedData
                                }]

                                this.seriesAreaSession = [{
                                  name: "Sessione",
                                  data: sessionData
                                }]

                                this.seriesAreaHumidity = [{
                                  name: "Umidità",
                                  data: humidityData
                                }]

                                this.seriesAreaTemperature = [{
                                  name: "Temperatura",
                                  data: temperatureData
                                }]

                                this.seriesLineBrush = [{
                                  name: "RotazioniBrush",
                                  data: rotationData
                                }]

                                this.total_errors = total_errors;
                                this.total_rotations = total_rotations;
                                this.total_sessions = total_session;
                                this.my_min = my_min
                                this.my_max = my_max

                                this.loading=false                        
                                
                              }
              ).catch( (error) => {
                console.log(error)
                this.$router.push("/")
              })
            
            /* get the effin CAD */
            axios.get('http://195.231.3.173:5002/v1/diecutters/'+this.$route.params.id,{
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

              console.log( this.$session.get("total_errors"))
              this.total_rotations = this.$session.get("total_rotations")
              this.total_errors = this.$session.get("total_errors")
              this.total_sessions = this.$session.get("total_sessions")

              this.seriesLineBrush = [{
                name: "RotazioniBrush",
                data: this.$session.get("fustellaR")
              }]

              this.seriesAreaRotation = [{
                name: "Rotazioni",
                data: this.$session.get("fustellaR")
              }]  

              this.seriesAreaSpeed = [{
                name: "Velocità",
                data: this.$session.get("fustellaSpe")
              }]

              this.seriesAreaSession = [{
                name: "Sessione",
                data: this.$session.get("fustellaSes")
              }]

              this.seriesAreaTotalRotation = [{
                name: "RotazioniTotali",
                data: this.$session.get("fustellaRT")
              }]

              this.seriesAreaHumidity = [{
                name: "Umidità",
                data: this.$session.get("humidity")
              }]
                                
              this.seriesAreaTemperature = [{
                name: "Temperatura",
                data: this.$session.get("temperature")
              }]

              this.chartOptionsAreaRotation ={...this.chartOptionsAreaRotation,
                                  annotations: {
                                    xaxis: this.$session.get("text")
                                  }
                                }

              this.loading=false 
          }
          /* CHIAMATE API PER MODIFICA */
          axios.get('http://195.231.3.173:5002/v1/customers/'+this.$route.params.id,{
              headers:{
                'key':this.$session.get("key")
              }
            }).then(response =>{
            
              this.customers = response.data.name

            }).catch( (error) => {
                console.log(error)
                this.$router.push("/")
            })

          axios.get('http://195.231.3.173:5002/v1/customers/'+this.$route.params.id+'/factories',{
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
      create_slider(){
        if(!this.created){
          console.log("creation")
          this.created = this.true
          this.chartOptionsLineBrush = {...this.chartOptionsLineBrush, 
                                    chart: {
                                      id: 'brushChart',
                                      height: 120,
                                      type: 'area',
                                      brush:{
                                        targets: ['rotazioni','velocità','sessione', 'temperatura', 'umidità'],
                                        enabled: true,
                                        autoScaleYaxis: false 
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
        }
        this.slider = !this.slider
      },
      create_totali(){
        this.slider = false
        this.totali = !this.totali
        
      }
    }
  };
