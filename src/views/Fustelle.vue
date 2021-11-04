<template>
   <v-app>
     <v-main>

      <v-toolbar
        color="primary"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        
        <v-toolbar-title></v-toolbar-title>

        <v-img
          src="../rotalaser-logo.png"
          max-height="50"
          max-width="100">
        </v-img>
  
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
            color="secondary"
            label="Cerca"
            prepend-inner-icon="mdi-magnify"
            @blur="is_text_empty($event, $event.target.value)"

          > 
          </v-text-field>
        </v-scroll-x-reverse-transition>

        <v-spacer></v-spacer>

        <v-btn icon 
          @click="searching=!searching"
          v-show="!searching"
          color="secondary"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon
          color="secondary"
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-dialog
          v-model="dialog_submit"
          max-width="600px"
          :retain-focus="false"
        >
          <template #activator="{ on: dialog_submit }">
          <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip_add }">
            <v-btn
              icon
              color="secondary"
              v-on="{ ...tooltip_add, ...dialog_submit }"
            >
            <v-icon>mdi-database-plus</v-icon>
            </v-btn>
          </template>
            <span>Aggiungi fustella</span>
          </v-tooltip>
        </template>

          
          <v-card>
            <v-form 
              v-model="valid" 
              ref="submit_form"
              @submit.prevent="getBase64"
            >

            <v-card-title class="text-h5">
              <b>Aggiungi fustella</b>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                
                  <v-col cols="12">
                    <v-text-field
                      label="Identificativo MAC"
                      v-model="id"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="Nominativo fustella"
                      v-model="cadName"
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      required
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      label="Fabbrica"
                      v-model="FactoryName"
                      :items="factories_name"
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      required
                      color="secondary"
                      item-color="secondary"                     
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-file-input
                      label="CAD"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      v-model="cadFile"
                      ref="cadFile"
                      prepend-icon="mdi-file-cad"
                      color="secondary"
                    ></v-file-input>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text
                @click="dialog_submit = false"
              >
                Annulla
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                type="submit"
                :disabled="!valid"
              >
                Conferma
              </v-btn>
            </v-card-actions>
          </v-form>

          </v-card>

        </v-dialog>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click="$router.push('/')"
              color="secondary"
            >
              <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
          </template>
          <span>Logout</span>
        </v-tooltip>
      </v-toolbar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-layout column fill-height>        
          <v-list
            dense
            two-line
          >
            <v-list-item-group
              v-model="group"
              active-class="secondary--text text--accent-4"
            >
              <v-list-item to="/clienti">
                <v-list-item-icon>
                  <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Clienti</v-list-item-title>
              </v-list-item>

              <v-list-item to="/fabbriche">
                <v-list-item-icon>
                  <v-icon>mdi-factory</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Fabbriche</v-list-item-title>
              </v-list-item>

              <v-list-item to="/inserisci">
                <v-list-item-icon>
                  <v-icon>mdi-plus-thick</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Inserisci</v-list-item-title>
              </v-list-item>

            </v-list-item-group>
          </v-list>

          
          <div class="pa-3">
          <v-switch
            color="secondary"
            
            v-model="$vuetify.theme.dark"
            label="Tema Scuro"
          >
          </v-switch>
          </div>
         
          
        </v-layout> 
      </v-navigation-drawer>
      
      <v-container  fluid>
        <div class="text-center">
        <v-progress-circular
        v-if="loading"
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
        </div>
        <v-fade-transition>
        <v-card v-if="!loading">
        <v-card-title>Fustelle di {{$route.params.id}}</v-card-title>
        <v-row dense >
          <v-col 
            v-for="item in real_diecutters"
            
            :key="item.message"
            lg="4"
            md="4"
            sm="12"
            cols="12"
          >
            <v-card>
              <div class="d-flex flex-no-wrap justify-space-between">
              <div>
              
              <v-card-title v-text="item.cadName"></v-card-title>
              <v-card-subtitle v-text="item.id"></v-card-subtitle>
              <div>
                <v-row>
                <v-chip
                  class="ma-6"
                  color="red"
                  text-color="white"
                  @click="alarm"
                  >
                  Fustella non attiva
                </v-chip>
                </v-row>
                </div>

              <v-card-actions>
                <v-container>
                <v-row dense>
                  <v-col
                    lg="6"
                    md="6"
                    sm="12"
                    cols="12"
                  >

                <v-btn
                  text
                  color="secondary"
                  @click="$router.push('/fustella/postanalisi/'+item.id)">
                  Storico
                </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col
                    lg="6"
                    md="6"
                    sm="12"
                    cols="12"
                  >
                <v-btn
                  text
                  color="secondary"
                  @click="$router.push('/fustella/live/'+item.id)">
                  Live
                </v-btn>
                  </v-col>
                </v-row>
                </v-container>
                
              </v-card-actions>
              </div>

              <v-avatar
                size="180"
                tile
              >
              <v-img 
                v-if="!item.loading"
                v-bind:src="'data:image/jpeg;base64,'+item.cad"
              ></v-img>
              </v-avatar>
              </div>
              
            </v-card>
          </v-col>
        </v-row>
        </v-card>
        </v-fade-transition>
      </v-container>
    </v-main>  
  </v-app>
</template>




<script>
import axios from 'axios'
export default {
   data: () => ({
      searching: false,
      drawer: false,
      dialog: false,
      group: null,
      loading: true,
      valid: false,
      true: true,

      dialog_submit: false,
      real_diecutters: [],
      // Variabili per modifica fustella//
      factories_id: [],
      factories_name: [],
      id: '', 
      cadName: '',
      FactoryId: -1,
      FactoryName: '',
      cadFile: [],
      cadFileBase64: ''
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
    mounted(){
        if(this.true/*!this.$session.exists("fustelle") && 
        (!this.$session.exists("pid") || this.$route.params.id == this.$session.get("pid"))*/){
          axios.get('http://195.231.3.173:8080/v1/diecutters/',{
            headers:{
              'key':this.$session.get("key")
            }
          }).then(response =>{
                             
            let filtered = []
            
            for(let i = 0;i<response.data.data.length;i++) {
              let str = "{ "
              str += '"id": "'     + response.data.data[i].id + '", '
              str += '"cadName": "'   + response.data.data[i].cadName + '", '
              str += '"FactoryId": "'   + response.data.data[i].factory.id + '", '
              str += '"cad": "'    + response.data.data[i].cadImage.href + '", '
              str += '"loading": "true"' 
              str += " }"
            
              filtered.push(JSON.parse(str))   
            }

            for(let i =0;i<response.data.data.length;i++){
              let cad_bytes;
              axios.get('http://195.231.3.173:8080'+response.data.data[i].cadImage.href,{
                headers:{
                  'key':this.$session.get("key")
                }
              }).then(response =>{
                
                cad_bytes = response.data.data

                filtered[i].cad = cad_bytes
                filtered[i].loading = false
                
              })
              
            }

            //console.log(filtered)
            this.real_diecutters = filtered
            this.loading= false
            
            this.$session.set("fustelle",filtered)
            this.$session.set("pid",this.$route.params.id)
            
          }).catch( (error) => {
            console.log(error)
            this.$router.push("/")
          })
        }else{
          this.real_diecutters = this.$session.get("fustelle")
          this.loading= false 
        }

        axios.get('http://195.231.3.173:8080/v1/factories',{
          headers:{
            'key':this.$session.get("key")
          }
        }).then(response =>{     
          for (let i = 0; i < response.data.data.length; i++) {
            this.factories_id[i] = response.data.data[i].id
            this.factories_name[i] = response.data.data[i].name
          }
          }).catch( (error) => {
            console.log(error)
            this.$router.push("/")
        })

    },
    methods: {
      // when blur the searchbox, if there is no text, just make the box disappear
      is_text_empty: function (event, value) {
        if (event && value === '') {
          this.searching =! this.searching
        }
      },

      getBase64: function() {
        var reader = new FileReader();
        reader.readAsDataURL(this.cadFile);
        reader.onload = () => {
          this.submit_diecutter(reader.result.split(',')[1])
          this.dialog_submit = false
          console.log("STO QUA")
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      },

      submit_diecutter: function(cadFileBase64) {

        for (let i = 0; i < this.factories_name.length; i++) {
          if (this.factories_name[i] === this.FactoryName) { 
            this.FactoryId = parseInt(this.factories_id[i])
            break
          }
        }

                    console.log(this.id + ' ' + this.cadName + ' ' + this.FactoryId + ' ' + this.cadFileBase64)

        axios.post('http://195.231.3.173:8080/v1/diecutters/', { 
          id: this.id, 
          cadName: this.cadName,
          FactoryId: this.FactoryId,
          cadFile: cadFileBase64
          }, {
          headers: {
            'key':this.$session.get("key")
          }
        })
        .then(
          (response) => { 
            this.responseData = response.data
          
            console.log(this.id + ' ' + this.cadName + ' ' + this.FactoryId + ' ' + this.cadFileBase64)

            let str = "{ "
              str += '"id": "'     + this.id + '", '
              str += '"cadName": "'   + this.cadName + '", '
              str += '"FactoryId": "'   + this.FactoryId + '", '
              str += '"cad": "'    + this.cadFileBase64 + '" '
              str += " }"

            this.real_diecutters.push(JSON.parse(str))   
            this.$session.set("fustelle",this.real_diecutters)

            this.$refs.submit_form.reset();
            this.$refs.submit_form.validate();
            window.location.reload();
          }
        )
        .catch(
          function (error) {
            console.log(error.response.data)
            return Promise.reject(error)
          }
        )
      },
/*
      update_diecutters_array: function() {
        axios.get('http://195.231.3.173:8080/v1/diecutters/',{
          headers:{
            'key':this.$session.get("key")
          }
        }).then(response =>{
          this.real_customers = []
          for(let i = 0;i<response.data.data.length;i++){
            this.real_customers.push(JSON.parse(this.client_parser(response.data.data[i].id, response.data.data[i].name, response.data.data[i].vat)))
          }
          
          this.loading = false
          this.$session.set("clienti", this.real_customers)
          
        }).catch( (error) => {
          console.log(error)
          this.$router.push("/")
        })
      },
*/
    reset: function() {
      this.$refs.textareaform.reset()
    },

      alarm () {
        alert('ATTENZIONE\nQuesta funzionalità ancora non è attiva')
      },

    }
};
</script>