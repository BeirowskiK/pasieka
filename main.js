const productsBox = document.querySelector('#products-fields');
const addFieldBtn = document.querySelector('#addField');
const submitBtn = document.querySelector('#orderBtn');
let textInputs = document.querySelectorAll('.field > input[type=text]');
const form = document.querySelector('form');
const streetField = document.querySelector('#street');
const numberField = document.querySelector('#number');
const postalCodeField = document.querySelector('#postal-code');
const cityField = document.querySelector('#city');


const products = [
    'Miód rzepakowy',
    'Miód faceliowy',
    'Miód wielokwiatowy',
    'Miód lipowy',
    'Miód gryczany',
    'Miód nektarowo-spadziowy'
];


let fieldID = 0;

function createProductField() {
    let row = document.createElement('div');
    row.classList.add('field-row');

    let select = document.createElement('select');

    products.forEach(element => {
        let option = document.createElement('option');
        option.setAttribute('value', element);
        option.innerText = element;
        select.appendChild(option);
    });

    row.appendChild(select);

    let radio500 = document.createElement('input');
    radio500.setAttribute('type', 'radio');
    radio500.setAttribute('name', `pojemnosc + ${fieldID}`);
    radio500.setAttribute('id', `500g + ${fieldID}`);
    radio500.setAttribute('value', '500');
    radio500.setAttribute('required', 'required');

    let label500 = document.createElement('label');
    label500.setAttribute('for', `500g + ${fieldID}`);
    label500.innerText = '500g';

    let radio1000 = document.createElement('input');
    radio1000.setAttribute('type', 'radio');
    radio1000.setAttribute('name', `pojemnosc + ${fieldID}`);
    radio1000.setAttribute('id', `1000g + ${fieldID}`);
    radio1000.setAttribute('value', '1000');

    let label1000 = document.createElement('label');
    label1000.setAttribute('for', `1000g + ${fieldID}`);
    label1000.innerText = '1000g';

    row.appendChild(label500);
    row.appendChild(radio500);
    row.appendChild(label1000);
    row.appendChild(radio1000);

    let amount = document.createElement('input');
    amount.setAttribute('type', 'number');
    amount.setAttribute('min', '1');
    amount.setAttribute('max', '50');
    amount.setAttribute('id', 'ilosc');
    amount.setAttribute('value', '1');



    let amountLabel = document.createElement('label');
    amountLabel.setAttribute('for', 'ilosc');
    amountLabel.setAttribute('required', 'required');
    amountLabel.innerText = "Ilość sztuk:";

    row.appendChild(amountLabel);
    row.appendChild(amount)

    let delBtn = document.createElement('button');
    delBtn.innerText = 'Usuń';
    delBtn.addEventListener('click', () => {
        productsBox.removeChild(row);
    });

    row.appendChild(delBtn);

    fieldID++;

    return row;
}

function addProductField() {
    let row = createProductField();
    productsBox.appendChild(row);
}

window.addEventListener('load', () => {
    addProductField();
    submitBtn.disabled = true;
});

addFieldBtn.addEventListener('click', (event) => {
    submitBtn.disabled = true;
    event.preventDefault();
    addProductField();
});



function textValidator(input) {
    let reg = /^[a-zA-Z]+$/;
    return reg.test(input);
}

textInputs.forEach(input => {
    let parent = input.parentNode;
    let isErrorMessageDisplay = false;
    let error = document.createElement('p');
    input.addEventListener('input', (event) => {
        if (textValidator(input.value)) {
            input.classList.add('valid');
            input.classList.remove('invalid');
            if (isErrorMessageDisplay) {
                parent.removeChild(error);
            }
            isErrorMessageDisplay = false;
        } else {
            if (!isErrorMessageDisplay) {
                error.innerText = "Pole może zawierać tylko duże i małe litery!";
                parent.appendChild(error);
                isErrorMessageDisplay = true;
            }
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
    });
});

form.addEventListener('input', () => {
    let invalid = document.querySelectorAll('.invalid');
    let valid = document.querySelectorAll('.valid');
    let required = document.querySelectorAll(':invalid');

    if(invalid.length == 0 && required.length == 0 && valid.length >= 6) {
        submitBtn.disabled = false;
    }else {
        submitBtn.disabled = true;
    }
});

streetField.addEventListener('input', (event)=> {
    let isErrorMessageDisplay = event.target.parentNode.querySelector('p')? true : false;
    let error = document.createElement('p');
    if (textValidator(event.target.value)) {
        event.target.classList.add('valid');
        event.target.classList.remove('invalid');
        if(isErrorMessageDisplay) {
            event.target.parentNode.removeChild(event.target.parentNode.querySelector('p'));
        }
        
        isErrorMessageDisplay = false;
    } else {
        if (!isErrorMessageDisplay) {
            error.innerText = "Pole może zawierać tylko duże i małe litery!";
            event.target.parentNode.appendChild(error);
            isErrorMessageDisplay = true;
        }
        event.target.classList.add('invalid');
        event.target.classList.remove('valid');
    }
});

function homeNumberValidator(input) {
    let reg = /^[0-9]+[a-z]?[\/]?[0-9]*$/;
    return reg.test(input);
}

numberField.addEventListener('input', (event) => {
    let isErrorMessageDisplay = event.target.parentNode.querySelector('p')? true : false;
    let error = document.createElement('p');
    if (homeNumberValidator(event.target.value)) {
        event.target.classList.add('valid');
        event.target.classList.remove('invalid');
        if(isErrorMessageDisplay) {
            event.target.parentNode.removeChild(event.target.parentNode.querySelector('p'));
        }
        
        isErrorMessageDisplay = false;
    } else {
        if (!isErrorMessageDisplay) {
            error.innerText = "Nieprawidłowy numer! numer domu/numer mieszkania";
            event.target.parentNode.appendChild(error);
            isErrorMessageDisplay = true;
        }
        event.target.classList.add('invalid');
        event.target.classList.remove('valid');
    }
});
function postalCodeValidator(input) {
    let reg = /^[0-9]{2}[-][0-9]{3}$/;
    return reg.test(input);
}

postalCodeField.addEventListener('input', (event) => {
    let isErrorMessageDisplay = event.target.parentNode.querySelector('p')? true : false;
    let error = document.createElement('p');
    if (postalCodeValidator(event.target.value)) {
        event.target.classList.add('valid');
        event.target.classList.remove('invalid');
        if(isErrorMessageDisplay) {
            event.target.parentNode.removeChild(event.target.parentNode.querySelector('p'));
        }
        
        isErrorMessageDisplay = false;
    } else {
        if (!isErrorMessageDisplay) {
            error.innerText = "Nieprawidłowy kod pocztowy! XX-XXX";
            event.target.parentNode.appendChild(error);
            isErrorMessageDisplay = true;
        }
        event.target.classList.add('invalid');
        event.target.classList.remove('valid');
    }
});


cityField.addEventListener('input', (event)=> {
    let isErrorMessageDisplay = event.target.parentNode.querySelector('p')? true : false;
    let error = document.createElement('p');
    if (textValidator(event.target.value)) {
        event.target.classList.add('valid');
        event.target.classList.remove('invalid');
        if(isErrorMessageDisplay) {
            event.target.parentNode.removeChild(event.target.parentNode.querySelector('p'));
        }
        
        isErrorMessageDisplay = false;
    } else {
        if (!isErrorMessageDisplay) {
            error.innerText = "Pole może zawierać tylko duże i małe litery!";
            event.target.parentNode.appendChild(error);
            isErrorMessageDisplay = true;
        }
        event.target.classList.add('invalid');
        event.target.classList.remove('valid');
    }
});

submitBtn.addEventListener('click', () => {
    alert("Zamówienie zostało złożone!");
});

