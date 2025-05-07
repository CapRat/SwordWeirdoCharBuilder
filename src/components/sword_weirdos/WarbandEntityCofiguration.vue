<script setup lang="ts">
//import { ref } from 'vue'
//const greeting = ref('Hello World!')


import WarbandEntity from '@/model/WarbandEntity';
import WarbandEntityClassPicker from './WarbandEntityClassPicker.vue';
import WarbandEntityStatPicker from './WarbandEntityStatPicker.vue';
import WarbandEntityWeaponPicker from './WarbandEntityWeaponPicker.vue';
import WarbandEntitySpellPicker from './WarbandEntitySpellPicker.vue';
const warbandEntityModel = defineModel<WarbandEntity>()
import { useSwordWeirdosRepo } from "@/stores/swordWeirdosRepo"
let swordRepo = useSwordWeirdosRepo()




</script>

<template>

    <v-container :width="400" v-if="warbandEntityModel != undefined">
        <v-text-field color="primary" variant="underlined" label="Name" v-model="warbandEntityModel.name"></v-text-field>
        <WarbandEntityStatPicker stat-name="Speed" :modifiers="warbandEntityModel.getModifiers().statMods" v-model="warbandEntityModel.speedLevel"></WarbandEntityStatPicker>
        <WarbandEntityStatPicker stat-name="Might" :modifiers="warbandEntityModel.getModifiers().statMods" v-model="warbandEntityModel.mightLevel"></WarbandEntityStatPicker>
        <WarbandEntityStatPicker stat-name="Defense" :modifiers="warbandEntityModel.getModifiers().statMods" v-model="warbandEntityModel.defenseLevel"></WarbandEntityStatPicker>
        <WarbandEntityStatPicker stat-name="Willpower"  :modifiers="warbandEntityModel.getModifiers().statMods" v-model="warbandEntityModel.willpowerLevel"></WarbandEntityStatPicker>
        <WarbandEntityClassPicker  :max-number-of-classes="warbandEntityModel.getMaxClasses()" v-model="warbandEntityModel.classes" :classes-which-may-not-be-selected="warbandEntityModel.containingWarband?.getClassesToIgnore(warbandEntityModel.isLeader)" ></WarbandEntityClassPicker>
        <WarbandEntityWeaponPicker :weaponProfiencies="warbandEntityModel.getModifiers().weaponProfiencies" :additional-weapons="warbandEntityModel.getModifiers().weaponMod" v-model="warbandEntityModel.weapons"></WarbandEntityWeaponPicker>
        <WarbandEntitySpellPicker :max-spell-cost="warbandEntityModel.getMaxSpellNumber()" :modifier="warbandEntityModel.getModifiers().spells" v-model="warbandEntityModel.spells"></WarbandEntitySpellPicker>
        <v-switch color="primary" label="Powerful" v-model="warbandEntityModel.isPowerful"></v-switch>
        <v-switch color="primary" label="Leader" v-model="warbandEntityModel.isLeader"></v-switch>
        <v-select color="primary" v-if="warbandEntityModel.isLeader" label="Leadertraits" variant="underlined" v-model="warbandEntityModel.leaderTrait"
            :items="swordRepo.leader_traits" item-title="name" item-value="id" </v-select>
    </v-container>
    

</template>

<style></style>