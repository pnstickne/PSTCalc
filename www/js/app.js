// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('keypad', function ($scope) {

  var input = "";

  // Enter a number (in the input)
  $scope.number = function (number) {
    if (!input) {
      input = "" + number;
    }
  };

  var values = [];

  $scope.enter = function () {
    if (input.length) {
      values.unshift(new FloatValue(parseFloat(input)));
      input = "";
    }

    console.log("values", values.map(function (v) { return v.value; }));
  };

  // Run an operation
  $scope.op = function (name) {
    if (input.length) {
      values.unshift(new FloatValue(parseFloat(input)));
      input = "";
    }

    var rop = Operations.resolve(name, values);

    console.log("rop", name, rop);

    if (rop) {
      var vs = values.slice(0, rop.size);
      values = values.slice(rop.size);
      var r = rop.op.apply(vs);
      values.unshift(r);
    }

    console.log("r-values", values.map(function (v) { return v.value; }));
  };
})
