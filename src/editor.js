#ifndef EDITOR_G
#define EDITOR_G

#include "./selection.js"
#include "./utils.js"

const newFile = URL.includes('/wiki/new/') || URL.includes('/wiki/create/');
const editingFile = URL.includes('/wiki/edit/');
const isOnEditor = newFile || editingFile;
const editor = document.querySelector('.commit-create');
const code = () => editor.querySelector('.CodeMirror-code');

const createArticleNamingHelper = () => {
  const helpInfo = document.createElement('span');
  helpInfo.textContent =
    'and name your file as language/Article_Name.md, eg. en/Article_About_ALS.md';
  helpInfo.style.marginLeft = '0.25rem';
  document.querySelector('.js-branch-name-label-container').appendChild(helpInfo);
};

const createTransformButton = (label, onClick) => () => {
  const button = document.createElement('div');
  button.className = 'btn btn-sm';
  button.textContent = label;
  button.onclick = onClick;
  return button;
};

const createBetweenTransformButton = (label, eachSide) =>
  createTransformButton(label, betweenTransform(eachSide));

const createOneTransformButton = (label, text) =>
  createTransformButton(label, oneTextTransform(text));

const insertText = text => {
  const transfer = new DataTransfer();
  transfer.setData('text/plain', text);
  code().dispatchEvent(new ClipboardEvent('paste', {
    clipboardData: transfer
  }));
};

const getCursorInfo = () => {
  const focussedParent = getCursorFocussedElement().parentElement;
  const offset = getCaretCharOffset(focussedParent);
  const getLines = () => code().querySelectorAll('span[role=presentation]');
  const lineNum = [...getLines()].indexOf(focussedParent);
  const line = () => getLines()[lineNum];
  return { line, offset };
};

/**
 * The type of transform where there is markdown that encloses text.
 *
 * Eg. `**words**` will have an eachSide of '**'
 *
 * @param {String} eachSide
 * @return {() => void}
 */
const betweenTransform = eachSide => () => {
  const { line, offset } = getCursorInfo();
  insertText(`${eachSide} ${eachSide}`);
  setCaret(line(), offset + eachSide.length, offset + eachSide.length + 1);
};

/**
 * The type of transform where there is a one-time text added to enable markdown tag.
 *
 * Eg. `* words` will have a text of '* '
 *
 * @param {String} text
 * @return {() => void}
 */
const oneTextTransform = text => () => {
  const { line, offset } = getCursorInfo();
  insertText(`${text} `);
  setCaret(line(), offset + text.length, offset + text.length + 1);
};

const createBoldButton = createBetweenTransformButton('B', '__');
const createItalicButton = createBetweenTransformButton('I', '_');
const createStrikeThroughButton = createBetweenTransformButton('S', '~~');
const createQuoteButton = createOneTransformButton('“', '> ');
const createBulletButton = createOneTransformButton('•', '* ');
const createOrderedListButton = createOneTransformButton('1.', '1. ');
const createTaskListButton = createOneTransformButton('☑', '- [ ] ');

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
    createQuoteButton(),
    createBulletButton(),
    createOrderedListButton(),
    createTaskListButton(),
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
