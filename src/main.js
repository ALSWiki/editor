'use strict';

/**
 * ALSWiki Editor
 */

#include "./editor.js"
#include "./utils.js"

const isOnMainWiki = URL === 'https://github.com/ALSWiki/wiki';
const isForkedTag = e => e.textContent.includes(`You've already forked wiki`);
const hasAlreadyForked = () => [...document.querySelectorAll('h3')].some(isForkedTag);
const isOnFork = !isOnMainWiki && !isOnEditor && URL.includes('/wiki');

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
    <button class="btn btn-sm">
      Contribute to Wiki
    </button>
  </div>
  `;
  li.querySelector('button').addEventListener('click', forkAndGotoFork);
  document.querySelector('.pagehead-actions').appendChild(li);
};

const changeButtonText = (button, oldText, newText) => {
  if (button.textContent.includes(oldText)) {
    button.textContent = newText;
  }
};

const changeModifyFileButton = () => {
  changeButtonText(
    document.querySelector('.file-navigation a.btn'),
    'Go to file',
    'Go to article'
  );
};

const changeAddFileButton = () => {
  changeButtonText(
    document.querySelector('.file-navigation summary[role=button] span'),
    'Add file',
    'Add article'
  )
};

window.addEventListener('load', () => {
  if (isOnMainWiki) return insertContributeButton();
  if (isOnFork) return repeatUntilSuccess(() => {
    changeModifyFileButton();
    changeAddFileButton();
  });
  if (isOnEditor) return runEditor();
});

