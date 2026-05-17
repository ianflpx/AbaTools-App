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

// Hub Data
const hubContent = {
    verbal: {
        title: "Kommunikation & Sprache",
        concept: "In ABA wird Sprache als funktionales Verhalten betrachtet. Wir konzentrieren uns nicht nur auf den Akt des Sprechens, sondern auf die soziale Funktion: Warum spricht das Kind? Ziel ist es, störende Verhaltensweisen (Weinen, Wutanfälle) durch effektive Kommunikation zu ersetzen.",
        observation: [
            "Zieht das Kind Ihre Hand zu dem, was es möchte, anstatt darauf zu zeigen oder einen Laut auszuprobieren?",
            "Wiederholen sie Sätze aus Cartoons oder auswendig gelernte Zeilen ohne erkennbaren Kontext (Echolalie)?",
            "Stellen sie beim Anfordern eines Objekts Blickkontakt her oder schauen sie nur auf das gewünschte Objekt?",
            "Reagieren sie, wenn sie beim ersten oder zweiten Versuch mit ihrem Namen angerufen werden?"
        ],
        tech: "Basierend auf dem VB-MAPP-Protokoll und B.F. Skinners Verbal Behavior. Der Unterricht ist in verbale Operanten unterteilt: Mand (Bitten/Anfordern), Tact (Benennen) und Intraverbal (Antworten/Konversieren).",
        practical: "Nutzen Sie Functional Communication Training (FCT). Identifizieren Sie etwas mit hoher Motivation, halten Sie das Objekt und warten Sie auf einen Anfrageversuch. Wenn das Kind nicht antwortet, geben Sie ihm eine „Prompt“ (machen Sie ihm das Wort vor) und geben Sie den Gegenstand sofort nach dem Versuch ab.",
        ref: "Skinner, B.F. (1957). Verbales Verhalten."
    },
    logical: {
        title: "Denken & Muster",
        concept: "Dieser Bereich ist die Grundlage für Alphabetisierung und Mathematik. Wir arbeiten an der Fähigkeit des Gehirns, visuelle Reize zu organisieren, Ähnlichkeiten zu erkennen und die Vorhersehbarkeit der Umgebung zu verstehen.",
        observation: [
            "Kann das Kind Gegenstände spontan nach Farbe oder Größe gruppieren?",
            "Merken sie es, wenn Sie die Reihenfolge einer Routine ändern oder den Standort eines Gegenstands im Haus verschieben?",
            "Können sie einfache 2- oder 3-teilige Puzzles zusammensetzen oder werfen sie einfach die Teile?",
            "Verstehen sie Ursache und Wirkung (z. B. wissen sie, dass durch Drücken eines Knopfes ein Spielzeug eingeschaltet wird)?"
        ],
        tech: "Wir nutzen das Discrete Trial Training (DTT) und das Konzept des Matching-to-Sample. Die Wissenschaft beweist, dass fließende visuelle Muster Ängste reduzieren und die Konzentration auf strukturierte Aufgaben verbessern.",
        practical: "Arbeiten Sie an funktionaler Kategorisierung. Anstatt nur die Farben zu sortieren, bitten Sie sie, „Dinge, die wir zum Essen verwenden“ und „Dinge, die wir zum Anziehen verwenden“ zu trennen. Dies zwingt das Gehirn dazu, den „Autopiloten“ zu verlassen und abstrakte Konzepte zu erstellen.",
        ref: "Lovaas, O.I. (1987). Verhaltensbehandlung und normale pädagogische und intellektuelle Funktion bei jungen autistischen Kindern."
    },
    social: {
        title: "Interaktion & Emotional",
        concept: "Wir konzentrieren uns auf „Joint Attention“ und „Theory of Mind“. Dazu gehört die Entwicklung der Fähigkeit zu erkennen, dass andere Gefühle und Wünsche haben und dass die Interaktion mit Menschen lohnender sein kann als die Interaktion mit Objekten.",
        observation: [
            "Wenn das Kind etwas Cooles sieht, schaut es Sie dann an, um die Freude des Augenblicks zu teilen?",
            "Zeigen sie Interesse daran, zu beobachten, was andere Kinder tun (auch wenn sie nicht mitspielen)?",
            "Reagieren sie auf übertriebene Gesichtsausdrücke (z. B. wenn Sie so tun, als würden Sie weinen oder laut lachen)?",
            "Bringen sie dir Spielzeug auf den Schoß, nur um es dir zu zeigen, ohne unbedingt zu wollen, dass du etwas tust?"
        ],
        tech: "Basierend auf dem Early Start Denver Model (ESDM). Der Fokus liegt auf dem affektiven Engagement. Die Neuroplastizität wird gesteigert, wenn Lernen in einer angenehmen und wechselseitigen sozialen Interaktion stattfindet.",
        practical: "Nutzen Sie sensorische soziale Routinen. Spiele wie „Guck-guck“, bei denen Sie eine strategische Pause einlegen. Die Stille am Höhepunkt des Spiels zwingt das Kind dazu, Sie anzusehen, damit der Spaß weitergeht.",
        ref: "Rogers, S. J. & Dawson, G. (2010). Frühstart-Denver-Modell für kleine Kinder mit Autismus."
    },
    motor: {
        title: "Bewegung & Nachahmung",
        concept: "Nachahmung ist die wichtigste Abkürzung für menschliches Lernen. In ABA ist die grob- und feinmotorische Kontrolle die Grundlage für die Autonomie (allein Anziehen, Essen) und für das Sprechen selbst (was feinmotorische Bewegungen des Mundes erfordert).",
        observation: [
            "Kann das Kind eine einfache Geste (z. B. Abschiedswinken oder Klatschen) nachahmen, wenn Sie es fragen: „Mach das“?",
            "Haben sie übermäßige Schwierigkeiten mit Besteck, Kleidungsknöpfen oder dem Halten eines Bleistifts?",
            "Scheinen sie einen „unbeholfenen“ Gang zu haben oder vermeiden sie Treppensteigen und instabile Untergründe?",
            "Können sie beim Treppensteigen mit beiden Füßen zusammen oder mit abwechselnden Füßen springen?"
        ],
        tech: "Konzentrieren Sie sich auf motorische Planung und Generalisierung. Die Entwicklung folgt einer cephalocaudalen Linie. Die grobmotorische Nachahmung ist ein direkter Prädiktor für den Erfolg bei der Nachahmung von Lauten und Phonemen.",
        practical: "Erstellen Sie einen schnellen Imitationsparcours. Führen Sie drei Bewegungen hintereinander aus (z. B. Hand auf den Kopf legen, klatschen, Fuß berühren) und sagen Sie „Mach das.“ Die Verst?rkung muss innerhalb von 3 Sekunden nach der richtigen Bewegung erfolgen, um die Verbindung zu fixieren.",
        ref: "Leaf, R. & McEachin, J. (1999). A Work in Progress: Behavior Management Strategies..."
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
        console.error(`Upsell-Ansicht ${viewId} nicht gefunden`);
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
        title: "1. Begrüßung und Kursübersicht",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25a452aad814cc4b41e4_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25a452aad814cc4b41e4_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25a452aad814cc4b41e4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25a452aad814cc4b41e4/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "2. Was ist VB-MAPP und warum ist es wichtig?",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2633392e72f9adef4925_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2633392e72f9adef4925_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2633392e72f9adef4925" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2633392e72f9adef4925/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "3. VB-MAPP Entwicklungsmeilensteine ​​verstehen",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d269f86e3a582c04ea089_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d269f86e3a582c04ea089_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d269f86e3a582c04ea089" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d269f86e3a582c04ea089/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "4. Wie man die Bewertung interpretiert und vorrangige Fähigkeiten identifiziert",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26ae900d8c9b45a3fb20_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26ae900d8c9b45a3fb20_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26ae900d8c9b45a3fb20" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26ae900d8c9b45a3fb20/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "5. Mands und Taktiken verstehen",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26b98b6c64d7fbc9fb3f_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26b98b6c64d7fbc9fb3f_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26b98b6c64d7fbc9fb3f" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26b98b6c64d7fbc9fb3f/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "6. Lernbarrieren, wie man sie erkennt und interveniert",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26c8162fa67651ecf1ae_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26c8162fa67651ecf1ae_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26c8162fa67651ecf1ae" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26c8162fa67651ecf1ae/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "7. Lehrziele unter Verwendung der IEP-Ziele und des Platzierungsleitfadens",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26df86e3a582c04ea0ef_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26df86e3a582c04ea0ef_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26df86e3a582c04ea0ef" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26df86e3a582c04ea0ef/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "8. Konditionierte Verstärkung und die natürlichen Interessen des Lernenden",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d271b392e72f9adef4a86_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d271b392e72f9adef4a86_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d271b392e72f9adef4a86" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d271b392e72f9adef4a86/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "9. Übergangs- und Selbstfürsorgefähigkeiten in der Intervention",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2728900d8c9b45a3fbaf_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2728900d8c9b45a3fbaf_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2728900d8c9b45a3fbaf" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2728900d8c9b45a3fbaf/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "10. Erstellen eines täglichen Unterrichtsplans basierend auf VB-MAPP",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25b10d2808c273f63ae5_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25b10d2808c273f63ae5_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25b10d2808c273f63ae5" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25b10d2808c273f63ae5/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "11. Vorbereitung auf das Unterrichten der einzelnen spezifischen Kompetenzbereiche",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25bd52aad814cc4b4214_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25bd52aad814cc4b4214_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25bd52aad814cc4b4214" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25bd52aad814cc4b4214/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "12. VPMTS – Visuell, wahrnehmungsbezogen und passend zur Probe",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25ca86e3a582c04e9f63_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25ca86e3a582c04e9f63_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25ca86e3a582c04e9f63" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25ca86e3a582c04e9f63/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "13. Nachahmung – motorisch und stimmlich",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25d52cca4d27f1c1e323_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25d52cca4d27f1c1e323_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25d52cca4d27f1c1e323" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25d52cca4d27f1c1e323/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "14. Echoisch – Verbale Wiederholung entwickeln",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25e0392e72f9adef48be_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25e0392e72f9adef48be_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25e0392e72f9adef48be" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25e0392e72f9adef48be/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "15. Vokal – Vom Lernenden initiiertes verbale Verhalten",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25ee19eaa3a949e78089_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25ee19eaa3a949e78089_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25ee19eaa3a949e78089" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25ee19eaa3a949e78089/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "16. LRFFC – Zuhörer antwortet nach Merkmal, Funktion und Klasse",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25fb0d2808c273f63b33_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25fb0d2808c273f63b33_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25fb0d2808c273f63b33" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25fb0d2808c273f63b33/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "17. Intraverbal – Antworten ohne visuelle Reize",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d260a162fa67651ecf09b_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d260a162fa67651ecf09b_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d260a162fa67651ecf09b" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d260a162fa67651ecf09b/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "18. Linguistischer – sozialer Sprachgebrauch",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2617900d8c9b45a3fa47_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2617900d8c9b45a3fa47_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2617900d8c9b45a3fa47" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2617900d8c9b45a3fa47/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "19. Unterrichtsroutinen – akademisches und Gruppenverhalten",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2624392e72f9adef490b_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2624392e72f9adef490b_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2624392e72f9adef490b" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2624392e72f9adef490b/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "20. Schreiben – Feinmotorische Entwicklung und schriftliche Produktion",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d263e162fa67651ecf0fe_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d263e162fa67651ecf0fe_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d263e162fa67651ecf0fe" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d263e162fa67651ecf0fe/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "21. Lesen – Worterkennung und -verständnis",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d264b2cca4d27f1c1e398_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d264b2cca4d27f1c1e398_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d264b2cca4d27f1c1e398" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d264b2cca4d27f1c1e398/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "22. Mathematik – Einführung in das numerische und logische Denken",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2656599fcc08351ee5e3_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2656599fcc08351ee5e3_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2656599fcc08351ee5e3" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2656599fcc08351ee5e3/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "23. Zusammenfassung – Wie man Fortschritte bewertet und den Unterricht weiterentwickelt",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26632cca4d27f1c1e3ba_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26632cca4d27f1c1e3ba_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26632cca4d27f1c1e3ba" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26632cca4d27f1c1e3ba/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
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
        type: "Practice Tip",
        colorClass: "bg-amber-50 text-amber-700",
        date: "Jan 9",
        timestamp: new Date('2026-01-09').getTime(),
        title: "Das Wiederholen desselben Verstärkers über mehrere Sitzungen hinweg kann seine Wirksamkeit stillschweigend verringern.",
        text: "Präferenzen ändern sich schneller, als die meisten Menschen erwarten."
    },
    {
        type: "Study",
        colorClass: "bg-indigo-50 text-indigo-700",
        date: "Jan 18",
        timestamp: new Date('2026-01-18').getTime(),
        title: "Der Blickkontakt nimmt beim gemeinsamen Spielen zuverlässiger zu.",
        text: "Untersuchungen zu naturalistischen entwicklungsbezogenen Verhaltensinterventionen zeigen, dass Augenkontakt eher entsteht, wenn der Erwachsene beim Spielen der Führung des Kindes folgt, als bei strukturierten Tischaufgaben."
    },
    {
        type: "Clinical Note",
        colorClass: "bg-blue-50 text-blue-700",
        date: "Jan 27",
        timestamp: new Date('2026-01-27').getTime(),
        title: "Therapeuten beobachten häufig ein vermindertes Fluchtverhalten, wenn die Aufgabenschwierigkeit vorübergehend verringert wird.",
        text: "Das Engagement erholt sich tendenziell vor der Genauigkeit – und das ist zu erwarten."
    },
    {
        type: "Clinical Fact",
        colorClass: "bg-blue-50 text-blue-700",
        date: "Jan 31",
        timestamp: new Date('2026-01-31').getTime(),
        title: "Kurzes, konsistentes Üben in verschiedenen Umgebungen stärkt das Lernen weitaus mehr als isolierte Sitzungen mit hoher Intensität.",
        text: "Die Verallgemeinerung erfolgt durch Wiederholung, nicht durch Lautstärke."
    },
    {
        type: "Tip",
        colorClass: "bg-amber-50 text-amber-700",
        date: "Feb 2",
        timestamp: new Date('2026-02-02').getTime(),
        title: "Schweigen kann eine Strategie sein.",
        text: "Wenn das Kind vor der Prompt einige Sekunden wartet, hat es Zeit, es zu verarbeiten und selbstständig zu reagieren. In dieser Pause passieren viele spontane Reaktionen."
    },
    {
        type: "Research Insight",
        colorClass: "bg-purple-50 text-purple-700",
        date: "Feb 2",
        timestamp: new Date('2026-02-02T12:00:00').getTime(),
        title: "Natürliche Verstärkung hält die Motivation länger aufrecht.",
        text: "Studien zum Vergleich künstlicher und natürlicher Verstärker zeigen, dass der Zugang zur Aktivität selbst das Engagement über längere Zeiträume aufrechterhält und die Verallgemeinerung unterstützt."
    },
    {
        type: "Observation",
        colorClass: "bg-teal-50 text-teal-700",
        date: "Feb 4",
        timestamp: new Date('2026-02-04').getTime(),
        title: "Kinder kommunizieren eher spontan, wenn Erwachsene sofort und bedeutungsvoll reagieren – selbst auf Annäherungsversuche.",
        text: "Reaktionsfähigkeit ist wichtiger als Perfektion."
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
        console.error("Authentifizierungsfehler", e);
        return;
    }

    if (!window.supabaseClient) {
        // Retry a bit later if client not ready (unlikely given flow, but safe)
        console.warn("Supabase-Client ist noch nicht bereit zum Laden des Profils.");
        return;
    }

    // Fetch user details suitable for the profile
    // We assume 'user_access' contains the user info.
    // If user has multiple products, they have multiple rows. We update name for all.
    const { data, error } = await window.supabaseClient
        .from('user_access')
        .select('name, email, phone')
        .ilike('email', email)
        .limit(1);

    if (error) {
        console.error('Fehler beim Abrufen des Profils:', error);
        return;
    }

    if (data && data.length > 0) {
        const user = data[0];
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
        msg.textContent = "Bitte geben Sie einen Namen ein.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
        return;
    }

    const btn = document.getElementById('save-profile-btn');
    const originalContent = `<span>Änderungen speichern</span><i data-lucide="save" class="w-4 h-4"></i>`;

    btn.innerHTML = '<span>Speichern...</span><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
    btn.disabled = true;
    lucide.createIcons();

    const storedAuth = localStorage.getItem('abatools_auth');
    let email;
    try {
        email = JSON.parse(storedAuth).email;
    } catch (e) { return; }

    try {
        // Update Name and Phone in DB
        const { error } = await window.supabaseClient
            .from('user_access')
            .update({ name: newName, phone: newPhone })
            .ilike('email', email);

        if (error) throw error;

        // Success Feedback
        btn.innerHTML = `<span>Gespeichert!</span><i data-lucide="check" class="w-4 h-4"></i>`;
        btn.classList.add('bg-green-600');

        const msg = document.getElementById('profile-message');
        msg.textContent = "Profil erfolgreich aktualisiert!";
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
        console.error('Fehler beim Aktualisieren des Profils:', err);
        btn.innerHTML = originalContent;
        btn.disabled = false;

        const msg = document.getElementById('profile-message');
        msg.textContent = "Aktualisierung fehlgeschlagen. Bitte versuchen Sie es erneut.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
    }
    lucide.createIcons();
}
