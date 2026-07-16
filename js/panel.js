(function () {
  const name = document.getElementById("panelName");
  const classLevel = document.getElementById("panelClass");
  const goal = document.getElementById("panelGoal");
  const welcome = document.getElementById("welcomeText");
  const start = document.getElementById("startTests");
  const logout = document.getElementById("logoutButton");
  const status = document.getElementById("panelStatus");
  const recentTests = document.getElementById("recentTests");
  const weaknessList = document.getElementById("weaknessList");
  const createButton = document.getElementById("createPersonalTest");
  const hint = document.getElementById("personalTestHint");

  function show(message, type) {
    status.textContent = message;
    status.className = "form-status " + type;
  }

  function renderRecent(items) {
    if (!items.length) {
      recentTests.innerHTML = "<p>Henüz kayıtlı test sonucunuz yok. Birkaç konu testi çözerek çalışma geçmişinizi oluşturabilirsiniz.</p>";
      return;
    }
    recentTests.innerHTML = items.map(function (item) {
      return '<article class="panel-list-item"><strong>' + item.subject + " / " + item.topic + '</strong><span>%'
        + item.percentage + " başarı · " + item.correctCount + " doğru · " + item.wrongCount + " yanlış · " + item.blankCount + " boş</span></article>";
    }).join("");
  }

  function renderWeaknesses(items) {
    if (!items.length) {
      weaknessList.innerHTML = "<p>Henüz kişiye özel test oluşturmak için yeterli çözüm geçmişi yok. Önce birkaç konu testi çözerek eksiklerini belirleyebilirsin.</p>";
      hint.textContent = "Kişiye özel test için önce en az bir test sonucunun kaydedilmesi gerekir.";
      return;
    }
    weaknessList.innerHTML = items.map(function (item) {
      return '<article class="panel-list-item"><strong>' + item.skill + '</strong><span>' + item.subject + " / " + item.topic + " · " + item.questionType + " · ağırlık " + item.weight + "</span></article>";
    }).join("");
    hint.textContent = "Yeterli çözüm geçmişi var. Kişiye özel test oluşturabilirsiniz.";
  }

  async function loadPanel() {
    try {
      const response = await fetch("/api/student-weaknesses", { headers: { Accept: "application/json" } });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      const user = result.user;
      name.textContent = user.studentName;
      classLevel.textContent = user.classLevel + ". Sınıf";
      goal.textContent = user.dailyGoal + " soru";
      welcome.textContent = "Hoş geldin, " + user.studentName + "! Bugünkü çalışma hedefin hazır.";
      start.href = "sinif-" + user.classLevel + ".html";
      renderRecent(result.recentTests || []);
      renderWeaknesses(result.weaknesses || []);
    } catch (error) {
      window.location.replace("giris.html");
    }
  }

  createButton.addEventListener("click", async function () {
    createButton.disabled = true;
    createButton.textContent = "Test hazırlanıyor...";
    try {
      const response = await fetch("/api/create-personal-test", { method: "POST", headers: { Accept: "application/json" } });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      window.location.href = result.redirectUrl;
    } catch (error) {
      show(error.message || "Kişiye özel test oluşturulamadı.", "error");
      createButton.disabled = false;
      createButton.textContent = "Kişiye Özel Test Oluştur";
    }
  });

  logout.addEventListener("click", async function () {
    logout.disabled = true;
    try {
      await fetch("/api/logout", { method: "POST", headers: { "Content-Type": "application/json" } });
      window.location.replace("index.html");
    } catch {
      show("Çıkış işlemi tamamlanamadı. Lütfen tekrar deneyin.", "error");
      logout.disabled = false;
    }
  });

  loadPanel();
})();
