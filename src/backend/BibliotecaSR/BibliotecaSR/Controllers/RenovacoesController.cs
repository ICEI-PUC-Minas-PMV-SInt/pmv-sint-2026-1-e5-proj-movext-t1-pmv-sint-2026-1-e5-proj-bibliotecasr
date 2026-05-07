using BibliotecaSR.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BibliotecaSR.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RenovacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RenovacoesController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Funcionario")]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var itens = await _context.Renovacoes.ToListAsync();

            return Ok(itens);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpGet("pendentes")]
        public async Task<ActionResult<IEnumerable<Renovacao>>> GetRenovacoesPendentes()
        {
            var reservas = await _context.Renovacoes
                .Where(r => r.Status == StatusRenovacao.EmAnalise)
                .OrderBy(r => r.DataSolicitacao)
                .Include(r => r.Emprestimo)
                    .ThenInclude(e => e.Usuario)
                .Include(r => r.Emprestimo)
                    .ThenInclude(e => e.Exemplar)
                        .ThenInclude(ex => ex.Item)
                .ToListAsync();

            return Ok(reservas);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpGet("confirmadas")]
        public async Task<ActionResult<IEnumerable<Renovacao>>> GetRenovacoesConfirmadas()
        {
            var renovacoes = await _context.Renovacoes
                .Where(r => r.Status == StatusRenovacao.Aprovada)
                .OrderBy(r => r.DataSolicitacao)
                .Include(r => r.Emprestimo)
                    .ThenInclude(e => e.Usuario)
                .Include(r => r.Emprestimo)
                    .ThenInclude(e => e.Exemplar)
                        .ThenInclude(ex => ex.Item)
                .ToListAsync();

            return Ok(renovacoes);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpGet("naoe-fetivadas")]
        public async Task<ActionResult<IEnumerable<Renovacao>>> GetRenovacoesNaoEfetivadas()
        {
            var renovacoes = await _context.Renovacoes
                .Where(r => r.Status == StatusRenovacao.NaoEfetivada)
                .OrderBy(r => r.DataSolicitacao)
                .Include(r => r.Emprestimo)
                    .ThenInclude(e => e.Usuario)
                .Include(r => r.Emprestimo)
                    .ThenInclude(e => e.Exemplar)
                        .ThenInclude(ex => ex.Item)
                .ToListAsync();

            return Ok(renovacoes);
        }

        [HttpGet("~/api/usuarios/{usuarioId}/renovacoes")]
        public async Task<ActionResult> GetMinhasRenovacoes(int usuarioId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            if (userId != usuarioId)
                return Forbid();

            var renovacoes = await _context.Renovacoes
                .Where(r => r.Emprestimo.UsuarioId == userId)
                .OrderByDescending(r => r.DataAtualizacao)
                .Select(r => new
                {
                    r.Id,
                    r.Status,
                    r.DataSolicitacao,
                    r.DataAtualizacao,
                    Titulo = r.Emprestimo.Exemplar.Item.Titulo,
                    Autor = r.Emprestimo.Exemplar.Item.Autor,
                })
                .ToListAsync();

            return Ok(renovacoes);
        }

        [HttpPost("{emprestimoId}")]
        public async Task<ActionResult> SolicitarRenovacao(int emprestimoId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            var emprestimo = await _context.Emprestimos
                .Include(e => e.Exemplar)
                .FirstOrDefaultAsync(e => e.Id == emprestimoId);

            if (emprestimo == null)
                return NotFound();

            if (emprestimo.UsuarioId != userId)
                return Forbid();

            var itemId = emprestimo.Exemplar.ItemId;

            // Emprestimo esta ativo?

            if (emprestimo.Status != StatusEmprestimo.Emprestado)
            {
                return BadRequest("Só é possível renovar empréstimos ativos.");
            }

            // Existe alguma reserva para esse item?

            var existeReserva = await _context.Reservas
                .AnyAsync(r => r.ItemId == itemId
                && (r.Status == StatusReserva.EmAnalise || r.Status == StatusReserva.AguardandoRetirada));

            if (existeReserva)
            {
                return BadRequest("Não é possível renovar. Esse item foi reservado por outro usuário.");
            }

            // Existe alguma solicitação de renovação para esse emprestimo?

            var jaExiste = await _context.Renovacoes
                .AnyAsync(r => r.EmprestimoId == emprestimoId
                 && r.Status != StatusRenovacao.Cancelada);


            if (jaExiste)
                return BadRequest("Você já solicitou uma renovação para esse empréstimo.");

            // Emprestimo atrasado?

            if (emprestimo.DataPrevistaDevolucao < DateTime.UtcNow)
            {
                return BadRequest("Empréstimo atrasado. Não é possível renovar.");
            }

            var renovacao = new Renovacao
            {
                EmprestimoId = emprestimoId
            };

            _context.Renovacoes.Add(renovacao);
            await _context.SaveChangesAsync();

            return Ok(renovacao);
        }

        [HttpPut("{id}/cancelar")]
        public async Task<ActionResult> Cancelar(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            var renovacao = await _context.Renovacoes
                .Include(r => r.Emprestimo)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (renovacao == null)
                return NotFound();

            if (renovacao.Emprestimo.UsuarioId != userId)
                return Forbid();

            if (renovacao.Status != StatusRenovacao.EmAnalise)
                return BadRequest("Só é possível cancelar solicitações pendentes.");

            renovacao.Status = StatusRenovacao.Cancelada;
            renovacao.DataAtualizacao = DateTime.Now;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}/aprovar")]
        public async Task<ActionResult> Confirmar(int id)
        {
            var renovacao = await _context.Renovacoes
                .Include(r => r.Emprestimo)
                    .ThenInclude(e => e.Exemplar)
                        .ThenInclude(ex => ex.Item)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (renovacao == null)
                return NotFound();

            if (renovacao.Status != StatusRenovacao.EmAnalise)
                return BadRequest("Só é possível aprovar solicitações pendentes.");

            renovacao.Status = StatusRenovacao.Aprovada;
            renovacao.DataAtualizacao = DateTime.Now;

            var notificacao = new Notificacao
            {
                UsuarioId = renovacao.Emprestimo.UsuarioId,
                Mensagem = $"Sua renovação de '{renovacao.Emprestimo.Exemplar.Item.Titulo}' foi aprovada!",
                Tipo = TipoNotificacao.Sucesso
            };

            _context.Notificacoes.Add(notificacao);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}/nao-efetivada")]
        public async Task<ActionResult> NaoEfetivada(int id)
        {
            var renovacao = await _context.Renovacoes
                .Include(r => r.Emprestimo)
                    .ThenInclude(e => e.Exemplar)
                        .ThenInclude(ex => ex.Item)
            .FirstOrDefaultAsync(r => r.Id == id);

            if (renovacao == null)
                return NotFound();

            if (renovacao.Status != StatusRenovacao.EmAnalise)
                return BadRequest("Só é possível marcar como não efetivada as solicitações pendentes.");

            renovacao.Status = StatusRenovacao.NaoEfetivada;
            renovacao.DataAtualizacao = DateTime.Now;

            var notificacao = new Notificacao
            {
                UsuarioId = renovacao.Emprestimo.UsuarioId,
                Mensagem = $"Não foi possível efetivar sua renovação de '{renovacao.Emprestimo.Exemplar.Item.Titulo}'.",
                Tipo = TipoNotificacao.Erro
            };

            _context.Notificacoes.Add(notificacao);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
