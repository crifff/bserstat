package masterdata

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

var ItemArmorList []ItemArmor

func init() {
	f, err := os.Open("./../data/ItemArmor.json")
	if err != nil {
		panic(err)
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		panic(err)
	}
	if err := json.Unmarshal(b, &ItemArmorList); err != nil {
		panic(err)
	}
}

type ItemArmor struct {
	Code                          int     `json:"code"`
	Name                          string  `json:"name"`
	ItemType                      string  `json:"itemType"`
	ArmorType                     string  `json:"armorType"`
	ItemGrade                     string  `json:"itemGrade"`
	CraftAnimTrigger              string  `json:"craftAnimTrigger"`
	Stackable                     int     `json:"stackable"`
	InitialCount                  int     `json:"initialCount"`
	MakeMaterial1                 int     `json:"makeMaterial1"`
	MakeMaterial2                 int     `json:"makeMaterial2"`
	AttackPower                   int     `json:"attackPower"`
	Defense                       int     `json:"defense"`
	MaxHp                         int     `json:"maxHp"`
	MaxSp                         int     `json:"maxSp"`
	HpRegenRatio                  float64 `json:"hpRegenRatio"`
	HpRegen                       float64 `json:"hpRegen"`
	SpRegenRatio                  float64 `json:"spRegenRatio"`
	SpRegen                       float64 `json:"spRegen"`
	AttackSpeedRatio              float64 `json:"attackSpeedRatio"`
	CriticalStrikeChance          float64 `json:"criticalStrikeChance"`
	CriticalStrikeDamage          float64 `json:"criticalStrikeDamage"`
	PreventCriticalStrikeDamaged  float64 `json:"preventCriticalStrikeDamaged"`
	CooldownReduction             float64 `json:"cooldownReduction"`
	LifeSteal                     float64 `json:"lifeSteal"`
	MoveSpeed                     float64 `json:"moveSpeed"`
	SightRange                    float64 `json:"sightRange"`
	OutOfCombatMoveSpeed          float64 `json:"outOfCombatMoveSpeed"`
	AttackRange                   float64 `json:"attackRange"`
	IncreaseBasicAttackDamage     int     `json:"increaseBasicAttackDamage"`
	PreventBasicAttackDamaged     int     `json:"preventBasicAttackDamaged"`
	IncreaseSkillDamage           int     `json:"increaseSkillDamage"`
	PreventSkillDamaged           int     `json:"preventSkillDamaged"`
	IncreaseSkillDamageRatio      float64 `json:"increaseSkillDamageRatio"`
	PreventSkillDamagedRatio      float64 `json:"preventSkillDamagedRatio"`
	DecreaseRecoveryToBasicAttack int     `json:"decreaseRecoveryToBasicAttack"`
	DecreaseRecoveryToSkill       int     `json:"decreaseRecoveryToSkill"`
}
