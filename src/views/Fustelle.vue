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
        <v-btn icon 
          @click.stop="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title class="font-weight-bold">Fustelle di {{$route.params.id}}</v-toolbar-title>
          
        <v-spacer></v-spacer>
        <v-scroll-x-reverse-transition>
          <v-text-field
                v-show="searching" 
                transition="slide-x-reverse-transition"
                solo
                dense 
                hide-details
                rounded
                clearable
                single-line
                background-color="primary darken-3"
                label="Cerca"
                prepend-inner-icon="mdi-magnify"
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
    
      
      <v-container  fluid>
        <v-row dense>
          <v-col 
            v-for="item in fustelle"
            :key="item.message"
            :cols="item.flex"
          >
            <v-card
            
             >
              
              <v-card-title v-text="item.message"></v-card-title>
              <v-card-subtitle>info fustella</v-card-subtitle>
              <v-card-text>Cose a caso?</v-card-text>
              <v-card-actions>
                 <v-btn
                  text
                  @click="$router.push('/fustella/'+item.message)">
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
      searching: false,
      drawer: false,
      group: null,
      text: "Clienti",
      fustelle: [
        { message: 'Fustella 1',flex:4 },
        { message: 'Fustella 2',flex:4 },
        { message: 'Fustella 3',flex:4 },
        { message: 'Fustella 4',flex:4 },
        { message: 'Fustella 5',flex:4 },
        { message: 'Fustella 6',flex:4 },
      ],
    }),
    watch: {
      group () {
        this.drawer = false
      },
    },
};
</script>