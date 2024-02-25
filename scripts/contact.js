"use strict";

class Contact {

    constructor(fullName = "", contactNumber = "", emailAddress = "") {
        this._fullName = fullName;
        this._contactNumber = contactNumber;
        this._emailAddress = emailAddress;
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(value) {
        this._fullName = value;
    }

    get contactNumber() {
        return this._contactNumber;
    }

    set contactNumber(value) {
        this._contactNumber = value;
    }

    get emailAddress() {
        return this._emailAddress;
    }

    set emailAddress(value) {
        this._emailAddress = value;
    }

    toString(){
        return `FullName: ${this._fullName}\n ContactNumber: ${this._contactNumber}\n 
                EmailAddress: ${this._emailAddress}`;
    }

    /**
     * Serialize for writing to localStorage
     */
    serialize(){
        if(this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== ""){
            return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress}`;
        }
        console.error("One or more of the contact properties is missing or invalid!");
        return null;
    }

    /**
     * Deserialize is used to read data from localStorage
     */
    deserialize(data){

        let propertyArray = data.split(",");
        this._fullName = propertyArray[0];
        this._contactNumber = propertyArray[1];
        this._emailAddress = propertyArray[2];
    }
}

function redirectToHome(){
    window.location.href = 'index.html';
}
function showThankYouMessage() {
    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouMessage.style.display = 'block';

    // After form submission, we need to wait for 5 second and redirect to Home
    setTimeout(redirectToHome, 5000); // 5000 milliseconds = 5 seconds
}
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // After form submission, show the thank you message and redirect
        showThankYouMessage();
    });
});