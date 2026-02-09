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
        title: "Communication & Language",
        concept: "In ABA, language is viewed as functional behavior. We don’t focus solely on the act of speaking words, but on the social function: why does the child speak? The goal is to replace disruptive behaviors (crying, tantrums) with effective communication.",
        observation: [
            "Does the child pull your hand toward what they want instead of pointing or attempting a sound?",
            "Do they repeat phrases from cartoons or memorized lines without apparent context (echolalia)?",
            "When requesting an object, do they make eye contact or look only at the desired item?",
            "Do they respond when called by name on the first or second attempt?"
        ],
        tech: "Based on the VB-MAPP protocol and B.F. Skinner’s Verbal Behavior. Teaching is divided into Verbal Operants: Mand (requesting), Tact (labeling), and Intraverbal (answering/conversing).",
        practical: "Use Functional Communication Training (FCT). Identify something of high motivation, hold the object, and wait for a request attempt. If the child doesn't respond, provide a \"prompt\" (model the word) and deliver the object immediately after their attempt.",
        ref: "Skinner, B.F. (1957). Verbal Behavior."
    },
    logical: {
        title: "Reasoning & Patterns",
        concept: "This area is the foundation for literacy and mathematics. We work on the brain's ability to organize visual stimuli, identify similarities, and understand the predictability of the environment.",
        observation: [
            "Can the child spontaneously group objects by color or size?",
            "Do they notice when you change the order of a routine or move an object's location in the house?",
            "Can they assemble simple 2 or 3-piece puzzles, or do they just throw the pieces?",
            "Do they understand cause and effect (e.g., knowing that pressing a button turns on a toy)?"
        ],
        tech: "We utilize Discrete Trial Training (DTT) and the concept of Matching-to-Sample. Science proves that fluency in visual patterns reduces anxiety and improves focus on structured tasks.",
        practical: "Work on Functional Categorization. Instead of just sorting colors, ask them to separate \"things we use to eat\" and \"things we use to wear.\" This forces the brain out of \"auto-pilot\" to create abstract concepts.",
        ref: "Lovaas, O.I. (1987). Behavioral treatment and normal educational and intellectual functioning in young autistic children."
    },
    social: {
        title: "Interaction & Emotional",
        concept: "We focus on \"Joint Attention\" and \"Theory of Mind.\" This involves developing the ability to perceive that others have feelings and desires, and that interacting with people can be more rewarding than interacting with objects.",
        observation: [
            "When the child sees something cool, do they look at you to share the joy of the moment?",
            "Do they show interest in observing what other children are doing (even if they don't play along)?",
            "Do they react to exaggerated facial expressions (e.g., if you pretend to cry or laugh loudly)?",
            "Do they bring toys to your lap just to show them to you, without necessarily wanting you to do something?"
        ],
        tech: "Based on the Early Start Denver Model (ESDM). The focus is on affective engagement. Neuroplasticity is boosted when learning occurs within a pleasurable and reciprocal social interaction.",
        practical: "Use Sensory Social Routines. Games like \"peek-a-boo\" where you make a strategic pause. The silence at the climax of the play forces the child to look at you for the fun to continue.",
        ref: "Rogers, S. J., & Dawson, G. (2010). Early Start Denver Model for Young Children with Autism."
    },
    motor: {
        title: "Movement & Imitation",
        concept: "Imitation is the primary shortcut for human learning. In ABA, gross and fine motor control is the basis for autonomy (dressing, eating alone) and for speech itself (which requires fine motor movements of the mouth).",
        observation: [
            "Can the child imitate a simple gesture (like waving bye or clapping) if you ask \"do this\"?",
            "Do they have excessive difficulty with cutlery, clothing buttons, or holding a pencil?",
            "Do they seem to have a \"clumsy\" gait or avoid climbing stairs and unstable surfaces?",
            "Can they jump with both feet together or alternate feet when climbing stairs?"
        ],
        tech: "Focus on Motor Planning and Generalization. Development follows a cephalocaudal line. Gross motor imitation is a direct predictor for success in imitating sounds and phonemes.",
        practical: "Create a Rapid Imitation Circuit. Perform 3 movements in a row (e.g., hand on head, clap, touch foot) and say \"do this.\" Reinforcement must be delivered within 3 seconds of the correct movement to fix the connection.",
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
    view.classList.remove('hidden');
    view.classList.add('block');
    lucide.createIcons();
}

function closeNaturalisticMastery() {
    const view = document.getElementById('program-view-naturalistic-mastery');
    view.classList.add('hidden');
    view.classList.remove('block');
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
        title: "1. Welcome and Course Overview",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25a452aad814cc4b41e4_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25a452aad814cc4b41e4_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25a452aad814cc4b41e4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25a452aad814cc4b41e4/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "2. What is the VB-MAPP and Why It Matters",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2633392e72f9adef4925_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2633392e72f9adef4925_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2633392e72f9adef4925" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2633392e72f9adef4925/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "3. Understanding VB-MAPP Developmental Milestones",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d269f86e3a582c04ea089_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d269f86e3a582c04ea089_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d269f86e3a582c04ea089" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d269f86e3a582c04ea089/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "4. How to Interpret the Assessment and Identify Priority Skills",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26ae900d8c9b45a3fb20_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26ae900d8c9b45a3fb20_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26ae900d8c9b45a3fb20" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26ae900d8c9b45a3fb20/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "5. Understanding Mands and Tacts",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26b98b6c64d7fbc9fb3f_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26b98b6c64d7fbc9fb3f_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26b98b6c64d7fbc9fb3f" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26b98b6c64d7fbc9fb3f/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "6. Learning Barriers How to Identify and Intervene",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26c8162fa67651ecf1ae_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26c8162fa67651ecf1ae_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26c8162fa67651ecf1ae" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26c8162fa67651ecf1ae/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "7. Teaching Goals Using IEP Goals and the Placement Guide",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d26df86e3a582c04ea0ef_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d26df86e3a582c04ea0ef_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d26df86e3a582c04ea0ef" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d26df86e3a582c04ea0ef/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "8. Conditioned Reinforcement and the Learner’s Natural Interests",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d271b392e72f9adef4a86_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d271b392e72f9adef4a86_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d271b392e72f9adef4a86" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d271b392e72f9adef4a86/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "9. Transition and Self-Care Skills in Intervention",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2728900d8c9b45a3fbaf_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2728900d8c9b45a3fbaf_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2728900d8c9b45a3fbaf" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2728900d8c9b45a3fbaf/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "10. Creating a Daily Teaching Plan Based on the VB-MAPP",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25b10d2808c273f63ae5_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25b10d2808c273f63ae5_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25b10d2808c273f63ae5" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25b10d2808c273f63ae5/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "11. Preparing to Teach Each Specific Skill Area",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25bd52aad814cc4b4214_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25bd52aad814cc4b4214_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25bd52aad814cc4b4214" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25bd52aad814cc4b4214/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "12. VPMTS – Visual, Perceptual, and Matching-to-Sample",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25ca86e3a582c04e9f63_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25ca86e3a582c04e9f63_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25ca86e3a582c04e9f63" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25ca86e3a582c04e9f63/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "13. Imitation – Motor and Vocal",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25d52cca4d27f1c1e323_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25d52cca4d27f1c1e323_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25d52cca4d27f1c1e323" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25d52cca4d27f1c1e323/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "14. Echoic – Developing Verbal Repetition",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25e0392e72f9adef48be_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25e0392e72f9adef48be_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25e0392e72f9adef48be" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25e0392e72f9adef48be/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "15. Vocal – Learner-Initiated Verbal Behavior",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25ee19eaa3a949e78089_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25ee19eaa3a949e78089_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25ee19eaa3a949e78089" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25ee19eaa3a949e78089/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "16. LRFFC – Listener Responding by Feature, Function, and Class",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d25fb0d2808c273f63b33_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d25fb0d2808c273f63b33_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d25fb0d2808c273f63b33" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d25fb0d2808c273f63b33/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "17. Intraverbal – Responding Without Visual Stimuli",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d260a162fa67651ecf09b_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d260a162fa67651ecf09b_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d260a162fa67651ecf09b" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d260a162fa67651ecf09b/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "18. Linguistic – Social Use of Language",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2617900d8c9b45a3fa47_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2617900d8c9b45a3fa47_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2617900d8c9b45a3fa47" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2617900d8c9b45a3fa47/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "19. Classroom Routines – Academic and Group Behaviors",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2624392e72f9adef490b_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2624392e72f9adef490b_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2624392e72f9adef490b" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2624392e72f9adef490b/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "20. Writing – Fine Motor Development and Written Production",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d263e162fa67651ecf0fe_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d263e162fa67651ecf0fe_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d263e162fa67651ecf0fe" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d263e162fa67651ecf0fe/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "21. Reading – Word Recognition and Comprehension",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d264b2cca4d27f1c1e398_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d264b2cca4d27f1c1e398_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d264b2cca4d27f1c1e398" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d264b2cca4d27f1c1e398/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "22. Math – Introduction to Numerical and Logical Thinking",
        embed: `<script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_690d2656599fcc08351ee5e3_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 75% 0 0 0;" id="ifr_690d2656599fcc08351ee5e3_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_690d2656599fcc08351ee5e3" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/b52bf57e-45c5-4845-9eff-0685d663e912/players/690d2656599fcc08351ee5e3/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>`
    },
    {
        title: "23. Wrap-Up – How to Assess Progress and Evolve Teaching",
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
        type: "Practice Tip",
        colorClass: "bg-amber-50 text-amber-700",
        date: "Jan 9",
        timestamp: new Date('2026-01-09').getTime(),
        title: "Repeating the same reinforcer across sessions can quietly reduce its effectiveness.",
        text: "Preference shifts faster than most people expect."
    },
    {
        type: "Study",
        colorClass: "bg-indigo-50 text-indigo-700",
        date: "Jan 18",
        timestamp: new Date('2026-01-18').getTime(),
        title: "Eye contact increases more reliably during shared play.",
        text: "Research on Naturalistic Developmental Behavioral Interventions shows that eye contact is more likely to emerge when the adult follows the child’s lead during play, rather than during structured table tasks."
    },
    {
        type: "Clinical Note",
        colorClass: "bg-blue-50 text-blue-700",
        date: "Jan 27",
        timestamp: new Date('2026-01-27').getTime(),
        title: "Therapists often observe reduced escape behaviors when task difficulty is temporarily lowered.",
        text: "Engagement tends to recover before accuracy does — and that’s expected."
    },
    {
        type: "Clinical Fact",
        colorClass: "bg-blue-50 text-blue-700",
        date: "Jan 31",
        timestamp: new Date('2026-01-31').getTime(),
        title: "Short, consistent practice across different environments strengthens learning far more than isolated, high-intensity sessions.",
        text: "Generalization is built through repetition, not volume."
    },
    {
        type: "Tip",
        colorClass: "bg-amber-50 text-amber-700",
        date: "Feb 2",
        timestamp: new Date('2026-02-02').getTime(),
        title: "Silence can be a strategy.",
        text: "Waiting a few seconds before prompting gives the child time to process and respond independently. Many spontaneous responses happen in that pause."
    },
    {
        type: "Research Insight",
        colorClass: "bg-purple-50 text-purple-700",
        date: "Feb 2",
        timestamp: new Date('2026-02-02T12:00:00').getTime(),
        title: "Natural reinforcement sustains motivation longer.",
        text: "Studies comparing artificial vs. natural reinforcers indicate that access to the activity itself maintains engagement for longer periods and supports generalization."
    },
    {
        type: "Observation",
        colorClass: "bg-teal-50 text-teal-700",
        date: "Feb 4",
        timestamp: new Date('2026-02-04').getTime(),
        title: "Children are more likely to communicate spontaneously when adults respond immediately and meaningfully — even to approximations.",
        text: "Responsiveness matters more than perfection."
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
        msg.textContent = "Please enter a name.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
        return;
    }

    const btn = document.getElementById('save-profile-btn');
    const originalContent = `<span>Save Changes</span><i data-lucide="save" class="w-4 h-4"></i>`;

    btn.innerHTML = '<span>Saving...</span><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
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
        btn.innerHTML = `<span>Saved!</span><i data-lucide="check" class="w-4 h-4"></i>`;
        btn.classList.add('bg-green-600');

        const msg = document.getElementById('profile-message');
        msg.textContent = "Profile updated successfully!";
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
        msg.textContent = "Failed to update. Please try again.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
    }
    lucide.createIcons();
}
