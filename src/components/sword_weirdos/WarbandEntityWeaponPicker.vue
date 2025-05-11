<script setup lang="ts">
import { WeaponMod, WeaponModState } from "@/model/WarbandEntity";
import { useSwordWeirdosRepo } from "@/stores/swordWeirdosRepo"
const weaponsModel = defineModel<string[]>()
const showDetails = ref<boolean>(true)
const { weaponProfiencies = [],additionalWeapons=[], showNotSelectableWeapons=false} = defineProps<{
    weaponProfiencies?: string[],
    additionalWeapons?: WeaponMod[],
    showNotSelectableWeapons?:boolean
}>()

let swordRepo = useSwordWeirdosRepo()


function selectWeapon(myWeapon) {
    if (!weaponsModel.value?.includes(myWeapon.id)) {
        if(isValidWeapon(myWeapon)){
            weaponsModel.value?.push(myWeapon.id)
        }
    }
    else {
        var index = weaponsModel.value.indexOf(myWeapon.id);
        if (index !== -1) {
            weaponsModel.value.splice(index, 1);
        }
    }

}

function isValidWeapon(myWeapon){
    return (weaponProfiencies.some(mod => mod == myWeapon.type)||additionalWeapons.some(addWeapons=>addWeapons.state== WeaponModState.Purchasable && addWeapons.name==myWeapon.id)) && !additionalWeapons.some(addWeapons=>addWeapons.state== WeaponModState.NonPurchasable && addWeapons.name==myWeapon.id)
  
}
</script>

<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-text-field class="cursor-pointer" color="primary" :readonly="true" @click="" v-bind="activatorProps"
                label="weapon" variant="underlined" item-title="name" item-value="name" item-children="effect"
                v-model="weaponsModel" multiple></v-text-field>

        </template>

        <template v-slot:default="{ isActive }">
           
            <v-card>
                <v-col class="ma-0 pa-0">
                  <v-btn icon="mdi-arrow-left" @click="isActive.value = false" variant="plain"></v-btn>
                  <v-btn icon="mdi-information-variant" @click="showDetails = !showDetails"  :color="showDetails ? 'primary' : ''" class="position-absolute right-0" variant="plain"></v-btn>
                </v-col>
                  <v-divider></v-divider>
                   
          
                <v-container class="scrollable">
                    <v-row v-for="myWeapon in swordRepo.weapons"   >
                        <v-col v-if="isValidWeapon(myWeapon) || showNotSelectableWeapons" >
                            <v-card @click="selectWeapon(myWeapon)" density="compact"
                                :color="weaponsModel?.includes(myWeapon.id) ? 'primary' : ''" width="auto"
                                :title="myWeapon.name + ' (' + myWeapon.pts + ')'" :variant="isValidWeapon(myWeapon)?undefined:'plain'">
                                <v-card-text v-if="showDetails">
                                   <h3>Properties:</h3>
                                   <v-divider></v-divider>
                                    <div v-for="weaponProp in myWeapon.properties.map(prop => swordRepo.getWeaponsPropertyWithID(prop))"> 
                                        <b>{{ weaponProp?.name }}</b> : {{ weaponProp?.effect}} <br></br>
                                    </div>
                                    <h3 v-if="myWeapon.maneuver.length!=0">Maneuver:</h3>
                                    <v-divider></v-divider>
                                    <div v-for="weaponManeuver in myWeapon.maneuver.map(maneuver => swordRepo.getManeuverWithID(maneuver))"> 
                                       
                                        <b>{{ weaponManeuver?.name }}</b>  <i> ( use when {{  weaponManeuver?.use_when }})</i>  : {{weaponManeuver?.effect }}<br></br>
                                    </div>
                                 
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </template>
    </v-dialog>
</template>

<style></style>