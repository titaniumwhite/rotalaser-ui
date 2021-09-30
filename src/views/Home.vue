<template>
   <v-app>
     <v-main>
      <v-system-bar color="primary darken-3"></v-system-bar>
      <v-app-bar
        color="primary"
        dark
        prominent
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="font-weight-bold">{{text}}</v-toolbar-title>

        <v-row
          no-gutters
          :align="align"
          style="height: 1px;"
        >

          <v-col></v-col>

          <v-col
            cols = 8
          >
            
            <v-text-field
              filled
              label="Cerca"
              prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          
          </v-col>

          <v-col></v-col>
        </v-row>


        <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

      </v-app-bar>
    
      <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="secondary--text text--accent-4"
          >
            <v-list-item link
              @click="text='Clienti'">
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Clienti</v-list-item-title>
            </v-list-item>

            <v-list-item link
              @click="text='Fabbriche'">
              <v-list-item-icon>
                <v-icon>mdi-factory</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Fabbriche</v-list-item-title>
            </v-list-item>

            <v-list-item link
              @click="text='Gestisci'">
              <v-list-item-icon>
                <v-icon>mdi-cogs</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Gestisci</v-list-item-title>
            </v-list-item>

            
          </v-list-item-group>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
          <v-switch
            v-model="$vuetify.theme.dark"
            label="Tema Scuro"
          >
          </v-switch>
          </div>
        </template>
       
           
      </v-navigation-drawer>

      
      <v-container  fluid>
        <v-row dense v-if="text == 'Clienti'">
          <v-col 
            v-for="item in clienti"
            :key="item.message"
            :cols="item.flex"
          >
            <v-card>
              
              <v-card-title v-text="item.message"></v-card-title>
              <v-card-subtitle>info</v-card-subtitle>
              <v-card-text>Cose a caso?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
  
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense v-else-if="text == 'Fabbriche'">
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
                <v-spacer></v-spacer>
  
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense v-else-if="text == 'Gestisci'">
          <v-col 
            v-for="item in clienti.concat(fabbriche)"
            :key="item.message"
            :cols="item.flex"
          >
            <v-card>
              
              <v-card-title v-text="item.message"></v-card-title>
              <v-card-subtitle>info</v-card-subtitle>
              <v-card-text>Cose a caso?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
  
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
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
      drawer: false,
      group: null,
      text: "Clienti",
      clienti: [
        { message: 'Cliente 1',flex:4 },
        { message: 'Cliente 2',flex:4 }
      ],
      fabbriche: [
        { message: 'Fabbrica 1',flex:4 },
        { message: 'Fabbrica 2',flex:4 }
      ],
    }),
    watch: {
      group () {
        this.drawer = false
      },
    },
};
</script>

