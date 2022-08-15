// Game Start 버튼 클릭 => 게임 선택 페이지로 이동
const moveTo = (prev, next) => {
  const prevPage = document.getElementById(prev);
  const nextPage = document.getElementById(next);
  prevPage.style.display = "none";
  nextPage.style.display = "block";
};
