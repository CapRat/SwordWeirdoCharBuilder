<script setup lang="ts">
import Warband from "@/model/Warband";
const warbandModel = defineModel<Warband>()

import { useSwordWeirdosRepo } from '@/stores/swordWeirdosRepo';

const swordWeirdoRepo = useSwordWeirdosRepo()

function removeDoublesFromIDObj(objArray: { id: String }[]) {
  var availableIds: String[] = []
  var filteredAllProps = []
  for (const obj of objArray) {
    if (!availableIds.find(x => obj.id == x)) {
      availableIds.push(obj.id)
      filteredAllProps.push(obj)
    }
  }
  return filteredAllProps
}
function getAllUsedClasses() {
  return removeDoublesFromIDObj(warbandModel.value.entities.reduce((accumulator, entity) => [...accumulator, ...(entity.getComputedClasses().map(classID => swordWeirdoRepo.getClassWithID(classID)))], []))
}
function getAllSpellsUsedSpells() {
  return removeDoublesFromIDObj(warbandModel.value.entities.reduce((accumulator, entity) => [...accumulator, ...(entity.getComputedSpells())], []))
}

function getAllUsedWeaponProperties() {
  var allProps = []
  for (const entity of warbandModel.value.entities) {
    for (const weapon of entity.getComputedWeapons()) {
      var weaponPropertyArray = entity.getComputedProperty(weapon)
      var maneuverArray = entity.getComputedManeuver(weapon)
      allProps = [...allProps, ...weaponPropertyArray,...maneuverArray]
    }
  }

  return removeDoublesFromIDObj(allProps)
}
import { ref } from "vue";

const printObj=ref({
              id: "toPrint",
              popTitle: 'good print',
              beforeOpenCallback (vue) {
                vue.printLoading = true
              },
              openCallback (vue) {
                vue.printLoading = false
              },
              closeCallback (vue) {
              }
            })
</script>

<template>
  <v-container>
    <v-btn v-print="printObj">print</v-btn>
    <v-container class="text-body-2 pa-0 ma-0" id="toPrint">
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th width="5">Points</th>
            <th>Classes</th>
            <th>Weapons</th>
            <th>Spells</th>
            <th width="1">Leader Trait</th>
          </tr>
        </thead>
        <tbody>
          <tr class="ma-0 pa-0" v-for="item in warbandModel?.entities">
            <td >{{ item.name }}</td>
            <td >{{ item.getPoints() }}</td>
            <td>{{ item.getComputedClasses().map((str) => {
              return swordWeirdoRepo.getClassWithID(str)?.name
            }).toString()
              }}</td>
            <td class="ma-0 pa-0">
              <v-list density="compact" class="ma-0 pa-0">
                <v-list-item v-for="weapon in item.getComputedWeapons()" class="ma-0 pa-0">
                  <v-list-item-subtitle class="ma-0 pa-0">
                    <v-card class="ma-0 pa-0">{{weapon?.name + (item.getComputedProperty(weapon).length==0?"":" ["+ item.getComputedProperty(weapon).map(x=>x.name).join(', ') +"]")+(item.getComputedManeuver(weapon).length==0?"":" ("+item.getComputedManeuver(weapon).map(man=>man.name).join(", ") +")" )}}</v-card>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </td>
            <td>{{ item.getComputedSpells().map(spell => spell?.name).join(", ") }}
            </td>
            <td>
              <v-card variant="flat" >
              <u><strong>{{ swordWeirdoRepo.getLeaderTraitWithID(item.leaderTrait)?.name }}</strong></u>
              {{ swordWeirdoRepo.getLeaderTraitWithID(item.leaderTrait)?.effect }}
            </v-card></td>
          </tr>
        </tbody>
      </v-table>


      <v-col>
        <v-row>
          <v-card variant="flat"  title="Classes" :width="getAllSpellsUsedSpells().length==0?'50%':'33%'" class="overflow-visible">
            <v-list class="overflow-visible" density="compact">
              <v-list-item class="textwrap" v-for="item in getAllUsedClasses()">
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle><v-card>{{ item.effect }}</v-card></v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card v-if="getAllSpellsUsedSpells().length!=0" variant="flat" title="Spells" width="33%">
            <v-list density="compact">
              <v-list-item class="overflow-visible" v-for="item in getAllSpellsUsedSpells()">
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle><v-card>{{ item.effect }}</v-card></v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card variant="flat" title="Weapon Properties" :width="getAllSpellsUsedSpells().length==0?'50%':'34%'">
            <v-list density="compact">
              <v-list-item class="overflow-visible" v-for="item in getAllUsedWeaponProperties()">
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle height="100"
                  class="text-wrap"><v-card>{{ item.effect }}</v-card></v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-row>
      </v-col>
      Total Points: {{ warbandModel.entities.map((entity) => entity.getPoints()).reduce((x, y) => x + y, 0) }}
    </v-container>
  </v-container>
</template>

<style>

</style>