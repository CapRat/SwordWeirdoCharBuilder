<template>
<v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="About"
      ></v-btn>
    </template>
  
    <template v-slot:default="{ isActive }">
      <v-card title="About">
        <v-alert
  color="warning"
  icon="$warning"
  title="Work in Progress"
  text="This application is in the alpha state. This it may contain errors or missing some features. Please help to improve this app."
></v-alert>

     
        <v-card-text>
          This is a generator to generate Warbands for Sword-Weirdos. Its still in its alpha version and lacks in some points. If you want to contribute or report some bugs, this would be verymuch supported.
          Also if you want to know more about the Ruleset or other features visit the <a target="_blank" rel="noopener noreferrer" href="https://github.com/CapRat/SwordWeirdoCharBuilder/">github site</a>

        </v-card-text>
        <v-card-text>
 
          This work is not in anyway connected to the author of SwordWeirdos. I just like his Game very much. If you play it, please consider supporting him on <a target="_blank" rel="noopener noreferrer" href="https://www.drivethrurpg.com/en/product/437324/sword-weirdos">Wargame Vault</a> 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn
            text="Close Dialog"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>