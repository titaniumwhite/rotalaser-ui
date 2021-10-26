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
            v-for="item in secret"
            
            :key="item.message"
            lg="4"
            md="4"
            sm="12"
            cols="12"
          >
            <v-card>
              <div class="d-flex flex-no-wrap justify-space-between">
              <div>
              
              <v-card-title v-text="item.name"></v-card-title>
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
          axios.get('http://195.231.3.173:5002/v1/diecutters/',{
            headers:{
              'key':this.$session.get("key")
            }
          }).then(response =>{
                              let filtered = []
                              
                              for(let i = 0;i<response.data.length;i++){
                                  if(response.data[i].id != "00:00:00:00:00:10"){
                                    let name;
                                    
                                    if (response.data[i].id === "da:5b:93:12:58:30") {
                                      name = "L02241"
                                    } else if (response.data[i].id === "ee:ea:4b:24:65:33") {
                                      name = "G02012"
                                    } else if (response.data[i].id === "c7:02:8f:47:f2:0d") {
                                      name = "2877"
                                    } else if (response.data[i].id === "d5:65:e4:a8:89:60") {
                                      name = "2147B"
                                    } else if (response.data[i].id === "d7:05:4d:e8:6a:f9") {
                                      name = "2771"
                                    } else if (response.data[i].id === "c2:f3:33:08:5a:2f") {
                                      name = "B02181"
                                    } else if (response.data[i].id === "da:bc:6e:d4:80:73") {
                                      name = "L02140"
                                    }                                    
                                    
                                    let str = "{ "
                                    str += '"name": "'   + name + '", '
                                    str += '"id": "'     + response.data[i].id + '", '
                                    str += '"active": "' + response.data[i].active + '", '
                                    str += '"status": "' + response.data[i].status + '", '
                                    str += '"cad": "' + response.data[i].cadimage + '" '
                                    str+= " }"
                              
                                    
                                    filtered.push(JSON.parse(str))
                                  }
                              }
                              console.log(filtered)
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
      alarm () {
        alert('ATTENZIONE\nQuesta funzionalità ancora non è attiva')
      },
    }
};
</script>