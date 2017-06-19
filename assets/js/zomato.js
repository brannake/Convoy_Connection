$(document).ready(function(){

    var zomatorAPI="https://developers.zomato.com/api/v2.1/"


    //var zomatorKey = "ec761b592e1a11adbc7320c4fff471b9"
    //var zomatorKey="02a56259c797204a75f7d4dd14a08d39"
    var zomatorKey="2764611985fca4aa535b451992f20776"

    

    var zomatoAjax={
        "async"         :   true,
        "crossDomain"   :   true,
        "method"        :   "GET",
        "headers"       : {
            "Accept"    : "application/json",
            "user-key"  : zomatorKey
        }
    }

    var database =firebase.database();
    var start = 1  //ctr for pagination

    //Initialize firebase

    $( "#search-box" ).keyup(function() {
        if ($("#search-box").val().length > 2){
            entreeSearch($("#search-box").val())
        }else if ($("#search-box").val().length === 0) {
            $('#no-results' ).hide()
            $("li.res-li").show()
        }
    })

    function entreeSearch(item){
        $("li.res-li").hide()
        var searchTerm = item.toLowerCase()
        database.ref().once("value", function (data) {
            data.forEach(function(snapshot){
                var ck =  snapshot.key;
                var cd =  snapshot.val()
                if(foundonFirebase(cd,searchTerm)){
                    $('li#'+ck).show()
                }
                if( $(".restaurants-collection li:visible").length <=1){
                    $('#no-results').show()
                }else {
                    $('#no-results').hide()
                }
            })
        })
    }

    function foundonFirebase(obj,item){
        var found=false
        for(key in obj){
            var entry = Object.keys(obj[key])[0].toLowerCase()
            if(entry.includes(item)){
                // $('#no-results').hide()
                found =  true
                break
            }
        }
        return found
    }



    function populateTable(restaurantInfo){
        var li = $("<li class='res-li' id='"+restaurantInfo.id+"'>" +
            "<div class='collapsible-header row' res-id='"+restaurantInfo.id+"'>" +
                "<div class='col s2 getName' data-name='"+restaurantInfo.name+"'>"+restaurantInfo.name+"</div>" +
                "<div class='col s2'>"+restaurantInfo.ratingNum+"</div>"+
                "<div class='col s4'>"+restaurantInfo.address+"</div>" +
                "<div class='col s4'>"+ restaurantInfo.cuisine+"</div>" +
            "</div>" +
            "<div class='collapsible-body row'>" +
                "<div class='col s12' id='restaurant-men'><span><button data-target='modal1' class='btn' id='restaurant-rating'>Reviews</button></span><hr><h5>Menu</h5>" +
                "<div class='food-menu'><div class='menu-msg'></div><table><tbody id='menu-entries-"+restaurantInfo.id+"' border='1'></tbody></table></div></div>" +
            "</div>" +
            "</li>")
        $(".restaurants-collection").append(li)
    }

    function getReview(res_id){
        zomatoAjax.url = zomatorAPI+ "reviews?res_id="+res_id
        $.ajax(zomatoAjax).done(function(results){
            $("#zomato-review").html("")
            for(var i = 0 ; i  < results.user_reviews.length; i++){
                var zomReviews = $("<div class = 'zomatoRestaurantReview'>")
                var zomRating = $("<div class = 'stars'>").html(results.user_reviews[i].review.rating + " out of 5 stars ")
                var zomUserName = $("<div class = 'zomatoUserName'>").html(results.user_reviews[i].review.user.name)
                var zomDate = $("<div class = 'zomatoDate'>").html(results.user_reviews[i].review.review_time_friendly)
                var zomText = $("<div class = 'zomatoReviewText'>").html(results.user_reviews[i].review.review_text)
                zomReviews.append("<img src='https://oldejaolrestaurant.com/wp-content/uploads/sites/17/2017/04/zomato_logo-150x150.png'>",zomRating,zomUserName,zomDate,zomText);
                zomReviews.append("<br>");
                $("#zomato-review").append(zomReviews);
            }
        })
    }

    /**
     * Call the zomato API
     */
    function zomatorSearch(){
        zomatoAjax.url = zomatorAPI+ "search?entity_id=302&entity_type=city&q=92111&start="+start+"&count=20"
        $.ajax(zomatoAjax).done(function(results){
            console.log(results)
            traverseResults(results)
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
    /**
     * Need a location to place the featured image or just use the carousel
     * @param res_id
     */
    // function getRestaurantImage(res_id){
    //     zomatoAjax.url = zomatorAPI+ "restaurant?res_id="+res_id
    //     $.ajax(zomatoAjax).done(function(results){
    //         var img =  $("<img>").attr("src",results.featured_image )
    //         $(".restaurant-image").html(img)
    //     })
    // }
    /**
     * Will create a button to load more paginated by 5
     */
    $("#load-more").on("click",function(){
        start= start +5
        zomatorSearch();
    })

    function loadAll(){
        start= start +5
        zomatorSearch();
    }

    /**
     * Click event for each <li>
     */
    $(".restaurants-collection").on("click", ".collapsible-header",function(){
        $(".placeholder").hide();
        $(".carousel").css({"visibility": "visible"})
        getReview( $(this).attr("res-id") )
    })
    /*
     Initial Load
     */
    zomatorSearch()
    for (var i = 0; i <=10; i++){
         loadAll()
    }
});
