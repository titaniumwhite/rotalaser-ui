<template>
   <v-app>
      <v-content >
        <v-system-bar color="deep-purple darken-3"></v-system-bar>

    <v-app-bar
      color="deep-purple accent-4"
      dark
      prominent
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Clienti</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fabbriche</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Gestione</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

      </v-content>
   </v-app>
</template>

<script>
export default {
   data: () => ({
      drawer: false,
      group: null,
    }),
    watch: {
      group () {
        this.drawer = false
      },
    },
};
</script>

