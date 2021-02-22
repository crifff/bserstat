package masterdata

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

var ItemWeaponList []ItemWeapon

func init() {
	f, err := os.Open("./../data/ItemWeapon.json")
	if err != nil {
		panic(err)
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		panic(err)
	}
	if err := json.Unmarshal(b, &ItemWeaponList); err != nil {
		panic(err)
	}
}

type ItemWeapon struct {
	Code                          int     `json:"code"`
	Name                          string  `json:"name"`
	ItemType                      string  `json:"itemType"`
	WeaponType                    string  `json:"weaponType"`
	ItemGrade                     string  `json:"itemGrade"`
	CraftAnimTrigger              string  `json:"craftAnimTrigger"`
	Stackable                     int     `json:"stackable"`
	InitialCount                  int     `json:"initialCount"`
	MakeMaterial1                 int     `json:"makeMaterial1"`
	MakeMaterial2                 int     `json:"makeMaterial2"`
	Consumable                    bool    `json:"consumable"`
	AttackPower                   int     `json:"attackPower"`
	Defense                       int     `json:"defense"`
	MaxHp                         int     `json:"maxHp"`
	HpRegenRatio                  float64 `json:"hpRegenRatio"`
	HpRegen                       float64 `json:"hpRegen"`
	SpRegenRatio                  float64 `json:"spRegenRatio"`
	SpRegen                       float64 `json:"spRegen"`
	AttackSpeedRatio              float64 `json:"attackSpeedRatio"`
	CriticalStrikeChance          float64 `json:"criticalStrikeChance"`
	CriticalStrikeDamage          float64 `json:"criticalStrikeDamage"`
	CooldownReduction             float64 `json:"cooldownReduction"`
	LifeSteal                     float64 `json:"lifeSteal"`
	MoveSpeed                     float64 `json:"moveSpeed"`
	SightRange                    float64 `json:"sightRange"`
	AttackRange                   float64 `json:"attackRange"`
	IncreaseBasicAttackDamage     int     `json:"increaseBasicAttackDamage"`
	IncreaseSkillDamage           int     `json:"increaseSkillDamage"`
	IncreaseSkillDamageRatio      float64 `json:"increaseSkillDamageRatio"`
	DecreaseRecoveryToBasicAttack int     `json:"decreaseRecoveryToBasicAttack"`
	DecreaseRecoveryToSkill       int     `json:"decreaseRecoveryToSkill"`
}
