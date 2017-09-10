//var validator = require("email-validator");
var config = require("../../shared/config");
var firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");

function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new observableModule.fromObject({
        email: info.email || "",
        password: info.password || ""
    });

    viewModel.login = function() {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
            email: viewModel.get("email"),
            password: viewModel.get("password")
            }
          }).then(
            function (response) {
                console.log(response.uid);
                config.uid = response.uid
                return response;
            });
    };
    
    viewModel.register = function() {
        return firebase.createUser({
            email: viewModel.get("email"),
            password: viewModel.get("password")
          }).then(
              function (response) {
                console.log(response.uid);
                return response;
              }
          );
    };

    viewModel.google_register = function() {
        console.log('viewModel.google_register');
        return firebase.login({
            type: firebase.LoginType.GOOGLE
        }).then(
            function (result) {
                console.log(result);
                JSON.stringify(result);
            },
            function (errorMessage) {
                console.log(errorMessage);
            }
        );
    }
    /*
    viewModel.isValidEmail = function() {
        var email = this.get("email");
        return validator.validate(email);
    };
*/
    viewModel.init = function(){
        firebase.init({
            url: config.apiUrl
        }).then(
          function (instance) {
            console.log("firebase.init done");
          },
          function (error) {
            console.log("firebase.init error: " + error);
          }
        );
      };    

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = User;