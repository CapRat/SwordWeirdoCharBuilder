<script setup lang="ts">
import WarbandEntity from '@/model/WarbandEntity';
import WarbandEntityPreview from '@/components/sword_weirdos/WarbandEntityPreview.vue';
import generateName from '@/model/RandomNamesGenerator';

const emit = defineEmits({
  addWarbandEntity(warbandEntity: WarbandEntity) { },
  removeWarbandEntity(warbandEntity: WarbandEntity) { }
})
const warbandEntityListModel = defineModel<WarbandEntity[]>()
function getWarbandEntityListValue() {
  if (warbandEntityListModel.value == undefined) warbandEntityListModel.value = []
  return warbandEntityListModel.value
}
const warbandEntitySelectedIndex = defineModel<number>("index")



function add_entity() {
  if (warbandEntityListModel.value == undefined) {
    warbandEntityListModel.value = []
  }
  let newWarband = new WarbandEntity();
  newWarband.name = generateName()

  let size = warbandEntityListModel.value.length
  warbandEntityListModel.value.push(newWarband)
  warbandEntitySelectedIndex.value = size
  emit('addWarbandEntity',newWarband)
}





function selectEntity(warband: WarbandEntity, index: number) {
  warbandEntitySelectedIndex.value = index
}
</script>

<template>
  <v-container >
    <v-card >
    <WarbandEntityPreview class="my-1" v-for="(warbandEntity, i) in warbandEntityListModel"
      :highlight="i == warbandEntitySelectedIndex ? true : false" @click="selectEntity(warbandEntity, i)" @minus-click="$emit('removeWarbandEntity',warbandEntity)"
      v-model="getWarbandEntityListValue()[i]" />
    <v-card @click="add_entity" class="d-flex align-center justify-center">
      <v-icon size="100px">mdi-plus</v-icon>
    </v-card>
  </v-card>
   
  </v-container>
</template>

<style></style>