function packages() {
  var x = document.getElementById("package-container");

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function find_package() {
  var packagef = document.getElementById("package-search").value;
  const options = {
    method: "GET",
    headers: {
      Authorization: "Basic YWRodmFpdGg6cHJhaGxhZGh2YWl0aDEyMzQ=",
      "content-type": "application/x-www-form-urlencoded"
    }
  };

  fetch(
    "https://package-manager-xenon.herokuapp.com/-/v1/search?text=" + packagef,
    options
  )
    .then((response) => response.json())
    .then((response) => package(response.objects))
    .catch((err) => alert1("Failed to Search " + err));
}
function package(m) {
  var container = document.getElementById("packages");
  container.innerHTML = ``;
  m.forEach(function (package) {
    console.log(package.score);
    container.innerHTML += `
  <div class="package hi">
  <div class="package-inner">
  <h4  onclick="get_package_info('${package.package.name}')">
  ${package.package.name}
</h4>
<p>${package.package.description}</p>
<div class="package-tags" id="package-tags-${package.package.name}">

</div>
<div class="package-author">
 <p>${package.package.author.name}    version :${package.package.version} </p>
</div>
  </div>
  <div class="package-metric">

  <div class="metric">
      <p>p</p>
      <div class="line" style="
      width:${package.score.detail.popularity * 100}%;
  background:#6fc3df;
" id="popularity"></div>
  </div>
<div class="metric">
      <p>q</p>
      <div class="line" id="quality" style="
  background:#6200ee;
  width:${package.score.detail.quality * 100}%;
"></div>
  </div>
  <div class="metric">
      <p>m</p>
      <div class="line" style="
      width:${package.score.detail.maintenance * 100}%;
  background:#ffa3b3;
" id="maintenance"></div>
  </div></div>


   </div>`;
    var m = document.getElementById("package-tags-" + package.package.name);
    if (package.package.keywords.length < 5) {
      package.package.keywords.forEach(function (key) {
        m.innerHTML += `<div>${key}</div> `;
      });
    } else {
      console.log(package.package.keywords.slice(0, 5));
      package.package.keywords.slice(0, 5).forEach(function (n) {
        m.innerHTML += `
        <div>${n}</div>
        `;
      });
    }
  });
}
function get_package_info(name) {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Basic YWRodmFpdGg6cHJhaGxhZGh2YWl0aDEyMzQ=",
      "content-type": "application/x-www-form-urlencoded"
    }
  };

  fetch("https://package-manager-xenon.herokuapp.com/" + name, options)
    .then((response) => response.json())
    .then((response) => m(response.readme))
    .catch((err) => console.error(err));
}
function m(nr) {
  console.log(nr);
  var x = document.getElementById("package-readme-container");
  var y = document.getElementById("markdown-converter");
  x.style.display = "block";
  document.getElementById("package-readme").innerHTML = marked.parse(nr);
}
function close_package_readme() {
  var x = document.getElementById("package-readme-container");
  x.style.display = "none";
}
