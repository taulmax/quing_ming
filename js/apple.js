// 초기 게임 데이터
let initGameData = {
  money: 0,
  item: "iPhone",
  stage: 1,
};

// 현재 데이터
let currentGameData = { ...initGameData };

// 아이템 별 정보
const itemInfo = {
  iPhone: {
    title: "아이폰",
    success: 0.6,
    clickMoney: 10,
    cost: 100,
  },
  iPad: {
    title: "아이패드",
    success: 0.5,
    clickMoney: 25,
    cost: 500,
  },
  macBookAir: {
    title: "맥북 에어",
    success: 0.4,
    degration: 0.25,
    clickMoney: 50,
    cost: 1000,
  },
  macBookPro: {
    title: "맥북 프로",
    success: 0.2,
    degration: 0.5,
    destruction: 0.4,
    clickMoney: 100,
    cost: 3000,
  },
  macStudio: {
    title: "맥 스튜디오",
    success: 0.1,
    degration: 0.75,
    destruction: 0.6,
    clickMoney: 250,
    cost: 5000,
  },
  macPro: {
    title: "맥 프로",
    clickMoney: 500,
  },
};

// 스테이지 정보
const stageInfo = {
  1: "iPhone",
  2: "iPad",
  3: "macBookAir",
  4: "macBookPro",
  5: "macStudio",
  6: "macPro",
};

// 초기값 HTML에 세팅
const setInitGameData = () => {
  const currentMoney = document.getElementById("current_money");
  const currentItem = document.getElementById("current_item");
  const currentSuccess = document.getElementById("current_success");
  currentMoney.innerHTML = initGameData.money;
  showInfo(currentGameData.item);
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
      result_str = `강화 성공! ${stageInfo[stage]} => ${stageInfo[stage + 1]}`;
      break;
    case "failure":
      result_str = `강화 실패...`;
      break;
    case "degration":
      result_str = `강화 실패... 등급 하락... ${stageInfo[stage]} => ${
        stageInfo[stage - 1]
      }`;
      break;
    case "destruction":
      result_str = `파괴되었습니다 - ${stageInfo[stage]} => ${stageInfo[1]}`;
      break;
  }
  document.getElementById("enhance_result").innerHTML = result_str;
};

// 강화, 하락, 파괴 시 확률 넣어주는 함수
const showInfo = (item) => {
  const { title, cost, success, degration, destruction } = itemInfo[item];

  document.getElementById("current_item").innerHTML = title;
  document.getElementById("cost").innerHTML = cost;

  // 성공 확률
  if (success) {
    document.getElementById("current_success").innerHTML = `성공 확률:${
      success * 100
    }%`;
  } else {
    document.getElementById("current_success").innerHTML = "";
  }

  // 하락 확률
  if (degration) {
    document.getElementById("current_degration").innerHTML = `하락 확률:${
      degration * 100
    }%`;
  } else {
    document.getElementById("current_degration").innerHTML = "";
  }

  // 파괴 확률
  if (destruction) {
    document.getElementById("current_destruction").innerHTML = `파괴 확률:${
      destruction * 100
    }%`;
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
  if (!destructionRate) return; // 파괴 확률 없으면 끝
  if (randomNumber < destructionRate) {
    showResult("destruction", currentGameData.stage);
    currentGameData.stage = 1;
    currentGameData.item = stageInfo[currentGameData.stage];
    showInfo(currentGameData.item);
    return;
  }

  // 하락 확률에 당첨되면 하락
  const degrationRate = itemInfo[currentGameData.item].degration;
  if (!degrationRate) return; // 하락 확률 없으면 끝
  if (randomNumber < degrationRate) {
    showResult("degration", currentGameData.stage);
    currentGameData.stage -= 1;
    currentGameData.item = stageInfo[currentGameData.stage];
    showInfo(currentGameData.item);
    return;
  }

  showResult("failure", currentGameData.stage);
};

// 그거 추가하자 성공 토스트 메시지 같은거
// 강화 성공!! 아이폰 => 맥북 에어!
// 강화 실패...
// 강화 실패... 등급 하락! 맥북 에어 => 아이폰
// 파괴되었습니다.. 맥북 프로 => 아이폰
