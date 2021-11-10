import axios from 'axios'

  export default {
    name: "ChartPage",
    data() {
      return {
        last_update: "Adesso",
        true: true,
        err: false,
        slider: false,
        loading:false,
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
        ses: false,
        ses_loading: true,
        numero_sessione : -1,
        from: 0,
        to: 0,
        from_: [],
        to_: [],
        first_session: 0,
        last_session:0,
        annotation_loading : false,

        diecutter_name: '',
        diecutter_id: -1,

        session_: -1,
        
        dialog_modify: false,
        dialog_delete: false,

        t: [],
        h: [],
        s: [],

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
          'grafici'
        ],

        seriesAreaRotation: [],
        
        seriesAreaTemperature: [],
        seriesAreaHumidity: [],
        seriesAreaSpeed: [],
       
        chartOptionsAreaRotation: {
          chart: {
            id: 'rotazioni',
            height: 100,
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

      //console.log(typeof this.$route.params.id)

      axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id,{
        headers:{
          'key':this.$session.get("key")
        }
      }).then(response =>{

        this.diecutter_name = response.data.data.cadName
        this.diecutter_id = response.data.data.id
      }).catch( (error) => {
        console.log(error.response.data)
      })
      
     axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+'/sessions/latest',{
      headers:{
        'key':this.$session.get("key")
      }
    }).then(response =>{
        this.session_ = response.data.data.id

        this.update(this.session_)
        this.wrapper(this.session_)
          
      })    

    },
    methods :{

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
      wrapper(session__){
        setInterval(() => this.update(session__),10000) 
      },
      update(session__){

        this.last_update = this.timeConverter(Date.now())


        axios.get('http://195.231.3.173:8080/v1/sessions/'+session__+'/measurements',{
          headers:{
            'key':this.$session.get("key")
          }
        }).then(response =>{
        let rotationData = []
        let h = []
        let s = []
        let t = []
                          

        this.got = response.data.data

      
        if(this.got.length<1){
          this.loading = false
          this.err=true
          return
        }
                                                                    
        for(let i=0; i<this.got.length-1;i++){

          let rotationCouple;
          
          

          let time = new Date(this.got[i].timestamp)


          if(!isNaN(time)){
          

            /* INSERIMENTO DATI NEI GRAFICI */
            

            let timeCouple = "{ "
            
            timeCouple += '"x": ' + time.getTime() + ', '
                                                  
            rotationCouple = timeCouple + ' "y": '+ this.got[i].rotationCount + " }"
            

            let speedCouple = timeCouple + ' "y": '   + this.got[i].rotationSpeed + " }"
            let temperatureCouple = timeCouple + ' "y": ' + this.got[i].temperature + " }"
            let humidityCouple = timeCouple + ' "y": ' + this.got[i].humidity + " }"  
                
              
            rotationData.push(JSON.parse(rotationCouple))
            t.push(JSON.parse(temperatureCouple))
            h.push(JSON.parse(humidityCouple))
            s.push(JSON.parse(speedCouple))
              

          }
        }

    
                                      
        this.seriesAreaRotation = [{
          name: "Rotazioni",
          data: rotationData
        }]
        
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


        this.loading=false 
        
                              
      
    }).catch( (error) => {
      console.log(error)
      this.$router.push("/")
      })
    }
  },
};

  