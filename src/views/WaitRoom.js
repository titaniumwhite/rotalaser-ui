import axios from 'axios'

  export default {
    name: "ChartPage",
    data() {
      return {
        last_update: "Adesso",
        real_diecutters: [],
        true: true,
        interval: undefined
      };
    },
    mounted(){

      
      this.update()
      this.wrapper()
      

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
      wrapper(){
       this.interval = setInterval(() => this.update(),10000) 
      },
      update(){
        this.last_update = this.timeConverter(Date.now())
        axios.get('http://195.231.3.173:8080/v1/diecutters',{
            headers:{
              'key':this.$session.get("key")
            }
          }).then(response =>{
          
          
            let filtered = []
            
            if(response.data.data.length == undefined){
              this.empty = true
            }

            for(let i = 0;i<response.data.data.length;i++) {
              let str = "{ "
              str += '"id": "'     + response.data.data[i].id + '", '
              str += '"cadName": "'   + response.data.data[i].cadName + '", '
              str += '"FactoryId": "'   + response.data.data[i].factory.id + '", '
              str += '"cad": "'    + response.data.data[i].cadImage.href + '", '
              str += '"status_loading": "false",' 
              str += '"active": "false",' 
              str += '"loading": "true"' 
              str += " }"
            
              filtered.push(JSON.parse(str))   
            }

            this.real_diecutters = filtered
            /* Determine if active */
            for(let i in this.real_diecutters){
              axios.get('http://195.231.3.173:8080/v1/diecutters/'+this.real_diecutters[i].id+'/sessions/latest',{
                headers:{
                  'key':this.$session.get("key")
                }
              }).then(response =>{
                  console.log(response)
                  if((response.data.data.endedAt == null || response.data.data.endedAt == undefined) 
                  && response.data.data.startedAt != undefined){
                    clearInterval(this.interval);
                    this.$router.push("/fustella/live/dash/"+this.real_diecutters[i].id)

                  }

                })
            }
          })    
          
        
      },
  },
  
};

  
