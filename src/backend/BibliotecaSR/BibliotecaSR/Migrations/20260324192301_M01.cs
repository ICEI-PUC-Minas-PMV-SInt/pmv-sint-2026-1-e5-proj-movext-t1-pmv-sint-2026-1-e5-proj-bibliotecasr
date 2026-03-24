using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BibliotecaSR.Migrations
{
    /// <inheritdoc />
    public partial class M01 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Perfil = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Usuarios",
                columns: new[] { "Id", "Email", "Nome", "Perfil", "Senha", "Status" },
                values: new object[,]
                {
                    { 1, "charlie@gmail.com", "Charlie", 0, "$2a$11$2ETt9/wToZgZd5NOR4AZROHpvMWwrzSMYbbnJJkEur4AaGISK0Lvy", null },
                    { 2, "geovana@gmail.com", "Geovana", 1, "$2a$11$6PAugevBqTqrfKPgQyvOGONZ3vXrNVaZvHUgF9EtMezQ3rpfTRDRW", 0 },
                    { 3, "maria@gmail.com", "Maria", 1, "$2a$11$nj5xtOPG4.h1oRi7hg10vOzGZwYrUaYnMo6Dk.xPfrea6EYRTg4P.", 0 },
                    { 4, "rodrigo@gmail.com", "Rodrigo", 1, "$2a$11$krSnweECHsBVNdsz9UKjsOfe/UiqbsPbqwNMHvKiVyoNZYjKPH0oW", 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
