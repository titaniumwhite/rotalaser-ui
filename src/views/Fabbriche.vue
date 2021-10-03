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

        <v-toolbar-title class="font-weight-bold">Fabbriche</v-toolbar-title>
          
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
        <v-row dense>
          <v-col 
            v-for="item in fabbriche"
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
                  color="secondary"
                  @click="$router.push('/fustelle/'+item.message)">
                  Info
                </v-btn>

                <v-spacer></v-spacer>
  
                <v-dialog
                  v-model="dialog"
                  max-width="600px"
                  :retain-focus="false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="secondary"
                      v-bind="attrs"
                      v-on="on"
                    >
                    <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Fabbrica</span>
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
                        @click="dialog = false"
                        >
                        Chiudi
                      </v-btn>
                      <v-btn
                        color="secondary darken-1"
                        text
                        @click="$router.go()"
                        >
                        Salva
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

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
      dialog: false,
      fabbriche: [
        { message: 'Fabbrica 1',flex:4 },
        { message: 'Fabbrica 2',flex:4 }
      ],
      items: [
        { title: 'Logout' },
      ],
      offset: true,
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
      }
    }
};
</script>

