const FIELD_IDS = [
    'card-number',
    'cvc-number',
    'usd-amount',
    'first-name',
    'last-name',
    'city',
    'state',
    'postal-code',
    'text-area'
];

// TODO:
// - Count number of checked payments. If none, it is missing.
// - Validate regex of 'card-number' depending in the payment ID. See https://www.regular-expressions.info/creditcard.html
// - Handle background color of the form-check-input as a whole.
const PAYMENT_IDS = [
    'mastercard',
    'visa',
    'diners-club',
    'amex'
];


// TODO: Use lighter red because text is hard to read.
const setDangerBackground = function setDangerBackgroundOfIfNecessary(fieldId) {
    const element = document.getElementById(fieldId);
    if (!element.classList.contains('bg-danger')) {
        element.classList.add('bg-danger');
    }
}


const resetBackground = function removeDangerBackgroundIfNecessary(fieldId) {
    const element = document.getElementById(fieldId);
    if (element.classList.contains('bg-danger')) {
        element.classList.remove('bg-danger');
    }
}


// TODO: Handle payments!
const hasMissingField = function hasMissingField(fieldId) {
    const element = document.getElementById(fieldId);
    return fieldId === 'state' && element.value === 'Pick a state' || fieldId !== 'state' && element.value === '';
}


const existMissingFields = function existMissingFields() {
    let existMissingField = false;
    for (const fieldId of FIELD_IDS) {
        if (hasMissingField(fieldId)) {
            setDangerBackground(fieldId);
            existMissingField = true;
        } else {
            resetBackground(fieldId);
        }
    }
    return existMissingField;
}


// TODO: Modify the text displayed depending on the failures.
// - If missing values, show that. It would be nice to specify which values are missing.
// - If a regex validation for 'card-number', 'cvc-number' or 'usd-amount', show that, too.
const displayMissingFieldsAlert = function displayMissingFieldsAlertIfNotShown() {
    const missingFieldsAlert = document.getElementsByClassName('alert')[0];
    if (missingFieldsAlert.classList.contains('d-none')) {
        missingFieldsAlert.classList.remove('d-none');
    }
}


const hideMissingFieldsAlert = function hideMissingFieldsAlertIfShown() {
    const missingFieldsAlert = document.getElementsByClassName('alert')[0];
    if (!missingFieldsAlert.classList.contains('d-none')) {
        missingFieldsAlert.classList.add('d-none');
    }
}

// TODO: Add a memo array to determine if an element was never modified. If so, it shouldn't be red.
// When the cancel button is hit, the memo array should be restarted, too.
window.addEventListener("load", event => {
    for (const fieldId of FIELD_IDS) {
        const element = document.getElementById(fieldId);
        element.addEventListener('change', event => {
            if (existMissingFields()) {
                displayMissingFieldsAlert();
            } else {
                hideMissingFieldsAlert();
            }
        });
    }
    
    document.getElementById('cancel-button').addEventListener('click', event => {
        for (const fieldId of FIELD_IDS) {
            const element = document.getElementById(fieldId);
            // TODO: Why is my 'change' event listener not working in here?
            if (fieldId === 'state') {
                element.value = 'Pick a state';
            } else {
                element.value = '';
            }
        }
        // TODO: Remove this once I know how to trigger my event listeners with every changed value in the previous loop.
        if (existMissingFields()) {
            displayMissingFieldsAlert();
        }
    });

    // TODO: preventDefault is not working. Going to update the type of the button in the meantime.
    // document.getElementById('submit-button').addEventListener('submit', event => {
    //     event.preventDefault();
    // });

    if (existMissingFields()) {
        displayMissingFieldsAlert();
    }
});