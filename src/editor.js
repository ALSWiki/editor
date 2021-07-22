#ifndef EDITOR_G
#define EDITOR_G

#include "./selection.js"
#include "./utils.js"

const newFile = URL.includes('/wiki/new/') || URL.includes('/wiki/create/');
const editingFile = URL.includes('/wiki/edit/');
const isOnEditor = newFile || editingFile;
const editor = document.querySelector('.commit-create');
const code = () => editor.querySelector('.CodeMirror-code');

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

const createBetweenTransformButton = (label, eachSide) => () => {
  const button = document.createElement('div');
  button.className = 'btn btn-sm';
  button.textContent = label;
  button.onclick = betweenTransform(eachSide);
  return button;
};

const insertText = text => {
  const transfer = new DataTransfer();
  transfer.setData('text/plain', text);
  code().dispatchEvent(new ClipboardEvent('paste', {
    clipboardData: transfer
  }));
};

/**
 * The type of transform where there is markdown that encloses text.
 *
 * Eg. **text** will have an eachSide of '**'
 *
 * @param {String} eachSide
 * @return {() => void}
 */
const betweenTransform = eachSide => () => {
  const cursor = () => editor.querySelector('.CodeMirror-cursors');
  const line = () => getLine(cursor());
  const offset = getCaretCharOffset(line());
  insertText(`${eachSide} ${eachSide}`);
  setCaret(line(), offset + eachSide.length, offset + eachSide.length + 1);
};

const createBoldButton = createBetweenTransformButton('B', '__');
const createItalicButton = createBetweenTransformButton('I', '_');
const createStrikeThroughButton = createBetweenTransformButton('S', '~~');

const styleMarkdownToolbar = toolbar => {
  toolbar.style = `
    display: flex;
    flex-direction: row wrap;
    gap: 0.5rem;
    padding-left: 2rem;
    padding-top: 0.25rem;
  `;
};

const loadMarkdownHelperToolbar = () => {
  const toolbar = document.createElement('div');
  const buttons = [
    createBoldButton(),
    createItalicButton(),
    createStrikeThroughButton(),
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
