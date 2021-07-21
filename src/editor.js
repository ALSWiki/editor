#ifndef EDITOR_G
#define EDITOR_G

#include "./selection.js"
#include "./utils.js"

const newFile = URL.includes('/wiki/new/') || URL.includes('/wiki/create/');
const editingFile = URL.includes('/wiki/edit/');
const isOnEditor = newFile || editingFile;
const editor = document.querySelector('.commit-create');

const getLine = cursor => {
  return cursor.parentElement.querySelector('span[role=presentation]');
};

const createArticleNamingHelper = () => {
  const helpInfo = document.createElement('span');
  helpInfo.textContent =
    'and name your file as language/Article_Name.md, eg. en/Article_About_ALS.md';
  helpInfo.style.marginLeft = '0.25rem';
  document.querySelector('.js-branch-name-label-container').appendChild(helpInfo);
};

const createBoldButton = () => {
  const button = document.createElement('div');
  button.className = 'btn btn-sm';
  button.textContent = 'B';
  button.onclick = boldText;
  return button;
};

const boldText = () => {
  const cursor = editor.querySelector('.CodeMirror-cursors');
  const line = getLine(cursor);
  const offset = getCaretCharOffset(line);
};

const styleMarkdownToolbar = toolbar => {
  toolbar.style = `
    display: flex;
    flex-direction: row wrap;
    gap: 1rem;
    padding-left: 2rem;
  `;
};

const loadMarkdownHelperToolbar = () => {
  const toolbar = document.createElement('div');
  const buttons = [
    createBoldButton(),
  ];
  buttons.forEach(button => toolbar.appendChild(button));
  styleMarkdownToolbar(toolbar);
  editor.prepend(toolbar);
};

const runEditor = () => {
  if (newFile) {
    createArticleNamingHelper();
  }
  loadMarkdownHelperToolbar();
};

#endif
