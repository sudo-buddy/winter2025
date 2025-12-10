/**
 * Sidekick plugin runtime handler
 * Listens for custom events from the Sidekick and loads plugin modules
 */

let expMod = null;

async function toggleExperimentation() {
  const exists = document.querySelector('#aemExperimentation');
  if (!exists) {
    // Import the experimentation module
    expMod = await import('../tools/sidekick/aem-experimentation.js');
    return;
  }
  // Toggle visibility if already loaded
  exists.classList.toggle('aemExperimentationHidden');
}

/**
 * Check if we're in a dev/preview environment
 */
function isDevOrPreview() {
  const { hostname } = window.location;
  return hostname === 'localhost' || hostname.endsWith('.page');
}

/**
 * Adds a floating Experimentation button to the page
 */
function addExperimentationButton() {
  if (!isDevOrPreview()) return;
  if (document.getElementById('exp-floating-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'exp-floating-btn';
  btn.textContent = '🧪 Exp';
  btn.title = 'Open Experimentation Panel';
  btn.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    z-index: 99999;
    padding: 10px 16px;
    background: #1473e6;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: transform 0.2s, box-shadow 0.2s;
  `;
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
    btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  });
  btn.addEventListener('click', () => {
    console.log('[Sidekick] Experimentation button clicked');
    toggleExperimentation();
  });
  document.body.appendChild(btn);
  console.log('[Sidekick] Floating experimentation button added');
}

export default function initSidekick() {
  const sk = document.querySelector('aem-sidekick, helix-sidekick');
  
  if (sk) {
    // Listen for experimentation plugin event from sidekick
    sk.addEventListener('custom:aem-experimentation-sidekick', () => {
      console.log('[Sidekick] Experimentation plugin triggered');
      toggleExperimentation();
    });
    console.log('[Sidekick] Event listeners registered');
  }

  // Always add the floating button as a backup
  addExperimentationButton();
}

