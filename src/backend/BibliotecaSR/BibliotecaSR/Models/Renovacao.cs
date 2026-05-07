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
        public DateTime DataSolicitacao { get; set; } = DateTime.Now;
        public DateTime DataAtualizacao { get; set; } = DateTime.Now;
        public StatusRenovacao Status { get; set; } = StatusRenovacao.EmAnalise;
    }

    public enum StatusRenovacao
    {
        EmAnalise,
        Cancelada,
        Aprovada,
        NaoEfetivada
    }
}
