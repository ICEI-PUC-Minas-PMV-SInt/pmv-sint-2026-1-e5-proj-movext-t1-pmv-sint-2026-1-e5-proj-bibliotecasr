using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSR.Models
{
    [Table("Reservas")]
    public class Reserva
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        [Required]
        public int ItemId { get; set; }
        public Item Item { get; set; }

        public DateTime DataSolicitacao { get; set; } = DateTime.UtcNow;

        public StatusReserva Status { get; set; } = StatusReserva.Ativa;
    }

    public enum StatusReserva
    {
        Ativa,
        Cancelada,
        Confirmada,
        NaoEfetivada,
        Encerrada
    }
}
