function Jira_add_bug(summary, description) {
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body:
      '{"fields":{"project":{"key":"HEL"},"summary":"' +
      summary +
      '","description":"' +
      description +
      '","issuetype":{"name":"Task"}}}'
  };

  fetch(
    "https://cors.isomorphic-git.org/adhvaith.atlassian.net/rest/api/latest/issue/",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
function bugs() {
  var summary = prompt("summary");
  var description = prompt("description");
  var label = prompt("label");
  var repository = getCookie("fname");
  var creator = getCookie("user");
  create_issue(summary, description, label, creator, repository);
}
function open_bug_pane() {
  var x = document.getElementById("bug-tree");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function create_issue(summary, description, label, creator, repository) {
  var m = genRand(8);
  firebase
    .database()
    .ref("Jira/" + m)
    .set({
      summary: summary,
      description: description,
      label: label,
      id: m,
      creator: creator,
      repository: repository,
      date: new Date()
    });
}
