/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];
var cards = [];
/**
 * firebase: objeto global 
 * database(): método para acesso ao realtime database
 * ref(): url em string para referência do caminho do banco
 */
var ref = firebase.database().ref('card/');

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var card = {
        nome: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
        idade: Math.floor(Math.random() * 22 + 18),
        curtidas: 0
    };

    /**
     * set(): método que cria dados na url passada
     * child(): acessa o nó filho passado por parâmetro
     */
    // ref.child(card.nome).set(card).then(() => {
    //     adicionaCardATela(card);
    // });

    /**
     * push(): cria um id único e insere os dados dentro desse uid
     */
    // ref.push(card).then(snapshot => {
    //     // adicionaCardATela(card, snapshot.key);
    // });

    /**
     * usando o fetch para adicionar um card
     */
    fetch('https://curso-firebase-webapps-93d26.firebaseio.com/card.json', {
        body: JSON.stringify(card),
        method: 'POST',
        mode: 'no-cors'
    })
    .catch(err => console.log(err));

};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    var card = document.getElementById(id);

    /**
     * remove(): remove o nó em que o método é utilizado, remove também todos os nós dentro desse nó removido
     */
    ref.child(id).remove().then(() => {
        card.remove();
    });

    /**
     * set(null): ao setar um nó em nulo, exclui esse nó do firebase 
     */
    // ref.child(id).set(null).then(() => {
    //     card.remove();
    // });
};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
    var card = document.getElementById(id);
    var count = card.getElementsByClassName('count-number')[0];
    var countNumber = +count.innerText;
    countNumber = countNumber + 1;

    /**
     * set(): pode ser acessado diretamente o objeto que quer atualizar e passar o valor atualizado 
     *        ou pode-se passar o objeto completo e atualiza-lo com os novos valores nos campos correspondentes
     */
    ref.child(id + '/curtidas').set(countNumber).then(() => {
        count.innerText = countNumber;
    }, err => {
        console.log('Erro ao curtir', err);
    });
};

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {

    var card = document.getElementById(id);
    var count = card.getElementsByClassName('count-number')[0];
    var countNumber = +count.innerText;

    if (countNumber > 0) {
        countNumber = countNumber - 1;

        /**
         * update(): recebe um objeto (e apenas um objeto) e atualiza APENAS as propriedades desse objeto 
         */
        ref.child(id).update({curtidas: countNumber}).then(() => {
            count.innerText = countNumber;
        }).catch((err) => {
            console.log('Erro ao descurtir', err);
        });
    }

};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    /**
     * Logging
     */
    // firebase.database.enableLogging(function(message) {
    //     console.log("[Firebase]", message);
    // });

    /**
     * once(): retorna os dados lidos de uma URL
     * snapshot: objeto retornado pela leitura
     */
    // ref.once('value').then(snapshot => {
        // Acessa um nó filho
        // console.log('child()', snapshot.child('-LxgXln5r8pZ6yZut1O2').val());

        // Checa se existe algo no snapshot
        // console.log('exists()', snapshot.exists());

        // Se existe o filho passado na URL
        // console.log('hasChild()', snapshot.hasChild('-LxgXln5r8pZ6yZut1O2/nome'));
        // console.log('hasChild()', snapshot.hasChild('-LxgXln5r8pZ6yZut1O2/comentario'));

        // Se existe algum filho no nó
        // console.log('hasChildren()', snapshot.child('-LxgXln5r8pZ6yZut1O2').hasChildren());

        // Número de filhos no snapshot
        // console.log('numChildren()', snapshot.numChildren());

        // A chave desse snapshot/caminho
        // console.log('chave', snapshot.key);

    //     snapshot.forEach(value => {
    //         // console.log('chave', value.key);
    //         adicionaCardATela(value.val(), value.key);
    //     });
    // });

    /**
     * on()
     */
    // ref.on('value', snapshot => {
    //     snapshot.forEach(value => {
    //         adicionaCardATela(value.val(), value.key);
    //     });
    // });

    // ref.on('child_added', snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key);
    // });

    // ref.on('child_changed', (snapshot, uid) => {
    //     console.log(snapshot.key, uid);
    // });

    // ref.on('child_removed', snapshot => {
    //     console.log('removed', snapshot.key);
    // });

    /**
     * ordenação
     * orderByChild('filho'): ordena pela propriedade filho passado como parâmetro
     * orderByKey(): ordena pela chave dos nós
     * orderByValue(): ordena pelo valor de cada propriedade dentro do nó, não vale para nós que tenham como filho outros nós 
     *                 !!! é possível utilizar apenas um método de ordenação por vez !!!
     */
    // ref.orderByKey().on('child_added', snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key);
    // });

    /**
     * filtro
     * startAt(): traz valores cujo valor passado na query comece no valor da propriedade selecionada
     * endAt(): traz valores cujo valor passado na query vá até o valor da propriedade selecionada
     * equalTo(): traz valores cujo valor passado na query bata exatamente com o valor da propriedade selecionada
     */
    // ref.orderByChild('idade').startAt(25).endAt(35).on('child_added', snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key);
    // });

    /**
     * limites
     * limitToFirst(number): retorna apenas os primeiros valores de acordo com o número passado por parâmetro
     * limitToLast(number): retorna apenas os últimos valores de acordo com o número passado por parâmetro
     */
    // ref.orderByChild('idade').startAt(0).limitToLast(20).on('child_added', snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key);
    // });

    // ref.on('value', snapshot => {
    //     snapshot.forEach(value => {
    //         adicionaCardATela(value.val(), value.key);
    //     });

    //     ref.off('value');
    // }, err => {
    //     console.log('Erro no on', err);
    // });

    /**
     * usando o fetch no lugar da biblioteca do Firebase
     */
    fetch('https://curso-firebase-webapps-93d26.firebaseio.com/card.json')
        .then(res => res.json())
        .then(res => {
            for(var key in res) {
                adicionaCardATela(res[key], key);
            };
        });

});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h2");
    header.innerText = informacao.nome;
    header.classList.add('card-title');
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let content = document.createElement("p");
    content.classList.add('card-text');
    content.innerText = informacao.idade + ' anos.';
    // ===================================

    /**
     * BOTÕES DO CARD
     */
    let inner = document.createElement("div");
    inner.classList.add('row')
    // Botão adicionar
    let button_add = document.createElement("button");
    button_add.classList.add('btn', 'btn-link', 'col-3');
    button_add.setAttribute('onclick', "curtir('" + id + "')");
    button_add.innerText = '+';
    inner.appendChild(button_add);

    // Contador de curtidas
    let counter = document.createElement("span");
    counter.innerHTML = informacao.curtidas;
    counter.classList.add('col-3', 'text-center', 'count-number');
    inner.appendChild(counter);

    // Botão de subtrair
    let button_sub = document.createElement("button");
    button_sub.classList.add('btn', 'btn-link', 'col-3');
    button_sub.setAttribute('onclick', "descurtir('" + id + "')");
    button_sub.innerText = '-';
    inner.appendChild(button_sub);
    // ===================================

    // Botão de excluir
    let button_del = document.createElement("button");
    button_del.classList.add('btn', 'btn-danger', 'col-3');
    button_del.setAttribute('onclick', "deletar('" + id + "')");
    button_del.innerText = 'x';
    inner.appendChild(button_del);
    // ===================================

    /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    let card_body = document.createElement("div");
    card_body.classList.add('card-body');
    // ===================================

    // popula card
    card_body.appendChild(header);
    card_body.appendChild(content);
    card_body.appendChild(inner);
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}