(function () {
  const catalog = window.TESTCOZ_CATALOG;
  const utils = window.TestCozUtils;
  const tests = window.TESTCOZ_TESTS || [];

  function capitalize(value) {
    return value.charAt(0).toLocaleUpperCase("tr-TR") + value.slice(1);
  }

  function findTest(classLevel, subject, topic, difficulty) {
    return tests.find(function (test) {
      return test.classLevel === classLevel && test.subject === subject && test.topic === topic && test.difficulty === difficulty;
    });
  }

  function showPageError(title, message, backHref) {
    const main = document.querySelector("main");
    if (!main) return;
    main.innerHTML = '<section class="section"><div class="container"><div class="empty-state">' +
      '<span class="empty-state-icon">🧭</span><h1>' + utils.escapeHtml(title) + '</h1>' +
      '<p>' + utils.escapeHtml(message) + '</p><a class="btn btn-primary" href="' + backHref + '">Geri Dön</a></div></div></section>';
  }

  function renderGradePage() {
    const params = utils.getParams();
    const classLevel = Number(params.sinif || 1);
    const grade = catalog.grades[classLevel];
    if (!grade) {
      showPageError("Sınıf bulunamadı", "Lütfen 1, 2, 3 veya 4. sınıftan birini seçin.", "index.html");
      return;
    }

    document.title = grade.name + " Dersleri | TestÇöz";
    document.getElementById("pageHeroTitle").textContent = grade.name + " Dersleri";
    document.getElementById("pageHeroSub").textContent = grade.description;
    document.getElementById("breadcrumbCurrent").textContent = grade.name;

    document.querySelectorAll(".class-card").forEach(function (card) {
      card.classList.toggle("is-active", card.dataset.class === String(classLevel));
    });

    document.getElementById("subjectGrid").innerHTML = grade.subjects.map(function (subject) {
      return '<a class="subject-card" href="ders/' + classLevel + '-sinif-' + subject.id + '.html" role="listitem">' +
        '<div class="subject-icon" aria-hidden="true">' + subject.icon + '</div>' +
        '<div class="subject-info"><h3>' + utils.escapeHtml(subject.name) + '</h3>' +
        '<p>' + utils.escapeHtml(subject.description) + '</p>' +
        '<span class="subject-topic-count">' + subject.topics.length + ' konu</span></div>' +
        '<div class="subject-difficulty"><span class="badge badge-kolay">Kolay</span>' +
        '<span class="badge badge-orta">Orta</span><span class="badge badge-zor">Zor</span></div></a>';
    }).join("");
  }

  function renderSubjectPage() {
    const params = utils.getParams();
    const classLevel = Number(params.sinif || 1);
    const grade = catalog.grades[classLevel];
    const subject = grade && grade.subjects.find(function (item) { return item.id === params.ders; });
    if (!grade || !subject) {
      showPageError("Ders bulunamadı", "Bu bağlantı geçerli bir sınıf ve derse ait değil.", "sinif-" + (grade ? classLevel : 1) + ".html");
      return;
    }

    document.title = grade.name + " " + subject.name + " Konuları | TestÇöz";
    document.getElementById("pageHeroTitle").textContent = grade.name + " " + subject.name + " Konuları";
    document.getElementById("pageHeroSub").textContent = subject.description;
    document.getElementById("konuBaslik").textContent = subject.name + " Konuları";
    document.getElementById("breadcrumbSinif").textContent = grade.name;
    document.getElementById("breadcrumbSinif").href = "sinif-" + classLevel + ".html";
    document.getElementById("breadcrumbDers").textContent = subject.name;

    document.getElementById("topicList").innerHTML = subject.topics.map(function (topic, index) {
      const buttons = topic.difficulties.map(function (difficulty) {
        const available = findTest(classLevel, subject.id, topic.id, difficulty);
        if (!available) {
          return "";
        }
        return '<a class="difficulty-link badge-' + difficulty + '" href="' + utils.escapeHtml(available.pageUrl) + '">' + capitalize(difficulty) + '<small>10 Soru</small></a>';
      }).join("");

      return '<article class="topic-card topic-card-with-levels">' +
        '<div class="topic-card-left"><div class="topic-num">' + (index + 1) + '</div>' +
        '<div class="topic-info"><h4>' + utils.escapeHtml(topic.name) + '</h4><p>' + utils.escapeHtml(topic.description) + '</p></div></div>' +
        '<div class="difficulty-actions" aria-label="' + utils.escapeHtml(topic.name) + ' zorluk seviyeleri">' + buttons + '</div></article>';
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.body.dataset.page === "sinif-page") renderGradePage();
    if (document.body.dataset.page === "konu-page") renderSubjectPage();
  });
})();
