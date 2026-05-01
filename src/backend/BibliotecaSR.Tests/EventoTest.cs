using BibliotecaSR.Controllers;
using BibliotecaSR.Data;
using BibliotecaSR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BibliotecaSR.Tests
{
    [TestFixture]
    class EventoTest
    {
        private AppDbContext _context;
        private EventosController _controller;

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

            _controller = new EventosController(_context);
        }

        [Test]
        public async Task GetAll_ReturnsAllItens()
        {
            // Ação 

            var result = await _controller.GetAll();

            // Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as List<Evento>;
            Assert.NotNull(actual);

            Assert.That(actual.Count, Is.EqualTo(7));
        }

        [Test]
        public async Task Create_ValidObjectPassed_ReturnsCreatedResponse()
        {
            MockLogedUser("1");

            // Arranjo

            var novoEvento = new Evento
            {
                Titulo = "Clube de Pokemon Go",
                Descricao = "Encontros para jogadores de Pokemon Go.",
                Categoria = CategoriaEvento.ClubeDeJogos,
                DiaSemana = DiaSemana.SegundaFeira,
                Hora = "14h - 16h"
            };

            // Ação

            var result = await _controller.Create(novoEvento);

            //Asserção 

            Assert.IsInstanceOf<CreatedAtActionResult>(result);

            var createdResult = result as CreatedAtActionResult;
            Assert.NotNull(createdResult?.Value);

            var actual = createdResult.Value as Evento;
            Assert.NotNull(actual);            
            Assert.That(actual.Titulo, Is.EqualTo("Clube de Pokemon Go"));
            Assert.That(actual.Descricao, Is.EqualTo("Encontros para jogadores de Pokemon Go."));
            Assert.That(actual.Hora, Is.EqualTo("14h - 16h"));
            Assert.That(actual.Categoria, Is.EqualTo(CategoriaEvento.ClubeDeJogos));
            Assert.That(actual.DiaSemana, Is.EqualTo(DiaSemana.SegundaFeira));

            var dbBiblioteca = _context.Eventos.FirstOrDefault(c => c.Titulo == "Clube de Pokemon Go");
            Assert.NotNull(dbBiblioteca);
            Assert.That(dbBiblioteca.Descricao, Is.EqualTo("Encontros para jogadores de Pokemon Go."));
        }

        [Test]
        public async Task Get_ExistingIdPassed_ReturnsRightItem()
        {
            // Ação

            var result = await _controller.GetById(1);

            //Asserção

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as Evento;
            Assert.NotNull(actual);

            Assert.That(actual.Id, Is.EqualTo(1));
            Assert.That(actual.Titulo, Is.EqualTo("Clube de Magic"));
        }

        [Test]
        public async Task Update_ExistingIdPassed_ReturnsNoContent()
        {
            MockLogedUser("1");

            // Arranjo

            var atualizaEvento = new Evento
            {
                Id = 1,
                Titulo = "Clube de Magic",
                Descricao = "Encontros para jogadores de Magic: The Gathering. Traga seu deck!",
                Categoria = CategoriaEvento.ClubeDeJogos,
                DiaSemana = DiaSemana.Domingo,
                Hora = "12h - 15h"
            };

            // Ação

            var result = await _controller.Update(1, atualizaEvento);

            //Asserção 

            Assert.IsInstanceOf<NoContentResult>(result);

            var dbBiblioteca = _context.Eventos.Find(1);
            Assert.NotNull(dbBiblioteca);
            Assert.That(dbBiblioteca.Titulo, Is.EqualTo("Clube de Magic"));
            Assert.That(dbBiblioteca.Descricao, Is.EqualTo("Encontros para jogadores de Magic: The Gathering. Traga seu deck!"));
            Assert.That(dbBiblioteca.DiaSemana, Is.EqualTo(DiaSemana.Domingo));
            Assert.That(dbBiblioteca.Hora, Is.EqualTo("12h - 15h"));
        }

        [Test]
        public async Task Delete_ExistingIdPassed_ReturnsNoContent()
        {

            MockLogedUser("1");

            // Ação

            var result = await _controller.Delete(1);

            //Asserção 

            Assert.IsInstanceOf<NoContentResult>(result);

            var eventoDeletado = _context.Eventos.Find(1);
            Assert.Null(eventoDeletado);
        }

    }
}
