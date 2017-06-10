$(document).ready(function(){

<<<<<<< HEAD
    
    var zomatorAPI="https://developers.zomato.com/api/v2.1/"
    var zomatorKey="2764611985fca4aa535b451992f20776"
    var start = 1
    var allRestArr = [];
    //Initialize carousel
    $('.carousel').carousel();
    

    function populateTable(restaurantInfo){

       var tr=$("<tr id='"+restaurantInfo.id+"' class='restaurant-name' data-latitude=" + restaurantInfo.latitude + " data-longitude=" + restaurantInfo.longitude + "><td>"+restaurantInfo.name+"</td><td>"+restaurantInfo.address+"</td><td>"+ restaurantInfo.cuisine+"</td><td>"+restaurantInfo.ratingNum +"</td><td>"+restaurantInfo.ratingVotes+"</td><td>"+restaurantInfo.ratingText+"</td></tr>")
           $("#restaurantList").append(tr).show()
           

       var tr=$("<tr class='restaurant-name' id='"+restaurantInfo.id+" data-longitude="+restaurantInfo.longitude+" data-latitude="+restaurantInfo.latitude+"'><td>"+restaurantInfo.name+"</td><td>"+restaurantInfo.address+"</td><td>"+ restaurantInfo.cuisine+"</td><td>"+restaurantInfo.ratingNum +"</td><td>"+restaurantInfo.ratingVotes+"</td><td>"+restaurantInfo.ratingText+"</td></tr>")
           $("#restaurantList").append(tr)

    }



    function getReview(res_id){
        var test = "17076027"
        $.ajax({
            "async"         :   true,
            "crossDomain"   :   true,
            "url"           :   zomatorAPI+ "reviews?res_id="+test,
            "method"        :   "GET",
            "headers"       : {
                "Accept"    : "application/json",
                "user-key"  : zomatorKey
            }
        }).done(function(results){
        //    console.log(results)
        })

    }


    function zomatorSearch(){
        $.ajax({
            "async"         :   true,
            "crossDomain"   :   true,
            "url"           :   zomatorAPI+ "search?entity_id=302&entity_type=city&q=92111&start="+start+"&count=5",
            "method"        :   "GET",
            "headers"       : {
                "Accept"    : "application/json",
                "user-key"  : zomatorKey
            }
        }).done(function(results){
            traverseResults(results)
            getReview()
        })
    }

    function traverseResults(results){
        for (var i = 0; i< results.results_shown; i++){
            var info={
                "id"               : results.restaurants[i].restaurant.id,
                "name"             : results.restaurants[i].restaurant.name,
                "address"          : results.restaurants[i].restaurant.location.address,
                "cuisine"          : results.restaurants[i].restaurant.cuisines,
                "ratingNum"        : results.restaurants[i].restaurant.user_rating.aggregate_rating,
                "ratingVotes"      : results.restaurants[i].restaurant.user_rating.votes,
                "ratingText"       : results.restaurants[i].restaurant.user_rating.rating_text,
                "latitude"         : results.restaurants[i].restaurant.location.latitude,
                "longitude"        : results.restaurants[i].restaurant.location.longitude
            }

            populateTable(info)

        }
    }

    function getRestaurantImage(res_id){
        $.ajax({
            "async"         :   true,
            "crossDomain"   :   true,
            "url"           :   zomatorAPI+ "restaurant?res_id="+res_id,
            "method"        :   "GET",
            "headers"       : {
                "Accept"    : "application/json",
                "user-key"  : zomatorKey
            }
        }).done(function(results){
            console.log("TEST->",results.featured_image)
            var img =  $("<img>").attr("src",results.featured_image )

            $(".restaurant-image").html(img)
        })


    }
  
    $("#load-more").on("click",function(){
        start= start +5
        zomatorSearch();
    })

    $("#restaurantList").on("click", ".restaurant-name",function(){
        console.log("TSET")
        getRestaurantImage( $(this).attr("id") )

    })



    //initial load
    zomatorSearch()

=======
>>>>>>> a35e8ddaaaec2e6fd2e89f11e73f1720ed3e9a21
});
