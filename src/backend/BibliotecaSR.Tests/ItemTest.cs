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
    class ItemTest
    {
        private AppDbContext _context;
        private ItensController _controller;

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

            _controller = new ItensController(_context);
        }

        [Test]
        public async Task GetAll_ReturnsAllItens()
        {
            var result = await _controller.GetAll(null);

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as List<Item>;
            Assert.NotNull(actual);

            Assert.That(actual.Count, Is.EqualTo(50));
        }

        [Test]
        public async Task GetAll_WithExistingTitulo_ReturnsFilteredItens()
        {
            var result = await _controller.GetAll("Harry");

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as List<Item>;
            Assert.NotNull(actual);

            Assert.That(actual.Count, Is.EqualTo(2));
        }

        [Test]
        public async Task GetAll_WithNonExistingTitulo_ReturnsFilteredItens()
        {
            var result = await _controller.GetAll("ponciá");

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as List<Item>;
            Assert.NotNull(actual);

            Assert.That(actual.Count, Is.EqualTo(0));
        }

        [Test]
        public async Task GetRecentes_ReturnsRecentItens()
        {
            var result = await _controller.GetRecentes();

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as List<Item>;

            Assert.NotNull(actual);
            Assert.That(actual.Count, Is.EqualTo(10));

            Assert.That(actual[0].DataCadastro >= actual[1].DataCadastro);
        }

        [Test]
        public async Task GetById_ExistingIdPassed_ReturnsRightItem()
        {
            var result = await _controller.GetById(1);

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value;

            Assert.NotNull(actual);

            var id = (int)actual.GetType().GetProperty("Id").GetValue(actual);
            var titulo = (string)actual.GetType().GetProperty("Titulo").GetValue(actual);

            Assert.That(id, Is.EqualTo(1));
            Assert.That(titulo, Is.EqualTo("Dom Casmurro"));
        }

        [Test]
        public async Task GetById_NonExistingIdPassed_ReturnsNotFound()
        {
            var result = await _controller.GetById(999);

            Assert.IsInstanceOf<NotFoundResult>(result);
        }
    }
}
