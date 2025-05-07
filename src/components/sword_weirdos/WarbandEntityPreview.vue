<script setup lang="ts">
//import { ref } from 'vue'
//const greeting = ref('Hello World!')

defineProps<{
  highlight?: boolean
}>()

import WarbandEntity from '@/model/WarbandEntity';
import { useSwordWeirdosRepo } from '@/stores/swordWeirdosRepo';

const warbandEntityModel = defineModel<WarbandEntity>()
const swordWeirdoRepo = useSwordWeirdosRepo()

const emit = defineEmits({
  minusClick () { }
})
function onClick(event){
    event.stopPropagation()
    event.preventDefault()
    emit('minusClick')
}
</script>

<template>



  <v-card :color="highlight ? 'primary' : ''" class="mx-auto " density="compact">
    <template v-slot:title>
      {{ warbandEntityModel?.name + ' (' + warbandEntityModel?.getPoints() + 'P)' }} <v-icon size="x-large" icon="mdi-minus" @click="onClick($event)"
        class="position-absolute right-0 mr-5 mt-1"></v-icon>
    </template>

    <template v-slot:subtitle>
      {{ warbandEntityModel?.classes.map((str) => { return swordWeirdoRepo.getClassWithID(str).name }).toString() }}
    </template>

    <template v-slot:text>
      {{ warbandEntityModel?.weapons.map((str) => { return swordWeirdoRepo.getWeaponWithID(str).name }).toString() }}
    </template>
  </v-card>
</template>

<style></style>