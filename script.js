document.getElementById("ocr-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const imageInput = document.getElementById("image-input");
  const resultDiv = document.getElementById("result");

  if (!imageInput.files.length) {
    resultDiv.innerHTML = "<p>Please select an image.</p>";
    return;
  }

  const file = imageInput.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("apikey", "bbef5d657f88957"); // ✅ Replace with your own API key
  formData.append("language", "eng");
  formData.append("isTable", "true");
  formData.append("OCREngine", "2");

  resultDiv.innerHTML = "⏳ Extracting text...";

  try {
    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.IsErroredOnProcessing) {
      resultDiv.innerHTML = "❌ OCR failed. Please try another image.";
      return;
    }

    const text = data.ParsedResults[0].ParsedText;
    resultDiv.innerHTML = `<h3>📝 Extracted Text:</h3><pre>${text}</pre>`;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "⚠️ An error occurred. Please try again.";
  }
});
