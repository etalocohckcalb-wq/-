// js/chart.min.js（簡易版 Chart.js 風）
function drawBarChart(canvasId, labels, data) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const barWidth = width / labels.length;
  const maxValue = Math.max(...data);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < data.length; i++) {
    const barHeight = (data[i] / maxValue) * (height - 50);
    const x = i * barWidth + 10;
    const y = height - barHeight - 30;

    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(x, y, barWidth - 20, barHeight);

    ctx.fillStyle = "#000";
    ctx.font = "14px sans-serif";
    ctx.fillText(labels[i], x + 5, height - 10);
    ctx.fillText(data[i], x + 5, y - 5);
  }
}
