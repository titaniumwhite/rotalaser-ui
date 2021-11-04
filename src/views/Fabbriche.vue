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
            <v-form 
              v-model="valid" 
              ref="submit_form"
              @submit.prevent="submit_factory"
            >

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
                    cols="4"
                  >
                    <v-text-field
                      label="Stato"
                      v-model="country"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="4">
                    <v-text-field
                      label="Regione"
                      v-model="region"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="4">
                    <v-text-field
                      label="Città"
                      v-model="city"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="8">
                    <v-text-field
                      label="Indirizzo"
                      v-model="address"
                      required
                      :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="4">
                    <v-text-field
                      label="Provincia"
                      v-model="province"
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
            v-for="item in real_factories"
            :key="item.id"
            lg="4"
            md="4"
            sm="12"
            cols="12"
          >
            <v-card
             
            >
              
              <v-card-title v-text="item.name"></v-card-title>
              
              <v-card-text> {{item.address}} <br> {{item.city}} {{item.province}}, {{item.region}}
              <br> {{item.postalCode}} <br> {{item.country}}</v-card-text>
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
                        @click="get_data_to_edit(item.id)"
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
                                :value="item.region"
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
                        @click="get_data_to_edit(item.id)"
                      >
                      <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                      <span>Elimina fabbrica</span>
                    </v-tooltip>
                  </template>


                    <v-card>
                      <v-card-title class="text-h5">
                        <b>Elimina {{editing_factory_name}}</b>
                      </v-card-title>

                      <v-card-text>
                        Sei sicuro di voler eliminare {{editing_factory_name}}? <br>
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
                          @click="delete_factory(editing_factory_id)"
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
      real_factories: [],
      items: [
        { title: 'Logout' },
      ],
      offset: true,
      editing_factory_id: '',
      editing_factory_name: '',
      editing_factory_country: '',
      editing_factory_region: '',
      editing_factory_province: '',
      editing_factory_city: '',
      editing_factory_address: '',
      editing_factory_postalCode: '',
      editing_factory_customerId: '',
      // Variabili per aggiungere fabbrica //
      name: '',
      country: '',
      region: '',
      province: '',
      city: '',
      address: '',
      postalCode: '',
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
      this.update_factory_array();
    }else{
      this.real_factories = this.$session.get("fabbriche")
      this.loading= false 
    }

    axios.get('http://195.231.3.173:8080/v1/customers/',{
      headers:{
        'key':this.$session.get("key")
      }
    }).then(response =>{
      for(let i = 0; i < response.data.data.length; i++) {
        let token = []
        token[0] = response.data.data[i].id
        token[1] = response.data.data[i].name
        this.customers_name[i] = response.data.data[i].name 
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

      update_factory_array: function() {
        axios.get('http://195.231.3.173:8080/v1/factories/',{
        headers:{
          'key':this.$session.get("key")
        }
      }).then(response =>{
          this.real_factories = []
          for(let i = 0;i<response.data.data.length;i++){
              this.real_factories.push(JSON.parse(this.factory_parser(response.data.data[i].id,
                                                                      response.data.data[i].name,
                                                                      response.data.data[i].country,
                                                                      response.data.data[i].address,
                                                                      response.data.data[i].region,
                                                                      response.data.data[i].province,
                                                                      response.data.data[i].city,
                                                                      response.data.data[i].postalCode,
                                                                      -1))) // da sistemare customerId
              
          }
          
          this.loading = false
          this.$session.set("fabbriche", this.real_factories)
          
        }).catch( (error) => {
          console.log(error)
          this.$router.push("/")
        })
      },

      submit_factory: function() {
        let chosen_customerId = -1;

        for (let i = 0; i < this.customers.length; i++) {
          let temp = this.customers[i]
          if (temp[1] === this.chosen_customer) chosen_customerId = temp[0]
        }

        console.log("The chosen customer is is " + chosen_customerId)

        axios.post('http://195.231.3.173:8080/v1/factories/', { 
          name: this.name,
          country: this.country,
          region: this.region,
          province: this.province,
          city: this.city,
          address: this.address,
          postalCode: this.postalCode,        
          CustomerId: chosen_customerId
        }, {
          headers:{
            'key':this.$session.get("key")
          },
        })
        .then(
          (response) => { 
            this.responseData = response.data
            this.dialog_submit = false
            
            this.$refs.submit_form.validate();
            this.$refs.submit_form.reset();
            // take again the clients to save in the storage the id of the new client
            this.update_factory_array()
          }
        )
      },

      modify_factory: function() {
        axios.post('http://195.231.3.173:8080/v1/factories/'+this.$route.params.id, {
          
          name: this.name,
          country: this.country,
          region: this.region,
          province: this.province,
          city: this.city,
          address: this.address,
          postalCode: this.postalCode,        
          customerId: this.chosen_customerId
        })
        .then(
          response => this.responseData = response.data,
          this.dialog_modify = false
        )
      },

      delete_factory: function(id) {

        if (typeof id === undefined || id === '') {
          console.error("Errore durante l'eliminazione della fabbrica")
          return
        }

        axios.delete('http://195.231.3.173:8080/v1/factories/'+id, {
          headers: {
            'key':this.$session.get("key")
          },
        })
        .then(
          response => { 
          this.responseData = response.data,
          this.dialog_delete = false
          this.delete_from_storage(id)
        }
        )
      },

      delete_from_storage: function(id) {
        let old_storage = this.$session.get("fabbriche")
        let index = -1

        for (let i = 0; i < old_storage.length; i++) {
          if (old_storage[i].id === id) index = i;
        }
        
        if (index === -1) {
          console.error("Errore durante l'eliminazione della fabbrica")
          return
        }

        this.real_factories.splice(index, 1)
        this.$session.set("fabbriche", this.real_factories)
      },

      factory_parser: function(id, name, country, address, region, province, city, postalCode, customerId) {
        let str = "{ "
            str += '"id": "' + id + '", '
            str += '"name": "'     + name + '" , '
            str += '"country": "'+ country + '" , '
            str += '"region": "' + region + '" , '
            str += '"province": "' +' ('  + province + ')' + '" , '
            str += '"city": "' + city + '" , '
            str += '"address": "' + address + '" , '
            str += '"postalCode ": "'+ postalCode  + '" , '
            str += '"CustomerId ": "' + customerId + '" '
            str+= " }"
        return str
      },

      get_data_to_edit: function(id) {
        this.editing_factory_id = id;

        for (let i = 0; i < this.real_factories.length; i++) {
          if (this.real_factories[i].id === id) {
            this.editing_factory_name = this.real_factories[i].name
            this.editing_factory_country = this.real_factories[i].country
            this.editing_factory_region = this.real_factories[i].region
            this.editing_factory_province = this.real_factories[i].province
            this.editing_factory_city = this.real_factories[i].city
            this.editing_factory_address = this.real_factories[i].address
            this.editing_factory_postalCode = this.real_factories[i].postalCode
            this.editing_factory_customerId = this.real_factories[i].customerId
          }
        }
      },

    }
};
</script>
