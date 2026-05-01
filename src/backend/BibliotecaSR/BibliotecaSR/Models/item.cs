using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace BibliotecaSR.Models
{
    [Table("Itens")]
    public class Item
    {
        [Key]
        public int Id { get; set; }
        public string? ISBN { get; set; }
        [Required]
        public string Titulo { get; set; }
        [Required]
        public string Autor { get; set; }
        [Required]
        public string Editora { get; set; }
        [Required]
        public Categoria Categoria { get; set; }
        [Required]
        public int AnoPublicacao { get; set; }
        [Required]
        public Tipo Tipo { get; set; }
        [Required]
        public string CDD { get; set; }
        [Required]
        public DateTime DataCadastro { get; set; } = DateTime.UtcNow;
        public ICollection<Exemplar> Exemplares { get; set; } = new List<Exemplar>();
    }

    public enum Tipo
    {
        Livro,
        Quadrinho,
        [Display(Name = "Romance Gráfico")]
        RomanceGrafico,
        [Display(Name = "Mangá")]
        Manga
    }

    public enum Categoria
    {
        Romance,
        Fantasia,
        [Display(Name = "Ficção Científica")]
        FiccaoCientifica,
        [Display(Name = "Mistério")]
        Misterio,
        Terror,
        Distopia,
        Aventura,
        Poesia,
        Biografia,
        Historia,
        Filosofia,
        Ciencias,
        Tecnologia,
        [Display(Name = "Educação")]
        Educacao,
        [Display(Name = "Auto Ajuda")]
        Autoajuda,
        [Display(Name = "Religião")]
        Religiao,
        Infantil,
        Juvenil,
        Didatico

    }
}
