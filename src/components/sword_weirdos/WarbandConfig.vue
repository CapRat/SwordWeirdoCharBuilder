<script setup lang="ts">


const showModel = defineModel<boolean>("show")
const warbandModel = defineModel<Warband>()
import Warband from "@/model/Warband";
import { useSwordWeirdosRepo } from "@/stores/swordWeirdosRepo"
let swordRepo = useSwordWeirdosRepo()




</script>

<template>
    <v-dialog v-model="showModel" max-width="500">
        <v-card title="Warband Settings" class="pa-6">
            <v-text-field color="primary" variant="underlined" label="Name" placeholder="Your Warband Name"
                v-model="warbandModel.name"></v-text-field>
            <v-select color="primary" variant="underlined" label="Warband Trait" :items="swordRepo.warband_traits"
                item-title="name" item-value="id" v-model="warbandModel.warbandTrait"></v-select>
            <v-number-input color="primary" variant="underlined" label="PointCost" placeholder="Your Warband Name"
                v-model="warbandModel.points"></v-number-input>
            <v-btn @click="warbandModel.reset()">Reset Warband</v-btn>
        </v-card>

    </v-dialog>

</template>

<style>
.scrollable {
    overflow-y: scroll;
}
</style>