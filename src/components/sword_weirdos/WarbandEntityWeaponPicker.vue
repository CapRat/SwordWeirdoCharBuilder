<script setup lang="ts">
import { WeaponMod, WeaponModState } from "@/model/WarbandEntity";
import { useSwordWeirdosRepo } from "@/stores/swordWeirdosRepo"
const weaponsModel = defineModel<string[]>()
const { weaponProfiencies = [],additionalWeapons=[] } = defineProps<{
    weaponProfiencies?: string[],
    additionalWeapons?: WeaponMod[]
}>()

let swordRepo = useSwordWeirdosRepo()


</script>

<template>
    <v-select color="primary" label="weapons" variant="underlined" :items="swordRepo.weapons" item-title="name" density="compact"
        item-value="id" v-model="weaponsModel" multiple>
        <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" title="" v-if="(weaponProfiencies.some(mod => mod == item.raw.type)||additionalWeapons.some(addWeapons=>addWeapons.state== WeaponModState.Purchasable && addWeapons.name==item.raw.id)) && !additionalWeapons.some(addWeapons=>addWeapons.state== WeaponModState.NonPurchasable && addWeapons.name==item.raw.id)">
                <h4>{{ item.raw.name }}</h4>
                <div>{{ item.raw.properties.map(property => swordRepo.getWeaponsPropertyWithID(property)?.name).join(", ") }}</div>
            </v-list-item>
        </template>
    </v-select>
</template>

<style></style>