function vm() {
    // Login -----------------
    try {
        this.isLoged = ko.observable(JSON.parse(localStorage.getItem("logado")));
    }
    catch (err){
        this.isLoged = ko.observable(false);
    }
    this.cliente = ko.observable(JSON.parse(localStorage.getItem("cliente")));

    this.jogos = ko.observable(JSON.parse(localStorage.getItem("jogos")));
    this.produtos = ko.observable(JSON.parse(localStorage.getItem("produtos")));
 
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

    submitForm = function() {
        var name = $("#prodName").val();
        var price = $("#prodPrice").val();
        var desc = $("#prodDesc").val();
        var tipo = $("#prodType").val();

        if ($("#game").is(":checked")){
            var age = $("#gameAge").val();
            var jogos = new Array();
            console.log(localStorage.getItem("jogos"));
            jogos = JSON.parse(localStorage.getItem("jogos")) || []; // dados dos jogos
            var jogo = {nome: name, preco: price, description: desc, genero: tipo, idade: age};
            jogos.push(jogo); // adc o jogo para a lista
            localStorage.setItem("jogos", JSON.stringify(jogos)); // salvar a lista no storage
            console.log(jogos[0].nome);
        }

        if ($("#merch").is(":checked")){

            var height = $("#mHeight").val();
            var width = $("#mWidth").val();
            var leng = $("#mLength").val();
            var produtos = new Array();
            if (localStorage.getItem("produtos") != "undefined")
                produtos = JSON.parse(localStorage.getItem("produtos")) || []; // dados dos jogos
            var produto = {nome: name, preco: price, description: desc, genero: tipo, altura: height, largura: width, comprimento: leng};
            produtos.push(produto); // adc o jogo para a lista
            localStorage.setItem("produtos", JSON.stringify(produtos)); // salvar a lista no storage

        }

        

    }



    
}

ko.applyBindings(new vm());