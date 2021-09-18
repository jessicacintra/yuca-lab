//VARIABLES
let firstName = "";
let lastName = "";
let email = "";
let apartmentName = "";
let apartmentNumber = "";
let apartmentRoom = "";
let apartmentPrice = "";
let subwayStation = "";
let subwayDistance = "";

//get user and apartment information
const mockUser = fetch("https://private-42e99d-yuca1.apiary-mock.com/me", {
    method: 'GET',
    })
    .then(function(response) {
        response.json().then(function(data) {

            firstName = data.user.firstName,
            lastName = data.user.lastName,
            email = data.user.email,
            apartmentName = data.apartment.name,
            apartmentNumber = data.apartment.number,
            apartmentRoom = data.apartment.room,
            apartmentPrice = data.apartment.price,
            subwayStation = data.apartment.subwayStation.name,
            subwayDistance = data.apartment.subwayStation.distance

            listVariables(data);
        });
    }).catch(function(err) {
    console.error('Erro para retornar API de usuário', err);
});

listVariables = function(data){
    //ARRAYS & VARIABLES
    const shortName = firstName[0] + lastName[0];
    const formatedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(apartmentPrice);
    const dataHTMLArray = ["short-name", "room-name", "room-number", "room", "room-price", "subway-name", "subway-distance"];
    const variablesArray = [shortName, apartmentName, apartmentNumber, apartmentRoom, formatedPrice, subwayStation, subwayDistance];
    
    //setting data atribute to an element
    dataHTMLArray.forEach(function(array,i){
        setDataElement("[data-" + dataHTMLArray[i] + "]", variablesArray[i]);
    });

    //treating the first name variable as an exception
    var labelfirstName = document.querySelectorAll("[data-first-name]");
    labelfirstName.forEach(function(nome,i) {
        labelfirstName[i].innerHTML = firstName;
    });
};

//method to find and set an atribute to an element
setDataElement = function(data,element){
    document.querySelector(data).textContent = element;
}

//method to changing services
function goToServices() {
    let serviceButton = document.querySelector("#new-service");
    serviceButton.addEventListener('click', ()=>{
        window.location.href = "services.html";
    });
}

window.onload = function(){ 
    goToServices();
}