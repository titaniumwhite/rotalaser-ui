<template>
  <div id="app">
  <v-app>
    <v-main>
      <v-toolbar
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
            centered
            icons-and-text
            v-model="tab"
            align-with-title
          >
            <v-tabs-slider color="secondary"></v-tabs-slider>
  
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
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

      <v-card>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
          <v-card flat> 
            <v-card-title>
            <span class="text-h5">{{item}}</span>
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
                @click="$router.go()">
                Salva
              </v-btn>
            </v-card-actions>
          </v-card> 
        </v-tab-item>
      </v-tabs-items>
      </v-card>
    </v-main>
  </v-app>

</div>
</template>
<script>
export default{
  data() {
    return {
      searching:false,
      drawer: false,
      tab: null,
      items: [
        'Cliente', 'Fabbrica', 'Fustella'
      ],
    }
  },
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
      group () {
        this.drawer = false
      },
    }
}
</script>

<style>
/* Fixing selected tab invisible in dark mode */
.v-tabs-slider-wrapper, .v-tab--active {
  color: #fff !important;
}
</style>


