using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Prueba.Dto
{
    public class EstadoCivil
    {
        public EstadoCivil()
        {
            this.Usuario = new HashSet<Usuario>();
        }
        [Key]
        public Guid IdEstadoCivil { get; set; }
        public string Nombre { get; set; } = "";
        public DateTime Creado { get; set; } = DateTime.Now;

        [NotMapped]
        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}