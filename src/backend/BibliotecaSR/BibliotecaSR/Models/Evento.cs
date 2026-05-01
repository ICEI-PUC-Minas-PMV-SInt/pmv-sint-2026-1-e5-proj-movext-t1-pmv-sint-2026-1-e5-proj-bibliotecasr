using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSR.Models
{
    [Table("Eventos")]

    public class Evento
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Titulo { get; set; }

        [Required]
        public string Descricao { get; set; }
        
        [Required]
        public CategoriaEvento Categoria { get; set; }

        public DateTime? DataHora { get; set; }

        public DiaSemana? DiaSemana { get; set; }
               
        public string? Hora { get; set; }

        public string? LivroDoMes { get; set; }
        public string? Autor { get; set; }
    }

    public enum CategoriaEvento
    {
        ClubeDoLivro,
        ClubeDeJogos,
        Campeonato,
        Outros
    }
    public enum DiaSemana
    {
        SegundaFeira,
        TerçaFeira,
        QuartaFeira,
        QuintaFeira,
        SextaFeira,
        Sabado,
        Domingo
    }

}
