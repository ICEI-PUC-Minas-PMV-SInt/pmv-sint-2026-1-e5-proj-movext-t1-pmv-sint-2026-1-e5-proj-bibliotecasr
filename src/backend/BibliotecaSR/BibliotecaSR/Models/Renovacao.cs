using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSR.Models
{
    [Table("Renovacoes")]
    public class Renovacao
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmprestimoId { get; set; }
        public Emprestimo Emprestimo { get; set; }

        public DateTime DataSolicitacao { get; set; } = DateTime.UtcNow;

        public StatusRenovacao Status { get; set; } = StatusRenovacao.Pendente;
    }

    public enum StatusRenovacao
    {
        Pendente,
        Aprovada,
        Negada,
        Encerrada
    }
}
