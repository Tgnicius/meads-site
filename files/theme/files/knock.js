function vm() {
    // Login -----------------
    try {
        this.isLoged = ko.observable(JSON.parse(localStorage.getItem("logado")));
    }
    catch (err){
        this.isLoged = ko.observable(false);
    }
    this.cliente = ko.observable(JSON.parse(localStorage.getItem("cliente")));

    this.jogos = ko.observableArray(JSON.parse(localStorage.getItem("jogos")));
    this.numJogos = ko.observable(JSON.parse(localStorage.getItem("numJogos")));
    this.produtos = ko.observableArray(JSON.parse(localStorage.getItem("produtos")));
    this.numProdutos = ko.observable(JSON.parse(localStorage.getItem("numProdutos")));

    this.produto = ko.observable(JSON.parse(localStorage.getItem("produto")));
    this.jogo = ko.observable(JSON.parse(localStorage.getItem("jogo")));

    this.jogosComprados = ko.observableArray(JSON.parse(localStorage.getItem("clienteComprados")));
    this.jogosAlugados = ko.observableArray(JSON.parse(localStorage.getItem("clienteAlugados")));
    this.merchComprados = ko.observableArray(JSON.parse(localStorage.getItem("clienteMerchs")));

    this.img = ko.observable();

 
    logar = function() {
        localStorage.setItem("contas", JSON.stringify([{name: "noobmaster69", email: "cliente@email.com", pass:"cliente"}, {name: "Ubisoft", email: "empresa@email.com", pass:"empresa"}]));
        var contas = JSON.parse(localStorage.getItem("contas"));
        var isValid = false;
        for (let i=0; i<contas.length; i++){
            if ($("#email").val() == contas[i].email && $("#pass").val() == contas[i].pass ){
                if (contas[i].pass == "cliente"){
                    localStorage.setItem("cliente", JSON.stringify(true));
                }
                else{
                    localStorage.setItem("cliente", JSON.stringify(false));
                }
                
                this.cliente(contas[i].pass);
                $("#invalid_login").hide();
                this.isLoged(true);
                localStorage.setItem("logado", JSON.stringify(true));
                isValid=true;
            }   
        }
        if (!isValid){
            $("#invalid_login").show();
        }
    }
    deslogar = function() {
        localStorage.setItem("logado", JSON.stringify(false));
        this.isLoged(false);
    }

    // Empresa add jogos ----------------------

    this.game = ko.observable(false);
    this.merch = ko.observable(false);
    this.verForm = ko.observable(false);
    this.verForm2 = ko.observable(false);

    showGame = function() {
        this.game(true);
        this.merch(false);
        return true // O radio vai ficar checked
    }

    showMerch = function() {
        this.merch(true);
        this.game(false);
        return true // O radio vai ficar checked
    }

    verifyForm = function() {
        var isValid = true;
        if ($.trim($("#prodName").val()).length < 2 || $.trim($("#prodPrice").val()).length < 1 || 
        $.trim($("#prodDesc").val()).length < 2 || $.trim($("#prodType").val()).length < 2){
            isValid = false;
        }
        else {
            if (!$("#game").is(":checked") && !$("#merch").is(":checked")){
                isValid = false; // Tem q ter pelo menos um dos radios marcados
            }

            if ($("#game").is(":checked") && $.trim($("#gameAge").val()).length < 1) { 
                isValid = false;
            }

            if ($("#merch").is(":checked") && ($.trim($("#mHeight").val()).length < 1 || $.trim($("#mWidth").val()).length < 1 || 
            $.trim($("#mLength").val()).length < 1)) {
                isValid = false;
            } 
        }

        this.verForm(isValid);

    }

    verifyForm2 = function() {
        var isValid = true;
        if ($.trim($("#prodName2").val()).length < 2 || (!$("#game2").is(":checked") && !$("#merch2").is(":checked")))
            isValid = false;
        
        this.verForm2(isValid);
    }

   submitForm = function() { 


        var name = $("#prodName").val();
        var price = $("#prodPrice").val();
        var desc = $("#prodDesc").val();
        var tipo = $("#prodType").val();

        if ($("#game").is(":checked")){
            var age = $("#gameAge").val();
            var nJogo = parseInt(localStorage.getItem("numJogos"));
            if (isNaN(nJogo)){
                nJogo = 0;
            }
            nJogo++;


            var jogos = new Array();
            console.log(localStorage.getItem("jogos"));
            jogos = JSON.parse(localStorage.getItem("jogos")) || []; // dados dos jogos
            var jogo = {nome: name, preco: price, description: desc, genero: tipo, idade: age};
            jogos.push(jogo); // adc o jogo para a lista
            localStorage.setItem("jogos", JSON.stringify(jogos)); // salvar a lista no storage
            localStorage.setItem("numJogos", JSON.stringify(nJogo));
            $("#nJog").text(nJogo);
        }

        if ($("#merch").is(":checked")){


            var height = $("#mHeight").val();
            var width = $("#mWidth").val();
            var leng = $("#mLength").val();
            var produtos = new Array();
            var nProd = parseInt(localStorage.getItem("numProdutos"));
            if (isNaN(nProd)){
                nProd = 0;
            }
            nProd++;

            if (localStorage.getItem("produtos") != "undefined")
                produtos = JSON.parse(localStorage.getItem("produtos")) || []; // dados dos jogos
            var produto = {nome: name, preco: price, description: desc, genero: tipo, altura: height, largura: width, comprimento: leng};
            produtos.push(produto); // adc o jogo para a lista
            localStorage.setItem("produtos", JSON.stringify(produtos)); // salvar a lista no storage
            localStorage.setItem("numProdutos", JSON.stringify(nProd));
            $("#nProd").text(nProd);
            console.log((localStorage.getItem("numProdutos")))
            console.log(produtos);

        }
    }

    // Empresa remove produtos

    submitForm2 = function() {
        var isRemoved = false;
        var name = $("#prodName2").val();
        if ($("#game2").is(":checked")){
            var jogos = JSON.parse(localStorage.getItem("jogos"));

            for (let i=0; i<jogos.length; i++){
                var jogo = jogos[i];
                if (name == jogo.nome){
                    const index = jogos.indexOf(jogo);
                    if (index > -1){
                        jogos.splice(index, 1);
                        alert("Jogo Removido!");
                        var nJogo = parseInt(localStorage.getItem("numJogos"));
                        if (isNaN(nJogo)){
                            break;
                        }
                        isRemoved = true;
                        nJogo--;
                        localStorage.setItem("numJogos", JSON.stringify(nJogo));
                        $("#nJog").text(nJogo);
                        localStorage.setItem("jogos", JSON.stringify(jogos)); // Atualizar após remover

                    }
                }
            }
            if (!isRemoved){
                alert("Jogo não existente!");
            }
        }
        if ($("#merch2").is(":checked")){
            var produtos = JSON.parse(localStorage.getItem("produtos"));

            for (let i=0; i<produtos.length; i++){
                var produto = produtos[i];
                if (name == produto.nome){
                    const index = produtos.indexOf(produto);
                    if (index > -1){
                        produtos.splice(index, 1);

                        alert("Merchandising Removido!");
                        var nProd = parseInt(localStorage.getItem("numProdutos"));
                        if (isNaN(nProd)){
                            break;
                        }
                        isRemoved = true;
                        nProd--;
                        localStorage.setItem("numProdutos", JSON.stringify(nProd));
                        $("#nProd").text(nProd);
                        localStorage.setItem("produtos", JSON.stringify(produtos)); // Atualizar após remover

                    }
                }
            }
            if (!isRemoved){
                alert("Produto não existente!");
            }
        }
     

        console.log(JSON.parse(localStorage.getItem("jogos")));
        console.log(JSON.parse(localStorage.getItem("produtos")));
        
    }

    // Produtos e Jogos página de compras -------------------------

    this.produtosPage = function(produto) {
        localStorage.setItem("produto", JSON.stringify(produto));
        document.location.href = "produto-aleatorio.html" // mudar url da página
    }

    this.jogosPage = function(jogo){
        localStorage.setItem("jogo", JSON.stringify(jogo));
        document.location.href = "jogo-aleatorio.html";
    }

    // Adicionar merchandising e jogos

    this.addMerch = function() {
        var merchs = JSON.parse(localStorage.getItem("clienteMerchs"));
        if (merchs == null){ // Não houver jogos a princípio
            merchs = [] // array vazio
        }
        var merch = JSON.parse(localStorage.getItem("produto"));
        merchs.push(merch); // merch adc para o arr
        localStorage.setItem("clienteMerchs", JSON.stringify(merchs));
        console.log(JSON.parse(localStorage.getItem("clienteMerchs")));
        document.location.href = "compra.html";
    }

    this.buyGame = function() {
        var games = JSON.parse(localStorage.getItem("clienteComprados"));
        if (games == null){ // Não houver jogos a princípio
            games = [] // array vazio
        }
        var game = JSON.parse(localStorage.getItem("jogo"));
        games.push(game); // merch adc para o arr
        localStorage.setItem("clienteComprados", JSON.stringify(games));
        console.log(JSON.parse(localStorage.getItem("clienteComprados")));
        document.location.href = "compra.html";
    }

    this.rentGame = function() {
        var games = JSON.parse(localStorage.getItem("clienteAlugados"));
        if (games == null){ // Não houver jogos a princípio
            games = [] // array vazio
        }
        var game = JSON.parse(localStorage.getItem("jogo"));
        games.push(game); // merch adc para o arr
        localStorage.setItem("clienteAlugados", JSON.stringify(games));
        console.log(JSON.parse(localStorage.getItem("clienteAlugados")));
        document.location.href = "aluguer.html";
    }





    
}

ko.applyBindings(new vm());