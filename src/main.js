/**
 * ALSWiki Editor
 */

const isOnURL = url => () => window.location.href === url;
const isOnMainWiki = isOnURL('https://github.com/ALSWiki/wiki');
const isForkedTag = e => e.textContent.includes(`You've already forked wiki`);
const hasAlreadyForked = () => [...document.querySelectorAll('h3')].some(isForkedTag);

const forkAndGotoFork = () => {
  document.querySelector('.pagehead-actions li:nth-child(3) summary').click()
  const interval = setInterval(() => {
    if (hasAlreadyForked()) {
      document.querySelector('.button_to button').click();
      return clearInterval(interval);
    }
  }, 50);
}

window.addEventListener('load', () => {
  if (isOnMainWiki())
    return forkAndGotoFork();
});

