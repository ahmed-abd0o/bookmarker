var bookmarkName = document.querySelector("input#bookmarkName");
var siteUrl = document.querySelector("input#siteUrl");
var mainRow = document.querySelector("table tbody");
var submitButton = document.querySelector("button.btn-submit");
var deleteButton = document.querySelector("button.btn-delete");
var closeButton = document.querySelector("button.btn-close");
var myAlert = document.querySelector(".myAlert");
var bookmarksList = [];



if (localStorage.getItem("palo") == null){
    bookmarksList = [];
}
else {
    bookmarksList = JSON.parse(localStorage.getItem("palo"))
    displayBookmarks()
};

submitButton.addEventListener("click", bookmarkSubmit );



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


bookmarkName.addEventListener("input",function(){
    nameValidation(bookmarkName)
})
siteUrl.addEventListener("input", function (){
    urlValidation(siteUrl)
})



function bookmarkSubmit (){
    if(nameValidation(bookmarkName) == false)
        {
            return myAlert.classList.toggle("d-none");
        }
    else if (urlValidation(siteUrl) == false)
        {
            return myAlert.classList.toggle("d-none");
        }
        var bookmarkObject = {
            name : bookmarkName.value,
            url : siteUrl.value
        }
        bookmarksList.push(bookmarkObject)
        displayBookmarks()


}
var cartona = "";
function displayBookmarks(){
    cartona = "";
    for(var i = 0 ; i < bookmarksList.length ; i++)
        {
            console.log(i);
            cartona+= `
            <tr class="align-middle">
                <td>${i+1}</td>
            <td>${bookmarksList[i].name}</td>
            <td>
                <a class="btn btn-visit" href="${bookmarksList[i].url}" target="_blank">
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
            </tr>
            `
        }
            
    mainRow.innerHTML = cartona;
    localStorage.setItem("palo",JSON.stringify(bookmarksList));
    console.log(bookmarksList);
    console.log(JSON.parse(localStorage.getItem("palo")))
    clearInputs()
}
document.addEventListener("keydown",function(e){
    if(e.keyCode ==27){
    myAlert.classList.add("d-none")
        
    }
})


function clearInputs() {
    bookmarkName.value = "";
    siteUrl.value = "";
    bookmarkName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid")
};


function deleteBookmark(idx){
    bookmarksList.splice(idx,1);
    localStorage.setItem("palo",JSON.stringify(bookmarksList));
    displayBookmarks()
};

closeButton.addEventListener("click" , function(){
    myAlert.classList.toggle("d-none")
})

myAlert.addEventListener("click" , function(e){
    console.log(e.target);
    if( e.target.classList.contains("myAlert")){
        myAlert.classList.toggle("d-none")

    }
})
