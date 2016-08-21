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

        //check to see if the field is maxed out at level 20
        if(field.level < 20){
            
            //the array with the information about the field level upgrades
            resourceCostPerLv = [25,80,136,244,450,677,1000,2500,5500,12000,20000,39000,75000,135000,200000,420000,750000,1460000,3200000,1000000];
            
            //to match up the indexes with the field level
            i = field.level - 1;
            
            //if the stock is greater than or equal to the amount of the resources needed to upgrade, contine with upgrading the field and removing the resources
            //else throw an error
            if( field.stock >= resourceCostPerLv[i]){
                
                //console.log("The amount on needed resources for this level: " + resourceCostPerLv[i]);
                //console.log("The old field stock: " + field.stock);
                
                //new field stock after removing the resources
                field.stock = field.stock - resourceCostPerLv[i];
                
                //console.log("The new stock amount is now: " + field.stock);
                
                //updte the field information, lv and stock
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
    






    