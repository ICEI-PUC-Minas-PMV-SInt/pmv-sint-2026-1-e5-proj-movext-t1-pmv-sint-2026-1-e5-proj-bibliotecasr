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
    public class NotificacoesController : ControllerBase
    {

        private readonly AppDbContext _context;

        public NotificacoesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("~/api/usuarios/{usuarioId}/notificacoes")]
        public async Task<ActionResult> GetMinhasNotificacoes(int usuarioId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            if (userId != usuarioId)
                return Forbid();

            var notificacoes = await _context.Notificacoes
                .Where(n => n.UsuarioId == userId)
                .OrderByDescending(r => r.DataCriacao)
                .ToListAsync();

            return Ok(notificacoes);
        }

        [HttpPut("marcar-lida/{id}")]
        public async Task<IActionResult> MarcarComoLida(int id)
        {
            var notification = await _context.Notificacoes.FindAsync(id);

            if (notification == null) return NotFound();

            notification.Lida = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
