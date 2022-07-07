function tree(pathes){
   const branches = pathes.reduce((r, path) => {
        path.split('/').reduce((nodes, text) => {
            let child = nodes.find(n => n.text === text);
            if (!child) nodes.push(child = { text, nodes: [] });
            return child.nodes;
        }, r);
        return r;
    }, []);
 var ul = document.createElement("ul");

  for (var i = 0, n = branches.length; i < n; i++) {
    var branch = branches[i];
    var li = document.createElement("li");

    var text = document.createTextNode(branch.name);
    li.appendChild(text);

    if (branch.branches) {
      li.appendChild(to_ul(branch.branches));
    }

    ul.appendChild(li);
  }
document.getElementById("tree").appendChild(ul);
  console.log(branches)
    }

