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

const createBoldButton = () => {
  const button = document.createElement('div');
  button.className = 'btn btn-sm';
  button.textContent = 'B';
  button.onclick = boldText;
  return button;
};

const insertText = text => {
  const transfer = new DataTransfer();
  transfer.setData('text/plain', text);
  code().dispatchEvent(new ClipboardEvent('paste', {
    clipboardData: transfer
  }));
};

const flattenNodes = lines => {
  const nodes = [];
  lines.forEach(e => {
    if (e.childNodes.length) {
      nodes.push(...flattenNodes(e.childNodes));
    }
    else {
      nodes.push(e);
    }
  });
  return nodes;
};

const boldText = () => {
  const cursor = () => editor.querySelector('.CodeMirror-cursors');
  const line = () => getLine(cursor());
  let offset = getCaretCharOffset(line()) + 2;
  insertText('** **');

  for (const node of flattenNodes(line().childNodes)) {
    if (node.length <= offset) {
      offset -= node.length;
      continue;
    }
    const range = document.createRange()
    range.setStart(node, offset)
    range.setEnd(node, offset + 1)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    return;
  }
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
