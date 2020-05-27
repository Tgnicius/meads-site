function vm() {
    try {
        console.log("try");
        this.isLoged = ko.observable(JSON.parse(localStorage.getItem("logado")));
        console.log(this.isLoged);
    }
    catch (err){
        console.log("catch");
        this.isLoged = ko.observable(false);
    }
 
    logar = function() {
        localStorage.setItem("contas", JSON.stringify([{name: "noobmaster69", email: "cliente@email.com", pass:"cliente"}, {name: "Ubisoft", email: "empresa@email.com", pass:"empresa"}]));
        var contas = JSON.parse(localStorage.getItem("contas"));
        var isValid = false;
        for (let i=0; i<contas.length; i++){
            if ($("#email").val() == contas[i].email && $("#pass").val() == contas[i].pass ){
                localStorage.setItem("conta", JSON.stringify({name: contas[i].name, email: contas[i].email, pass: contas[i].pass}));
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
        console.log("deslogou");
        localStorage.setItem("logado", JSON.stringify(false));
        this.isLoged(false);
    }
    
}

ko.applyBindings(new vm());