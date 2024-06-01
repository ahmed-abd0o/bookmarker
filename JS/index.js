var bookmarkName = document.querySelector("input#bookmarkName");
var siteUrl = document.querySelector("input#siteUrl");
var searchInput = document.querySelector("input#search");
var mainRow = document.querySelector("table tbody");
var submitButton = document.querySelector("button.btn-submit");
var updateButton2 = document.querySelector("button#update2");
var deleteButton = document.querySelector("button.btn-delete");
var closeButton = document.querySelector("button.btn-close");
var myAlert = document.querySelector(".myAlert");
var bookmarksList = [];



if (localStorage.getItem("palo") == null){
    bookmarksList = [];
}
else {
    bookmarksList = JSON.parse(localStorage.getItem("palo"))
    displayBookmarks(bookmarksList)
};

submitButton.addEventListener("click", bookmarkSubmit );

function bookmarkSubmit (){
    // if(nameValidation(bookmarkName) == false)
    //     {
    //         return myAlert.classList.toggle("d-none");
    //     }
    // else if (urlValidation(siteUrl) == false)
    //     {
    //         return myAlert.classList.toggle("d-none");
    //     }'
        if(validation() == true){
            var bookmarkObject = {
                name : bookmarkName.value,
                url : siteUrl.value
            }
            bookmarksList.push(bookmarkObject)
            displayBookmarks(bookmarksList)
        }

}


function nameValidation(x) {
    var nameRegex = /[a-zA-Z0-9]{3,}/;
    var testResult = nameRegex.test(x.value)
    if (testResult){
        if(x.classList.contains("is-invalid")){
            x.classList.replace("is-invalid","is-valid")
        }
        else{
            x.classList.add("is-valid")
        }
        return true ;
    }
    else {
        if(x.classList.contains("is-valid")){
            x.classList.replace("is-valid" , "is-invalid") ;
        }
        else if (!x.classList.contains("is-valid") && x.classList.contains("is-invalid") ){
            x.classList.add("is-invalid")
        }
        return false ;
    }
}
function urlValidation(x) {
    var urlRegex = /[a-zA-Z0-9].com$/i;
    var testResult = urlRegex.test(x.value)
    if (testResult){
        if(x.classList.contains("is-invalid")){
            x.classList.replace("is-invalid","is-valid")
        }
        else{
            x.classList.add("is-valid")
        }
        return true ;
    }
    else {
        if(x.classList.contains("is-valid")){
            x.classList.replace("is-valid" , "is-invalid") ;
        }
        else{
            x.classList.add("is-invalid")
        }
        return false ;
    }
}
function validation(){
    if(nameValidation(bookmarkName) == false)
        {
            return myAlert.classList.toggle("d-none");
        }
    else if (urlValidation(siteUrl) == false)
        {
            return myAlert.classList.toggle("d-none");
        }
    else{
        return true;
    }
}

bookmarkName.addEventListener("input",function(){
    nameValidation(bookmarkName)
})
siteUrl.addEventListener("input", function (){
    urlValidation(siteUrl)
})





function clearInputs() {
    bookmarkName.value = "";
    siteUrl.value = "";
    bookmarkName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid")
};

var cartona = "";
function displayBookmarks(x){
    cartona = "";
    for(var i = 0 ; i < x.length ; i++)
        {
            cartona+= `
            <tr class="align-middle">
                <td>${i+1}</td>
            <td>${x[i].name}</td>
            <td>
                <a class="btn btn-visit" href="${x[i].url}" target="_blank">
                    <i class="fa-solid fa-eye"></i>    
                    Visit
                </a>
            </td>
            <td>
                <button class="btn btn-delete" onclick="deleteBookmark(${i})">
                    <i class="fa-solid fa-trash"></i>    
                    Delete
                </button>
            </td>
            <td>
                <button class="btn btn-update " onclick="updateButton(${i})">
                    <i class="fa-solid fa-"></i>    
                    Update
                </button>
            </td>
            </tr>
            `
        }
            
    mainRow.innerHTML = cartona;
    localStorage.setItem("palo",JSON.stringify(x));
    clearInputs()
}


document.addEventListener("keydown",function(e){
    if(e.keyCode ==27){
    myAlert.classList.add("d-none")
        
    }
})





function deleteBookmark(idx){
    bookmarksList.splice(idx,1);
    localStorage.setItem("palo",JSON.stringify(bookmarksList));
    displayBookmarks(bookmarksList)
};

closeButton.addEventListener("click" , function(){
    myAlert.classList.toggle("d-none")
})

myAlert.addEventListener("click" , function(e){
    if( e.target.classList.contains("myAlert")){
        myAlert.classList.toggle("d-none")

    }
})

searchInput.addEventListener("input" , function(){
    var searchedBookmarks = [];
    for( var i = 0 ; i<bookmarksList.length ; i++){
        if(bookmarksList[i].name.includes(searchInput.value)){
            searchedBookmarks.push(bookmarksList[i]);
        }
    }
    displayBookmarks(searchedBookmarks);
})


updateButton2.addEventListener("click",function(){
    var updateIndex = Number(updateButton2.getAttribute("index"));
    if(validation() == true){

        bookmarksList[updateIndex].name = bookmarkName.value
        bookmarksList[updateIndex].url = siteUrl.value
        displayBookmarks(bookmarksList)
        console.log(Number(updateButton2.getAttribute("index")));
        updateButton2.classList.toggle("d-none")
        submitButton.classList.toggle("d-none")
    }
});


function updateButton(idx){
    
    bookmarkName.value = bookmarksList[idx].name;
    siteUrl.value = bookmarksList[idx].url
    updateButton2.setAttribute("index" , idx)

    updateButton2.classList.toggle("d-none")
    submitButton.classList.toggle("d-none")
}

