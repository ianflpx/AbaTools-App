// Initialize Lucide Icons
lucide.createIcons();

function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
        if (el.id === 'hub-view' ||
            el.id === 'program-view-35' ||
            el.id === 'program-view-toolkit' ||
            el.id === 'toolkit-materials-view' ||
            el.id === 'program-view-naturalistic-mastery' ||
            el.id === 'program-view-aba-business-kit' ||
            el.id === 'program-view-parent-training-kit' ||
            el.id === 'program-view-aba-emergency-pack' ||
            el.id === 'program-view-therapist-survival-guide' ||
            el.id === 'program-view-vbmapp-companion' ||
            el.id === 'vbmapp-videos-view' ||
            el.id === 'vbmapp-video-player-view') {
            el.classList.add('hidden');
        }
    });

    // Show selected tab content
    const selectedTab = document.getElementById(`tab-${tabId}`);
    if (selectedTab) {
        selectedTab.classList.add('active');

        // Re-initialize icons
        lucide.createIcons();

        // Load profile data if profile tab
        if (tabId === 'profile') {
            loadUserProfile();
        }
    }

    // Update Bottom Navigation Styling
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabs = ['home', 'programs', 'feed', 'profile'];
    const activeIndex = tabs.indexOf(tabId);

    navButtons.forEach((btn, index) => {
        if (index === activeIndex) {
            // Active State
            btn.classList.remove('text-gray-400');
            btn.classList.add('text-action');
        } else {
            // Inactive State
            btn.classList.remove('text-action');
            btn.classList.add('text-gray-400');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Switch between the "My Programs" (owned) and "Offers" sub-tabs inside the Programs tab
function switchProgramSubtab(which) {
    const ownedPane = document.getElementById('programs-pane-owned');
    const offersPane = document.getElementById('programs-pane-offers');
    const ownedBtn = document.getElementById('subtab-btn-owned');
    const offersBtn = document.getElementById('subtab-btn-offers');
    if (!ownedPane || !offersPane) return;

    const showOffers = which === 'offers';
    ownedPane.classList.toggle('hidden', showOffers);
    offersPane.classList.toggle('hidden', !showOffers);

    const activeBtn = showOffers ? offersBtn : ownedBtn;
    const inactiveBtn = showOffers ? ownedBtn : offersBtn;
    if (activeBtn) {
        activeBtn.classList.add('bg-white', 'text-dark', 'shadow-sm');
        activeBtn.classList.remove('text-gray-500');
    }
    if (inactiveBtn) {
        inactiveBtn.classList.remove('bg-white', 'text-dark', 'shadow-sm');
        inactiveBtn.classList.add('text-gray-500');
    }

    try { lucide.createIcons(); } catch (e) { }
}

// Hub Data
const hubContent = {
  "verbal": {
    "title": "Komunikacja i język",
    "concept": "W ABA język traktuje się jako zachowanie pełniące określoną funkcję. Znaczenie ma zarówno wypowiadanie słów, jak i społeczny cel komunikacji: dlaczego dziecko mówi? Celem jest zastępowanie zachowań trudnych, takich jak płacz czy napady złości, skuteczną komunikacją.",
    "observation": [
      "Czy dziecko ciągnie cię za rękę w stronę tego, czego chce, zamiast wskazać to lub spróbować wydać dźwięk?",
      "Czy powtarza zdania z bajek lub zapamiętane wypowiedzi bez wyraźnego związku z sytuacją (echolalia)?",
      "Czy prosząc o przedmiot, nawiązuje kontakt wzrokowy, czy patrzy wyłącznie na przedmiot?",
      "Czy reaguje na swoje imię za pierwszym lub drugim razem?"
    ],
    "tech": "Podejście opiera się na VB-MAPP i teorii zachowań werbalnych B.F. Skinnera. Nauczanie dzieli się na operanty werbalne: Mand (prośby), Tact (nazywanie) oraz zachowania intrawerbalne (odpowiadanie i rozmowa).",
    "practical": "Zastosuj trening komunikacji funkcjonalnej (FCT). Wybierz coś, co silnie motywuje dziecko, trzymaj ten przedmiot i zaczekaj na próbę poproszenia. Jeśli dziecko nie odpowiada, udziel podpowiedzi, modelując słowo. Przekaż przedmiot bezpośrednio po próbie komunikacji.",
    "ref": "Skinner, B.F. (1957). Verbal Behavior."
  },
  "logical": {
    "title": "Rozumowanie i wzorce",
    "concept": "Ten obszar stanowi podstawę nauki czytania, pisania i matematyki. Pracujemy nad porządkowaniem bodźców wzrokowych, rozpoznawaniem podobieństw i rozumieniem przewidywalności otoczenia.",
    "observation": [
      "Czy dziecko spontanicznie grupuje przedmioty według koloru lub wielkości?",
      "Czy zauważa zmianę kolejności codziennych czynności lub położenia przedmiotu w domu?",
      "Czy potrafi ułożyć prostą układankę z 2 lub 3 elementów, czy jedynie nimi rzuca?",
      "Czy rozumie przyczynę i skutek, na przykład wie, że naciśnięcie przycisku uruchamia zabawkę?"
    ],
    "tech": "Korzystamy z nauczania metodą wyodrębnionych prób (DTT) oraz dopasowywania do wzoru. Sprawne rozpoznawanie wzorców wzrokowych może wspierać poczucie przewidywalności i koncentrację podczas uporządkowanych zadań.",
    "practical": "Ćwicz kategoryzowanie według funkcji. Oprócz sortowania kolorów poproś o oddzielenie „rzeczy, których używamy do jedzenia” od „rzeczy, które zakładamy”. Pomaga to wyjść poza utrwalony schemat i tworzyć pojęcia abstrakcyjne.",
    "ref": "Lovaas, O.I. (1987). Behavioral treatment and normal educational and intellectual functioning in young autistic children."
  },
  "social": {
    "title": "Interakcje i emocje",
    "concept": "Pracujemy nad wspólną uwagą i teorią umysłu. Dziecko rozwija rozumienie, że inni mają uczucia i pragnienia, oraz doświadcza, że kontakt z ludźmi może być bardziej satysfakcjonujący niż samo zajmowanie się przedmiotami.",
    "observation": [
      "Czy gdy dziecko widzi coś ciekawego, spogląda na ciebie, żeby podzielić się radością?",
      "Czy interesuje się tym, co robią inne dzieci, nawet jeśli się z nimi nie bawi?",
      "Czy reaguje na wyrazistą mimikę, na przykład udawany płacz lub głośny śmiech?",
      "Czy przynosi ci zabawki tylko po to, żeby je pokazać, bez oczekiwania, że coś zrobisz?"
    ],
    "tech": "Podejście opiera się na modelu wczesnej interwencji Denver (ESDM). Ważne jest zaangażowanie emocjonalne. Przyjemna, wzajemna interakcja społeczna tworzy warunki sprzyjające uczeniu się i plastyczności mózgu.",
    "practical": "Wykorzystuj społeczne zabawy sensoryczne, na przykład „a kuku”, z celową pauzą. Zatrzymanie się w najbardziej wyczekiwanym momencie daje dziecku okazję do spojrzenia na ciebie i zasygnalizowania, że chce kontynuować zabawę.",
    "ref": "Rogers, S.J. i Dawson, G. (2010). Early Start Denver Model for Young Children with Autism."
  },
  "motor": {
    "title": "Ruch i naśladowanie",
    "concept": "Naśladowanie jest jednym z głównych sposobów uczenia się. W ABA sprawność ruchowa w zakresie motoryki dużej i małej wspiera samodzielność, na przykład ubieranie się i jedzenie, oraz mowę, która wymaga precyzyjnych ruchów narządów artykulacyjnych.",
    "observation": [
      "Czy dziecko potrafi naśladować prosty gest, na przykład machanie lub klaskanie, po poleceniu „zrób tak”?",
      "Czy ma duże trudności z używaniem sztućców, zapinaniem guzików lub trzymaniem ołówka?",
      "Czy porusza się niepewnie lub unika schodów i niestabilnych powierzchni?",
      "Czy potrafi skakać obunóż lub wchodzić po schodach naprzemiennie?"
    ],
    "tech": "Nacisk kładziemy na planowanie ruchu i przenoszenie umiejętności na nowe sytuacje. Rozwój przebiega od kontroli głowy w kierunku dolnych części ciała. Naśladowanie ruchów całego ciała wiąże się z rozwojem naśladowania dźwięków i głosek.",
    "practical": "Przygotuj krótką sekwencję naśladowania. Wykonaj 3 ruchy, na przykład połóż rękę na głowie, klaśnij i dotknij stopy, mówiąc „zrób tak”. Zastosuj wzmocnienie w ciągu 3 sekund od prawidłowego ruchu, aby utrwalić związek między działaniem a konsekwencją.",
    "ref": "Leaf, R. i McEachin, J. (1999). A Work in Progress: Behavior Management Strategies..."
  }
};

function openHub(hubKey) {
    const data = hubContent[hubKey];
    if (!data) return;

    // Populate Content
    document.getElementById('hub-title').textContent = data.title;
    document.getElementById('hub-concept-text').textContent = data.concept;
    document.getElementById('hub-tech-text').textContent = data.tech;
    document.getElementById('hub-practical-text').textContent = data.practical;
    document.getElementById('hub-reference-text').textContent = data.ref;

    // Populate Observation List
    const listContainer = document.getElementById('hub-observation-list');
    listContainer.innerHTML = ''; // Clear previous
    data.observation.forEach(item => {
        const li = document.createElement('li');
        li.className = "flex items-start gap-3";
        li.innerHTML = `\n            <i data-lucide="help-circle" class="w-5 h-5 text-action flex-shrink-0 mt-0.5"></i>\n            <span class="text-sm text-gray-600 leading-relaxed">${item}</span>\n        `;
        listContainer.appendChild(li);
    });

    // Show Hub View
    const hubView = document.getElementById('hub-view');
    hubView.classList.remove('hidden'); // Show it
    hubView.classList.add('block'); // Ensure display

    // Hide main scroll or similar if needed, but 'fixed inset-0 z-50' covers it.
    // Re-init icons for the new dynamic content
    lucide.createIcons();
}

function closeHub() {
    const hubView = document.getElementById('hub-view');
    hubView.classList.add('hidden');
    hubView.classList.remove('block');
}

function openProgram35() {
    const programView = document.getElementById('program-view-35');
    programView.classList.remove('hidden');
    programView.classList.add('block');
    lucide.createIcons();
}

function closeProgram35() {
    const programView = document.getElementById('program-view-35');
    programView.classList.add('hidden');
    programView.classList.remove('block');
}

function openNaturalisticMastery() {
    const view = document.getElementById('program-view-naturalistic-mastery');
    view.classList.remove('hidden');
    view.classList.add('block');
    lucide.createIcons();
}

function closeNaturalisticMastery() {
    const view = document.getElementById('program-view-naturalistic-mastery');
    view.classList.add('hidden');
    view.classList.remove('block');
}

function openUpsellView(viewId) {
    const view = document.getElementById(viewId);
    if (!view) {
        console.error(`Nie znaleziono widoku programu ${viewId}`);
        return;
    }
    view.classList.remove('hidden');
    view.classList.add('block');
    view.style.display = 'block';
    view.scrollTop = 0;
    lucide.createIcons();
}

function closeUpsellView(viewId) {
    const view = document.getElementById(viewId);
    if (!view) return;
    view.classList.add('hidden');
    view.classList.remove('block');
    view.style.display = '';
}

function openVbmappCompanion() {
    const view = document.getElementById('program-view-vbmapp-companion');
    view.classList.remove('hidden');
    view.classList.add('block');
    lucide.createIcons();
}

function closeVbmappCompanion() {
    const view = document.getElementById('program-view-vbmapp-companion');
    view.classList.add('hidden');
    view.classList.remove('block');
}

function openProgramToolkit() {
    const programView = document.getElementById('program-view-toolkit');
    programView.classList.remove('hidden');
    programView.classList.add('block');
    lucide.createIcons();
}

function closeProgramToolkit() {
    const programView = document.getElementById('program-view-toolkit');
    programView.classList.add('hidden');
    programView.classList.remove('block');
}

function openToolkitMaterials() {
    const materialsView = document.getElementById('toolkit-materials-view');
    materialsView.classList.remove('hidden');
    materialsView.classList.add('block');
    lucide.createIcons();
}

function closeToolkitMaterials() {
    const materialsView = document.getElementById('toolkit-materials-view');
    materialsView.classList.add('hidden');
    materialsView.classList.remove('block');
}

// VB-MAPP Implementation Companion Videos
const vbmappVideoData = [
  {
    "title": "1. Powitanie i omówienie kursu",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">1. Powitanie i omówienie kursu. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d25a452aad814cc4b41e4_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d25a452aad814cc4b41e4_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d25a452aad814cc4b41e4\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25a452aad814cc4b41e4/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "2. Czym jest VB-MAPP i dlaczego jest ważny",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">2. Czym jest VB-MAPP i dlaczego jest ważny. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d2633392e72f9adef4925_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d2633392e72f9adef4925_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d2633392e72f9adef4925\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2633392e72f9adef4925/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "3. Kamienie milowe rozwoju w VB-MAPP",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">3. Kamienie milowe rozwoju w VB-MAPP. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d269f86e3a582c04ea089_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d269f86e3a582c04ea089_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d269f86e3a582c04ea089\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d269f86e3a582c04ea089/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "4. Jak interpretować ocenę i wybierać priorytetowe umiejętności",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">4. Jak interpretować ocenę i wybierać priorytetowe umiejętności. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d26ae900d8c9b45a3fb20_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d26ae900d8c9b45a3fb20_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d26ae900d8c9b45a3fb20\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26ae900d8c9b45a3fb20/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "5. Rozumienie Mand i Tact",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">5. Rozumienie Mand i Tact. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d26b98b6c64d7fbc9fb3f_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d26b98b6c64d7fbc9fb3f_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d26b98b6c64d7fbc9fb3f\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26b98b6c64d7fbc9fb3f/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "6. Bariery w uczeniu się: rozpoznawanie i interwencja",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">6. Bariery w uczeniu się: rozpoznawanie i interwencja. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d26c8162fa67651ecf1ae_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d26c8162fa67651ecf1ae_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d26c8162fa67651ecf1ae\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26c8162fa67651ecf1ae/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "7. Cele nauczania, indywidualny program i wskazówki dotyczące doboru poziomu",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">7. Cele nauczania, indywidualny program i wskazówki dotyczące doboru poziomu. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d26df86e3a582c04ea0ef_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d26df86e3a582c04ea0ef_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d26df86e3a582c04ea0ef\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26df86e3a582c04ea0ef/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "8. Wzmocnienia warunkowe i naturalne zainteresowania dziecka",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">8. Wzmocnienia warunkowe i naturalne zainteresowania dziecka. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d271b392e72f9adef4a86_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d271b392e72f9adef4a86_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d271b392e72f9adef4a86\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d271b392e72f9adef4a86/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "9. Przechodzenie między aktywnościami i samoobsługa",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">9. Przechodzenie między aktywnościami i samoobsługa. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d2728900d8c9b45a3fbaf_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d2728900d8c9b45a3fbaf_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d2728900d8c9b45a3fbaf\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2728900d8c9b45a3fbaf/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "10. Tworzenie codziennego planu nauczania opartego na VB-MAPP",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">10. Tworzenie codziennego planu nauczania opartego na VB-MAPP. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d25b10d2808c273f63ae5_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d25b10d2808c273f63ae5_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d25b10d2808c273f63ae5\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25b10d2808c273f63ae5/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "11. Przygotowanie do nauczania poszczególnych obszarów umiejętności",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">11. Przygotowanie do nauczania poszczególnych obszarów umiejętności. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d25bd52aad814cc4b4214_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d25bd52aad814cc4b4214_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d25bd52aad814cc4b4214\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25bd52aad814cc4b4214/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "12. VP-MTS: percepcja wzrokowa i dopasowywanie do wzoru",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">12. VP-MTS: percepcja wzrokowa i dopasowywanie do wzoru. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d25ca86e3a582c04e9f63_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d25ca86e3a582c04e9f63_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d25ca86e3a582c04e9f63\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25ca86e3a582c04e9f63/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "13. Naśladowanie ruchowe i wokalne",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">13. Naśladowanie ruchowe i wokalne. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d25d52cca4d27f1c1e323_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d25d52cca4d27f1c1e323_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d25d52cca4d27f1c1e323\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25d52cca4d27f1c1e323/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "14. Echoika: rozwijanie powtarzania wypowiedzi",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">14. Echoika: rozwijanie powtarzania wypowiedzi. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d25e0392e72f9adef48be_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d25e0392e72f9adef48be_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d25e0392e72f9adef48be\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25e0392e72f9adef48be/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "15. Umiejętności wokalne: zachowania werbalne inicjowane przez dziecko",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">15. Umiejętności wokalne: zachowania werbalne inicjowane przez dziecko. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d25ee19eaa3a949e78089_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d25ee19eaa3a949e78089_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d25ee19eaa3a949e78089\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25ee19eaa3a949e78089/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "16. LRFFC: reagowanie słuchacza według cechy, funkcji i kategorii",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">16. LRFFC: reagowanie słuchacza według cechy, funkcji i kategorii. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d25fb0d2808c273f63b33_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d25fb0d2808c273f63b33_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d25fb0d2808c273f63b33\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25fb0d2808c273f63b33/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "17. Umiejętności intrawerbalne: odpowiadanie bez bodźców wzrokowych",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">17. Umiejętności intrawerbalne: odpowiadanie bez bodźców wzrokowych. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d260a162fa67651ecf09b_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d260a162fa67651ecf09b_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d260a162fa67651ecf09b\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d260a162fa67651ecf09b/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "18. Społeczne użycie języka",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">18. Społeczne użycie języka. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d2617900d8c9b45a3fa47_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d2617900d8c9b45a3fa47_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d2617900d8c9b45a3fa47\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2617900d8c9b45a3fa47/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "19. Rutyny klasowe: zachowania szkolne i grupowe",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">19. Rutyny klasowe: zachowania szkolne i grupowe. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d2624392e72f9adef490b_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d2624392e72f9adef490b_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d2624392e72f9adef490b\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2624392e72f9adef490b/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "20. Pisanie: motoryka mała i wypowiedzi pisemne",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">20. Pisanie: motoryka mała i wypowiedzi pisemne. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d263e162fa67651ecf0fe_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d263e162fa67651ecf0fe_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d263e162fa67651ecf0fe\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d263e162fa67651ecf0fe/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "21. Czytanie: rozpoznawanie i rozumienie słów",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">21. Czytanie: rozpoznawanie i rozumienie słów. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d264b2cca4d27f1c1e398_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d264b2cca4d27f1c1e398_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d264b2cca4d27f1c1e398\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d264b2cca4d27f1c1e398/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "22. Matematyka: wprowadzenie do myślenia liczbowego i logicznego",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">22. Matematyka: wprowadzenie do myślenia liczbowego i logicznego. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d2656599fcc08351ee5e3_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d2656599fcc08351ee5e3_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d2656599fcc08351ee5e3\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2656599fcc08351ee5e3/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  },
  {
    "title": "23. Zakończenie: ocena postępów i rozwijanie nauczania",
    "embed": "<p class=\"p-4 bg-white text-dark text-sm leading-relaxed\">23. Zakończenie: ocena postępów i rozwijanie nauczania. Nagranie z oryginalną ścieżką dźwiękową.</p><script type=\"text/javascript\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js\", s.async=!0,document.head.appendChild(s); </script> <div id=\"ifr_690d26632cca4d27f1c1e3ba_wrapper\" style=\"margin: 0 auto; width: 100%; \"> <div style=\"position: relative; padding: 75% 0 0 0;\" id=\"ifr_690d26632cca4d27f1c1e3ba_aspect\"> <iframe frameborder=\"0\" allowfullscreen src=\"about:blank\" id=\"ifr_690d26632cca4d27f1c1e3ba\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" referrerpolicy=\"origin\" onload=\" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26632cca4d27f1c1e3ba/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)\"></iframe> </div> </div>"
  }
];

function openVbmappVideos() {
    const view = document.getElementById('vbmapp-videos-view');
    const container = document.getElementById('vbmapp-video-list-container');

    // Clear list
    container.innerHTML = '';

    // Populate list
    vbmappVideoData.forEach((video, index) => {
        const div = document.createElement('div');
        div.className = "bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between gap-4 cursor-pointer hover:shadow-md transition-all active:scale-95";
        div.onclick = () => openVbmappPlayer(index);

        div.innerHTML = `\n            <div class="flex items-center gap-4">\n                <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">\n                    <i data-lucide="play" class="w-5 h-5 fill-current border-none"></i>\n                </div>\n                <h4 class="font-bold text-dark text-sm leading-tight">${video.title}</h4>\n            </div>\n            <i data-lucide="chevron-right" class="w-5 h-5 text-gray-300"></i>\n        `;
        container.appendChild(div);
    });

    view.classList.remove('hidden');
    view.classList.add('block');
    lucide.createIcons();
}

function closeVbmappVideos() {
    const view = document.getElementById('vbmapp-videos-view');
    view.classList.add('hidden');
    view.classList.remove('block');
}

function openVbmappPlayer(index) {
    const video = vbmappVideoData[index];
    if (!video) return;

    const playerView = document.getElementById('vbmapp-video-player-view');
    const titleEl = document.getElementById('video-player-title');
    const container = document.getElementById('video-player-container');

    titleEl.textContent = video.title;
    container.innerHTML = video.embed;

    playerView.classList.remove('hidden');
    playerView.classList.add('block');
    lucide.createIcons();
}

function closeVbmappPlayer() {
    const playerView = document.getElementById('vbmapp-video-player-view');
    const container = document.getElementById('video-player-container');

    playerView.classList.add('hidden');
    playerView.classList.remove('block');

    // Stop video by clearing content
    container.innerHTML = '';
}

// Initialize default tab (Home)
// Main Feed Logic
const feedData = [
  {
    "type": "Wskazówka praktyczna",
    "colorClass": "bg-amber-50 text-amber-700",
    "date": "9 stycznia 2026",
    "timestamp": 1767916800000,
    "title": "Powtarzanie tego samego wzmocnienia podczas kolejnych sesji może stopniowo zmniejszać jego skuteczność.",
    "text": "Preferencje zmieniają się szybciej, niż wiele osób się spodziewa."
  },
  {
    "type": "Badanie",
    "colorClass": "bg-indigo-50 text-indigo-700",
    "date": "22 stycznia 2026",
    "timestamp": 1769040000000,
    "title": "Kontakt wzrokowy częściej pojawia się podczas wspólnej zabawy.",
    "text": "Badania nad naturalistycznymi interwencjami rozwojowo-behawioralnymi wskazują, że kontakt wzrokowy częściej pojawia się, gdy dorosły podąża za dzieckiem w zabawie, niż podczas uporządkowanych zadań przy stoliku."
  },
  {
    "type": "Notatka kliniczna",
    "colorClass": "bg-blue-50 text-blue-700",
    "date": "5 lutego 2026",
    "timestamp": 1770249600000,
    "title": "Terapeuci często obserwują mniej zachowań unikowych po czasowym obniżeniu trudności zadania.",
    "text": "Zaangażowanie zwykle wraca wcześniej niż dokładność odpowiedzi. To spodziewany przebieg."
  },
  {
    "type": "Fakt kliniczny",
    "colorClass": "bg-blue-50 text-blue-700",
    "date": "19 lutego 2026",
    "timestamp": 1771459200000,
    "title": "Krótkie, regularne ćwiczenia w różnych miejscach utrwalają naukę lepiej niż pojedyncze, bardzo intensywne sesje.",
    "text": "Uogólnianie umiejętności rozwija się dzięki powtarzaniu w różnych sytuacjach."
  },
  {
    "type": "Wskazówka",
    "colorClass": "bg-amber-50 text-amber-700",
    "date": "3 marca 2026",
    "timestamp": 1772496000000,
    "title": "Cisza może być strategią.",
    "text": "Kilka sekund oczekiwania przed podpowiedzią daje dziecku czas na przetworzenie informacji i samodzielną odpowiedź. Wiele spontanicznych reakcji pojawia się właśnie podczas takiej pauzy."
  },
  {
    "type": "Z badań",
    "colorClass": "bg-purple-50 text-purple-700",
    "date": "16 marca 2026",
    "timestamp": 1773619200000,
    "title": "Naturalne wzmocnienia dłużej wspierają motywację.",
    "text": "Badania porównujące wzmocnienia sztuczne i naturalne wskazują, że dostęp do samej aktywności dłużej podtrzymuje zaangażowanie i wspiera uogólnianie umiejętności."
  },
  {
    "type": "Obserwacja",
    "colorClass": "bg-teal-50 text-teal-700",
    "date": "27 marca 2026",
    "timestamp": 1774569600000,
    "title": "Dzieci częściej komunikują się spontanicznie, gdy dorośli szybko i sensownie reagują także na przybliżone próby.",
    "text": "Uważne reagowanie ma większe znaczenie niż perfekcyjna forma odpowiedzi."
  },
  {
    "type": "Badanie",
    "colorClass": "bg-indigo-50 text-indigo-700",
    "date": "2 kwietnia 2026",
    "timestamp": 1775088000000,
    "title": "Coaching rodzicielski online może przynosić wyniki porównywalne ze spotkaniami na żywo.",
    "text": "Badania wskazują, że zdalne szkolenie opiekunów przynosi podobne postępy w komunikacji dziecka jak coaching w gabinecie. Zwiększa to dostępność wsparcia dla rodzin mieszkających daleko od ośrodków."
  },
  {
    "type": "Z badań",
    "colorClass": "bg-purple-50 text-purple-700",
    "date": "14 kwietnia 2026",
    "timestamp": 1776124800000,
    "title": "Przybywa dowodów wspierających naturalistyczne interwencje rozwojowo-behawioralne.",
    "text": "Podejścia włączające naukę w zabawę i codzienne rutyny należą do metod o silnym wsparciu badawczym w rozwijaniu wczesnej komunikacji."
  },
  {
    "type": "Wskazówka praktyczna",
    "colorClass": "bg-amber-50 text-amber-700",
    "date": "24 kwietnia 2026",
    "timestamp": 1776988800000,
    "title": "Uwzględnianie zgody dziecka na udział w sesji ogranicza zachowania unikowe.",
    "text": "Zapewnianie rzeczywistego wyboru i dostrzeganie pierwszych sygnałów dyskomfortu wspiera współpracę i bezpieczne uczenie się."
  },
  {
    "type": "Fakt kliniczny",
    "colorClass": "bg-blue-50 text-blue-700",
    "date": "6 maja 2026",
    "timestamp": 1778025600000,
    "title": "AAC nie hamuje rozwoju mowy.",
    "text": "Badania są spójne: udostępnienie dziecku obrazków lub urządzenia do komunikacji wspiera rozwój mowy, zamiast go blokować."
  },
  {
    "type": "Obserwacja",
    "colorClass": "bg-teal-50 text-teal-700",
    "date": "15 maja 2026",
    "timestamp": 1778803200000,
    "title": "Wcześniejsza diagnoza pozwala wcześniej rozpocząć wsparcie.",
    "text": "Wcześniejsze rozpoznawanie wiarygodnych sygnałów umożliwia rodzinom rozpoczęcie pomocy w latach, gdy uczenie się jest szczególnie elastyczne."
  },
  {
    "type": "Wskazówka",
    "colorClass": "bg-amber-50 text-amber-700",
    "date": "23 maja 2026",
    "timestamp": 1779494400000,
    "title": "Regularnie sprawdzaj bieżące preferencje, zamiast polegać wyłącznie na comiesięcznej ocenie.",
    "text": "30 sekund na wybór przed sesją często lepiej wskazuje aktualną motywację niż formalna ocena sprzed miesiąca."
  },
  {
    "type": "Notatka kliniczna",
    "colorClass": "bg-blue-50 text-blue-700",
    "date": "1 czerwca 2026",
    "timestamp": 1780272000000,
    "title": "Cyfrowe zbieranie danych oszczędza czas specjalistów.",
    "text": "Zespoły przechodzące z papieru na rejestrowanie danych na tablecie zgłaszają mniej czasu poświęcanego dokumentacji i więcej czasu na bezpośrednie nauczanie."
  },
  {
    "type": "Badanie",
    "colorClass": "bg-indigo-50 text-indigo-700",
    "date": "9 czerwca 2026",
    "timestamp": 1780963200000,
    "title": "Jakość superwizji wiąże się z pozostawaniem terapeutów w pracy silniej niż liczba prowadzonych przypadków.",
    "text": "Wsparcie, informacja zwrotna i mentoring pomagają zatrzymywać wykwalifikowanych specjalistów oraz zachować ciągłość pomocy dla dzieci."
  },
  {
    "type": "Z badań",
    "colorClass": "bg-purple-50 text-purple-700",
    "date": "13 czerwca 2026",
    "timestamp": 1781308800000,
    "title": "Łączenie ABA z terapią zajęciową pomaga dzieciom o dużych potrzebach sensorycznych.",
    "text": "Plany interdyscyplinarne zwykle lepiej wspierają uogólnianie umiejętności niż praca jednej specjalności w izolacji."
  },
  {
    "type": "Obserwacja",
    "colorClass": "bg-teal-50 text-teal-700",
    "date": "18 czerwca 2026",
    "timestamp": 1781740800000,
    "title": "Sen i zachowanie są ze sobą silnie powiązane.",
    "text": "Nagłe nasilenie zachowań trudnych często wiąże się z zaburzeniami snu. Warto to sprawdzić przed zmianą protokołu."
  }
];

function renderFeed() {
    const feedContainer = document.getElementById('main-feed-container');
    if (!feedContainer) return;

    feedContainer.innerHTML = '';

    // Sort descending (Newest first)
    feedData.sort((a, b) => b.timestamp - a.timestamp);

    feedData.forEach(item => {
        const div = document.createElement('div');
        div.className = "bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-3";
        div.innerHTML = `\n            <div class="flex items-center gap-3 mb-2">\n                <span class="${item.colorClass} text-[0.65rem] font-bold px-2 py-1 rounded-full uppercase tracking-wider">${item.type}</span>\n                <span class="text-xs text-gray-400">${item.date}</span>\n            </div>\n            <h3 class="font-bold text-dark text-lg leading-tight">${item.title}</h3>\n            <p class="text-sm text-gray-500 leading-relaxed">${item.text}</p>\n        `;
        feedContainer.appendChild(div);
    });
}

// Initialize default tab (Home) and Feeds
document.addEventListener('DOMContentLoaded', () => {
    switchTab('home');
    renderFeed();
});

async function loadUserProfile() {
    const storedAuth = localStorage.getItem('abatools_auth');
    if (!storedAuth) return;

    let email;
    try {
        email = JSON.parse(storedAuth).email;
    } catch (e) {
        console.error("Błąd logowania", e);
        return;
    }

    if (!window.supabaseClient) {
        // Retry a bit later if client not ready (unlikely given flow, but safe)
        console.warn("Usługa dostępu nie jest gotowa do wczytania profilu.");
        return;
    }

    // Fetch user details suitable for the profile
    // We assume 'user_access' contains the user info.
    // If user has multiple products, they have multiple rows. We update name for all.
    const { data: profile, error } = await window.supabaseClient.rpc('app_profile_get', { p_email: email });

    if (error) {
        console.error('Błąd wczytywania profilu:', error);
        return;
    }

    if (profile && profile.ok) {
        const user = profile;
        const emailField = document.getElementById('profile-email');
        const nameField = document.getElementById('profile-name');
        const phoneField = document.getElementById('profile-phone');

        if (emailField) emailField.value = user.email || email;
        if (nameField) nameField.value = user.name || '';
        if (phoneField) phoneField.value = user.phone || '';
    }
}

async function saveProfile() {
    const nameInput = document.getElementById('profile-name');
    const newName = nameInput.value.trim();
    const phoneInput = document.getElementById('profile-phone');
    const newPhone = phoneInput.value.trim();

    if (!newName) {
        // Optional: show error on UI
        const msg = document.getElementById('profile-message');
        msg.textContent = "Wpisz imię i nazwisko.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
        return;
    }

    const btn = document.getElementById('save-profile-btn');
    const originalContent = `<span>Zapisz zmiany</span><i data-lucide="save" class="w-4 h-4"></i>`;

    btn.innerHTML = '<span>Zapisywanie...</span><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
    btn.disabled = true;
    lucide.createIcons();

    const storedAuth = localStorage.getItem('abatools_auth');
    let email;
    try {
        email = JSON.parse(storedAuth).email;
    } catch (e) { return; }

    try {
        // Update Name and Phone in DB
        const { data: result, error } = await window.supabaseClient
            .rpc('app_profile_update', { p_email: email, p_name: newName, p_phone: newPhone });

        if (error || !result || !result.ok) throw (error || new Error('profile update refused'));

        // Success Feedback
        btn.innerHTML = `<span>Zapisano!</span><i data-lucide="check" class="w-4 h-4"></i>`;
        btn.classList.add('bg-green-600');

        const msg = document.getElementById('profile-message');
        msg.textContent = "Profil został zaktualizowany.";
        msg.classList.remove('hidden', 'text-red-500');
        msg.classList.add('text-green-600');

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.disabled = false;
            btn.classList.remove('bg-green-600');
            msg.classList.add('hidden');
            lucide.createIcons();
        }, 2000);

    } catch (err) {
        console.error('Błąd aktualizacji profilu:', err);
        btn.innerHTML = originalContent;
        btn.disabled = false;

        const msg = document.getElementById('profile-message');
        msg.textContent = "Nie udało się zapisać zmian. Spróbuj ponownie.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
    }
    lucide.createIcons();
}

// Availability gate: no foreign-language fallback and no broken local download.
document.addEventListener('DOMContentLoaded', async () => {
    let approved = new Set();
    try { const response = await fetch('availability.json', {cache:'no-store'}); if(response.ok) { const data = await response.json(); approved = new Set((data.files || []).filter(file => file.ready === true && /^[0-9a-f]{64}$/.test(file.sha256)).map(file => '../' + file.path)); } } catch {}
    const links = document.querySelectorAll('a[href^="../assets/pl/"]');
    await Promise.all([...links].map(async link => {
        const href = link.getAttribute('href');
        const filename = link.getAttribute('download');
        link.removeAttribute('href'); link.removeAttribute('download'); link.setAttribute('aria-disabled','true');
        try { if(!approved.has(href))throw new Error('unapproved PDF'); const response = await fetch(href, {method:'HEAD'}); if(response.ok && (response.headers.get('content-type') || '').includes('pdf')) { if(link.closest('[data-slug]')?.dataset.locked === 'true') return; link.setAttribute('href',href); if(filename)link.setAttribute('download',filename); link.removeAttribute('aria-disabled'); return; } } catch {}
        link.classList.add('opacity-60');
        link.textContent = 'Plik jest obecnie niedostępny. Skontaktuj się z pomocą.';
    }));
    document.querySelectorAll('[data-unavailable]').forEach(link => {link.textContent='Ten materiał nie jest dostępny w języku polskim.';});
});
