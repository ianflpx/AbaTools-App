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
        title: "Comunicazione e linguaggio",
        concept: "In ABA, il linguaggio è visto come un comportamento funzionale. Non ci concentriamo esclusivamente sull’atto di pronunciare parole, ma sulla funzione sociale: perché il bambino parla? L’obiettivo è sostituire i comportamenti problema (pianto, capricci) con una comunicazione efficace.",
        observation: [
            "Il bambino ti tira la mano verso ciò che vuole invece di indicarla o tentare di emettere un suono?",
            "Ripetono frasi di cartoni animati o battute memorizzate senza contesto apparente (ecolalia)?",
            "Quando richiedono un oggetto, stabiliscono un contatto visivo o guardano solo l'oggetto desiderato?",
            "Rispondono quando vengono chiamati per nome al primo o al secondo tentativo?"
        ],
        tech: "Basato sul protocollo VB-MAPP e sul comportamento verbale di B.F. Skinner. L'insegnamento è diviso in operanti verbali: Mand (richiedere), Tact (etichettare) e Intraverbale (rispondere/conversare).",
        practical: "Usa il training di comunicazione funzionale (FCT). Identifica qualcosa di alta motivazione, tieni l'oggetto e attendi un tentativo di richiesta. Se il bambino non risponde, fornisci un \"prompt\" (modella la parola) e consegna l'oggetto immediatamente dopo il tentativo.",
        ref: "Skinner, B.F. (1957). Verbal Behavior."
    },
    logical: {
        title: "Ragionamento e schemi",
        concept: "Quest’area è la base per l’alfabetizzazione e la matematica. Lavoriamo sulla capacità del cervello di organizzare gli stimoli visivi, identificare le somiglianze e comprendere la prevedibilità dell'ambiente.",
        observation: [
            "Il bambino riesce a raggruppare spontaneamente gli oggetti per colore o dimensione?",
            "Si accorgono quando cambi l'ordine di una routine o sposti la posizione di un oggetto in casa?",
            "Possono assemblare semplici puzzle da 2 o 3 pezzi o si limitano a lanciare i pezzi?",
            "Comprendono causa ed effetto (ad esempio, sanno che premendo un pulsante si accende un giocattolo)?"
        ],
        tech: "Utilizziamo il Discrete Trial Training (DTT) e il concetto di Matching-to-Sample. La scienza dimostra che la fluidità degli schemi visivi riduce l’ansia e migliora la concentrazione su compiti strutturati.",
        practical: "Lavora sulla categorizzazione funzionale. Invece di limitarsi a ordinare i colori, chiedi loro di separare \"cose ​​che usiamo per mangiare\" e \"cose ​​che usiamo per indossare\". Ciò costringe il cervello a uscire dal \"pilota automatico\" per creare concetti astratti.",
        ref: "Lovaas, O.I. (1987). Trattamento comportamentale e normale funzionamento educativo e intellettuale nei bambini autistici."
    },
    social: {
        title: "Interazione ed emotività",
        concept: "Ci concentriamo su \"Attenzione Congiunta\" e \"Teoria della Mente\". Ciò implica sviluppare la capacità di percepire che gli altri provano sentimenti e desideri e che interagire con le persone può essere più gratificante che interagire con gli oggetti.",
        observation: [
            "Quando il bambino vede qualcosa di bello, ti guarda per condividere la gioia del momento?",
            "Mostrano interesse nell'osservare cosa fanno gli altri bambini (anche se non giocano insieme)?",
            "Reagiscono a espressioni facciali esagerate (ad esempio, se fai finta di piangere o ridi forte)?",
            "Ti portano i giocattoli in grembo solo per mostrarteli, senza necessariamente volere che tu faccia qualcosa?"
        ],
        tech: "Basato sul modello Early Start Denver (ESDM). Il focus è sul coinvolgimento affettivo. La neuroplasticità viene potenziata quando l’apprendimento avviene all’interno di un’interazione sociale piacevole e reciproca.",
        practical: "Usa routine sociali sensoriali. Giochi come \"peek-a-boo\" in cui fai una pausa strategica. Il silenzio nel momento pi? atteso del gioco costringe il bambino a guardarti perché il divertimento continui.",
        ref: "Rogers, SJ e Dawson, G. (2010). Modello Early Start Denver per bambini piccoli con autismo."
    },
    motor: {
        title: "Movimento e imitazione",
        concept: "L’imitazione è la scorciatoia principale per l’apprendimento umano. In ABA, il controllo motorio grossolano e fine è la base per l'autonomia (vestirsi, mangiare da soli) e per il linguaggio stesso (che richiede movimenti motori fini della bocca).",
        observation: [
            "Può il bambino imitare un gesto semplice (come salutare o battere le mani) se gli chiedi \"fai questo\"?",
            "Hanno eccessive difficoltà con le posate, i bottoni dei vestiti o con il tenere una matita?",
            "Sembra che abbiano un'andatura \"goffa\" o evitino di salire scale e superfici instabili?",
            "Possono saltare con entrambi i piedi uniti o alternare i piedi quando salgono le scale?"
        ],
        tech: "Focus sulla pianificazione e generalizzazione motoria. Lo sviluppo segue una linea cefalocaudale. L’imitazione motoria grossolana è un predittore diretto del successo nell’imitazione di suoni e fonemi.",
        practical: "Crea un circuito di imitazione rapida. Esegui 3 movimenti di seguito (ad esempio, mano sulla testa, batti le mani, tocca il piede) e dì \"fai questo\". Il rinforzo deve essere consegnato entro 3 secondi dal movimento corretto per fissare la connessione.",
        ref: "Leaf, R., & McEachin, J. (1999). A Work in Progress: Behavior Management Strategies..."
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
        console.error(`Vista upsell ${viewId} non trovata`);
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
        title: "1. Benvenuto e panoramica del corso",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25a452aad814cc4b41e4_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25a452aad814cc4b41e4_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25a452aad814cc4b41e4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25a452aad814cc4b41e4/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "2. Cos'è il VB-MAPP e perché è importante",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2633392e72f9adef4925_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2633392e72f9adef4925_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2633392e72f9adef4925" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2633392e72f9adef4925/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "3. Comprendere le tappe fondamentali dello sviluppo VB-MAPP",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d269f86e3a582c04ea089_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d269f86e3a582c04ea089_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d269f86e3a582c04ea089" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d269f86e3a582c04ea089/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "4. Come interpretare la valutazione e identificare le competenze prioritarie",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26ae900d8c9b45a3fb20_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26ae900d8c9b45a3fb20_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26ae900d8c9b45a3fb20" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26ae900d8c9b45a3fb20/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "5. Comprendere le richieste e i tatti",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26b98b6c64d7fbc9fb3f_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26b98b6c64d7fbc9fb3f_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26b98b6c64d7fbc9fb3f" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26b98b6c64d7fbc9fb3f/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "6. Barriere all'apprendimento Come identificare e intervenire",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26c8162fa67651ecf1ae_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26c8162fa67651ecf1ae_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26c8162fa67651ecf1ae" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26c8162fa67651ecf1ae/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "7. Obiettivi didattici utilizzando gli obiettivi IEP e la guida al posizionamento",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26df86e3a582c04ea0ef_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26df86e3a582c04ea0ef_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26df86e3a582c04ea0ef" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26df86e3a582c04ea0ef/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "8. Rinforzo condizionato e interessi naturali dello studente",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d271b392e72f9adef4a86_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d271b392e72f9adef4a86_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d271b392e72f9adef4a86" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d271b392e72f9adef4a86/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "9. Capacità di transizione e cura di sé nell'intervento",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2728900d8c9b45a3fbaf_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2728900d8c9b45a3fbaf_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2728900d8c9b45a3fbaf" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2728900d8c9b45a3fbaf/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "10. Creare un piano didattico quotidiano basato su VB-MAPP",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25b10d2808c273f63ae5_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25b10d2808c273f63ae5_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25b10d2808c273f63ae5" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25b10d2808c273f63ae5/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "11. Preparazione per insegnare ciascuna area di abilità specifica",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25bd52aad814cc4b4214_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25bd52aad814cc4b4214_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25bd52aad814cc4b4214" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25bd52aad814cc4b4214/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "12. VPMTS – Visivo, percettivo e abbinamento al campione",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25ca86e3a582c04e9f63_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25ca86e3a582c04e9f63_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25ca86e3a582c04e9f63" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25ca86e3a582c04e9f63/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "13. Imitazione – Motoria e vocale",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25d52cca4d27f1c1e323_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25d52cca4d27f1c1e323_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25d52cca4d27f1c1e323" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25d52cca4d27f1c1e323/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "14. Ecoico – Sviluppare la ripetizione verbale",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25e0392e72f9adef48be_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25e0392e72f9adef48be_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25e0392e72f9adef48be" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25e0392e72f9adef48be/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "15. Voce – Comportamento verbale avviato dallo studente",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25ee19eaa3a949e78089_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25ee19eaa3a949e78089_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25ee19eaa3a949e78089" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25ee19eaa3a949e78089/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "16. LRFFC – Risposta dell'ascoltatore per caratteristica, funzione e classe",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25fb0d2808c273f63b33_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25fb0d2808c273f63b33_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25fb0d2808c273f63b33" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25fb0d2808c273f63b33/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "17. Intraverbale – Rispondere senza stimoli visivi",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d260a162fa67651ecf09b_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d260a162fa67651ecf09b_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d260a162fa67651ecf09b" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d260a162fa67651ecf09b/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "18. Uso linguistico – sociale della lingua",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2617900d8c9b45a3fa47_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2617900d8c9b45a3fa47_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2617900d8c9b45a3fa47" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2617900d8c9b45a3fa47/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "19. Routine di classe – Comportamenti accademici e di gruppo",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2624392e72f9adef490b_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2624392e72f9adef490b_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2624392e72f9adef490b" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2624392e72f9adef490b/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "20. Scrittura – Sviluppo motorio fine e produzione scritta",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d263e162fa67651ecf0fe_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d263e162fa67651ecf0fe_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d263e162fa67651ecf0fe" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d263e162fa67651ecf0fe/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "21. Lettura – Riconoscimento e comprensione delle parole",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d264b2cca4d27f1c1e398_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d264b2cca4d27f1c1e398_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d264b2cca4d27f1c1e398" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d264b2cca4d27f1c1e398/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "22. Matematica – Introduzione al pensiero numerico e logico",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2656599fcc08351ee5e3_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2656599fcc08351ee5e3_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2656599fcc08351ee5e3" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2656599fcc08351ee5e3/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "23. Conclusioni – Come valutare i progressi ed evolvere l'insegnamento",
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
        title: "Ripetere lo stesso rinforzo tra una sessione e l'altra può ridurne silenziosamente l'efficacia.",
        text: "Le preferenze cambiano più velocemente di quanto la maggior parte delle persone si aspetti."
    },
    {
        type: "Study",
        colorClass: "bg-indigo-50 text-indigo-700",
        date: "Jan 18",
        timestamp: new Date('2026-01-18').getTime(),
        title: "Il contatto visivo aumenta in modo più affidabile durante il gioco condiviso.",
        text: "La ricerca sugli interventi comportamentali sullo sviluppo naturalistico mostra che è più probabile che il contatto visivo emerga quando l’adulto segue l’esempio del bambino durante il gioco, piuttosto che durante compiti a tavola strutturati."
    },
    {
        type: "Clinical Note",
        colorClass: "bg-blue-50 text-blue-700",
        date: "Jan 27",
        timestamp: new Date('2026-01-27').getTime(),
        title: "I terapisti spesso osservano comportamenti di fuga ridotti quando la difficoltà del compito viene temporaneamente ridotta.",
        text: "Il coinvolgimento tende a riprendersi prima che lo faccia la precisione, e questo è previsto."
    },
    {
        type: "Clinical Fact",
        colorClass: "bg-blue-50 text-blue-700",
        date: "Jan 31",
        timestamp: new Date('2026-01-31').getTime(),
        title: "Una pratica breve e coerente in ambienti diversi rafforza l’apprendimento molto più di sessioni isolate e ad alta intensità.",
        text: "La generalizzazione si costruisce attraverso la ripetizione, non il volume."
    },
    {
        type: "Tip",
        colorClass: "bg-amber-50 text-amber-700",
        date: "Feb 2",
        timestamp: new Date('2026-02-02').getTime(),
        title: "Il silenzio può essere una strategia.",
        text: "Aspettare qualche secondo prima del prompt dà al bambino il tempo di elaborare e rispondere in modo indipendente. Molte risposte spontanee avvengono in quella pausa."
    },
    {
        type: "Research Insight",
        colorClass: "bg-purple-50 text-purple-700",
        date: "Feb 2",
        timestamp: new Date('2026-02-02T12:00:00').getTime(),
        title: "Il rinforzo naturale sostiene la motivazione più a lungo.",
        text: "Gli studi che confrontano i rinforzi artificiali con quelli naturali indicano che l’accesso all’attività stessa mantiene l’impegno per periodi più lunghi e supporta la generalizzazione."
    },
    {
        type: "Observation",
        colorClass: "bg-teal-50 text-teal-700",
        date: "Feb 4",
        timestamp: new Date('2026-02-04').getTime(),
        title: "È più probabile che i bambini comunichino spontaneamente quando gli adulti rispondono immediatamente e in modo significativo, anche alle approssimazioni.",
        text: "La reattività conta più della perfezione."
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
        console.error("Errore di autenticazione", e);
        return;
    }

    if (!window.supabaseClient) {
        // Retry a bit later if client not ready (unlikely given flow, but safe)
        console.warn("Supabase client non ancora pronto per il caricamento del profilo.");
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
        console.error('Errore durante il recupero del profilo:', error);
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
        msg.textContent = "Inserisci un nome.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
        return;
    }

    const btn = document.getElementById('save-profile-btn');
    const originalContent = `<span>Salva modifiche</span><i data-lucide="save" class="w-4 h-4"></i>`;

    btn.innerHTML = '<span>Salvataggio...</span><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
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
        btn.innerHTML = `<span>Salvato!</span><i data-lucide="check" class="w-4 h-4"></i>`;
        btn.classList.add('bg-green-600');

        const msg = document.getElementById('profile-message');
        msg.textContent = "Profilo aggiornato con successo!";
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
        console.error('Errore durante l\'aggiornamento del profilo:', err);
        btn.innerHTML = originalContent;
        btn.disabled = false;

        const msg = document.getElementById('profile-message');
        msg.textContent = "Impossibile aggiornare. Per favore riprova.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
    }
    lucide.createIcons();
}
