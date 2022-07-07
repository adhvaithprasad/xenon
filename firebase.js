const config = {
  apiKey: "AIzaSyA17yiXJ1BO3yvPd0JIfUgSj4WfRNTGTWw",
  authDomain: "krios-studio.firebaseapp.com",
  databaseURL: "https://krios-studio-default-rtdb.firebaseio.com",
  projectId: "krios-studio",
  storageBucket: "krios-studio.appspot.com",
  messagingSenderId: "106933948741",
  appId: "1:106933948741:web:ee544b08056d72d538ae2c",
  measurementId: "G-7QGMC09M01"
};
firebase.initializeApp(config);
function add_bug(summary, label, author, description) {
  var template = `
  <div class="bug">
  <section><h3>${summary}</h3><p class="${label}"></p></section>
  <p class="bug-author">${author}</p>
  
  <p class="description">${description}</p>
</div>
  `;
  document.getElementById("bug-tree").innerHTML += template;
}
firebase
  .database()
  .ref("Jira/")
  .on("child_added", (snapshot) => {
    const data = snapshot.val();
    if (document.cookie.indexOf("fname=") !== -1) {
      if (data.repository === getCookie("fname")) {
        add_bug(data.summary, data.label, data.creator, data.description);
      }
    }
  });

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      user.providerData.forEach((profile) => {
        document.getElementById("user-img").src = profile.photoURL;
        document.cookie = "user=" + profile.displayName;
        // console.log(profile);
        const user = "firescrypt";
        const provider = "git.krios.studio";
        const dbRef = firebase.database().ref();
        dbRef
          .child("user")
          .child(user)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              Object.keys(snapshot.val()).forEach(function (n) {
                document.getElementById("languages").innerHTML += `
<div class="div" onclick='doCloneAndStuff("${
                  "http://" + provider + "/" + user + "/" + n
                }","${user + "/" + n}","${user}","${n}")'>${n}</div>
`;
              });
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  } else {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
});
