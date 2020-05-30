function vm() {
    // Login -----------------
    try {
        this.isLoged = ko.observable(JSON.parse(localStorage.getItem("logado")));
    }
    catch (err){
        this.isLoged = ko.observable(false);
    }
    this.cliente = ko.observable(JSON.parse(localStorage.getItem("cliente")));
 
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
        var jogo = this.game.request;
        console.log(jogo);
        return true // O radio vai ficar checked
    }

    verifyForm = function() {
        console.log("merch checked: "+$("#merch").is(":checked"));
        console.log("game checked: "+$("#game").is(":checked"));
        var isValid = true;
        if ($.trim($("#prodName").val()).length < 2 || $.trim($("#prodPrice").val()).length < 1 || 
        $.trim($("#prodDesc").val()).length < 2 || $.trim($("#prodType").val()).length < 2){
            isValid = false;
        }
        else {
            if ($("#game").is(":checked") && $.trim($("#gameAge").val()).length < 1) { 
                console.log("game false");
                console.log(this.game);
                isValid = false;
            }

            if ($("#merch").is(":checked") && ($.trim($("#mHeight").val()).length < 1 || $.trim($("#mWidth").val()).length < 1 || 
            $.trim($("#mLength").val()).length < 1)) {
                console.log("merch false");
                isValid = false;
            } 
        }

        this.verForm(isValid);
    }



    
}

ko.applyBindings(new vm());