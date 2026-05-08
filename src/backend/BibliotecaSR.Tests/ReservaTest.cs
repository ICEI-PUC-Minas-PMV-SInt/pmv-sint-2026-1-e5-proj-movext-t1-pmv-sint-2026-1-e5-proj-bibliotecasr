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
    class ReservaTest
    {
        private AppDbContext _context;
        private ReservasController _controller;

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

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            DbSeeder.Seed(_context);

            _context.Reservas.AddRange(new List<Reserva>
            {
                new Reserva {UsuarioId = 2, ItemId = 1, Status = StatusReserva.EmAnalise, DataSolicitacao = DateTime.Now },
                new Reserva {UsuarioId = 2, ItemId = 2, Status = StatusReserva.EmAnalise, DataSolicitacao = DateTime.Now },
                new Reserva {UsuarioId = 2, ItemId = 3, Status = StatusReserva.AguardandoRetirada, DataSolicitacao = DateTime.Now.AddDays(-1) },
                new Reserva {UsuarioId = 2, ItemId = 3, Status = StatusReserva.Desistiu, DataSolicitacao = DateTime.Now.AddDays(-1) },
                new Reserva {UsuarioId = 3, ItemId = 3, Status = StatusReserva.AguardandoRetirada, DataSolicitacao = DateTime.Now.AddDays(-5), DataLimiteRetirada = DateTime.Now.AddDays(-1) },

            });

            _context.SaveChanges();

            _controller = new ReservasController(_context);
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

            var actual = okResult.Value as List<Reserva>;
            Assert.NotNull(actual);

            Assert.That(actual.Count, Is.EqualTo(5));
        }

        [Test]
        public async Task GetAll_ReservasPendentes_ReturnsAllItens()
        {
            // Ação 

            var actionResult = await _controller.GetReservasPendentes();

            var result = actionResult.Result;

            // Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as IEnumerable<Reserva>;
            Assert.NotNull(actual);

            Assert.That(actual.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task GetAll_ReservasConfirmadas_ReturnsAllItens()
        {
            // Ação 

            var actionResult = await _controller.GetReservasConfirmadas();

            var result = actionResult.Result;

            // Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as IEnumerable<Reserva>;
            Assert.NotNull(actual);

            Assert.That(actual.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task GetAll_ReservasDesistencias_ReturnsAllItens()
        {
            // Ação 

            var actionResult = await _controller.GetReservasDesistencias();

            var result = actionResult.Result;

            // Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as IEnumerable<Reserva>;
            Assert.NotNull(actual);

            Assert.That(actual.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetAll_ReservasExpiradas_ReturnsAllItens()
        {
            // Ação 

            var actionResult = await _controller.GetReservasExpiradas();

            var result = actionResult.Result;

            // Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as IEnumerable<Reserva>;
            Assert.NotNull(actual);

            Assert.That(actual.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetAll_MinhasReservas_ReturnsAllItens()
        {
            MockLogedUser("2", "Usuario");

            // Ação 

            var result = await _controller.GetMinhasReservas(2);

            // Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as System.Collections.IEnumerable;
            Assert.NotNull(actual);

            var count = 0;
            foreach (var item in actual) count++;
            Assert.That(count, Is.EqualTo(4));
        }

        [Test]
        public async Task Cancelar_ReservaEmAnalise_DeveMudarStatusParaCancelada()
        {
            MockLogedUser("2", "Usuario");

            // Ação

            var result = await _controller.Cancelar(1);

            // Asserção
            Assert.IsInstanceOf<NoContentResult>(result);

            var reservaNoBanco = await _context.Reservas.FindAsync(1);
            Assert.That(reservaNoBanco.Status, Is.EqualTo(StatusReserva.Cancelada));
        }

        [Test]
        public async Task Cancelar_ReservaAguardandoRetirada_DeveMudarStatusParaDesistiu()
        {
            MockLogedUser("2", "Usuario");

            // Ação

            var result = await _controller.Cancelar(3);

            // Asserção

            Assert.IsInstanceOf<NoContentResult>(result);

            var reservaNoBanco = await _context.Reservas.FindAsync(3);
            Assert.That(reservaNoBanco.Status, Is.EqualTo(StatusReserva.Desistiu));
        }

        [Test]
        public async Task ConfirmarReserva_DeveMudarStatusParaAguardandoRetirada()
        {
            MockLogedUser("1", "Funcionario");

            // Ação

            var result = await _controller.Confirmar(1);

            // Asserção

            Assert.IsInstanceOf<NoContentResult>(result);

            var reservaNoBanco = await _context.Reservas.FindAsync(1);
            Assert.That(reservaNoBanco.Status, Is.EqualTo(StatusReserva.AguardandoRetirada));
            Assert.That(reservaNoBanco.DataLimiteRetirada.Value.Date, Is.EqualTo(DateTime.Now.AddDays(3).Date));
        }

        [Test]
        public async Task ReservaNaoEfetivada_DeveMudarStatusParaNaoEfetivada()
        {
            MockLogedUser("1", "Funcionario");

            // Ação

            var result = await _controller.NaoEfetivada(1);

            // Asserção

            Assert.IsInstanceOf<NoContentResult>(result);

            var reservaNoBanco = await _context.Reservas.FindAsync(1);
            Assert.That(reservaNoBanco.Status, Is.EqualTo(StatusReserva.NaoEfetivada));
        }

        [Test]
        public async Task ReservaConcluida_DeveMudarStatusParaConcluida()
        {
            MockLogedUser("1", "Funcionario");

            // Ação

            var result = await _controller.Concluida(3);

            // Asserção

            Assert.IsInstanceOf<NoContentResult>(result);

            var reservaNoBanco = await _context.Reservas.FindAsync(3);
            Assert.That(reservaNoBanco.Status, Is.EqualTo(StatusReserva.Concluida));
        }

        [Test]
        public async Task EncerrarExpiradas_DeveMudarStatusParaNaoEfetivada()
        {
            MockLogedUser("1", "Funcionario");

            // Ação

            var result = await _controller.EncerrarExpiradas();

            // Asserção

            Assert.IsInstanceOf<NoContentResult>(result);

            var reservaNoBanco = await _context.Reservas.FindAsync(5);
            Assert.That(reservaNoBanco.Status, Is.EqualTo(StatusReserva.NaoEfetivada));
        }

        [Test]
        public async Task Create_ValidObjectPassed_ReturnsOk()
        {
            MockLogedUser("3", "Usuario");

            // Ação

            var result = await _controller.SolicitarReserva(10);

            //Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var createdResult = result as OkObjectResult;
            Assert.NotNull(createdResult?.Value);

            var actual = createdResult.Value as Reserva;
            Assert.NotNull(actual);
            Assert.That(actual.UsuarioId, Is.EqualTo(3));
            Assert.That(actual.ItemId, Is.EqualTo(10));
            Assert.That(actual.Status, Is.EqualTo(StatusReserva.EmAnalise));

            var reservaNoBanco = await _context.Reservas.CountAsync(r => r.ItemId == 10 && r.UsuarioId == 3);
            Assert.That(reservaNoBanco, Is.EqualTo(1));
        }

        [Test]
        public async Task Create_UsuarioJaPossuiReservaDesseItem_ReturnsBadRequest()
        {
            MockLogedUser("2", "Usuario");

            // Ação

            var result = await _controller.SolicitarReserva(1);

            //Asserção 

            Assert.IsInstanceOf<BadRequestObjectResult>(result);

            var badRequest = result as BadRequestObjectResult;
            Assert.That(badRequest.Value, Is.EqualTo("Você já solicitou uma reserva para este item."));
        }

        [Test]
        public async Task Create_UsuarioJaAtingiuLimiteReserva_ReturnsBadRequest()
        {
            MockLogedUser("2", "Usuario");

            // Ação

            var result = await _controller.SolicitarReserva(19);

            //Asserção 

            Assert.IsInstanceOf<BadRequestObjectResult>(result);

            var badRequest = result as BadRequestObjectResult;
            Assert.That(badRequest.Value, Is.EqualTo("Você já atingiu o limite de 3 reservas."));
        }

        [Test]
        public async Task Create_ItemJaEstaEmprestadoPeloUsuario_ReturnsBadRequest()
        {
            MockLogedUser("2", "Usuario");

            var emprestimoAtivo = await _context.Emprestimos
                .Include(e => e.Exemplar)
                .FirstOrDefaultAsync(e => e.UsuarioId == 2 && e.Status == StatusEmprestimo.Emprestado);

            var itemIdEmprestado = emprestimoAtivo.Exemplar.ItemId;

            // Ação

            var result = await _controller.SolicitarReserva(itemIdEmprestado);

            //Asserção 

            Assert.IsInstanceOf<BadRequestObjectResult>(result);

            var badRequest = result as BadRequestObjectResult;
            Assert.That(badRequest.Value, Is.EqualTo("Você já possui este item emprestado."));
        }
    }
}
