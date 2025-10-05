function getCurrentName() {
  return localStorage.getItem("currentStudent");
}

// 練習記録（段別）
function saveProgress(dan, correct, total) {
  const name = getCurrentName();
  const key = `studentProgress_${name}`;
  const progress = JSON.parse(localStorage.getItem(key)) || {};
  if (!progress[dan]) progress[dan] = { correct: 0, total: 0 };
  progress[dan].correct += correct;
  progress[dan].total += total;
  localStorage.setItem(key, JSON.stringify(progress));
  saveProgressHistory(name, dan, correct, total);
}

// 練習履歴（日付別）
function saveProgressHistory(name, dan, correct, total) {
  const key = `studentProgressHistory_${name}`;
  const today = new Date().toISOString().slice(0, 10);
  const history = JSON.parse(localStorage.getItem(key)) || {};
  if (!history[today]) history[today] = {};
  if (!history[today][dan]) history[today][dan] = { correct: 0, total: 0 };
  history[today][dan].correct += correct;
  history[today][dan].total += total;
  localStorage.setItem(key, JSON.stringify(history));
}

// ポイント加算＋バッジ獲得判定
function addPoints(dan, amount) {
  const name = getCurrentName();
  const key = `studentData_${name}`;
  const data = JSON.parse(localStorage.getItem(key)) || { pointsByDan: {}, badges: [] };
  if (!data.pointsByDan[dan]) data.pointsByDan[dan] = 0;
  data.pointsByDan[dan] += amount;

  // ポイント通知演出
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.left = "50%";
  container.style.transform = "translateX(-50%)";
  container.style.background = "#4caf50";
  container.style.color = "white";
  container.style.padding = "10px 20px";
  container.style.borderRadius = "10px";
  container.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  container.style.fontSize = "1.1em";
  container.style.zIndex = "9999";
  container.textContent = `✅ ${dan}の段 +${amount}ポイント！`;
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 2000);

  // バッジ獲得判定
  const badgeId = `Dan${dan}_Master45`;
  if (data.pointsByDan[dan] >= 45 && !data.badges.includes(badgeId)) {
    data.badges.push(badgeId);
    showBadgeNotification([formatBadgeName(badgeId)]);
  }

  localStorage.setItem(key, JSON.stringify(data));
}

// バッジ名の整形（表示用）
function formatBadgeName(badgeId) {
  if (badgeId.startsWith("Dan") && badgeId.includes("_NoteBadge")) {
    const dan = badgeId.match(/^Dan(\d)_NoteBadge$/)[1];
    return `🎵 ${dan}の段・音符バッジ`;
  }
  if (badgeId === "NoteBadge_Complete") return "🎶 コンプリート音符バッジ";
  if (badgeId.startsWith("Dan") && badgeId.includes("_Master45")) {
    const dan = badgeId.match(/^Dan(\d)_Master45$/)[1];
    return `🥇 ${dan}の段・マスターバッジ`;
  }
  return badgeId;
}

// バッジ獲得演出
function showBadgeNotification(badgeNames) {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "20px";
  container.style.left = "50%";
  container.style.transform = "translateX(-50%)";
  container.style.background = "#ffeb3b";
  container.style.color = "#333";
  container.style.padding = "15px 25px";
  container.style.borderRadius = "12px";
  container.style.boxShadow = "0 0 10px #999";
  container.style.fontSize = "1.2em";
  container.style.zIndex = "9999";
  container.textContent = `🎉 新しいバッジをゲット！ ${badgeNames.join(", ")}`;
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 4000);
}

// 苦手問題記録
function recordMistake(problemText) {
  const name = getCurrentName();
  const key = `studentMistakes_${name}`;
  const mistakes = JSON.parse(localStorage.getItem(key)) || {};
  if (!mistakes[problemText]) mistakes[problemText] = 0;
  mistakes[problemText]++;
  localStorage.setItem(key, JSON.stringify(mistakes));
}

// 正誤履歴（段別）
function updateProgressHistory(dan, isCorrect) {
  const name = getCurrentName();
  const key = `studentHistory_${name}`;
  const history = JSON.parse(localStorage.getItem(key)) || {};
  if (!history[dan]) history[dan] = { correct: 0, wrong: 0 };
  if (isCorrect) {
    history[dan].correct++;
  } else {
    history[dan].wrong++;
  }
  localStorage.setItem(key, JSON.stringify(history));
}

// バッジ獲得チェック（別途呼び出し可能）
function checkBadge(dan) {
  const name = getCurrentName();
  const key = `studentData_${name}`;
  const data = JSON.parse(localStorage.getItem(key)) || { pointsByDan: {}, badges: [] };
  const badgeId = `Dan${dan}_Master45`;
  if (data.pointsByDan[dan] >= 45 && !data.badges.includes(badgeId)) {
    data.badges.push(badgeId);
    showBadgeNotification([formatBadgeName(badgeId)]);
    localStorage.setItem(key, JSON.stringify(data));
  }
}
