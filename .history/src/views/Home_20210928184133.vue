<template>
   <v-app>
      <v-content >
        <v-app-bar
            :collapse="!collapseOnScroll"
            :collapse-on-scroll="collapseOnScroll"
            absolute
            color="deep-purple accent-4"
            dark
            scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Collapsing Bar</v-toolbar-title>

      <v-spacer></v-spacer>
      
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-6"
      class="overflow-y-auto"
      max-height="600"
    >
      </v-content>
   </v-app>
</template>

<script>
export default {
   name: 'Home',
   data: () => ({
      collapseOnScroll: true,
    }),
};
</script>

