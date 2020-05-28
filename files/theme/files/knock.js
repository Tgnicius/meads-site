function vm() {
    try {
        this.isLoged = ko.observable(JSON.parse(localStorage.getItem("logado")));
        console.log(this.isLoged);
    }
    catch (err){
        this.isLoged = ko.observable(false);
    }
    this.cliente = ko.observable(JSON.parse(localStorage.getItem("cliente")));
    console.log(this.conta);
 
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
    
}

ko.applyBindings(new vm());