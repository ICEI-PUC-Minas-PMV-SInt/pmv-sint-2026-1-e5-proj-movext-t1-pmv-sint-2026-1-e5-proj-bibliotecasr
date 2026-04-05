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
    public class EmprestimosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmprestimosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("/usuarios/{usuarioId}/emprestimos")]
        public async Task<ActionResult> GetByUsuario(int usuarioId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            if (userId != usuarioId)
                return Forbid();

            var emprestimos = await _context.Emprestimos
                .Where(e => e.UsuarioId == usuarioId)
                .Select(e => new
                {
                    e.Id,
                    e.DataRetirada,
                    e.DataPrevistaDevolucao,
                    e.DataDevolucao,
                    e.Status,
                    Titulo = e.Exemplar.Item.Titulo
                })
                .ToListAsync();

            return Ok(emprestimos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            var emprestimo = await _context.Emprestimos
                .Where(e => e.Id == id)
                .Select(e => new
                {
                    e.Id,
                    e.UsuarioId,
                    e.DataRetirada,
                    e.DataPrevistaDevolucao,
                    e.DataDevolucao,
                    e.Status,
                    Titulo = e.Exemplar.Item.Titulo
                })
                .FirstOrDefaultAsync();

            if (emprestimo == null) return NotFound();

            if (emprestimo.UsuarioId != userId)
                return Forbid();

            return Ok(emprestimo);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("/emprestimos/{id}/devolver")]
        public async Task<ActionResult> Devolver(int id)
        {
            var emprestimo = await _context.Emprestimos
                .Include(e => e.Exemplar)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (emprestimo == null)
                return NotFound();

            if (emprestimo.Status == StatusEmprestimo.Devolvido)
                return BadRequest();

            emprestimo.Status = StatusEmprestimo.Devolvido;
            emprestimo.DataDevolucao = DateTime.UtcNow;

            emprestimo.Exemplar.Status = StatusExemplar.Disponivel;

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
