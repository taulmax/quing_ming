// 첫 내 명령어 input focus
const focusMyLog = () => {
  document.querySelector(".terminal_input").focus();
};

// 히스토리 지우기
const deleteTerminal = () => {
  const terminalWrapper = document.querySelector(".terminal_wrapper");
  const pastLogs = document.querySelectorAll(".past_log");
  for (let pastLog of pastLogs) {
    terminalWrapper.removeChild(pastLog);
  }
};

// input onKeyUp Event
const onKeyUpTerminalInput = () => {
  const key = window.event.key;
  if (key === "Enter") {
    // 현재 터미널 input => span으로 변경
    const terminalWrapper = document.querySelector(".terminal_wrapper");
    const currentLog = document.querySelector(".current_log");
    const input = document.querySelector(".terminal_input");
    const value = input.value;
    currentLog.removeChild(input);
    const newSpan = document.createElement("span");
    newSpan.innerHTML = value;
    currentLog.appendChild(newSpan);
    currentLog.classList.add("past_log");
    currentLog.classList.remove("current_log");

    // 명령어 실행
    if (value === "whoami") {
      const newWhoamiLog = document.createElement("div");
      const whoIsMe = document.createElement("span");

      newWhoamiLog.classList.add("past_log");
      whoIsMe.innerHTML = "My name is Byeon Yeon!";
      newWhoamiLog.appendChild(whoIsMe);

      terminalWrapper.appendChild(newWhoamiLog);
    } else if (value === "pwd") {
      const newPwdLog = document.createElement("div");
      const pwd = document.createElement("span");

      newPwdLog.classList.add("past_log");
      pwd.innerHTML = "https://github.com/taulmax/quing_ming";
      newPwdLog.appendChild(pwd);

      terminalWrapper.appendChild(newPwdLog);
    } else if (value === "ls") {
      const newLsLog = document.createElement("div");
      const ls = document.createElement("span");

      newLsLog.classList.add("past_log");
      ls.innerHTML = "/home /terminal /apple  /sketch";
      newLsLog.appendChild(ls);

      terminalWrapper.appendChild(newLsLog);
    } else if (value.split(" ")[0] === "cd") {
      const path = value.split(" ")[1];
      const pathArray = ["home", "terminal", "apple", "sketch"];
      if (pathArray.includes(path)) {
        const pastLogs = document.querySelectorAll(".past_log");
        for (let pastLog of pastLogs) {
          terminalWrapper.removeChild(pastLog);
        }
        if (path === "terminal") {
          moveTo("terminalPage", "terminalPage");
        } else if (path === "apple") {
          moveTo("terminalPage", "appleStoreGamePage");
          setInitGameData();
        } else if (path === "sketch") {
          moveTo("terminalPage", "sketchPage");
        } else if (path === "home") {
          moveTo("terminalPage", "home");
        }
      } else {
        const newNoPathLog = document.createElement("div");
        const nopath = document.createElement("span");

        newNoPathLog.classList.add("past_log");
        nopath.innerHTML = "경로가 존재하지 않습니다.";
        newNoPathLog.appendChild(nopath);

        terminalWrapper.appendChild(newNoPathLog);
      }
    } else if (value === "clear") {
      const pastLogs = document.querySelectorAll(".past_log");
      for (let pastLog of pastLogs) {
        terminalWrapper.removeChild(pastLog);
      }
    } else if (value === "exit") {
      const pastLogs = document.querySelectorAll(".past_log");
      for (let pastLog of pastLogs) {
        terminalWrapper.removeChild(pastLog);
      }
      moveTo("terminalPage", "home");
    } else if (value === "") {
    } else {
      const noCommandLog = document.createElement("div");
      const command = document.createElement("span");

      noCommandLog.classList.add("past_log");
      command.innerHTML = `'${value}'은(는) 존재하지 않는 명령어입니다.`;
      noCommandLog.appendChild(command);

      terminalWrapper.appendChild(noCommandLog);
    }

    // 새로운 터미널 input 만들기
    const newCurrentLog = document.createElement("div");
    const thisIsMe = document.createElement("span");
    const newInput = document.createElement("input");

    newCurrentLog.classList.add("current_log");
    thisIsMe.classList.add("this_is_me");
    thisIsMe.innerHTML = "BY#log:~$";
    newInput.type = "text";
    newInput.classList.add("terminal_input");
    newInput.onkeyup = () => onKeyUpTerminalInput();
    newInput.autofocus = true;

    newCurrentLog.appendChild(thisIsMe);
    newCurrentLog.appendChild(newInput);
    terminalWrapper.appendChild(newCurrentLog);
    newInput.focus();
  }
};
