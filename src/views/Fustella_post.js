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
        diecutter_name: '',
        session_id: 0,
        total_errors: 0,
        total_rotations: 0,
        total_sessions: 0,
        my_min:0,
        my_max:0,
        created: false,
        ses: false,
        ses_loading: true,
        numero_sessione : -1,
        from: 0,
        to: 0,
        from_: [],
        to_: [],
        first_session: 0,
        last_session:0,
        annotation_loading : true,
        
        dialog_modify: false,
        dialog_delete: false,

        /* data per pagina 'modifica' */
        customers_name: [],
        customers: [],
        chosen_customer: '',
        chosen_factory: '',
        customer_factories: [],
        selectCustomer: false,
        chosen_diecuttername: '',
        render: false,
        valid: true,
        rules: [value => !!value || 'È obbligatorio compilare questo campo'],


        items: [
          'informazioni', 'grafici', 'cad', 'modifica'
        ],

        seriesAreaRotation: [],
        seriesAreaTotalRotation: [],
        seriesLineBrush: [],
        seriesAreaSpeed: [],
        seriesAreaTemperature: [],
        seriesAreaHumidity: [],

        seriesAreaTemperatureSes: [],
        seriesAreaHumiditySes: [],
        seriesAreaSpeedSes: [],
       
        chartOptionsAreaRotation: {
          chart: {
            id: 'rotazioni',
            height: 100,
            type: 'area',
            
            events: {
                click: (event, chartContext, config) => {
                    
                    console.log(config.config.series[config.seriesIndex].name)
                    
                    console.log(event.target.innerHTML)
                
                    this.grafico_per_sessione(parseInt(event.target.innerHTML.split(" ")[2]))
                }
            },
            //group: 'sync',
            
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
            floating: true,
            style: {
              fontSize:  '14px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  '#263238'
            },
          },
          xaxis: {
            type: 'datetime',
            labels: {
              datetimeUTC: false,
            },
          },

          yaxis: {
            labels: {
              minWidth: 40
            }
          },
          tooltip: {
            x: {
                format: "dd MMM H:mm"
               }
          }
        },
       
        chartOptionsAreaTotalRotation: {
          chart: {
            id: 'rotazioniTotali',
            height: 100,
            type: 'area',
            
            events: {
              click: (event, chartContext, config) => {
                    
                console.log(config.config.series[config.seriesIndex].name)
                
                console.log(event.target.innerHTML)
            
                this.grafico_per_sessione(parseInt(event.target.innerHTML.split(" ")[2]))
              }
            },
            //group: 'sync',
            
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 700,
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
            labels: {
              datetimeUTC: false
            }
          },
          yaxis: {
            labels: {
              minWidth: 40
            }
          },
          tooltip: {
            x: {
                format: "dd MMM H:mm"
               }
          }
        },

        chartOptionsLineBrush: {
          
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
            labels: {
              datetimeUTC: false
            },
            tooltip: {
              shared: false,
              enabled: false
            }
          },
          yaxis: {
            tickAmount: 2,
            labels: {
              minWidth: 40
            }
          },
          tooltip: {
            x: {
                format: "dd MMM hh:mm TT"
               }
          } 
        },
  
        chartOptionsAreaSpeed: {
          chart: {
            id: 'velocità',
            height: 160,
            type: 'area',
            group: 'sync',
    
          },
          stroke: {
            curve: 'stepline'
          },
          
          colors: ["#FFEE58"],
          dataLabels: {
              enabled: false
          },
          markers: {
            size: 0
          },
          fill: {
            colors: ["#FFEE58"],
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 50, 80]
            }
          },
          title: {
            text: "Velocità (rotazioni/secondo)",
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
            labels: {
              datetimeUTC: false
            } 
          },
          yaxis: {
            labels: {
              minWidth: 40
            }
          },
          tooltip: {
            x: {
                format: "dd MMM H:mm"
               }
          }
        },

        chartOptionsAreaHumidity: {
          chart: {
            id: 'umidità',
            height: 160,
            type: 'area',
            group: 'sync',
            
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
          colors: ["#ff9b58"],
          dataLabels: {
              enabled: false
          },
          markers: {
            size: 0
          },
          fill: {
            colors: ["#ff9b58"],
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
          title: {
              text: "Umidità (%)",
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
            labels: {
              datetimeUTC: false
            }

          },
          yaxis: {
            labels: {
              minWidth: 40
            }
          },
          tooltip: {
            x: {
                format: "dd MMM H:mm"
               }
          }
        }, 

        chartOptionsAreaTemperature: {
          chart: {
            id: 'temperatura',
            height: 160,
            type: 'area',
            group: 'sync',
            
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
          colors: ["#bcff58"],
          dataLabels: {
              enabled: false
          },
          markers: {
            size: 0
          },
          fill: {
            colors: ["#bcff58"],
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
          title: {
              text: "Temperatura (°C)",
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
            labels: {
              datetimeUTC: false
            }

          },
          yaxis: {
            labels: {
              minWidth: 40
            }
          },
          tooltip: {
            x: {
                format: "dd MMM H:mm"
               }
          }
        }, 
        
      };
    },
    mounted(){
      axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+'/sessions/latest',{
        headers:{
          'key':this.$session.get("key")
        }
      }).then(response =>{this.last_session = response.data.data.id})
          if(!this.$session.exists("fustellaR") || (this.$session.get("id") !== this.$route.params.id) && this.true){
            axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+'/measurements',{
              headers:{
                'key':this.$session.get("key")
              }
            }).then(response =>{
                                let rotationData = []
                                let totalRotationData = []

                                
                                let speedSesData = []
                                
                                
                                let temperatureSesData = []

                                
                                let humiditySesData = []

                                this.got = response.data.data


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

                                /* Buffer measurement per session */
                                let temp_t_list_ses = []
                                let temp_h_list_ses = []
                                let temp_s_list_ses = []

                                
                                for(let i=0; i<this.got.length-1;i++){

                                  let rotationCouple;
                                  let totalRotationCouple;
                                  let speedCouple;    
                                  
                                  let humidityCouple;
                                  let temperatureCouple; 

                                  let session_started = false
                                  
                                  
                                  if(this.got[i].session.id !==0 && this.first_session === 0){
                                    this.first_session = this.got[i].session.id
                                  }
                                 
                                  let time = new Date(this.got[i].timestamp)

                       
                                  if(!isNaN(time)){
                                    
                                    
                                    //time.setHours(time.getHours() + 2);
                                   
                                    /* Total Count S**T */

                                    /* Errori totali */
                                    /*if(this.got[i].errors != 0){
                                      total_errors += this.got[i].errors //- prev_errors
                                      //prev_errors = this.got[i].errors
                                    }*/
                                    
                                    /* Rotazioni totali */
                                    if(this.got[i].rotationCount < prev_rotations && prev_rotations > 0){
                                      
                                      total_rotations += prev_rotations                                      
                                      
                                    }
                                    
                                    prev_rotations = this.got[i].rotationCount
                                   
                                    
                                    /* Sessioni totali */
                                    if(parseInt(this.got[i].session.id) != last_session){

                                      session_started = true
                                                                     
                                      temperatureSesData.push(temp_t_list_ses)
                                      humiditySesData.push(temp_h_list_ses)
                                      speedSesData.push(temp_s_list_ses)
                                      
                                      temp_t_list_ses = []
                                      temp_h_list_ses = []
                                      temp_s_list_ses = []
                                      
                                      total_session+= 1

                                      last_session = parseInt(this.got[i].session.id)

                                      console.log(this.got[i].session.href)

                                      axios.get('http://195.231.3.173:8080'+ this.got[i].session.href,{
                                        headers:{
                                          'key':this.$session.get("key")
                                        }
                                      }).then(response =>{

                                    
    
                                        let time_start  = new Date(response.data.data.startedAt)
                                        let time_finish = new Date(response.data.data.endedAt)
                                        let session_number = response.data.data.id - this.first_session
                                        
                                        this.from_[session_number] = time_start
                                        this.to_[session_number] = time_finish
                                        

                                        let curr_text =     '{'+
                                                            '"x": '+ time_start.getTime() +
                                                            ',"strokeDashArray": 0,"borderColor": "#ff6090",'+
                                                            '"label": {' +
                                                              '"borderColor": "#ff6090", "style":{' +
                                                                '"color": "#fff", "background": "#ff6090"' +
                                                                '},'+
                                                              '"text":"'+ "Inizio sessione " + session_number
                                                            +'"}'
                                                          +'}'

                                      
                                        annotation_text.push(JSON.parse(curr_text))

                                        curr_text =     '{'+
                                          '"x": '+ time_finish.getTime() +
                                          ',"strokeDashArray": 0,"borderColor": "#ff6090",'+
                                          '"label": {' +
                                            '"borderColor": "#ff6090", "style":{' +
                                              '"color": "#fff", "background": "#ff6090"' +
                                              '},'+
                                            '"text":"'+ "Fine sessione " +  session_number 
                                          +'"}'
                                        +'}'

                
                                        annotation_text.push(JSON.parse(curr_text))

                                        this.$session.set("text",annotation_text)
                                        this.$session.set("from_",this.from_)
                                        this.$session.set("to_",this.to_)

                                        if(response.data.data.id == this.last_session){
                                          this.annotation_loading = false
                                        }

                                      })
                                      
                                      
                                      
                                    }

                                    /* Settaggio window slider, ultimo quarto di dati  */
                                    if (i == Math.floor(((this.got.length*3)/4))){ 
                                      my_min = time.getTime() 
                                    }
                                    else if (i == this.got.length-2){
                                      my_max=time.getTime()
                                    }


                                    /* INSERIMENTO DATI NEI GRAFICI */
                                    /* Prendiamo tutti i dati per le stat ma agghreghiamo la visualizzazione sennò ci perdiamo la vita */

                                    let timeCouple = "{ "
                                    
                                    timeCouple += '"x": ' + time.getTime() + ', '
                                    if(i%15 == 0 || session_started){
                                  
                                      rotationCouple = timeCouple + ' "y": '+ this.got[i].rotationCount + " }"
                                      totalRotationCouple = timeCouple + ' "y": '+ total_rotations + " }"
                                     

                                      rotationData.push(JSON.parse(rotationCouple))
                                      totalRotationData.push(JSON.parse(totalRotationCouple))

                                    }          
                                    speedCouple = timeCouple + ' "y": '   + this.got[i].rotationSpeed + " }"
                                    temperatureCouple = timeCouple + ' "y": ' + this.got[i].temperature + " }"
                                    humidityCouple = timeCouple + ' "y": ' + this.got[i].humidity + " }"      

                                    temp_t_list_ses.push(JSON.parse(temperatureCouple))
                                    temp_h_list_ses.push(JSON.parse(humidityCouple))
                                    temp_s_list_ses.push(JSON.parse(speedCouple))

                                     
  
                                  }
                                }
                                /* SERIE DI IF ELSE DA RIMUOVERE NEL NUOVO BACKEND */

                                if (this.$route.params.id === "da:5b:93:12:58:30") {
                                  this.diecutter_name = "L02241"
                                } else if (this.$route.params.id === "ee:ea:4b:24:65:33") {
                                  this.diecutter_name = "G02012"
                                } else if (this.$route.params.id === "c7:02:8f:47:f2:0d") {
                                  this.diecutter_name = "2877"
                                } else if (this.$route.params.id === "d5:65:e4:a8:89:60") {
                                  this.diecutter_name = "2147B"
                                } else if (this.$route.params.id === "d7:05:4d:e8:6a:f9") {
                                  this.diecutter_name = "2771"
                                } else if (this.$route.params.id === "c2:f3:33:08:5a:2f") {
                                  this.diecutter_name = "B02181"
                                } else if (this.$route.params.id === "da:bc:6e:d4:80:73") {
                                  this.diecutter_name = "L02140"
                                }    
                                

                                /*  SESSION STORAGE  */
                                this.$session.set("fustellaR",rotationData)
                                this.$session.set("fustellaRT",totalRotationData)
                                this.$session.set("speed",speedSesData)
                                this.$session.set("temperature",temperatureSesData)
                                this.$session.set("humidity",humiditySesData)
                                this.$session.set("id",this.$route.params.id)
                                
                                this.$session.set("min",my_min)
                                this.$session.set("max",my_max)
                                this.$session.set("total_errors",total_errors)
                                this.$session.set("total_sessions",total_session)
                                this.$session.set("total_rotations",total_rotations)
                                this.$session.set("diecutter_name",this.diecutter_name)
                                
                                
                                this.seriesAreaTemperatureSes = temperatureSesData
                                this.seriesAreaSpeedSes       = speedSesData
                                this.seriesAreaHumiditySes    = humiditySesData


                                /* INSERIMENTO PARAMETRI */
                                this.chartOptionsAreaRotation ={...this.chartOptionsAreaRotation,...{
                                    annotations: {
                                      xaxis: annotation_text
                                    }
                                  }
                                }

                                this.chartOptionsAreaTotalRotation ={...this.chartOptionsAreaTotalRotation,...{
                                    annotations: {
                                      xaxis: annotation_text
                                    }
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

                                
                                this.seriesLineBrush = [{
                                  name: "RotazioniBrush",
                                  data: rotationData
                                }]


                                this.chartOptionsLineBrush = {...this.chartOptionsLineBrush,...{
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
                              }
                                

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
            axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+"/cadimage",{
              headers:{
                'key':this.$session.get("key")
              }
            }).then(response =>{
            
                this.cad = response.data.data
                this.$session.set("cad",this.cad)

            }).catch( (error) => {
                console.log(error)
                this.$router.push("/")
            })

             /* CHIAMATE API PER MODIFICA FUSTELLA */
            axios.get('http://195.231.3.173:8080/v1/customers/',{
              headers:{
                'key':this.$session.get("key")
              }
            }).then(response =>{
              for(let i = 0; i < response.data.data.length; i++) {
                let token = []
                token[0] = response.data.data[i].vat
                token[1] = response.data.data[i].name
                this.customers_name[i] = response.data.data[i].name 
                this.customers.push(token)
                
              }

              this.$session.set("customers_name",JSON.stringify(this.customers_name))
              this.$session.set("customers",JSON.stringify(this.customers))


            }).catch( (error) => {
                console.log(error)
                this.$router.push("/")
            })

          
          }else{
              this.cad =this.$session.get("cad")

              this.from_ = this.$session.get("from_")
              this.to_ = this.$session.get("to_")
              this.total_rotations = this.$session.get("total_rotations")
              this.total_errors = this.$session.get("total_errors")
              this.total_sessions = this.$session.get("total_sessions")
              this.diecutter_name = this.$session.get("diecutter_name")

              this.customers_name = JSON.parse(this.$session.get("customers_name"))
              this.customers = JSON.parse(this.$session.get("customers"))

              this.seriesAreaHumiditySes = this.$session.get("humidity")
              this.seriesAreaTemperatureSes = this.$session.get("temperature")
              this.seriesAreaSpeedSes = this.$session.get("speed")
              
              this.seriesLineBrush = [{
                name: "RotazioniBrush",
                data: this.$session.get("fustellaR")
              }]

              this.seriesAreaRotation = [{
                name: "Rotazioni",
                data: this.$session.get("fustellaR")
              }]  
 
              this.seriesAreaTotalRotation = [{
                name: "RotazioniTotali",
                data: this.$session.get("fustellaRT")
              }]

              this.chartOptionsAreaRotation ={...this.chartOptionsAreaRotation,
                                  annotations: {
                                    xaxis: this.$session.get("text")
                                  }
                                }
              this.chartOptionsAreaTotalRotation ={...this.chartOptionsAreaTotalRotation,...{
                  annotations: {
                    xaxis: this.$session.get("text")
                  }
                }
              }
              this.chartOptionsLineBrush = {...this.chartOptionsLineBrush,...{
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
                        min: this.$session.get("min"),
                        max: this.$session.get("max")
                      }
                  }
                }
              }
            }
              this.loading=false 
              this.annotation_loading = false
          }
         

    },
    methods: {
      create_slider(){  
        this.slider = !this.slider
      },
      create_totali(){

      this.totali = !this.totali
        
      },
      get_factory_of_customer: function() {
        let customer_id = 0;
        this.render = false
        for (let i = 0; i < this.customers.length; i++) {
          let customer = this.customers[i];
          if (this.chosen_customer === customer[1]) customer_id = customer[0];
        }

        if (customer_id == 0) {
          console.log("[ERROR] Errore in get_factory_of_customer")
          this.$router.push("/")
        }
        //console.log("Here we are " + customer_id[0])

        axios.get('http://195.231.3.173:5002/v1/customers/'+customer_id+'/factories',{
          headers:{
            'key':this.$session.get("key")
          }
        }).then(response =>{     
          for (let i = 0; i < response.data.length; i++) {
            this.customer_factories[i] = response.data[i].id
          }
          this.selectCustomer = true
          this.render = true
          }).catch( (error) => {
          console.log(error)
          this.$router.push("/")
        })
      },
      validate () {
        //this.$refs.form.validate()
        console.log("Inviato")
      },
      timeConverter(UNIX_timestamp){
        var date_ = new Date(UNIX_timestamp);
        
        /* new Date(1634869208146113300/1e6), Fri Oct 22 2021 04:20:08 GMT+0200 (Ora legale dell’Europa centrale) 420 */
        var utc_date =  Date.UTC(date_.getUTCFullYear(), date_.getUTCMonth(), date_.getUTCDate(),
        date_.getUTCHours(), date_.getUTCMinutes(), date_.getUTCSeconds());

        var a = new Date(utc_date);

        //console.log(a)
        // a.setHours(a.getHours() + 2); /* GMT +2 (?)*/
        //console.log(a)
        
        
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
       
        if(parseInt(a.getHours())<10){
          var hour = "0"+ a.getHours();
        }else{
           hour = a.getHours();
        }
        
        if(parseInt(a.getMinutes())<10){
          var min = "0"+ a.getMinutes();
        }else{
           min = a.getMinutes();
        }
        
        if(parseInt(a.getSeconds())<10){
          var sec = "0"+ a.getSeconds();
        }else{
           sec = a.getSeconds();
        }
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      },
      grafico_per_sessione(n){
        this.ses =  false
        this.ses_loading = true


        this.numero_sessione = n

   
        this.from = this.timeConverter(this.from_[n-1])
        this.to   = this.timeConverter(this.to_[n-1])

        this.seriesAreaTemperature = [{
          name: "Temperatura",
          data: this.seriesAreaTemperatureSes[n-1]
        }]

        this.seriesAreaHumidity = [{
          name: "Umidità",
          data: this.seriesAreaHumiditySes[n-1]
        }]

        this.seriesAreaSpeed = [{
          name: "Velocità",
          data: this.seriesAreaSpeedSes[n-1]
        }]

        this.ses =  true
        this.ses_loading = false
      },
      

      submit_factory: function() {
        axios.post('http://195.231.3.173:8080/v1/factories/', { 
          name: this.name, 
          country: this.country,
          state: this.state,
          city: this.city,
          address: this.address
        })
        .then(
          response => this.responseData = response.data,
          this.dialog_submit = false
        )
      },
      modify_factory: function() {
        axios.post('http://195.231.3.173:8080/v1/factories/'+this.$route.params.id, { 
          name: this.name, 
          country: this.country,
          state: this.state,
          city: this.city,
          address: this.address
        })
        .then(
          response => this.responseData = response.data,
          this.dialog_modify = false
        )
      },
      delete_factory: function() {
        axios.delete('http://195.231.3.173:8080/v1/factories/'+this.$route.params.id)
        .then(
          response => this.responseData = response.data,
          this.dialog_delete = false
        )
      }
    },
  };

  
