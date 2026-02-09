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
            el.id.startsWith('video-view-')) {
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
        title: "Comunicación y Lenguaje",
        concept: "En ABA, el lenguaje se ve como una conducta funcional. No nos enfocamos solo en el acto de decir palabras, sino en la función social: ¿por qué habla el niño? El objetivo es reemplazar conductas disruptivas (llanto, rabietas) con comunicación efectiva.",
        observation: [
            "¿El niño toma tu mano hacia lo que quiere en lugar de señalar o intentar un sonido?",
            "¿Repite frases de dibujos animados o líneas memorizadas sin contexto aparente (ecolalia)?",
            "Al pedir un objeto, ¿hace contacto visual o mira solo al artículo deseado?",
            "¿Responde cuando se le llama por su nombre al primer o segundo intento?"
        ],
        tech: "Basado en el protocolo VB-MAPP y la Conducta Verbal de B.F. Skinner. La enseñanza se divide en Operantes Verbales: Mando (pedir), Tacto (etiquetar) e Intraverbal (responder/conversar).",
        practical: "Usa el Entrenamiento en Comunicación Funcional (FCT). Identifica algo de alta motivación, sostén el objeto y espera un intento de petición. Si el niño no responde, proporciona una \"ayuda\" (modela la palabra) y entrega el objeto inmediatamente después de su intento.",
        ref: "Skinner, B.F. (1957). Verbal Behavior."
    },
    logical: {
        title: "Razonamiento y Patrones",
        concept: "Esta área es la base para la alfabetización y las matemáticas. Trabajamos en la capacidad del cerebro para organizar estímulos visuales, identificar similitudes y entender la previsibilidad del entorno.",
        observation: [
            "¿Puede el niño agrupar espontáneamente objetos por color o tamaño?",
            "¿Nota cuando cambias el orden de una rutina o mueves la ubicación de un objeto en la casa?",
            "¿Puede armar rompecabezas simples de 2 o 3 piezas, o simplemente tira las piezas?",
            "¿Entiende causa y efecto (p. ej., saber que presionar un botón enciende un juguete)?"
        ],
        tech: "Utilizamos el Entrenamiento de Ensayo Discreto (DTT) y el concepto de Igualación a la Muestra. La ciencia prueba que la fluidez en patrones visuales reduce la ansiedad y mejora el enfoque en tareas estructuradas.",
        practical: "Trabaja en la Categorización Funcional. En lugar de solo clasificar colores, pídele que separe \"cosas que usamos para comer\" y \"cosas que usamos para vestir\". Esto fuerza al cerebro a salir del \"piloto automático\" para crear conceptos abstractos.",
        ref: "Lovaas, O.I. (1987). Behavioral treatment and normal educational and intellectual functioning in young autistic children."
    },
    social: {
        title: "Interacción y Emocional",
        concept: "Nos enfocamos en la \"Atención Conjunta\" y la \"Teoría de la Mente\". Esto implica desarrollar la capacidad de percibir que los demás tienen sentimientos y deseos, y que interactuar con personas puede ser más gratificante que interactuar con objetos.",
        observation: [
            "Cuando el niño ve algo genial, ¿te mira para compartir la alegría del momento?",
            "¿Muestra interés en observar lo que hacen otros niños (incluso si no juega con ellos)?",
            "¿Reacciona a expresiones faciales exageradas (p. ej., si finges llorar o reír fuerte)?",
            "¿Trae juguetes a tu regazo solo para mostrártelos, sin necesariamente querer que hagas algo?"
        ],
        tech: "Basado en el Modelo Denver de Inicio Temprano (ESDM). El enfoque está en el compromiso afectivo. La neuroplasticidad se potencia cuando el aprendizaje ocurre dentro de una interacción social placentera y recíproca.",
        practical: "Usa Rutinas Sociales Sensoriales. Juegos como \"cu-cu tras\" (peek-a-boo) donde haces una pausa estratégica. El silencio en el clímax del juego fuerza al niño a mirarte para que la diversión continúe.",
        ref: "Rogers, S. J., & Dawson, G. (2010). Early Start Denver Model for Young Children with Autism."
    },
    motor: {
        title: "Movimiento e Imitación",
        concept: "La imitación es el atajo principal para el aprendizaje humano. En ABA, el control motor grueso y fino es la base para la autonomía (vestirse, comer solo) y para el habla misma (que requiere movimientos motores finos de la boca).",
        observation: [
            "¿Puede el niño imitar un gesto simple (como decir adiós o aplaudir) si le pides \"haz esto\"?",
            "¿Tiene dificultad excesiva con cubiertos, botones de ropa o sostener un lápiz?",
            "¿Parece tener una marcha \"torpe\" o evitar subir escaleras y superficies inestables?",
            "¿Puede saltar con ambos pies juntos o alternar pies al subir escaleras?"
        ],
        tech: "Enfoque en Planificación Motora y Generalización. El desarrollo sigue una línea cefalocaudal. La imitación motora gruesa es un predictor directo para el éxito en la imitación de sonidos y fonemas.",
        practical: "Crea un Circuito de Imitación Rápida. Realiza 3 movimientos seguidos (p. ej., mano en cabeza, aplauso, tocar pie) y di \"haz esto\". El refuerzo debe entregarse dentro de los 3 segundos del movimiento correcto para fijar la conexión.",
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



// Initialize default tab (Home)
// Main Feed Logic
const feedData = [
    {
        type: "Consejo Práctico",
        colorClass: "bg-amber-50 text-amber-700",
        date: "9 Ene",
        timestamp: new Date('2026-01-09').getTime(),
        title: "Repetir el mismo reforzador en varias sesiones puede reducir silenciosamente su efectividad.",
        text: "La preferencia cambia más rápido de lo que la mayoría espera."
    },
    {
        type: "Estudio",
        colorClass: "bg-indigo-50 text-indigo-700",
        date: "18 Ene",
        timestamp: new Date('2026-01-18').getTime(),
        title: "El contacto visual aumenta de manera más confiable durante el juego compartido.",
        text: "La investigación sobre Intervenciones Conductuales del Desarrollo Naturalista muestra que es más probable que surja el contacto visual cuando el adulto sigue la iniciativa del niño durante el juego, en lugar de durante tareas estructuradas en mesa."
    },
    {
        type: "Nota Clínica",
        colorClass: "bg-blue-50 text-blue-700",
        date: "27 Ene",
        timestamp: new Date('2026-01-27').getTime(),
        title: "Los terapeutas a menudo observan una reducción en las conductas de escape cuando se disminuye temporalmente la dificultad de la tarea.",
        text: "El compromiso tiende a recuperarse antes que la precisión, y eso es lo esperado."
    },
    {
        type: "Dato Clínico",
        colorClass: "bg-blue-50 text-blue-700",
        date: "31 Ene",
        timestamp: new Date('2026-01-31').getTime(),
        title: "La práctica breve y consistente en diferentes entornos fortalece el aprendizaje mucho más que las sesiones aisladas de alta intensidad.",
        text: "La generalización se construye a través de la repetición, no del volumen."
    },
    {
        type: "Consejo",
        colorClass: "bg-amber-50 text-amber-700",
        date: "2 Feb",
        timestamp: new Date('2026-02-02').getTime(),
        title: "El silencio puede ser una estrategia.",
        text: "Esperar unos segundos antes de instigar da al niño tiempo para procesar y responder independientemente. Muchas respuestas espontáneas ocurren en esa pausa."
    },
    {
        type: "Perspectiva de Investigación",
        colorClass: "bg-purple-50 text-purple-700",
        date: "2 Feb",
        timestamp: new Date('2026-02-02T12:00:00').getTime(),
        title: "El refuerzo natural sostiene la motivación por más tiempo.",
        text: "Los estudios que comparan reforzadores artificiales vs. naturales indican que el acceso a la actividad misma mantiene el compromiso por períodos más largos y apoya la generalización."
    },
    {
        type: "Observación",
        colorClass: "bg-teal-50 text-teal-700",
        date: "4 Feb",
        timestamp: new Date('2026-02-04').getTime(),
        title: "Es más probable que los niños se comuniquen espontáneamente cuando los adultos responden de manera inmediata y significativa, incluso a las aproximaciones.",
        text: "La capacidad de respuesta importa más que la perfección."
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
        msg.textContent = "Por favor ingresa un nombre.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
        return;
    }

    const btn = document.getElementById('save-profile-btn');
    const originalContent = `<span>Guardar Cambios</span><i data-lucide="save" class="w-4 h-4"></i>`;

    btn.innerHTML = '<span>Guardando...</span><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
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
        btn.innerHTML = `<span>¡Guardado!</span><i data-lucide="check" class="w-4 h-4"></i>`;
        btn.classList.add('bg-green-600');

        const msg = document.getElementById('profile-message');
        msg.textContent = "¡Perfil actualizado exitosamente!";
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
        msg.textContent = "Error al actualizar. Por favor intenta de nuevo.";
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-500');
    }
    lucide.createIcons();
}

function openVideo(id) {
    const view = document.getElementById(`video-view-${id}`);
    if (view) {
        view.classList.remove('hidden');
        view.classList.add('block');
        lucide.createIcons();
    }
}

function closeVideo(id) {
    const view = document.getElementById(`video-view-${id}`);
    if (view) {
        view.classList.add('hidden');
        view.classList.remove('block');

        // Stop video by resetting iframe src safely
        const iframe = view.querySelector('iframe');
        if (iframe) {
            // Store the src to restore it if needed, or just reloading it stops playback
            // For SmartPlayer, we might just want to reload the iframe to stop audio
            const currentSrc = iframe.src;
            iframe.src = currentSrc;
        }
    }
}
