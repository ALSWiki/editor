'use strict';

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

const insertContributeButton = () => {
  const li = document.createElement('li');
  li.innerHTML = `
  <div>
    <button class='btn btn-sm'>
      Contribute to Wiki
    </button>
  </div>
  `;
  li.querySelector('button').addEventListener('click', forkAndGotoFork);
  document.querySelector('.pagehead-actions').appendChild(li);
};

window.addEventListener('load', () => {
  if (isOnMainWiki())
    return insertContributeButton();
});

