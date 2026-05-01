using BibliotecaSR.Controllers;
using BibliotecaSR.Data;
using BibliotecaSR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Security.Claims;

namespace BibliotecaSR.Tests
{
    [TestFixture]
    class UsuarioTest
    {
        private AppDbContext _context;
        private UsuariosController _controller;

        private void MockLogedUser(string id)
        {
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, id),
                new Claim(ClaimTypes.Role, "Usuario")
            }, "mock"));

            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "bibliotecasr-bd" + Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);


            _context.Database.EnsureCreated();

            DbSeeder.Seed(_context);

            _controller = new UsuariosController(_context);
        }

        [Test]
        public async Task Get_ExistingIdPassed_ReturnsRightItem()
        {
            MockLogedUser("2");

            // Ação

            var result = await _controller.GetById(2);

            //Asserção

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as Usuario;
            Assert.NotNull(actual);

            Assert.That(actual.Id, Is.EqualTo(2));
            Assert.That(actual.Nome, Is.EqualTo("Geovana"));
        }

        [Test]
        public async Task Update_ExistingIdPassed_ReturnsNoContent()
        {
            MockLogedUser("2");

            // Arranjo

            var atualizaUsuario = new UsuarioDto
            {
                Email = "geovana_miranda@gmail.com",
                Senha = "54321",
            };

            // Ação

            var result = await _controller.Update(2, atualizaUsuario);

            //Asserção 

            Assert.IsInstanceOf<NoContentResult>(result);                      

            var dbBiblioteca = _context.Usuarios.Find(2);
            Assert.NotNull(dbBiblioteca);
            Assert.That(dbBiblioteca.Nome, Is.EqualTo("Geovana"));
            Assert.That(dbBiblioteca.Email, Is.EqualTo("geovana_miranda@gmail.com"));
            Assert.IsTrue(BCrypt.Net.BCrypt.Verify("54321", dbBiblioteca.Senha));
        }

        [Test]
        public async Task GetById_TryGetAnotherUser_ReturnsForbid()
        {
            MockLogedUser("2");

            // Ação

            var result = await _controller.GetById(3);

            //Asserção

            Assert.IsInstanceOf<ForbidResult>(result);

        }

        [Test]
        public async Task Update_TryUpdateAnotherUser_ReturnsForbid()
        {
            MockLogedUser("2");

            // Arranjo

            var atualizaUsuario = new UsuarioDto
            {
                Email = "geovana_miranda@gmail.com",
                Senha = "54321",
            };

            // Ação

            var result = await _controller.Update(3, atualizaUsuario);

            //Asserção 

            Assert.IsInstanceOf<ForbidResult>(result);
        }

        [Test]
        public async Task Authenticate_ValidCredentials_ReturnsToken()
        {
            // Arranjo:

            var data = new UsuarioDto
            {
                Email = "maria@gmail.com",
                Senha = "maria123"
            };

            // Ação:

            var result = await _controller.Authenticate(data) as OkObjectResult;

            //Asserção

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult?.Value);

            string json = JsonSerializer.Serialize(okResult.Value);
            var tokenDict = JsonSerializer.Deserialize<Dictionary<string, string>>(json);

            Assert.NotNull(tokenDict);
            Assert.True(tokenDict.ContainsKey("jwtToken"));
            Assert.IsNotEmpty(tokenDict["jwtToken"]);
        }

        [Test]
        public async Task Authenticate_InvalidPassword_ReturnsUnauthorized()
        {
            // Arranjo:

            var data = new UsuarioDto
            {
                Email = "maria@gmail.com",
                Senha = "12345"
            };

            // Ação:

            var result = await _controller.Authenticate(data);

            //Asserção

            Assert.IsInstanceOf<UnauthorizedResult>(result);
        }

        [Test]
        public async Task Authenticate_InvalidEmail_ReturnsUnauthorized()
        {
            // Arranjo:

            var data = new UsuarioDto
            {
                Email = "maria_silva@gmail.com",
                Senha = "maria123"
            };

            // Ação:

            var result = await _controller.Authenticate(data);

            //Asserção

            Assert.IsInstanceOf<UnauthorizedResult>(result);

        }
    }
}
