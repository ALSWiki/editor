#ifndef EDITOR_G
#define EDITOR_G

#include "./utils.js"

const newFile = URL.includes('/wiki/new/');
const editingFile = URL.includes('/wiki/edit/');
const isOnEditor = newFile || editingFile;

const createArticleNamingHelper = () => {
  const helpInfo = document.createElement('span');
  helpInfo.textContent =
    ' and name your file as language/Article_Name.md, eg. en/Article_About_ALS.md';
  helpInfo.style.marginLeft = '0.25rem';
  document.querySelector('.js-branch-name-label-container').appendChild(helpInfo);
};

const runEditor = () => {
  if (newFile) {
    console.log('new');
    createArticleNamingHelper();
  }
};

#endif
