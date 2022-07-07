function runInput() {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": "6484043fd0mshec484bf71a9f73ap1534a8jsn357afe17b801"
    },
    body: JSON.stringify({
      source_code: btoa(getEditorCode()),
      language_id: 46,
      stdin: btoa(prompt("Input for execution"))
    })
  };

  console.log(
    JSON.stringify({
      source_code: btoa(getEditorCode()),
      language_id: getCookie("lang_id")
    })
  );

  fetch(
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true&fields=*",
    options
  )
    .then((response) => response.json())
    .then((response) => res(response))
    .catch((err) => console.error(err));
}

// function run() {
//   const options = {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       "Content-Type": "application/json",
//       "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//       "X-RapidAPI-Key": "6484043fd0mshec484bf71a9f73ap1534a8jsn357afe17b801"
//     },
//     body: JSON.stringify({
//       source_code: btoa(getEditorCode()),
//       language_id: 71
//     })
//   };

//   console.log(
//     JSON.stringify({
//       source_code: btoa(getEditorCode()),
//       language_id: 71
//     })
//   );

//   fetch(
//     "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true&fields=*",
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => res(response))
//     .catch((err) => console.error(err));
// }
