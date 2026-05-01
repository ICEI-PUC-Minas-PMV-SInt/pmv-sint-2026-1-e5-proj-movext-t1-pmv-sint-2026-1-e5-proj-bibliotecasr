using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSR.Models
{
    [Table("Exemplares")]

    public class Exemplar
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int ItemId { get; set; }
        public Item Item { get; set; }
        [Required]
        public StatusExemplar Status { get; set; }
    }

    public enum StatusExemplar
    {
        Disponivel,
        Emprestado
    }
}

