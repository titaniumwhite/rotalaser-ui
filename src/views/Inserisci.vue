<template>
   <v-app>

     <v-main>

      <v-system-bar 
        color="primary darken-3"
        height="30"
        window
        dark
      >
      </v-system-bar>

      <v-app-bar
        color="primary"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="font-weight-bold">Inserisci</v-toolbar-title>

       
        <v-spacer></v-spacer>


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

        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            align-with-title
          >
            <v-tabs-slider color="secondary"></v-tabs-slider>
  
            <v-tab>
              Cliente
            </v-tab>
            <v-tab>
              Fabbrica
            </v-tab>
            <v-tab>
              Fustella
            </v-tab>
          </v-tabs>
        </template>
        

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
        <v-row dense v-if="$route.params.texty == 'Clienti' || text == 'Clienti'">
          <v-col 
            v-for="item in clienti"
            :key="item.message"
            :cols="item.flex"
          >
            <v-card
             
            >
              
              <v-card-title v-text="item.message"></v-card-title>
              <v-card-subtitle>info</v-card-subtitle>
              <v-card-text>Cose a caso?</v-card-text>
              <v-card-actions>
                 <v-btn
                  text
                  @click="$router.push('/fustelle/'+item.message)">
                  Info
                </v-btn>

                <v-spacer></v-spacer>
                

              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense v-else-if="$route.params.texty == 'Fabbriche' || text == 'Fabbriche'">
          <v-col 
            v-for="item in fabbriche"
            :key="item.message"
            :cols="item.flex"
          >
            <v-card>
              
              <v-card-title v-text="item.message"></v-card-title>
              <v-card-subtitle>info</v-card-subtitle>
              <v-card-text>Cose a caso?</v-card-text>
              <v-card-actions>

                <v-btn
                  text
                  @click="$router.push('/fustelle/'+item.message)">
                  Info
                </v-btn>


                <v-spacer></v-spacer>
  
                
  
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
  



              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </v-main> 

  </v-app>
  
</template>



<script>
export default {
   data: () => ({
      searching:false,
      drawer: false,
      group: null,
      text: "Inserisci",
    }),

    watch: {
      group () {
        this.drawer = false
      },
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



