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
    public class ReservasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservasController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Funcionario")]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var itens = await _context.Reservas
                .Include(r => r.Item)
                .Include(r => r.Usuario)
                .ToListAsync();

            return Ok(itens);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpGet("pendentes")]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReservasPendentes()
        {
            var reservas = await _context.Reservas
                .Where(r => r.Status == StatusReserva.EmAnalise)
                .OrderBy(r => r.DataSolicitacao)
                .Include(r => r.Usuario)
                .Include(r => r.Item)
                .ToListAsync();

            return Ok(reservas);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpGet("confirmadas")]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReservasConfirmadas()
        {
            var reservas = await _context.Reservas
                .Where(r => r.Status == StatusReserva.AguardandoRetirada)
                .OrderBy(r => r.DataAtualizacao)
                .Include(r => r.Usuario)
                .Include(r => r.Item)
                .ToListAsync();

            return Ok(reservas);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpGet("desistencia")]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReservasDesistencias()
        {
            var reservas = await _context.Reservas
                .Where(r => r.Status == StatusReserva.Desistiu)
                .OrderBy(r => r.DataAtualizacao)
                .Include(r => r.Usuario)
                .Include(r => r.Item)
                .ToListAsync();

            return Ok(reservas);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpGet("expiradas")]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReservasExpiradas()
        {
            var reservas = await _context.Reservas
                .Include(r => r.Usuario)
                .Include(r => r.Item)
                .Where(r => r.Status == StatusReserva.AguardandoRetirada
                    && r.DataLimiteRetirada < DateTime.Now)
                .OrderBy(r => r.DataLimiteRetirada)
                .ToListAsync();

            return Ok(reservas);
        }

        [HttpGet("~/api/usuarios/{usuarioId}/reservas")]
        public async Task<ActionResult> GetMinhasReservas(int usuarioId)
        {

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            if (userId != usuarioId)
                return Forbid();

            var reservas = await _context.Reservas
                .Where(r => r.UsuarioId == userId)
                .OrderByDescending(r => r.DataAtualizacao)
                .Select(r => new
                {
                    r.Id,
                    r.Status,
                    r.DataSolicitacao,
                    r.DataAtualizacao,
                    Titulo = r.Item.Titulo,
                    Autor = r.Item.Autor
                })
                .ToListAsync();

            return Ok(reservas);
        }

        [HttpPost("{itemId}")]
        public async Task<ActionResult> SolicitarReserva(int itemId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            var item = await _context.Itens.FindAsync(itemId);
            if (item == null) return NotFound();

            // Usuário já reservou essse item?

            var jaExiste = await _context.Reservas
                .AnyAsync(r => r.ItemId == itemId
                && r.UsuarioId == userId
                && (r.Status == StatusReserva.EmAnalise || r.Status == StatusReserva.AguardandoRetirada));

            if (jaExiste)
                return BadRequest("Você já solicitou uma reserva para este item.");

            // Usuário já está com esse item emprestado?

            var jaEmprestou = await _context.Emprestimos
                   .AnyAsync(e => e.UsuarioId == userId &&
                   e.Exemplar.ItemId == itemId &&
                   e.Status != StatusEmprestimo.Devolvido);

            if (jaEmprestou)
                return BadRequest("Você já possui este item emprestado.");

            // Limite de reservas por usuário

            var quantidadeReservasAtivas = await _context.Reservas
            .CountAsync(r => r.UsuarioId == userId &&
                (r.Status == StatusReserva.EmAnalise ||
                 r.Status == StatusReserva.AguardandoRetirada));

            if (quantidadeReservasAtivas >= 3)
                return BadRequest("Você já atingiu o limite de 3 reservas.");

            var reserva = new Reserva
            {
                ItemId = itemId,
                UsuarioId = userId
            };

            _context.Reservas.Add(reserva);
            await _context.SaveChangesAsync();

            return Ok(reserva);
        }

        [HttpPut("{id}/cancelar")]
        public async Task<ActionResult> Cancelar(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            var reserva = await _context.Reservas.FindAsync(id);

            if (reserva == null)
                return NotFound();

            if (reserva.UsuarioId != userId)
                return Forbid();

            if (reserva.Status == StatusReserva.EmAnalise || reserva.Status == StatusReserva.AguardandoRetirada)
            {
                if (reserva.Status == StatusReserva.AguardandoRetirada)
                    reserva.Status = StatusReserva.Desistiu;
                else
                    reserva.Status = StatusReserva.Cancelada;
            }
            else
            {
                return BadRequest("Esta reserva não pode ser cancelada.");
            }


            reserva.DataAtualizacao = DateTime.Now;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}/confirmar")]
        public async Task<ActionResult> Confirmar(int id)
        {
            var reserva = await _context.Reservas
                .Include(r => r.Item)
            .FirstOrDefaultAsync(r => r.Id == id);

            if (reserva == null)
                return NotFound();

            if (reserva.Status != StatusReserva.EmAnalise)
            {
                return BadRequest("Apenas reservas em análise podem ser confirmadas.");
            }

            reserva.Status = StatusReserva.AguardandoRetirada;
            reserva.DataAtualizacao = DateTime.Now;
            reserva.DataLimiteRetirada = DateTime.Now.AddDays(3);

            var notificacao = new Notificacao
            {
                UsuarioId = reserva.UsuarioId,
                Mensagem = $"Sua reserva de '{reserva.Item.Titulo}' foi aprovada! Retire até {reserva.DataLimiteRetirada}.",
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
            var reserva = await _context.Reservas
                .Include(r => r.Item)
            .FirstOrDefaultAsync(r => r.Id == id);

            if (reserva == null)
                return NotFound();

            if (reserva.Status != StatusReserva.EmAnalise)
            {
                return BadRequest("Apenas reservas em análise podem ser marcadas como não efetivada.");
            }

            reserva.Status = StatusReserva.NaoEfetivada;
            reserva.DataAtualizacao = DateTime.Now;

            var notificacao = new Notificacao
            {
                UsuarioId = reserva.UsuarioId,
                Mensagem = $"Não foi possível efetivar sua reserva de '{reserva.Item.Titulo}'.",
                Tipo = TipoNotificacao.Erro
            };

            _context.Notificacoes.Add(notificacao);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}/concluida")]
        public async Task<ActionResult> Concluida(int id)
        {
            var reserva = await _context.Reservas
                .Include(r => r.Item)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (reserva == null)
                return NotFound();

            if (reserva.Status != StatusReserva.AguardandoRetirada)
            {
                return BadRequest("Apenas reservas com status 'Aguardando Retirada' podem ser concluídas.");
            }

            reserva.Status = StatusReserva.Concluida;
            reserva.DataAtualizacao = DateTime.Now;

            var notificacao = new Notificacao
            {
                UsuarioId = reserva.UsuarioId,
                Mensagem = $"Retirada confirmada! Você retirou o item '{reserva.Item.Titulo}'. Boa leitura!",
                Tipo = TipoNotificacao.Sucesso
            };

            _context.Notificacoes.Add(notificacao);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("encerrar-expiradas")]
        public async Task<IActionResult> EncerrarExpiradas()
        {
            var expiradas = await _context.Reservas
                .Where(r => r.Status == StatusReserva.AguardandoRetirada && r.DataLimiteRetirada < DateTime.Now)
                .ToListAsync();

            if (!expiradas.Any()) return NoContent();

            foreach (var reserva in expiradas)
            {
                reserva.Status = StatusReserva.NaoEfetivada;
                reserva.DataAtualizacao = DateTime.Now;

                var notificacao = new Notificacao
                {
                    UsuarioId = reserva.UsuarioId,
                    Mensagem = $"Sua reserva do item ID {reserva.ItemId} expirou e foi cancelada.",
                    Tipo = TipoNotificacao.Erro
                };

                _context.Notificacoes.Add(notificacao);
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
