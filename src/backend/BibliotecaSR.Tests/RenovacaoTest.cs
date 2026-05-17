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
    class RenovacaoTest
    {
        private AppDbContext _context;
        private RenovacoesController _controller;

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

            var ativos = _context.Emprestimos
                .Where(e => e.Status == StatusEmprestimo.Emprestado && e.DataPrevistaDevolucao > DateTime.Now)
                .Take(4)
                .ToList();

            if (ativos.Count >= 4)
            {
                var novasRenovacoes = new List<Renovacao>
                {
                    new Renovacao { EmprestimoId = ativos[0].Id, Status = StatusRenovacao.EmAnalise, DataSolicitacao = DateTime.Now },
                    new Renovacao { EmprestimoId = ativos[1].Id, Status = StatusRenovacao.EmAnalise, DataSolicitacao = DateTime.Now },
                    new Renovacao { EmprestimoId = ativos[2].Id, Status = StatusRenovacao.Aprovada, DataSolicitacao = DateTime.Now.AddDays(-1), DataAtualizacao = DateTime.Now },
                    new Renovacao { EmprestimoId = ativos[3].Id, Status = StatusRenovacao.NaoEfetivada, DataSolicitacao = DateTime.Now.AddDays(-2), DataAtualizacao = DateTime.Now }
                };

                _context.Renovacoes.AddRange(novasRenovacoes);
                _context.SaveChanges();
            }

            _controller = new RenovacoesController(_context);
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

            var actual = okResult.Value as List<Renovacao>;
            Assert.NotNull(actual);

            Assert.That(actual.Count, Is.EqualTo(4));
        }

        [Test]
        public async Task GetAll_RenovacoesPendentes_ReturnsAllItens()
        {
            // Ação 

            var actionResult = await _controller.GetRenovacoesPendentes();

            var result = actionResult.Result;

            // Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = (okResult.Value as System.Collections.IEnumerable)?
                    .Cast<dynamic>()
                    .ToList(); Assert.NotNull(actual);

            Assert.That(actual.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task GetAll_RenovacoessConfirmadas_ReturnsAllItens()
        {
            // Ação 

            var actionResult = await _controller.GetRenovacoesConfirmadas();

            var result = actionResult.Result;

            // Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = (okResult.Value as System.Collections.IEnumerable)?
                    .Cast<dynamic>()
                    .ToList(); Assert.NotNull(actual);

            Assert.That(actual.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetAll_RenovacoessNaoEfetivadas_ReturnsAllItens()
        {
            // Ação 

            var actionResult = await _controller.GetRenovacoesNaoEfetivadas();

            var result = actionResult.Result;

            // Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = (okResult.Value as System.Collections.IEnumerable)?
                    .Cast<dynamic>()
                    .ToList(); Assert.NotNull(actual);

            Assert.That(actual.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetAll_MinhasRenovacoes_ReturnsAllItens()
        {
            MockLogedUser("2", "Usuario");

            // Ação 

            var result = await _controller.GetMinhasRenovacoes(2);

            // Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = (OkObjectResult)result;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as System.Collections.IEnumerable;
            Assert.NotNull(actual);

            var count = 0;
            foreach (var item in actual) count++;
            Assert.That(count, Is.EqualTo(1));
        }

        [Test]
        public async Task Cancelar_RenovacaoEmAnalise_DeveMudarStatusParaCancelada()
        {
            MockLogedUser("3", "Usuario");

            var renovacaoParaCancelar = await _context.Renovacoes
                .Include(r => r.Emprestimo)
                .FirstOrDefaultAsync(r => r.Emprestimo.UsuarioId == 3 &&
                                     r.Status == StatusRenovacao.EmAnalise);

            int idRenovacao = renovacaoParaCancelar.Id;

            // Ação

            var result = await _controller.Cancelar(idRenovacao);

            // Asserção
            Assert.IsInstanceOf<NoContentResult>(result);

            var renovacaoNoBanco = await _context.Renovacoes.FindAsync(idRenovacao);
            Assert.That(renovacaoNoBanco.Status, Is.EqualTo(StatusRenovacao.Cancelada));
        }

        [Test]
        public async Task AprovarRenovacao_DeveMudarStatusParaAprovada()
        {
            MockLogedUser("1", "Funcionario");

            var renovacaoParaConfirmar = await _context.Renovacoes
                .Include(r => r.Emprestimo)
                .FirstOrDefaultAsync(r => r.Status == StatusRenovacao.EmAnalise);

            int idRenovacao = renovacaoParaConfirmar.Id;

            // Ação

            var result = await _controller.Confirmar(idRenovacao);

            // Asserção

            Assert.IsInstanceOf<NoContentResult>(result);

            var renovacaNoBanco = await _context.Renovacoes.FindAsync(idRenovacao);
            Assert.That(renovacaNoBanco.Status, Is.EqualTo(StatusRenovacao.Aprovada));
        }

        [Test]
        public async Task RenovacaoNaoEfetivada_DeveMudarStatusParaNaoEfetivada()
        {
            MockLogedUser("1", "Funcionario");

            var renovacaoParaConfirmar = await _context.Renovacoes
                .Include(r => r.Emprestimo)
                .FirstOrDefaultAsync(r => r.Status == StatusRenovacao.EmAnalise);

            int idRenovacao = renovacaoParaConfirmar.Id;

            // Ação

            var result = await _controller.NaoEfetivada(idRenovacao);

            // Asserção

            Assert.IsInstanceOf<NoContentResult>(result);

            var renovacaoNoBanco = await _context.Renovacoes.FindAsync(idRenovacao);
            Assert.That(renovacaoNoBanco.Status, Is.EqualTo(StatusRenovacao.NaoEfetivada));
        }

        [Test]
        public async Task Create_ValidObjectPassed_ReturnsOk()
        {
            MockLogedUser("2", "Usuario");

            var emprestimoValido = await _context.Emprestimos
                .FirstOrDefaultAsync(e => e.UsuarioId == 2 && e.Status == StatusEmprestimo.Emprestado);

            var renovacoesAntigas = _context.Renovacoes.Where(r => r.EmprestimoId == emprestimoValido.Id);
            _context.Renovacoes.RemoveRange(renovacoesAntigas);

            await _context.SaveChangesAsync();

            int idEmprestimo = emprestimoValido.Id;

            // Ação

            var result = await _controller.SolicitarRenovacao(idEmprestimo);

            //Asserção 

            Assert.IsInstanceOf<OkObjectResult>(result);

            var createdResult = result as OkObjectResult;
            Assert.NotNull(createdResult?.Value);

            var actual = createdResult.Value as Renovacao;
            Assert.NotNull(actual);
            Assert.That(actual.EmprestimoId, Is.EqualTo(idEmprestimo));
            Assert.That(actual.Status, Is.EqualTo(StatusRenovacao.EmAnalise));
        }

        [Test]
        public async Task Create_UsuarioJaPossuiRenovacaoDesseEmprestimo_ReturnsBadRequest()
        {
            MockLogedUser("3", "Usuario");

            var emprestimoValido = await _context.Emprestimos
                .FirstOrDefaultAsync(e => e.UsuarioId == 3 && e.Status == StatusEmprestimo.Emprestado);

            int idEmprestimo = emprestimoValido.Id;

            // Ação

            var result = await _controller.SolicitarRenovacao(idEmprestimo);

            //Asserção 

            Assert.IsInstanceOf<BadRequestObjectResult>(result);

            var badRequest = result as BadRequestObjectResult;
            Assert.That(badRequest.Value, Is.EqualTo("Você já solicitou uma renovação para esse empréstimo."));
        }

        [Test]
        public async Task Create_EmprestimoAtrasado_ReturnsBadRequest()
        {
            MockLogedUser("4", "Usuario");

            var emprestimoValido = await _context.Emprestimos
                .FirstOrDefaultAsync(e => e.UsuarioId == 4 && e.Status == StatusEmprestimo.Emprestado);

            int idEmprestimo = emprestimoValido.Id;

            // Ação

            var result = await _controller.SolicitarRenovacao(idEmprestimo);

            //Asserção 

            Assert.IsInstanceOf<BadRequestObjectResult>(result);

            var badRequest = result as BadRequestObjectResult;
            Assert.That(badRequest.Value, Is.EqualTo("Empréstimo atrasado. Não é possível renovar."));
        }

        [Test]
        public async Task Create_OutroUsuarioReservouEsseItem_ReturnsBadRequest()
        {
            MockLogedUser("2", "Usuario");

            var emprestimoValido = await _context.Emprestimos
                .FirstOrDefaultAsync(e => e.UsuarioId == 2 && e.Status == StatusEmprestimo.Emprestado);

            int idEmprestimo = emprestimoValido.Id;

            _context.Reservas.Add(new Reserva
            {
                ItemId = emprestimoValido.Exemplar.ItemId,
                UsuarioId = 3,
                Status = StatusReserva.EmAnalise
            });
            await _context.SaveChangesAsync();

            // Ação

            var result = await _controller.SolicitarRenovacao(idEmprestimo);

            //Asserção 

            Assert.IsInstanceOf<BadRequestObjectResult>(result);

            var badRequest = result as BadRequestObjectResult;
            Assert.That(badRequest.Value, Is.EqualTo("Não é possível renovar. Esse item foi reservado por outro usuário."));
        }
    }
}
