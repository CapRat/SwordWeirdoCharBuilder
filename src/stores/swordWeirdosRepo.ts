import { defineStore } from 'pinia'
import sword_weirdos_repository from "@/assets/sword_weirdos_repository.json"
import WarbandEntity from '@/model/WarbandEntity'

export const useSwordWeirdosRepo = defineStore('swordWeirdosRepo', {
    state: () => {
      return sword_weirdos_repository
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
      updateSwordWeirdoRepo(newSwordWeirdoRepo:string){
        const repo=JSON.parse(newSwordWeirdoRepo);
        for (const [key, value] of Object.entries(repo)) {
          this[key]=value
        }
      },
      getCurrentStoreAsString(){
        const jsonObj={}
        for (const [key, value] of Object.entries(this)) {
          if(!["$id","_isOptionsAPI"].includes(key)){
            jsonObj[key]=value
          }
        }

        return JSON.stringify(jsonObj, null, 4);
      },
      getClassWithID(name:string){
        return this.classes.find((element) => element.id==name)
      },
      getWeaponWithID(name:string){
        return this.weapons.find((element) => element.id==name)
      },
      getWeaponsPropertyWithID(name:string){
        return this['weapon-properties'].find((element) => element.id==name)
      },
      getManeuverWithID(name:string){
        return this.maneuvers.find((element) => element.id==name)
      },
      getSpellWithID(name:string){
        return this.spells.find((element) => element.id==name)
      },
      getLeaderTraitWithID(leaderTraitID:string){
        return this.leader_traits.find((element) => element.id==leaderTraitID)
      },
      getWarbandTraitWithID(warbandTraitID:string){
        return this.warband_traits.find((element) => element.id==warbandTraitID)
      },
      getStatWithLevel(statName:string, level:number){
        return this.stats[statName].find((element) => element.level==level)
      }
    
    },
  })