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
let playing = false;
let animationTimer;
play.addEventListener('click', () => {
  if (playing) return;
  if (reducedMotion.matches) {
    document.getElementById('demo-note').textContent = '파일을 잡고 위로 가져가요. 동작 줄이기 설정을 존중합니다.';
    return;
  }
  playing = true;
  play.disabled = true;
  demo.classList.add('playing');
  animationTimer = setTimeout(() => {
    demo.classList.remove('playing');
    play.disabled = false;
    playing = false;
  }, 2550);
});
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
