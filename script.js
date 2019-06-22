

function buscaLivro(){
    var url = "https://www.googleapis.com/books/v1/volumes?q=";

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    var req = new XMLHttpRequest();
    req.addEventListener('load', function(){
       mostrarTodosLivros(JSON.parse(this.responseText));
    });
    req.open("GET", url+query);
    req.send();
}

function mostrarTodosLivros(todos){
    document.querySelector('#listaLivros').innerHTML = '';

    var livros = todos.items;

    for(var i in livros){
        var id = livros[i].id;
        var livro = livros[i].volumeInfo;

        if(!livro.imageLinks){
            livro.imageLinks.thumbnail = "cover-unavailable.jpg";
        } 
        
        document.querySelector("#listaLivros").innerHTML += getBookCardVertical(id, livro.title, livro.imageLinks.thumbnail);
    }
}

function buscarLivroPorId(){
    var url = "https://www.googleapis.com/books/v1/volumes/";
    var id = location.search.split('=')[1];

    var req = new XMLHttpRequest();
    req.addEventListener('load', function(){
       mostrarLivro(JSON.parse(this.responseText));
    });
    req.open("GET", url+id);
    req.send();
}

function mostrarLivro(livro){
    livro = livro.volumeInfo;

    var info = `<h1>${livro.title}</h1>`+
            `<h5> ${livro.authors}</h5>`+
            `<p>${livro.publisher}. ${livro.pageCount} p.</p>`+
            `<div class='review'>${starFake()}</div>`;
    
    document.querySelector('#info').innerHTML = info;
    
    if(livro.imageLinks.medium){
        document.querySelector('#capa').innerHTML = `<img src='${livro.imageLinks.medium}' class='img-fluid'/>`;
    }else{
        document.querySelector('#capa').innerHTML = `<img src='${livro.imageLinks.thumbnail}' class='img-fluid'/>`;
    }
}

function getBookCardHorizontal(id, title, thumbnail){
    return '<div class="col-md-6">'
                    +'<div class="card m-2s mb-2 livro">'
                        +'<div class="row no-gutters">'
                            +'<div class="col-md-4">'
                                +`<img src="${thumbnail}" class="card-img capa" alt="capa">`
                            +'</div>'
                                +'<div class="col-md-8">'
                                    +'<div class="card-body">'
                                        +`<a href='livro.html?id=${id}'>`
                                            +`<h5 class="card-title">${title}</h5>`
                                        +'</a>'
                                        +'<h5 class="card-text">R$ 20,00</h5>'
                                        +`<a href='livro.html?id=${id}' class='btn btn-outline-danger stretched-link'>`
                                            +'<i class="material-icons">shopping_cart</i> Adicionar ao Carrinho'
                                        +'</a>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
                        +'</a>'
                    +'</div>';
}

function getBookCardVertical(id, title, thumbnail){
    return '<div class="col-md-3">'+
                '<div class="card livro">' +
                    `<img src="${thumbnail}" class="card-img-top capa" alt="Capa">` +
                    '<div class="card-body">'+
                        `<a href="livro.html?id=${id}" class="btn btn-danger vcard-btn  stretched-link"><i class="material-icons">shopping_cart</i></a>`+
                        `<p class="card-title">${title}</p>`+
                    '</div>'+
                '</div>'+
            '</div>';
}

function getBySubject(subject){
    const url = `https://www.googleapis.com/books/v1/volumes?maxResults=15&q=+subject:${subject}`

    var req = new XMLHttpRequest();
    req.addEventListener('load', function(){
        appendCategory(subject, JSON.parse(this.responseText));
    });
    req.open("GET", url);
    req.send();
}

function appendCategory(subject, books){

    var livros = books.items;

    for(var i in livros){
        var id = livros[i].id;
        var livro = livros[i].volumeInfo;

        if(!livro.imageLinks){
            livro.imageLinks.thumbnail = "cover-unavailable.jpg";
        } 
        
        document.querySelector(`#${subject}`).innerHTML += getBookCardVertical(id, livro.title, livro.imageLinks.thumbnail);
    }
}

function initHome(){
    getBySubject('fiction');
    getBySubject('politics');
    getBySubject('novels');
}

function starFake(){
    return '<i class="material-icons" style="color:#FFCE54;">star</i>'+
    '<i class="material-icons" style="color:#FFCE54;">star</i>'+
    '<i class="material-icons" style="color:#FFCE54;">star</i>'+
    '<i class="material-icons" style="color:#FFCE54;">star_half</i>'+
    '<i class="material-icons" style="color:#FFCE54;">star_border</i>';
}