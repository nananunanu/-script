import { world, EntityComponentTypes, EquipmentSlot, system } from "@minecraft/server";
//"STR", "DEX", "CRI", "SPD", "MANA", "HP", "INT"

system.runInterval(() => {
  world.getAllPlayers().forEach((player) => {
    if (player && player.typeId === "minecraft:player") {
      const playerEquippable = player.getComponent(EntityComponentTypes.Equippable);
      const playerHoldItem = playerEquippable.getEquipment(EquipmentSlot.Mainhand);
  
      // 기본값 설정
      let str = 0;
      let dex = 0;
      let cri = 0;
      let spd = 0;
      let mana = 0;
      let hp = 0;
      let int = 0;
  
      if (playerHoldItem) {
        const lore = playerHoldItem.getLore();
  
        for (const line of lore) {
          // STR
          const strMatch = line.match(/STR \+([+-]?\d+)/i); //정규식으로 값 추출
          if (strMatch) {
            str = parseInt(strMatch[1]);
          }
          // DEX
          const dexMatch = line.match(/DEX \+([+-]?\d+)/i);
          if (dexMatch) {
            dex = parseInt(dexMatch[1]);
          }
          // CRI
          const criMatch = line.match(/CRI \+([+-]?\d+)/i);
          if (criMatch) {
            cri = parseInt(criMatch[1]);
          }
          // SPD
          const spdMatch = line.match(/SPD \+([+-]?\d+)/i);
          if (spdMatch) {
            spd = parseInt(spdMatch[1]);
          }
          // MANA
          const manaMatch = line.match(/MANA \+([+-]?\d+)/i);
          if (manaMatch) {
            mana = parseInt(manaMatch[1]);
          }
          // HP
          const hpMatch = line.match(/HP \+([+-]?\d+)/i);
          if (hpMatch) {
            hp = parseInt(hpMatch[1]);
          }
          // INT
          const intMatch = line.match(/INT \+([+-]?\d+)/i);
          if (intMatch) {
            int = parseInt(intMatch[1]);
          }
        }
      }
  
      // 스코어보드에 업데이트
        player.runCommand(`scoreboard players set @s str ${str}`);
        player.runCommand(`scoreboard players set @s dex ${dex}`);
        player.runCommand(`scoreboard players set @s cri ${cri}`);
        player.runCommand(`scoreboard players set @s spd ${spd}`);
        player.runCommand(`scoreboard players set @s mana ${mana}`);
        player.runCommand(`scoreboard players set @s hp ${hp}`);
        player.runCommand(`scoreboard players set @s int ${int}`);
    }
  });
});
