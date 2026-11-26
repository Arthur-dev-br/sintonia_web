function iniciarRotacaoDeTexto(elementId, palavras, intervalo) {
  const elemento = document.getElementById(elementId);

  if (!elemento || !Array.isArray(palavras) || palavras.length === 0) {
    return;
  }

  let indiceAtual = 0;
  elemento.textContent = palavras[indiceAtual];

  window.setInterval(() => {
    indiceAtual = (indiceAtual + 1) % palavras.length;
    elemento.textContent = palavras[indiceAtual];
  }, intervalo);
}

iniciarRotacaoDeTexto(
  "random",
  [
    "- Sites e Landing Pages profissionais",
    "- Soluções digitais para o seu negócio",
    "- Desenvolvido para trazer resultados",
    "- Responsividade para os dispositivos",
  ],
  20000
);

iniciarRotacaoDeTexto(
  "random2",
  [
    "- O Design exclusivo e personalizado",
    "- Seus layouts modernos e responsivos",
    "- Identidade visual para sua empresa",
    "- Criando uma navegação envolvente",
  ],
  20000
);

iniciarRotacaoDeTexto(
  "random3",
  [
    "- Desenvolvido nas suas preferências",
    "- Soluções sob medida para a marca",
    "- Funções personalizadas e animadas",
    "- Projetos adaptados ao seu negócio",
  ],
  20000
);

iniciarRotacaoDeTexto(
  "random4",
  [
    "- Ganhe mais clientes através da web",
    "- Estratégia que faz você crescer na web",
    "- Resultado incrível para a sua empresa",
    "- Aumente o faturamento online",
  ],
  20000
);

iniciarRotacaoDeTexto(
  "random5",
  [
    "- Maior alcance para os seus clientes",
    "- A sua marca estará conectada online",
    "- Destaque digital para seus projetos",
    "- Aumente a visibilidade e o alcance",
  ],
  25000
);

iniciarRotacaoDeTexto(
  "random6",
  [
    "- Suporte dedicado aos seus clientes",
    "- Com um atendimento personalizado",
    "- Tenha ajuda focada na sua empresa",
    "- Com suporte técnico especializado",
  ],
  25000
);

iniciarRotacaoDeTexto(
  "random7",
  [
    "- Uma tecnologia de ponta para o site",
    "- Com recursos modernos e eficientes",
    "- Inovações geniais para seu projeto",
    "- Com soluções digitais avançadas",
  ],
  25000
);

iniciarRotacaoDeTexto(
  "random8",
  [
    "- Capte mais a atenção dos visitantes",
    "- Obtenha mais públicos interessados",
    "- Inove e conquiste mais clientes online",
    "- Crie mais conexão com seu público",
  ],
  25000
);

// Evita que placeholders temporários comecem a rolar a página para o topo.
document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
  });
});

// Chat simples: evita erro no chat.html enquanto a integração real não existe.
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const status = document.getElementById("status");
  const historic = document.getElementById("historic");

  if (!messageInput || !status || !historic) {
    return;
  }

  const texto = messageInput.value.trim();

  if (!texto) {
    messageInput.style.border = "1px solid red";
    status.textContent = "Digite uma pergunta antes de enviar.";
    return;
  }

  messageInput.style.border = "";

  const mensagem = document.createElement("p");
  mensagem.textContent = `Você: ${texto}`;
  historic.appendChild(mensagem);

  status.textContent =
    "Mensagem registrada localmente. Integração do chat ainda não foi conectada.";
  messageInput.value = "";
}

window.sendMessage = sendMessage;

const chatMessageInput = document.getElementById("message-input");

if (chatMessageInput) {
  chatMessageInput.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
      evento.preventDefault();
      sendMessage();
    }
  });
}

const botoesModal = document.querySelectorAll("[data-modal]");

botoesModal.forEach((botao) => {
  botao.addEventListener("click", () => {
    const modalId = botao.getAttribute("data-modal");
    const modal = modalId ? document.getElementById(modalId) : null;

    if (modal && typeof modal.showModal === "function") {
      modal.botaoOrigem = botao;
      modal.showModal();
    }
  });
});

const botoesFechar = document.querySelectorAll(".fechar-modal");

botoesFechar.forEach((botao) => {
  botao.addEventListener("click", () => {
    const modal = botao.closest("dialog");

    if (modal) {
      modal.close();
    }
  });
});

const modais = document.querySelectorAll("dialog");

modais.forEach((modal) => {
  modal.addEventListener("click", (evento) => {
    const areaConteudo = modal.querySelector(".modal-equipe-conteudo");

    if (areaConteudo && !areaConteudo.contains(evento.target)) {
      modal.close();
    }
  });

  modal.addEventListener("close", () => {
    if (modal.botaoOrigem instanceof HTMLElement) {
      modal.botaoOrigem.blur();
    }
  });
});

const timelineProcesso = document.querySelector("[data-processo-site]");

if (timelineProcesso) {
  const etapasProcesso = Array.from(
    timelineProcesso.querySelectorAll(".processo-site-etapa")
  );
  const painelProcesso = timelineProcesso.querySelector(".processo-site-painel");
  const numeroProcesso = timelineProcesso.querySelector(
    ".processo-site-painel-numero"
  );
  const tituloProcesso = timelineProcesso.querySelector(
    ".processo-site-painel-titulo"
  );
  const textoProcesso = timelineProcesso.querySelector(
    ".processo-site-painel-texto"
  );

  if (
    etapasProcesso.length &&
    painelProcesso &&
    numeroProcesso &&
    tituloProcesso &&
    textoProcesso
  ) {
    const intervaloAutoplay = 4000;
    let indiceEtapaAtual = 0;
    let autoplayTimelineId;

    const mudarEtapa = (indiceAtivo) => {
      indiceEtapaAtual = indiceAtivo;

      const totalEtapas = etapasProcesso.length;
      const percentual =
        totalEtapas > 1 ? (indiceAtivo / (totalEtapas - 1)) * 80 : 0;
      const etapaAtual = etapasProcesso[indiceAtivo];

      timelineProcesso.style.setProperty(
        "--processo-progresso",
        `${percentual}%`
      );
      timelineProcesso.style.setProperty("--processo-foguete", `${percentual}%`);

      etapasProcesso.forEach((etapa, indice) => {
        const estaAtiva = indice === indiceAtivo;
        const concluida = indice < indiceAtivo;

        etapa.classList.toggle("is-active", estaAtiva);
        etapa.classList.toggle("is-concluida", concluida);
        etapa.setAttribute("aria-selected", String(estaAtiva));
        etapa.setAttribute("tabindex", estaAtiva ? "0" : "-1");
      });

      if (!etapaAtual) {
        return;
      }

      painelProcesso.classList.add("is-trocando");
      painelProcesso.setAttribute("aria-labelledby", etapaAtual.id);

      window.setTimeout(() => {
        numeroProcesso.textContent = etapaAtual.dataset.numero || "";
        tituloProcesso.textContent = etapaAtual.dataset.titulo || "";
        textoProcesso.textContent = etapaAtual.dataset.texto || "";
        painelProcesso.classList.remove("is-trocando");
      }, 120);
    };

    const proximaEtapa = () => {
      const proximoIndice =
        indiceEtapaAtual === etapasProcesso.length - 1
          ? 0
          : indiceEtapaAtual + 1;

      mudarEtapa(proximoIndice);
    };

    const reiniciarAutoplayTimeline = () => {
      window.clearInterval(autoplayTimelineId);
      autoplayTimelineId = window.setInterval(proximaEtapa, intervaloAutoplay);
    };

    etapasProcesso.forEach((etapa, indice) => {
      etapa.addEventListener("click", () => {
        mudarEtapa(indice);
        reiniciarAutoplayTimeline();
      });

      etapa.addEventListener("keydown", (evento) => {
        let proximoIndice = indice;

        if (evento.key === "ArrowRight" || evento.key === "ArrowDown") {
          proximoIndice = indice === etapasProcesso.length - 1 ? 0 : indice + 1;
        }

        if (evento.key === "ArrowLeft" || evento.key === "ArrowUp") {
          proximoIndice = indice === 0 ? etapasProcesso.length - 1 : indice - 1;
        }

        if (proximoIndice !== indice) {
          evento.preventDefault();
          etapasProcesso[proximoIndice].focus();
          mudarEtapa(proximoIndice);
          reiniciarAutoplayTimeline();
        }
      });
    });

    mudarEtapa(0);
    reiniciarAutoplayTimeline();
  }
}

const faqContainer = document.querySelector(".accordion-container");

if (faqContainer && typeof window.Accordion === "function") {
  new Accordion(".accordion-container");
}

const carrossel = document.querySelector(".carrossel");

if (carrossel && window.jQuery && window.jQuery.fn && window.jQuery.fn.slick) {
  const $carrossel = window.jQuery(carrossel);

  if (!$carrossel.hasClass("slick-initialized")) {
    $carrossel.slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      centerMode: true,
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
    });
  }
}


const depoimento = document.querySelector(".depoimento");

if (depoimento && window.jQuery && window.jQuery.fn && window.jQuery.fn.slick) {
  const $depoimento = window.jQuery(depoimento);

  if (!$depoimento.hasClass("slick-initialized")) {
    $depoimento.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4500,
      pauseOnHover: true,
      responsive: [
        { breakpoint: 980, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 1 } }
      ]
    });
  }
}

(function () {
  // Cores: edite aqui
  var GREEN = '#35F28B', AMBER = '#FFB347';
  var TICK = '53,242,139'; // verde em RGB, usado nas marcas do "dial"

  var LAYERS = [
    { amp: .30, cycles: 1.5, speed:  1.1, width: 3,   color: GREEN, alpha: 1,   glow: 16, phase: 0 },
    { amp: .22, cycles: 2.3, speed: -.8,  width: 2,   color: GREEN, alpha: .5,  glow: 8,  phase: 1.7 },
    { amp: .14, cycles: 3.6, speed: 1.6,  width: 1.5, color: AMBER, alpha: .75, glow: 8,  phase: 3.1 },
    { amp: .10, cycles: 5.2, speed: -1.2, width: 1,   color: GREEN, alpha: .3,  glow: 0,  phase: 4.4 }
  ];

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init(root) {
    var canvas = root.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var w = 0, h = 0, raf = 0, t0 = performance.now();

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!raf) draw(2); // redesenha um quadro parado
    }

    function yAt(L, nx, t) {
      var edge = Math.pow(Math.sin(Math.PI * nx), .6);
      var breathe = .6 + .4 * Math.sin(t * .55 + L.phase);
      var wobble = .75 + .25 * Math.sin(nx * 6 + t * .7 + L.phase);
      return h / 2 + Math.sin(nx * L.cycles * Math.PI * 2 + t * L.speed * 2 + L.phase)
             * h * L.amp * edge * breathe * wobble;
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);

      // linha central
      ctx.strokeStyle = 'rgba(' + TICK + ',.12)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, h / 2 + .5); ctx.lineTo(w, h / 2 + .5); ctx.stroke();

      // marcas de dial de rádio
      for (var x = 0; x <= w; x += 16) {
        var major = Math.round(x / 16) % 5 === 0;
        ctx.strokeStyle = 'rgba(' + TICK + ',' + (major ? .35 : .15) + ')';
        ctx.beginPath(); ctx.moveTo(x + .5, h); ctx.lineTo(x + .5, h - (major ? 14 : 7)); ctx.stroke();
      }

      // ondas
      LAYERS.forEach(function (L) {
        ctx.save();
        ctx.globalAlpha = L.alpha;
        ctx.strokeStyle = L.color;
        ctx.lineWidth = L.width;
        ctx.lineCap = ctx.lineJoin = 'round';
        ctx.shadowColor = L.color;
        ctx.shadowBlur = L.glow;
        ctx.beginPath();
        for (var px = 0; px <= w; px += 3) {
          var y = yAt(L, px / w, t);
          if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
        }
        ctx.stroke();
        ctx.restore();
      });

      // ponto âmbar percorrendo a onda principal (como no logo)
      var dx = ((t * .07) % 1) * w;
      ctx.save();
      ctx.fillStyle = AMBER; ctx.shadowColor = AMBER; ctx.shadowBlur = 14;
      ctx.beginPath(); ctx.arc(dx, yAt(LAYERS[0], dx / w, t), 4, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    function frame(now) { draw((now - t0) / 1000); raf = requestAnimationFrame(frame); }
    function play()  { if (!raf && !reduce) raf = requestAnimationFrame(frame); }
    function pause() { cancelAnimationFrame(raf); raf = 0; }

    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(root);
    else window.addEventListener('resize', resize);
    resize();

    // só anima quando estiver visível na tela (economiza bateria)
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { e[0].isIntersecting ? play() : pause(); }).observe(root);
    } else { play(); }
  }

  document.querySelectorAll('.sintonia-wave').forEach(init);
})();

(function () {
  var root = document.querySelector('.faq-frequencia');
  if (!root) return;

  var canvas = root.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  var css = getComputedStyle(document.documentElement);
  var PRIMARY = css.getPropertyValue('--cor-primaria').trim() || '#C8F560';
  var ACCENT = css.getPropertyValue('--cor-secundaria').trim() || '#FF7A59';

  var RINGS = 5;       // quantidade de ondas ao mesmo tempo
  var PERIOD = 8;      // segundos para uma onda atravessar a seção
  var BAR_STEP = 14;   // espaço entre as barras (px)

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var w = 0, h = 0, raf = 0, t0 = performance.now();

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!raf) draw(3); // quadro parado enquanto não está animando
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);

    // ponto de transmissão, na lateral esquerda
    var cx = w * 0.06, cy = h * 0.5;
    var maxR = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy));

    // ondas circulares
    ctx.strokeStyle = PRIMARY;
    ctx.lineWidth = 1.5;
    for (var i = 0; i < RINGS; i++) {
      var p = ((t / PERIOD) + i / RINGS) % 1;
      ctx.globalAlpha = Math.pow(1 - p, 1.4) * 0.35;
      ctx.beginPath();
      ctx.arc(cx, cy, p * maxR, 0, Math.PI * 2);
      ctx.stroke();
    }

    // barras de equalizador na base
    var n = Math.ceil(w / BAR_STEP);
    var maxBar = Math.min(90, h * 0.18);
    ctx.fillStyle = PRIMARY;
    ctx.globalAlpha = 0.22;
    for (var b = 0; b < n; b++) {
      var v = (Math.sin(b * 0.35 + t * 1.8) +
               Math.sin(b * 0.13 - t * 1.1) +
               Math.sin(b * 0.71 + t * 2.6)) / 3;
      var bh = (v * 0.5 + 0.5) * maxBar + 4;
      ctx.fillRect(b * BAR_STEP, h - bh, 6, bh);
    }

    // ponto pulsante no centro da transmissão
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = ACCENT;
    ctx.shadowColor = ACCENT;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(cx, cy, 5 + 1.5 * Math.sin(t * 3), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function frame(now) { draw((now - t0) / 1000); raf = requestAnimationFrame(frame); }
  function play()  { if (!raf && !reduce) raf = requestAnimationFrame(frame); }
  function pause() { cancelAnimationFrame(raf); raf = 0; }

  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(root);
  else window.addEventListener('resize', resize);
  resize();

  // só anima quando a seção está visível (economiza bateria)
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { e[0].isIntersecting ? play() : pause(); }).observe(root);
  } else { play(); }
})();


