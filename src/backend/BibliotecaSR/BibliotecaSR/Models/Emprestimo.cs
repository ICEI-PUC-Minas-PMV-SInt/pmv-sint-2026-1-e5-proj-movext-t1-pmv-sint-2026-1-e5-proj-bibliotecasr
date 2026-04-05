using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSR.Models
{
    [Table("Emprestimos")]
    public class Emprestimo
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int ExemplarId { get; set; }
        public Exemplar Exemplar { get; set; }
        [Required]
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        [Required]
        public DateTime DataRetirada { get; set; } = DateTime.UtcNow;
        [Required]
        public DateTime DataPrevistaDevolucao { get; set; } = DateTime.UtcNow.AddDays(15);
        public DateTime? DataDevolucao { get; set; }
        public StatusEmprestimo Status { get; set; } = StatusEmprestimo.Emprestado;
    }

    public enum StatusEmprestimo
    {
        Emprestado,
        Atrasado,
        Devolvido
    }
}
