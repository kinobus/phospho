"use strict";angular.module("phosphoBaseApp",["ngCookies","ngResource","ngSanitize","ngRoute","firebase","ph.Elements","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/docs",{templateUrl:"views/docs.html",controller:"DocsCtrl"}).when("/overview",{templateUrl:"views/overview.html",controller:"OverviewCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("phosphoBaseApp").controller("MainCtrl",["$scope","$rootScope","PhosphoIO","figureFactory",function(a,b,c,d){a.newPathway=new d.pathway,a.clickItem=function(b,c){b||(a.selectedItem=null),c?(b.mutable=!0,a.selectedItem=angular.copy(b)):a.selectedItem=b},a.sharedFigs=[{title:"Phosphoproteome of DLBCL",author:"Ricker",content:"kinome",flasks:15,forks:3},{title:"Integrated Colon Cancer Screen",author:"James",content:"pathway",flasks:12,forks:2},{title:"DUX4 in FSHD",author:"Greg",content:"pathway",flasks:9,forks:7},{title:"Vemurafinib Resistance and WNT",author:"Kathy",content:"pathway",flasks:4,forks:0}],a.publishedFigs=c,a.publish=function(c){a.selectedItem.mutable=!1,c.flasks=0,c.forks=0,c.author=b.user?b.user.email:"guest",a.publishedFigs.$add(c)},a.panelNewPathwayOptions={scale:1,editable:!0},a.displayScale={gridblock:.25,focus:1},a.gridblockPublishedOptions={scale:.25,editable:!1}}]),angular.module("phosphoBaseApp").controller("DocsCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("phosphoBaseApp").controller("OverviewCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("phosphoBaseApp").controller("LoginCtrl",["$scope","$firebaseSimpleLogin","$rootScope",function(a,b,c){var d=new Firebase("https://phosphobase.firebaseio.com");a.loginObj=b(d),c.$on("$firebaseSimpleLogin:login",function(a,b){c.user={email:b.email}}),c.$on("$firebaseSimpleLogin:logout",function(){c.user=null}),a.loginEmail="test@phospho.io",a.loginPassword="test123",a.login=function(){var b={email:a.loginEmail,password:a.loginPassword};a.loginObj.$login("password",b).then(function(a){console.log("logged in as: ",a.uid)},function(a){console.log("login failed: ",a)})},a.signup=function(){a.loginObj.$createUser(a.signupEmail,a.signupPassword).then(function(a){console.log("Created account and logged in as: ",a.uid)},function(a){console.log("login failed: ",a)})},a.logout=function(){a.loginObj.$logout()}}]),angular.module("phosphoBaseApp").service("PhosphoIO",["$firebase",function(a){var b=new Firebase("https://phosphobase.firebaseio.com/figures");return a(b)}]),angular.module("phosphoBaseApp").factory("figureFactory",function(){var a={title:"Untitled Figure",type:"pathway",graph:{nodes:[{id:0,label:"BCR",type:"prot",compartment:"membrane"},{id:1,label:"PIK3CD",type:"prot",compartment:"cytosol"},{id:2,label:"PIK3R1",type:"prot",compartment:"cytosol"},{id:3,label:"Cell Growth",type:"event",compartment:"nucleus"},{id:4,label:"LYN",type:"prot",compartment:"cytosol"},{id:5,label:"CD79",type:"prot",compartment:"membrane"},{id:6,label:"SYK",type:"prot",compartment:"cytosol"},{id:7,label:"IRAK4",type:"prot",compartment:"cytosol"},{id:8,label:"BCL6",type:"prot",compartment:"cytosol"},{id:9,label:"NFKB Path",type:"pathway",compartment:"cytosol"},{id:10,label:"Ca2+ Rel",type:"event",compartment:"membrane"},{id:11,label:"BTK",type:"prot",compartment:"cytosol"},{id:12,label:"CARD11",type:"prot",compartment:"cytosol"},{id:13,label:"JAK2",type:"prot",compartment:"cytosol"},{id:14,label:"STAT3",type:"prot",compartment:"cytosol"},{id:15,label:"Cell Survival",type:"event",compartment:"nucleus"}],links:[{source:0,target:1,type:"activate"},{source:1,target:2,type:"activate"},{source:2,target:3,type:"activate"},{source:4,target:0,type:"inhibit"},{source:4,target:5,type:"inhibit"},{source:4,target:6,type:"activate"},{source:6,target:11,type:"activate"},{source:11,target:10,type:"activate"},{source:10,target:12,type:"activate"},{source:12,target:9,type:"activate"},{source:13,target:14,type:"activate"},{source:14,target:15,type:"activate"},{source:7,target:9,type:"activate"},{source:8,target:3,type:"activate"},{source:9,target:15,type:"activate"},{source:9,target:3,type:"activate"}]}};return{pathway:function(){return a}}});