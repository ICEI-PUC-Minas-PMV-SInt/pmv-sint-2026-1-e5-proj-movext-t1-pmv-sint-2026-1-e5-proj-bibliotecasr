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
    class EmprestimoTest
    {
        private AppDbContext _context;
        private EmprestimosController _controller;

        private void MockLogedUser(string id, string role)
        {
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, id),
                new Claim(ClaimTypes.Role, role)
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

            _controller = new EmprestimosController(_context);
        }

        [Test]
        public async Task GetByUsuario_ReturnsEmprestimos()
        {
            MockLogedUser("3", "Usuario");

            var result = await _controller.GetByUsuario(3);


            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as System.Collections.IEnumerable;

            Assert.NotNull(actual);

            int count = 0;
            foreach (var item in actual) count++;

            Assert.That(count, Is.EqualTo(6));
        }

        [Test]
        public async Task GetByUsuario_EmprestimoFromAnotherUser_ReturnsForbid()
        {
            MockLogedUser("3", "Usuario");

            var result = await _controller.GetByUsuario(2);

            Assert.IsInstanceOf<ForbidResult>(result);
        }

        [Test]
        public async Task GetById_ExistingIdPassed_ReturnsRightItem()
        {
            MockLogedUser("3", "Usuario");

            var emprestimoDb = await _context.Emprestimos
                .Include(e => e.Exemplar)
                .ThenInclude(ex => ex.Item)
                .FirstAsync(e => e.Id == 6);

            Console.WriteLine($"ExemplarId: {emprestimoDb.ExemplarId}");
            Console.WriteLine($"Título: {emprestimoDb.Exemplar.Item.Titulo}");

            var result = await _controller.GetById(6);

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value;

            Assert.NotNull(actual);

            var id = (int)actual.GetType().GetProperty("Id").GetValue(actual);
            var titulo = (string)actual.GetType().GetProperty("Titulo").GetValue(actual);

            Assert.That(id, Is.EqualTo(emprestimoDb.Id));
            Assert.That(titulo, Is.EqualTo(emprestimoDb.Exemplar.Item.Titulo));
        }

        [Test]
        public async Task Devolver_EmprestimoAtivo_ReturnsNoContent()
        {
            MockLogedUser("1", "Funcionario");

            var result = await _controller.Devolver(5);

            Assert.IsInstanceOf<NoContentResult>(result);

            var emprestimo = await _context.Emprestimos
                .Include(e => e.Exemplar)
                .FirstOrDefaultAsync(e => e.Id == 5);

            Assert.That(emprestimo.Status, Is.EqualTo(StatusEmprestimo.Devolvido));
            Assert.That(emprestimo.Exemplar.Status, Is.EqualTo(StatusExemplar.Disponivel));
        }

        [Test]
        public async Task Devolver_EmprestimoDevolvido_ReturnsBadRequest()
        {
            MockLogedUser("1", "Funcionario");

            var result = await _controller.Devolver(6);

            Assert.IsInstanceOf<BadRequestResult>(result);
        }
    }
}
