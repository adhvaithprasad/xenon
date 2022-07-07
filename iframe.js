function createUrl(html) {
  var blob = new Blob([html], { type: "text/html" });
  return URL.createObjectURL(blob);
}

function removeUrl(url) {
  URL.revokeObjectURL(url);
}

function getEditorCode() {
  return window.editor.getValue();
}

function buttonclick68() {
  var x = document.getElementById("html-container");
  var y = document.getElementById("html-converter");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.innerHTML = "edit";
    var code = getEditorCode();
    removeUrl(url);
    url = createUrl(code);
    x.src = url;
  } else {
    x.style.display = "none";
    y.innerHTML = "visibility";
  }
}
