namespace BibliotecaSR.Models
{
    public class Notificacao
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string Mensagem { get; set; }
        public DateTime DataCriacao { get; set; } = DateTime.Now;
        public bool Lida { get; set; } = false;
        public TipoNotificacao Tipo { get; set; }
    }

    public enum TipoNotificacao
    {
        Sucesso,
        Erro,
        Alerta
    }
}
