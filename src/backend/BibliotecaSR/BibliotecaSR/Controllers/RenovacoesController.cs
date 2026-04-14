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
                .Where(r => r.Status == StatusRenovacao.Pendente)
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
        [HttpGet("aprovadas")]
        public async Task<ActionResult<IEnumerable<Renovacao>>> GetRenovacoesAprovadas()
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
        [HttpGet("negadas")]
        public async Task<ActionResult<IEnumerable<Renovacao>>> GetRenovacoesNegadas()
        {
            var renovacoes = await _context.Renovacoes
                .Where(r => r.Status == StatusRenovacao.Negada)
                .OrderBy(r => r.DataSolicitacao)
                .Include(r => r.Emprestimo)
                    .ThenInclude(e => e.Usuario)
                .Include(r => r.Emprestimo)
                    .ThenInclude(e => e.Exemplar)
                        .ThenInclude(ex => ex.Item)
                .ToListAsync();

            return Ok(renovacoes);
        }

        [HttpGet("/usuarios/{usuarioId}/renovacoes")]
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
                .Select(r => new
                {
                    r.Id,
                    r.Status,
                    r.DataSolicitacao,
                    Livro = r.Emprestimo.Exemplar.Item.Titulo
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

            // Existe alguma reserva para esse item?



            // Existe alguma solicitação de renovação para esse emprestimo?

            var jaExiste = await _context.Renovacoes
                .AnyAsync(r => r.EmprestimoId == emprestimoId);

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

            if (renovacao.Status != StatusRenovacao.Pendente)
                return BadRequest("Só é possível cancelar solicitações pendentes.");

            renovacao.Status = StatusRenovacao.Negada;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}/aprovar")]
        public async Task<ActionResult> Aprovar(int id)
        {
            var renovacao = await _context.Renovacoes
                .Include(r => r.Emprestimo)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (renovacao == null)
                return NotFound();

            renovacao.Status = StatusRenovacao.Aprovada;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}/negar")]
        public async Task<ActionResult> Negar(int id)
        {
            var renovacao = await _context.Renovacoes.FindAsync(id);

            if (renovacao == null)
                return NotFound();

            renovacao.Status = StatusRenovacao.Negada;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}/encerrar")]
        public async Task<ActionResult> Encerrar(int id)
        {
            var renovacao = await _context.Renovacoes.FindAsync(id);

            if (renovacao == null)
                return NotFound();

            renovacao.Status = StatusRenovacao.Encerrada;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
