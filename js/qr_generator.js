<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>QRコード生成</title>
  <script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 30px; }
    canvas { margin: 10px; }
  </style>
</head>
<body>
  <h1>児童QRコード生成</h1>
  <select id="studentSelector"></select>
  <div id="qrArea"></div>

  <script>
    const selector = document.getElementById("studentSelector");
    const qrArea = document.getElementById("qrArea");

    const studentKeys = Object.keys(localStorage).filter(k => k.startsWith("studentData_"));
    const studentNames = studentKeys.map(k => k.replace("studentData_", ""));

    studentNames.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      selector.appendChild(option);
    });

    selector.addEventListener("change", () => {
      const name = selector.value;
      qrArea.innerHTML = "";
      QRCode.toCanvas(document.createElement("canvas"), name, (err, canvas) => {
        if (!err) qrArea.appendChild(canvas);
      });
    });

    if (studentNames.length > 0) {
      selector.value = studentNames[0];
      selector.dispatchEvent(new Event("change"));
    }
  </script>
</body>
</html>
