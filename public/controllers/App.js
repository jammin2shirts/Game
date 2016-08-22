var myApp = angular.module('myApp', []);

myApp.controller("myfirstcontroller",function($scope, $http, $interval){
    
    $scope.Welcome = "Welcome to my new game!";
    
    
    //check to see if database connection is there using a get request when the page loads
   var refresh = function(){
            $http.get('/findAll').success(function(response){
            //console.log("Intial get, for all game data, request to the database is SUCCESSFUL");
            $scope.game = response;   
            stockCount();
            //console.log("The actual stock count is: " + $scope.game[0].stock);
            newDatabaseStock();
          
            });          
   };
    //initiate refresh
    refresh();
    
    var stockCount = function(){
        //Increases the stock of each resource over time
            angular.forEach($scope.game, function(key){
                ///increasing the stock over time
                $interval(function(){
                    key.stock += 1;
                    //console.log("The new count is = "+ key.stock);
                    }, (60000) / key.perMin);   
                //reutrns the new stock of that resource
                return key.stock;
                
                
            });
    };
    
//---------------------------------------------------------------------------------------------------    
//Post the new Stock to the database every 30 secs

    var newDatabaseStock = function(){
        angular.forEach($scope.game, function(key){
            
                $interval(function(){
                    console.log("the NewDatebaseStock = " + key.stock);
                    $http.put('/newDatabaseStock/' + key._id, key).success(function(response){
                    console.log(response);
                    console.log("added to the database");
                        
                    });
                }, 10000);   
            });
    };

//------------------------------------------------------------------------------------------------  
    $scope.upgradeLevel = function(field){

        if(field.level < 20){
            
            if(field.stock >= 10){
                field.stock -= 200;
                //field.level += 1;
                updateLevel(field);
                
            }else{
                alert("Not enough resources Brah!");    
            }
        }else{
            alert("HOOLY FUCK YOU MAXED OUT!!!");
        }
    };
    
    
    var updateLevel = function(field){
                //console.log('the amount of stock of this field is now 10 less: ' + field.stock);
                $http.put('/updateLevel/' + field._id, field).success(function(response){
                    console.log(response);
                    refresh();
                });
    };
    //
    
    //End of controller
    });
    






    