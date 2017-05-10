// display 10 list items on the page
var show_per_page = 10;
// find out how many list items are in the list
var number_of_list_items = $('.student-list li').length;
console.log(number_of_list_items);
// divide the number of list items to the number of items per page to find out the number of pages 
var number_of_pages = Math.ceil(number_of_list_items / show_per_page);
console.log(number_of_pages);


var ul = document.getElementsByClassName("student-list");
var li = document.getElementsByTagName("li");


//set the value of our hidden input fields
$('#current_page').val(1);
$('#show_per_page').val(show_per_page);
// creating the navigation

//current link value is 1
var current_link = 0;
var navigation_html = '';

while(number_of_pages > current_link){
    navigation_html += '<a class="page_link" href="javascript:go_to_page('+ current_link +')" longdesc="' +
 current_link +'">'+ (current_link + 1) +'</a>';
    current_link++;
}


$('.pagination').html(navigation_html);

//hide all the elements inside content div
$('.student-list').children().css('display', 'none');

//add active class to the first page link
$('#page_navigation .page_link:first').addClass('active');

//and show the first list items: using slice we select the first 10 items of the list
$('.student-list').children().slice(0, show_per_page).css('display', 'block');



function go_to_page(page_num){
	//get the number of items shown per page
	var show_per_page = parseInt($('#show_per_page').val());

	//get the element number where to start the slice from
	start_from = page_num * show_per_page;

	//get the element number where to end the slice
	end_on = start_from + show_per_page;

	//hide all children elements of content div, get specific items and show them
	$('.student-list').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

	/*get the page link that has longdesc attribute of the current page and add active class to it
	and remove that class from previously active page link*/
	$('.page_link[longdesc=' + page_num +']').addClass('active').siblings('.active').removeClass('active');

	//update the current page input field
	$('#current_page').val(page_num);
}



//add search bar 
$( ".page-header" ).append('<div class="student-search"></div>');
$( ".student-search" ).append('<input id="input-search" placeholder="Search for students..."/><button id="search">Search</button>');

// append to the .page the container div for the error message
$('.page').append('<div class="error"></div>'); 
// append to the error div a p with the error message if student is not found


// search for a match function

function myFunction() {  
    var input = document.getElementById("input-search");
    var filter = input.value.toUpperCase();
    var found = false;
    for (var i = 0; i < li.length; i+=1) {  
        var h = li[i].getElementsByTagName("h3")[0];
        if (h.innerHTML.toUpperCase().indexOf(filter) != -1) {
            li[i].style.display = ""; 
            console.log('yey found it');
            found = true;
        } else {
            li[i].style.display = "none";   
            console.log('condtion 2');
        }      
      } 
      if (found===false) {
         $('.error').append('<p>"student not found!"</p>');  
      } else if (found===true) {
          $('.error').empty();  
      }
    $('.pagination').hide();
    console.log('--------------------------------------'); // testing 
}


// on click call myFunction()
$('#search').on('click', function(){
      myFunction();         
});



// when the input is empty return to page 1, empty the error div, show pagination, 

$('#input-search').on('keyup', function() {
 if($(this).val() === '') {
   go_to_page(0);
   $('.pagination').show();
  }
});

// de fiecare data cand am avut un search trebuie sa dau found sa fie true din nou























