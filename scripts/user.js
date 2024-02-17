"use strict";

(function (core) {
    class User {

        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }

        get displayName() {
            return this._displayName;
        }

        set displayName(value) {
            this._displayName = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        get username() {
            return this._username;
        }

        set username(value) {
            this._username = value;
        }

        toString() {
            return `DisplayName: ${this._displayName}\n EmailAddress: ${this._emailAddress}\n 
                Username: ${this._username}`;
        }

        /**
         * Serialize for writing to localStorage
         */
        serialize() {
            if (this._displayName !== "" && this._emailAddress !== "" && this._username !== "") {
                return `${this.displayName}, ${this.emailAddress}, ${this.username}`;
            }
            console.error("One or more of the contact properties is missing or invalid!");
            return null;
        }

        /**
         * Deserialize is used to read data from localStorage
         */
        deserialize(data) {
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2];
        }


        toJSON(){
            return {
                DisplayName: this._displayName,
                EmailAddress: this._emailAddress,
                Username : this._username,
                Password: this.Password
            }
        }

        fromJSON(data){
            this._displayName = data.DisplayName;
            this._emailAddress = data.EmailAddress;
            this._username = data.Username;
            this._password = data.Password;
        }
    }

    //namespace definition
    core.User = User;
})(core || (core = {}) );