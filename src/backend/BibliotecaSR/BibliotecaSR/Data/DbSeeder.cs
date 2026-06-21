using BibliotecaSR.Models;

namespace BibliotecaSR.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Itens.Any())
                return;

            var itens = new List<Item>
            {
                new Item { ISBN = "9788535914849", Titulo = "Dom Casmurro", Autor = "Machado de Assis", Editora = "Companhia das Letras", Categoria = Categoria.Romance, AnoPublicacao = 1899, Tipo = Tipo.Livro, CDD = "869.93" },
                new Item { ISBN = "9788577993275", Titulo = "O Hobbit", Autor = "J.R.R. Tolkien", Editora = "HarperCollins", Categoria = Categoria.Fantasia, AnoPublicacao = 1937, Tipo = Tipo.Livro, CDD = "823.912" },
                new Item { ISBN = "9780451524935", Titulo = "1984", Autor = "George Orwell", Editora = "Companhia das Letras", Categoria = Categoria.Distopia, AnoPublicacao = 1949, Tipo = Tipo.Livro, CDD = "823.912" },
                new Item { ISBN = "9780061120084", Titulo = "O Sol é para Todos", Autor = "Harper Lee", Editora = "HarperCollins", Categoria = Categoria.Romance, AnoPublicacao = 1960, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9780307474278", Titulo = "O Código Da Vinci", Autor = "Dan Brown", Editora = "Arqueiro", Categoria = Categoria.Misterio, AnoPublicacao = 2003, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9788595081512", Titulo = "A Revolução dos Bichos", Autor = "George Orwell", Editora = "Companhia das Letras", Categoria = Categoria.Distopia, AnoPublicacao = 1945, Tipo = Tipo.Livro, CDD = "823.912" },
                new Item { ISBN = "9788532530783", Titulo = "Harry Potter e a Pedra Filosofal", Autor = "J.K. Rowling", Editora = "Rocco", Categoria = Categoria.Fantasia, AnoPublicacao = 1997, Tipo = Tipo.Livro, CDD = "823.914" },
                new Item { ISBN = "9788575422391", Titulo = "O Pequeno Príncipe", Autor = "Antoine de Saint-Exupéry", Editora = "Agir", Categoria = Categoria.Infantil, AnoPublicacao = 1943, Tipo = Tipo.Livro, CDD = "843.912" },
                new Item { ISBN = "9788598078175", Titulo = "Mindset", Autor = "Carol S. Dweck", Editora = "Objetiva", Categoria = Categoria.Autoajuda, AnoPublicacao = 2006, Tipo = Tipo.Livro, CDD = "158.1" },
                new Item { ISBN = "9788537809072", Titulo = "Sapiens: Uma Breve História da Humanidade", Autor = "Yuval Noah Harari", Editora = "L&PM", Categoria = Categoria.Historia, AnoPublicacao = 2011, Tipo = Tipo.Livro, CDD = "909" },
                new Item { ISBN = "9788576572008", Titulo = "O Alquimista", Autor = "Paulo Coelho", Editora = "Rocco", Categoria = Categoria.Romance, AnoPublicacao = 1988, Tipo = Tipo.Livro, CDD = "869.93" },
                new Item { ISBN = "9788599296363", Titulo = "A Cabana", Autor = "William P. Young", Editora = "Arqueiro", Categoria = Categoria.Religiao, AnoPublicacao = 2007, Tipo = Tipo.Livro, CDD = "813.6" },
                new Item { ISBN = "9788501112518", Titulo = "It: A Coisa", Autor = "Stephen King", Editora = "Suma", Categoria = Categoria.Terror, AnoPublicacao = 1986, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9788575225628", Titulo = "Clean Code", Autor = "Robert C. Martin", Editora = "Alta Books", Categoria = Categoria.Tecnologia, AnoPublicacao = 2008, Tipo = Tipo.Livro, CDD = "005.1" },
                new Item { ISBN = "9780132350884", Titulo = "Código Limpo para Iniciantes", Autor = "Robert C. Martin", Editora = "Alta Books", Categoria = Categoria.Tecnologia, AnoPublicacao = 2008, Tipo = Tipo.Livro, CDD = "005.1" },
                new Item { ISBN = "9788520930544", Titulo = "Orgulho e Preconceito", Autor = "Jane Austen", Editora = "Martin Claret", Categoria = Categoria.Romance, AnoPublicacao = 1813, Tipo = Tipo.Livro, CDD = "823.7" },
                new Item { ISBN = "9780140449266", Titulo = "A Odisséia", Autor = "Homero", Editora = "Penguin", Categoria = Categoria.Aventura, AnoPublicacao = -800, Tipo = Tipo.Livro, CDD = "883" },
                new Item { ISBN = "9788576571568", Titulo = "Veronika Decide Morrer", Autor = "Paulo Coelho", Editora = "Rocco", Categoria = Categoria.Romance, AnoPublicacao = 1998, Tipo = Tipo.Livro, CDD = "869.93" },
                new Item { ISBN = "9788535902778", Titulo = "Memórias Póstumas de Brás Cubas", Autor = "Machado de Assis", Editora = "Companhia das Letras", Categoria = Categoria.Romance, AnoPublicacao = 1881, Tipo = Tipo.Livro, CDD = "869.93" },
                new Item { ISBN = "9788533613379", Titulo = "O Mundo de Sofia", Autor = "Jostein Gaarder", Editora = "Companhia das Letras", Categoria = Categoria.Filosofia, AnoPublicacao = 1991, Tipo = Tipo.Livro, CDD = "109" },
                new Item { ISBN = "9788576573128", Titulo = "Duna", Autor = "Frank Herbert", Editora = "Aleph", Categoria = Categoria.FiccaoCientifica, AnoPublicacao = 1965, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9788535914061", Titulo = "Ensaio Sobre a Cegueira", Autor = "José Saramago", Editora = "Companhia das Letras", Categoria = Categoria.Romance, AnoPublicacao = 1995, Tipo = Tipo.Livro, CDD = "869.342" },
                new Item { ISBN = "9788580570458", Titulo = "Cinquenta Tons de Cinza", Autor = "E.L. James", Editora = "Intrínseca", Categoria = Categoria.Romance, AnoPublicacao = 2011, Tipo = Tipo.Livro, CDD = "823.92" },
                new Item { ISBN = "9788580572766", Titulo = "Cem Anos de Solidão", Autor = "Gabriel García Márquez", Editora = "Record", Categoria = Categoria.Romance, AnoPublicacao = 1967, Tipo = Tipo.Livro, CDD = "863.64" },
                new Item { ISBN = "9788572327429", Titulo = "O Retrato de Dorian Gray", Autor = "Oscar Wilde", Editora = "Martin Claret", Categoria = Categoria.Romance, AnoPublicacao = 1890, Tipo = Tipo.Livro, CDD = "823.8" },
                new Item { ISBN = "9788501062080", Titulo = "O Iluminado", Autor = "Stephen King", Editora = "Suma", Categoria = Categoria.Terror, AnoPublicacao = 1977, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9788533615564", Titulo = "O Senhor dos Anéis: A Sociedade do Anel", Autor = "J.R.R. Tolkien", Editora = "HarperCollins", Categoria = Categoria.Fantasia, AnoPublicacao = 1954, Tipo = Tipo.Livro, CDD = "823.912" },
                new Item { ISBN = "9788576572725", Titulo = "Neuromancer", Autor = "William Gibson", Editora = "Aleph", Categoria = Categoria.FiccaoCientifica, AnoPublicacao = 1984, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9788535910193", Titulo = "Crime e Castigo", Autor = "Fiódor Dostoiévski", Editora = "34", Categoria = Categoria.Romance, AnoPublicacao = 1866, Tipo = Tipo.Livro, CDD = "891.733" },
                new Item { ISBN = "9788560281527", Titulo = "A Menina que Roubava Livros", Autor = "Markus Zusak", Editora = "Intrínseca", Categoria = Categoria.Romance, AnoPublicacao = 2005, Tipo = Tipo.Livro, CDD = "823.92" },
                new Item { ISBN = "9788525063007", Titulo = "O Conto da Aia", Autor = "Margaret Atwood", Editora = "Rocco", Categoria = Categoria.Distopia, AnoPublicacao = 1985, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9788575225123", Titulo = "Introdução ao HTML5 e CSS3", Autor = "Everton Coimbra", Editora = "Novatec", Categoria = Categoria.Tecnologia, AnoPublicacao = 2016, Tipo = Tipo.Livro, CDD = "005.1" },
                new Item { ISBN = "9788580444537", Titulo = "Game of Thrones: A Guerra dos Tronos", Autor = "George R.R. Martin", Editora = "Suma", Categoria = Categoria.Fantasia, AnoPublicacao = 1996, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9788520926493", Titulo = "Admirável Mundo Novo", Autor = "Aldous Huxley", Editora = "Biblioteca Azul", Categoria = Categoria.Distopia, AnoPublicacao = 1932, Tipo = Tipo.Livro, CDD = "823.912" },
                new Item { ISBN = "9788580573015", Titulo = "A Culpa é das Estrelas", Autor = "John Green", Editora = "Intrínseca", Categoria = Categoria.Romance, AnoPublicacao = 2012, Tipo = Tipo.Livro, CDD = "813.6" },
                new Item { ISBN = "9788575226939", Titulo = "Arquitetura Limpa", Autor = "Robert C. Martin", Editora = "Alta Books", Categoria = Categoria.Tecnologia, AnoPublicacao = 2017, Tipo = Tipo.Livro, CDD = "005.1" },
                new Item { ISBN = "9788575225635", Titulo = "O Codificador Limpo", Autor = "Robert C. Martin", Editora = "Alta Books", Categoria = Categoria.Tecnologia, AnoPublicacao = 2011, Tipo = Tipo.Livro, CDD = "005.1" },
                new Item { ISBN = "9788568014424", Titulo = "Homo Deus", Autor = "Yuval Noah Harari", Editora = "Companhia das Letras", Categoria = Categoria.Historia, AnoPublicacao = 2015, Tipo = Tipo.Livro, CDD = "909" },
                new Item { ISBN = "9788535914832", Titulo = "Quincas Borba", Autor = "Machado de Assis", Editora = "Companhia das Letras", Categoria = Categoria.Romance, AnoPublicacao = 1891, Tipo = Tipo.Livro, CDD = "869.93" },
                new Item { ISBN = "9788532530806", Titulo = "Harry Potter e a Câmara Secreta", Autor = "J.K. Rowling", Editora = "Rocco", Categoria = Categoria.Fantasia, AnoPublicacao = 1998, Tipo = Tipo.Livro, CDD = "823.914" },
                new Item { ISBN = "9788580572285", Titulo = "Extraordinário", Autor = "R.J. Palacio", Editora = "Intrínseca", Categoria = Categoria.Infantil, AnoPublicacao = 2012, Tipo = Tipo.Livro, CDD = "813.6" },
                new Item { ISBN = "9788576842316", Titulo = "Os Sete Hábitos das Pessoas Altamente Eficazes", Autor = "Stephen R. Covey", Editora = "BestSeller", Categoria = Categoria.Autoajuda, AnoPublicacao = 1989, Tipo = Tipo.Livro, CDD = "158.1" },
                new Item { ISBN = "9788580573299", Titulo = "Inferno", Autor = "Dan Brown", Editora = "Arqueiro", Categoria = Categoria.Misterio, AnoPublicacao = 2013, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9788501006954", Titulo = "O Exorcista", Autor = "William Peter Blatty", Editora = "HarperCollins", Categoria = Categoria.Terror, AnoPublicacao = 1971, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9788544102916", Titulo = "Frankenstein", Autor = "Mary Shelley", Editora = "DarkSide", Categoria = Categoria.Terror, AnoPublicacao = 1818, Tipo = Tipo.Livro, CDD = "823.7" },
                new Item { ISBN = "9788576573005", Titulo = "Fundação", Autor = "Isaac Asimov", Editora = "Aleph", Categoria = Categoria.FiccaoCientifica, AnoPublicacao = 1951, Tipo = Tipo.Livro, CDD = "813.54" },
                new Item { ISBN = "9788535904383", Titulo = "Grande Sertão: Veredas", Autor = "João Guimarães Rosa", Editora = "Companhia das Letras", Categoria = Categoria.Romance, AnoPublicacao = 1956, Tipo = Tipo.Livro, CDD = "869.93" },
                new Item { ISBN = "9788573516548", Titulo = "A Arte da Guerra", Autor = "Sun Tzu", Editora = "L&PM", Categoria = Categoria.Filosofia, AnoPublicacao = -500, Tipo = Tipo.Livro, CDD = "355.02" },
                new Item { ISBN = "9788580572162", Titulo = "Sherlock Holmes: Um Estudo em Vermelho", Autor = "Arthur Conan Doyle", Editora = "Zahar", Categoria = Categoria.Misterio, AnoPublicacao = 1887, Tipo = Tipo.Livro, CDD = "823.8" },
                new Item { ISBN = "9788531201554", Titulo = "O Cortiço", Autor = "Aluísio Azevedo", Editora = "Panda Books", Categoria = Categoria.Romance, AnoPublicacao = 1890, Tipo = Tipo.Livro, CDD = "869.93" },
            };

            context.Itens.AddRange(itens);
            context.SaveChanges();

            var itensDb = context.Itens.ToList();

            var exemplares = new List<Exemplar>
            {
                new Exemplar { ItemId = itensDb[0].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[0].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[1].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[1].Id, Status = StatusExemplar.Emprestado },
                new Exemplar { ItemId = itensDb[2].Id, Status = StatusExemplar.Emprestado },
                new Exemplar { ItemId = itensDb[2].Id, Status = StatusExemplar.Emprestado },
                new Exemplar { ItemId = itensDb[3].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[4].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[4].Id, Status = StatusExemplar.Emprestado },
                new Exemplar { ItemId = itensDb[5].Id, Status = StatusExemplar.Emprestado },
                new Exemplar { ItemId = itensDb[5].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[6].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[6].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[7].Id, Status = StatusExemplar.Emprestado },
                new Exemplar { ItemId = itensDb[8].Id, Status = StatusExemplar.Emprestado },
                new Exemplar { ItemId = itensDb[8].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[9].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[9].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[10].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[11].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[11].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[12].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[12].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[13].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[14].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[14].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[15].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[16].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[16].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[17].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[18].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[18].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[19].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[19].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[19].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[20].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[20].Id, Status = StatusExemplar.Disponivel },    
                new Exemplar { ItemId = itensDb[21].Id, Status = StatusExemplar.Disponivel },    
                new Exemplar { ItemId = itensDb[22].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[22].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[22].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[23].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[23].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[24].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[24].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[25].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[25].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[25].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[26].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[27].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[27].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[28].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[28].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[29].Id, Status = StatusExemplar.Disponivel }, 
                new Exemplar { ItemId = itensDb[30].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[30].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[30].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[31].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[31].Id, Status = StatusExemplar.Disponivel },   
                new Exemplar { ItemId = itensDb[32].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[33].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[33].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[33].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[34].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[34].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[35].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[35].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[36].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[37].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[37].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[37].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[38].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[38].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[39].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[40].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[40].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[41].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[41].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[42].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[43].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[43].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[43].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[44].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[45].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[45].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[46].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[46].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[46].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[47].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[47].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[48].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[49].Id, Status = StatusExemplar.Disponivel },
                new Exemplar { ItemId = itensDb[49].Id, Status = StatusExemplar.Disponivel }
            };

            context.Exemplares.AddRange(exemplares);
            context.SaveChanges();

            var exemplaresAdicionados = context.Exemplares.ToList();

            var emprestimos = new List<Emprestimo>
            {
                new Emprestimo
                {
                    UsuarioId = 2,
                    ExemplarId = exemplaresAdicionados[0].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-30),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-15),
                    DataDevolucao = DateTime.UtcNow.AddDays(-14),
                    Status = StatusEmprestimo.Devolvido
                },
                new Emprestimo
                {
                    UsuarioId = 2,
                    ExemplarId = exemplaresAdicionados[20].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-25),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-10),
                    DataDevolucao = DateTime.UtcNow.AddDays(-9),
                    Status = StatusEmprestimo.Devolvido
                },
                new Emprestimo
                {
                    UsuarioId = 2,
                    ExemplarId = exemplaresAdicionados[22].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-20),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-5),
                    DataDevolucao = DateTime.UtcNow.AddDays(-4),
                    Status = StatusEmprestimo.Devolvido
                },
                new Emprestimo
                {
                    UsuarioId = 2,
                    ExemplarId = exemplaresAdicionados[3].Id,
                },
                new Emprestimo
                {
                    UsuarioId = 2,
                    ExemplarId = exemplaresAdicionados[4].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-5),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(10),
                    Status = StatusEmprestimo.Emprestado
                },
                new Emprestimo
                {
                    UsuarioId = 3,
                    ExemplarId = exemplaresAdicionados[15].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-40),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-25),
                    DataDevolucao = DateTime.UtcNow.AddDays(-24),
                    Status = StatusEmprestimo.Devolvido
                },
                new Emprestimo
                {
                    UsuarioId = 3,
                    ExemplarId = exemplaresAdicionados[2].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-35),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-20),
                    DataDevolucao = DateTime.UtcNow.AddDays(-19),
                    Status = StatusEmprestimo.Devolvido
                },
                new Emprestimo
                {
                    UsuarioId = 3,
                    ExemplarId = exemplaresAdicionados[12].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-28),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-13),
                    DataDevolucao = DateTime.UtcNow.AddDays(-12),
                    Status = StatusEmprestimo.Devolvido
                },
                new Emprestimo
                {
                    UsuarioId = 3,
                    ExemplarId = exemplaresAdicionados[5].Id,
                },
                new Emprestimo
                {
                    UsuarioId = 3,
                    ExemplarId = exemplaresAdicionados[8].Id,                    
                },
                new Emprestimo
                {
                    UsuarioId = 3,
                    ExemplarId = exemplaresAdicionados[9].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-5),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(10),
                },
                new Emprestimo
                {
                    UsuarioId = 4,
                    ExemplarId = exemplaresAdicionados[10].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-50),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-35),
                    DataDevolucao = DateTime.UtcNow.AddDays(-34),
                    Status = StatusEmprestimo.Devolvido
                },
                new Emprestimo
                {
                    UsuarioId = 4,
                    ExemplarId = exemplaresAdicionados[16].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-45),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-30),
                    DataDevolucao = DateTime.UtcNow.AddDays(-29),
                    Status = StatusEmprestimo.Devolvido
                },
                new Emprestimo
                {
                    UsuarioId = 4,
                    ExemplarId = exemplaresAdicionados[12].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-38),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-23),
                    DataDevolucao = DateTime.UtcNow.AddDays(-22),
                    Status = StatusEmprestimo.Devolvido
                },
                new Emprestimo
                {
                    UsuarioId = 4,
                    ExemplarId = exemplaresAdicionados[13].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-18),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-3),
                    Status = StatusEmprestimo.Emprestado
                },
                new Emprestimo
                {
                    UsuarioId = 4,
                    ExemplarId = exemplaresAdicionados[14].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-18),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-3),
                    Status = StatusEmprestimo.Emprestado
                }
            };

            context.Emprestimos.AddRange(emprestimos);
            context.SaveChanges();

            var eventos = new List<Evento>
            {
                new Evento
                {
                    Titulo = "Clube de Magic",
                    Descricao = "Encontros para jogadores de Magic: The Gathering. Traga seu deck!",
                    Categoria = CategoriaEvento.ClubeDeJogos,
                    DiaSemana = DiaSemana.TerçaFeira,
                    Hora = "18h - 20h"
                },
                new Evento
                {
                    Titulo = "Clube de Xadrez",
                    Descricao = "Prática e estudo de xadrez para todos os níveis.",
                    Categoria = CategoriaEvento.ClubeDeJogos,
                    DiaSemana = DiaSemana.QuartaFeira,
                    Hora = "14h - 16h"
                },
                new Evento
                {
                    Titulo = "Biblio-Games",
                    Descricao = "Espaço aberto para board games e jogos variados.",
                    Categoria = CategoriaEvento.ClubeDeJogos,
                    DiaSemana = DiaSemana.QuintaFeira,
                    Hora = "15h - 20h"
                },
                new Evento
                {
                    Titulo = "Clube de Magic",
                    Descricao = "Segundo encontro semanal de Magic.",
                    Categoria = CategoriaEvento.ClubeDeJogos,
                    DiaSemana = DiaSemana.QuintaFeira,
                    Hora = "18h - 20h"
                },
                new Evento
                {
                    Titulo = "Clube de Xadrez",
                    Descricao = "Encontro de sábado para quem não pode vir durante a semana.",
                    Categoria = CategoriaEvento.ClubeDeJogos,
                    DiaSemana = DiaSemana.Sabado,
                    Hora = "15h - 17h"
                },
                new Evento
                {
                    Titulo = "Clube de Leitura: Abril",
                    Descricao = "Debate sobre o livro do mês. Venha compartilhar suas impressões!",
                    Categoria = CategoriaEvento.ClubeDoLivro,
                    LivroDoMes = "A elegância do ouriço",
                    Autor = "Muriel Barbery",
                    DataHora = new DateTime(2026, 04, 09, 16, 30, 0)
                },
                new Evento
                {
                    Titulo = "Clube de Leitura: Maio",
                    Descricao = "Debate mensal sobre literatura contemporânea.",
                    Categoria = CategoriaEvento.ClubeDoLivro,
                    LivroDoMes = "Para não acabar tão cedo",
                    Autor = "Clarice Freire",
                    DataHora = new DateTime(2026, 05, 14, 16, 30, 0)
                }
            };

            context.Eventos.AddRange(eventos);
            context.SaveChanges();

            var notificacoes = new List<Notificacao>
            {
                new Notificacao
                {
                    UsuarioId = 2,
                    Mensagem = "Primeiro acesso: Altere sua senha para manter sua conta segura.",
                    DataCriacao = DateTime.Now,
                    Lida = false,
                    Tipo = TipoNotificacao.Alerta
                },
                new Notificacao
                {
                    UsuarioId = 3,
                    Mensagem = "Primeiro acesso: Altere sua senha para manter sua conta segura.",
                    DataCriacao = DateTime.Now,
                    Lida = false,
                    Tipo = TipoNotificacao.Alerta
                },
                new Notificacao
                {
                    UsuarioId = 4,
                    Mensagem = "Primeiro acesso: Altere sua senha para manter sua conta segura.",
                    DataCriacao = DateTime.Now,
                    Lida = false,
                    Tipo = TipoNotificacao.Alerta
                }
            };

            context.Notificacoes.AddRange(notificacoes);
            context.SaveChanges();

        }
    }
}
