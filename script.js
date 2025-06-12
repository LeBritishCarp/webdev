(function() {
  const tabs = document.querySelectorAll('#tabs button');
  const sections = document.querySelectorAll('.tab');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      sections.forEach(sec => sec.classList.remove('active'));
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // Sprite drawing
  const canvas = document.getElementById('spriteCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    let drawing = false;
    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('mouseup', () => drawing = false);
    canvas.addEventListener('mouseleave', () => drawing = false);
    canvas.addEventListener('mousemove', (e) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = Math.floor((e.clientX - rect.left) * scaleX);
      const y = Math.floor((e.clientY - rect.top) * scaleY);
      ctx.fillStyle = document.getElementById('colorPicker').value;
      ctx.fillRect(x, y, 1, 1);
    });
  }

  // Export code to JS
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const code = document.getElementById('codeArea').value;
      const spriteData = canvas ? canvas.toDataURL() : '';
      const jsContent = `// Sprite data\nconst spriteImage = '${spriteData}';\n\n` + code;
      const blob = new Blob([jsContent], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'webdev_output.js';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
})();
