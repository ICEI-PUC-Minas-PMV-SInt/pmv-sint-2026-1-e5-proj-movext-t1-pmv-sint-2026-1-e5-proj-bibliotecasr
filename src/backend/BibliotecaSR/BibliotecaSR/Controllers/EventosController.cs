using BibliotecaSR.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaSR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var eventos = await _context.Eventos.ToListAsync();
            return Ok(eventos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var evento = await _context.Eventos.FindAsync(id);

            if (evento == null)
                return NotFound();

            return Ok(evento);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPost]
        public async Task<ActionResult> Create(Evento evento)
        {
            _context.Eventos.Add(evento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = evento.Id }, evento);
        }

        [Authorize(Roles = "Funcionario")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Evento evento)
        {
            if (id != evento.Id)
                return BadRequest();

            var eventoDb = await _context.Eventos.FindAsync(id);

            if (eventoDb == null)
                return NotFound();

            eventoDb.Titulo = evento.Titulo;
            eventoDb.Descricao = evento.Descricao;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Funcionario")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var evento = await _context.Eventos.FindAsync(id);

            if (evento == null)
                return NotFound();

            _context.Eventos.Remove(evento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
