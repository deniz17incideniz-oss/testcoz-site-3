(function () {
  const letters = ["A", "B", "C", "D", "E"];
  const params = new URLSearchParams(window.location.search);
  let test = null;
  let answers = [];
  let currentIndex = 0;

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  function showError(message) {
    document.getElementById("personalStatus").style.display = "";
    document.getElementById("personalStatus").querySelector("p").textContent = message || "Kişiye özel test alınamadı.";
    document.getElementById("questionArea").style.display = "none";
  }

  function updateProgress() {
    const progress = Math.round(((currentIndex + 1) / test.questions.length) * 100);
    document.getElementById("testBarFill").style.width = progress + "%";
    document.querySelector(".test-counter").textContent = "Soru " + (currentIndex + 1) + " / " + test.questions.length;
    document.querySelector(".test-score").textContent = answers.filter(function (answer) { return answer !== null; }).length + " Cevaplandı";
  }

  function renderQuestion() {
    const question = test.questions[currentIndex];
    const selected = answers[currentIndex];
    const image = question.image ? '<img class="question-image" src="' + escapeHtml(question.image) + '" alt="' + escapeHtml(question.imageAlt || "Soru görseli") + '">' : "";
    const choices = question.choices.map(function (choice, index) {
      return '<button type="button" class="option-btn' + (selected === index ? " is-selected" : "") + '" data-choice="' + index + '"><span class="option-letter">' + letters[index] + '</span><span>' + escapeHtml(choice) + '</span></button>';
    }).join("");
    document.getElementById("questionArea").innerHTML = '<div class="question-card">' + image + '<p class="question-text">' + escapeHtml(question.question) + '</p><div class="options-grid">' + choices + '</div><div class="test-nav"><button type="button" class="btn btn-outline btn-sm" id="previousQuestion"' + (currentIndex === 0 ? " disabled" : "") + '>← Önceki</button><button type="button" class="btn btn-ghost btn-sm" id="skipQuestion">Geç</button><button type="button" class="btn btn-primary btn-sm" id="nextQuestion">' + (currentIndex === test.questions.length - 1 ? "Testi Bitir" : "Sonraki Soru →") + '</button></div></div>';
    updateProgress();
    document.querySelectorAll("[data-choice]").forEach(function (button) { button.addEventListener("click", function () { answers[currentIndex] = Number(button.dataset.choice); renderQuestion(); }); });
    document.getElementById("previousQuestion").addEventListener("click", function () { if (currentIndex > 0) { currentIndex -= 1; renderQuestion(); } });
    document.getElementById("skipQuestion").addEventListener("click", goNext);
    document.getElementById("nextQuestion").addEventListener("click", goNext);
  }

  function goNext() {
    if (currentIndex < test.questions.length - 1) { currentIndex += 1; renderQuestion(); }
    else showResult();
  }

  function showResult() {
    const correct = answers.filter(function (answer, index) { return answer === test.questions[index].correctAnswer; }).length;
    const reviewIndexes = answers.map(function (answer, index) { return answer === null || answer !== test.questions[index].correctAnswer ? index : -1; }).filter(function (index) { return index >= 0; });
    const empty = answers.filter(function (answer) { return answer === null; }).length;
    const wrong = reviewIndexes.length - empty;
    const percentage = Math.round((correct / test.questions.length) * 100);
    const reviews = reviewIndexes.length ? '<section class="wrong-review"><h2>Tekrar Bakabileceğin Sorular</h2>' + reviewIndexes.map(function (index) {
      const question = test.questions[index];
      const isEmpty = answers[index] === null;
      return '<article class="wrong-item"><div class="wrong-item-number">' + (index + 1) + '. Soru</div><h3>' + escapeHtml(question.question) + '</h3><dl><div><dt>Senin cevabın</dt><dd class="' + (isEmpty ? "val-empty" : "val-wrong") + '">' + (isEmpty ? "Bu soru boş bırakıldı" : escapeHtml(question.choices[answers[index]])) + '</dd></div><div><dt>Doğru cevap</dt><dd class="val-correct">' + escapeHtml(question.choices[question.correctAnswer]) + '</dd></div></dl><p><strong>Çözüm:</strong> ' + escapeHtml(question.explanation) + '</p></article>';
    }).join("") + '</section>' : '<div class="all-correct">🎉 Harika! Yanlış cevapladığın soru yok.</div>';
    document.getElementById("questionArea").style.display = "none";
    document.querySelector(".test-counter").textContent = "Test Tamamlandı";
    document.querySelector(".test-score").textContent = correct + " / " + test.questions.length + " Doğru";
    const resultArea = document.getElementById("resultArea");
    resultArea.style.display = "";
    resultArea.innerHTML = '<div class="result-card"><div class="result-score">%' + percentage + '</div><div class="result-label">Kişiye özel çalışmanı tamamladın.</div><div class="result-stats"><div class="result-stat"><div class="result-stat-val val-correct">' + correct + '</div><div class="result-stat-lbl">Doğru</div></div><div class="result-stat"><div class="result-stat-val val-wrong">' + wrong + '</div><div class="result-stat-lbl">Yanlış</div></div><div class="result-stat"><div class="result-stat-val val-empty">' + empty + '</div><div class="result-stat-lbl">Boş</div></div></div><div class="result-actions"><a href="panel.html" class="btn btn-primary">Panele Dön</a><button type="button" class="btn btn-outline" id="restartTest">Tekrar Çöz</button></div></div>' + reviews;
    fetch("/api/save-test-result", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ personalTestId: test.id, questionIds: test.questions.map(function (q) { return q.id; }), answers })
    }).catch(function () {});
    document.getElementById("restartTest").addEventListener("click", function () { answers = new Array(test.questions.length).fill(null); currentIndex = 0; resultArea.style.display = "none"; document.getElementById("questionArea").style.display = ""; renderQuestion(); });
  }

  async function init() {
    try {
      const id = params.get("id");
      if (!id) throw new Error("Test ID eksik.");
      const response = await fetch("/api/personal-test?id=" + encodeURIComponent(id), { headers: { Accept: "application/json" } });
      const result = await response.json();
      if (response.status === 401) return window.location.replace("giris.html");
      if (!response.ok) throw new Error(result.message);
      test = result.test;
      answers = new Array(test.questions.length).fill(null);
      document.getElementById("personalTestTitle").textContent = test.title;
      document.getElementById("personalTestSubtitle").textContent = "10 soru · Yanlış ve boş sorulara göre çalışma";
      renderQuestion();
    } catch (error) {
      showError(error.message);
    }
  }

  init();
})();
