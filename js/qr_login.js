<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>QRログイン</title>
  <script src="https://unpkg.com/html5-qrcode"></script>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 30px; }
    #reader { width: 300px; margin: auto; }
  </style>
</head>
<body>
  <h1>QRログイン</h1>
  <div id="reader"></div>
  <p id="status"></p>

  <script>
    function onScanSuccess(decodedText) {
      localStorage.setItem("currentStudent", decodedText);
      document.getElementById("status").textContent = `✅ ようこそ、${decodedText} さん！`;
      setTimeout(() => location.href = "index.html", 1500);
    }

    new Html5Qrcode("reader").start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onScanSuccess
    );
  </script>
</body>
</html>
