//VARIABLES
let serviceItem = [];
let inputService;
let pService;
let totalPrice = "";
let id;
let firstName = "";
let lastName = "";

//get services information
const getServices = fetch("https://private-42e99d-yuca1.apiary-mock.com/services", {
    method: 'GET',
    })
    .then(function(response) {
        response.json().then(function(data) {
            listServiceItem(data);
        });
    }).catch(function(err) {
    console.error('Erro para retornar API de serviços', err);
});

//get user services information
const getUserServices = fetch("https://private-42e99d-yuca1.apiary-mock.com/me", {
    method: 'GET',
    })
    .then(function(response) {
        response.json().then(function(data) {
            id = data.user.id;
            firstName = data.user.firstName;
            lastName = data.user.lastName;

            listServiceUserItem(data.services);
            listVariables()
        });
    }).catch(function(err) {
    console.error('Erro para retornar API de serviços do usuário', err);
});

//setting user information to a HTML elements
listVariables = function(){
    //ARRAYS & VARIABLES
    const shortName = firstName[0] + lastName[0];

    var labelShortName = document.querySelector("[data-short-name]");
    labelShortName.innerHTML = shortName;

    var labelfirstName = document.querySelectorAll("[data-first-name]");
    labelfirstName.forEach(function(nome,i) {
        labelfirstName[i].innerHTML = firstName;
    });
};

//setting and creating service information to a HTML elements
listServiceItem = function(array){
    array.forEach(function(data, i){
        let formatedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(array[i].price);
        let boxServices = document.querySelector(".box-services");
        let sectionInput = document.createElement("div");
        let sectionLabel = document.createElement("label");
        let serviceInput = document.createElement("input");
        let serviceName = document.createElement("span");
        let servicePrice = document.createElement("p");
        serviceItem = [array[i].id, array[i].name, formatedPrice];
    
        serviceInput.type = "checkbox";
        serviceInput.id = array[i].id;
        serviceInput.setAttribute("class", "input-service");
        serviceName.textContent = array[i].name;
        servicePrice.textContent = formatedPrice;
        servicePrice.setAttribute("class", "price-service");
        
        boxServices.appendChild(sectionInput);
        sectionInput.appendChild(sectionLabel);
        sectionInput.setAttribute("class", "service-item");
        sectionInput.setAttribute("onchange","calculateTotalPrice()");
        sectionInput.appendChild(servicePrice);
        sectionLabel.appendChild(serviceInput);
        sectionLabel.appendChild(serviceName);
    })
}
//updating services with saved user services
listServiceUserItem = function(array){
    let sectionInput = document.querySelectorAll(".input-service");
     array.forEach(function(data, i){
       sectionInput.forEach(function(dataInput, j){
           if (array[i].id == sectionInput[j].id){
            sectionInput[j].checked = true;
           }
       });
    }); 
    calculateTotalPrice();
}

//method to show and manipulate price information
calculateTotalPrice = function(){
    let sectionInput = document.querySelectorAll(".input-service");
    let price = document.querySelectorAll(".price-service");
    let labelTotalPrice = document.querySelector("[data-total-price]");
    let tempPrice = "";
    let totalPrice = 0;
    sectionInput.forEach(function(dataInput, j){
        if (sectionInput[j].checked){
            tempPrice = (price[j].textContent).replace("R$", "");
            price[j].setAttribute("class", "price-service active")
            totalPrice = totalPrice + parseInt(tempPrice);
        }
        else{
            price[j].setAttribute("class", "price-service")
        }
    });
    labelTotalPrice.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice);
}

//sending user services information
//obs: o mock retornou 201, mas não atualizou a informação na API
function updateUserServices() {
    let services = [];
    let sectionInput = document.querySelectorAll(".input-service");
    sectionInput.forEach(function(dataInput, j){
        if (sectionInput[j].checked){
            services.push(sectionInput[j].id);
        }
    });

    var userServices = new Object();
    userServices.userId = id;
    userServices.services = services;
   
    let jsonData =  JSON.stringify(userServices);

    return fetch('https://private-42e99d-yuca1.apiary-mock.com/services', {
        method: 'PUT',
        body: jsonData
    }).then(function(response) {
        window.location.href = "confirmation.html";
    }).catch(function(err) {
        console.error('Erro para atualizar dados do usuário', err);
    });
}
