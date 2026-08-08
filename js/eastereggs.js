/* ==========================================
        AURORA — REFUGIO / EASTER EGGS
========================================== */

(function () {
    'use strict';

    const CLICKS_NEEDED = 5;
    const RESET_TIME = 2200;

    let moonClicks = 0;
    let resetTimer = null;

    function createRefugeGate() {
        if (document.getElementById('refugeGate')) return;

        const gate = document.createElement('div');
        gate.id = 'refugeGate';
        gate.className = 'refuge-gate hidden';
        gate.innerHTML = `
            <div class="refuge-gate-card" role="dialog" aria-modal="true" aria-labelledby="refugeTitle">
                <button class="refuge-close" id="refugeClose" aria-label="Cerrar">×</button>

                <div class="refuge-symbol">☾</div>
                <p class="refuge-kicker">Encontraste algo que no estaba aquí por accidente.</p>
                <h2 id="refugeTitle">El Refugio</h2>
                <p class="refuge-description">
                    Hay lugares de Aurora que solo aparecen cuando realmente los buscas.
                </p>

                <label class="refuge-label" for="refugePassword">Palabra secreta</label>
                <input
                    id="refugePassword"
                    class="refuge-password"
                    type="text"
                    autocomplete="off"
                    spellcheck="false"
                    maxlength="30"
                    placeholder="Escribe la palabra...">

                <button id="refugeEnter" class="refuge-enter">Entrar</button>
                <p id="refugeMessage" class="refuge-message" aria-live="polite"></p>
            </div>
        `;

        document.body.appendChild(gate);

        const closeButton = document.getElementById('refugeClose');
        const input = document.getElementById('refugePassword');
        const enterButton = document.getElementById('refugeEnter');

        closeButton.addEventListener('click', closeGate);
        gate.addEventListener('click', (event) => {
            if (event.target === gate) closeGate();
        });

        enterButton.addEventListener('click', validatePassword);
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') validatePassword();
            if (event.key === 'Escape') closeGate();
        });
    }

    function openGate() {
        createRefugeGate();

        const gate = document.getElementById('refugeGate');
        const input = document.getElementById('refugePassword');
        const message = document.getElementById('refugeMessage');

        gate.classList.remove('hidden');
        document.body.classList.add('refuge-open');
        message.textContent = '';
        input.value = '';

        requestAnimationFrame(() => input.focus());
    }

    function closeGate() {
        const gate = document.getElementById('refugeGate');
        if (!gate) return;

        gate.classList.add('hidden');
        document.body.classList.remove('refuge-open');
    }

    function validatePassword() {
        const input = document.getElementById('refugePassword');
        const message = document.getElementById('refugeMessage');
        const value = input.value.trim().toLowerCase();

        if (value === 'volver') {
            message.textContent = 'La puerta se ha abierto.';
            message.classList.add('success');

            setTimeout(() => {
                closeGate();
                openRefuge();
            }, 450);

            return;
        }

        message.textContent = 'Esa no es la palabra.';
        message.classList.remove('success');
        input.classList.remove('refuge-shake');
        void input.offsetWidth;
        input.classList.add('refuge-shake');
    }

    function openRefuge() {
        if (document.getElementById('refuge')) return;

        const refuge = document.createElement('div');
        refuge.id = 'refuge';
        refuge.className = 'refuge hidden';
        refuge.innerHTML = `
            <div class="refuge-shell" role="dialog" aria-modal="true" aria-labelledby="refugeWelcomeTitle">
                <button class="refuge-back" id="refugeExit" aria-label="Salir del Refugio">×</button>

                <section class="refuge-welcome" id="refugeWelcome">
                    <div class="refuge-moonmark">☾</div>
                    <p class="refuge-eyebrow">AURORA · UN LUGAR PARA TI</p>
                    <h2 id="refugeWelcomeTitle">El Refugio</h2>
                    <p class="refuge-lead">
                        Aquí no tienes que ser fuerte.<br>
                        Aquí no tienes que tener respuestas.
                    </p>
                    <p class="refuge-copy">
                        Solo quiero saber cómo estás.
                    </p>
                    <button class="refuge-primary" id="refugeStart">Entrar</button>
                </section>

                <section class="refuge-menu hidden" id="refugeMenu" aria-labelledby="refugeQuestion">
                    <p class="refuge-eyebrow">NO HAY UNA RESPUESTA CORRECTA</p>
                    <h2 id="refugeQuestion">¿Qué te hizo venir hasta aquí?</h2>
                    <p class="refuge-copy refuge-menu-copy">Elige lo que más se parezca a cómo te sientes ahora.</p>

                    <div class="refuge-options">
                        <button class="refuge-option" data-refuge-state="overwhelmed">
                            <span class="refuge-option-icon">🌪️</span>
                            <span>Me siento estresada y sobrepasada por mi vida ahora mismo</span>
                        </button>
                        <button class="refuge-option" data-refuge-state="sad">
                            <span class="refuge-option-icon">🌧️</span>
                            <span>Estoy triste</span>
                        </button>
                        <button class="refuge-option" data-refuge-state="us">
                            <span class="refuge-option-icon">❤️</span>
                            <span>Estamos mal</span>
                        </button>
                        <button class="refuge-option" data-refuge-state="companionship">
                            <span class="refuge-option-icon">🫂</span>
                            <span>Solo necesito sentirme acompañada</span>
                        </button>
                        <button class="refuge-option" data-refuge-state="thoughts">
                            <span class="refuge-option-icon">💭</span>
                            <span>Tengo demasiadas cosas en la cabeza</span>
                        </button>
                        <button class="refuge-option" data-refuge-state="unknown">
                            <span class="refuge-option-icon">🌙</span>
                            <span>No sé exactamente qué necesito</span>
                        </button>
                    </div>

                    <p class="refuge-coming" id="refugeComing" aria-live="polite"></p>

                    <div class="refuge-secret-doors" aria-label="Pequeñas puertas del Refugio">
                        <button class="refuge-secret-door" data-refuge-secret="counter">
                            <span>⏳</span>
                            <span>
                                <strong>Una pequeña puerta</strong>
                                <small>Quiero volver a ver cuánto tiempo llevamos.</small>
                            </span>
                        </button>

                        <button class="refuge-secret-door" data-refuge-secret="not-together">
                            <span>🕊️</span>
                            <span>
                                <strong>Si algún día ya no estamos juntos</strong>
                                <small>Hay una carta que espero nunca tengas que abrir.</small>
                            </span>
                        </button>
                    </div>
                </section>
            </div>
        `;

        document.body.appendChild(refuge);
        requestAnimationFrame(() => refuge.classList.remove('hidden'));
        document.body.classList.add('refuge-open');

        document.getElementById('refugeExit').addEventListener('click', closeRefuge);
        document.getElementById('refugeStart').addEventListener('click', () => {
            document.getElementById('refugeWelcome').classList.add('hidden');
            document.getElementById('refugeMenu').classList.remove('hidden');
        });

        refuge.querySelectorAll('.refuge-option').forEach((option) => {
            option.addEventListener('click', (event) => {
                const state = option.dataset.refugeState;
                if (state === 'unknown') {
                    event.preventDefault();
                    event.stopPropagation();
                    if (typeof window.showUnknownNeeds === 'function') {
                        window.showUnknownNeeds();
                    }
                    return;
                }
                selectRefugeState(state);
            });
        });

        refuge.addEventListener('click', (event) => {
            if (event.target === refuge) closeRefuge();
        });
    }

    function closeRefuge() {
        const refuge = document.getElementById('refuge');
        if (!refuge) return;
        refuge.classList.add('hidden');
        document.body.classList.remove('refuge-open');
        setTimeout(() => refuge.remove(), 350);
    }

    function selectRefugeState(state) {
        const coming = document.getElementById('refugeComing');
        const messages = {
            overwhelmed: 'Aquí te espera una carta y el audio «No estás sola».',
            sad: 'Aquí te espera una carta para un día triste y el audio «No tienes que hablar».',
            us: 'Aquí te espera el camino de nosotros: lo que pasó, cómo estamos y qué necesitas.',
            companionship: 'Aquí te espera el audio «Estoy aquí».',
            thoughts: 'Aquí te espera el audio «Respira».',
            unknown: 'No pasa nada por no saber qué necesitas. Vamos a descubrirlo contigo.'
        };
        coming.textContent = messages[state] || '';

        const selected = document.querySelector('.refuge-option.selected');
        if (selected) selected.classList.remove('selected');
        const current = document.querySelector(`[data-refuge-state="${state}"]`);
        if (current) current.classList.add('selected');
    }

    function handleMoonClick() {
        moonClicks += 1;

        const moon = document.querySelector('.moon');
        if (moon) {
            moon.classList.remove('moon-click');
            void moon.offsetWidth;
            moon.classList.add('moon-click');
        }

        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            moonClicks = 0;
        }, RESET_TIME);

        if (moonClicks >= CLICKS_NEEDED) {
            moonClicks = 0;
            clearTimeout(resetTimer);
            openGate();
        }
    }

    function init() {
        const moon = document.querySelector('.moon');
        if (!moon) return;

        moon.addEventListener('click', handleMoonClick);
        moon.setAttribute('role', 'button');
        moon.setAttribute('tabindex', '0');
        moon.setAttribute('aria-label', 'Luna');

        moon.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleMoonClick();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


/* =========================
   REFUGIO — RUTA SOBREPASADA
   ========================= */
(function () {
  'use strict';

  function getMenu() {
    return document.getElementById('refugeMenu');
  }

  function showOverwhelmedRoute() {
    const menu = getMenu();
    if (!menu) return;

    menu.innerHTML = `
      <p class="refuge-eyebrow">EL REFUGIO</p>
      <h2>Está bien.</h2>
      <p class="refuge-lead">No tienes que poder con todo al mismo tiempo.</p>
      <p class="refuge-copy">Puedes elegir qué necesitas ahora mismo.</p>

      <div class="refuge-route-options">
        <button class="refuge-route-card" data-overwhelmed-action="letter">
          <span class="refuge-route-icon">💌</span>
          <span>
            <strong>Quiero leer algo</strong>
            <small>Para cuando sientas que todo pesa</small>
          </span>
        </button>

        <button class="refuge-route-card" data-overwhelmed-action="audio">
          <span class="refuge-route-icon">🎧</span>
          <span>
            <strong>Quiero escuchar algo</strong>
            <small>No estás sola</small>
          </span>
        </button>

        <button class="refuge-route-card" data-overwhelmed-action="stay">
          <span class="refuge-route-icon">🌙</span>
          <span>
            <strong>Solo quiero quedarme aquí un momento</strong>
            <small>No tienes que hacer nada.</small>
          </span>
        </button>
      </div>

      <button class="refuge-back-btn" data-overwhelmed-action="back">← Volver</button>
    `;

    menu.querySelectorAll('[data-overwhelmed-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.overwhelmedAction;
        if (action === 'letter') showLetter();
        if (action === 'audio') showAudio();
        if (action === 'stay') showStay();
        if (action === 'back') restoreMenu();
      });
    });
  }

  function showLetter() {
    const menu = getMenu();
    if (!menu) return;

    menu.innerHTML = `
      <p class="refuge-eyebrow">PARA CUANDO SIENTAS QUE TODO PESA</p>
      <h2>Rossy, respira.</h2>

      <article class="refuge-letter">
        <p>Si llegaste hasta aquí porque sientes que tienes demasiadas cosas encima, quiero pedirte algo antes de cualquier cosa:</p>
        <p><strong>respira.</strong></p>
        <p>No tienes que resolver todo ahora.</p>
        <p>Sé que tienes muchas cosas en la cabeza. La universidad, el cheer, los pasajes, conseguir trabajo, las cosas de casa, tus planes de algún día poder vivir sola... y probablemente muchas otras cosas que ni siquiera me cuentas.</p>
        <p>Porque te conozco.</p>
        <p>Sé que muchas veces prefieres guardarte lo que te pasa. Que piensas que puedes con todo sola, y probablemente muchas veces sí puedes.</p>
        <p>Pero quiero que recuerdes algo:</p>
        <p><strong>no estás sola.</strong></p>
        <p>No te digo esto porque crea que yo tengo las respuestas para todo. De hecho, sé que muchas veces no entiendo completamente lo que estás viviendo.</p>
        <p>Somos muy diferentes.</p>
        <p>Venimos de mundos distintos, pensamos distinto, sentimos algunas cosas de maneras completamente diferentes y, siendo sinceros, a veces probablemente ni siquiera sé cómo entrar en tu cabeza para entender qué necesitas.</p>
        <p>Pero hay algo que sí puedo hacer.</p>
        <p><strong>Escucharte.</strong></p>
        <p>No tienes que explicarme perfectamente lo que sientes.</p>
        <p>No tienes que ordenar tus problemas antes de contármelos.</p>
        <p>No tienes que buscar la manera correcta de decírmelo.</p>
        <p>Puedes simplemente hablar.</p>
        <p>Y si algún día no quieres que te dé consejos, no te los voy a dar.</p>
        <p>Si quieres que te ayude, voy a intentarlo.</p>
        <p>Y si solamente quieres que alguien se siente a tu lado mientras sacas todo lo que tienes guardado...</p>
        <p><strong>puedo ser ese alguien.</strong></p>
        <p>No quiero que sientas que tienes que ser fuerte conmigo.</p>
        <p>No tienes que demostrarme que puedes con todo.</p>
        <p>Puedes estar cansada. Puedes llorar. Puedes no saber qué hacer. Puedes tener un día horrible.</p>
        <p>Y seguir siendo la misma Rossy que admiro.</p>
        <p>Esa Rossy que, incluso cuando la vida le pone cosas encima, encuentra alguna manera de seguir adelante.</p>
        <p>Quizá tú no siempre veas esa parte de ti.</p>
        <p>Yo sí.</p>
        <p>Así que cuando sientas que todo está demasiado lleno, vuelve aquí.</p>
        <p>Y si algún día quieres hablar conmigo, recuerda que no tienes que venir con las palabras correctas.</p>
        <p>Ven como estés.</p>
        <p><strong>Yo te escucho.</strong></p>
        <p>Siempre puedes hablar conmigo.</p>
        <p class="refuge-signoff">Te amodoro.<br>— Gian</p>
      </article>

      <button class="refuge-back-btn" data-overwhelmed-action="home">← Volver a esta ruta</button>
    `;
    menu.querySelector('[data-overwhelmed-action="home"]').addEventListener('click', showOverwhelmedRoute);
  }

  function showAudio() {
    const menu = getMenu();
    if (!menu) return;

    menu.innerHTML = `
      <p class="refuge-eyebrow">UNA VOZ PARA TI</p>
      <h2>No estás sola.</h2>
      <p class="refuge-lead">Escucha esto cuando no quieras pensar en nada más.</p>

      <div class="refuge-audio-card">
        <div class="refuge-audio-icon">🎧</div>
        <audio controls preload="metadata">
          <source src="assets/refugio/audios/01_sobrepasada.mp3" type="audio/mpeg">
          Tu navegador no puede reproducir este audio.
        </audio>
        <p class="refuge-audio-note">Cuando pongas tu grabación en esa carpeta, aparecerá aquí.</p>
      </div>

      <button class="refuge-back-btn" data-overwhelmed-action="home">← Volver a esta ruta</button>
    `;
    menu.querySelector('[data-overwhelmed-action="home"]').addEventListener('click', showOverwhelmedRoute);
  }

  function showStay() {
    const menu = getMenu();
    if (!menu) return;

    menu.innerHTML = `
      <div class="refuge-stay">
        <div class="refuge-moon-breathing">☾</div>
        <div class="refuge-eyebrow">PUEDES QUEDARTE</div>
        <h2>No tienes que hacer nada.</h2>
        <p>Deja las cosas esperando un ratito.</p>
        <p>La universidad puede esperar.<br>El trabajo puede esperar.<br>Los pendientes pueden esperar.</p>
        <p class="refuge-stay-emphasis">Tú también necesitas descansar.</p>
        <p>Quédate aquí el tiempo que quieras.</p>
        <button class="refuge-back-btn" data-overwhelmed-action="home">Cuando estés lista → volver</button>
      </div>
    `;
    menu.querySelector('[data-overwhelmed-action="home"]').addEventListener('click', showOverwhelmedRoute);
  }

  function restoreMenu() {
    // Reabrimos el menú usando el mismo HTML/handlers que ya crea el Refugio.
    const refuge = document.getElementById('refuge');
    if (!refuge) return;

    refuge.remove();
    if (typeof window.openRefuge === 'function') {
      window.openRefuge();
      return;
    }

    // Fallback: recargar la página solo si el método interno no está expuesto.
    location.reload();
  }

  // The original Refugio creates the buttons and handles them itself.
  // Capture the click before its listener and route only the overwhelmed choice.
  document.addEventListener('click', function (event) {
    const option = event.target.closest('#refuge .refuge-option[data-refuge-state="overwhelmed"]');
    if (!option) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    showOverwhelmedRoute();
  }, true);

  window.showOverwhelmedRoute = showOverwhelmedRoute;
})();

/* =========================
   REFUGIO — RUTA TRISTE
   ========================= */
(function () {
  'use strict';

  function getMenu() {
    return document.getElementById('refugeMenu');
  }

  function showSadRoute() {
    const menu = getMenu();
    if (!menu) return;

    menu.innerHTML = `
      <p class="refuge-eyebrow">EL REFUGIO</p>
      <h2>No tienes que estar bien aquí.</h2>
      <p class="refuge-lead">Puedes simplemente sentir lo que estés sintiendo.</p>
      <p class="refuge-copy">Elige lo que te haga sentir un poquito más acompañada ahora.</p>

      <div class="refuge-route-options">
        <button class="refuge-route-card" data-sad-action="letter">
          <span class="refuge-route-icon">💌</span>
          <span>
            <strong>Quiero leer algo</strong>
            <small>Para este momento en el que estás triste</small>
          </span>
        </button>

        <button class="refuge-route-card" data-sad-action="audio">
          <span class="refuge-route-icon">🎧</span>
          <span>
            <strong>No quiero hablar, solo escuchar</strong>
            <small>No tienes que hablar</small>
          </span>
        </button>

        <button class="refuge-route-card" data-sad-action="gallery">
          <span class="refuge-route-icon">📷</span>
          <span>
            <strong>Quiero recordar algo bonito</strong>
            <small>Un pequeño recorrido por nosotros</small>
          </span>
        </button>
      </div>

      <button class="refuge-back-btn" data-sad-action="back">← Volver</button>
    `;

    menu.querySelectorAll('[data-sad-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.sadAction;
        if (action === 'letter') showSadLetter();
        if (action === 'audio') showSadAudio();
        if (action === 'gallery') showSadGallery();
        if (action === 'back') restoreRefugeMenu();
      });
    });
  }

  function showSadLetter() {
    const menu = getMenu();
    if (!menu) return;

    menu.innerHTML = `
      <p class="refuge-eyebrow">PARA UN DÍA TRISTE</p>
      <h2>Ven aquí un momento.</h2>

      <article class="refuge-letter">
        <p>Si estás triste, no quiero decirte que todo va a estar bien.</p>

        <p>Porque quizá ahora mismo no lo sientes así.</p>

        <p>Y tampoco quiero decirte que dejes de llorar, que seas fuerte o que simplemente pienses en algo bonito.</p>

        <p>Si necesitas llorar, llora.</p>

        <p>No tienes que esconderlo.</p>

        <p>Sé que muchas veces cuando algo te duele prefieres encerrarte y guardar todo para ti. Como si contar lo que sientes fuera a hacerte más vulnerable o como si tuvieras que resolverlo sola.</p>

        <p>Pero conmigo no tienes que hacer eso.</p>

        <p>No tienes que llegar con una explicación.</p>

        <p>No tienes que saber exactamente por qué estás triste.</p>

        <p>Puedes simplemente decirme: <strong>"hoy no estoy bien"</strong>.</p>

        <p>Y yo voy a entender que quizá no necesitas que arregle nada.</p>

        <p>Quizá solo necesitas que alguien se quede.</p>

        <p>Quiero que sepas que incluso cuando tú no puedas ver nada bonito en el día que estás teniendo, yo sigo viendo a la persona que admiro.</p>

        <p>Veo tu forma de seguir adelante.</p>

        <p>Veo todo lo que cargas sin decirlo.</p>

        <p>Veo esa manera tuya de intentar mantenerte serena aunque por dentro estés hecha un desastre.</p>

        <p>Y ojalá algún día puedas mirarte con un poquito de la admiración con la que yo te miro.</p>

        <p>Porque no eres menos fuerte por llorar.</p>

        <p>No eres menos valiente por necesitar a alguien.</p>

        <p>No eres una carga por querer compañía.</p>

        <p>Y nunca tienes que ganarte mi cariño estando bien.</p>

        <p>Puedes estar triste y yo voy a seguir queriéndote.</p>

        <p>Puedes estar confundida y yo voy a seguir aquí.</p>

        <p>Puedes no querer hablar y aun así puedes quedarte conmigo.</p>

        <p>Así que si hoy es uno de esos días...</p>

        <p>quédate un poquito.</p>

        <p>Llora si necesitas.</p>

        <p>Descansa.</p>

        <p>Y cuando tengas ganas de volver a sonreír, aunque sea poquito...</p>

        <p>espero poder estar ahí para verlo.</p>

        <p class="refuge-signoff">Te quiero, srta. cara de papa.<br>Te amodoro.<br>— Gian</p>
      </article>

      <button class="refuge-back-btn" data-sad-action="home">← Volver a esta ruta</button>
    `;

    menu.querySelector('[data-sad-action="home"]').addEventListener('click', showSadRoute);
  }

  function showSadAudio() {
    const menu = getMenu();
    if (!menu) return;

    menu.innerHTML = `
      <p class="refuge-eyebrow">PARA CUANDO NO QUIERAS HABLAR</p>
      <h2>Solo escucha un momento.</h2>
      <p class="refuge-lead">No tienes que explicarme nada.</p>

      <div class="refuge-audio-card">
        <div class="refuge-audio-icon">🎧</div>
        <audio controls preload="metadata">
          <source src="assets/refugio/audios/02_triste.mp3" type="audio/mpeg">
          Tu navegador no puede reproducir este audio.
        </audio>
        <p class="refuge-audio-note">Puedes escucharme sin tener que decir nada.</p>
      </div>

      <button class="refuge-back-btn" data-sad-action="home">← Volver a esta ruta</button>
    `;

    menu.querySelector('[data-sad-action="home"]').addEventListener('click', showSadRoute);
  }

  function showSadGallery() {
    const menu = getMenu();
    if (!menu) return;

    const images = Array.from({ length: 9 }, (_, i) =>
      `assets/refugio/galeria/algo_bonito/foto_${String(i + 1).padStart(2, '0')}.jpg`
    );

    menu.innerHTML = `
      <p class="refuge-eyebrow">RECUERDOS BONITOS</p>
      <h2>Un poquito de nosotros.</h2>

      <div class="refuge-memory-viewer">
        <div class="refuge-memory-image-wrap">
          <img id="refugeMemoryImage" src="${images[0]}" alt="Recuerdo bonito">
        </div>

        <div class="refuge-memory-controls">
          <button id="refugeMemoryPrev" class="refuge-memory-btn" type="button" aria-label="Foto anterior">←</button>
          <span id="refugeMemoryCounter">1 / 9</span>
          <button id="refugeMemoryNext" class="refuge-memory-btn" type="button" aria-label="Foto siguiente">→</button>
        </div>
      </div>

      <button class="refuge-back-btn" data-sad-action="home">← Volver a esta ruta</button>
    `;

    let current = 0;
    const image = menu.querySelector('#refugeMemoryImage');
    const counter = menu.querySelector('#refugeMemoryCounter');

    function render() {
      image.src = images[current];
      counter.textContent = `${current + 1} / ${images.length}`;
    }

    menu.querySelector('#refugeMemoryPrev').addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      render();
    });

    menu.querySelector('#refugeMemoryNext').addEventListener('click', () => {
      current = (current + 1) % images.length;
      render();
    });

    menu.querySelector('[data-sad-action="home"]').addEventListener('click', showSadRoute);
  }


  function restoreRefugeMenu() {
    const refuge = document.getElementById('refuge');
    if (refuge) refuge.remove();
    if (typeof window.openRefuge === 'function') {
      window.openRefuge();
    } else {
      location.reload();
    }
  }

  document.addEventListener('click', function (event) {
    const option = event.target.closest('#refuge .refuge-option[data-refuge-state="sad"]');
    if (!option) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    showSadRoute();
  }, true);

  window.showSadRoute = showSadRoute;
})();

/* =========================
   REFUGIO — RUTA ESTAMOS MAL
   Fase 1: mapa de decisiones
   ========================= */
(function () {
  'use strict';

  function getMenu() {
    return document.getElementById('refugeMenu');
  }

  function render(html, bindings) {
    const menu = getMenu();
    if (!menu) return;
    menu.innerHTML = html;
    (bindings || []).forEach(([selector, handler]) => {
      const el = menu.querySelector(selector);
      if (el) el.addEventListener('click', handler);
    });
  }

  function showRelationshipRoute() {
    render(`
      <p class="refuge-eyebrow">ESTAMOS MAL</p>
      <h2>Está bien. Vamos despacio.</h2>
      <p class="refuge-lead">No quiero asumir qué pasó.</p>
      <p class="refuge-copy">Primero dime cómo empezó todo.</p>

      <div class="refuge-route-options">
        <button class="refuge-route-card" data-rel-action="silly">
          <span class="refuge-route-icon">🥺</span>
          <span>
            <strong>Fue una estupidez</strong>
            <small>Pero igual terminamos mal.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-rel-action="not-silly">
          <span class="refuge-route-icon">💭</span>
          <span>
            <strong>No fue una estupidez</strong>
            <small>Pasó algo que realmente nos hizo daño.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-rel-action="serious">
          <span class="refuge-route-icon">🌧️</span>
          <span>
            <strong>Fue algo muy grave</strong>
            <small>Esto se siente más grande que una pelea.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-rel-action="unknown">
          <span class="refuge-route-icon">🫥</span>
          <span>
            <strong>No sé cómo explicarlo</strong>
            <small>Solo sé que estamos mal.</small>
          </span>
        </button>
      </div>

      <button class="refuge-route-card refuge-route-card-secondary" data-rel-action="audio">
        <span class="refuge-route-icon">🎧</span>
        <span>
          <strong>Quiero escuchar algo</strong>
          <small>Una voz para cuando nosotros estamos mal.</small>
        </span>
      </button>

      <button class="refuge-back-btn" data-rel-action="back">← Volver</button>
    `, [
      ['[data-rel-action="silly"]', () => showHowWeAre('silly')],
      ['[data-rel-action="not-silly"]', () => showHowWeAre('not-silly')],
      ['[data-rel-action="serious"]', () => showSeriousNeeds()],
      ['[data-rel-action="unknown"]', showUnknownNeeds],
      ['[data-rel-action="audio"]', showRelationshipAudio],
      ['[data-rel-action="back"]', restoreRefugeMenu]
    ]);
  }


  function showRelationshipAudio() {
    render(`
      <p class="refuge-eyebrow">NOSOTROS</p>
      <h2>Cuando nosotros estamos mal.</h2>
      <p class="refuge-lead">Puedes escuchar esto antes de seguir con lo que pasó.</p>
      <div class="refuge-audio-card">
        <div class="refuge-audio-icon">🎧</div>
        <audio controls preload="metadata">
          <source src="assets/refugio/audios/03_nosotros_mal.mp3" type="audio/mpeg">
          Tu navegador no puede reproducir este audio.
        </audio>
      </div>
      <button class="refuge-back-btn" data-rel-action="back-audio">← Volver a nosotros</button>
    `, [
      ['[data-rel-action="back-audio"]', showRelationshipRoute]
    ]);
  }


  function showUnknownNeeds() {
    render(`
      <div class="refuge-unknown-sky" aria-label="Bajo las estrellas">
        <div class="unknown-sky-stars" aria-hidden="true">
          <span class="unknown-star-field f1">✦</span>
          <span class="unknown-star-field f2">·</span>
          <span class="unknown-star-field f3">✧</span>
          <span class="unknown-star-field f4">·</span>
          <span class="unknown-star-field f5">✦</span>
          <span class="unknown-star-field f6">·</span>
          <span class="unknown-star-field f7">✧</span>
          <span class="unknown-star-field f8">·</span>
          <span class="unknown-star-field f9">✦</span>
          <span class="unknown-star-field f10">·</span>
          <span class="unknown-star-field f11">✧</span>
          <span class="unknown-star-field f12">·</span>
          <span class="unknown-star-field f13">✦</span>
          <span class="unknown-star-field f14">·</span>
          <span class="unknown-star-field f15">✧</span>
          <span class="unknown-star-field f16">·</span>
          <span class="unknown-star-field f17">✦</span>
          <span class="unknown-star-field f18">·</span>
          <span class="unknown-star-field f19">✦</span>
          <span class="unknown-star-field f20">✧</span>
          <span class="unknown-star-field f21">·</span>
          <span class="unknown-star-field f22">✦</span>
        </div>

        <div class="unknown-milky-way" aria-hidden="true"></div>
        <div class="unknown-shooting-star" aria-hidden="true"></div>
        <div class="unknown-moon-glow" aria-hidden="true"></div>

        <div class="unknown-sky-phrase" aria-label="Frase en el cielo">
          <span>Entre tantas cosas que no sé explicar,</span>
          <span>todavía sé reconocer tus ojos verdes</span>
          <span>incluso en la oscuridad.</span>
        </div>

        <div class="unknown-horizon" aria-hidden="true">
          <div class="unknown-mountain mountain-back"></div>
          <div class="unknown-mountain mountain-mid"></div>
          <div class="unknown-mountain mountain-front"></div>
        </div>

        <div class="unknown-meadow" aria-hidden="true">
          <span class="grass-blade g1"></span><span class="grass-blade g2"></span>
          <span class="grass-blade g3"></span><span class="grass-blade g4"></span>
          <span class="grass-blade g5"></span><span class="grass-blade g6"></span>
          <span class="grass-blade g7"></span><span class="grass-blade g8"></span>
          <span class="grass-blade g9"></span><span class="grass-blade g10"></span>
          <span class="grass-blade g11"></span><span class="grass-blade g12"></span>
          <span class="grass-blade g13"></span><span class="grass-blade g14"></span>
          <span class="grass-blade g15"></span><span class="grass-blade g16"></span>
        </div>

        <div class="unknown-couple" aria-label="Dos personas acostadas juntas mirando el cielo">
          <div class="unknown-person unknown-rossy">
            <div class="person-hair"></div>
            <div class="person-head"></div>
            <div class="person-neck"></div>
            <div class="person-body"></div>
            <div class="person-arm"></div>
            <div class="person-leg"></div>
          </div>
          <div class="unknown-person unknown-gian">
            <div class="person-hair"></div>
            <div class="person-head"></div>
            <div class="person-neck"></div>
            <div class="person-body"></div>
            <div class="person-arm"></div>
            <div class="person-leg"></div>
          </div>
          <div class="unknown-couple-glow"></div>
        </div>

        <div class="unknown-sky-copy">
          <p class="refuge-eyebrow">NO SÉ EXACTAMENTE QUÉ NECESITO</p>
          <p class="unknown-sky-subtitle">Quédate aquí un rato.</p>
        </div>

        <div class="unknown-sky-audio">
          <audio id="unknownSkyAudio" preload="auto" loop>
            <source src="assets/audio/cant-help-falling-in-love.mp3" type="audio/mpeg">
            Tu navegador no puede reproducir este audio.
          </audio>
          <button id="unknownSkyPlay" class="refuge-sky-play" type="button">▶ Escuchar</button>
        </div>

        <button class="refuge-back-btn unknown-sky-back" data-unknown-action="back">← Volver</button>
      </div>
    `, []);

    const menu = getMenu();
    const shell = menu ? menu.closest(".refuge-shell") : null;
    if (shell) shell.classList.add("refuge-shell-immersive");
    const audio = menu ? menu.querySelector('#unknownSkyAudio') : null;
    const play = menu ? menu.querySelector('#unknownSkyPlay') : null;

    if (audio) {
      audio.volume = 0.75;
      const attempt = audio.play();
      if (attempt && typeof attempt.then === 'function') {
        attempt.then(() => {
          if (play) play.classList.add('hidden');
        }).catch(() => {
          if (play) play.classList.remove('hidden');
        });
      }
    }

    if (play && audio) {
      play.addEventListener('click', () => {
        audio.play().then(() => {
          play.classList.add('hidden');
        }).catch(() => {});
      });
    }

    const back = menu ? menu.querySelector('[data-unknown-action="back"]') : null;
    if (back) {
      back.addEventListener('click', () => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        if (shell) shell.classList.remove("refuge-shell-immersive");
        restoreMenu();
      });
    }
  }

  function showUnknownCompany() {
    render(`
      <p class="refuge-eyebrow">NO SÉ CÓMO EXPLICARLO</p>
      <h2>No tienes que explicármelo todo.</h2>

      <article class="refuge-letter">
        <p>Si llegaste hasta aquí porque no sabes muy bien qué te pasa, quiero empezar por algo sencillo:</p>

        <p><strong>no tienes que encontrar las palabras correctas para poder estar conmigo.</strong></p>

        <p>No tienes que ordenar todo lo que sientes antes de hablar. No tienes que convertir lo que te pasa en una explicación perfecta. Y tampoco tienes que resolverlo tú sola porque sientas que deberías poder con todo.</p>

        <p>Yo sé que muchas veces prefieres guardarte tus problemas. Sé que cuando algo te sobrepasa puedes encerrarte, llorar y tratar de atravesarlo por tu cuenta.</p>

        <p>Y no quiero que sientas que, para tenerme cerca, tienes que llegar con una solución.</p>

        <p>A veces puedo no entender inmediatamente lo que estás sintiendo. Somos demasiado diferentes en algunas cosas y venimos de mundos que no siempre miran los problemas de la misma manera.</p>

        <p>Pero hay algo que sí puedo hacer:</p>

        <p><strong>escucharte.</strong></p>

        <p>Puedo quedarme contigo aunque no tenga una respuesta. Puedo dejar que hables, que llores, que te enojes, que estés confundida o incluso que no quieras decir absolutamente nada.</p>

        <p>No quiero que sientas que tienes que estar bien para que yo pueda quererte.</p>

        <p>Si hoy necesitas que simplemente esté, puedo simplemente estar.</p>

        <p>Y si necesitas espacio, también puedo entenderlo.</p>

        <p>No estás sola, amor.</p>

        <p>No porque yo vaya a solucionar cada cosa de tu vida, sino porque cuando quieras dejarme entrar un poquito, <strong>voy a escucharte sin exigirte que tengas todo resuelto.</strong></p>

        <p>Así que si no sabes cómo explicarlo...</p>

        <p>empieza por donde puedas.</p>

        <p>O no empieces todavía.</p>

        <p>Puedes quedarte aquí un rato.</p>

        <p class="refuge-signoff">Te amodoro.<br>— Gian</p>
      </article>

      <button class="refuge-back-btn" data-unknown-action="back">← Volver a las opciones</button>
    `, [
      ['[data-unknown-action="back"]', showUnknownNeeds]
    ]);
  }


  window.showUnknownNeeds = showUnknownNeeds;

  function showUnknownSort() {
    render(`
      <p class="refuge-eyebrow">NO SÉ CÓMO EXPLICARLO</p>
      <h2>Vamos a ordenar un poquito el ruido.</h2>
      <p class="refuge-lead">No tienes que saber exactamente qué te pasa. Solo busca lo que más se parezca a este momento.</p>

      <div class="refuge-route-options">
        <button class="refuge-route-card" data-feeling="angry">
          <span class="refuge-route-icon">🔥</span>
          <span><strong>Estoy enojada</strong><small>Hay algo que me molestó muchísimo.</small></span>
        </button>
        <button class="refuge-route-card" data-feeling="sad">
          <span class="refuge-route-icon">🌧️</span>
          <span><strong>Estoy triste</strong><small>No sé si quiero hablar, pero me duele.</small></span>
        </button>
        <button class="refuge-route-card" data-feeling="disappointed">
          <span class="refuge-route-icon">💭</span>
          <span><strong>Estoy decepcionada</strong><small>Esperaba algo diferente.</small></span>
        </button>
        <button class="refuge-route-card" data-feeling="tired">
          <span class="refuge-route-icon">🥱</span>
          <span><strong>Estoy cansada</strong><small>Ya tengo demasiado encima.</small></span>
        </button>
        <button class="refuge-route-card" data-feeling="afraid">
          <span class="refuge-route-icon">🫀</span>
          <span><strong>Tengo miedo</strong><small>Hay algo que me preocupa perder o enfrentar.</small></span>
        </button>
        <button class="refuge-route-card" data-feeling="confused">
          <span class="refuge-route-icon">🫥</span>
          <span><strong>Estoy confundida</strong><small>Siento demasiadas cosas al mismo tiempo.</small></span>
        </button>
        <button class="refuge-route-card" data-feeling="nothing">
          <span class="refuge-route-icon">🌫️</span>
          <span><strong>No sé qué siento</strong><small>Solo sé que algo no está bien.</small></span>
        </button>
      </div>

      <button class="refuge-back-btn" data-unknown-action="back">← Volver</button>
    `, [
      ['[data-feeling="angry"]', () => showUnknownFeeling('angry')],
      ['[data-feeling="sad"]', () => showUnknownFeeling('sad')],
      ['[data-feeling="disappointed"]', () => showUnknownFeeling('disappointed')],
      ['[data-feeling="tired"]', () => showUnknownFeeling('tired')],
      ['[data-feeling="afraid"]', () => showUnknownFeeling('afraid')],
      ['[data-feeling="confused"]', () => showUnknownFeeling('confused')],
      ['[data-feeling="nothing"]', () => showUnknownFeeling('nothing')],
      ['[data-unknown-action="back"]', showUnknownNeeds]
    ]);
  }

  function showUnknownFeeling(type) {
    const content = {
      angry: ['Puedes estar enojada.', 'No voy a pedirte que conviertas el enojo en calma inmediatamente. Si algo te molestó, merece ser escuchado. Puedes tomarte el tiempo que necesites para entender qué parte te dolió y qué necesitas de mí.'],
      sad: ['Puedes estar triste.', 'No tienes que esconderlo ni hacerte la fuerte conmigo. Si hoy solo necesitas llorar, respirar y que alguien se quede cerca, eso también cuenta como estar haciendo algo por ti.'],
      disappointed: ['Puedes estar decepcionada.', 'A veces duele más lo que esperábamos que lo que pasó. No quiero defenderme antes de entender qué esperabas de mí y qué fue lo que no encontraste.'],
      tired: ['Quizá simplemente estás cansada.', 'Entre la universidad, los pasajes, el deporte, la casa, buscar trabajo y todo lo que llevas por dentro, no siempre hace falta encontrar un problema concreto. A veces ya es demasiado. Puedes descansar.'],
      afraid: ['Puedes tener miedo.', 'No tienes que convertir ese miedo en una decisión todavía. Si hay algo o alguien que te preocupa perder, podemos quedarnos un momento ahí, sin correr a imaginar el peor final.'],
      confused: ['Puedes estar confundida.', 'No tienes que escoger una emoción y quedarte con ella. Puedes quererme y estar molesta. Puedes extrañarme y necesitar espacio. Puedes estar triste y no saber por qué. Las cosas pueden mezclarse.'],
      nothing: ['No saber también está bien.', 'No voy a obligarte a ponerle un nombre a algo que todavía no lo tiene. Empieza por lo más pequeño: qué necesitas ahora mismo. Lo demás puede esperar.']
    };
    const [title, text] = content[type] || content.nothing;

    render(`
      <p class="refuge-eyebrow">ORDENAR LO QUE SIENTO</p>
      <h2>${title}</h2>
      <article class="refuge-letter">
        <p>${text}</p>
        <p><strong>No tienes que resolverlo todo hoy.</strong></p>
        <p>Y si quieres contarme lo que hay detrás de esto, puedes hacerlo a tu ritmo. Si no quieres, también está bien.</p>
        <p class="refuge-signoff">Estoy aquí.<br>— Gian</p>
      </article>
      <button class="refuge-back-btn" data-unknown-action="back">← Volver</button>
    `, [
      ['[data-unknown-action="back"]', showUnknownSort]
    ]);
  }

  function showUnknownSay() {
    render(`
      <p class="refuge-eyebrow">NO SÉ CÓMO EXPLICARLO</p>
      <h2>Entonces dilo como salga.</h2>
      <p class="refuge-lead">No tiene que sonar bonito, ordenado ni tener sentido todavía.</p>

      <article class="refuge-writing-card">
        <p>Escribe aquí eso que llevas dando vueltas en la cabeza.</p>
        <p>Puedes escribirme, quejarte, contarme lo que pasó o simplemente poner palabras sueltas.</p>

        <textarea class="refuge-writing-area" maxlength="3000" placeholder="Escribe aquí..."></textarea>

        <p class="refuge-writing-note">Esto se envía si así lo quieres.</p>

        <button class="refuge-primary-btn" data-writing-send>Enviar</button>
        <p class="refuge-writing-status" data-writing-status aria-live="polite"></p>
      </article>

      <button class="refuge-back-btn" data-unknown-action="back">← Volver</button>
    `, [
      ['[data-writing-send]', sendUnknownMessage],
      ['[data-unknown-action="back"]', showUnknownNeeds]
    ]);
  }

  async function sendUnknownMessage() {
    const area = getMenu() ? getMenu().querySelector('.refuge-writing-area') : null;
    const button = getMenu() ? getMenu().querySelector('[data-writing-send]') : null;
    const status = getMenu() ? getMenu().querySelector('[data-writing-status]') : null;

    if (!area || !button || !status) return;

    const message = area.value.trim();
    if (!message) {
      status.textContent = 'Escribe algo antes de enviarlo.';
      area.focus();
      return;
    }

    button.disabled = true;
    status.textContent = 'Enviando...';

    try {
      const response = await fetch('https://formsubmit.co/ajax/attetuila9@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: 'Aurora — algo que Rossy quiso decirte',
          _template: 'table',
          message: message
        })
      });

      const result = await response.json();

      if (!response.ok || result.success !== 'true') {
        throw new Error('No se pudo enviar el mensaje.');
      }

      showUnknownSaySent();
    } catch (error) {
      console.error('Aurora: error al enviar el mensaje.', error);
      button.disabled = false;
      status.textContent = 'No pude enviarlo esta vez. Inténtalo de nuevo.';
    }
  }

  function showUnknownSaySent() {
    render(`
      <p class="refuge-eyebrow">LO ENVIASTE</p>
      <h2>Ya llegó hasta mí. ❤️</h2>

      <article class="refuge-letter">
        <p>Gracias por confiarme eso que quizá no sabías cómo decirme.</p>
        <p>No tenías que hacerlo bonito, ni ordenarlo antes de escribirlo.</p>
        <p><strong>Lo voy a leer.</strong></p>
        <p class="refuge-signoff">— Gian</p>
      </article>

      <button class="refuge-back-btn" data-unknown-action="back">← Volver</button>
    `, [
      ['[data-unknown-action="back"]', showUnknownNeeds]
    ]);
  }


  function showUnknownSpace() {
    render(`
      <p class="refuge-eyebrow">NO SÉ CÓMO EXPLICARLO</p>
      <h2>Está bien. Tómate tu espacio.</h2>

      <article class="refuge-letter">
        <p>No voy a convertir tu necesidad de estar sola en una pregunta sobre cuánto me quieres.</p>

        <p>Si hoy necesitas cerrar la puerta un rato, respirar, llorar, dormir, escuchar música o simplemente no hablar con nadie, puedes hacerlo.</p>

        <p>No tienes que responderme inmediatamente. No tienes que tranquilizarme mientras tú estás intentando tranquilizarte.</p>

        <p>Y tampoco quiero que sientas que darte espacio significa que desaparezco o que me da igual lo que te pasa.</p>

        <p><strong>Puedo quererte desde un poquito más lejos cuando eso sea lo que necesitas.</strong></p>

        <p>Cuando quieras volver a hablar, aquí voy a estar.</p>

        <p>Y si todavía no quieres hablar cuando vuelvas, también podemos simplemente estar.</p>

        <p>Cuídate un poquito, amor.</p>

        <p class="refuge-signoff">Te amodoro.<br>— Gian</p>
      </article>

      <button class="refuge-back-btn" data-unknown-action="back">← Volver</button>
    `, [
      ['[data-unknown-action="back"]', showUnknownNeeds]
    ]);
  }

  function showUnknownPlaceholder(type) {
    const titles = {
      company: 'Solo quiero sentirme acompañada',
      sort: 'Quiero ordenar lo que siento',
      say: 'Quiero decirte algo',
      space: 'Solo necesito espacio'
    };
    render(`
      <p class="refuge-eyebrow">NO SÉ CÓMO EXPLICARLO</p>
      <h2>${titles[type] || 'Estoy aquí.'}</h2>
      <div class="refuge-route-placeholder">
        <span>♡</span>
        <p>Esta parte la vamos a llenar con su contenido en el siguiente paso.</p>
      </div>
      <button class="refuge-back-btn" data-unknown-action="back">← Volver a las opciones</button>
    `, [
      ['[data-unknown-action="back"]', showUnknownNeeds]
    ]);
  }

  function showHowWeAre(origin) {
    const intro = origin === 'silly'
      ? 'Fue una tontería... pero parece que dejó algo más debajo.'
      : origin === 'not-silly'
        ? 'Entonces no vamos a fingir que fue poca cosa.'
        : 'No necesitas encontrar las palabras perfectas para explicarlo.';

    render(`
      <p class="refuge-eyebrow">ESTAMOS MAL</p>
      <h2>¿Y cómo estamos ahora?</h2>
      <p class="refuge-lead">${intro}</p>

      <div class="refuge-route-options">
        <button class="refuge-route-card" data-rel-final="bad">
          <span class="refuge-route-icon">🌧️</span>
          <span>
            <strong>Estamos mal</strong>
            <small>Seguimos lastimados por lo que pasó.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-rel-final="distant">
          <span class="refuge-route-icon">🌙</span>
          <span>
            <strong>Estamos distantes</strong>
            <small>No estamos peleando, pero algo cambió.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-rel-final="trying">
          <span class="refuge-route-icon">🫂</span>
          <span>
            <strong>Estamos intentando arreglarlo</strong>
            <small>Seguimos aquí, aunque todavía duela.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-rel-final="ending">
          <span class="refuge-route-icon">💔</span>
          <span>
            <strong>Estamos a punto de terminar</strong>
            <small>Esto ya se siente diferente.</small>
          </span>
        </button>
      </div>

      <button class="refuge-back-btn" data-rel-action="back">← Volver</button>
    `, [
      ['[data-rel-final="bad"]', () => origin === 'not-silly' ? showNotSillyEnd('bad') : showRelationshipEnd('bad')],
      ['[data-rel-final="distant"]', () => origin === 'not-silly' ? showNotSillyEnd('distant') : showRelationshipEnd('distant')],
      ['[data-rel-final="trying"]', () => origin === 'not-silly' ? showNotSillyEnd('trying') : showRelationshipEnd('trying')],
      ['[data-rel-final="ending"]', () => origin === 'not-silly' ? showNotSillyEnd('ending') : showRelationshipEnd('ending')],
      ['[data-rel-action="back"]', showRelationshipRoute]
    ]);
  }

  function showSeriousNeeds() {
    render(`
      <p class="refuge-eyebrow">ALGO GRAVE PASÓ</p>
      <h2>¿Qué necesitas ahora?</h2>
      <p class="refuge-lead">No voy a intentar arreglarlo por ti.</p>
      <p class="refuge-copy">Primero quiero respetar cómo te sientes.</p>

      <div class="refuge-route-options">
        <button class="refuge-route-card" data-serious="company">
          <span class="refuge-route-icon">🫂</span>
          <span>
            <strong>Necesito sentirme acompañada</strong>
            <small>No quiero sentir que estoy sola con esto.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-serious="think">
          <span class="refuge-route-icon">💭</span>
          <span>
            <strong>Necesito pensar</strong>
            <small>No quiero decidir nada todavía.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-serious="read">
          <span class="refuge-route-icon">💌</span>
          <span>
            <strong>Necesito leer algo</strong>
            <small>Quiero poner en palabras lo que siento.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-serious="alone">
          <span class="refuge-route-icon">🌙</span>
          <span>
            <strong>Necesito estar sola</strong>
            <small>Solo quiero un poco de espacio.</small>
          </span>
        </button>
      </div>

      <button class="refuge-back-btn" data-rel-action="back">← Volver</button>
    `, [
      ['[data-serious="company"]', () => showSeriousEnd('company')],
      ['[data-serious="think"]', () => showSeriousEnd('think')],
      ['[data-serious="read"]', () => showSeriousEnd('read')],
      ['[data-serious="alone"]', () => showSeriousEnd('alone')],
      ['[data-rel-action="back"]', showRelationshipRoute]
    ]);
  }


  function showSillyFightBad() {
    const menu = getMenu();
    if (!menu) return;

    menu.innerHTML = `
      <p class="refuge-eyebrow">FUE UNA ESTUPIDEZ</p>
      <h2>Pero estamos mal.</h2>

      <article class="refuge-letter">
        <p>Quizá fue una pelea por algo que, viéndolo desde afuera, parece pequeño.</p>

        <p>Una tontería. Una palabra que cayó mal. Una reacción que se salió de lugar. Algo que probablemente ninguno de los dos quería que terminara así.</p>

        <p>Pero hay algo que quiero decirte sin intentar quitarle importancia a lo que sientes:</p>

        <p><strong>que haya empezado por una estupidez no significa que no pueda doler.</strong></p>

        <p>A veces una pelea pequeña termina tocando cosas que ya estaban ahí. Cansancio, frustración, miedo, cosas que no dijimos bien, cosas que interpretamos diferente...</p>

        <p>Y de repente dejamos de discutir por aquello que pasó y empezamos a discutir por todo lo que sentimos.</p>

        <p>Si estamos aquí, probablemente no necesito convencerte de que fue una tontería.</p>

        <p>Quizá lo que necesitamos es recordar que <strong>nosotros somos más grandes que el motivo de esta pelea.</strong></p>

        <p>No quiero que ganemos una discusión y perdamos la paz que tantas veces hemos encontrado juntos.</p>

        <p>Tampoco quiero que ninguno tenga que tragarse lo que siente solo para que volvamos a estar bien.</p>

        <p>Quiero que podamos decir:</p>

        <p><em>"Esto me dolió."</em></p>

        <p>Y que el otro pueda escuchar antes de defenderse.</p>

        <p>Porque somos polos opuestos, amor. Lo hemos sabido desde el principio.</p>

        <p>A veces tú vas a sentir algo de una manera que yo no habría imaginado. Y a veces yo voy a ver las cosas desde un lugar que para ti no tiene ningún sentido.</p>

        <p>Pero eso nunca debería convertirse en una competencia para ver quién tiene la razón.</p>

        <p>Si fue una estupidez, entonces ojalá podamos hacer algo bonito con eso:</p>

        <p><strong>aprender a no dejar que una cosa pequeña nos haga olvidar todo lo grande que hemos construido.</strong></p>

        <p>Y si todavía estás molesta conmigo, puedes estarlo.</p>

        <p>No tienes que perdonarme inmediatamente.</p>

        <p>No tienes que fingir que ya pasó.</p>

        <p>Solo quiero que recuerdes que detrás de esta pelea seguimos estando tú y yo.</p>

        <p>Los mismos dos que se conocieron el 05/04/2025.</p>

        <p>Los mismos dos que tuvieron aquel click absurdo cuando adiviné tu nombre.</p>

        <p>Los mismos dos que dicen "te amodoro", que se molestan, que se ríen, que se dicen "me odias" y que aun siendo tan diferentes siguen escogiendo encontrarse.</p>

        <p>Así que si esta pelea fue una estupidez...</p>

        <p>no dejemos que una estupidez decida por nosotros.</p>

        <p class="refuge-signoff">Te amo, srta. cara de papa.<br>— Gian</p>
      </article>

      <button class="refuge-back-btn" data-silly-action="back">← Volver</button>
    `;

    const back = menu.querySelector('[data-silly-action="back"]');
    if (back) back.addEventListener('click', () => showHowWeAre('silly'));
  }


  // Ruta final completada:
  // NO FUE UNA ESTUPIDEZ → ESTAMOS A PUNTO DE TERMINAR
  // usa content.ending y no un placeholder.
  function showNotSillyEnd(type) {
    const content = {
      bad: {
        eyebrow: 'NO FUE UNA ESTUPIDEZ',
        title: 'Estamos mal.',
        paragraphs: [
          'Si lo que pasó realmente nos hizo daño, no quiero esconderlo detrás de una frase bonita.',
          'No quiero decirte que fue solo una pelea ni que deberíamos olvidarlo porque nos queremos.',
          'Si te dolió, importa. Si te decepcioné, importa. Si algo de lo que hice cambió la forma en la que me miras, también importa.',
          'Quererte no me da derecho a pedirte que pases por encima de lo que sientes.',
          'Quiero aprender a escucharte incluso cuando escucharme a mí mismo sería más cómodo.',
          'Y si hay algo que tengo que reconocer, cambiar o reparar, quiero hacerlo de verdad, no solamente decir "perdón" para que dejemos de estar mal.',
          'No necesito que hoy todo vuelva a estar perfecto.',
          'Solo quiero que sepas que estoy dispuesto a sentarme contigo, escucharte y entender qué fue lo que realmente te hizo daño.',
          'Porque si vamos a seguir construyendo esto, quiero que sea sobre cosas que podamos hablar, no sobre heridas que los dos aprendamos a esconder.'
        ],
        signoff: 'Te quiero. Y quiero aprender a quererte mejor.<br>— Gian'
      },
      distant: {
        eyebrow: 'NO FUE UNA ESTUPIDEZ',
        title: 'Algo cambió entre nosotros.',
        paragraphs: [
          'Hay veces en las que una conversación termina, pero lo que dejó sigue ahí.',
          'Nos hablamos, nos vemos, quizá incluso nos reímos... pero algo se siente distinto.',
          'Si eso es lo que estás sintiendo, no quiero obligarte a volver a ser la de antes conmigo de un momento para otro.',
          'Quizá necesitas tiempo para entender qué sientes. Quizá necesitas que yo entienda algo que todavía no he conseguido ver.',
          'Y aunque me duela sentirte lejos, prefiero una distancia honesta a que tengas que fingir conmigo que todo está bien.',
          'Si alguna vez decides acercarte, quiero que podamos hacerlo sin miedo a que la conversación se convierta otra vez en una pelea.',
          'Podemos hablar despacio.',
          'Podemos decir lo que nos dolió sin convertirlo en una lista de culpas.',
          'Y si hoy solamente necesitas espacio, también puedo respetarlo.'
        ],
        signoff: 'No voy a dejar de cuidar lo que siento por ti solo porque hoy estemos lejos.<br>— Gian'
      },
      trying: {
        eyebrow: 'NO FUE UNA ESTUPIDEZ',
        title: 'Estamos intentando arreglarlo.',
        paragraphs: [
          'Sé que intentar arreglar algo que realmente dolió no es lo mismo que decir "perdón" y continuar.',
          'A veces reparar significa volver a hablar de lo mismo aunque sea incómodo. Significa aceptar que quizá el otro necesita tiempo. Significa cambiar pequeñas cosas después de que la conversación ya terminó.',
          'Si estamos intentando, quiero hacerlo bien.',
          'No quiero que arreglarlo signifique que tú tengas que tragarte lo que sentiste para que podamos volver a estar tranquilos.',
          'Quiero que podamos entendernos mejor después de esto, incluso si para conseguirlo tenemos que admitir que los dos nos equivocamos en algunas cosas.',
          'Y quiero recordar algo de nosotros: hemos tenido diferencias desde el principio. Somos muy distintos, y aun así encontramos una manera de querernos.',
          'No quiero usar nuestras diferencias como excusa para lastimarnos.',
          'Quiero aprender de ellas.',
          'Si estamos aquí, todavía intentando, yo también quiero poner de mi parte.'
        ],
        signoff: 'Paso a paso. Sin fingir que nada pasó.<br>— Gian'
      },
      ending: {
        eyebrow: 'NO FUE UNA ESTUPIDEZ',
        title: 'Estamos a punto de terminar.',
        paragraphs: [
          'Si llegamos a este punto, sé que probablemente esto ya no se trata solamente de una discusión.',
          'Y por eso no quiero utilizar esta carta para pedirte que te quedes a cualquier precio.',
          'No quiero que mi amor se convierta en presión.',
          'Si hay cosas que te hicieron sentir que ya no puedes seguir, quiero escucharlas aunque me duelan.',
          'Quiero saber qué pasó contigo, qué necesitaste y no encontraste, qué te cansó y qué ya no quieres volver a vivir.',
          'Y si todavía existe una parte de ti que quiere intentarlo, quiero que podamos hablar desde ahí, con honestidad y sin promesas vacías.',
          'Pero si no la existe, también quiero respetar tu decisión.',
          'Porque lo que tuvimos no necesita ser falso para que algún día pueda terminar.',
          'Para mí fue real. Tú fuiste real. Cada recuerdo que guardamos fue real.',
          'Y pase lo que pase, nunca voy a querer convertir todo eso en una razón para hacerte sentir culpable.'
        ],
        signoff: 'Gracias por haber sido parte de mi vida de una manera tan bonita.<br>— Gian'
      }
    };

    const item = content[type] || content.bad;
    const paragraphs = item.paragraphs.map(p => `<p>${p}</p>`).join('');

    render(`
      <p class="refuge-eyebrow">${item.eyebrow}</p>
      <h2>${item.title}</h2>
      <article class="refuge-letter">
        ${paragraphs}
        <p class="refuge-signoff">${item.signoff}</p>
      </article>
      ${type === 'trying' ? `
      <div class="refuge-video-card">
        <p class="refuge-eyebrow">UN ÚLTIMO PEDACITO DE NOSOTROS</p>
        <h3>Si todavía estamos intentando arreglarlo...</h3>
        <video controls preload="metadata" playsinline>
          <source src="assets/refugio/videos/01_nosotros_mal.mp4" type="video/mp4">
          Tu navegador no puede reproducir este video.
        </video>
      </div>` : ''}
      <button class="refuge-back-btn" data-not-silly-action="back">← Volver</button>
    `, [
      ['[data-not-silly-action="back"]', () => showHowWeAre('not-silly')]
    ]);
  }


  function showSeriousEnd(type) {
    const content = {
      company: {
        eyebrow: 'ALGO MUY GRAVE PASÓ',
        title: 'No tienes que estar sola con esto.',
        paragraphs: [
          'Si lo que pasó fue realmente grave, no quiero empezar diciéndote que tenemos que arreglarlo.',
          'Primero quiero que estés bien. Que puedas respirar. Que puedas sentir lo que tengas que sentir sin tener que cuidar mis sentimientos al mismo tiempo.',
          'Si estás herida, enojada, decepcionada o confundida, todo eso puede existir aquí.',
          'Y si necesitas que alguien simplemente se quede contigo, sin discutir ni intentar encontrar una solución inmediatamente, también puedo hacerlo.',
          'No tienes que protegerme de lo que sientes.',
          'Tampoco tienes que decidir hoy qué significa todo esto para nosotros.',
          'Si quieres hablar, te escucho. Si quieres llorar, puedes llorar. Si quieres silencio, puedo respetar el silencio.',
          'Lo importante ahora no es ganar una discusión. Es que no tengas que cargar sola con algo que te está haciendo daño.'
        ],
        signoff: 'Estoy aquí para escucharte, no para obligarte a estar bien.<br>— Gian'
      },
      think: {
        eyebrow: 'ALGO MUY GRAVE PASÓ',
        title: 'Puedes pensar antes de decidir.',
        paragraphs: [
          'No todo tiene que resolverse en el momento en que ocurre.',
          'Si lo que pasó fue suficientemente grande como para hacerte cuestionar lo nuestro, tienes derecho a detenerte y pensar.',
          'No tienes que perdonarme hoy.',
          'No tienes que decidir si seguimos o terminamos mientras todavía estás intentando entender lo que sientes.',
          'Puedes tomar distancia de la conversación y volver cuando tengas claro qué quieres decir.',
          'Y si necesitas que yo escuche algo difícil sin defenderme inmediatamente, quiero aprender a hacerlo.',
          'A veces amar también significa dejar que la otra persona tenga el espacio necesario para decidir libremente.',
          'Así que piensa. Respira. Ordena lo que tengas dentro.',
          'Cuando sepas qué necesitas, podremos hablar desde ahí.'
        ],
        signoff: 'No voy a apurarte para obtener una respuesta que todavía no tienes.<br>— Gian'
      },
      read: {
        eyebrow: 'ALGO MUY GRAVE PASÓ',
        title: 'Entonces pongámoslo en palabras.',
        paragraphs: [
          'Si elegiste leer esto, quizá todavía no sabes cómo decirme todo lo que tienes adentro.',
          'Puedes empezar por lo más sencillo: qué pasó, qué sentiste y qué necesitas ahora.',
          'No tienes que hacerlo bonito. No tienes que cuidar cada palabra para que yo no me sienta mal.',
          'Si hice algo que te lastimó, quiero poder escucharlo completo.',
          'Y si hay una parte de la historia que yo todavía no entiendo, quiero que tengas la oportunidad de contármela desde tu lugar.',
          'No prometo tener una respuesta perfecta para todo.',
          'Pero sí puedo prometerte que voy a intentar escucharte antes de defenderme.',
          'Porque si algo realmente grave pasó entre nosotros, fingir que no pasó sería mucho peor que tener una conversación difícil.',
          'Cuando estés lista, puedes decirlo. Aquí no necesitas esconderlo.'
        ],
        signoff: 'Quiero entenderte, incluso cuando lo que tengas que decir me duela.<br>— Gian'
      },
      alone: {
        eyebrow: 'ALGO MUY GRAVE PASÓ',
        title: 'Te doy espacio.',
        paragraphs: [
          'Si lo que necesitas ahora mismo es estar sola, está bien.',
          'No voy a convertir tu necesidad de espacio en una prueba de cuánto me quieres.',
          'No voy a pedirte que respondas inmediatamente ni voy a hacerte sentir culpable por necesitar distancia.',
          'Puedes apagar el teléfono. Puedes llorar. Puedes dormir. Puedes salir, respirar y dejar que tu cabeza se calme.',
          'Y si algún día quieres volver a hablar, sabrás dónde encontrarme.',
          'Tener espacio no borra lo que pasó. Tampoco significa automáticamente que todo terminó.',
          'Solo significa que ahora mismo necesitas un lugar donde puedas escuchar tus propios pensamientos.',
          'Así que tómalo.',
          'Cuando estés lista para decidir qué quieres hacer con todo esto, esa decisión puede ser tuya.'
        ],
        signoff: 'Cuídate primero. Lo demás puede esperar un momento.<br>— Gian'
      }
    };

    const item = content[type] || content.company;

    render(`
      <p class="refuge-eyebrow">${item.eyebrow}</p>
      <h2>${item.title}</h2>

      <article class="refuge-letter">
        ${item.paragraphs.map(p => `<p>${p}</p>`).join('')}
        <p class="refuge-signoff">${item.signoff}</p>
      </article>

      <button class="refuge-back-btn" data-serious-action="back">← Volver</button>
    `, [
      ['[data-serious-action="back"]', showSeriousNeeds]
    ]);

  }

  function showRelationshipEnd(type) {
    if (type === 'bad') {
      showSillyFightBad();
      return;
    }
    if (type === 'distant') {
      showSillyFightDistant();
      return;
    }
    if (type === 'trying') {
      showSillyFightTrying();
      return;
    }
    if (type === 'ending') {
      showSillyFightEnding();
      return;
    }

    const messages = {
      'serious-company': ['No estás sola.', 'Primero compañía. Después veremos qué hacemos con todo lo demás.'],
      'serious-think': ['Puedes pensar.', 'No tienes que tomar una decisión en este momento.'],
      'serious-read': ['Vamos a ponerlo en palabras.', 'Aquí irá la carta para cuando algo realmente grave haya pasado.'],
      'serious-alone': ['Puedes tener espacio.', 'Necesitar espacio no significa que tus sentimientos no importen.']
    };
    const [title, text] = messages[type] || ['Estamos mal.', 'Esta ruta todavía está en construcción.'];

    render(`
      <p class="refuge-eyebrow">ESTAMOS MAL</p>
      <h2>${title}</h2>
      <p class="refuge-lead">${text}</p>
      <div class="refuge-route-placeholder">
        <span>♡</span>
        <p>Esta será una de las próximas piezas del Refugio.</p>
      </div>
      <button class="refuge-back-btn" data-rel-action="back">← Volver a las opciones</button>
    `, [
      ['[data-rel-action="back"]', showRelationshipRoute]
    ]);
  }

  function showSillyFightDistant() {
    render(`
      <p class="refuge-eyebrow">FUE UNA ESTUPIDEZ</p>
      <h2>Pero ahora estamos distantes.</h2>

      <article class="refuge-letter">
        <p>Hay una clase de silencio que aparece después de una pelea.</p>
        <p>No necesariamente porque ya no haya amor.</p>
        <p>A veces simplemente ninguno sabe cómo acercarse primero.</p>

        <p>Y si estás aquí, quizá eso es lo que está pasando.</p>

        <p>Quizá seguimos queriéndonos, pero hay una distancia rara entre nosotros. Como si los dos estuviéramos esperando que el otro haga algo para saber que todavía está ahí.</p>

        <p>Si es así, quiero que recuerdes algo:</p>

        <p><strong>no quiero que el orgullo sea más grande que nosotros.</strong></p>

        <p>No quiero que tengas que fingir que no me extrañas si sí lo haces.</p>
        <p>Ni quiero que yo tenga que fingir que no me importas para parecer fuerte.</p>

        <p>Somos nosotros. No necesitamos ganar esta pelea.</p>

        <p>Y si todavía necesitas tiempo, también está bien.</p>

        <p>No quiero perseguirte cuando necesites espacio. Pero tampoco quiero que confundas mi silencio con indiferencia.</p>

        <p>Estoy aquí.</p>

        <p>Cuando quieras hablar, podemos hacerlo sin intentar demostrar quién tuvo más razón.</p>

        <p>Podemos simplemente volver a encontrarnos.</p>

        <p>Porque una pelea puede dejarnos distantes por un rato.</p>

        <p><strong>Pero no quiero que una pelea decida la distancia entre nosotros.</strong></p>

        <p class="refuge-signoff">Te amodoro.<br>— Gian</p>
      </article>

      <button class="refuge-back-btn" data-silly-action="back">← Volver</button>
    `, [
      ['[data-silly-action="back"]', () => showHowWeAre('silly')]
    ]);
  }

  function showSillyFightTrying() {
    render(`
      <p class="refuge-eyebrow">FUE UNA ESTUPIDEZ</p>
      <h2>Y estamos intentando arreglarlo.</h2>

      <article class="refuge-letter">
        <p>Si llegaste hasta aquí, quiero decirte algo sencillo:</p>

        <p><strong>gracias por seguir intentando.</strong></p>

        <p>No porque tengamos que aguantar cualquier cosa ni porque estar juntos signifique ignorar lo que nos hace daño.</p>

        <p>Sino porque sé que después de una pelea es más fácil cerrarse que volver a abrirse.</p>

        <p>Y aun así estamos intentando.</p>

        <p>Eso importa.</p>

        <p>Quizá todavía estamos incómodos. Quizá todavía queda algo por hablar. Quizá uno de los dos sigue un poquito molesto.</p>

        <p>No pasa nada.</p>

        <p>No necesitamos arreglar todo en cinco minutos.</p>

        <p>Podemos hacerlo despacio.</p>

        <p>Podemos aprender a pedir perdón sin sentir que perdimos.</p>

        <p>Podemos aprender a decir lo que necesitamos antes de que se convierta en una pelea.</p>

        <p>Y podemos recordar que pedir perdón no significa que uno tenga toda la culpa.</p>

        <p>Significa que nos importa más cuidarnos que ganar.</p>

        <p>Yo quiero seguir aprendiendo a quererte mejor.</p>

        <p>Incluso cuando somos polos opuestos.</p>

        <p>Incluso cuando no entiendo inmediatamente lo que necesitas.</p>

        <p>Y espero que tú también sepas que no necesito una relación perfecta.</p>

        <p>Quiero una relación real.</p>

        <p>Una donde podamos equivocarnos, hablar, reparar y volver a reírnos.</p>

        <p>Así que si estamos intentando...</p>

        <p><strong>yo también estoy aquí.</strong></p>

        <p class="refuge-signoff">Siempre tú, srta. cara de papa.<br>— Gian</p>
      </article>

      <div class="refuge-video-card">
        <p class="refuge-eyebrow">UN ÚLTIMO PEDACITO DE NOSOTROS</p>
        <h3>Si todavía estamos intentando arreglarlo...</h3>
        <video controls preload="metadata" playsinline>
          <source src="assets/refugio/videos/01_nosotros_mal.mp4" type="video/mp4">
          Tu navegador no puede reproducir este video.
        </video>
      </div>

      <button class="refuge-back-btn" data-silly-action="back">← Volver</button>
    `, [
      ['[data-silly-action="back"]', () => showHowWeAre('silly')]
    ]);
  }

  function showSillyFightEnding() {
    render(`
      <p class="refuge-eyebrow">FUE UNA ESTUPIDEZ</p>
      <h2>Pero estamos a punto de terminar.</h2>

      <article class="refuge-letter">
        <p>Si llegaste hasta aquí, no quiero intentar convencerte de nada con una frase bonita.</p>

        <p>Porque si estamos realmente cerca de terminar, probablemente hay muchas cosas detrás de una sola pelea.</p>

        <p>Y aunque haya empezado por una estupidez, quizá ya dejó de tratarse de eso.</p>

        <p>Así que no voy a decirte que olvides lo que sientes.</p>

        <p>No voy a pedirte que te quedes solamente porque te amo.</p>

        <p>Y tampoco quiero que sientas que esta carta es una forma de presionarte.</p>

        <p>Solo quiero que, antes de tomar una decisión definitiva, recuerdes que para mí lo nuestro nunca fue una cosa pequeña.</p>

        <p>Desde aquel 05/04/2025 hasta cada momento que hemos ido acumulando, tú has sido una parte enorme de mi vida.</p>

        <p>Me acuerdo de nuestro click. De cuando adiviné tu nombre. De nuestras palabras tontas. De los "te amodoro". De los "me odias". De todas esas cosas que probablemente para cualquier otra persona no significarían nada.</p>

        <p>Para mí significan muchísimo.</p>

        <p>Si todavía queda algo que decir, quiero escucharlo.</p>

        <p>Si necesitas que te escuche, voy a hacerlo.</p>

        <p>Y si necesitas espacio, también voy a respetarlo.</p>

        <p>Porque quererte no debería significar intentar decidir por ti.</p>

        <p>Solo quería que supieras que, incluso en un momento así, <strong>lo que vivimos fue real para mí.</strong></p>

        <p class="refuge-signoff">Con todo mi amor.<br>— Gian</p>
      </article>

      <button class="refuge-back-btn" data-silly-action="back">← Volver</button>
    `, [
      ['[data-silly-action="back"]', () => showHowWeAre('silly')]
    ]);
  }


  function restoreRefugeMenu() {
    const refuge = document.getElementById('refuge');
    if (refuge) refuge.remove();
    if (typeof window.openRefuge === 'function') {
      window.openRefuge();
    } else {
      location.reload();
    }
  }

  document.addEventListener('click', function (event) {
    const option = event.target.closest('#refuge .refuge-option');
    if (!option) return;

    const state = (option.getAttribute('data-refuge-state') || '').toLowerCase();
    const text = (option.textContent || '').toLowerCase();

    // The existing Refugio may use a different state name. The visible
    // label is unambiguous, so support both the attribute and the text.
    if (
      state === 'relationship' ||
      state.includes('relationship') ||
      state.includes('mal') ||
      text.includes('estamos mal')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showRelationshipRoute();
    }
  }, true);

  window.showRelationshipRoute = showRelationshipRoute;
})();


/* =========================
   REFUGIO — PUERTAS ESPECIALES
   Contador + "Ya no estamos juntos"
   ========================= */
(function () {
  'use strict';

  function getMenu() {
    return document.getElementById('refugeMenu');
  }

  function goToCounter() {
    const refuge = document.getElementById('refuge');

    if (refuge) {
      refuge.classList.add('hidden');
      document.body.classList.remove('refuge-open');

      setTimeout(() => {
        refuge.remove();
        if (typeof iniciarCapitulo7 === 'function') {
          iniciarCapitulo7();
        } else if (typeof mostrarCapitulo === 'function') {
          mostrarCapitulo(7);
        }
      }, 380);
      return;
    }

    if (typeof iniciarCapitulo7 === 'function') {
      iniciarCapitulo7();
    }
  }

  function showNoLongerTogether() {
    const menu = getMenu();
    if (!menu) return;

    menu.innerHTML = `
      <p class="refuge-eyebrow">SI ALGÚN DÍA YA NO ESTAMOS JUNTOS</p>
      <h2>Esta carta espero que nunca tengas que abrirla.</h2>

      <article class="refuge-letter refuge-final-letter">
        <p>Rossy,</p>
        <p>si estás leyendo esto, probablemente pasó algo que, cuando hice Aurora, no quería ni imaginar.</p>
        <p>Que algún día pudieras entrar aquí y que nosotros ya no estuviéramos juntos.</p>
        <p>Y te soy sincero...</p>
        <p>me cuesta muchísimo escribir esto.</p>
        <p>Porque mientras hacía cada parte de Aurora, siempre había una parte de mí que asumía que tú ibas a estar al otro lado de la pantalla.</p>
        <p>Que ibas a reírte de alguna tontería.</p>
        <p>Que ibas a reconocer una foto.</p>
        <p>Que ibas a encontrar algún detalle y pensar:</p>
        <p>&quot;Este bobo de verdad puso eso aquí.&quot;</p>
        <p>Y quizá, si estás leyendo esta carta, ya no sea así.</p>
        <p>Quizá ahora somos dos personas que alguna vez se quisieron muchísimo y que tuvieron que aprender a vivir por separado.</p>
        <p>No sé.</p>
        <p>Y me duele pensar en eso.</p>
        <p>Pero no quiero utilizar este lugar para pedirte que vuelvas.</p>
        <p>No quiero que una carta te haga sentir que tienes que quedarte conmigo por todo lo que vivimos.</p>
        <p>Si algún día llegamos a ese punto, quiero que sepas que voy a respetar tu decisión, aunque por dentro me cueste muchísimo hacerlo.</p>
        <p>Porque quererte nunca debería significar querer decidir por ti.</p>
        <p>Pero sí quiero decirte algo que probablemente nunca podría decirte sin que se me quiebre un poquito la voz:</p>
        <p>te voy a agradecer toda la vida por haberte encontrado.</p>
        <p>Por aquel 05/04/2025.</p>
        <p>Por ese momento en el que adiviné tu nombre y tuvimos nuestro bello click.</p>
        <p>Qué cosa tan pequeña parece ahora...</p>
        <p>y qué enorme terminó siendo.</p>
        <p>Porque después de ese día vinieron tantos otros.</p>
        <p>Vinieron nuestras conversaciones.</p>
        <p>Las risas.</p>
        <p>Los detalles.</p>
        <p>Las discusiones.</p>
        <p>Los &quot;me odias&quot;.</p>
        <p>Los &quot;te amodoro&quot;.</p>
        <p>Las veces que fuimos dos completos polos opuestos intentando entendernos.</p>
        <p>Las veces que conseguimos volver a encontrarnos.</p>
        <p>Los sueños que alguna vez imaginamos juntos.</p>
        <p>Incluso esas conversaciones absurdas sobre una futura Helena que todavía no existe y cuyo nombre, por cierto, sé que algún día voy a conseguir que te guste. 😂</p>
        <p>Todo eso pasó.</p>
        <p>Y pasó de verdad.</p>
        <p>Por eso, si algún día terminamos, no quiero mirar nuestra historia como un error solamente porque tuvo un final diferente al que imaginábamos.</p>
        <p>Tú no fuiste un error en mi vida.</p>
        <p>Nunca.</p>
        <p>Fuiste una parte enorme de ella.</p>
        <p>Y hay cosas de ti que sé que se van a quedar conmigo durante mucho tiempo.</p>
        <p>La forma en que eres.</p>
        <p>Tu manera de seguir adelante incluso cuando tienes muchísimo encima.</p>
        <p>La forma en que encuentras felicidad en cosas pequeñas.</p>
        <p>Tu amor por tu familia.</p>
        <p>Tu manera de disfrutar cuando estás en Venezuela y sientes que puedes descansar.</p>
        <p>Tu obsesión con Enredados.</p>
        <p>Tus películas de Barbie.</p>
        <p>Tu forma de hacer cheer.</p>
        <p>Tus sueños de tener tu propio espacio.</p>
        <p>Y esa versión tuya que quizá tú misma no ves siempre:</p>
        <p>la que ha pasado por cosas difíciles y aun así sigue intentando.</p>
        <p>Yo la vi.</p>
        <p>Y me siento muy afortunado de haber podido conocerla.</p>
        <p>También sé que no fui perfecto.</p>
        <p>Sé que hubo veces en las que no supe entenderte.</p>
        <p>Veces en las que nuestras diferencias hicieron las cosas más difíciles.</p>
        <p>Veces en las que pude haberte escuchado mejor.</p>
        <p>Veces en las que quizá te hice sentir cosas que nunca quise hacerte sentir.</p>
        <p>Y si algún día terminamos, espero que también puedas perdonarme por las veces en las que no fui el Gian que necesitabas.</p>
        <p>Porque yo también aprendí contigo.</p>
        <p>Muchísimo.</p>
        <p>Aprendí que querer a alguien no es solamente disfrutar cuando todo está bien.</p>
        <p>También es intentar entender cuando no entiendes.</p>
        <p>Es aprender a escuchar.</p>
        <p>Es aceptar que la otra persona puede sentir algo completamente distinto a ti y que eso no hace que esté equivocada.</p>
        <p>Y, sobre todo, aprendí que algunas personas llegan a tu vida y dejan una marca que no desaparece simplemente porque la historia cambie.</p>
        <p>Tú eres una de esas personas para mí.</p>
        <p>Así que si algún día ya no estamos juntos...</p>
        <p>por favor, no pienses que todo esto perdió su valor.</p>
        <p>No pienses que porque terminó, entonces nunca fue real.</p>
        <p>Fue real.</p>
        <p>Fuiste mi Rossy.</p>
        <p>Yo fui tu Gian.</p>
        <p>Tuvimos nuestro pequeño mundo.</p>
        <p>Y durante un tiempo, ese mundo fue suficiente.</p>
        <p>Quizá algún día estés viviendo sola, como tantas veces soñaste.</p>
        <p>Quizá terminaste tu carrera.</p>
        <p>Quizá conseguiste ese trabajo que tanto buscabas.</p>
        <p>Quizá estés viajando.</p>
        <p>Quizá estés en Venezuela visitando a tu familia.</p>
        <p>Quizá estés viendo Enredados otra vez.</p>
        <p>Quizá estés con alguien más.</p>
        <p>Y sí...</p>
        <p>esa última posibilidad probablemente sea la que más me cueste imaginar.</p>
        <p>Pero incluso así, voy a querer que estés bien.</p>
        <p>Voy a querer que seas feliz.</p>
        <p>Porque si alguna vez te amé de verdad, entonces también tengo que querer eso para ti aunque duela que ya no sea conmigo.</p>
        <p>Y si algún día recuerdas Aurora...</p>
        <p>espero que no la recuerdes como un intento mío de retenerte.</p>
        <p>Quiero que la recuerdes como lo que siempre quise que fuera:</p>
        <p>un lugar donde guardé todo lo bonito que vivimos.</p>
        <p>Las fotos.</p>
        <p>Las fechas.</p>
        <p>Las palabras.</p>
        <p>Las tonterías.</p>
        <p>Nuestro click.</p>
        <p>Nuestra historia.</p>
        <p>Tú.</p>
        <p>Y yo.</p>
        <p>Y si algún día vuelves a entrar aquí después de mucho tiempo...</p>
        <p>quizá ya no sientas lo mismo.</p>
        <p>Quizá te dé nostalgia.</p>
        <p>Quizá te dé risa.</p>
        <p>Quizá incluso te dé un poquito de tristeza.</p>
        <p>No sé.</p>
        <p>Pero espero que, por un segundo, puedas sonreír.</p>
        <p>Porque alguna vez hubo un Gian que te quiso muchísimo.</p>
        <p>Un Gian que se enamoró de una chica que era completamente diferente a él.</p>
        <p>Una chica que se convirtió en su persona favorita.</p>
        <p>Una chica a la que llamó Srta. Cara de Papa.</p>
        <p>Una chica con la que soñó cosas que todavía no existían.</p>
        <p>Y ese Gian...</p>
        <p>está aquí.</p>
        <p>Escribiéndote esto.</p>
        <p>Con un poquito de miedo.</p>
        <p>Con un poquito de tristeza.</p>
        <p>Pero sobre todo con muchísimo agradecimiento.</p>
        <p>Gracias por el tiempo.</p>
        <p>Gracias por el amor.</p>
        <p>Gracias por cada recuerdo.</p>
        <p>Gracias por haberme dejado ser parte de tu vida.</p>
        <p>Y si esta realmente fuera nuestra última carta...</p>
        <p>entonces no quiero terminarla diciendo adiós.</p>
        <p>Quiero terminarla diciéndote algo que probablemente ya sabes:</p>
        <p>te amodoro.</p>
        <p>Y aunque algún día nuestros caminos vayan hacia lugares diferentes...</p>
        <p>una parte de mí siempre va a estar agradecida de que, entre todas las personas del mundo, alguna vez nuestros caminos se cruzaron.</p>
        <p>Cuídate mucho, Rossy.</p>
        <p>Y vive bonito.</p>
        <p>Por favor.</p>
        <p class="refuge-signoff">— Gian</p>
      </article>

      <div class="refuge-final-audio">
        <audio id="refugeFinalAudio" preload="auto">
          <source src="assets/audio/cant-help-falling-in-love.mp3" type="audio/mpeg">
        </audio>
        <p class="refuge-audio-note">La canción que quiero que te acompañe mientras lees.</p>
        <button id="refugeAudioFallback" class="refuge-back-btn hidden" type="button">▶ Reproducir audio</button>
      </div>

      <button class="refuge-back-btn" data-special-action="back">← Volver al Refugio</button>
    `;

    const audio = menu.querySelector('#refugeFinalAudio');
    const fallback = menu.querySelector('#refugeAudioFallback');

    // The letter is opened by a user click, so try to begin playback immediately.
    if (audio) {
      audio.volume = 0.85;
      const playAttempt = audio.play();

      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(() => {
          // Some browsers may still block programmatic playback.
          if (fallback) fallback.classList.remove('hidden');
        });
      }
    }

    if (fallback && audio) {
      fallback.addEventListener('click', () => {
        audio.play().then(() => {
          fallback.classList.add('hidden');
        }).catch(() => {});
      });
    }

    const back = menu.querySelector('[data-special-action="back"]');
    if (back) back.addEventListener('click', () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (typeof window.showRelationshipRoute === 'function') {
        window.showRelationshipRoute();
      } else if (typeof window.openRefuge === 'function') {
        window.openRefuge();
      }
    });
  }

  document.addEventListener('click', function (event) {
    const button = event.target.closest('#refuge .refuge-secret-door');
    if (!button) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const action = button.getAttribute('data-refuge-secret');

    if (action === 'counter') {
      goToCounter();
    } else if (action === 'not-together') {
      showNoLongerTogether();
    }
  }, true);

  window.showNoLongerTogether = showNoLongerTogether;
})();


/* =========================
   REFUGIO — RUTA PRINCIPAL: ACOMPAÑADA
   ========================= */
(function () {
  'use strict';

  function getMenu() {
    return document.getElementById('refugeMenu');
  }

  function render(html, bindings) {
    const menu = getMenu();
    if (!menu) return;
    menu.innerHTML = html;
    (bindings || []).forEach(([selector, handler]) => {
      const el = menu.querySelector(selector);
      if (el) el.addEventListener('click', handler);
    });
  }

  function showCompanionshipRoute() {
    render(`
      <p class="refuge-eyebrow">EL REFUGIO</p>
      <h2>No tienes que pasar por esto sola.</h2>
      <p class="refuge-lead">No voy a intentar arreglarte nada. Primero puedo simplemente acompañarte.</p>
      <p class="refuge-copy">¿Qué te gustaría encontrar aquí?</p>

      <div class="refuge-route-options">
        <button class="refuge-route-card" data-comp-action="letter">
          <span class="refuge-route-icon">💌</span>
          <span>
            <strong>Quiero leer algo</strong>
            <small>Solo necesito recordar que no estoy sola.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-comp-action="audio">
          <span class="refuge-route-icon">🎧</span>
          <span>
            <strong>Quiero escucharte</strong>
            <small>Una voz para este momento.</small>
          </span>
        </button>

        <button class="refuge-route-card" data-comp-action="photos">
          <span class="refuge-route-icon">🌱</span>
          <span>
            <strong>Quiero volver un poquito atrás</strong>
            <small>Solo recuerdos de ti. Sin explicaciones.</small>
          </span>
        </button>
      </div>

      <button class="refuge-back-btn" data-comp-action="back">← Volver a las opciones</button>
    `, [
      ['[data-comp-action="letter"]', showCompanionshipLetter],
      ['[data-comp-action="audio"]', showCompanionshipAudio],
      ['[data-comp-action="photos"]', showCompanionshipGallery],
      ['[data-comp-action="back"]', restoreRootMenu]
    ]);
  }

  function showCompanionshipLetter() {
    render(`
      <p class="refuge-eyebrow">PARA CUANDO SOLO NECESITES COMPAÑÍA</p>
      <h2>No tienes que explicármelo todo.</h2>
      <article class="refuge-letter">
        <p>Si llegaste hasta aquí porque solo necesitas sentir que alguien está contigo, quiero empezar por algo sencillo:</p>
        <p><strong>no tienes que encontrar las palabras correctas para poder tenerme cerca.</strong></p>
        <p>A veces puedo no entender inmediatamente lo que estás sintiendo. Somos muy diferentes y venimos de mundos que no siempre miran las cosas de la misma manera.</p>
        <p>Pero hay algo que sí puedo hacer:</p>
        <p><strong>escucharte.</strong></p>
        <p>Puedo quedarme contigo aunque no tenga una respuesta. Puedo dejar que hables, que llores, que estés enojada, confundida o que no quieras decir absolutamente nada.</p>
        <p>No quiero que sientas que tienes que estar bien para que yo pueda quererte.</p>
        <p>Si hoy necesitas que simplemente esté, puedo simplemente estar.</p>
        <p>Y si necesitas espacio, también puedo entenderlo.</p>
        <p>No estás sola, amor.</p>
        <p>No porque yo vaya a solucionar cada cosa de tu vida, sino porque cuando quieras dejarme entrar un poquito, <strong>voy a escucharte sin exigirte que tengas todo resuelto.</strong></p>
        <p>Así que ven como estés.</p>
        <p><strong>Yo te escucho.</strong></p>
        <p class="refuge-signoff">Te amodoro.<br>— Gian</p>
      </article>
      <button class="refuge-back-btn" data-comp-action="back">← Volver</button>
    `, [
      ['[data-comp-action="back"]', showCompanionshipRoute]
    ]);
  }

  function showCompanionshipAudio() {
    render(`
      <p class="refuge-eyebrow">UNA VOZ PARA TI</p>
      <h2>Estoy aquí.</h2>
      <p class="refuge-lead">No tienes que responder. Solo escucha si te apetece.</p>
      <div class="refuge-audio-card">
        <div class="refuge-audio-icon">🎧</div>
        <audio controls preload="metadata">
          <source src="assets/refugio/audios/04_acompanada.mp3" type="audio/mpeg">
          Tu navegador no puede reproducir este audio.
        </audio>
      </div>
      <button class="refuge-back-btn" data-comp-action="back">← Volver</button>
    `, [
      ['[data-comp-action="back"]', showCompanionshipRoute]
    ]);
  }

  function showCompanionshipGallery() {
    const photos = Array.from({length: 16}, (_, i) => {
      const n = String(i + 1).padStart(2, '0');
      return `<img src="assets/refugio/galeria/rossy/foto_${n}.jpg" alt="" loading="${i < 3 ? 'eager' : 'lazy'}">`;
    }).join('');

    render(`
      <p class="refuge-eyebrow">UN POQUITO ATRÁS</p>
      <h2>Antes de todo esto, estaba ella.</h2>
      <p class="refuge-lead">Solo recuerdos. Sin explicaciones.</p>
      <div class="refuge-gallery-grid">${photos}</div>
      <button class="refuge-back-btn" data-comp-action="back">← Volver</button>
    `, [
      ['[data-comp-action="back"]', showCompanionshipRoute]
    ]);
  }

  function restoreRootMenu() {
    const refuge = document.getElementById('refuge');
    if (!refuge) return;
    refuge.remove();
    if (typeof window.openRefuge === 'function') {
      window.openRefuge();
    } else {
      location.reload();
    }
  }

  document.addEventListener('click', function (event) {
    const option = event.target.closest('#refuge .refuge-option[data-refuge-state="companionship"]');
    if (!option) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    showCompanionshipRoute();
  }, true);

  window.showCompanionshipRoute = showCompanionshipRoute;
})();

/* =========================
   REFUGIO — RUTA PRINCIPAL: NO SÉ EXACTAMENTE QUÉ NECESITO
   Corrección de navegación desde el menú principal.
   ========================= */
(function () {
  'use strict';
  document.addEventListener('click', function (event) {
    const option = event.target.closest('#refuge .refuge-option[data-refuge-state="unknown"]');
    if (!option) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (typeof window.showUnknownNeeds === 'function') {
      window.showUnknownNeeds();
    }
  }, true);
})();


/* =========================
   REFUGIO — RUTA PRINCIPAL: DEMASIADAS COSAS
   ========================= */
(function () {
  'use strict';

  function getMenu() { return document.getElementById('refugeMenu'); }

  function showThoughtsRoute() {
    const menu = getMenu();
    if (!menu) return;

    menu.innerHTML = `
      <p class="refuge-eyebrow">EL REFUGIO</p>
      <h2>Una cosa a la vez.</h2>
      <p class="refuge-lead">No tienes que acomodar toda tu cabeza antes de poder descansar.</p>

      <div class="refuge-route-options">
        <button class="refuge-route-card" data-thought-action="audio">
          <span class="refuge-route-icon">🎧</span>
          <span>
            <strong>Quiero escuchar algo</strong>
            <small>Para cuando hay demasiadas cosas dando vueltas.</small>
          </span>
        </button>
      </div>

      <button class="refuge-back-btn" data-thought-action="back">← Volver a las opciones</button>
    `;

    menu.querySelector('[data-thought-action="audio"]').addEventListener('click', showThoughtsAudio);
    menu.querySelector('[data-thought-action="back"]').addEventListener('click', restoreRoot);
  }

  function showThoughtsAudio() {
    const menu = getMenu();
    if (!menu) return;
    menu.innerHTML = `
      <p class="refuge-eyebrow">DEMASIADAS COSAS</p>
      <h2>Respira un poquito.</h2>
      <p class="refuge-lead">No tienes que solucionar todo mientras escuchas esto.</p>
      <div class="refuge-audio-card">
        <div class="refuge-audio-icon">🎧</div>
        <audio controls preload="metadata">
          <source src="assets/refugio/audios/05_demasiadas_cosas.mp3" type="audio/mpeg">
          Tu navegador no puede reproducir este audio.
        </audio>
      </div>
      <button class="refuge-back-btn" data-thought-action="back">← Volver</button>
    `;
    menu.querySelector('[data-thought-action="back"]').addEventListener('click', showThoughtsRoute);
  }

  function restoreRoot() {
    const refuge = document.getElementById('refuge');
    if (!refuge) return;
    refuge.remove();
    if (typeof window.openRefuge === 'function') window.openRefuge();
    else location.reload();
  }

  document.addEventListener('click', function(event) {
    const option = event.target.closest('#refuge .refuge-option[data-refuge-state="thoughts"]');
    if (!option) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    showThoughtsRoute();
  }, true);
})();


/* =========================================================
   REFUGIO — CORRECCIÓN DEFINITIVA DE ESCENA INMERSIVA
   La escena de "No sé exactamente qué necesito" se fuerza
   a pantalla completa desde JS para evitar que estilos
   antiguos del modal la mantengan dentro de una tarjeta.
========================================================= */
(function () {
  'use strict';

  const originalUnknownNeeds = window.showUnknownNeeds;

  if (typeof originalUnknownNeeds !== 'function') return;

  window.showUnknownNeeds = function () {
    originalUnknownNeeds();

    requestAnimationFrame(() => {
      const refuge = document.getElementById('refuge');
      const shell = refuge ? refuge.querySelector('.refuge-shell') : null;
      const menu = refuge ? refuge.querySelector('#refugeMenu') : null;
      const sky = refuge ? refuge.querySelector('.refuge-unknown-sky') : null;

      if (!refuge || !shell || !menu || !sky) return;

      refuge.classList.add('unknown-immersive-active');

      Object.assign(refuge.style, {
        position: 'fixed',
        inset: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '99999',
        margin: '0',
        padding: '0',
        overflow: 'hidden',
        background: '#02040b'
      });

      Object.assign(shell.style, {
        position: 'fixed',
        inset: '0',
        width: '100vw',
        maxWidth: 'none',
        height: '100vh',
        maxHeight: 'none',
        minHeight: '100vh',
        margin: '0',
        padding: '0',
        border: '0',
        borderRadius: '0',
        boxShadow: 'none',
        background: 'transparent',
        overflow: 'hidden',
        display: 'block'
      });

      Object.assign(menu.style, {
        position: 'absolute',
        inset: '0',
        width: '100%',
        maxWidth: 'none',
        height: '100%',
        minHeight: '100%',
        margin: '0',
        padding: '0',
        border: '0',
        borderRadius: '0',
        background: 'transparent',
        boxShadow: 'none',
        overflow: 'hidden'
      });

      Object.assign(sky.style, {
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        margin: '0',
        padding: '0',
        border: '0',
        borderRadius: '0',
        boxShadow: 'none'
      });

      /* El cielo debe dominar visualmente la pantalla. */
      sky.style.zIndex = '1';

      /* El botón de salida del modal queda discreto. */
      const exit = refuge.querySelector('#refugeExit');
      if (exit) {
        Object.assign(exit.style, {
          position: 'fixed',
          top: '18px',
          right: '20px',
          zIndex: '100001',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'rgba(4,7,14,.28)',
          border: '1px solid rgba(255,255,255,.10)',
          color: 'rgba(255,255,255,.72)'
        });
      }

      /* Asegura que la escena vuelva a entrar aunque el viewport
         cambie de tamaño después de abrirla. */
      const resize = () => {
        if (!document.body.contains(sky)) return;
        refuge.style.width = window.innerWidth + 'px';
        refuge.style.height = window.innerHeight + 'px';
        shell.style.width = window.innerWidth + 'px';
        shell.style.height = window.innerHeight + 'px';
        sky.style.width = window.innerWidth + 'px';
        sky.style.height = window.innerHeight + 'px';
      };

      window.addEventListener('resize', resize, { passive: true });
      resize();
    });
  };
})();
