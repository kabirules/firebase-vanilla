var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel({
    email: "javifont@gmail.com",
    password: "123456"
});

var page;
var email;

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = user;
    user.init();
};

exports.signIn = function() {
    user.login()
        .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            frameModule.topmost().navigate("views/list/list");
        });
};

exports.register = function() {
    user.register()
    .catch(function(error) {
        console.log(error);
        dialogsModule.alert({
            message: "Error while registering",
            okButtonText: "OK"
        });
        return Promise.reject();
    })
    .then(function() {
        alert('Succesfully registered')
    });
};

exports.google_register = function() {
    console.log('starting google register');
    user.google_register()
    .catch(function(error) {
        console.log(error);
        dialogsModule.alert({
            message: "Error while registering",
            okButtonText: "OK"
        });
        return Promise.reject();
    })
    .then(function() {
        alert('Succesfully registered')
    });
};