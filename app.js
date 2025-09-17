// ====================================================================
// Variáveis e funções para o Amigo Secreto
// ====================================================================

// Array que armazena a lista de nomes dos amigos.
// É declarado fora de qualquer função para ser acessível por todas elas.
let amigos = [];

/**
 * Adiciona um nome à lista de amigos.
 * Esta função é chamada quando o botão "Adicionar" é clicado.
 */
function adicionarAmigo() {
    // 1. Captura o elemento de entrada (input) com id "amigo"
    let amigoInput = document.getElementById('amigo');
    // Pega o valor do input e remove espaços em branco no início e fim
    let nomeAmigo = amigoInput.value.trim();

    // 2. Validação: verifica se o campo de nome não está vazio
    if (nomeAmigo === '') {
        alert('Por favor, insira um nome.');
        return; // Interrompe a execução da função se o campo estiver vazio
    }
    
    // 3. Adiciona o nome ao array de amigos
    amigos.push(nomeAmigo);

    // 4. Obtém o elemento da lista (ul) onde os nomes serão exibidos
    let listaAmigos = document.getElementById('listaAmigos');
    // Cria um novo elemento de lista (li)
    let novoItem = document.createElement('li');
    // Define o texto do novo item como o nome do amigo
    novoItem.textContent = nomeAmigo;
    // Adiciona o novo item à lista na página
    listaAmigos.appendChild(novoItem);

    // 5. Limpa o campo de entrada para o próximo nome
    amigoInput.value = '';
    // Define o foco no campo de entrada para melhor usabilidade
    amigoInput.focus();
}

/**
 * Realiza o sorteio dos amigos secretos.
 * Esta função é chamada quando o botão "Sortear amigo" é clicado.
 */
function sortearAmigo() {
    // 1. Validação: verifica se há pelo menos 4 pessoas para o sorteio
    if (amigos.length < 4) {
        alert('Você precisa de pelo menos 4 pessoas para o sorteio!');
        return; // Interrompe a função se não houver pessoas suficientes
    }

    // 2. Cria uma cópia do array de amigos para ser embaralhada
    let amigosParaSorteio = [...amigos];
    // Chama a função de embaralhamento para misturar a ordem dos nomes
    shuffle(amigosParaSorteio);

    // 3. Obtém o elemento (ul) onde o resultado será exibido
    let resultado = document.getElementById('resultado');
    // Limpa o conteúdo anterior da lista de resultados
    resultado.innerHTML = '';

    // 4. Percorre o array original de amigos para exibir o resultado
    for (let i = 0; i < amigos.length; i++) {
        let sorteado = amigosParaSorteio[i];
        
        // 5. Verifica se a pessoa tirou a si mesma
        if (amigos[i] === sorteado) {
            // Se for a si mesma, troca com a próxima pessoa da lista
            // (se for a última, troca com a primeira)
            let proximoIndex = (i + 1) % amigos.length;
            let temp = amigosParaSorteio[i];
            amigosParaSorteio[i] = amigosParaSorteio[proximoIndex];
            amigosParaSorteio[proximoIndex] = temp;
            sorteado = amigosParaSorteio[i]; // Atualiza o sorteado após a troca
        }

        // 6. Cria um novo item de lista (li) para exibir o resultado
        let novoItem = document.createElement('li');
        // Define o texto do resultado no formato "Nome -> Sorteado"
        novoItem.textContent = `${amigos[i]} -> ${sorteado}`;
        // Adiciona o resultado à lista na página
        resultado.appendChild(novoItem);
    }
}

/**
 * Embaralha um array usando o algoritmo de Fisher-Yates.
 * Garante um sorteio justo e aleatório.
 * @param {Array} array O array a ser embaralhado.
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    
    // Enquanto ainda houver elementos para embaralhar
    while (currentIndex != 0) {
        // Pega um elemento restante aleatoriamente
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        // Troca o elemento atual com o elemento aleatório
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}