//VARIABLES
let firstName = "";
let lastName = "";

//get user and apartment information
const mockUser = fetch("https://private-42e99d-yuca1.apiary-mock.com/me", {
    method: 'GET',
    })
    .then(function(response) {
        response.json().then(function(data) {
            firstName = data.user.firstName
            lastName = data.user.lastName;

            listVariables(data);
        });
    }).catch(function(err) {
    console.error('Erro para retornar API de usuário', err);
});

//setting user information to a HTML elements
listVariables = function(data){
    //ARRAYS & VARIABLES
    const shortName = firstName[0] + lastName[0];

    var labelShortName = document.querySelector("[data-short-name]");
    labelShortName.innerHTML = shortName;

    var labelfirstName = document.querySelectorAll("[data-first-name]");
    labelfirstName.forEach(function(nome,i) {
        labelfirstName[i].innerHTML = firstName;
    });
};