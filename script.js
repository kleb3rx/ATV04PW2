const listaLivros = [];
const mapaAutores = new Map();
const conjuntoGeneros = new Set();
const livrosPorGenero = new Map();

function adicionarLivro(titulo, autor, genero) {
    if (listaLivros.includes(titulo)) {
        console.log(`O livro "${titulo}" já está na biblioteca.`);
        return;
    }
    listaLivros.push(titulo);
    mapaAutores.set(titulo, autor);
    conjuntoGeneros.add(genero);

    if (!livrosPorGenero.has(genero)) {
        livrosPorGenero.set(genero, []);
    }
    livrosPorGenero.get(genero).push(titulo);

    console.log(`Livro "${titulo}" adicionado com sucesso.`);
}

function removerLivro(titulo) {
    const index = listaLivros.indexOf(titulo);
    if (index === -1) {
        console.log(`O livro "${titulo}" não foi encontrado.`);
        return;
    }
    listaLivros.splice(index, 1);
    const genero = [...livrosPorGenero.entries()].find(([, titulos]) => titulos.includes(titulo))?.[0];
    if (genero) {
        const generoLivros = livrosPorGenero.get(genero);
        livrosPorGenero.set(genero, generoLivros.filter(livro => livro !== titulo));
    }
    mapaAutores.delete(titulo);
    console.log(`Livro "${titulo}" removido com sucesso.`);
}

function listarLivros() {
    if (listaLivros.length === 0) {
        console.log("Nenhum livro disponível.");
        return;
    }
    console.log("Livros disponíveis:");
    listaLivros.forEach(titulo => {
        console.log(`- ${titulo} (Autor: ${mapaAutores.get(titulo)})`);
    });
}

function verificarDisponibilidade(titulo) {
    if (listaLivros.includes(titulo)) {
        console.log(`O livro "${titulo}" está disponível.`);
    } else {
        console.log(`O livro "${titulo}" não está disponível.`);
    }
}

function buscarLivrosPorGenero(genero) {
    if (!livrosPorGenero.has(genero)) {
        console.log(`Nenhum livro encontrado para o gênero "${genero}".`);
        return [];
    }
    return livrosPorGenero.get(genero);
}

adicionarLivro("Dom Quixote", "Miguel de Cervantes", "Romance");
adicionarLivro("A Origem", "Dan Brown", "Suspense");
adicionarLivro("O Pequeno Príncipe", "Antoine de Saint-Exupéry", "Infantil");
listarLivros();
verificarDisponibilidade("A Origem");
removerLivro("Dom Quixote");
listarLivros();
console.log("Livros de suspense:", buscarLivrosPorGenero("Suspense"));
console.log("Livros infantis:", buscarLivrosPorGenero("Infantil"));
