<template>
   <v-app>
      <v-navigation-drawer
        permanent
        expand-on-hover
      >
        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Clienti</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-factory</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Fabbriche</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>file-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Gestisci</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
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

