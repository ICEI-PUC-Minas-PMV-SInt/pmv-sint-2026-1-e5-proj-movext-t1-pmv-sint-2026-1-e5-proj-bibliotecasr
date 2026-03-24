using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BibliotecaSR.Models
{
    [Table("Usuarios")]
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]        
        public string Email { get; set; }
        [Required]
        [JsonIgnore]
        public string Senha { get; set; }
        public Status? Status { get; set; }
        [Required]
        public Perfil Perfil { get; set; }

    }

    public enum Perfil
    {
        [Display(Name = "Funcionário")]
        Funcionario,
        [Display(Name = "Usuário")]
        Usuario
    }

    public enum Status
    {
        Ativo,
        Bloqueado,
        Inativo
    }

}
