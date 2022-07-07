function alert1(m) {
  var x = document.getElementById("info");
  x.innerHTML = m;
  x.style.display = "block";
  setTimeout(function () {
    x.style.display = "none";
  }, 2000);
}
history.pushState(
  "",
  document.title,
  window.location.pathname + window.location.search
);
function getExampleRef() {
  var ref = firebase.database().ref();

  ref = ref.child(getCookie("fname"));

  if (typeof console !== "undefined") {
    console.log("Firebase data: ", ref.toString());
  }
  return ref;
}
var url = null;
function change_lang(response) {
  monaco.editor.setModelLanguage(window.editor.getModel(), response);
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function getEditorCode() {
  return window.editor.getValue();
}

require.config({
  paths: { vs: "https://unpkg.com/monaco-editor@0.8.3/min/vs" }
});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };
let proxy = URL.createObjectURL(
  new Blob(
    [
      `
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@0.8.3/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@0.8.3/min/vs/base/worker/workerMain.js');
`
    ],
    { type: "text/javascript" }
  )
);

require(["vs/editor/editor.main"], function () {
  window.editor = monaco.editor.create(document.getElementById("editor"), {
    language: "plaintext",
    theme: "vs-dark",
    wordWrap: true,
    automaticLayout: true,
    scrollBeyondLastLine: false
  });
});

function add() {
  var x = document.querySelector(".lang-inner");
  x.style.display = "block";
}
function open_commit_pane() {
  var x = document.getElementById("commithash");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function files() {
  var x = document.getElementById("tree");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function settings() {
  var x = document.getElementById("settings");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function change_value(val) {
  window.editor.getModel().setValue(val);
}
function minify() {
  window.editor.getAction("editor.action.formatDocument").run();
}
function find() {
  window.editor?.focus();
  const action = window.editor?.getAction("actions.find");
  void action?.run();
}

function help() {
  alert1(`Xenon is a Cloud based (C9) editor for developing HTML applications. Xenon strictly adheres to google's material design guidelines. Xenon has a very powerful UI making it easy to develop applications for beginners as well as powerful features for experienced developers.Xenon is a client side editor ie: Xenon does not collect any user data.

 Keyboard shortcuts ⌨️


Tip : Click on the editor once before using the Shortcuts in case of errors

Settings pallette : Ctrl + ,
Find and replace : Ctrl + F
To lowercase : Ctrl + Shift + U
Undo : Ctrl + Z
Redo : Ctrl + Shift + Z
Go to line : Ctrl + L
Comment : Ctrl + /
`);
}
