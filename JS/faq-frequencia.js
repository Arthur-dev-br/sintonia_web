/* Animação da seção FAQ: sinal de rádio sendo transmitido
   (ondas circulares saindo de um ponto + barras de equalizador).
   Cores: lê --cor-primaria e --cor-secundaria do CSS do site. */
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
