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
    public class ItensController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItensController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var itens = await _context.Itens.ToListAsync();

            return Ok(itens);
        }

        [HttpGet("recentes")]
        public async Task<ActionResult> GetRecentes()
        {
            var itens = await _context.Itens
                .OrderByDescending(i => i.DataCadastro)
                .Take(10)
                .ToListAsync();

            return Ok(itens);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var item = await _context.Itens
                .Where(i => i.Id == id)
                .Select(i => new
                {
                    i.Id,
                    i.Titulo,
                    i.Autor,
                    i.Categoria,
                    TotalExemplares = i.Exemplares.Count,
                    Disponiveis = i.Exemplares.Count(e => e.Status == StatusExemplar.Disponivel)
                })
                .FirstOrDefaultAsync();

            if (item == null) return NotFound();

            return Ok(item);
        }
    }
}

