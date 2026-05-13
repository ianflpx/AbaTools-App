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
            el.id === 'program-view-aba-facilitation-techniques' ||
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
        title: "Communication et Langage",
        concept: "En ABA, le langage est vu comme un comportement fonctionnel. Nous ne nous concentrons pas uniquement sur l'acte de prononcer des mots, mais sur la fonction sociale : pourquoi l'enfant parle-t-il ? L'objectif est de remplacer les comportements perturbateurs (pleurs, colères) par une communication efficace.",
        observation: [
            "L'enfant tire-t-il votre main vers ce qu'il veut au lieu de pointer ou d'essayer de faire un son ?",
            "Répète-t-il des phrases de dessins animés ou des lignes mémorisées sans contexte apparent (écholalie) ?",
            "Lorsqu'il demande un objet, établit-il un contact visuel ou regarde-t-il seulement l'objet désiré ?",
            "Répond-il lorsqu'on l'appelle par son nom à la première ou deuxième tentative ?"
        ],
        tech: "Basé sur le protocole VB-MAPP et le Comportement Verbal de B.F. Skinner. L'enseignement est divisé en Opérants Verbaux : Mand (demande), Tact (dénomination) et Intraverbal (réponse/conversation).",
        practical: "Utilisez l'Entraînement à la Communication Fonctionnelle (FCT). Identifiez quelque chose de très motivant, tenez l'objet et attendez une tentative de demande. Si l'enfant ne répond pas, fournissez une \"incitation\" (modèlez le mot) et donnez l'objet immédiatement après sa tentative.",
        ref: "Skinner, B.F. (1957). Verbal Behavior."
    },
    logical: {
        title: "Raisonnement et Schémas",
        concept: "Ce domaine est la base de l'alphabétisation et des mathématiques. Nous travaillons sur la capacité du cerveau à organiser les stimuli visuels, identifier les similitudes et comprendre la prévisibilité de l'environnement.",
        observation: [
            "L'enfant peut-il regrouper spontanément des objets par couleur ou taille ?",
            "Remarque-t-il quand vous changez l'ordre d'une routine ou déplacez un objet dans la maison ?",
            "Peut-il assembler des puzzles simples de 2 ou 3 pièces, ou jette-t-il simplement les pièces ?",
            "Comprend-il la cause à effet (ex: savoir qu'appuyer sur un bouton allume un jouet) ?"
        ],
        tech: "Nous utilisons l'Enseignement par Essais Discrets (DTT) et le concept d'Appariement. La science prouve que la fluidité dans les schémas visuels réduit l'anxiété et améliore la concentration sur les tâches structurées.",
        practical: "Travaillez sur la Catégorisation Fonctionnelle. Au lieu de simplement trier des couleurs, demandez-lui de séparer \"les choses qu'on utilise pour manger\" et \"les choses qu'on utilise pour s'habiller\". Cela force le cerveau à sortir du \"pilote automatique\" pour créer des concepts abstraits.",
        ref: "Lovaas, O.I. (1987). Behavioral treatment and normal educational and intellectual functioning in young autistic children."
    },
    social: {
        title: "Interaction et Émotions",
        concept: "Nous nous concentrons sur l'attention conjointe et la théorie de l'esprit. Cela implique de développer la capacité de percevoir que les autres ont des sentiments et des désirs, et qu'interagir avec les gens peut être plus gratifiant qu'interagir avec des objets.",
        observation: [
            "Quand l'enfant voit quelque chose de cool, vous regarde-t-il pour partager la joie du moment ?",
            "Montre-t-il de l'intérêt à observer ce que font les autres enfants (même s'il ne joue pas avec eux) ?",
            "Réagit-il aux expressions faciales exagérées (ex: si vous faites semblant de pleurer ou de rire fort) ?",
            "Vous apporte-t-il des jouets juste pour vous les montrer, sans nécessairement vouloir que vous fassiez quelque chose ?"
        ],
        tech: "Basé sur le Modèle de Denver (ESDM). L'accent est mis sur l'engagement affectif. La neuroplasticité est stimulée lorsque l'apprentissage se fait au sein d'une interaction sociale plaisante et réciproque.",
        practical: "Utilisez des Routines Sociales Sensorielles. Des jeux comme \"coucou-caché\" où vous faites une pause stratégique. Le silence au point culminant du jeu force l'enfant à vous regarder pour que le plaisir continue.",
        ref: "Rogers, S. J., & Dawson, G. (2010). Early Start Denver Model for Young Children with Autism."
    },
    motor: {
        title: "Mouvement et Imitation",
        concept: "L'imitation est le principal raccourci pour l'apprentissage humain. En ABA, le contrôle moteur global et fin est la base de l'autonomie (s'habiller, manger seul) et de la parole elle-même (qui nécessite des mouvements moteurs fins de la bouche).",
        observation: [
            "L'enfant peut-il imiter un geste simple (comme faire au revoir ou applaudir) si vous demandez \"fais ça\" ?",
            "A-t-il des difficultés excessives avec les couverts, les boutons de vêtements ou pour tenir un crayon ?",
            "Semble-t-il avoir une démarche \"maladroite\" ou éviter de monter les escaliers et les surfaces instables ?",
            "Peut-il sauter à pieds joints ou alterner les pieds en montant les escaliers ?"
        ],
        tech: "Concentrez-vous sur la Planification Motrice et la Généralisation. Le développement suit une ligne céphalo-caudale. L'imitation motrice globale est un prédicteur direct du succès dans l'imitation des sons et des phonèmes.",
        practical: "Créez un Circuit d'Imitation Rapide. Effectuez 3 mouvements à la suite (ex: main sur la tête, applaudir, toucher le pied) et dites \"fais ça\". Le renforcement doit être délivré dans les 3 secondes suivant le mouvement correct pour fixer la connexion.",
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
        li.innerHTML = `
            <i data-lucide="help-circle" class="w-5 h-5 text-action flex-shrink-0 mt-0.5"></i>
            <span class="text-sm text-gray-600 leading-relaxed">${item}</span>
        `;
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
    if (!view) {
        console.error('Modal program-view-naturalistic-mastery not found');
        return;
    }
    view.classList.remove('hidden');
    view.classList.add('block');
    lucide.createIcons();
}

function closeNaturalisticMastery() {
    const view = document.getElementById('program-view-naturalistic-mastery');
    if (!view) return;
    view.classList.add('hidden');
    view.classList.remove('block');
}

function openUpsellView(viewId) {
    const view = document.getElementById(viewId);
    if (!view) {
        console.error(`Upsell view ${viewId} not found`);
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

function openToolkitModal() {
    const programView = document.getElementById('modal-toolkit');
    if (!programView) {
        console.error('Modal modal-toolkit not found');
        return;
    }
    programView.classList.remove('hidden');
    programView.classList.add('block');
    lucide.createIcons();
}

function closeToolkitModal() {
    const programView = document.getElementById('modal-toolkit');
    if (!programView) return;
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
        title: "1. Bienvenue et Présentation du Cours",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25a452aad814cc4b41e4_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25a452aad814cc4b41e4_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25a452aad814cc4b41e4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25a452aad814cc4b41e4/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "2. Qu'est-ce que le VB-MAPP et Pourquoi c'est Important",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2633392e72f9adef4925_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2633392e72f9adef4925_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2633392e72f9adef4925" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2633392e72f9adef4925/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "3. Comprendre les Jalons de Développement du VB-MAPP",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d269f86e3a582c04ea089_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d269f86e3a582c04ea089_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d269f86e3a582c04ea089" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d269f86e3a582c04ea089/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "4. Comment Interpréter l'Évaluation et Identifier les Compétences Prioritaires",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26ae900d8c9b45a3fb20_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26ae900d8c9b45a3fb20_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26ae900d8c9b45a3fb20" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26ae900d8c9b45a3fb20/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "5. Comprendre les Mands et les Tacts",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26b98b6c64d7fbc9fb3f_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26b98b6c64d7fbc9fb3f_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26b98b6c64d7fbc9fb3f" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26b98b6c64d7fbc9fb3f/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "6. Barrières à l'Apprentissage : Comment les Identifier et Intervenir",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26c8162fa67651ecf1ae_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26c8162fa67651ecf1ae_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26c8162fa67651ecf1ae" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26c8162fa67651ecf1ae/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "7. Objectifs d'Enseignement avec les Objectifs PEI et le Guide de Placement",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26df86e3a582c04ea0ef_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26df86e3a582c04ea0ef_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26df86e3a582c04ea0ef" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26df86e3a582c04ea0ef/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "8. Renforcement Conditionné et Intérêts Naturels de l'Apprenant",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d271b392e72f9adef4a86_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d271b392e72f9adef4a86_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d271b392e72f9adef4a86" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d271b392e72f9adef4a86/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "9. Transition et Compétences d'Autonomie dans l'Intervention",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2728900d8c9b45a3fbaf_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2728900d8c9b45a3fbaf_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2728900d8c9b45a3fbaf" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2728900d8c9b45a3fbaf/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "10. Créer un Plan d'Enseignement Quotidien Basé sur le VB-MAPP",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25b10d2808c273f63ae5_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25b10d2808c273f63ae5_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25b10d2808c273f63ae5" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25b10d2808c273f63ae5/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "11. Se Préparer à Enseigner Chaque Domaine de Compétence Spécifique",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25bd52aad814cc4b4214_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25bd52aad814cc4b4214_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25bd52aad814cc4b4214" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25bd52aad814cc4b4214/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "12. VPMTS – Perception Visuelle et Appariement",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25ca86e3a582c04e9f63_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25ca86e3a582c04e9f63_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25ca86e3a582c04e9f63" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25ca86e3a582c04e9f63/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "13. Imitation – Motrice et Vocale",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25d52cca4d27f1c1e323_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25d52cca4d27f1c1e323_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25d52cca4d27f1c1e323" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25d52cca4d27f1c1e323/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "14. Échoïque – Développer la Répétition Verbale",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25e0392e72f9adef48be_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25e0392e72f9adef48be_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25e0392e72f9adef48be" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25e0392e72f9adef48be/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "15. Vocal – Comportement Verbal Initié par l'Apprenant",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25ee19eaa3a949e78089_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25ee19eaa3a949e78089_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25ee19eaa3a949e78089" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25ee19eaa3a949e78089/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "16. LRFFC – Réponse de l'Auditeur par Caractéristique, Fonction et Classe",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25fb0d2808c273f63b33_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25fb0d2808c273f63b33_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25fb0d2808c273f63b33" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25fb0d2808c273f63b33/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "17. Intraverbal – Répondre Sans Stimuli Visuels",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d260a162fa67651ecf09b_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d260a162fa67651ecf09b_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d260a162fa67651ecf09b" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d260a162fa67651ecf09b/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "18. Linguistique – Usage Social du Langage",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2617900d8c9b45a3fa47_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2617900d8c9b45a3fa47_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2617900d8c9b45a3fa47" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2617900d8c9b45a3fa47/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "19. Routines de Classe – Comportements Académiques et de Groupe",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2624392e72f9adef490b_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2624392e72f9adef490b_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2624392e72f9adef490b" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2624392e72f9adef490b/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "20. Écriture – Développement Moteur Fin et Production Écrite",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d263e162fa67651ecf0fe_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d263e162fa67651ecf0fe_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d263e162fa67651ecf0fe" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d263e162fa67651ecf0fe/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "21. Lecture – Reconnaissance des Mots et Compréhension",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d264b2cca4d27f1c1e398_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d264b2cca4d27f1c1e398_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d264b2cca4d27f1c1e398" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d264b2cca4d27f1c1e398/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "22. Mathématiques – Introduction à la Pensée Numérique et Logique",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2656599fcc08351ee5e3_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2656599fcc08351ee5e3_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2656599fcc08351ee5e3" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2656599fcc08351ee5e3/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "23. Conclusion – Comment Évaluer les Progrès et Faire Évoluer l'Enseignement",
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

        div.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                    <i data-lucide="play" class="w-5 h-5 fill-current border-none"></i>
                </div>
                <h4 class="font-bold text-dark text-sm leading-tight">${video.title}</h4>
            </div>
            <i data-lucide="chevron-right" class="w-5 h-5 text-gray-300"></i>
        `;
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
        type: "Conseil Pratique",
        colorClass: "bg-amber-50 text-amber-700",
        date: "9 janv.",
        timestamp: new Date('2026-01-09').getTime(),
        title: "Répéter le même renforçateur au cours des séances peut réduire discrètement son efficacité.",
        text: "La préférence change plus vite que ce que la plupart des gens pensent."
    },
    {
        type: "Étude",
        colorClass: "bg-indigo-50 text-indigo-700",
        date: "18 janv.",
        timestamp: new Date('2026-01-18').getTime(),
        title: "Le contact visuel augmente de manière plus fiable lors du jeu partagé.",
        text: "La recherche sur les Interventions Comportementales Développementales Naturalistes montre que le contact visuel est plus susceptible d'émerger lorsque l'adulte suit l'initiative de l'enfant pendant le jeu, plutôt que lors de tâches structurées à table."
    },
    {
        type: "Note Clinique",
        colorClass: "bg-blue-50 text-blue-700",
        date: "27 janv.",
        timestamp: new Date('2026-01-27').getTime(),
        title: "Les thérapeutes observent souvent une réduction des comportements d'évitement lorsque la difficulté de la tâche est temporairement réduite.",
        text: "L'engagement a tendance à se rétablir avant la précision — et c'est normal."
    },
    {
        type: "Fait Clinique",
        colorClass: "bg-blue-50 text-blue-700",
        date: "31 janv.",
        timestamp: new Date('2026-01-31').getTime(),
        title: "Une pratique courte et cohérente dans différents environnements renforce l'apprentissage bien plus que des séances isolées à haute intensité.",
        text: "La généralisation se construit par la répétition, pas par le volume."
    },
    {
        type: "Conseil",
        colorClass: "bg-amber-50 text-amber-700",
        date: "2 févr.",
        timestamp: new Date('2026-02-02').getTime(),
        title: "Le silence peut être une stratégie.",
        text: "Attendre quelques secondes avant d'inciter donne à l'enfant le temps de traiter et de répondre indépendamment. De nombreuses réponses spontanées se produisent dans cette pause."
    },
    {
        type: "Aperçu Recherche",
        colorClass: "bg-purple-50 text-purple-700",
        date: "2 févr.",
        timestamp: new Date('2026-02-02T12:00:00').getTime(),
        title: "Le renforcement naturel soutient la motivation plus longtemps.",
        text: "Les études comparant les renforçateurs artificiels vs naturels indiquent que l'accès à l'activité elle-même maintient l'engagement sur de plus longues périodes et soutient la généralisation."
    },
    {
        type: "Observation",
        colorClass: "bg-teal-50 text-teal-700",
        date: "4 févr.",
        timestamp: new Date('2026-02-04').getTime(),
        title: "Les enfants sont plus susceptibles de communiquer spontanément lorsque les adultes répondent immédiatement et de manière significative — même aux approximations.",
        text: "La réactivité compte plus que la perfection."
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
        div.innerHTML = `
            <div class="flex items-center gap-3 mb-2">
                <span class="${item.colorClass} text-[0.65rem] font-bold px-2 py-1 rounded-full uppercase tracking-wider">${item.type}</span>
                <span class="text-xs text-gray-400">${item.date}</span>
            </div>
            <h3 class="font-bold text-dark text-lg leading-tight">${item.title}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">${item.text}</p>
        `;
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
        console.error("Auth error", e);
        return;
    }

    if (!window.supabaseClient) {
        // Retry a bit later if client not ready (unlikely given flow, but safe)
        console.warn("Supabase client not ready yet for profile load.");
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
        console.error('Error fetching profile:', error);
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
        msg.textContent = "Veuillez entrer un nom.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
        return;
    }

    const btn = document.getElementById('save-profile-btn');
    const originalContent = `<span>Enregistrer les modifications</span><i data-lucide="save" class="w-4 h-4"></i>`;

    btn.innerHTML = '<span>Sauvegarde...</span><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
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
        btn.innerHTML = `<span>Enregistré !</span><i data-lucide="check" class="w-4 h-4"></i>`;
        btn.classList.add('bg-green-600');

        const msg = document.getElementById('profile-message');
        msg.textContent = "Profil mis à jour avec succès !";
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
        console.error('Error updating profile:', err);
        btn.innerHTML = originalContent;
        btn.disabled = false;

        const msg = document.getElementById('profile-message');
        msg.textContent = "Échec de la mise à jour. Veuillez réessayer.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
    }
    lucide.createIcons();
}
