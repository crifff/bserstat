namespace BserStat {
  namespace Character {
    interface Response {
      BaseWinRate: Mode[]
      CharacterList: Character[]
    }

    interface Character {
      Name: string
      RankWeaponList: Weapon[]
    }

    interface Weapon {
      Name: string
      // Code: number
      ModeList: Mode[]
    }
    interface Mode extends Object {
      Mode: string
      WinRate: number
      PickRate: number
      AverageRank: number
      PlayerKill: number
      [key: string]: number
    }
  }
  namespace Weapon {
    interface Response {
      BaseWinRate: Mode[]
      CharacterList: Character[]
    }

    interface Character {
      Name: string
      WeaponTypeList: WeaponType[]
    }

    interface WeaponType {
      Name: string
      WeaponList: Weapon[]
    }

    interface Weapon {
      Name: string
      // Code: number
      ModeList: Mode[]
    }

    interface Mode extends Object {
      Mode: string
      WinRate: number
      PickRate: number
      [key: string]: number
    }
  }
  namespace Armor {
    interface Response {
      BaseWinRate: Mode[]
      TypeList: ArmorType[]
    }

    interface ArmorType {
      Name: string
      ArmorList: Armor[]
    }

    interface Armor {
      Name: string
      // Code: number
      ModeList: Mode[]
    }

    interface Mode extends Object {
      Mode: string
      WinRate: number
      PickRate: number

      [key: string]: number
    }
  }
}