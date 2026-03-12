/**
 * Hero background: interactive neural-network animation.
 * Nodes stay forever (wrapping), larger and more visible, AI/neural look.
 * Full-width #0B0F14, nodes #38BFA3, connections #1E5945.
 */
(function () {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var width, height;
  var centerX, centerY;
  var nodes = [];
  var tempConnections = [];
  var time = 0;

  // Visible neural network: bigger nodes, clearer lines, stays forever
  var NODE_COUNT = 60;
  var CONNECTION_DIST = 180;
  var CONNECTION_LINE_COLOR = { r: 45, g: 110, b: 88 };  // slightly lighter #1E5945
  var BG_COLOR = 'rgb(11, 15, 20)';                    // #0B0F14
  var CENTER_GLOW_RADIUS = 320;
  var TEMP_CONNECTION_CHANCE = 0.003;
  var TEMP_CONNECTION_MAX = 14;
  var PARALLAX_SPEED_MIN = 0.02;
  var PARALLAX_SPEED_MAX = 0.065;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    centerX = width * 0.5;
    centerY = height * 0.5;
    initNodes();
    tempConnections = [];
  }

  function initNodes() {
    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        speed: PARALLAX_SPEED_MIN + Math.random() * (PARALLAX_SPEED_MAX - PARALLAX_SPEED_MIN),
        angle: Math.random() * Math.PI * 2,
        coreRadius: 4.5 + Math.random() * 3,    // bigger: 4.5–7.5px core
        ringRadius: 8 + Math.random() * 5,      // bigger outer ring
        baseAlpha: 0.78 + Math.random() * 0.2,  // a bit lighter
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function addTempConnection(a, b) {
    if (tempConnections.length >= TEMP_CONNECTION_MAX) return;
    tempConnections.push({ a: a, b: b, life: 1 });
  }

  // Wrap position so nodes never leave — stay on screen forever
  function wrap(pos, size) {
    if (pos < 0) return pos + size;
    if (pos >= size) return pos - size;
    return pos;
  }

  function updateNodes(dt) {
    var i, n, dx, dy;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      n.vx *= 0.97;
      n.vy *= 0.97;

      n.angle += 0.0006 + Math.sin(time + n.phase) * 0.0004;
      n.vx += Math.cos(n.angle) * n.speed * dt;
      n.vy += Math.sin(n.angle) * n.speed * dt;

      n.x += n.vx;
      n.y += n.vy;
      n.x = wrap(n.x, width);
      n.y = wrap(n.y, height);
    }

    for (i = tempConnections.length - 1; i >= 0; i--) {
      tempConnections[i].life -= 0.014;
      if (tempConnections[i].life <= 0) tempConnections.splice(i, 1);
    }

    if (Math.random() < TEMP_CONNECTION_CHANCE) {
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          dx = nodes[b].x - nodes[a].x;
          dy = nodes[b].y - nodes[a].y;
          if (dx * dx + dy * dy < CONNECTION_DIST * CONNECTION_DIST) {
            addTempConnection(a, b);
            break;
          }
        }
      }
    }
  }

  function getNodeBrightness(n) {
    var distToCenter = Math.hypot(n.x - centerX, n.y - centerY);
    var centerBoost = Math.max(0, 1 - distToCenter / CENTER_GLOW_RADIUS);
    var centerMultiplier = 1 + centerBoost * 0.5;
    return Math.min(1, n.baseAlpha * centerMultiplier);
  }

  function draw() {
    if (!ctx || !width || !height) return;
    time += 0.016;
    updateNodes(1);

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, width, height);

    var i, j, n, na, nb, dx, dy, d, alpha, brightness;

    // 1) Neural connections — thick, visible lines
    ctx.lineWidth = 1.4;
    for (i = 0; i < nodes.length; i++) {
      for (j = i + 1; j < nodes.length; j++) {
        dx = nodes[j].x - nodes[i].x;
        dy = nodes[j].y - nodes[i].y;
        d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECTION_DIST) {
          alpha = (1 - d / CONNECTION_DIST) * 0.68;
          ctx.strokeStyle = 'rgba(' + CONNECTION_LINE_COLOR.r + ',' + CONNECTION_LINE_COLOR.g + ',' + CONNECTION_LINE_COLOR.b + ',' + alpha + ')';
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // 2) Temporary data-flow connections
    for (i = 0; i < tempConnections.length; i++) {
      var tc = tempConnections[i];
      na = nodes[tc.a];
      nb = nodes[tc.b];
      alpha = tc.life * 0.65;
      ctx.strokeStyle = 'rgba(72, 205, 178, ' + alpha + ')';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.stroke();
    }

    // 3) Neural nodes: glow + ring + core (AI/neuron look, larger, stay visible)
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      brightness = getNodeBrightness(n);

      // Outer glow (soft halo) — slightly lighter
      var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.ringRadius * 2.5);
      g.addColorStop(0, 'rgba(72, 205, 178, ' + (brightness * 0.48) + ')');
      g.addColorStop(0.4, 'rgba(72, 205, 178, ' + (brightness * 0.18) + ')');
      g.addColorStop(1, 'rgba(72, 205, 178, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.ringRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Thin ring (neural node / synapse look)
      ctx.strokeStyle = 'rgba(72, 205, 178, ' + (brightness * 0.72) + ')';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Bright core (slightly lighter teal)
      ctx.fillStyle = 'rgba(72, 205, 178, ' + brightness + ')';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.coreRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
