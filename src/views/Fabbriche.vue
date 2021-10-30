<template>
   <v-app>

     <v-main>

      <v-app-bar
        color="primary"
        
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="font-weight-bold"></v-toolbar-title>
        
         <v-img
          src="./rotalaser-logo.png"
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
          color="secondary">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon
          color="secondary">
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
            <v-icon>mdi-home-plus</v-icon>
            </v-btn>
          </template>
            <span>Aggiungi fabbrica</span>
          </v-tooltip>
        </template>

          <v-card>
            <v-form v-model="valid">

            <v-card-title class="text-h5">
              <b>Aggiungi fabbrica</b>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                
                  <v-col cols="12">
                    <v-text-field
                      label="Nome"
                      v-model="name"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      label="Stato"
                      v-model="country"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      label="Regione"
                      v-model="state"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      label="Città"
                      v-model="city"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      label="Indirizzo"
                      v-model="address"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      :items="customers_name"
                      label="Cliente"
                      v-model="chosen_customer"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"  
                      color="secondary"
                      item-color="secondary"
                    ></v-select>
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
                :disabled="!valid"
                @click="submit_factory"
              >
                Salva
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

      </v-app-bar>
    
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

              <v-list-item to="/inserisci" disabled>
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
        <v-fade-transition>
        <v-card v-if="!loading" class="pa-4">
        <v-row> 
        <v-card-title class="font-weight-bold">Fabbriche</v-card-title>
        
        <v-text-field
            class="pa-6"
            clearable
            solo
            dense 
            hide-details
            single-line
            color="secondary"
            label="Cerca"
            prepend-inner-icon="mdi-feature-search"
          > 
          </v-text-field>
        </v-row>
        
        <v-row dense>
          <v-col 
            v-for="item in real_fabbriche"
            :key="item.name"
            lg="4"
            md="4"
            sm="12"
            cols="12"
          >
            <v-card
             
            >
              
              <v-card-title v-text="item.name"></v-card-title>
              <v-card-subtitle>P.IVA {{item.piva}}</v-card-subtitle>
              <v-card-text>{{item.location}}</v-card-text>
              <v-card-actions>
                <v-container>
                  <v-row dense>
                    <v-col
                    lg="6"
                    md="6"
                    sm="6"
                    cols="6"
                  >
                 <v-btn
                  text
                  color="secondary"
                  @click="$router.push('/fustelle/'+item.name)">
                  Fustelle
                </v-btn>
                    </v-col>

                <v-spacer></v-spacer>
                  <v-col
                    lg="6"
                    md="6"
                    sm="6"
                    cols="6"
                  >
                <v-dialog
                    v-model="dialog_modify"
                    max-width="600px"
                    :retain-focus="false"
                  >
                   <template #activator="{ on: dialog_modify }">
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip1 }">
                      <v-btn
                        icon
                        color="secondary"
                        v-on="{ ...tooltip1, ...dialog_modify }"
                      >
                      <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                      <span>Modifica fabbrica</span>
                    </v-tooltip>
                  </template>


                    <v-card>
                      <v-card-title>
                        <span class="text-h5"><b>Modifica {{item.name}}</b></span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                            >
                              <v-text-field
                                label="Nome"
                                required
                                :value="item.name"
                                color="secondary"
                              ></v-text-field>
                            </v-col>
                            
                            <v-col
                              cols="6"
                            >
                              <v-text-field
                                label="Stato"
                                required
                                :value="item.country"
                                color="secondary"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                              <v-text-field
                                label="Regione"
                                required
                                :value="item.state"
                                color="secondary"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                              <v-text-field
                                label="Città"
                                required
                                :value="item.city"
                                color="secondary"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                              <v-text-field
                                label="Indirizzo"
                                :value="item.address"
                                required
                                color="secondary"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-select
                                :items="customers_name"
                                label="Cliente"
                                required
                                :rules="rules"
                                color="secondary"
                                item-color="secondary"
                              ></v-select>
                            </v-col>

                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>

                        <v-spacer></v-spacer>

                        <v-btn
                          text
                          @click="dialog_modify = false">
                          Annulla
                        </v-btn>

                        <v-btn
                          color="green darken-1"
                          text
                          @click="modify_factory">
                          Salva
                        </v-btn>

                      </v-card-actions>
                    </v-card>

                  </v-dialog>

                  <v-dialog
                    v-model="dialog_delete"
                    max-width="600px"
                    :retain-focus="false"
                  >
                   <template #activator="{ on: dialog_delete }">
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip2 }">
                      <v-btn
                        icon
                        color="secondary"
                        v-on="{ ...tooltip2, ...dialog_delete }"
                      >
                      <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                      <span>Elimina fabbrica</span>
                    </v-tooltip>
                  </template>


                    <v-card>
                      <v-card-title class="text-h5">
                        <b>Elimina {{item.name}}</b>
                      </v-card-title>

                      <v-card-text>
                        Sei sicuro di voler eliminare {{item.name}}? <br>
                        <b> Il processo è irreversibile e comporterà l'eliminazione di tutti i dati associati alla fabbrica.</b>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          text
                          @click="dialog_delete = false"
                        >
                          Annulla
                        </v-btn>

                        <v-btn
                          color="error"
                          text
                          @click="delete_factory"
                        >
                          Elimina
                        </v-btn>
                      </v-card-actions>
                    </v-card>

                  </v-dialog>
                  </v-col>
                  </v-row>
                </v-container>
                
              </v-card-actions>
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
      searching:false,
      drawer: false,
      group: null,
      dialog_modify: false,
      dialog_delete: false,
      dialog_submit: false,
      valid: true,
      loading: true,
      true: true,
      real_fabbriche: [],
      items: [
        { title: 'Logout' },
      ],
      offset: true,
      // Variabili per aggiungere fabbrica //
      name: '',
      country: '',
      state: '',
      city: '',
      address: '',
      customerId: '',
      chosen_customer: '',
      customers: [],
      customers_name: []
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },

    mounted(){
    if(!this.$session.exists("fabbriche")){
      axios.get('http://195.231.3.173:5002/v1/factories/',{
        headers:{
          'key':this.$session.get("key")
        }
      }).then(response =>{
          
          
          for(let i = 0;i<response.data.length;i++){
            console.log(response.data)
              //if(response.data[i].name != "prova"){
              let str = "{ "
              str += '"name": "'     + response.data[i].id + '" , '
              str += '"location": "' + response.data[i].location + '", '
              str += '"piva": "' + response.data[i].CustomerPiva + '" '
              str+= " }"
              
              this.real_fabbriche.push(JSON.parse(str))
              //}  
          }
          
          this.loading= false
          
          this.$session.set("fabbriche",this.real_fabbriche)
          
        }).catch( (error) => {
          console.log(error)
          this.$router.push("/")
        })
    }else{
      this.real_fabbriche = this.$session.get("fabbriche")
      this.loading= false 
    }

    axios.get('http://195.231.3.173:5002/v1/customers/',{
      headers:{
        'key':this.$session.get("key")
      }
    }).then(response =>{
      for(let i = 0; i < response.data.length; i++) {
        let token = []
        token[0] = response.data[i].id
        token[1] = response.data[i].name
        this.customers_name[i] = response.data[i].name 
        this.customers.push(token)
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

      submit_factory: function() {
        let chosen_customerId = -1;

        for (let i = 0; i < this.customers.length; i++) {
          let temp = this.customers[i]
          if (temp[1] === this.chosen_customer) chosen_customerId = temp[0]
        }

        axios.post('http://195.231.3.173:8080/v1/factories/', { 
          name: this.name, 
          country: this.country,
          state: this.state,
          city: this.city,
          address: this.address,
          customerId: chosen_customerId
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
          address: this.address,
          customerId: this.customerId
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
    }
};
</script>

