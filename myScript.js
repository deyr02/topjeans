
let _xmlDoc;
 function loadXml(){
    let _xhttp; 
    if(window.XMLHttpRequest){
        _xhttp = new XMLHttpRequest();
    }
    else{
        _xhttp = new ActiveXObject("Microsoft.XMLHTTP");    
    }
    
    _xhttp.onreadystatechange = function(){
        if((this.readyState == 4) && (this.status == 200)){
            _xmlDoc = this.responseXML;
            if(JSON.parse( localStorage.getItem("currency")) === "AUD"){
                for(let i =0; i< _xmlDoc.documentElement.childElementCount; i++){
                    let price =  parseFloat(_xmlDoc.documentElement.children[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
                     _xmlDoc.documentElement.children[i].getElementsByTagName("price")[0].childNodes[0].nodeValue = (price * 0.90).toFixed(2);

                }
            }
        }
    }
    
    _xhttp.open("GET", "jeans_store.xml", true);
    _xhttp.send();
}

/*
    function jeansByGender(_gender){
        let x = _xmlDoc.getElementsByTagName("product");
        
        for(let i = 0; i< x.length; i++){
            if((x[i].getAttribute("gender")) !== _gender){
                let y = _xmlDoc.getElementById(x[i].getAttribute("id").toString());
               _xmlDoc.documentElement.removeChild(y);
                i--;
            }
        }    
    }

*/


function jeansByProductAttribute(_attributeName, _attributeValue){
        let x = _xmlDoc.getElementsByTagName("product");
        let arr = [];
        for(let i = 0; i< x.length; i++){
            if((x[i].getAttribute(_attributeName)) === _attributeValue){
                arr.push(x[i]);
            }
        }  
        return arr;
    }

function jeansBySaletype(_arr, _saleType){
    
     let x = _arr;
        let arr = [];
        for(let i = 0; i< x.length; i++){
            // console.log(x[i].getElementsByTagName("sale")[0].childNodes[0].nodeValue);
            if((x[i].getElementsByTagName("sale")[0].childNodes[0].nodeValue) === _saleType){
                arr.push(x[i]);
               
            }
            
            
        }  
        return arr;
}



function jeansByProductAttributeLoad( _saleType, _attribute_1, _attribute_2){
   let _attributeTemp = ["All"];
    let x;
    if (_saleType === "Any"){
        x =  jeansByProductAttribute("gender", _attribute_1);
    }
    else{
        x = jeansBySaletype( jeansByProductAttribute("gender", _attribute_1), _saleType);
    }
    for(let i = 0; i< x.length; i++){
            _attributeTemp.push(x[i].getAttribute(_attribute_2));
    }
    return Array.from(new Set(_attributeTemp))
}
    

    
function listWise(_arr, _sale, _gender, _attribute){
    let _text = "";
    let _href = "href='product.html' ";

    for(let i =0; i<_arr.length; i++){
        
        let _onclick; 
        if(_attribute ==="category"){
         _onclick = "onclick=\"filter(\'"+_gender +"\', \'"+_sale+"\', \'"+ _arr[i] +"\'"    +    ", \'All\')\""; 
        }
        else{
         _onclick = "onclick=\"filter(\'"+_gender +"\', \'"+_sale+"\'," + "\'All\',"  + "\'"+ _arr[i] + "\'"    +    ")\""; 

        }
    
        _text += "<li> <a " +_href +_onclick+" >" + _arr[i] + "</a></li>";
    }
    return _text;
}



function loadNav(){
    
    //New in
    let _arr = jeansByProductAttributeLoad("New in", "women", "category");
    $("#women_new_in_category").append(listWise(_arr, "New in", "women", "category" ));
    $("#mob-new-in-women-category").append(listWise(_arr, "New in", "women", "category" ));
    
     _arr = jeansByProductAttributeLoad("New in", "women", "brand");
    $("#women_new_in_brand").append(listWise(_arr, "New in", "women", "brand"));
    $("#mob-new-in-women-brand").append(listWise(_arr, "New in", "women", "brand"));
    
     _arr = jeansByProductAttributeLoad("New in", "men", "category");
    $("#men_new_in_category").append(listWise(_arr, "New in", "men", "category"));
    $("#mob-new-in-men-category").append(listWise(_arr, "New in", "men", "category"));
    
     _arr = jeansByProductAttributeLoad("New in", "men", "brand");
    $("#men_new_in_brand").append(listWise(_arr, "New in", "men", "brand"));    
    $("#mob-new-in-men-brand").append(listWise(_arr, "New in", "men", "brand"));    
    
    
    
    //On sale
     _arr = jeansByProductAttributeLoad("On sale", "women", "category");
    $("#women_on_sale_category").append(listWise(_arr, "On sale", "women", "category"));
    $("#mob-on-sale-women-category").append(listWise(_arr, "On sale", "women", "category"));
    
     _arr = jeansByProductAttributeLoad("On sale", "women", "brand");
    $("#women_on_sale_brand").append(listWise(_arr, "On sale", "women", "brand"));    
    $("#mob-on-sale-women-brand").append(listWise(_arr, "On sale", "women", "brand"));    
    
     _arr = jeansByProductAttributeLoad("On sale", "men", "category");
    $("#men_on_sale_category").append(listWise(_arr,"On sale", "men", "category"));
    $("#mob-on-sale-men-category").append(listWise(_arr,"On sale", "men", "category"));
    
     _arr = jeansByProductAttributeLoad("On sale", "men", "brand");
    $("#men_on_sale_brand").append(listWise(_arr,"On sale", "men", "brand"));
    $("#mob-on-sale-men-brand").append(listWise(_arr,"On sale", "men", "brand"));
    
    //Men    
     _arr = jeansByProductAttributeLoad("Any", "men", "category");
    $("#men_all_category").append(listWise(_arr, "Any", "men", "category"));
    $("#mob-all-men-category").append(listWise(_arr, "Any", "men", "category"));
    
    
     _arr = jeansByProductAttributeLoad("Any", "men", "brand");
    $("#men_all_brand").append(listWise(_arr,"Any", "men", "brand"));     
    $("#mob-all-men-brand").append(listWise(_arr,"Any", "men", "brand"));     
    
    
    //Women    
     _arr = jeansByProductAttributeLoad("Any", "women", "category");
    $("#women_all_category").append(listWise(_arr,"Any", "women", "category"));
        $("#mob-all-women-category").append(listWise(_arr, "Any", "women", "category"));

     _arr = jeansByProductAttributeLoad("Any", "women", "brand");
    $("#women_all_brand").append(listWise(_arr, "Any", "women", "brand")); 
    $("#mob-all-women-brand").append(listWise(_arr, "Any", "women", "category"));

    
    
    //cart-item-length;
    let _cart = JSON.parse(localStorage.getItem("cart"));
    if(_cart !== null){
        $("#cart_item").text(_cart.length);
        $("#cart_item_1").text(_cart.length);
        
    }
    
    let _cuurency = JSON.parse(localStorage.getItem("currency"));
    
    if(_cuurency !== null){
        $("#currency").text(_cuurency);
        $("#currency-1").text(_cuurency);
    }
    
               
}

///Sliding function
// param-1: _slideshowID => refer to the slide show container
// param-2: _sliding => this variable is responsible for quiting the recursive call
// param-3: _startIndex +> this is variable to indicate the starting slide.
//           Also help to bind event for dots button which take to the respective slide. 
// Param-4: _timeOut helps to slide through after a given time out. 
function slideShow(_slideShowID, _sliding, _startIndex, _timeOut){
    //decalaring all variable
    let  _slides, _slide_circale, i;
    
    //query up all the slide under given slide ID.
    _slides = $(_slideShowID + " .slide");
    // query up dots container.
    _slide_circale = $("#circular_block_list");
    //Making sure that  dots container is empty. if not it will ever appending.
    _slide_circale.text("");
    //Creates dots as per number of avialable slide under given slide container
    for( i=0; i<_slides.length; i++){
        //make sure all the slide are hidden;
        _slides[i].style.display = "none";
        //add new div element, these divs are already styled in the CSS file.
        let x = document.createElement("Div");   
        //Adding dots in dots container
        _slide_circale.append(x);
    }
    //onces dots are created. now time to add event to each dots that the slected slide can be available once clicked.
    //query up all the dots
     let _dots =  $("#circular_block_list div");
    for(let j =0; j<_dots.length; j++){
        //ading click event to each dots
        $(_dots[j]).on ("click", function(){
            //the statement has a great role to stop recursive function which is on going.
            //if we do not stop the previous recursive call then function will run parallel each time we click the dots.
            //as result the sliding time will become messy.
            _sliding= false;
            //the new recusive function will call and the respective slide will be appear
            slideShow(_slideShowID, true, j, _timeOut);
        })
    }
    //making sure that slides are based on 1 not 0; 
    _startIndex++;
    //making sure that _Startindex doesnot cross the  slide length.
    if(_startIndex> _slides.length ){
        _startIndex =1;
        
    }
    //this statment make sure only selected slide appear;
    _slides[_startIndex -1 ].style.display = "block";
    //make sure seleted dot is filled with black bg color
    $(_slide_circale).children()[_startIndex-1].style.backgroundColor ="black";
    
    //This is the core of this function. it make sure that slide changes after a given amount of time (milliseconds)
     setTimeout(()=>{
      //make only one recursive funcion works at a time
        if(_sliding){
            //slide to the next slide, as slide index already increade before.
             slideShow(_slideShowID, _sliding, _startIndex, _timeOut);
        }
       //respponsible for change call the function after the given time.
    }, _timeOut);
    

}



// Para-1: A list of product that need to be displayed.
// para-2: Id, under which the product will be displayed.
// para-3: column type such as col-2, col-3, col-4 or col-5
function productDisplay(_arr, _id, _columnType){
        
    //declareing all the necessary variable
     let _row_product, i, _column, _block, _block_img, _images, _pic, j, _number_of_image, _img,
         _sale_type, _icon_1, _paragraph, _sale, _icon_2, _block_details, _name_div, _name, _div_row , _div_shop, _icon_3, 
         _div_price, _price;
    // creating a div with css class "row" and "product.
    //This is the container where all the product block will be displayed. 
    _row_product = document.createElement("div");
    $(_row_product).addClass("row");
    $(_row_product).addClass("product");
    
    
    //iterating the griven prouduct array.
    for(i =0; i< _arr.length; i++){
        
        //creating the column under which product will be displayed
        
        //column(col-*//////////////////////////////////////////////
        _column = document.createElement("div");
        $(_column).addClass(_columnType);
        
         
        //column(col-*)//////////////////////////////////////////////
        /////////////// block////////////////////////////////////////
        _block = document.createElement("div");
        $(_block).addClass("block");
        
        
        ///column(col-*)//////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-img///////////////////////////////
        _block_img = document.createElement("div");
        $(_block_img).addClass("block-img");
        
        
        //column(col-*)///////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-img///////////////////////////////
        ////////////////////////////////img///////////////////////////
        
        //Add image to the block
        // only two picture will be addd in the block
        //Geting data from data source
        _images = _arr[i].getElementsByTagName("pic");
        //make sure that only two pictre added to the block.
        _number_of_image = _images.length >1 ? 2: _images.length;
        for(j =0; j< _number_of_image; j++){
            _img = '<img src=' + _images[j].childNodes[0].nodeValue + '>'
            $(_block_img).append(_img);
        }
        if(_images.length ===1){
             _img = '<img src=' + _images[0].childNodes[0].nodeValue + '>'
            $(_block_img).append(_img);
        }
        
        ////////////////////////////////End:img///////////////////////
        //////////////////////block-img///////////////////////////////
        /////////////// block/////////////////////////////////////////
         //column(col-*)//////////////////////////////////////////////
  
        //column(col-*)///////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-img///////////////////////////////
        ////////////////////////////////sale-type/////////////////////
                
        _sale_type = document.createElement("div");
        $(_sale_type).addClass("sale-type");
        
        
        //column(col-*)///////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-img///////////////////////////////
        ////////////////////////////////sale-type/////////////////////
        //////////////////////////////////////////i:heart/////////////
         _icon_1 = document.createElement("i");
        $(_icon_1).addClass("fa");
        $(_icon_1).addClass("fa-heart");
        $(_icon_1).attr("onclick", "savedAsFavourite( '" + _arr[i].getAttribute("id") + "')");

        $(_sale_type).append(_icon_1);
        //////////////////////////////////////////////End: i:heart////
        ////////////////////////////////End:Sale-type/////////////////
        //////////////////////block-img///////////////////////////////
        /////////////// block/////////////////////////////////////////
        //column(col-*)///////////////////////////////////////////////  
        
        
        //column(col-*)///////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-img///////////////////////////////
        ////////////////////////////////sale-type/////////////////////
        //////////////////////////////////////////sale////////////////
        _paragraph = document.createElement("p");
        
        $(_paragraph).addClass("sale")
        _sale =_arr[i].getElementsByTagName("sale");

        $(_paragraph).text(_sale[0].childNodes[0].nodeValue)
        
        if(_sale[0].childNodes[0].nodeValue.toLowerCase() === "on sale"){
            $(_paragraph).css("background-color", "red");
        }
        else if(_sale[0].childNodes[0].nodeValue.toLowerCase() === "regular"){
            $(_paragraph).css("display", "none");

        }
        
        $(_sale_type).append(_paragraph);
        //////////////////////////////////////////////End: sale///////
        ////////////////////////////////End:Sale-type/////////////////
        //////////////////////block-img///////////////////////////////
        /////////////// block/////////////////////////////////////////
        //column(col-*)///////////////////////////////////////////////  
        
        //column(col-*)///////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-img///////////////////////////////
        ////////////////////////////////sale-type/////////////////////
        //////////////////////////////////////////i:heart/////////////
         _icon_2 = document.createElement("i");
        $(_icon_2).addClass("fa");
        $(_icon_2).addClass("fa-expand");
        $(_icon_2).attr("onclick", "productDisplayById( '" + _arr[i].getAttribute("id") + "')");
        
      
        $(_sale_type).append(_icon_2);
        
        //////////////////////////////////////////////End: i:heart////
        ////////////////////////////////End:Sale-type/////////////////
        //////////////////////block-img///////////////////////////////
        /////////////// block/////////////////////////////////////////
        //column(col-*)///////////////////////////////////////////////
        
        $(_block_img).append (_sale_type);
        ////////////////////////////////End:Sale-type/////////////////
        //////////////////////block-img///////////////////////////////
        /////////////// block/////////////////////////////////////////
         //column(col-*)//////////////////////////////////////////////
        
        $(_block).append(_block_img);
        //////////////////////End:block-img//////////////////////////
        //////////////// block///////////////////////////////////////
        //column (col-*)/////////////////////////////////////////////

        
        
        
        
        
        ///column(col-*)//////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-details///////////////////////////
        _block_details = document.createElement("div");
        $(_block_details).addClass("block-details");
        
        ///column(col-*)//////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-details///////////////////////////
        ////////////////////////////////////names/////////////////////
         _name_div = document.createElement("div");
        $(_name_div).addClass("names");
        
        _name = _arr[i].getElementsByTagName("name");
        $(_name_div).text(_name[0].childNodes[0].nodeValue);
        
        $(_block_details).append(_name_div);
        
        ////////////////////////////////////////End:names////////////
        //////////////////////block-details//////////////////////////
        //////////////// block///////////////////////////////////////
        //column (col-*)/////////////////////////////////////////////
        
        
        
        ///column(col-*)//////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-details///////////////////////////
        ////////////////////////////////////row///////////////////////
        _div_row = document.createElement("div");
        $(_div_row).addClass("row");
        
        ///column(col-*)//////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-details///////////////////////////
        ////////////////////////////////////row///////////////////////
        ////////////////////////////////////////shop//////////////////
         _div_shop = document.createElement("div");
        $(_div_shop).addClass("shop");
        
        _icon_3 = document.createElement("i");
        $(_icon_3).addClass("fa");
        $(_icon_3).addClass("fa-shopping-cart");
        $(_icon_3).attr("onclick", "productDisplayById( '" + _arr[i].getAttribute("id") + "')");

        $(_div_shop).append(_icon_3);
        $(_div_row).append(_div_shop);
        ///////////////////////////////////////End:shop//////////////
        ////////////////////////////////////row//////////////////////
        //////////////////////block-details//////////////////////////
        //////////////// block///////////////////////////////////////
        //column (col-*)/////////////////////////////////////////////
        
             
        ///column(col-*)//////////////////////////////////////////////
        /////////////// block/////////////////////////////////////////
        //////////////////////block-details///////////////////////////
        ////////////////////////////////////row///////////////////////
        ////////////////////////////////////////price/////////////////
        _div_price = document.createElement("div");
        $(_div_price).addClass("price");
        
        _price = _arr[i].getElementsByTagName("price");
        $(_div_price).text(_price[0].childNodes[0].nodeValue);
        
        $(_div_row).append(_div_price);
        ///////////////////////////////////////End:pice//////////////
        ////////////////////////////////////row//////////////////////
        //////////////////////block-details//////////////////////////
        //////////////// block///////////////////////////////////////
        //column (col-*)/////////////////////////////////////////////
        
          $(_block_details).append(_div_row);
        ////////////////////////////////////End:row//////////////////
        //////////////////////block-details//////////////////////////
        //////////////// block///////////////////////////////////////
        //column (col-*)/////////////////////////////////////////////
        
        $(_block).append(_block_details);     
        //////////////////////End:block-details//////////////////////
        //////////////// block///////////////////////////////////////
        //column (col-*)/////////////////////////////////////////////
        
        $(_column).append(_block);
        ///////////////End:block/////////////////////////////////////
        //column(col-*)//////////////////////////////////////////////
        
        _row_product.append(_column);
        //End : column(col-*)////////////////////////////////////////
        
        
    }
    
    $(_id).append(_row_product);
  
}




////Productdisplay by id
let _currentImage =0;
function productDisplayById(_id){
    let _product, _gender, _category, _brand, _name, _price, _sale, _image, _fabric, _size, _color ;
    _currentImage =0;
    $("#selectedSize").val = 0;
    //redaing data from the xml file
    _product = _xmlDoc.getElementById(_id);
    _gender = _product.getAttribute("gender");
    _category = _product.getAttribute("category");
    _brand = _product.getAttribute("brand");
    _name = _product.getElementsByTagName("name");
    _price = _product.getElementsByTagName("price");
    _sale = _product.getElementsByTagName("sale");
    _image = _product.getElementsByTagName("pic");
    _fabric = _product.getElementsByTagName("type");
    _size = _product.getElementsByTagName("size");
    _color= _product.getElementsByTagName("available");
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////Product review/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //creating product review block
    //product-review->--------------------------------------------------------------------------------------------------------------------------------------------------//
    let div_product_review = document.createElement("div");
    $(div_product_review).addClass("product-review");
    
    
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////container/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->--------------------------------------------------------------------------------------------------------------------------------------//
    let div_container = document.createElement("div");
    $(div_container).addClass("container");
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////Cloase-windeow////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->close-windeow->-----------------------------------------------------------------------------------------------------------------------//
    let div_close_window = document.createElement("div");
    $(div_close_window).addClass("close-window");
    div_close_window.addEventListener("click", function(){
        $(div_product_review).toggle();
   
    })
    //product-review->container->close-windeow->i->--------------------------------------------------------------------------------------------------------------------//
    let i_fa_window_close = document.createElement("i");
    $(i_fa_window_close).addClass("fa");
    $(i_fa_window_close).addClass("fa-window-close");
    $(div_close_window).append(i_fa_window_close);
    //product-review<-container<-close-windeow<-i<--------------------------------------------------------------------------------------------------------------------//
    $(div_container).append(div_close_window);
    //product-review<-container<-close-windeow-<-----------------------------------------------------------------------------------------------------------------------//
    
    
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////Product Name//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->name->--------------------------------------------------------------------------------------------------------------------------------//
    let div_name = document.createElement("div");
    $(div_name).addClass("names");
    $(div_name).text(_name[0].childNodes[0].nodeValue);
    $(div_container).append(div_name);
    //product-review<-container<-name<---------------------------------------------------------------------------------------------------------------------------------//

    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////Main-row//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->row->---------------------------------------------------------------------------------------------------------------------------------//
    let div_row = document.createElement("div");
    $(div_row).addClass("row");
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////Main-coloumn -left/////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-1->--------------------------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_1 = document.createElement("div");
    $(div_row_col_2_nth_1).addClass("col-2");
    //product-review->container->row->col-2:nth-1->content->-----------------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_1_content = document.createElement("div");
    $(div_row_col_2_nth_1_content).addClass("content");
    //product-review->container->row->col-2:nth-1->content->row->------------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_1_content_row = document.createElement("div");
    $(div_row_col_2_nth_1_content_row).addClass("row");
    
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////Main-column-left: Big image block////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-1->content->row->col-1->-----------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_1_content_row_col_1_nth_1 = document.createElement("div");
    $(div_row_col_2_nth_1_content_row_col_1_nth_1).addClass("col-1");
    //product-review->container->row->col-2:nth-1->content->row->col-1->content->--------------------------------------------------------------------------------------//
    let div_row_col_2_nth_1_content_row_col_1_nth_1_content = document.createElement("div");
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content).addClass("content");
    //product-review->container->row->col-2:nth-1->content->row->col-1->content->row->---------------------------------------------------------------------------------//
    let div_row_col_2_nth_1_content_row_col_1_nth_1_content_row = document.createElement("div");
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row).addClass("row");
    
    //product-review->container->row->col-2:nth-1->content->row->col-1->content->row->col-3:nth-1->--------------------------------------------------------------------//
    let div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_1 = document.createElement("div");
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_1).addClass("col-3");
    let _previous = document.createElement("div")
    $(_previous).addClass("back-forth");
    _previous.setAttribute("id", "previous");
    let _previous_icon = document.createElement("i");
    $(_previous_icon).addClass("fa");
    $(_previous_icon).addClass("fa-chevron-left");
    $(_previous).append(_previous_icon);
    _previous.addEventListener("click", function(){
        if(_currentImage == 0){
            _currentImage =_image.length;
        }
         _currentImage--;
           let _big_img_block = $(".container .row .col-2:nth-of-type(1) .content .row .col-1 .content .row .col-3:nth-of-type(2)");
            $(_big_img_block).text("");
        $(_big_img_block).append('<img src='+_image[_currentImage].childNodes[0].nodeValue+'>');
    

        
    });
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_1).append(_previous);
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row).append(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_1);
    //product-review<-container<-row<-col-2:nth-1<-content<-row<-col-1<-content<-row<-col-3:nth-1----------------------------------------------------------------------//
    
    //product-review->container->row->col-2:nth-1->content->row->col-1->content->row->col-3:nth-2->--------------------------------------------------------------------//
    let div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_2 = document.createElement("div");
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_2).addClass("col-3");
    let _img_big = '<img src=' + _image[0].childNodes[0].nodeValue + '>';
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_2).append(_img_big);
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row).append(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_2);
    //product-review<-container<-row<-col-2:nth-1<-content<-row<-col-1<-content<-row<-col-3:nth-2----------------------------------------------------------------------//
       
    //product-review->container->row->col-2:nth-1->content->row->col-1->content->row->col-3:nth-3->--------------------------------------------------------------------//
    let div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_3 = document.createElement("div");
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_3).addClass("col-3");
    let _next = document.createElement("div")
    $(_next).addClass("back-forth");
    _next.setAttribute("id", "next");
    let _next_icon = document.createElement("i");
    $(_next_icon).addClass("fa");
    $(_next_icon).addClass("fa-chevron-right");
    $(_next).append(_next_icon);
    _next.addEventListener("click", function(){
        if(_currentImage == _image.length-1){
            _currentImage =-1;
        }
       _currentImage++;
           let _big_img_block = $(".container .row .col-2:nth-of-type(1) .content .row .col-1 .content .row .col-3:nth-of-type(2)");
            $(_big_img_block).text("");
        $(_big_img_block).append('<img src='+_image[_currentImage].childNodes[0].nodeValue+'>');

        
    });
    
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_3).append(_next);
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row).append(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row_col_3_nth_3);
    //product-review<-container<-row<-col-2:nth-1<-content<-row<-col-1<-content<-row<-col-3:nth-3-----------------------------------------------------------------------//
    
    $(div_row_col_2_nth_1_content_row_col_1_nth_1_content).append(div_row_col_2_nth_1_content_row_col_1_nth_1_content_row);
    //product-review<-container<-row<-col-2:nth-1<-content<-row<-col-1<-content<-row<-----------------------------------------------------------------------------------//
    $(div_row_col_2_nth_1_content_row_col_1_nth_1).append(div_row_col_2_nth_1_content_row_col_1_nth_1_content);
    //product-review<-container<-row<-col-2:nth-1<-content<-row<-col-1<-content<----------------------------------------------------------------------------------------//
    $(div_row_col_2_nth_1_content_row).append(div_row_col_2_nth_1_content_row_col_1_nth_1);
    //product-review<-container<-row<-col-2:nth-1<-content<-row<-col-1<-------------------------------------------------------------------------------------------------//
    
    
    
        
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////Main-column-left: Small image block///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-1->content->row->col-1:nth-2->--------------------------------------------------------------------------------------//
    let div_row_col_2_nth_1_content_row_col_1_nth_2 = document.createElement("div");
    $(div_row_col_2_nth_1_content_row_col_1_nth_2).addClass("col-1");
    //product-review->container->row->col-2:nth-1->content->row->col-1:nth-2->content<------------------------------------------------------------------------------//
    let div_row_col_2_nth_1_content_row_col_1_nth_2_content = document.createElement("div");
    $(div_row_col_2_nth_1_content_row_col_1_nth_2_content).addClass("content");
    //product-review->container->row->col-2:nth-1->content->row->col-1:nth-2->content<-row<-------------------------------------------------------------------------//
    let div_row_col_2_nth_1_content_row_col_1_nth_2_content_row = document.createElement("div");
    $(div_row_col_2_nth_1_content_row_col_1_nth_2_content_row).addClass("row");
    //////////small-imge//////////////
    let i ;
    for(i=0; i<_image.length; i++){
        let _col_5 = document.createElement("div");
        $(_col_5).addClass("col-5");
        let _col_5_content =document.createElement("div");
        $(_col_5_content).addClass("content");
         let _small_img = '<img src=' + _image[i].childNodes[0].nodeValue + '>';
        $(_col_5_content).append(_small_img);
        $(_col_5).append(_col_5_content);
        
        _col_5.addEventListener("click", function(){
            let _big_img_block = $(".container .row .col-2:nth-of-type(1) .content .row .col-1 .content .row .col-3:nth-of-type(2) img");
            $(_big_img_block).attr("src" , $(_small_img).attr("src"));
        

        });
       
        $(div_row_col_2_nth_1_content_row_col_1_nth_2_content_row).append(_col_5);
    }
    $(div_row_col_2_nth_1_content_row_col_1_nth_2_content).append(div_row_col_2_nth_1_content_row_col_1_nth_2_content_row);
    //product-review<-container<-row<-col-2:nth-1<-content<-row<-col-1:nth-2<-content<-row<-------------------------------------------------------------------------//
    $(div_row_col_2_nth_1_content_row_col_1_nth_2).append(div_row_col_2_nth_1_content_row_col_1_nth_2_content);
    //product-review<-container<-row<-col-2:nth-1<-content<-row<-col-1:nth-2<-content<------------------------------------------------------------------------------//
    $(div_row_col_2_nth_1_content_row).append(div_row_col_2_nth_1_content_row_col_1_nth_2);
    //product-review<-container<-row<-col-2:nth-1<-content<-row<-col-1:nth-2<---------------------------------------------------------------------------------------//
    
    
    
    $(div_row_col_2_nth_1_content).append(div_row_col_2_nth_1_content_row);
    //product-review<-container<-row<-col-2:nth-1<-content<-row<---------------------------------------------------------------------------------------------------//
    $(div_row_col_2_nth_1).append(div_row_col_2_nth_1_content);
    //product-review<-container<-row<-col-2:nth-1<-content<--------------------------------------------------------------------------------------------------------//
    $(div_row).append(div_row_col_2_nth_1);
    //product-review<-container<-row<-col-2:nthe-1<----------------------------------------------------------------------------------------------------------------//
    
    
    
    
    
    
    
        
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////Main-coloumn -right//////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //product-review->container->row->col-2:nth-2->-----------------------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2 = document.createElement("div");
    $(div_row_col_2_nth_2).addClass("col-2");
     //product-review->container->row->col-2:nth-2->content->-------------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content = document.createElement("div");
    $(div_row_col_2_nth_2_content).addClass("content");
    
    
        
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////Main-coloumn -right(row-wise)////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    /////////////////////////////////////Main-coloumn -right(row-1)///////////////////////////////////////////////////////////////////////////////////////////////////

    //product-review->container->row->col-2:nth-2->content->row-1->--------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_1 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_1).addClass("row");
    //product-review->container->row->col-2:nth-2->content->row->col-2-1---------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_1_col_2_1 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_1_col_2_1).addClass("col-2");
    $(div_row_col_2_nth_2_content_row_1_col_2_1).text("Price")
    $(div_row_col_2_nth_2_content_row_1).append(div_row_col_2_nth_2_content_row_1_col_2_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row<-col-2-1<-------------------------------------------------------------------------------------------//   
    
    //product-review->container->row->col-2:nth-2->content->row->col-2-1---------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_1_col_2_2 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_1_col_2_2).addClass("col-2");
    $(div_row_col_2_nth_2_content_row_1_col_2_2).text("$ " +_price[0].childNodes[0].nodeValue)
    $(div_row_col_2_nth_2_content_row_1).append(div_row_col_2_nth_2_content_row_1_col_2_2);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row<-col-2-1<-------------------------------------------------------------------------------------------//
    $(div_row_col_2_nth_2_content).append(div_row_col_2_nth_2_content_row_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-1---------------------------------------------------------------------------------------------------//
        
    
    
    
    /////////////////////////////////////Main-coloumn -right(row-2)///////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-2->content->row-2->--------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_2 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_2).addClass("row");
    //product-review->container->row->col-2:nth-2->content->row-2->col-2-1-------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_2_col_2_1 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_2_col_2_1).addClass("col-2");
    $(div_row_col_2_nth_2_content_row_2_col_2_1).text("Sale")
    $(div_row_col_2_nth_2_content_row_2).append(div_row_col_2_nth_2_content_row_2_col_2_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row<-col-2-1<-------------------------------------------------------------------------------------------//   
    
    //product-review->container->row->col-2:nth-2->content->row->col-2-1---------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_2_col_2_2 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_2_col_2_2).addClass("col-2");
    $(div_row_col_2_nth_2_content_row_2_col_2_2).text(_sale[0].childNodes[0].nodeValue)
    $(div_row_col_2_nth_2_content_row_2).append(div_row_col_2_nth_2_content_row_2_col_2_2);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row<-col-2-1<-------------------------------------------------------------------------------------------//
    $(div_row_col_2_nth_2_content).append(div_row_col_2_nth_2_content_row_2);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-2---------------------------------------------------------------------------------------------------//    
    
    
    
    /////////////////////////////////////Main-coloumn -right(row-3)////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-2->content->row-3->--------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_3 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_3).addClass("row");
    //product-review->container->row->col-2:nth-2->content->row-3->col-2-1-------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_3_col_2_1 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_3_col_2_1).addClass("col-2");
    $(div_row_col_2_nth_2_content_row_3_col_2_1).text("Fit-type")
    $(div_row_col_2_nth_2_content_row_3).append(div_row_col_2_nth_2_content_row_3_col_2_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-3<-col-2-1<------------------------------------------------------------------------------------------//   
    
    //product-review->container->row->col-2:nth-2->content->row-3->col-2-1--------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_3_col_2_2 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_3_col_2_2).addClass("col-2");
    $(div_row_col_2_nth_2_content_row_3_col_2_2).text(_category)
    $(div_row_col_2_nth_2_content_row_3).append(div_row_col_2_nth_2_content_row_3_col_2_2);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-3<-col-2-1<-------------------------------------------------------------------------------------------//
    $(div_row_col_2_nth_2_content).append(div_row_col_2_nth_2_content_row_3);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-3-----------------------------------------------------------------------------------------------------//
    
    
    
    /////////////////////////////////////Main-coloumn -right(row-4)/////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-2->content->row-4->----------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_4 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_4).addClass("row");
    //product-review->container->row->col-2:nth-2->content->row-4->col-2-1---------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_4_col_2_1 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_4_col_2_1).addClass("col-2");
    $(div_row_col_2_nth_2_content_row_4_col_2_1).text("Brand")
    $(div_row_col_2_nth_2_content_row_4).append(div_row_col_2_nth_2_content_row_4_col_2_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-4<-col-2-1<-------------------------------------------------------------------------------------------//   
    
    //product-review->container->row->col-2:nth-2->content->row-4->col-2-1---------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_4_col_2_2 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_4_col_2_2).addClass("col-2");
    $(div_row_col_2_nth_2_content_row_4_col_2_2).text(_brand)
    $(div_row_col_2_nth_2_content_row_4).append(div_row_col_2_nth_2_content_row_4_col_2_2);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-4<-col-2-1<-------------------------------------------------------------------------------------------//
    $(div_row_col_2_nth_2_content).append(div_row_col_2_nth_2_content_row_4);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-4-----------------------------------------------------------------------------------------------------//
    
        
    
    /////////////////////////////////////Main-coloumn -right(row-5)/////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-2->content->row-5->----------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_5 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_5).addClass("row");
    //product-review->container->row->col-2:nth-2->content->row-5->col-2-1---------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_5_col_2_1 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_5_col_2_1).addClass("col-2");
    $(div_row_col_2_nth_2_content_row_5_col_2_1).text("Fabric")
    $(div_row_col_2_nth_2_content_row_5).append(div_row_col_2_nth_2_content_row_5_col_2_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-5<-col-2-1<-------------------------------------------------------------------------------------------//   
    
    //product-review->container->row->col-2:nth-2->content->row-5->col-2-1---------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_5_col_2_2 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_5_col_2_2).addClass("col-2");
     let _ul =document.createElement("ul");
    for(let j = 0; j<_fabric.length; j++){
        let _li = document.createElement("li");
        $(_li).text(_fabric[j].childNodes[0].nodeValue);
        $(_ul).append(_li);
    }
    $(div_row_col_2_nth_2_content_row_5_col_2_2).append(_ul);
    $(div_row_col_2_nth_2_content_row_5).append(div_row_col_2_nth_2_content_row_5_col_2_2);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-5<-col-2-1<--------------------------------------------------------------------------------------------//
    $(div_row_col_2_nth_2_content).append(div_row_col_2_nth_2_content_row_5);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-5------------------------------------------------------------------------------------------------------//
    
    
    
        
    
    
    /////////////////////////////////////Main-coloumn -right(row-6)///////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-2->content->row-6->-----------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_6 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_6).addClass("row");
    //product-review->container->row->col-2:nth-2->content->row-6->col-2-1----------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_6_col_2_1 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_6_col_2_1).addClass("col-2");
    $(div_row_col_2_nth_2_content_row_6_col_2_1).text("Colors")
    $(div_row_col_2_nth_2_content_row_6).append(div_row_col_2_nth_2_content_row_6_col_2_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-6<-col-2-1<--------------------------------------------------------------------------------------------//   
    
    //product-review->container->row->col-2:nth-2->content->row-6->col-2-1----------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_6_col_2_2 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_6_col_2_2).addClass("col-2");
    let _img_color = '<img src='+_color[0].childNodes[0].nodeValue + '>';
    $(div_row_col_2_nth_2_content_row_6_col_2_2).append(_img_color);
    $(div_row_col_2_nth_2_content_row_6).append(div_row_col_2_nth_2_content_row_6_col_2_2);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-6<-col-2-1<--------------------------------------------------------------------------------------------//
    $(div_row_col_2_nth_2_content).append(div_row_col_2_nth_2_content_row_6);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-6<-----------------------------------------------------------------------------------------------------//        
    
    
    
    
    
    /////////////////////////////////////Main-coloumn -right(row-7)////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-2->content->row-7->-----------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_7 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_7).addClass("row");
    //product-review->container->row->col-2:nth-2->content->row-7->col-1-1----------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_7_col_1_1 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_7_col_1_1).addClass("col-1");
    
    /////////////////////////////////////Main-coloumn -right(row-7)-form////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-2->content->row-7->col-2-1->form>---------------------------------------------------------------------------------------//
    let _form = document.createElement("div"); //the origianl element was form. it has been edited on purpose
    $(_form).attr("id", "form" + _id);
    //$(_form).attr("name", "shoppingCartForm");
   // $(_form).attr("onclick", "shoppingCartFormSubmit()");
    let _input_1 = document.createElement("input");
    $(_input_1).attr("name", "ID");
    $(_input_1).attr("type", "text");
    $(_input_1).attr("value", _id);
    $(_input_1).attr( "type", "hidden" );
    $(_form).append(_input_1);
    //product-review->container->row->col-2:nth-2->content->row-7->col-2-1->form>row-1----------------------------------------------------------------------------------//
    let _form_row_1 = document.createElement("div");
    $(_form_row_1).addClass("row");
    //product-review->container->row->col-2:nth-2->content->row-7->col-2-1->form>row-1-> col-2-1->----------------------------------------------------------------------//
    let _form_row_1_col_2_1 = document.createElement("div");
    $(_form_row_1_col_2_1).addClass("col-2");
    $(_form_row_1_col_2_1).text("Size");
    $(_form_row_1).append(_form_row_1_col_2_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<-col-1-1<-form<-row-1<-col-2-1<----------------------------------------------------------------------//  
    
    
    //product-review->container->row->col-2:nth-2->content->row-7->col-2-1->form>row-1-> col-2-2->----------------------------------------------------------------------//
    let _form_row_1_col_2_2 = document.createElement("div");
    $(_form_row_1_col_2_2).addClass("col-2");
    //product-review->container->row->col-2:nth-2->content->row-7->col-2-1->form>row-1-> col-2-2->select->--------------------------------------------------------------//
    let _form_row_1_col_2_2_select = document.createElement("select");
    //product-review->container->row->col-2:nth-2->content->row-7->col-2-1->form>row-1-> col-2-2->select->option->------------------------------------------------------//
    let _top_option = document.createElement("option");
    $(_top_option).attr("value", "Select a size");
    $(_top_option).text("Select a size");
    $(_form_row_1_col_2_2_select).append(_top_option);

    
        for(let k =0; k<_size.length; k++){
            let _measurement = _size[k].getElementsByTagName("measurement");
            let _quantity = _size[k].getElementsByTagName("quantity");
            let _option = document.createElement("option");
            $(_option).attr("value", _measurement[0].childNodes[0].nodeValue);
            $(_option).text("size-"+_measurement[0].childNodes[0].nodeValue + "  ----- (" + _quantity[0].childNodes[0].nodeValue + ")");
            if(_quantity[0].childNodes[0].nodeValue.toLowerCase() === "out of stock"){
                $(_option).attr("disabled", "disabled");
            }
            $(_form_row_1_col_2_2_select).append(_option);
        }
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<-col-1-1<-form<-row-1<-col-2-1<-select<-option<------------------------------------------------------//
    $(_form_row_1_col_2_2).append(_form_row_1_col_2_2_select);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<-col-1-1<-form<-row-1<-col-2-1<-select<--------------------------------------------------------------//
    let _form_row_1_col_2_2_a = document.createElement("a");
    $(_form_row_1_col_2_2_a).text("Size guide");
    $(_form_row_1_col_2_2_a).attr("onclick", "displySizeGuide('"+_gender.toString()+"')");
    $(_form_row_1_col_2_2).append(_form_row_1_col_2_2_a);

    
    $(_form_row_1).append(_form_row_1_col_2_2);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<-col-1-1<-form<-row-1<-col-2-1<----------------------------------------------------------------------//
    $(_form).append(_form_row_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<-col-1-1<-form<-row-1--------------------------------------------------------------------------------//   

    
    
    //product-review->container->row->col-2:nth-2->content->row-7->col-2-1->form>row-2->--------------------------------------------------------------------------------//
    let _form_row_2 = document.createElement("div");
    $(_form_row_2).addClass("row");
    //product-review->container->row->col-2:nth-2->content->row-7->col-2-1->form>row-2->col-1->-------------------------------------------------------------------------//
    let _form_row_2_col_1 = document.createElement("div");
    $(_form_row_2_col_1).addClass("col-1");
           //product-review->container->row->col-2:nth-2->content->row-7->col-2-1->form>row-2->col-1->button------------------------------------------------------------//
    let _form_row_2_col_1_button = document.createElement("button");
    $(_form_row_2_col_1_button).attr("onclick", "shoppingCartFormSubmit(" + "'"+_id +"'" +")")
    let _cart_icon = document.createElement('i');
    $(_cart_icon).addClass("fa");
    $(_cart_icon).addClass("fa-shopping-cart");
    $(_form_row_2_col_1_button).append(_cart_icon);
    $(_form_row_2_col_1_button).append("Add to Cart");
    
    $(_form_row_2_col_1).append(_form_row_2_col_1_button)
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<-col-1-1<-form<-row-2<-col-1<-buttion<---------------------------------------------------------------//  
    $(_form_row_2).append(_form_row_2_col_1)
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<-col-1-1<-form<-row-2<-col-1<------------------------------------------------------------------------//  
    $(_form).append(_form_row_2)
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<-col-1-1<-form<-row-2<-------------------------------------------------------------------------------//   

    
    
    
    $(div_row_col_2_nth_2_content_row_7_col_1_1).append(_form);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<-col-1-1<-form<---------------------------------------------------------------------------------------//   
    $(div_row_col_2_nth_2_content_row_7).append(div_row_col_2_nth_2_content_row_7_col_1_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<-col-1-1<---------------------------------------------------------------------------------------------//   
    $(div_row_col_2_nth_2_content).append(div_row_col_2_nth_2_content_row_7);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-7<------------------------------------------------------------------------------------------------------//
    
    
    
    
    /////////////////////////////////////Main-coloumn -right(row-8)////////////////////////////////////////////////////////////////////////////////////////////////////////
    //product-review->container->row->col-2:nth-2->content->row-8->------------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_8 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_8).addClass("row");
    //product-review->container->row->col-2:nth-2->content->row-8->col-1-------------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_8_col_1 = document.createElement("div");
    $(div_row_col_2_nth_2_content_row_8_col_1).addClass("col-1");
        //product-review->container->row->col-2:nth-2->content->row-8->col-1-a--------------------------------------------------------------------------------------------//
    let div_row_col_2_nth_2_content_row_8_col_1_a = document.createElement("a");
    $(div_row_col_2_nth_2_content_row_8_col_1_a).text("Save as favourite");
    $(div_row_col_2_nth_2_content_row_8_col_1_a).attr("onclick", "savedAsFavourite( '" + _id + "')");

    $(div_row_col_2_nth_2_content_row_8_col_1).append(div_row_col_2_nth_2_content_row_8_col_1_a);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-8<-col-1<-a<---------------------------------------------------------------------------------------------//  
    $(div_row_col_2_nth_2_content_row_8).append(div_row_col_2_nth_2_content_row_8_col_1);
    //product-review<-container<-row<-col-2:nthe-1<-content<-row-8<-col-1<------------------------------------------------------------------------------------------------//   
    $(div_row_col_2_nth_2_content).append(div_row_col_2_nth_2_content_row_8);
    //product-review<-container<-row<-col-2:nthe-2<-content<-row-8<-------------------------------------------------------------------------------------------------------//

    
    
    
    
    
    
    
    
    
    $(div_row_col_2_nth_2).append(div_row_col_2_nth_2_content);
    //product-review<-container<-row<-col-2:nthe-1<-content<---------------------------------------------------------------------------------------------------------------//
    $(div_row).append(div_row_col_2_nth_2);
    //product-review<-container<-row<-col-2:nthe-1<------------------------------------------------------------------------------------------------------------------------//
    $(div_container).append(div_row);
    //product-review<-container<-row<--------------------------------------------------------------------------------------------------------------------------------------//
    $(div_product_review).append(div_container);
    //product-review<-container-<------------------------------------------------------------------------------------------------------------------------------------------//    
    $("body").append(div_product_review);
    //product-review<------------------------------------------------------------------------------------------------------------------------------------------------------//    
}

function displayProductSizeWarning(){
    let _product_size_warning = document.createElement("div");
    $(_product_size_warning).addClass("product-size-warning");
     let _product_review = document.createElement("div");
    $(_product_review).addClass("product-review");
    let _product_review_container = document.createElement("div");
    $(_product_review_container).addClass("container");
    
    let _product_review_container_close_window = document.createElement("div");
    $(_product_review_container_close_window).addClass("close-window");
    let _product_review_container_close_window_i = document.createElement("i");
    _product_review_container_close_window_i.addEventListener("click", function(){
          $(_product_size_warning).toggle(); 
    });
    $(_product_review_container_close_window_i).addClass("fa");
    $(_product_review_container_close_window_i).addClass("fa-window-close");
    $(_product_review_container_close_window).append(_product_review_container_close_window_i);
    
    
    
    
    
    let _product_review_container_row = document.createElement("div");
    $(_product_review_container_row).addClass("row");
    
    
    let _product_review_container_row_col_2_1 = document.createElement("div");
    $(_product_review_container_row_col_2_1).addClass("col-2");
    let _product_review_container_row_col_2_1_img = document.createElement("img");
    $(_product_review_container_row_col_2_1_img).attr("src", "image/topbanner/logo.jpg");
    $(_product_review_container_row_col_2_1).append(_product_review_container_row_col_2_1_img);
    $(_product_review_container_row).append(_product_review_container_row_col_2_1);
   
    let _product_review_container_row_col_2_2 = document.createElement("div");
    $(_product_review_container_row_col_2_2).addClass("col-2");
    let _product_review_container_row_col_2_2_warning = document.createElement("div");
    $(_product_review_container_row_col_2_2_warning).addClass("warning");
    $(_product_review_container_row_col_2_2_warning).append("Jeans size matter!");
    $(_product_review_container_row_col_2_2).append(_product_review_container_row_col_2_2_warning);
        let _product_review_container_row_col_2_2_warning_1 = document.createElement("div");
    $(_product_review_container_row_col_2_2_warning_1).addClass("warning");
    $(_product_review_container_row_col_2_2_warning_1).append("Please select your jeans size");
    $(_product_review_container_row_col_2_2).append(_product_review_container_row_col_2_2_warning_1);
        
    let _product_review_container_row_col_2_2_button = document.createElement("button");
    $(_product_review_container_row_col_2_2_button).text("OK");
    _product_review_container_row_col_2_2_button.addEventListener("click", function(){
                 $(_product_size_warning).toggle(); 
    });
    $(_product_review_container_row_col_2_2).append(_product_review_container_row_col_2_2_button);
    
    
    $(_product_review_container_row).append(_product_review_container_row_col_2_2);
    
    $(_product_review_container).append(_product_review_container_row);
    
    
    
    $(_product_review_container).append(_product_review_container_close_window);
    $(_product_review).append(_product_review_container);
    $(_product_size_warning).append(_product_review);
    $("body").append(_product_size_warning);
}

function shoppingCartFormSubmit(_id) {
    let _select = $("#form" +_id + " select");
    let _lastChild = _select.length == 1 ? 0 :_select.length -1;
    if($(_select[_lastChild]).val() === "Select a size" ){
        displayProductSizeWarning();
    }
    else{
        addToShoppingCart(_id, $(_select[_lastChild]).val(), 1);
        displayMessage("Your selected item has beed added to the shopping cart successfully.")
    }
    
    
   
}




function product (_id, _size, _quantity){
    this.ID = _id;
    this.SIZE = _size;
    this.QUANTITY = _quantity;
}

function addToShoppingCart(_id, _size, _quantity){
    let _cartItem;
    if(localStorage.getItem("cart") === null){
       _cartItem = new Array(); 
        _cartItem.push(new product(_id, _size, _quantity));
    }
    else{
        _cartItem = JSON.parse(localStorage.getItem("cart"));
        let _existed = false;
        for(let i =0; i<_cartItem.length; i++){
            if((_cartItem[i].ID === _id) && (_cartItem[i].SIZE === _size )){
                _cartItem[i].QUANTITY += _quantity;
                _existed = true;
            }
        }
        if(!_existed){
            _cartItem.push(new product(_id, _size, _quantity));
        }
    }
    
        $("#cart_item").text(_cartItem.length);
        $("#cart_item_1").text(_cartItem.length);

    localStorage.setItem("cart", JSON.stringify(_cartItem));
    read();
}

function savedAsFavourite(_id){
    let _savedItem;
    if(localStorage.getItem("saved") === null){
       _savedItem = new Array(); 
        _savedItem.push(_id);
    }
    else{
        _savedItem = JSON.parse(localStorage.getItem("saved"));
        let _existed = false;
        for(let i =0; i<_savedItem.length; i++){
            if(_savedItem[i] === _id){
                _existed = true;
                            displayMessage("Your selected item already saved as a favourite item.")

            }
        }
        if(!_existed){
            _savedItem.push(_id);
            displayMessage("Your selected item has been saved as a favourite item.")
        }
    }
    

    localStorage.setItem("saved", JSON.stringify(_savedItem));
    readSavedItem();
}

function readSavedItem(){
     let _temp = JSON.parse(localStorage.getItem("saved"));
               $("#saved-items-area").text("");
       if(_temp !== null){
           let _arr = [];
            for(let i =0; i<_temp.length; i++){
                let product = _xmlDoc.getElementById(_temp[i]);
                _arr.push(product);
            } 
           console.log(_arr);
           
           productDisplay(_arr, "#saved-items-area", "col-5");
           
           if(_temp.length> 0){
             $(".clear").css("display", "block");
           }
           else{
               $("#saved-items-area").append("<h3>Currently, you have no saved item.</h3>");
           }
           
       } 
     else{
               $("#saved-items-area").append("<h3>Currently, you have no saved item.</h3>");
           }
   
}

function clearSavedItem(){
    let _temp = JSON.parse(localStorage.getItem("saved"));
    
    if(_temp !== null){
        for(let i =0; i<_temp.length; i++){
            _temp.slice(i, 1);
        }
        console.log(_temp);
        $("#saved-items-area").text("");
        localStorage.setItem("saved", JSON.stringify(new Array()));
        $(".clear").css("display", "none");
        
       readSavedItem();

    }

}

function read(){
    let _temp = JSON.parse(localStorage.getItem("cart"));
    if(_temp !==null){
         for(let i =0; i<_temp.length; i++){
        console.log(_temp[i]);
    } 
    }
   
}



function womenIndexProduct(){
    let _arr = new Array();
    _arr[0] = _xmlDoc.getElementById("w1005");
    _arr[1] = _xmlDoc.getElementById("w1010");
    _arr[2] = _xmlDoc.getElementById("w1019");
    _arr[3] = _xmlDoc.getElementById("w1020");
    _arr[4] = _xmlDoc.getElementById("w1051");
     productDisplay(_arr, "#women-index-page", "col-5");

}

function menIndexProduct(){
    let _arr = new Array();
    _arr[0] = _xmlDoc.getElementById("m2005");
    _arr[1] = _xmlDoc.getElementById("m2010");
    _arr[2] = _xmlDoc.getElementById("m2019");
    _arr[3] = _xmlDoc.getElementById("m2020");
    _arr[4] = _xmlDoc.getElementById("m2051");
     productDisplay(_arr, "#men-index-page", "col-5");

}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////Product.index////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkBoxClickEvent(_id){
    let _checkBoxes = $(_id + " input[type='checkbox']");
    if(_checkBoxes[0].checked){
        for(let i =1; i<_checkBoxes.length; i++){
            _checkBoxes[i].checked = true;
        }
    }
    else{
          for(let i =0; i<_checkBoxes.length; i++){
            _checkBoxes[i].checked = false;
        }
    }
}
function rangeClickEvent(){
    let _min = $("#filter-price input[type='range']:nth-of-type(1)").val();
    let _max =  $("#filter-price input[type='range']:nth-of-type(2)").val();
    $("#min-price").text(_min);
    $("#max-price").text(_max );
}

function filter(_gender, _sale, _category, _brand){
    let _arr = [];
    _arr.push(_gender);
    _arr.push(_sale);
    _arr.push(_category);
    _arr.push(_brand);

    localStorage.setItem("filter", JSON.stringify(_arr));

}
function loading(){
    let _arr = JSON.parse(localStorage.getItem("filter"));
    filterload(_arr[0], _arr[1], _arr[2], _arr[3]);
    _arr=[];
    
}

let _productDoc;
function filterload( _gender, _sale,  _category, _brand){

    let _arr = jeansByProductAttribute("gender", _gender);
    
    if(_sale !== "Any"){
        _arr = jeansBySaletype(_arr, _sale);
    }
    
    filterOptionLoad(_arr, "#filter-category", "category", _category);
    filterOptionLoad(_arr, "#filter-brand", "brand", _brand);
    //holds ond all the product selected by gender and sale(Because we want to filter all the product in future)
      _productDoc = _arr;
    //the min and max price will be loaded based on (gender and sale)
    filterOptionPriceLoad(_arr);
    //page will be load without price filtering
    
    applyFilter(false);
  
    ///banner(heading image will change based on given parameter)
    bannerLoad(_gender, _sale);
    
    ///info-bar
    $("#sale-info").text(_sale);
    $("#gender-info").text(_gender);
    infoBarLoad();
 
}

function filterOptionLoad( _arr, _ele_id, _filter_option, _selected0ption ){
    $(_ele_id).text("");
    let _temp =["All"];
    
    for(let i=0; i<_arr.length; i++){
        _temp.push(_arr[i].getAttribute(_filter_option));
    }
    
    let _options = Array.from(new Set(_temp));
    let _content, _input, _label;
    
    for(let j =0; j<_options.length; j++){
        _content = document.createElement("div");
        $(_content).addClass("content");
        _input = document.createElement("input");
        $(_input).attr("type", "checkbox");
        $(_input).attr("name", "available-"+ _filter_option);
        $(_input).attr("value", _options[j]);
        if(j === 0){
            $(_input).attr("onclick", "checkBoxClickEvent('" +_ele_id+"')");
        }
        if(_options[j] === _selected0ption){
            _input.checked = true;
        }
        $(_content).append(_input);
        
        _label = document.createElement("label");
        $(_label).text(_options[j]);
        $(_content).append(_label);
        
        $(_ele_id).append(_content);
    }
    _content = document.createElement("div");
    $(_content).addClass("content");
    let _a = document.createElement("a");
    $(_a).attr("onclick", "applyFilter(true)");
    $(_a).text("Apply Filter");
    $(_content).append(_a);
    $(_ele_id).append(_content);

    
    

}

function filterOptionPriceLoad(_arr){
    let _price_tag;
    let _min = 0.00;
    let _max =0.00;
    for(let i =0; i<_arr.length; i++){
        _price_tag =_arr[i].getElementsByTagName("price");
        if(i === 0){
            _min = parseFloat( _price_tag[0].childNodes[0].nodeValue);
            _max =  parseFloat( _price_tag[0].childNodes[0].nodeValue);

        }
        else{
            if(  parseFloat( _price_tag[0].childNodes[0].nodeValue) >= _max){
                _max =   parseFloat( _price_tag[0].childNodes[0].nodeValue);
            }
            if(  parseFloat( _price_tag[0].childNodes[0].nodeValue)<=_min){
                _min =  parseFloat( _price_tag[0].childNodes[0].nodeValue);
            
            }
        }
    }

    let _mid = (_max - _min)/2;

    let _mid_point =  _mid + _min;
    
    $("#range-min").attr("min", _min);
    $("#range-min").attr("max", _mid_point);
    $("#range-min").attr("value", _min);
    
    $("#range-max").attr("max", _max);
    $("#range-max").attr("min", _mid_point);
    $("#range-max").attr("value", _max );
    
    $("#min-price").text(_min);
    $("#max-price").text(_max);
    
    
    
}


function bannerLoad(_gender, _sale){
    if(_gender === "men" ){
        if(_sale === "New in"){
            $("#product-banner").css( "background-image", " url(image/topbanner/product-banner/MEN_NEW.jpg)");
        }
        else if(_sale === "On sale"){
            $("#product-banner").css( "background-image", " url(image/topbanner/product-banner/onsale-MEN-banner.jpg)");
        }
        else{
            $("#product-banner").css( "background-image", " url(image/topbanner/product-banner/MEN-ALL.jpg)");
        }
    }
    else if(_gender === "women"){
        if(_sale === "New in"){
            $("#product-banner").css( "background-image", " url(image/topbanner/product-banner/WOMEN-NEW.jpg)");

        }
        else if(_sale === "On sale"){
            $("#product-banner").css( "background-image", " url(image/topbanner/product-banner/onsale-banner.jpg)");
        }
        else{
            $("#product-banner").css( "background-image", " url(image/topbanner/product-banner/WOMEN-ALL.jpg)");
        }
    }
    
}
function infoBarLoad(){
    let _category = $("#filter-category input[type='checkbox']");
    let _categpry_text = []
    
    for(let i =0; i<_category.length; i++){
        if(_category[i].checked){
            if(_category[i] === "All"){
                _categpry_text.push("All");
                break;
            }
            else{
                _categpry_text.push(_category[i].value+"  ")
            }
        }
    }
    
    let _brand = $("#filter-brand input[type='checkbox']");
    let _brand_text =[];
    
    for(let i =0; i<_brand.length; i++){
        if(_brand[i].checked){
            if(_brand[i] === "All"){
                _brand_text.push("All");
                break;
            }
            else{
                
                _brand_text.push(_brand[i].value+" ");
            }
        }
    }
    
    $("#fit-type-info").text(_categpry_text.toString());
    $("#brand-info").text(_brand_text);
    
    
}

function selectedOptions(_id){
        let _selected = $(_id + " input[type='checkbox']");
        let _arr=[];
        if(_selected[0].checked){
            for(let i =1; i<_selected.length; i++){
                _arr.push(_selected[i].value);
                 if(_selected[i].checked){
                     _selected[i].checked = false;
                }
            }
        }
        else{
             for(let i =1; i<_selected.length; i++){
                if(_selected[i].checked){
                 _arr.push(_selected[i].value)
                }
            }
        }
   // console.log(_arr);
    if(_arr.length === 0){
         for(let i =1; i<_selected.length; i++){
                _arr.push(_selected[i].value);
            }
        _selected[0].checked = true;
    }
       
    return _arr;
}

function isSelected(_arr, _value){
    for(let i= 0; i<_arr.length; i++){
        if(_arr[i] === _value){
            return true;
        }
    }
    return false;
}

function applyFilter(_priceFilter){
    let _seletedCategory = selectedOptions("#filter-category");
    let _selectedBrand = selectedOptions("#filter-brand");
    let _selectdMinPrice = parseFloat( $("#min-price").text());
    let _selectdMaxPrice = parseFloat( $("#max-price").text());
   let _filtered =[];
    for(let i=0; i< _productDoc.length; i++){
        let category = _productDoc[i].getAttribute("category");
        let brand = _productDoc[i].getAttribute("brand");
        let priceTag = _productDoc[i].getElementsByTagName("price");
        let price = parseFloat(priceTag[0].childNodes[0].nodeValue);

        if((isSelected(_seletedCategory, category)) && (isSelected(_selectedBrand, brand))){
            if(_priceFilter){
                
                if((price <=_selectdMaxPrice ) && (price >= _selectdMinPrice)){
                    _filtered.push(_productDoc[i]);
                    
                }
            }
            else{
                _filtered.push(_productDoc[i]);
            }
        }
    }
    infoBarLoad();
    $("#product-output").text("");
    productDisplay(_filtered, "#product-output", "col-4")
    if((_priceFilter) && (window.innerHeight < 1049)){
        
        expandFilterClick();
    }

    
}





///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Shopping-cart//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////


function loadCartItem(){
    
    let _cart_content = document.createElement("div");
    $(_cart_content).addClass("cart");
    $(_cart_content).addClass("content");
    
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////Cart-heading/////////////////////////////////////
    let _cart_heading = document.createElement("div");
    $(_cart_heading).addClass("cart-heading");
    
    let _cart_heading_img = document.createElement("img");
    $(_cart_heading_img).attr("src", "image/topbanner/top-jeans-cart-header.jpg");
    $(_cart_heading).append(_cart_heading_img);

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////Cart-heading-row//////////////////////////////////
    let _cart_heading_row = document.createElement("div");
    $(_cart_heading_row).addClass("row");
    
    let _cart_heading_row_col_2_1 = document.createElement("div");
    $(_cart_heading_row_col_2_1).addClass("col-2");
    let _cart_heading_row_col_2_1_i = document.createElement("i");
    $(_cart_heading_row_col_2_1_i).addClass("fa");
    $(_cart_heading_row_col_2_1_i).addClass("fa-shopping-cart");
    $(_cart_heading_row_col_2_1).append(_cart_heading_row_col_2_1_i);
    $(_cart_heading_row_col_2_1).append("Your Items");
    $(_cart_heading_row).append(_cart_heading_row_col_2_1);
    
    let _cart_heading_row_col_2_2 = document.createElement("div");
    $(_cart_heading_row_col_2_2).addClass("col-2");
    $(_cart_heading_row_col_2_2).append("$ ");
    let _cart_heading_row_col_2_2_span = document.createElement("span");
    $(_cart_heading_row_col_2_2_span).addClass("item-price");
    $(_cart_heading_row_col_2_2_span).attr("id","cart-value");
    $(_cart_heading_row_col_2_2).append(_cart_heading_row_col_2_2_span);
    $(_cart_heading_row).append(_cart_heading_row_col_2_2);
    
    
    
    $(_cart_heading).append(_cart_heading_row);
    $(_cart_content).append(_cart_heading);


     ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////Cart-Items/////////////////////////////////
    
    let _cart_items = document.createElement("div");
    $(_cart_items).addClass("row");
    $(_cart_items).addClass("cart-items");
    
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////each-item/////////////////////////////////
    
    let _data = JSON.parse( localStorage.getItem("cart"));
    let _sub_total = 0.00;
    if(_data !== null){
        
        for(let i = 0; i<_data.length; i++){
            let _product = _xmlDoc.getElementById(_data[i].ID);
            let _price = _product.getElementsByTagName("price");
            let _unitprice = parseFloat(_price[0].childNodes[0].nodeValue );
            let discounted_price = (_unitprice /100) * 70; //30% discount
            let _sale = _product.getElementsByTagName("sale");
            let _final_price;
            if(_sale[0].childNodes[0].nodeValue === "On sale"){
                _final_price = discounted_price * _data[i].QUANTITY;
            }
            else{
                _final_price = _unitprice * _data[i].QUANTITY;
            }
            
            _sub_total += _final_price;
            

            let _col_1 = document.createElement("div");
            $(_col_1).addClass("col-1");
            $(_col_1).attr("id", "content-" + _product.getAttribute("id"));
            let _content = document.createElement("div");
            $(_content).addClass("content");
            let _content_i = document.createElement("i");
            $(_content_i).addClass("fa");
            $(_content_i).addClass("fa-arrow-circle-down");
            $(_content_i).addClass("cart-item-collapse");
            $(_content_i).attr("onclick", "displayDetails(this)");
            $(_content).append(_content_i);

            let _content_h3 = document.createElement("h3");
            let _produt_name = _product.getElementsByTagName("name");
            $(_content_h3).append(_produt_name[0].childNodes[0].nodeValue);
            $(_content).append(_content_h3);
            
            let _item_price = document.createElement("div");
            $(_item_price).addClass("item-price");
            $(_item_price).append(_final_price.toFixed(2));
            
            $(_content).append(_item_price);
            
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////cart-items: row//////////////////////////////////////////////////////////////////
            
            let _row  = document.createElement("div");
            $(_row).addClass("row");
            ///////////////////////col-5-1//////////////////////////////////////////////////////////////////
            let _col_5_1 = document.createElement("div");
            $(_col_5_1).addClass("col-5");
            $(_col_5_1).addClass("img-content");
            let _img  = "<img src=";
             let _imgtag = _product.getElementsByTagName("pic");
            _img += _imgtag[0].childNodes[0].nodeValue +">";
            $(_col_5_1).append(_img);
            $(_row).append(_col_5_1);
            
            ///////////////////////col-5-2//////////////////////////////////////////////////////////////////
            let _col_5_2 = document.createElement("div");
            $(_col_5_2).addClass("col-5");
            
            let _col_5_2_p = document.createElement("p");
            let _fit_type = _product.getAttribute("category");
            $(_col_5_2_p).append("<span>Fit Type</span>: <span>" +_fit_type + "</span>");
            $(_col_5_2).append(_col_5_2_p);
            
             _col_5_2_p = document.createElement("p");
            let _brand = _product.getAttribute("brand");
            $(_col_5_2_p).append("<span>Brand</span>: <span>" +_brand + "</span>");
            $(_col_5_2).append(_col_5_2_p); 
            
            
            _col_5_2_p = document.createElement("p");
            let _size = _data[i].SIZE;
            $(_col_5_2_p).append("<span>Size</span>: <span>" +_size + "</span>");
            $(_col_5_2).append(_col_5_2_p);  
            
            _col_5_2_p = document.createElement("p");

            
            $(_col_5_2_p).append("<span>Price</span>: <span>$" +_unitprice+ "</span>");
            $(_col_5_2).append(_col_5_2_p);
            $(_row).append(_col_5_2);
            
             ///////////////////////col-5-3//////////////////////////////////////////////////////////////////
            
            let _col_5_3 = document.createElement("div");
            $(_col_5_3).addClass("col-5");
            
            let _a = document.createElement("a");
            //$(_a).attr("onclick") need to add event here
            $(_a).append("Remove Item");
            $(_a).attr("onclick", "removeItem('"+ _product.getAttribute("id")+"')");
            $(_col_5_3).append(_a);      
            
            
             _a = document.createElement("a");
            //$(_a).attr("onclick") need to add event here
            $(_a).append("More Details");
            $(_a).attr("onclick", "productDisplayById('" +_product.getAttribute("id").toString() +"')");
            $(_col_5_3).append(_a);
            $(_row).append(_col_5_3);
            
            
            ///////////////////////col-5-4//////////////////////////////////////////////////////////////////
            let _col_5_4 = document.createElement("div");
            $(_col_5_4).addClass("col-5");
            let _col_5_4_i_1 = document.createElement("i");
            $(_col_5_4_i_1).addClass("fa");
            $(_col_5_4_i_1).addClass("fa-plus-circle");
            $(_col_5_4_i_1).attr("onclick", "increaseQuantity('"+_data[i].ID+"','" + _size+"')");
            $(_col_5_4).append(_col_5_4_i_1);
            
            let _col_5_4_span = document.createElement("span")
            $(_col_5_4_span).addClass("product-quantity");
            $(_col_5_4_span).append(_data[i].QUANTITY);
            
            $(_col_5_4).append(_col_5_4_span);
            
             _col_5_4_i_1 = document.createElement("i");
            $(_col_5_4_i_1).addClass("fa");
            $(_col_5_4_i_1).addClass("fa-minus-circle");
            $(_col_5_4_i_1).attr("onclick", "decreaseQuantity('"+_data[i].ID+"','" + _size+"')");

            $(_col_5_4).append(_col_5_4_i_1);
            $(_row).append(_col_5_4);
            
        ///////////////////////col-5-5//////////////////////////////////////////////////////////////////
            
            let _col_5_5 = document.createElement("div");
            $(_col_5_5).addClass("col-5");
        
               console.log(_sale[0].childNodes[0].nodeValue);
            if(_sale[0].childNodes[0].nodeValue === "On sale"){
                let _col_5_5_p = document.createElement("p");
                let _col_5_5_p_span = document.createElement("span");
                $(_col_5_5_p_span).append("$ "+_final_price.toFixed(2));
                $(_col_5_5_p).append(_col_5_5_p_span);
                $(_col_5_5).append(_col_5_5_p);
                $(_col_5_5).append("<p class='discount'>30% discount applied</p>");
            }
            else{
                let _col_5_5_p = document.createElement("p");
                let _col_5_5_p_span = document.createElement("span");
                $(_col_5_5_p_span).append("$ "+_final_price.toFixed(2));
                $(_col_5_5_p).append(_col_5_5_p_span);
                $(_col_5_5).append(_col_5_5_p);
            }
            
            $(_row).append(_col_5_5);
            
            $(_content).append(_row);


            $(_col_1).append(_content);
            $(_cart_items).append(_col_1);
            
        }
         if(_data.length === 0){
            let _wanrning_col_1 = document.createElement("div");
            $(_wanrning_col_1).addClass("col-1");
            $(_wanrning_col_1).append("<h2>Currently, there is no item in your shopping cart!</h2>");
            $(_cart_items).append(_wanrning_col_1);
        }
    }
     else{
        let _wanrning_col_1 = document.createElement("div");
        $(_wanrning_col_1).addClass("col-1");
        $(_wanrning_col_1).append("<h2>Currently, there is no item in your shopping cart!</h2>");
        $(_cart_items).append(_wanrning_col_1);
    }
   
    

    let _col_1 = document.createElement("div");
    $(_col_1).addClass("col-1");
    let _total = document.createElement("div");
    $(_total).addClass("sub-total");
    $(_total).append("Sub Total : $ ");
    
    let _total_span = document.createElement("span");
    $(_total_span).addClass("cart-value");
    $(_total_span).attr("id","cart-value-2");
    $(_total_span).append(_sub_total.toFixed(2));
    $(_total).append(_total_span);
    $(_col_1).append(_total);
    
    let _check_out = document.createElement("div");
    $(_check_out).addClass("check-out");
    _check_out.addEventListener("click", function(){
       displayMessage("The rest of the process has been blocked intentionally.<br> Thank you for staying with 'Top Jeans'.") 
    });
    let _check_out_a = document.createElement("a");
    $(_check_out_a).append("Check out");
    $(_check_out).append(_check_out_a);
    $(_col_1).append(_check_out);
    
    
    
    $(_cart_items).append(_col_1);
    $(_cart_heading_row_col_2_2_span).text(_sub_total.toFixed(2));

    $(_cart_content).append(_cart_items)
    return _cart_content;
    
}






function displayDetails( _ele){
    
    $(_ele).toggleClass("fa-arrow-circle-down");
    $(_ele).toggleClass("fa-arrow-circle-up");
    if(    $($(_ele).siblings()[2]).css("display") === "none"){
            $($(_ele).siblings()[2]).css("display", "flex");

    }
    else{
            $($(_ele).siblings()[2]).css("display", "none");

    }

}


function removeItem(_id){
    let _arr = JSON.parse(localStorage.getItem("cart"));
    let _sub_total=0.00;
    let _index;
    for(let i =0; i<_arr.length; i++){
        if(_arr[i].ID === _id){
            _index = i;
            $("#content-"+_id).toggle();
        }
        else{
            let _product = _xmlDoc.getElementById(_arr[i].ID);
            let sale = _product.getElementsByTagName("sale");
            let price_tag = _product.getElementsByTagName("price");
            let price = parseFloat(price_tag[0].childNodes[0].nodeValue);
            if(sale[0].childNodes[0].nodeValue == "On sale"){
                let discount_price = (price /100) * 70;
                _sub_total += discount_price * _arr[i].QUANTITY;
            }
            else{
                _sub_total += price * _arr[i].QUANTITY;
            }
        }
        
    }
    _arr.splice(_index, 1);

    $("#cart-value").text("");
    $("#cart-value").text(_sub_total.toFixed(2));
    $("#cart-value-2").text(_sub_total.toFixed(2));
    $("#cart_item").text(_arr.length);

    localStorage.setItem("cart", JSON.stringify(_arr));
}

function increaseQuantity( _id , _size){
    
    let _arr = JSON.parse(localStorage.getItem("cart"));
    let _sub_total = parseFloat( $("#cart-value").text());
    let _total_price = 0.00;

    if(_arr !== null){
        for(let i =0;  i<_arr.length; i++){
            if(_arr[i].ID === _id && _arr[i].SIZE === _size){
                _arr[i].QUANTITY += 1;
                let _product = _xmlDoc.getElementById(_id);
                let _pricetag = _product.getElementsByTagName("price");
                let _price = parseFloat(_pricetag[0].childNodes[0].nodeValue);
                let _final_price =0;
                let _sale = _product.getElementsByTagName("sale");
                if(_sale[0].childNodes[0].nodeValue === "On sale"){
                    _final_price = (_price/100) *70;
                }
                else{
                    _final_price = _price;
                }
                _total_price+= _final_price * _arr[i].QUANTITY;
                _sub_total += _final_price;
                 $("#cart-value").text(_sub_total.toFixed(2));
                 $("#cart-value-2").text(_sub_total.toFixed(2));
                 $("#content-" +_id + " .item-price").text( _total_price.toFixed(2));
                 $("#content-" +_id + " .col-5:nth-of-type(5) p span").text("$ " +_total_price.toFixed(2));
                 $("#content-" +_id + " .product-quantity").text(_arr[i].QUANTITY);
                break;
            }
        }
        
        localStorage.setItem("cart", JSON.stringify(_arr));
    }
}

function increaseQuantity( _id , _size){
    
    let _arr = JSON.parse(localStorage.getItem("cart"));
    let _sub_total = parseFloat( $("#cart-value").text());
    let _total_price = 0.00;

    if(_arr !== null){
        for(let i =0;  i<_arr.length; i++){
            if(_arr[i].ID === _id && _arr[i].SIZE === _size){
                _arr[i].QUANTITY += 1;
                let _product = _xmlDoc.getElementById(_id);
                let _pricetag = _product.getElementsByTagName("price");
                let _price = parseFloat(_pricetag[0].childNodes[0].nodeValue);
                let _final_price =0;
                let _sale = _product.getElementsByTagName("sale");
                if(_sale[0].childNodes[0].nodeValue === "On sale"){
                    _final_price = (_price/100) *70;
                }
                else{
                    _final_price = _price;
                }
                _total_price+= _final_price * _arr[i].QUANTITY;
                _sub_total += _final_price;
                 $("#cart-value").text(_sub_total.toFixed(2));
                 $("#cart-value-2").text(_sub_total.toFixed(2));
                 $("#content-" +_id + " .item-price").text( _total_price.toFixed(2));
                 $("#content-" +_id + " .col-5:nth-of-type(5) p span").text("$ " +_total_price.toFixed(2));
                 $("#content-" +_id + " .product-quantity").text(_arr[i].QUANTITY);
                break;
            }
        }
        
        localStorage.setItem("cart", JSON.stringify(_arr));
    }
}

function decreaseQuantity( _id , _size){
    
    let _arr = JSON.parse(localStorage.getItem("cart"));
    let _sub_total = parseFloat( $("#cart-value").text());
    let _total_price = 0.00;

    if(_arr !== null){
        for(let i =0;  i<_arr.length; i++){
            if(_arr[i].ID === _id && _arr[i].SIZE === _size){
                if(_arr[i].QUANTITY >1){
                    _arr[i].QUANTITY -= 1;
                    let _product = _xmlDoc.getElementById(_id);
                    let _pricetag = _product.getElementsByTagName("price");
                    let _price = parseFloat(_pricetag[0].childNodes[0].nodeValue);
                    let _final_price =0;
                    let _sale = _product.getElementsByTagName("sale");
                    if(_sale[0].childNodes[0].nodeValue === "On sale"){
                        _final_price = (_price/100) *70;
                    }
                    else{
                        _final_price = _price;
                    }
                    _total_price = _final_price * _arr[i].QUANTITY;
                    _sub_total -= _final_price;
                     $("#cart-value").text(_sub_total.toFixed(2));
                     $("#cart-value-2").text(_sub_total.toFixed(2));
                     $("#content-" +_id + " .item-price").text( _total_price.toFixed(2));
                     $("#content-" +_id + " .col-5:nth-of-type(5) p span").text("$ " +_total_price.toFixed(2));
                     $("#content-" +_id + " .product-quantity").text(_arr[i].QUANTITY);
                    break;
                }
                else{
                    alert("The selected product quantity can be less than 1.")
                }
               
            }
        }
        
        localStorage.setItem("cart", JSON.stringify(_arr));
    }
}



function displayMessage(_message){
    let _blur_background = document.createElement("div");
    $(_blur_background).addClass("blur-background");
    $(_blur_background).addClass("message");
    let _container = document.createElement("div");
    $(_container).addClass("container");
    let _close_window = document.createElement("div");
    $(_close_window).addClass("close-window");
    let _i = document.createElement("i");
    _i.addEventListener("click", function(){
       $(".message").hide(); 
    });
    $(_i).addClass("fa");
    $(_i).addClass("fa-window-close");
    $(_close_window).append(_i);
    $(_container).append(_close_window);
    
    let _content = document.createElement("div");
    $(_content).addClass("content");
    let _row = document.createElement("div");
    $(_row).addClass("row");
    let _col_2_1 = document.createElement("div");
    $(_col_2_1).addClass("col-2");
    let _img = document.createElement("img");
    $(_img).attr("src", "image/topbanner/logo.jpg");
    $(_col_2_1).append(_img);
    $(_row).append(_col_2_1);
    
    let _col_2_2 = document.createElement("div");
    $(_col_2_2).addClass("col-2");
    let _h3 = document.createElement("h3");
    $(_h3).append(_message);
    $(_col_2_2).append(_h3);
    $(_row).append(_col_2_2);
    
    $(_content).append(_row);
    
    let _a = document.createElement("a");
    _a.addEventListener("click", function(){
        $(".message").hide();  
    });
    $(_a).append("OK");
    $(_content).append(_a);
    $(_container).append(_content);
    
    $(_blur_background).append(_container);
    $("body").append(_blur_background);
}






/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////Size-guide/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function displayTable( _ele){
    
    $(_ele).toggleClass("fa-arrow-circle-down");
    $(_ele).toggleClass("fa-arrow-circle-up");
    if(    $($(_ele).siblings()[1]).css("display") === "none"){
            $($(_ele).siblings()[1]).css("display", "flex");

    }
    else{
            $($(_ele).siblings()[1]).css("display", "none");

    }

}

function displySizeGuide(_gender){
    let _size_guide = '<div class="blur-background size-guide"> '+
            '<div class="container"> '+
                '<div class="close-window"><i class="fa fa-window-close" onclick="closeSizeGuide()"></i> </div> '+
                '<div class="row"> '+
                 '   <div class="col-1"> '+
                  '      <div class="content"> '+
                   '         <div class="table-top-heading "> '+
                    '            <i class="fa fa-arrow-circle-down cart-item-collapse"  onclick="displayTable(this)"></i> '+
                     '           <h3>Women</h3> '+
                       '         <table> '+
                        '            <tr> '+
                         '               <th>Waist (inches)</th> '+
                          '              <th>23</th> '+
                           '             <th>24</th> '+
                            '            <th>25</th> '+
                             '           <th>26</th> '+
                              '          <th>27</th> '+
                               '         <th>28</th> '+
                                '        <th>29</th> '+
                                 '       <th>30</th> '+
                                  '      <th>31</th> '+
                                   '     <th>32</th> '+
                                    '    <th>34</th> '+
                                    '</tr> '+
                                    '<tr> '+
                                        '<td>Top Jeans</td> '+
                                        '<td></td> '+
                                        '<td>6</td> '+
                                '        <td>7</td> '+
                                 '       <td>8</td> '+
                                  '      <td>9</td> '+
                                   '     <td>10</td> '+
                                    '    <td>11</td> '+
                                     '   <td>12</td> '+
                                      '  <td>13</td> '+
                                       ' <td>14</td> '+
                                    '    <td>16</td> '+
                                    '</tr> '+
                                '    <tr> '+
                                 '       <td>Levi\'s</td> '+
                                  '      <td></td> '+
                                   '     <td>6</td> '+
                                    '    <td>7</td> '+
                                     '   <td>8</td> '+
                                      '  <td>9</td> '+
                                       ' <td>10</td> '+
                                    '    <td>11</td> '+
                                     '   <td>12</td> '+ 
                                      '  <td>13</td> '+
                                       ' <td>14</td> '+
                                    '    <td>16</td> '+
                                '    </tr> '+
                                 '   <tr> '+
                                  '      <td>Riders</td> '+
                                   '     <td></td> '+
                                    '    <td>6</td> '+
                                     '   <td>7</td> '+
                                      '  <td>8</td> '+
                                      '  <td>9</td> '+
                                       ' <td>10</td> '+
                                    '    <td>11</td> '+
                                     '   <td>12</td> '+
                                      '  <td>13</td> '+
                                       ' <td>14</td> '+
                                        '<td></td> '+
                            '        </tr> '+
                            '       <tr> '+
                            '            <td>Mavi</td> '+
                            '           <td></td> '+
                            '           <td>6</td> '+
                            '           <td>7</td> '+
                            '           <td>8</td> '+
                            '           <td>9</td> '+
                            '            <td>10</td> '+
                            '           <td>11</td> '+
                            '           <td>12</td> '+
                            '           <td>13</td> '+
                            '           <td>14</td> '+
                            '           <td></td> '+
                            '       </tr> '+
                            '       <tr> '+
                            '           <td>Calvin Klein Jeans</td> '+
                            '           <td></td> '+
                            '           <td>6</td> '+
                            '           <td>7</td> '+
                            '           <td>8</td> '+
                            '           <td>9</td> '+
                            '           <td>10</td> '+
                            '           <td>11</td> '+
                            '           <td>12</td> '+ 
                            '           <td>13</td> '+
                            '           <td>14</td> '+
                            '           <td></td> '+
                            '       </tr> '+
                            '       <tr> '+
                            '           <td>Guess</td> '+
                            '           <td></td> '+
                            '           <td>6</td> '+
                            '           <td>7</td> '+
                            '           <td>8</td> '+
                            '           <td>9</td> '+
                            '           <td>10</td> '+
                            '           <td>11</td> '+
                            '           <td>12</td> '+
                            '           <td>13</td> '+
                            '           <td>14</td> '+
                            '           <td></td> '+
                            '       </tr> '+
                            '       <tr> '+
                            '           <td>NYDJ(AU/US)</td> '+
                            '           <td>4/0</td> '+
                            '           <td>6/2</td> '+
                            '           <td></td> '+
                            '           <td>8/4</td> '+
                            '           <td></td> '+
                            '           <td>10/6</td> '+
                            '           <td></td> '+
                            '           <td>12/8</td> '+
                            '           <td></td> '+
                            '           <td>14/10</td> '+
                            '           <td>16/12</td> '+
                            '       </tr> '+
                            '   </table> '+
            '                </div> '+
            '           </div> '+
            '       </div> '+
            '       <div class="col-1"> '+
            '           <div class="content"> '+
            '               <div class="table-top-heading "> '+
            '                   <i class="fa fa-arrow-circle-down cart-item-collapse"  onclick="displayTable(this)"></i> '+
            '                   <h3>Men</h3> '+
            '                   <table> '+
            '                       <tr> '+
            '                           <th>Waist (inches)</th> '+
            '                           <th>28</th> '+
            '                           <th>29</th> '+
            '                           <th>30</th> '+
            '                           <th>31</th> '+
            '                           <th>32</th> '+ 
            '                           <th>33</th> '+
            '                           <th>34</th> '+
            '                           <th>36</th> '+
            '                           <th>38</th> '+
            '                           <th>40</th> '+
            '                           <th>42</th> '+
            '                       </tr> '+
            '                       <tr> '+
            '                           <td>Top Jeans</td> '+
            '                           <td>72</td> '+
            '                           <td></td> '+
            '                           <td>77</td> '+
            '                           <td></td> '+
            '                           <td>82</td> '+
            '                           <td>84</td> '+
            '                           <td>87</td> '+
            '                           <td>92</td> '+ 
            '                           <td>97</td> '+
            '                           <td>102</td> '+
            '                           <td>107</td> '+
            '                       </tr> '+
            '                        <tr> '+
            '                           <td>Levi\'s</td> '+
            '                           <td>72</td> '+
            '                           <td>74</td> '+
            '                           <td>76</td> '+
            '                           <td>78</td> '+
            '                           <td>82</td> '+
            '                           <td>84</td> '+
            '                           <td>86</td> '+
            '                           <td>92</td> '+
            '                           <td>97</td> '+
            '                           <td></td> '+
            '                           <td></td> '+
            '                       </tr> '+
            '                       <tr> '+
            '                           <td>Riders</td> '+
            '                           <td>72</td> '+
            '                           <td>74</td> '+
            '                           <td>76</td> '+
            '                           <td>78</td> '+
            '                           <td>82</td> '+
            '                           <td>84</td> '+
            '                           <td>86</td> '+
            '                           <td>92</td> '+
            '                           <td>97</td> '+
            '                           <td></td> '+
            '                           <td></td> '+
            '                       </tr> '+
            '                       <tr> '+
            '                           <td>Mavi</td> '+
            '                          <td>72</td> '+
            '                           <td>74</td> '+
            '                           <td>76</td> '+
            '                           <td>78</td> '+
            '                           <td>82</td> '+
            '                           <td>84</td> '+
            '                           <td>86</td> '+
            '                           <td>92</td> '+
            '                           <td>97</td> '+
            '                           <td></td> '+
            '                           <td></td> '+
            '                       </tr> '+
            '                       <tr> '+
            '                           <td>Calvin Klein Jeans</td> '+
            '                          <td>72</td> '+
            '                           <td>74</td> '+
            '                           <td>76</td> '+
            '                           <td>78</td> '+
            '                           <td>82</td> '+
            '                           <td>84</td> '+
            '                           <td>86</td> '+
            '                           <td>92</td> '+
            '                           <td>97</td> '+
            '                           <td></td> '+
            '                           <td></td> '+
            '                       </tr> '+
            '                   </table> '+
            '               </div> '+
            '           </div> '+
            '       </div> '+
            '   </div> '+
        '    </div>   '+
        '</div>';
    
        $("body").append(_size_guide);
    
    if(_gender === "women"){
        displayTable($(".size-guide .container .row .content i")[0]);
    }
    else{
        displayTable($(".size-guide .container .row .content i")[1]);

    }
}

function closeSizeGuide(){
    $(".size-guide").remove();
}




function resizeImage(){
    let _imges = $(".block .block-img img");
    for(let i =0; i<_imges.length; i++){
    //  $(_imges[i]).css("width", "300px");
        $(_imges[i]).css("height" , "450px");
        console.log(_imges[i].width);
    }
    console.log(_imges.length); 
}



///////////////////////////////changing currency/////////////////////////////////////
///////////////////////////////changing currency/////////////////////////////////////
///////////////////////////////changing currency/////////////////////////////////////


function changeCurrency(_currency){
    $("#currency").text(_currency);
    $("#currency-1").text(_currency);
    localStorage.setItem("currency", JSON.stringify(_currency));
 
                         
    console.log(localStorage.getItem("currency"));
       location.reload();
    
}




///////////////////////////////Stores/////////////////////////////////////
///////////////////////////////Stores/////////////////////////////////////
///////////////////////////////Stores/////////////////////////////////////

function initMap(){
    const location = {lat:-36.848401, lng:174.776235};
    const location_2 = {lat:-41.284377, lng:174.738309};
    const location_3 = {lat:-33.870507, lng:151.208718};
    const location_4 ={lat: -37.813194, lng:145.230222};

    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4.5,
        center: location,
    });
    
    const marker = new google.maps.Marker({
        position: location,
        map:map,
    }); 
    const marker_2 = new google.maps.Marker({
        position: location_2,
        map:map,
    });
    const marker_3 = new google.maps.Marker({
        position: location_3,
        map:map,
    });
    const marker_4 = new google.maps.Marker({
        position: location_4,
        map:map,
    });
}


/*-------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------*/
/*newsletter-------------------------------------------------------------------------------*/
function sendEmail(){
    let _email = $("footer form input[type='email']")
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(_email.val() ===''){
        displayMessage("Please enter your email address");
    }
    else if(!(_email.val().match(mailformat))){
        displayMessage("Please enter a valid email address");
    }
    else {
                window.open('mailto:rajibdey903584@gmail.com?subject=newsletterupdate&body='+_email.val());

    }

    }










function expandOption(_ele, _id){
    $(_id).toggle();
    $(_ele).toggleClass("fa-plus");
    $(_ele).toggleClass("fa-minus");
    let _navHeight = 120;
    let _navheight_per = ((120/window.innerHeight) *100).toFixed(2);
    let _body_height = window.innerHeight - _navHeight ; //120 == nav hegiht;
    let middle = 50.00 + parseFloat(_navheight_per);
    
     let x = $(".product-container .row .col-2:nth-of-type(1) .row");
    if(Math.round(x.height()) >= _body_height-60){
        $(x).css("max-height", _body_height-20 +"px");
        $(x).css("overflow-y", "scroll");
        $(x).css("top",  _navheight_per+ "%");
        $(x).css("transform", "translateY(-"+0 +"%)");
     
    }
    else{
                $(x).css("max-height", "auto");
                $(x).css("overflow-y", "auto");
                $(x).css("top", 50 +"%");
                $(x).css("transform", "translateY(-" + 50 +"%)");
             
    }
    console.log(Math.round(x.height()));
    console.log(_body_height);
}

function expandFilterClick(){
    let expandIcon =    $(".expand-filter");
    $(".expand-filter i ").toggleClass(" fa-angle-double-right");
    $(".expand-filter i ").toggleClass(" fa-angle-double-left");
    $(expandIcon).toggleClass("selected");
    $(".product-container .row .col-2:nth-of-type(1)").toggleClass("expand-filter-background");
  //  $(".product-container .row .col-2:nth-of-type(1) .row").toggle();
    $(".product-container .row .col-2:nth-of-type(1) .row").toggleClass("display-filter-option");
    console.log("clicked");
}





function expandNavOption(_ele, _id){
    $(_ele).toggleClass("fa-minus");
    $(_id).toggle();
    
    if($(".mobile-nav-content").height()< window.innerHeight-100){
        $(".mobile-nav-content").css("max-height", "auto");
        $(".mobile-nav-content").css("overflow", "hidden");
    }
    else{
        $(".mobile-nav-content").css("max-height", window.innerHeight-100);
        $(".mobile-nav-content").css("overflow-y", "scroll");

    }

}

function expandMobileNav(_ele, _id){
    $(_ele).toggleClass("fa-window-close");
    $(_id).toggle();
}


function footerOptionExpand(_ele){
    $(_ele).toggleClass("fa-minus")
    $($(_ele).parent().siblings()[1]).toggle();
    console.log($(_ele).parent().siblings());
}


$(window).on("load", function(){
   
    let body_container_height = $($(".body-container")[0]).height();
    let total_height = body_container_height;
    $($(".body-container")[0]).css("min-height", window.innerHeight - total_height);

  
    
});

/*
$(window).resize(function(){
    location.reload();
})
*/


loadXml();
setTimeout(()=>{
    //loadNav();
    // productDisplay(jeansByProductAttribute("gender", "women"), "#men-index-page", "col-5");
  //  productDisplayById("m2038");
    //displayProductSizeWarning();
    
   // add("m2010", 1);
  //addToShoppingCart("m2013", "size-6", 3)
// addToShoppingCart("m2014", "size-6", 3)
 //addToShoppingCart("m2015", "size-6", 3)
 //addToShoppingCart("w1068", "size-6", 3)
 
   // localStorage.clear();
      // read();
    readSavedItem();
    
    console.log(loadCartItem());

},1000);

function myfunction(){
  // console.log(_xmlDoc);
  //  console.log(jeansByAttributeLoad("category"));
   // console.log(jeansByAttributeLoad("brand"));
    localStorage.clear();
}
































/*

 function loadXmlData(){
    let _xhttp, _xmlDoc; ;
    if(window.XMLHttpRequest){
        _xhttp = new XMLHttpRequest();
    }
    else{
        _xhttp = new ActiveXObject("Microsoft.XMLHTTP");    
    }
    
    _xhttp.onreadystatechange = function(){
        if((this.readyState == 4) && (this.status == 200)){
            _xmlDoc = this.responseXML;
            
 
        }
    }
    
    _xhttp.open("GET", "jeans_store.xml", true);
    _xhttp.send();
     return new Promise(resolve => {
         setTimeout(()=>{
             resolve(_xmlDoc);
         },100);
     });
}

function asyncCall(){
    const result =  loadXmlData();
    // console.log(result);
    return result
}

let ss = loadXmlData();
console.log(ss);



*/