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

export default function initSidekick() {
  const sk = document.querySelector('aem-sidekick, helix-sidekick');
  if (!sk) {
    console.log('[Sidekick] No sidekick element found');
    return;
  }

  // Listen for experimentation plugin event
  sk.addEventListener('custom:aem-experimentation-sidekick', () => {
    console.log('[Sidekick] Experimentation plugin triggered');
    toggleExperimentation();
  });

  console.log('[Sidekick] Event listeners registered');
}

