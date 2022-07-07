function breadcrumb(file_name) {
  var arr = file_name.split("/");
  let val;
  var crumbs = [];
  arr.forEach(function (elem) {
    if (val === undefined) {
      val = elem;
      crumbs.push(val);
    } else {
      val = val + "/" + elem;
      crumbs.push(val);
    }
  });
  return crumbs;
}
