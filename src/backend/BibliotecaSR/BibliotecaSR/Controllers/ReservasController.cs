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
            var itens = await _context.Reservas.ToListAsync();

            return Ok(itens);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpGet("ativas")]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReservasAtivas()
        {
            var reservas = await _context.Reservas
                .Where(r => r.Status == StatusReserva.Ativa)
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
                .Where(r => r.Status == StatusReserva.Confirmada)
                .OrderBy(r => r.DataSolicitacao)
                .Include(r => r.Usuario)
                .Include(r => r.Item)
                .ToListAsync();

            return Ok(reservas);
        }

        [HttpGet("/usuarios/{usuarioId}/reservas")]
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
                .Select(r => new
                {
                    r.Id,
                    r.Status,
                    r.DataSolicitacao,
                    Livro = r.Item.Titulo
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

            // Limite de reservas por usuário

            var quantidadeReservasAtivas = await _context.Reservas
            .CountAsync(r => r.UsuarioId == userId &&
                (r.Status == StatusReserva.Ativa ||
                 r.Status == StatusReserva.Confirmada));

            if (quantidadeReservasAtivas >= 3)
                return BadRequest("Você já atingiu o limite de 3 reservas.");

            // Usuário já reservou essse item?

            var jaExiste = await _context.Reservas
                .AnyAsync(r => r.ItemId == itemId
                && r.UsuarioId == userId
                && r.Status == StatusReserva.Ativa);

            if (jaExiste)
                return BadRequest("Você já solicitou uma reserva para este item.");


            // Usuário já está com esse item emprestado?

            var jaEmprestou = await _context.Emprestimos
                   .AnyAsync(e => e.UsuarioId == userId &&
                   e.Exemplar.ItemId == itemId &&
                   e.Status != StatusEmprestimo.Devolvido);

            if (jaEmprestou)
                return BadRequest("Você já possui este item emprestado.");


            var temExemplarValido = await _context.Exemplares
                  .AnyAsync(e => e.ItemId == itemId &&
                  (e.Status == StatusExemplar.Disponivel ||
                  e.Status == StatusExemplar.Emprestado));

            if (!temExemplarValido)
                return BadRequest("Este item não está disponível para reserva no momento.");


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

            if (reserva.Status == StatusReserva.Encerrada)
                return BadRequest("Não é possível cancelar uma reserva encerrada.");

            reserva.Status = StatusReserva.Cancelada;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}/confirmar")]
        public async Task<ActionResult> Confirmar(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);

            if (reserva == null)
                return NotFound();

            reserva.Status = StatusReserva.Confirmada;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}/naoefetivada")]
        public async Task<ActionResult> NaoEfetivada(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);

            if (reserva == null)
                return NotFound();

            reserva.Status = StatusReserva.NaoEfetivada;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}/encerrar")]
        public async Task<ActionResult> Encerrar(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);

            if (reserva == null)
                return NotFound();

            reserva.Status = StatusReserva.Encerrada;

            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
