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

      <v-checkbox
        v-model="collapseOnScroll"
        color="white"
        hide-details
      ></v-checkbox>
    </v-app-bar>
      </v-content>
   </v-app>
</template>

<script>

</script>

