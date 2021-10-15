<template>
   <v-app>
     <v-main>

      <v-toolbar
        color="primary"
        dark
        flat
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title></v-toolbar-title>
  
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
            background-color="primary darken-3"
            label="Cerca"
            prepend-inner-icon="mdi-magnify"
            @blur="is_text_empty($event, $event.target.value)"
          > 
          </v-text-field>
        </v-scroll-x-reverse-transition>

        <v-spacer></v-spacer>

        <v-btn icon 
          @click="searching=!searching"
          v-show="!searching">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="white"
              icon
              v-bind="attrs"
              v-on="on"
              @click="$router.push('/')"
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
            v-for="item in secret"
            :key="item.message"
            :cols=4
          >
            <v-card
            
             >
              
              <v-card-title v-text="item.id"></v-card-title>
              <v-card-subtitle>Fustella attiva? {{item.active}}</v-card-subtitle>
              <v-card-text>Status: {{item.status}}</v-card-text>
              <v-card-actions>
                 <v-btn
                  text
                  color="secondary"
                  @click="$router.push('/fustella/postanalisi/'+item.id)">
                  Postanalisi
                </v-btn>

                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="secondary"
                  @click="$router.push('/fustella/live/'+item.id)">
                  Live
                </v-btn>
    
                <v-dialog
                  v-model="dialog"
                  max-width="600px"
                  :retain-focus="false"
                >

                  <v-card>
                    <v-card-title>
                    <span class="text-h5">Fustella</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              label="Nome"
                              required
                            ></v-text-field>
                          </v-col>
                          
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              label="Cognome"
                              hint
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                              label="Email"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Password"
                              type="password"
                              required
                            ></v-text-field>
                          </v-col>
                          
                        </v-row>
                        
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="secondary darken-1"
                        text
                        @click="dialog = false">
                        Chiudi
                      </v-btn>
                      <v-btn
                        color="secondary darken-1"
                        text
                        @click="$router.go()">
                        Salva
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
  
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
      searching: false,
      drawer: false,
      dialog: false,
      group: null,
      loading: true,
      text: "Clienti",
      fustelle: [
        { message: 'Fustella 1',flex:4 },
        { message: 'Fustella 2',flex:4 },
        { message: 'Fustella 3',flex:4 },
        { message: 'Fustella 4',flex:4 },
        { message: 'Fustella 5',flex:4 },
        { message: 'Fustella 6',flex:4 },
      ],
      secret: null
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
    mounted(){
        if(!this.$session.exists("fustelle") && 
        (!this.$session.exists("pid") || this.$route.params.id == this.$session.get("pid"))){
          axios.get('http://195.231.3.173:5002/v1/diecutters/'+this.$route.params.id,{
            headers:{
              'key':this.$session.get("key")
            }
          }).then(response =>{
                              let filtered = []
                              
                              for(let i = 0;i<response.data.length;i++){
                                  if(response.data[i].id != "00:00:00:00:00:10"){
                                    
                                    let str = "{ "
                                    str += '"id": "'     + response.data[i].id + '" , '
                                    str += '"active": "' + response.data[i].active + '", '
                                    str += '"status": "' + response.data[i].status + '" '
                                    str+= " }"
                                    
                                    filtered.push(JSON.parse(str))
                                  }
                              }
                              this.secret = filtered
                              this.loading= false
                              
                              this.$session.set("fustelle",filtered)
                              this.$session.set("pid",this.$route.params.id)
                              
                            }).catch( (error) => {
                              console.log(error)
                              this.$router.push("/")
                            })
        }else{
          this.secret = this.$session.get("fustelle")
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
    }
};
</script>