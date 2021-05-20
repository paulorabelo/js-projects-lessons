"user stric"; //Usa modo restrito browser c/ suport

/*
 * Este script define a função calculate() chamada
 * pelas rotinas de tratamenot de evento no código
 * HTML acima. A função lê valores de elementos
 * <input>, calcula as informações de pagamento de
 * empréstimo, exibe o resultado em elementos <span>
 * Também salva os dados do usuário, exibe links
 * financeiras e desenha um gráfico.
 */

function calculate() {
    // Pesquisa os elementos de entrada e saída no documento
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var cep = document.getElementById("cep");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");
    
    // Obtem a entrada do usuário através dos
    // elementos de entrada.
    // Presume que tudo isso é válido.
    // Converte os júros de porcentagem para 
    // decimais e converte de taxa anual para taxa
    // mensal. Converte o período de pagamento em
    // anos para o número de pagamentos mensais.
    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;

    // Agora calcula o valor do pagamento mensal.
    var x = Math.pow(1 + interest, payments);
    var monthly = (principal*x*interest)/(x-1);

    /* Se o resultado é um número finito, a entrada
     * do usuário estava correta e temos resultados
     * significativos para exibir
     */
    if (isFinite(monthly)) {
        /* Preenche os campos de saída, arredondando
         * para 2 casas decimais.
         */
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);

        /* Salva a entrada do usuário para que 
         * possamos recuperá-la na próxima vez que
         * ele visitar.
         */
        save(amount.value, apr.value, years.value, cep.value);

        /* Anúncio: localiza e exibe financeiras locais, mas
         * ignora erros de rede.
         */
        try { //Captura erros dentro destas chaves
            getLenders(amount.value, apr.value, years.value, cep.value);
        }
        catch(e) {/* e ignora esss erros */}

        /* Por fim, traça o gráfico do saldo devedor, dos
         * juros e dos pagamentos do capital.
         */
        chart(principal, interest, monthly, payments);
    }
    else {
        /* O resultado foi Not-a-Number ou infinito, o que
         * significa que a entrada estava incompleta ou era
         * inválida. Apaga qualquer saída exibida 
         * anteriormente.
         */
        payment.innerHTML = ""; // Apaga o conteúdos
        total.innerHTML = "";   // desses elementos.
        totalinterest.innerHTML = "";
        chart(); // Sem argumentos, apaga o gráfico

    }
}

/* Salva a entrada do usuário como propriedades do objeto
 * localStorage. Essas propriedades ainda existirão quando o 
 * usuário visitar no futuro. Esse recurso de armazenamento
 * não vai funcionar em alguns navegadores (o Firefox, exemplo), se você executar a partir de um arquivo local:// URL. Contudo, funciona com HTTP.
 */
function save(amount, apr, years, cep) {
    if (window.localStorage) { // Se browser suportar
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_cep = cep;
    }
}
