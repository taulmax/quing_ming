// 페이지 이동 함수
const moveTo = (prev, next) => {
  const prevPage = document.getElementById(prev);
  const nextPage = document.getElementById(next);
  prevPage.style.display = "none";
  nextPage.style.display = "block";
};
