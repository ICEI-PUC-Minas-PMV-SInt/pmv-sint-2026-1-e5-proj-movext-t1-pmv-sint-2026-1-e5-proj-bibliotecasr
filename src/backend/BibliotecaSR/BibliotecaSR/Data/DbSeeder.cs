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
                new Item { ISBN = "9788533613379", Titulo = "O Mundo de Sofia", Autor = "Jostein Gaarder", Editora = "Companhia das Letras", Categoria = Categoria.Filosofia, AnoPublicacao = 1991, Tipo = Tipo.Livro, CDD = "109" }
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
                new Exemplar { ItemId = itensDb[2].Id, Status = StatusExemplar.Disponivel },
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
                new Exemplar { ItemId = itensDb[19].Id, Status = StatusExemplar.Disponivel }
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
                },
                new Emprestimo
                {
                    UsuarioId = 3,
                    ExemplarId = exemplaresAdicionados[5].Id,
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
                    ExemplarId = exemplaresAdicionados[8].Id,
                },
                new Emprestimo
                {
                    UsuarioId = 3,
                    ExemplarId = exemplaresAdicionados[9].Id,
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
                    Status = StatusEmprestimo.Atrasado
                },
                new Emprestimo
                {
                    UsuarioId = 4,
                    ExemplarId = exemplaresAdicionados[14].Id,
                    DataRetirada = DateTime.UtcNow.AddDays(-18),
                    DataPrevistaDevolucao = DateTime.UtcNow.AddDays(-3),
                    Status = StatusEmprestimo.Atrasado
                }
            };

            context.Emprestimos.AddRange(emprestimos);
            context.SaveChanges();

        }
    }
}
