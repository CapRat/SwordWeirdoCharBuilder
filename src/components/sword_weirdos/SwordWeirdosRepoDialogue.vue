<script setup lang="ts">


const fileModel = defineModel<File|null>({ default: null })

import { useSwordWeirdosRepo } from "@/stores/swordWeirdosRepo"
let swordRepo = useSwordWeirdosRepo()



function applyNewRulesetFile(activeState){
      if(fileModel.value!=null){
        const reader = new FileReader();
        reader.readAsText(fileModel.value, "UTF-8");
        reader.onload = function (evt) {
            swordRepo.updateSwordWeirdoRepo(evt.target.result)
        }
        reader.onerror = function (evt) {
            console.log("error reading file")
        }
    }
    activeState.value= false
}

</script>

<template>
   <v-dialog id="RuleSetDialog" max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      v-bind="activatorProps"
      text="Update new Ruleset"
 
    ></v-btn>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card title="Upload new Ruleset">
        
      <v-card-text>
        <!--<v-file-input label="Upload Repository" acc></v-file-input>-->
        <v-file-input type="file" accept="application/json" v-model="fileModel"></v-file-input>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          text="Accept" 
          @click="applyNewRulesetFile(isActive)"
        ></v-btn>
        <v-btn
          text="Close Dialog"
          @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<style>
.scrollable {
    overflow-y: scroll;
}
</style>