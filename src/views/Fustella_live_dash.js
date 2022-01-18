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

        class_holes:"green--text",
        class_folds:"red--text",
        class_tot:"orange--text",
        class_m_tot:"orange--text",

        holes_last_30s: 10,
        folds_last_30s: 1,
        total_overall_errors: 11,
        total_overall_m_errors: 11,

        curr_rpm_perc: 0,

        live: true,
        name_: '',

        overlay: false,

        diecutter_name: '',
        diecutter_id: -1,

        session_: -1,
        
        dialog_modify: false,
        dialog_delete: false,

        t: [],
        h: [],
        s: [],
        errors: [],
        warningCad: undefined,

        switch1: true,
        switch1_text: "colpi al secondo",

        hour: false,

        startDate_: undefined,
        endDate_:undefined,

        singleExpand: true,
        expanded: [],

        errorItem: [],

        cardboards: [],

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

        

        seriesRadial: [20],

        seriesAreaRotation: [],
        
        seriesAreaTemperature: [],
        seriesAreaHumidity: [],
        seriesAreaSpeed: [],


        chartOptionsRadial: {
          chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
              enabled: true
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "#e7e7e7",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#999',
                  opacity: 1,
                  blur: 2
                }
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  formatter: function(val) {
                    return Math.floor(val/100*10000) + " RPM";
                  },
                  offsetY: -2,
                  fontSize: '22px'
                }
              }
            }
          },
          grid: {
            padding: {
              top: -10
            }
          },
          fill: {
            type: 'solid',
            colors: ["#6abf69"],
          },
          labels: ['Average Results'],
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
      
      this.update()
      this.wrapper()
      

    },
    methods :{

      timeConverter(UNIX_timestamp){
        var date_ = new Date(UNIX_timestamp);
        
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
      wrapper(){
        setInterval(() => this.update(),10000) 
      },
      update(){
       
        axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.$route.params.id+'/sessions/latest',{
          headers:{
            'key':this.$session.get("key")
          }
        }).then(response =>{
          
          this.session_ = response.data.data.id
          this.startDate_ = response.data.data.startDate
          this.endDate_ = Date.now()

          this.last_update = this.timeConverter(Date.now())

        axios.get('http://195.231.3.173:8080/v1/sessions/'+this.session_+'/measurements',{
          headers:{
            'key':this.$session.get("key")
          },
          params:{
            sortingField: "timestamp",
            sortingOrder: "DESC"
          }
        }).then(response =>{
          
               

          this.got = response.data.data
        
          if(this.got.length<1){
            this.loading = false
            this.err=true
          }

          if(this.got[0].session.endedAt != null){
            this.live = false
          }
          
          this.name_ = this.got[0].session.localSessionId

          this.curr_rpm_perc = this.got[0].rotationSpeed*3600 /100

          this.seriesRadial = [this.curr_rpm_perc]
                                                                      
          let date__start = new Date(Date.now())
          let thirtys_ago = Date.now()- 30000
          
          /* get total number */
          axios.get('http://195.231.3.173:8080/v1/sessions/'+this.session_+'/warnings',{
            headers:{
              'key':this.$session.get("key")
            },
          }).then(response =>{

            this.total_overall_errors = response.data.total

            if(response.data.data.length == 0){
              this.total_overall_errors = 0
            }
           
            if(this.total_overall_errors < 100){
              this.class_tot = "green--text"
            }else if(this.total_overall_errors >= 100 && this.total_overall_errors < 200){
              this.class_tot = "orange--text"
            }else{
              this.class_tot = "red--text"
            }

            let e_x = []
            let e_y = []
            for(let i=0;i<response.data.data.length;i++){
              e_x.push = response.data.data[i].x_deform
              e_y.push = response.data.data[i].y_deform
            }
            let sum_x = e_x.reduce((a, b) => a + b)
            let sum_y = e_x.reduce((a, b) => a + b)

            this.total_overall_m_errors = sum_x+sum_y/(e_x.length*2)
            
            if(this.total_overall_m_errors < 10){
              this.class_m_tot = "green--text"
            }else if(this.total_overall_m_errors >= 10 && this.total_overall_m_errors < 20){
              this.class_m_tot = "orange--text"
            }else{
              this.class_m_tot = "red--text"
            }
          })

          /*get updated numbers */
          axios.get('http://195.231.3.173:8080/v1/sessions/'+this.session_+'/warnings',{
            headers:{
              'key':this.$session.get("key")
            },
            params:{
              startDate : new Date(thirtys_ago).toISOString(),
              endDate: date__start.toISOString(),
            }
          }).then(response =>{
            
            this.folds_last_30s = 0
            this.holes_last_30s = 0
            
            for (let i = 0; i < response.data.data.length; i++){
              let rsp = response.data.data
              if(rsp[i].type == "buco"){
                this.holes_last_30s += 1
              }else if(rsp[i].type == "piega"){
                this.folds_last_30s += 1
              }
            }
            if(this.folds_last_30s < 10){
              this.class_folds = "green--text"
            }else if(this.folds_last_30s >= 10 && this.folds_last_30s < 20){
              this.class_folds = "orange--text"
            }else{
              this.class_folds = "red--text"
            }

            if(this.holes_last_30s < 10){
              this.class_holes = "green--text"
            }else if(this.holes_last_30s >= 10 && this.holes_last_30s < 20){
              this.class_holes = "orange--text"
            }else{
              this.class_holes = "red--text"
            }
          this.ses =  true
          this.ses_loading = false
          }).catch( (error) => {
            console.log(error)
        })

        this.loading=false 
                                
      
    }).catch( (error) => {
      console.log(error)
      
      })
    }).catch( (error) => {
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

    switchClick(){
      !this.switch1
      
      if(this.switch1){
        this.hour = false
        this.switch1_text = "colpi al secondo" 
        let computed = this.seriesAreaSpeed[0].data.map(item =>  JSON.parse('{ "x": '+item.x +', "y": '+ (item.y/3600).toFixed(5)+'}'))
        
        this.seriesAreaSpeed = [{
          name: "Velocità",
          data: computed
        }]
      }else{
        this.hour = true
        this.switch1_text = "colpi all'ora" 
        let computed = this.seriesAreaSpeed[0].data.map(item => JSON.parse('{ "x": '+item.x.toString() +', "y": '+ (item.y*3600).toFixed(5)+"}"))
       
        this.seriesAreaSpeed = [{
          name: "Velocità",
          data: computed
        }]
      }
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
  },
  
};

  
