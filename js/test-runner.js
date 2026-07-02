(function () {
  const utils = window.TestCozUtils;
  const catalog = window.TESTCOZ_CATALOG;
  const params = utils.getParams();
  const classLevel = Number(params.sinif);
  const testNumber = Number(params.test || 1);
  const difficulty = params.zorluk || "kolay";
  const tests = window.TESTCOZ_TESTS || [];
  const test = tests.find(function (item) {
    return item.classLevel === classLevel && item.subject === params.ders && item.topic === params.konu && item.difficulty === difficulty && item.testNumber === testNumber;
  });
  const grade = catalog.grades[classLevel];
  const subject = grade && grade.subjects.find(function (item) { return item.id === params.ders; });
  const topic = subject && subject.topics.find(function (item) { return item.id === params.konu; });
  const letters = ["A", "B", "C", "D", "E"];
  let currentIndex = 0;
  let answers = test ? new Array(test.questions.length).fill(null) : [];

  function topicUrl() {
    return "konu.html?sinif=" + classLevel + "&ders=" + encodeURIComponent(params.ders || "");
  }

  function renderBreadcrumb() {
    if (!grade || !subject || !topic) return;
    document.getElementById("breadcrumb").innerHTML = '<a href="index.html">Ana Sayfa</a><span class="breadcrumb-sep">›</span>' +
      '<a href="sinif-' + classLevel + '.html">' + utils.escapeHtml(grade.name) + '</a><span class="breadcrumb-sep">›</span>' +
      '<a href="' + topicUrl() + '">' + utils.escapeHtml(subject.name) + '</a><span class="breadcrumb-sep">›</span>' +
      '<span class="breadcrumb-current">' + utils.escapeHtml(topic.name) + '</span>';
  }

  function showUnavailable() {
    document.getElementById("testTitle").textContent = "Test bulunamadı";
    document.getElementById("testSubtitle").textContent = "Konu sayfasına dönerek geçerli bir test seçebilirsiniz.";
    const box = document.getElementById("comingSoonBox");
    box.style.display = "";
    box.querySelector("a").href = grade && subject ? topicUrl() : "index.html";
  }

  function updateProgress() {
    const progress = Math.round(((currentIndex + 1) / test.questions.length) * 100);
    const bar = document.getElementById("testBarFill");
    bar.style.width = progress + "%";
    bar.parentElement.parentElement.setAttribute("aria-valuenow", String(progress));
    document.querySelector(".test-counter").textContent = "Soru " + (currentIndex + 1) + " / " + test.questions.length;
    document.querySelector(".test-score").textContent = answers.filter(function (answer) { return answer !== null; }).length + " Cevaplandı";
  }

  function renderQuestion() {
    const question = test.questions[currentIndex];
    const selected = answers[currentIndex];
    const image = question.image
      ? '<img class="question-image" src="' + utils.escapeHtml(question.image) + '" alt="' + utils.escapeHtml(question.imageAlt || "Soru görseli") + '">'
      : "";
    const choices = question.choices.map(function (choice, index) {
      const selectedClass = selected === index ? " is-selected" : "";
      return '<button type="button" class="option-btn' + selectedClass + '" data-choice="' + index + '" aria-pressed="' + (selected === index) + '">' +
        '<span class="option-letter">' + letters[index] + '</span><span>' + utils.escapeHtml(choice) + '</span></button>';
    }).join("");

    document.getElementById("questionArea").innerHTML = '<div class="question-card">' + image +
      '<p class="question-text">' + utils.escapeHtml(question.question) + '</p><div class="options-grid">' + choices + '</div>' +
      '<div class="test-nav"><button type="button" class="btn btn-outline btn-sm" id="previousQuestion"' + (currentIndex === 0 ? " disabled" : "") + '>← Önceki</button>' +
      '<button type="button" class="btn btn-ghost btn-sm" id="skipQuestion">Geç</button>' +
      '<button type="button" class="btn btn-primary btn-sm" id="nextQuestion">' + (currentIndex === test.questions.length - 1 ? "Testi Bitir" : "Sonraki Soru →") + '</button></div></div>';
    updateProgress();

    document.querySelectorAll("[data-choice]").forEach(function (button) {
      button.addEventListener("click", function () {
        answers[currentIndex] = Number(button.dataset.choice);
        renderQuestion();
      });
    });
    document.getElementById("previousQuestion").addEventListener("click", function () {
      if (currentIndex > 0) { currentIndex -= 1; renderQuestion(); }
    });
    document.getElementById("skipQuestion").addEventListener("click", goNext);
    document.getElementById("nextQuestion").addEventListener("click", goNext);
  }

  function goNext() {
    if (currentIndex < test.questions.length - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    const correct = answers.filter(function (answer, index) { return answer === test.questions[index].correctAnswer; }).length;
    const wrongIndexes = answers.map(function (answer, index) { return answer !== null && answer !== test.questions[index].correctAnswer ? index : -1; }).filter(function (index) { return index >= 0; });
    const reviewIndexes = answers.map(function (answer, index) { return answer === null || answer !== test.questions[index].correctAnswer ? index : -1; }).filter(function (index) { return index >= 0; });
    const empty = answers.filter(function (answer) { return answer === null; }).length;
    const percentage = Math.round((correct / test.questions.length) * 100);
    const reviews = reviewIndexes.length
      ? '<section class="wrong-review"><h2>Tekrar Bakabileceğin Sorular</h2>' + reviewIndexes.map(function (index) {
          const question = test.questions[index];
          const isEmpty = answers[index] === null;
          return '<article class="wrong-item"><div class="wrong-item-number">' + (index + 1) + '. Soru</div><h3>' + utils.escapeHtml(question.question) + '</h3>' +
            '<dl><div><dt>Senin cevabın</dt><dd class="' + (isEmpty ? 'val-empty' : 'val-wrong') + '">' + (isEmpty ? 'Bu soru boş bırakıldı' : utils.escapeHtml(question.choices[answers[index]])) + '</dd></div>' +
            '<div><dt>Doğru cevap</dt><dd class="val-correct">' + utils.escapeHtml(question.choices[question.correctAnswer]) + '</dd></div></dl>' +
            '<p><strong>Çözüm:</strong> ' + utils.escapeHtml(question.explanation) + '</p></article>';
        }).join("") + '</section>'
      : '<div class="all-correct">🎉 Harika! Yanlış cevapladığın soru yok.</div>';

    document.getElementById("questionArea").style.display = "none";
    document.getElementById("testBarFill").style.width = "100%";
    document.querySelector(".test-counter").textContent = "Test Tamamlandı";
    document.querySelector(".test-score").textContent = correct + " / " + test.questions.length + " Doğru";
    const resultArea = document.getElementById("resultArea");
    resultArea.style.display = "";
    const motivation = percentage >= 80 ? "Harika ilerliyorsun!" : percentage >= 60 ? "Güzel gidiyor, biraz daha çalışmayla çok daha iyi olacak!" : "Her deneme öğrenmenin bir parçası; yeniden deneyebilirsin!";
    resultArea.innerHTML = '<div class="result-card"><div class="result-emoji">' + (percentage >= 80 ? "🏆" : percentage >= 60 ? "👍" : "💪") + '</div>' +
      '<div class="result-score">%' + percentage + '</div><div class="result-label">' + motivation + '</div>' +
      '<div class="result-stats"><div class="result-stat"><div class="result-stat-val val-correct">' + correct + '</div><div class="result-stat-lbl">Doğru</div></div>' +
      '<div class="result-stat"><div class="result-stat-val val-wrong">' + wrongIndexes.length + '</div><div class="result-stat-lbl">Yanlış</div></div>' +
      '<div class="result-stat"><div class="result-stat-val val-empty">' + empty + '</div><div class="result-stat-lbl">Boş / Geçilen</div></div></div>' +
      '<div class="result-actions"><button type="button" class="btn btn-primary" id="restartTest">Testi Tekrar Çöz</button>' +
      '<a href="index.html" class="btn btn-outline">Ana Sayfaya Dön</a><a href="' + topicUrl() + '" class="btn btn-outline">Konuya Geri Dön</a></div></div>' + reviews;
    document.getElementById("restartTest").addEventListener("click", function () {
      answers = new Array(test.questions.length).fill(null);
      currentIndex = 0;
      resultArea.style.display = "none";
      document.getElementById("questionArea").style.display = "";
      renderQuestion();
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderBreadcrumb();
    if (!test || !grade || !subject || !topic || test.questions.length !== 10) {
      showUnavailable();
      return;
    }
    document.title = grade.name + " " + subject.name + " – " + topic.name + " | TestÇöz";
    document.getElementById("testTitle").textContent = grade.name + " " + subject.name + " – " + topic.name;
    document.getElementById("testSubtitle").textContent = "10 soru · " + difficulty.charAt(0).toLocaleUpperCase("tr-TR") + difficulty.slice(1) + " seviye · Test " + testNumber;
    const back = document.getElementById("testBackLink");
    if (back) back.href = topicUrl();
    renderQuestion();
  });
})();
