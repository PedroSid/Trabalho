// Armazenamento local (para fins de exemplo)
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Função para atualizar a tabela com os usuários cadastrados
function atualizarTabela() {
    const tabela = document.querySelector('#tabelaUsuarios tbody');
    tabela.innerHTML = ''; // Limpa a tabela antes de atualizar

    // Insere cada usuário na tabela
    usuarios.forEach((usuario, index) => {
        const linha = tabela.insertRow();
        linha.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>
                <button onclick="editarCadastro(${index})">Editar</button>
                <button onclick="excluirCadastro(${index})">Excluir</button>
            </td>
        `;
    });
}

// Função de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtém os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Cria o novo usuário
    const novoUsuario = { nome, email };
    usuarios.push(novoUsuario);

    // Salva os dados no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Limpa os campos do formulário
    document.getElementById('cadastroForm').reset();

    // Atualiza a tabela
    atualizarTabela();
});

// Função para excluir um cadastro
function excluirCadastro(index) {
    usuarios.splice(index, 1); // Remove o usuário do array
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Atualiza o localStorage
    atualizarTabela(); // Atualiza a tabela
}

// Função para editar um cadastro
function editarCadastro(index) {
    const usuario = usuarios[index];
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('email').value = usuario.email;

    // Remove o usuário para editar (opcional)
    excluirCadastro(index);
}

// Chama a função para exibir a tabela inicial ao carregar a página
window.onload = atualizarTabela;
