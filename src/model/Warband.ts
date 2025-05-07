import WarbandEntity from "./WarbandEntity";
import { evaluate } from "mathjs";
import { useSwordWeirdosRepo } from "@/stores/swordWeirdosRepo"

let swordRepo = useSwordWeirdosRepo()
export default class Warband {
    public entities: WarbandEntity[] = [];
    public name: string = ""
    public warbandTrait: string = ""
    public points: number = 100

    public getSharedClass(): string[] {
        var ret: string[] = []
        if (this.entities.length >= 1) {
            for (const myClass of this.entities[0].classes) {
                if (this.entities.every(x => x.classes.length == 0 || x.classes.some(x => x == myClass))) {
                    ret.push(myClass)
                }
            }
        }
        return ret

    }
    public getUsedNumberOfClass(classID: string) {
        return this.entities.filter(entity => entity.classes.some(curClassID => curClassID == classID)).length
    }
    public getClassLimit(classID: string, isLeader = false): number | undefined {
        var maxLimit = swordRepo.getClassWithID(classID)?.limit
        var warbandTrait = swordRepo.getWarbandTraitWithID(this.warbandTrait)
        if (warbandTrait != undefined && warbandTrait["class-limit-mod"] != undefined) {
            for (const classLimitMod of warbandTrait["class-limit-mod"]) {
                if (classLimitMod.name != undefined && classLimitMod["max-of-class"] != undefined) {
                    if (classLimitMod.name == classID || classLimitMod.name == "*") {
                        maxLimit = evaluate(classLimitMod["max-of-class"], { "x": maxLimit, "limit": maxLimit })
                    }
                }
                if (classLimitMod.tag != undefined) {
                    //1 class must be shared by every model in the warband and not have a limit to how many a warband may have.
                    if (classLimitMod.tag == "must-share-one-class") {
                        if (this.entities.length >= 1) {
                            if (this.getSharedClass().length != 0) {
                                if (this.getSharedClass().includes(classID)) {
                                    maxLimit = Number.MAX_VALUE
                                }
                            }
                        }
                    }
                    // leader can pick ny class, not dependent for mod (but normal restriction)
                    if (classLimitMod.tag == "leader-can-pick-everthing") {
                        if (isLeader)
                            maxLimit = swordRepo.getClassWithID(classID)?.limit
                    }
                    
                }
            }
        }

        if (maxLimit == undefined) maxLimit = swordRepo.getClassWithID(classID)?.limit
        return maxLimit
    }
    public getHowManyClassPicksLeft(classID: string, isLeader = false) {
        var classLimit = this.getClassLimit(classID, isLeader)
        if (classLimit == undefined) {
            return Number.MAX_VALUE
        }
        return classLimit - this.getUsedNumberOfClass(classID)
    }
    public getClassesToIgnore(isLeader = false): string[] {
        return swordRepo.classes.filter(classEntity => this.getHowManyClassPicksLeft(classEntity.id, isLeader) <= 0).map(classEntity => classEntity.id)
    }
    public reset() {
        this.entities = []
        this.name = ""
        this.warbandTrait = ""
        this.points = 100
    }
    public getAllUsedPoints() {
        return this.entities.map((entity) => entity.getPoints()).reduce((x, y) => x + y, 0)
    }

    public getErrors(): string[] {
        var errors: string[] = []

        var warbandTrait = swordRepo.getWarbandTraitWithID(this.warbandTrait)
        if (warbandTrait != undefined) {
            if (warbandTrait['class-limit-mod'] != undefined) {
                if (this.getSharedClass().length == 0 && warbandTrait['class-limit-mod'].some(x => x.tag != undefined && x.tag == 'must-share-one-class')) {
                    errors.push("Every model should have one class in common")
                }
                if (warbandTrait['class-limit-mod'].some(x => x.tag != undefined && x.tag == "must-be-half-in-warband")) {
                    var className=warbandTrait['class-limit-mod'].find(x=> x.tag != undefined && x.tag == "must-be-half-in-warband" && x.name!=undefined)?.name
                    var counter = 0
                    for (const entity of this.entities) {
                        if (entity.classes.some(c => c == className)) { counter++ }
                    }
                    if (counter < this.entities.length / 2) {
                        errors.push("Half of the Classes in Warband must be "+ className)
                    }
                }
            }
        }

        if (this.points < this.getAllUsedPoints()) {
            errors.push("Pointlimit reached!")
        }
        const maxPointsPerEntity=25
        for(const entity of this.entities){
            if(entity.isPowerful){
                if(entity.getPoints()> maxPointsPerEntity*2){
                    errors.push("Error " + entity.name +" has to many Points!")
                }
            }
            else{
                if(entity.getPoints()> maxPointsPerEntity){
                    errors.push("Error " + entity.name +" has to many Points!")
                }
            }
            
        }
        return errors
    }

    public getWarnings(): string[] {
        var warnings: string[] = []
        return warnings
    }
}