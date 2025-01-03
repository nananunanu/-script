import { EntityComponentTypes, EquipmentSlot, system } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id === "lanos:option") {
    if (event.sourceEntity !== void 0 && event.sourceEntity.typeId === "minecraft:player") {
      const player = event.sourceEntity;

      //추가옵션 ui
      const form = new ModalFormData();
      form.title("추가옵션");
      form.dropdown("등급:", ["일반", "고급"], 0);
      
      form.show(player).then((result) => {
        if (result.canceled) return;

        // 스탯 리스트
        const options = ["STR", "DEX", "CRI", "SPD", "MANA", "HP", "INT"];
        const randomOptions = getRandomOptions(options, 3); // 여기 숫자가 랜덤으로 옵션 몇개 나오게 할건지 정하는거

        // 스탯 각각의 옵션 수치 세팅
        const optionValues = randomOptions.map(attr => ({
          option: attr,
          value: Math.floor(Math.random() * 3) + 1 //1~3
        }));

        const playerEquippable = player.getComponent(EntityComponentTypes.Equippable);
        const playerHoldItem = playerEquippable.getEquipment(EquipmentSlot.Mainhand);

        if (!playerHoldItem) {
          player.sendMessage("\xA7c손에 아이템을 들고 해주세요.");
          return;
        }
        
        //아이템 로어 불러온 후 삭제
        const lore = playerHoldItem.getLore();
        let newLore = lore.filter(line =>!line.includes("추가옵션") && !line.includes("STR") && !line.includes("DEX") && !line.includes("CRI") && !line.includes("SPD") && !line.includes("MANA") && !line.includes("HP") && !line.includes("INT"));
        
        // 새로운 로어어 추가
        newLore.unshift("\xA7r추가옵션");

        optionValues.forEach(({ option, value }) => {
          newLore.push(`\xA7r\xA77${option} +${value}`);
        });

        // 아이템에 새로운 로어 설정
        playerHoldItem.setLore(newLore);
        playerEquippable.setEquipment(EquipmentSlot.Mainhand, playerHoldItem);

        // 결과 메세지 출력
        player.sendMessage(`\xA7a결과: ${optionValues.map(attr => `${attr.option} +${attr.value}`).join(", ")}`);
      });
    }
  }
});

function getRandomOptions(options, n) {
  const shuffled = options.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}
