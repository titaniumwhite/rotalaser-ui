import axios from 'axios'
import { SVG } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.draggable.js'
const xml2js = require('xml2js');



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
        localSessionId: -1,
        total_errors: 0,
        total_rotations: 0,
        total_sessions: 0,
        my_min:0,
        my_max:0,
        created: false,
        ses: false,
        ses_loading: false,
        numero_sessione : -1,
        session_id_unique: 0,
        from: 0,
        to: 0,
        session_id_unique_: [],
        from_: [],
        to_: [],
        first_session: 0,
        last_session:0,
        annotation_loading : false,
        overlay: false,
        warningCad: undefined,

        diecutter_name: '',
        diecutter_mac: -1,
        diecutter_factory: '',
        diecutter_customer: '',
        cardboardHeight: '',
        cardboardWidth: '',
        
        dialog_modify: false,
        dialog_delete: false,

        campione: [],
        no_cardboards: false,
        

        t: [],
        h: [],
        s: [],

        switch1: true,
        switch1_text: "colpi al secondo",

        cr_ratio:0,
        n_cardboards: 0,

        cad__: undefined,

        /* data per pagina 'modifica' */
        customers_name: [],
        customers: [],
        chosen_customer: '',
        chosen_factory: '',
        factories_id: [],
        factories_name: [],
        selectCustomer: false,
        chosen_diecuttername: '',
        chosen_cardboardHeight: '',
        chosen_cardboardWidth: '',
        chosen_mac: '',
        render: false,
        valid: true,
        rules: [value => !!value || 'È obbligatorio compilare questo campo'],


        items: [
          'informazioni', 'grafici', 'cad', 'produzione a campione'
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

        singleExpand: true,
        expanded: [],

        cardboards_headers: [
          { text: 'Id cartone', value: 'cardboardId'},
          {
            text: 'Timestamp',
            align: 'start',
            sortable: false,
            value: 'timestamp',
          },
          { text: '', value: 'data-table-expand' },
        ],

        headers: [
          { text: 'Id errore', value: 'errorId'},
          { text: 'Tipo', value: 'kind'},
          { text: 'Id elemento', value: 'elemId' },
        ],

        cardboards: [],
        cardboardErrors: [],
        errorItem: undefined,

        chartOptionsAreaRotation: {
          chart: {
            id: 'rotazioni',
            height: 100,
            type: 'area',
            
            events: {
                click: (event/*, chartContext, config*/) => {
                    
                    //console.log(config.config.series[config.seriesIndex].name)
                    
                    //console.log(event.target.innerHTML)
                    if(!this.ses_loading && !isNaN(parseInt(event.target.innerHTML.split(" ")[2]))) {
                      //console.log("La sessione chiamata è " + event.target.innerHTML)
                      this.grafico_per_sessione(parseInt(event.target.innerHTML.split(" ")[2]))
                    }
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
              click: (event/*, chartContext, config*/) => {
                    
                //console.log(config.config.series[config.seriesIndex].name)
                
                //console.log(event.target.innerHTML)
                if(!this.ses_loading && !isNaN(parseInt(event.target.innerHTML.split(" ")[2])))
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

      // GET INFO
      axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id,{
        headers:{
          'key':this.$session.get("key")
        }
      }).then(response =>{
        this.diecutter_name = response.data.data.cadName
        this.diecutter_mac = response.data.data.id
        this.diecutter_factory = response.data.data.factory.name
        this.diecutter_customer = response.data.data.customer.name
        this.cardboardHeight = response.data.data.cardboardHeight
        this.cardboardWidth = response.data.data.cardboardWidth

        this.chosen_diecuttername = response.data.data.cadName
        this.chosen_factory = response.data.data.factory.name
        this.chosen_mac = response.data.data.id

        
      }).catch( (error) => {
        console.log(error.response.data)
      })

      // TAGLI A CAMPIONE
      axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+'/cardboards',{
          headers:{
            'key':this.$session.get("key")
          },
          params:{
            'offset' : 1,
            'limit' : 10,
            'sortingOrder' : 'DESC',
            'sortingField' : 'timestamp',
            'filter' : 'NoFault'
          }
        }).then(response1 =>{
            if(response1.data.data.length == 0){
              this.no_cardboards = true
            }
            for(let i=0; i < response1.data.data.length; i++){
              axios.get('http://195.231.3.173:8080' + response1.data.data[i].cardboardImage.href,{
                headers:{
                  'key':this.$session.get("key")
                },
              }).then(response =>{
                
                let str = "{ "
                str += '"url": "' + response.data.data + '", '
                str += '"title": "Cartone del ' + this.timeConverter(new Date(response1.data.data[i].timestamp).getTime()) + '", '
                str += '"text": "ID Cartone: '   + response1.data.data[i].id + '" '
                str += " }"

              this.campione.push(JSON.parse(str))
              }).catch( (error) => {
                console.log(error)
              })
  
            }

          }).catch( (error) => {
            console.log(error.response.data)
          })
      // ERRORI TOTALI
      axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+'/warnings',{
        headers:{
          'key':this.$session.get("key")
        }
      }).then(response =>{
        this.total_errors = response.data.data.length
      }).catch( (error) => {
        console.log(error.response.data)
      })
      
      // GRAFICI
      axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+'/sessions/latest',{
        headers:{
          'key':this.$session.get("key")
        }
      }).then(response =>{this.last_session = response.data.data.id})
          if(/*!this.$session.exists("fustellaR") || (this.$session.get("id") !== this.$route.params.id) &&*/ this.true){
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
                                  //this.err=true
                                  return
                                }
                                let my_min = 0
                                let my_max = 0

                                //let total_errors = 0
                                //let prev_errors  = 0;

                                let total_rotations = 0
                                let prev_rotations  = -1
                                
                                
                                let annotation_text = []


                                let last_session = -1
                                let total_session = 0

                                
                                for(let i=0; i<this.got.length-1;i++){

                                  let rotationCouple;
                                  let totalRotationCouple;
                                   

                                  let session_started = false
                                  
                                  
                                  if(this.got[i].session.id !==0 && this.first_session === 0){
                                    this.first_session = this.got[i].session.id
                                  }
                                 
                                  let time = new Date(this.got[i].timestamp)

                       
                                  if(!isNaN(time) && time.getTime() !== 0){
                           
                                                                       
                                    /* Rotazioni totali */
                                    if(this.got[i].rotationCount < prev_rotations && prev_rotations > 0){
                                      
                                      total_rotations += prev_rotations                                      
                                      
                                    }
                                    
                                    prev_rotations = this.got[i].rotationCount
                                    
                                    
                                    /* Sessioni totali */
                                    if(parseInt(this.got[i].session.id) != last_session){
                                      //console.log(this.got[i].session)

                                      session_started = true
                                                                     
                                      total_session += 1
                                      
                                      this.session_id_unique_[this.got[i].session.localSessionId] = this.got[i].session.id
                                      this.from_[this.got[i].session.localSessionId] = this.got[i].session.startedAt
                                      this.to_[this.got[i].session.localSessionId] = this.got[i].session.endedAt
                                      if(this.got[i].session.startedAt == this.got[i].session.endedAt){
                                        //this.to_[this.got[i].session.localSessionId] = new Date(this.got[i].session.endedAt).getTime() +  1 
                                        //console.log(this.got[i].session.localSessionId)
                                      }
                                      
                                      //console.log("f" + this.from_[this.got[i].session.localSessionId] + this.got[i].session.localSessionId)
                                      //console.log("t" +this.to_[this.got[i].session.localSessionId] + this.got[i].session.localSessionId)
                                      
                                      if(this.got[i].session.endedAt !== null && this.got[i].session.startedAt !== null){
                                        let curr_text =     '{'+
                                                            '"x": '+ new Date(this.got[i].session.startedAt).getTime() +
                                                            ',"strokeDashArray": 0,"borderColor": "#ff6090",'+
                                                            '"label": {' +
                                                              '"borderColor": "#ff6090", "style":{' +
                                                                '"color": "#fff", "background": "#ff6090"' +
                                                                '},'+
                                                              '"text":"'+ "Inizio sessione " + this.got[i].session.localSessionId
                                                            +'"}'
                                                          +'}'

                                      
                                        annotation_text.push(JSON.parse(curr_text))
                                      }
                                      if(this.got[i].session.endedAt !== null && this.got[i].session.endedAt !== undefined){
                                        let curr_text =     '{'+
                                          '"x": '+ new Date(this.got[i].session.endedAt).getTime() +
                                          ',"strokeDashArray": 0,"borderColor": "#ff6090",'+
                                          '"label": {' +
                                            '"borderColor": "#ff6090", "style":{' +
                                              '"color": "#fff", "background": "#ff6090"' +
                                              '},'+
                                            '"text":"'+ "Fine sessione " +  this.got[i].session.localSessionId 
                                          +'"}'
                                        +'}'

                
                                        annotation_text.push(JSON.parse(curr_text)) 
                                      }
                                      
                                    }
                                    last_session = parseInt(this.got[i].session.id)

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
                                      
                                      if(session_started && parseInt(this.got[i].session.localSessionId)-1 > 0
                                      && this.from_[parseInt(this.got[i].session.localSessionId)-1] !== null 
                                      && this.from_[parseInt(this.got[i].session.localSessionId)] !== null 
                                      && this.to_[parseInt(this.got[i].session.localSessionId)-1] !== null){
                                        /* workaround brutale */
                                        if( !(this.$route.params.id == "d4:30:15:4a:ab:2d" 
                                            && (this.got[i].session.localSessionId == 2 ||
                                                this.got[i].session.localSessionId == 3 || 
                                                this.got[i].session.localSessionId == 4) ) 
                                            && 
                                            !(this.$route.params.id == "c7:02:8f:47:f2:0d" 
                                              && (this.got[i].session.localSessionId == 1 || 
                                              this.got[i].session.localSessionId == 2))
                                              && 
                                            !(this.$route.params.id == "ee:ea:4b:24:65:33" 
                                              && (
                                                this.got[i].session.localSessionId >= 84 && 
                                                ! (this.got[i].session.localSessionId >= 88 &&
                                                  this.got[i].session.localSessionId <= 94)
                                                )
                                            )
                                                
                                                 && 
                                            !(this.$route.params.id == "da:5b:93:12:58:30" 
                                              && (
                                                this.got[i].session.localSessionId >= 51 && 
                                                  this.got[i].session.localSessionId <= 54
                                                  )
                                                )
                                              ){
                                       
                                              let timeCouple_ = "{ "
                                              timeCouple_ += '"x": ' + new Date(
                                                new Date(this.to_[parseInt(this.got[i].session.localSessionId)-1])
                                                .getTime() + 10*60000).getTime() + ', '
                                              rotationCouple = timeCouple_ + ' "y": '+ 0 + " }"
                                              rotationData.push(JSON.parse(rotationCouple))
                                              
                                            
                                              timeCouple_ = "{ "
                                              timeCouple_ += '"x": ' + new Date(
                                                new Date(this.from_[parseInt(this.got[i].session.localSessionId)])
                                                .getTime() - 1*60000).getTime() + ', '
                                              rotationCouple = timeCouple_ + ' "y": '+ 0 + " }"
                                              rotationData.push(JSON.parse(rotationCouple))
                                              
                                        }
                                      }

                                      rotationCouple = timeCouple + ' "y": '+ this.got[i].rotationCount + " }"
                                      rotationData.push(JSON.parse(rotationCouple))

                                      totalRotationCouple = timeCouple + ' "y": '+ total_rotations + " }"
                                      totalRotationData.push(JSON.parse(totalRotationCouple))

                                    }          
                                   
  
                                  }
                                }

                                
                                
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
                                

                                //this.total_errors = total_errors;
                                this.total_rotations = total_rotations;
                                
                                
                                // CARTONE PER ROTAZIONI
                                axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+'/cardboardstats/aggregation',{
                                  headers:{
                                    'key':this.$session.get("key")
                                  },
                                  
                                }).then(response =>{
                                  this.cr_ratio = response.data.data.sum/this.total_rotations
                                  this.n_cardboards = response.data.data.sum

                                }).catch( (error) => {
                                    console.log(error.response.data)
                                })

                                
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
                'key':this.$session.get("key"),
                'type':'svg'
              }
            }).then(response_svg =>{

              this.cad = response_svg.data.data
              axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+"/diecutterparts",{
              headers:{
                'key':this.$session.get("key"),
                'type':'svg'
                }
              }).then(response =>{
                  const cadParts = response.data.data;

                  // build a object out of cadParts
                  const cadPartsDict = {};
                  for (let cadElem of cadParts) {
                      //const elemId = cadElem.elemId;
                      // append new attribute to the object
                      cadPartsDict.elemId = cadElem;
                  
                  }
                  let svgString = response_svg.data.data;
                  svgString = atob(svgString);
                  // parse svg into a XML element
                  const parser = new DOMParser();
                  const parsedSVG = parser.parseFromString(svgString, 'image/svg+xml');

                  // set svg width 
                  const svgNode = parsedSVG.documentElement
                  //svgNode.setAttribute('width', '50%');

                  // parse the SVG viewbox
                  const alpha = 0.1
                  let viewBox = svgNode.getAttribute("viewBox");
                  let x0, y0, x1, y1;
                  [x0, y0, x1, y1] = viewBox.split(" ");
                  
                  x1 = parseInt(x1);
                  y1 = parseInt(y1);

                  // increase the canvas space by editing the max width (x1) and height (y1)
                  const padding = Math.round(alpha * y1);
                  x1 = x1 + padding;
                  y1 = y1 + padding;
                  
                  // update the viewBox
                  viewBox = `${x0} ${y0} ${x1} ${y1}`
                  svgNode.setAttribute("viewBox", viewBox);

                  // translate the CAD in the bottom right direction to make use of the 
                  // additional canvas space
                  const svgGroupTag = svgNode.getElementById('cad-container');
                  const translation = Math.round(padding/2);
                  svgGroupTag.setAttribute('transform', `translate(${translation}, ${translation})`);
                  
                  // attach svg to DOM
                  //const svgContainer = document.getElementById('cad');
                  //svgContainer.appendChild(svgNode);

                  let gs = svgNode.getElementsByTagName("g");
                  for(let g of gs){
                    if(g.getAttribute("id") != "cad-container"){
                      console.log("G " + g)
                      g.setAttribute("v-on:click","console.log('H')")
                      g.setAttribute("v-on:mouseover","console.log('H')")
                    }
                  }
                  
                  this.cad__ =  new XMLSerializer().serializeToString(svgNode);

                  xml2js.parseString(this.cad__, (err, result) => {
                    if(err) {
                        throw err;
                    }
                
                    // `result` is a JavaScript object
                    // convert it to a JSON string
                    console.log(result.svg['g'][0]['g'][0])
                    const json = JSON.stringify(result, null, 4);
                
                    // log JSON string
                    console.log(json);
                    
                });

                  // wrap the svgNode in a SVG.js object
                  const svgRootNode = SVG(svgNode);

                  // add event listener to each cad part (except holes and special ids e.g. "generale")
                  svgRootNode.findOne(`g#cad-container`).attr('pointer-events', 'all');

                  const ignoreTypes = ["buco", "generale"];

                  /*
                  var gEl_ = this.$el.getElementsByTagName('g')
                  for(let gEl of gEl_ ){
                    console.log("gEL "+ gEl)
                    gEl.addEventListener('click', function() {
                      alert('I got clicked');
                    });
                  }
                  */

                  for (let cadElem of cadParts) {
                      
                      const elemType = cadElem.kind;

                      if (!ignoreTypes.includes(elemType)) {
                          const elemId = cadElem.elemId;
                          const svgElem = svgRootNode.find(`#${elemId}`);

                          //console.log(svgElem)
                          
                          // attach listeners
                          //svgElem.setAttribute("onmouseover", "console.log('H')");
                          //svgElem.setAttribute("@click","handleClick")

                          
                          svgElem.on('mouseover', function(event) {
                              console.log("H")
                              this.attr('stroke-width','3');
                              this.showTooltip(event, elemId);

                          });
                          svgElem.on('mouseout', function() {
                            console.log("Ḧ-")
                              this.attr('stroke-width','1');
                              this.hideTooltip();
                          });
                      }
                    }

              }).catch( (error) => {
                console.log(error)
              })
            }).catch( (error) => {
                console.log(error)
                
            })

             /* CHIAMATE API PER MODIFICA FUSTELLA */
            axios.get('http://195.231.3.173:8080/v1/factories/',{
              headers:{
                'key':this.$session.get("key")
              }
            }).then(response =>{
              for(let i = 0; i < response.data.data.length; i++) {
                this.factories_id[i] = response.data.data[i].id
                this.factories_name[i] = response.data.data[i].name                 
              }

            

            }).catch( (error) => {
                console.log(error)
                this.$router.push("/")
            })

          
          }
    },
    methods: {
      create_slider(){  
        this.slider = !this.slider
      },
      create_totali(){

      this.totali = !this.totali
        
      },
      /*get_factory_of_customer: function() {
        let customer_id = 0;
        this.render = false
        for (let i = 0; i < this.customers.length; i++) {
          let customer = this.customers[i];
          
          if (this.chosen_customer === customer[1]) customer_id = customer[0];
        }

        if (customer_id == 0) {
          console.log("[ERROR] Errore in get_factory_of_customer")
        }
        //console.log("Here we are " + customer_id[0])

        axios.get('http://195.231.3.173:8080/v1/customers/'+customer_id+'/factories',{
          headers:{
            'key':this.$session.get("key")
          }
        }).then(response =>{     
          for (let i = 0; i < response.data.data.length; i++) {
            this.customer_factories_id[i] = response.data.data[i].id
            this.customer_factories_name[i] = response.data.data[i].name
          }
          this.selectCustomer = true
          this.render = true
          }).catch( (error) => {
          console.log(error)
        })
      },*/
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

        this.session_id_unique = this.session_id_unique_[n]
        this.from = this.timeConverter(this.from_[n])
        this.to   = this.timeConverter(this.to_[n])

        // Cardboard sbagliati
        axios.get('http://195.231.3.173:8080/v1/sessions/'+this.session_id_unique+'/cardboards',{
          headers:{
            'key':this.$session.get("key")
          },
          params:{
            startDate : this.from_[n],
            endDate: this.to_[n],
            filter: 'Fault'
          }
        }).then(response =>{

          let c = []     
          for (let i = 0; i < response.data.data.length; i++){
            let rsp = response.data.data
            //console.log(rsp[i])
            
            let cardboardCouple = "{ "
            cardboardCouple += '"cardboardId": "' + rsp[i].id + '", '
            cardboardCouple += '"timestamp": "' + this.timeConverter(rsp[i].timestamp) + '", '
            cardboardCouple += '"cardboardImage": "' + rsp[i].cardboardImage.href + '" '
            cardboardCouple += " }"
            c.push(JSON.parse(cardboardCouple))
          }

          this.cardboards = c

          this.ses =  true
          this.ses_loading = false
          }).catch( (error) => {
            console.log(error)
        })     
        
        axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+'/measurements',{
          headers:{
            'key':this.$session.get("key")
          },
          params:{
            startDate : this.from_[n],
            endDate: this.to_[n]
          }
        }).then(response =>{     
          let t = []
          let h = []
          let s = []
          //console.log(response.data.data)
          for (let i = 0; i < response.data.data.length; i++){
            let rsp = response.data.data

            

            let timeCouple = "{ "                        
            timeCouple += '"x": ' + new Date(rsp[i].timestamp).getTime() + ', '
            let speedCouple = timeCouple + ' "y": '   + rsp[i].rotationSpeed + " }"
            let temperatureCouple = timeCouple + ' "y": ' + rsp[i].temperature + " }"
            let humidityCouple = timeCouple + ' "y": ' + rsp[i].humidity + " }"  
            
            t.push(JSON.parse(temperatureCouple))
            h.push(JSON.parse(humidityCouple))
            s.push(JSON.parse(speedCouple))
            
          }
          this.seriesAreaTemperature = [{
            name: "Temperatura",
            data: t
          }]
  
          this.seriesAreaHumidity = [{
            name: "Umidità",
            data: h
          }]
  
          this.seriesAreaSpeed = [{
            name: "Velocità",
            data: s
          }]
  
          this.ses =  true
          this.ses_loading = false
          }).catch( (error) => {
            console.log(error)
            this.$router.push("/")
        })
        
      },

      getBase64: function() {
        var reader = new FileReader();
        reader.readAsDataURL(this.cadFile);
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      },
      

      modify_diecutter: function() {

        for (let i = 0; i < this.factories_name.length; i++) {
          if (this.factories_name[i] === this.chosen_factory) { 
            this.chosen_factory = parseInt(this.factories_id[i])
            break
          }
        }

        console.log("MAC " + this.chosen_mac)
        console.log("cadName " + this.chosen_diecuttername)
        console.log("FactoryId " + this.chosen_factory)

        axios.put('http://195.231.3.173:8080/v1/diecutters/'+this.diecutter_mac, { 
          id: this.chosen_mac, 
          cadName: this.chosen_diecuttername,
          FactoryId: this.chosen_factory,
          cardboardHeight: parseFloat(this.chosen_cardboardHeight),
          cardboardWidth: parseFloat(this.chosen_cardboardWidth)
        }, {
          headers: {
            'key':this.$session.get("key")
          },
        })
        .then(
          (response) => { 
            this.responseData = response.data
            this.dialog_modify = false
            //this.modify_from_storage(id, this.editing_customer_name, this.editing_customer_vat)
            //console.log(this.editing_customer_name + ' ' + this.editing_customer_vat)
            this.$router.go(-1) 
          }
        )
        .catch( (error) => {
          console.log(error)
        })
      },

      delete_diecutter: function() {
        axios.delete('http://195.231.3.173:8080/v1/diecutters/'+this.diecutter_mac, {
          headers: {
            'key':this.$session.get("key")
          },
        })
        .then(
          response => { 
            this.responseData = response.data,
            this.dialog_delete = false
            this.$router.go(-1) 
          })
        .catch( (error) => {
          console.log(error)
        })
      },

      rowClick(item){
        this.overlay = !this.overlay
        this.warningCad = ''
        axios.get('http://195.231.3.173:8080' + item.cardboardImage,{
          headers:{
            'key':this.$session.get("key")
          },
        }).then(response =>{
          console.log(response)
          this.warningCad = response.data.data
        }).catch( (error) => {
          alert("Non è presente alcuna immagine")
          this.overlay = false
          console.log(error)
        })
      },

      getErrorData(item) {
        // Errori per sessione
        axios.get('http://195.231.3.173:8080/v1/cardboards/'+item.item.cardboardId+'/warnings',{
          headers:{
            'key':this.$session.get("key")
          },
        }).then(response =>{
          let e = []     
          for (let i = 0; i < response.data.data.length; i++){
            let rsp = response.data.data
            
            let errorCouple = "{ "
            errorCouple += '"errorId": "' + rsp[i].id + '", '
            errorCouple += '"kind": "' + rsp[i].diecutterpart.kind + '", '
            errorCouple += '"elemId": "' + rsp[i].diecutterpart.elemId + '" '
            errorCouple += " }"
            e.push(JSON.parse(errorCouple))
            
          }

          this.errorItem = e
          
          this.ses =  true
          this.ses_loading = false
          }).catch( (error) => {
            console.log(error)
        })
      },
      
      switchClick(){
        !this.switch1
        
        if(this.switch1){
          this.switch1_text = "colpi al secondo" 
          let computed = this.seriesAreaSpeed[0].data.map(item =>  JSON.parse('{ "x": '+item.x +', "y": '+ (item.y/3600).toFixed(5)+'}'))
          
          this.seriesAreaSpeed = [{
            name: "Velocità",
            data: computed
          }]
        }else{
          this.switch1_text = "colpi all'ora" 
          let computed = this.seriesAreaSpeed[0].data.map(item => JSON.parse('{ "x": '+item.x.toString() +', "y": '+ (item.y*3600).toFixed(5)+"}"))
         
          this.seriesAreaSpeed = [{
            name: "Velocità",
            data: computed
          }]
        }
      },
      handleStateClick(e){
        console.log(e)
      },
      showTooltip(evt, text) {
        
        let tooltip = document.getElementById("tooltip");
        tooltip.innerHTML = text;
        tooltip.style.display = "block";
        tooltip.style.left = evt.pageX + 10 + 'px';
        tooltip.style.top = evt.pageY + 10 + 'px';
      },
      hideTooltip() {
        var tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
      },
      handleClick(e) {
        console.log(e.target)
        if (e.target.matches('.play-video, .play-video *')) {
          console.log('Got a click on .play-video or a child element')
        }
      }  
    },
  };

  
