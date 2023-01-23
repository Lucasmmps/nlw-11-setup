const form = document.querySelector('#form-habits'); //Atribuindo o formulário de ID #form-habits à variável declarada form
const nlwSetup = new NLWSetup(form); //Instanciando o objeto "nlwSetup" à classe "NLWSetup" com a passagem do atributo (chave) "form"

const button = document.querySelector('header button'); //Atribuindo a tag <button> fiha da tag <header> à variável declarada button 

button.addEventListener('click', add) //Executando a função add() após um evento de click do botão "+ Registrar Meu Dia"
form.addEventListener('change', save); //Executando a função save() após um evento de mudança do formulário (lista de check inputs)

//Declaração da função add() : Adiciona um novo dia ao formulário
function add() {
    const today = new Date().toLocaleDateString('pt-br').slice(0, -5); //Instanciando o objeto "today" à classe "Date" com a string que contém a data da adição abreviada no formato de localização brasileira (dd/mm) com uso dos métodos "toLocaleDateString().slice()"
    const dayExists = nlwSetup.dayExists(today); //Atribuindo a variável "dayExists" o valor booleano que armazena a existência de um registro da data de adição (true)

    if (dayExists) { //Verificação da existência de um registro da data de adição
        alert('Dia já incluso!'); //Caso já exista um registro da data de adição retorna um alerta no navegador avisando o usuário
        return //E então encerra-se a função add()
    }

    nlwSetup.addDay(today); //Caso não exista a função continua e adiciona-se a data ao registro
}

//Declaração da função save() : Salva as alterações feitas ao formulário
function save() {
    localStorage.setItem('nlwSetup.habits', JSON.stringify(nlwSetup.data)); //Salva as alterações feitas ao formulário criando pares chave-valor a partir de argumentos do tipo string
                                                                            //Onde a chave é a string que acessa o atributo "habits" do objeto "nlwSetup" (sintaxe: 'nlwSetup.habits')
                                                                            //E o valor são os pares chave-valor do objeto contido em nlwSetup.data convertidos em string uma string (conversão em string: '{habito1: dia1, habito2: dia2, ...}')
}

const data = JSON.parse(localStorage.getItem('nlwSetup.habits')) || {}; //Declaração do objeto "data" que recebe, convertendo de string para objeto, a atribuição do valor associado à chave nlwSetup.habits

nlwSetup.setData(data); //Chamando o método .setData() para registrar os dias marcados referente ao par chave-valor do objeto "data" (chave: valor -> hábito: array com os dias que o hábito foi completado) 
nlwSetup.load(); //Carregando os dias registrados pelo método .setData() e renderizando no formulário
