var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var config = require("../../shared/config");

var firebaseUser;
var user;
var page;

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = page.navigationContext;
    user = page.navigationContext.user;
    firebaseUser = config.firebaseUser
    xmlEmail = page.getViewById('email');
    xmlId = page.getViewById('uid');
    xmlEmail.text = firebaseUser.email;
    xmlId.text = firebaseUser.uid;
};

exports.addData = function(args) {
    data = page.getViewById('field1').text;
    user.add(data)
    .catch(function(error) {
        console.log(error);
        return Promise.reject();
    })
    .then(function(result) {
        console.log(result);
        page.getViewById('field1').text = '';
    });
}

exports.setValue = function(args) {
    data = page.getViewById('field1').text;
    user.setValue(data)
    .catch(function(error) {
        console.log(error);
        return Promise.reject();
    })
    .then(function(result) {
        console.log(result);
        page.getViewById('field1').text = '';
    });
}

exports.query = function(args) {
    user.query();
};

exports.deleteData = function(args) {
    user.delete('KvDcqD9aP2ypY9LjPpt')
    .catch(function(error) {
        console.log(error);
        return Promise.reject();
    })
    .then(function(result) {
        console.log(result);
    });
}