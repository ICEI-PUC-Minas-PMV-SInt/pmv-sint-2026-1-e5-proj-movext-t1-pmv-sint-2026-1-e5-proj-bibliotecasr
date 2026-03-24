using Microsoft.EntityFrameworkCore;

namespace BibliotecaSR.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);         

            var aux = new Usuario
            {
                Id = 1,
                Nome = "Charlie",
                Email = "charlie@gmail.com",
                Senha = "$2a$11$2ETt9/wToZgZd5NOR4AZROHpvMWwrzSMYbbnJJkEur4AaGISK0Lvy", //admin123
                Perfil = Perfil.Funcionario
            };
            var user = new Usuario
            {
                Id = 2,
                Nome = "Geovana",
                Email = "geovana@gmail.com",
                Senha = "$2a$11$6PAugevBqTqrfKPgQyvOGONZ3vXrNVaZvHUgF9EtMezQ3rpfTRDRW", //geovana123
                Status = Status.Ativo,
                Perfil = Perfil.Usuario
            };
            var user2 = new Usuario
            {
                Id = 3,
                Nome = "Maria",
                Email = "maria@gmail.com",
                Senha = "$2a$11$nj5xtOPG4.h1oRi7hg10vOzGZwYrUaYnMo6Dk.xPfrea6EYRTg4P.", //maria123
                Status = Status.Ativo,
                Perfil = Perfil.Usuario
            };
            var user3 = new Usuario
            {
                Id = 4,
                Nome = "Rodrigo",
                Email = "rodrigo@gmail.com",
                Senha = "$2a$11$krSnweECHsBVNdsz9UKjsOfe/UiqbsPbqwNMHvKiVyoNZYjKPH0oW", //rodrigo123
                Status = Status.Ativo,
                Perfil = Perfil.Usuario
            };

            modelBuilder.Entity<Usuario>().HasData(aux, user, user2, user3);            

        }

        }
}
