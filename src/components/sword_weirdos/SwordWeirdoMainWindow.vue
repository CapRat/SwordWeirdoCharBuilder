<script lang="ts" setup>
import WarbandEntityPreview from '@/components/sword_weirdos/WarbandEntityList.vue';
import PrintPreview from '@/components/sword_weirdos/PrintPreview.vue';
import WarbandConfig from '@/components/sword_weirdos/WarbandConfig.vue';
import SwordWeirdosRepoDialogue from '@/components/sword_weirdos/SwordWeirdosRepoDialogue.vue';
import InfoDialog from '@/components/sword_weirdos/InfoDialog.vue';
import WarbandEntity from '@/model/WarbandEntity';
import Warband from '@/model/Warband';
import { useSwordWeirdosRepo } from '@/stores/swordWeirdosRepo';

const swordWeirdoRepo = useSwordWeirdosRepo()

const warbandModel = ref<Warband>(new Warband())
const showWarbandConfig = ref<boolean>(false)
const index = ref(-1)
const preview = ref(false)

function removeWarbandEntity(warbandEntity: WarbandEntity) {

  var warbandIndex = warbandModel.value.entities.indexOf(warbandEntity)
  if (warbandIndex<index.value) {
    index.value--
  }
  if (warbandIndex==index.value&& index.value>=(warbandModel.value.entities.length-1)) {
    index.value-- 
  }

  warbandModel.value.entities.splice(warbandIndex, 1);
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

</script>

<template>
  <v-app-bar :elevation="0">
  

    <v-app-bar-title  > <v-btn variant="plain" href="https://www.drivethrurpg.com/en/product/437324/sword-weirdos" > Sword-Weirdos Generator</v-btn></v-app-bar-title>

    <template v-slot:append>
      <v-btn @click="preview = !preview" icon="mdi-eye" :color="preview ? 'primary' : ''"></v-btn>
      <v-menu width="400">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-dots-vertical"></v-btn>
        </template>
        <v-list>
          <v-list-item>
          <InfoDialog> </InfoDialog>
        </v-list-item>
          <v-list-item>
            <v-btn text="Create New Warband" @click="warbandModel=new Warband()"></v-btn>
          </v-list-item>
          <v-list-item>
            <SwordWeirdosRepoDialogue> </SwordWeirdosRepoDialogue>
          </v-list-item>
          <v-list-item>
            <v-btn text="Download Ruleset" @click="download('CurrentSwordWeirdoRuleSet.json', swordWeirdoRepo.getCurrentStoreAsString())"> </v-btn>
          </v-list-item>
         
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>


  <v-container v-if="!preview">
    <v-alert v-for="error in warbandModel.getErrors()"  :text="error"  type="error"></v-alert>
    <v-alert v-for="warning in warbandModel.getWarnings()" :text="warning" type="warning"></v-alert>

    <v-col>
      <v-row>
        <v-container width="50%">

          <h1>{{ warbandModel.name != undefined && warbandModel.name != "" ? warbandModel.name : "Warband" }}<v-icon
              @click="showWarbandConfig = true" class="ma-1 pa-3 pb-6" size="x-small">mdi-pencil</v-icon></h1>
          <h4>{{ swordWeirdoRepo.getWarbandTraitWithID(warbandModel.warbandTrait)?.name }}</h4>
        </v-container>
        <WarbandConfig v-model:show="showWarbandConfig" v-model="warbandModel"></WarbandConfig>
      </v-row>
      <v-row>

        <WarbandEntityPreview width="50%" v-model="warbandModel.entities"
          @add-warband-entity="(warbandEntity) => warbandEntity.containingWarband = warbandModel"
          @remove-warband-entity="(warbandEntity) => removeWarbandEntity(warbandEntity)" v-model:index="index" />
        <WarbandEntityCofiguration v-model="warbandModel.entities[index]" />

      </v-row>
    </v-col>
  </v-container>
  <PrintPreview v-if="preview" v-model="warbandModel"></PrintPreview>
 
</template>
<style>
.v-list-item {
  white-space: normal;
  font-size: 18px;
}
</style>