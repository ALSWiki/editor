#ifndef SELECTION_G
#define SELECTION_G

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

const setCaret = (el, startPos, endPos) => {
  for (const node of flattenNodes(el.childNodes)) {
    if (node.length <= startPos) {
      startPos -= node.length;
      endPos -= node.length;
      continue;
    }
    const range = document.createRange()
    range.setStart(node, startPos)
    range.setEnd(node, endPos)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    return;
  }
};

// https://stackoverflow.com/a/30400227
function getCaretCharOffset(element) {
  if (window.getSelection) {
    const range = window.getSelection().getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  } 

  else if (document.selection && document.selection.type != 'Control') {
    const textRange = document.selection.createRange();
    const preCaretTextRange = document.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint('EndToEnd', textRange);
    return preCaretTextRange.text.length;
  }

  return 0;
}

#endif
