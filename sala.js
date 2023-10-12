const firebaseConfig = {
    apiKey: "AIzaSyBk1yczFkUSjbbSaavPzJPuKRhsprb1SNk",
    authDomain: "kwiter-860b2.firebaseapp.com",
    databaseURL: "https://kwiter-860b2-default-rtdb.firebaseio.com",
    projectId: "kwiter-860b2",
    storageBucket: "kwiter-860b2.appspot.com",
    messagingSenderId: "430156579837",
    appId: "1:430156579837:web:252bc8705b9cd5d8934f94"
};

firebase.initializeApp(firebaseConfig);

inicializar();

function inicializar() {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    // console.log(nomeUsuario);
    document.getElementById("nomeUsuario").textContent = "Olá, " + nomeUsuario + "!";

    getData();
}

function addSala() {
    const nomeSala = document.getElementById("nomeSala").value;
    console.log(nomeSala);
    if (nomeSala) {
        firebase.database().ref('/').child(nomeSala).set({
            purpose: "sala criada"
        });

        carregaSala(nomeSala);
    }
}

function getData() {
    firebase.database().ref('/').on("value", snapshot => {
        let salas = [];
        snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            const html = '<div class="nomeSala" id="'
                + childKey
                + '" onclick="carregaSala(this.id)">#'
                + childKey
                + '</div>'
            salas.push(html);
        });
        document.getElementById("output").innerHTML = salas.join("");
        // const output = document.getElementById("output");
        // output.innerHTML = salas.join("");
    });
}

function carregaSala(sala) {
    localStorage.setItem("nomeSala", sala);
    location = "chat.html";
}