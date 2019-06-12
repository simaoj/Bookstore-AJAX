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
    var quebra_linha = 1;

    document.querySelector("#listaLivros").innerHTML += "<div class='row'>";
    for(var i in livros){
        var id = livros[i].id;
        var livro = livros[i].volumeInfo;

        if(livro.imageLinks){
            if(!quebra_linha%4){
                document.querySelector("#listaLivros").innerHTML += "</div><div class='row'>";

            }
            
            var item = 
            "<a href='livro.html?id="+id+"'>"+
                "<div class='livro col-3'>"+
                    "<img src='"+livro.imageLinks.thumbnail+"'>"+
                    "<p class='titulo'>"+livro.title+"</p>"+
                "</div>"+
            "</a>";

            document.querySelector("#listaLivros").innerHTML += item;
            quebra_linha ++;
        }
    }
    document.querySelector("#listaLivros").innerHTML += "</div>";
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