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
            <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </template>
            <span>Aggiungi cliente</span>
          </v-tooltip>
        </template>

          
          <v-card>
            <v-form 
              v-model="valid" 
              ref="submit_form"
              @submit.prevent="submit_customer"
            >

            <v-card-title class="text-h5">
              <b>Aggiungi cliente</b>
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

                  <v-col cols="12">
                    <v-text-field
                      label="Partita IVA"
                      v-model="vat"
                      :rules="vat_rule" 
                      required
                      color="secondary"
                    ></v-text-field>
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
                type="submit"
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
          <span>Esci</span>
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

      
      <v-container fluid>
        
        <v-fade-transition>
        <v-card v-if="!loading" class="pa-4">
        <v-row> 
        <v-card-title class="font-weight-bold">Clienti</v-card-title>
        
        <v-text-field
            class="pa-6"
            clearable
            solo
            dense 
            hide-details
            single-line
            color="secondary"
            label="Cerca"
            prepend-inner-icon="mdi-account-search"
          > 
        </v-text-field>



        </v-row>
        
        <v-row dense>
          <v-col 
            v-for="item in real_customers"
            :key="item.id"
            lg="4"
            md="4"
            sm="12"
            cols="12"
          >
            <v-card >
              
              <v-card-title v-text="item.name"></v-card-title>
              <v-card-subtitle>P. IVA: {{item.vat}}</v-card-subtitle>
              <v-card-text></v-card-text>
              <v-card-actions>
                <v-container>
                <v-row>
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
                      <span>Modifica cliente</span>
                    </v-tooltip>
                  </template>


                    <v-card>
                      <v-form 
                        v-model="valid" 
                        ref="submit_form"
                        @submit.prevent="modify_customer(editing_customer_id)"
                      >
                      <v-card-title>
                        <span class="text-h5"><b>Modifica</b></span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                            >
                              <v-text-field
                                label="Nome"
                                v-model="editing_customer_name"
                                required
                                :rules="[value => !!value || 'È obbligatorio compilare questo campo']"
                                :value="item.name"
                                color="secondary"
                              ></v-text-field>
                            </v-col>
                            
                            <v-col
                              cols="12"
                            >
                              <v-text-field
                                label="Partita IVA"
                                required
                                v-model="editing_customer_vat"
                                :rules="vat_rule"
                                :value="item.vat"
                                color="secondary"
                              ></v-text-field>
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
                          type="submit"
                          :disabled="!valid"
                        >
                          Conferma
                        </v-btn>

                      </v-card-actions>
                    </v-form>
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
                      <span>Elimina cliente</span>
                    </v-tooltip>
                  </template>


                    <v-card>
                      <v-card-title class="text-h5">
                        <b>Elimina {{editing_customer_name}}</b>
                      </v-card-title>

                      <v-card-text>
                        Sei sicuro di voler eliminare {{editing_customer_name}}? <br>
                        <b> Il processo è irreversibile e comporterà l'eliminazione di tutti i dati associati al cliente.</b>
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
                          @click="delete_customer(editing_customer_id)"
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
      vat_rule: [
        p => !!p || 'È obbligatorio compilare questo campo',
        p => (p && p.length == 11 && new RegExp('^\\d+$').test(p)) || 'La Partita IVA inserita non è valida', 
      ],
      loading: true,
      valid: true,
      real_customers: [],
      offset: true,
      true: true,
      editing_customer_id: '',
      editing_customer_name: '',
      editing_customer_vat: '',
      // Variabili per aggiungere cliente //
      name: '',
      vat: '',
      id: null
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  mounted(){
    if(!this.$session.exists("clienti")){
      this.update_customers_array()
    }else{
      this.real_customers = this.$session.get("clienti")
      this.loading= false 
    }   

  },
  methods: {
      // when blur the searchbox, if there is no text, just make the box disappear
    is_text_empty: function (event, value) {
      if (event && value === '') {
        this.searching =! this.searching
      }
    },

    update_customers_array: function() {
      axios.get('http://195.231.3.173:8080/v1/customers/',{
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

    submit_customer: function() {
      axios.post('http://195.231.3.173:8080/v1/customers/', {
        name: this.name, 
        vat: this.vat
      }, {
        headers: {
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
          this.update_customers_array()
        }
      )
      
    },

    modify_customer: function(id) {
      console.log("L'id in modify è " + id)
      if (typeof id === undefined || id === '') {
        console.error("Errore durante l'eliminazione del cliente")
        return
      }

      axios.put('http://195.231.3.173:8080/v1/customers/'+id, { 
        name: this.editing_customer_name, 
        vat: this.editing_customer_vat
      }, {
        headers: {
          'key':this.$session.get("key")
        },
      })
      .then(
        response => { 
          console.log("SRO QUAAA")
          this.responseData = response.data,
          this.dialog_modify = false
          this.modify_from_storage(id, this.editing_customer_name, this.editing_customer_vat)
          console.log(this.editing_customer_name + ' ' + this.editing_customer_vat)
        }
      )
    },

    delete_customer: function(id) {
      
      if (typeof id === undefined || id === '') {
        console.error("Errore durante l'eliminazione del cliente")
        return
      }

      axios.delete('http://195.231.3.173:8080/v1/customers/'+id, {
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
      let old_storage = this.$session.get("clienti")
      let index = -1

      for (let i = 0; i < old_storage.length; i++) {
        if (old_storage[i].id === id) index = i;
      }
      
      if (index === -1) {
        console.error("Errore nell'eliminazione di un utente")
        return
      }

      this.real_customers.splice(index, 1)
      this.$session.set("clienti", this.real_customers)
    },

    modify_from_storage: function(id, name, vat) {
      let old_storage = this.$session.get("clienti")
      let index = -1

      for (let i = 0; i < old_storage.length; i++) {
        if (old_storage[i].id === id) index = i;
      }
      
      if (index === -1) {
        console.error("Errore nell'eliminazione di un utente")
        return
      }

      this.real_customers.splice(index, 1)

      this.real_customers.push(JSON.parse(this.client_parser(id, name, vat)))
      this.$session.set("clienti", this.real_customers)
    },

    client_parser: function(id, name, vat) {
      let str = "{ "
      str += '"id": "' + id + '", '
      str += '"name": "'     + name + '" , '
      str += '"vat": "' + vat + '" '
      str+= " }"

      return str;
    },

    get_data_to_edit: function(id) {
      this.editing_customer_id = id;

      for (let i = 0; i < this.real_customers.length; i++) {
        if (this.real_customers[i].id === id) {
          this.editing_customer_name = this.real_customers[i].name
          this.editing_customer_vat = this.real_customers[i].vat
        }
      }
    },

  },

};
</script>



