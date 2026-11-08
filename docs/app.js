'use strict';
// No analytics, cookies, file access, uploads, account tokens, or remote scripts.
const platform = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();
const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent) || (platform.includes('mac') && navigator.maxTouchPoints > 1);
const hint = document.getElementById('detected-os');
if (!isMobile && platform.includes('win')) {
  const card = document.querySelector('[data-platform="windows"]');
  card.classList.add('recommended');
  card.querySelector('.recommend').hidden = false;
  hint.textContent = 'Windows 감지 · x64용 설치 파일을 선택하세요.';
} else if (!isMobile && platform.includes('mac')) {
  // macOS browsers can report MacIntel even on Apple Silicon. Never infer chip from this.
  hint.textContent = 'Mac 감지 ·  이 Mac에 관하여에서 M시리즈 / Intel을 확인하세요.';
} else if (isMobile) {
  hint.textContent = '컴퓨터에서 이 페이지를 열면 설치할 수 있어요.';
}

const demo = document.getElementById('demo');
const paw = document.getElementById('demo-paw');
const play = document.getElementById('play-demo');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const demoNote = document.getElementById('demo-note');
const demoFileName = document.getElementById('demo-filename');
const demoFileType = document.getElementById('demo-filetype');
const demoFileSubtitle = document.getElementById('demo-filesubtitle');
let playing = false;
let animationTimer;
function playDemo() {
  if (playing) return;
  if (reducedMotion.matches) {
    demoNote.textContent = '파일을 잡고 위로 가져가요. 동작 줄이기 설정을 존중합니다.';
    return;
  }
  playing = true;
  demoNote.textContent = '쏙! 고양이가 파일을 가져가요.';
  play.disabled = true;
  demo.classList.add('playing');
  animationTimer = setTimeout(() => {
    demo.classList.remove('playing');
    play.disabled = false;
    playing = false;
    demoNote.textContent = '다시 한 번 먹여볼까요?';
  }, 2550);
}
play.addEventListener('click', playDemo);
demo.addEventListener('pointermove', event => {
  if (playing || reducedMotion.matches || event.pointerType === 'touch') return;
  const box = demo.getBoundingClientRect();
  const x = Math.max(-35, Math.min(35, (event.clientX - box.left - box.width / 2) * .18));
  paw.style.setProperty('--follow', `${x}px`);
});
demo.addEventListener('pointerleave', () => paw.style.setProperty('--follow', '0px'));
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) return;
  clearTimeout(animationTimer);
  demo.classList.remove('playing');
  play.disabled = false;
  playing = false;
});

// Hash links to a disclosure open it before scrolling; usable without JS as well.
for (const anchor of document.querySelectorAll('a[href^="#"]')) {
  anchor.addEventListener('click', () => {
    const target = document.getElementById(anchor.getAttribute('href').slice(1));
    if (target?.tagName === 'DETAILS') target.open = true;
  });
}

// Interactive playground: use file metadata only; never access, read or upload file contents.
let dragDepth = 0;
function hasDraggedFiles(event) {
  return Array.from(event.dataTransfer?.types || []).includes('Files');
}
demo.addEventListener('dragenter', event => {
  if (!hasDraggedFiles(event)) return;
  event.preventDefault();
  ++dragDepth;
  demo.classList.add('is-dragging');
});
demo.addEventListener('dragover', event => {
  if (!hasDraggedFiles(event)) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
});
demo.addEventListener('dragleave', event => {
  if (!hasDraggedFiles(event)) return;
  dragDepth = Math.max(0, dragDepth - 1);
  if (!dragDepth) demo.classList.remove('is-dragging');
});
demo.addEventListener('drop', event => {
  if (!hasDraggedFiles(event)) return;
  event.preventDefault();
  dragDepth = 0;
  demo.classList.remove('is-dragging');
  if (playing) return;
  const file = event.dataTransfer?.files?.[0];
  if (!file) return;
  const name = file.name.replace(/[\u0000-\u001f]/g, '').slice(0, 80) || '내 파일';
  demoFileName.textContent = name;
  const ext = name.includes('.') ? name.split('.').pop().toUpperCase().slice(0, 4) : 'FILE';
  demoFileType.textContent = ext || 'FILE';
  const count = event.dataTransfer.files.length;
  demoFileSubtitle.textContent = count > 1 ? `외 ${count - 1}개 파일 · 미리보기` : '파일 내용은 읽지 않아요';
  playDemo();
});
window.addEventListener('dragend', () => {
  dragDepth = 0;
  demo.classList.remove('is-dragging');
});
window.addEventListener('drop', event => {
  // Avoid accidental browser navigation when dropped outside the playground.
  if (hasDraggedFiles(event)) event.preventDefault();
});
window.addEventListener('dragover', event => {
  if (hasDraggedFiles(event)) event.preventDefault();
});

// Guided device chooser. Mac chip architecture is intentionally never guessed.
const pickButtons = [...document.querySelectorAll('[data-pick]')];
const cards = [...document.querySelectorAll('.download-card[data-platform]')];
const deviceGuidance = document.getElementById('device-guidance');
const guidanceByPlatform = {
  windows: 'Windows 10/11 x64용 설치 파일을 선택했어요. 아래 Windows 다운로드를 눌러 주세요.',
  arm64: 'Apple M1·M2·M3·M4 이상 칩을 탑재한 Mac용이에요. Apple 미공증 앱 설치 주의사항을 반드시 확인하세요.',
  intel: 'Intel 프로세서가 있는 Mac용이에요. Apple 미공증 앱 설치 주의사항을 반드시 확인하세요.'
};
function choosePlatform(value) {
  pickButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pick === value)));
  cards.forEach(card => card.classList.toggle('is-chosen', card.dataset.platform === value));
  deviceGuidance.textContent = guidanceByPlatform[value] || '';
}
pickButtons.forEach(button => button.addEventListener('click', () => choosePlatform(button.dataset.pick)));
if (!isMobile && platform.includes('win')) choosePlatform('windows');

// Lightweight scroll progress and entrance animations, with reduced-motion support.
const progress = document.getElementById('reading-progress');
let scrollQueued = false;
function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.max(0, Math.min(1, scrollY / max)) : 0})`;
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(updateScrollProgress);
}, {passive:true});
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const sections = document.querySelectorAll('.quick-points, .downloads .section-top, .device-chooser, .how-section .section-top, .steps li, .details-heading, .closing');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, {threshold:0.07});
  sections.forEach(el => {
    el.classList.add('reveal-ready');
    observer.observe(el);
  });
}
