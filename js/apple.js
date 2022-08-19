// 초기 게임 데이터
let initGameData = {
  money: 0,
  item: "appleWatch",
  stage: 1,
};

// 현재 데이터
let currentGameData = { ...initGameData };

// 아이템 별 정보
const itemInfo = {
  appleWatch: {
    title: "애플워치 > 아이폰",
    className: "appleWatch",
    success: 0.6,
    degration: 0,
    destruction: 0,
    clickMoney: 10,
    cost: 100,
  },
  iPhone: {
    title: "아이폰 > 아이패드",
    className: "iPhone",
    success: 0.5,
    degration: 0,
    destruction: 0,
    clickMoney: 25,
    cost: 500,
  },
  iPad: {
    title: "아이패드 > 맥북 에어",
    className: "iPad",
    success: 0.4,
    degration: 0.25,
    destruction: 0,
    clickMoney: 50,
    cost: 1000,
  },
  macBookAir: {
    title: "맥북 에어 > 맥북 프로",
    className: "macBookAir",
    success: 0.2,
    degration: 0.5,
    destruction: 0.4,
    clickMoney: 100,
    cost: 3000,
  },
  macBookPro: {
    title: "맥북 프로 > 맥 프로",
    className: "macBookPro",
    success: 0.1,
    degration: 0.75,
    destruction: 0.6,
    clickMoney: 250,
    cost: 5000,
  },
  macPro: {
    title: "맥 프로",
    className: "macPro",
    success: "?",
    degration: "?",
    destruction: "?",
    clickMoney: 500,
    cost: "?",
  },
};

// 스테이지 정보
const stageInfo = {
  1: "appleWatch",
  2: "iPhone",
  3: "iPad",
  4: "macBookAir",
  5: "macBookPro",
  6: "macPro",
};

// 초기값 HTML에 세팅
const setInitGameData = () => {
  const currentMoney = document.getElementById("current_money");
  const currentItem = document.getElementById("current_item");
  const currentSuccess = document.getElementById("current_success");
  currentGameData = { ...initGameData };
  currentMoney.innerHTML = initGameData.money;
  showInfo(currentGameData.item);
  document.getElementById("enhance_result").innerHTML = "";
};

// 돈 벌기 클릭
const gainMoney = () => {
  const currentMoney = document.getElementById("current_money");
  currentGameData.money += itemInfo[currentGameData.item].clickMoney;
  currentMoney.innerHTML = currentGameData.money;
};

// 강화 결과 출력
const showResult = (result, stage) => {
  let result_str = "";
  switch (result) {
    case "success":
      // result_str = `강화 성공! ${stageInfo[stage]} => ${stageInfo[stage + 1]}`;
      result_str = `강화 성공!`;
      break;
    case "failure":
      result_str = `강화 실패...`;
      break;
    case "degration":
      result_str = `강화 실패... 등급 하락...`;
      // result_str = `강화 실패... 등급 하락... ${stageInfo[stage]} => ${
      //   stageInfo[stage - 1]
      // }`;
      break;
    case "destruction":
      result_str = `파괴되었습니다`;
      // result_str = `파괴되었습니다 - ${stageInfo[stage]} => ${stageInfo[1]}`;
      break;
  }
  document.getElementById("enhance_result").innerHTML = result_str;
};

// 강화, 하락, 파괴 시 확률 넣어주는 함수
const showInfo = (item) => {
  const { title, className, cost, success, degration, destruction } =
    itemInfo[item];

  document.getElementById("current_item").innerHTML = title;
  document.getElementById("cost").innerHTML = cost;

  const itemImage = document.getElementById("item_image");
  for (let classItem of itemImage.classList) {
    if (classItem !== "item_image") {
      itemImage.classList.remove(classItem);
    }
  }
  itemImage.classList.add(className);

  // 성공 확률
  if (success || success === 0) {
    if (success === "?") {
      document.getElementById("current_success").innerHTML = "성공 확률: ???";
    } else {
      document.getElementById("current_success").innerHTML = `성공 확률: ${
        success * 100
      }%`;
    }
  } else {
    document.getElementById("current_success").innerHTML = "";
  }

  // 하락 확률
  if (degration || degration === 0) {
    if (degration === "?") {
      document.getElementById("current_degration").innerHTML = "하락 확률: ???";
    } else {
      document.getElementById("current_degration").innerHTML = `하락 확률: ${
        degration * 100
      }%`;
    }
  } else {
    document.getElementById("current_degration").innerHTML = "";
  }

  // 파괴 확률
  if (destruction || destruction === 0) {
    if (destruction === "?") {
      document.getElementById("current_destruction").innerHTML =
        "파괴 확률: ???";
    } else {
      document.getElementById("current_destruction").innerHTML = `파괴 확률: ${
        destruction * 100
      }%`;
    }
  } else {
    document.getElementById("current_destruction").innerHTML = "";
  }
};

// 강화하기 클릭
const enhance = () => {
  const currentMoney = document.getElementById("current_money");
  // 강화비용 내기
  if (currentGameData.money >= itemInfo[currentGameData.item].cost) {
    currentGameData.money -= itemInfo[currentGameData.item].cost;
    currentMoney.innerHTML = currentGameData.money;
  } else {
    // 없으면 나가리
    return;
  }

  // 확률따라 강화
  const currentItem = document.getElementById("current_item");
  const randomNumber = Math.random();
  const successRate = itemInfo[currentGameData.item].success;
  if (randomNumber < successRate) {
    showResult("success", currentGameData.stage);
    currentGameData.stage += 1;
    currentGameData.item = stageInfo[currentGameData.stage];
    showInfo(currentGameData.item);
    return;
  }

  // 파괴 확률에 당첨되면 1단계로 회귀
  const destructionRate = itemInfo[currentGameData.item].destruction;
  if (randomNumber < destructionRate) {
    showResult("destruction", currentGameData.stage);
    currentGameData.stage = 1;
    currentGameData.item = stageInfo[currentGameData.stage];
    showInfo(currentGameData.item);
    return;
  }

  // 하락 확률에 당첨되면 하락
  const degrationRate = itemInfo[currentGameData.item].degration;
  if (randomNumber < degrationRate) {
    showResult("degration", currentGameData.stage);
    currentGameData.stage -= 1;
    currentGameData.item = stageInfo[currentGameData.stage];
    showInfo(currentGameData.item);
    return;
  }

  showResult("failure", currentGameData.stage);
};

// 시연용 치트
let cheatCount = 0;
const cheat = () => {
  if (cheatCount === 2) {
    const currentMoney = document.getElementById("current_money");
    currentGameData.money += 1000000;
    currentMoney.innerHTML = currentGameData.money;
    cheatCount = 0;
  } else {
    cheatCount += 1;
  }
};
