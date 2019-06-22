document.querySelector('#busca-btn').addEventListener("click", (event)=>{
    event.preventDefault()
});

function buscaLivro(){
    var url = "https://www.googleapis.com/books/v1/volumes?q=";
    var input = document.querySelector("#query").value;

    var query = input.replace(" ", "+");

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

        if(livro.imageLinks){
        }


            

            
            var item = 
                '<div class="col-md-6">'
                    +'<div class="card m-2s mb-2 livro">'
                        +'<div class="row no-gutters">'
                            +'<div class="col-md-4">'
                                +`<img src="${livro.imageLinks.thumbnail}" class="card-img capa" alt="capa">`
                            +'</div>'
                                +'<div class="col-md-8">'
                                    +'<div class="card-body">'
                                        +`<a href='livro.html?id=${id}'>`
                                            +`<h5 class="card-title">${livro.title}</h5>`
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

            document.querySelector("#listaLivros").innerHTML += item;
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

    var info = 
    `<p><b>Título:</b> ${livro.title}</p>`+
    `<p><b>Autor:</b> ${livro.authors}</p>`+
    `<p><b>Editora:</b> ${livro.publisher}</p>`+
    `<p><b>Ano:</b> ${livro.publishedDate}</p>`+
    `<p><b>Páginas:</b> ${livro.pageCount}</p>`+
    `<p><b>Idioma:</b> ${livro.language}</p>`;
    
    document.querySelector('#info').innerHTML = info;

   if(livro.imageLinks.large){
        document.querySelector('#capa').innerHTML = `<img src='${livro.imageLinks.large}'/>`;
    }else if(livro.imageLinks.medium){
        document.querySelector('#capa').innerHTML = `<img src='${livro.imageLinks.medium}'/>`;
    }else{
        document.querySelector('#capa').innerHTML = `<img src='${livro.imageLinks.thumbnail}'/>`;
    }
}