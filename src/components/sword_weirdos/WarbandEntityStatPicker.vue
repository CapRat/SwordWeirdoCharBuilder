<script setup lang="ts">
import { StatMod, StatModState } from "@/model/WarbandEntity";
import { useSwordWeirdosRepo } from "@/stores/swordWeirdosRepo"

const statLevel = defineModel<number>()
const props = defineProps<{ statName?: string, modifiers?: StatMod[] }>()

let swordRepo = useSwordWeirdosRepo()

function isRestricted(item): boolean {
    for (const modifier of props.modifiers) {
        if (modifier.name == props.statName?.toLocaleLowerCase()) {
            if (modifier.level == item.level) {
                if (modifier.state == StatModState.Disable)
                    return true
                else
                    return false
            }
        }
    }
    if (item.restriction != undefined && item.restriction == true) {
        return true;
    }
    return false
}


</script>

<template>
    <v-select color="primary" :label="statName" variant="underlined"
        :items="swordRepo.stats[statName?.toLocaleLowerCase()]"
        :item-title="swordRepo.stats[statName?.toLocaleLowerCase()][0].dice == undefined ? 'level' : 'dice'"
        item-value="level" item v-model="statLevel">
        <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :disabled="isRestricted(item.raw)"></v-list-item>
        </template>
    </v-select>

</template>

<style></style>