using Prueba.Dto;
using Prueba.Logic.Interfaces;

namespace Prueba.Logic.Implementation
{
    public class Transaccion : ITransaccion
    {
        private readonly MyContext context;
        public Transaccion(MyContext context)
        {
            this.context = context;
        }

        public Guid Actualizar(Usuario usuario)
        {
            Usuario usuarioNew = Consultar(usuario.IdUsuario);

            usuarioNew.FechaNacimiento = usuario.FechaNacimiento;
            usuarioNew.EstadoCivil=usuario.EstadoCivil;
            usuarioNew.Nombre = usuario.Nombre;
            usuarioNew.Apellido = usuario.Apellido;
            usuarioNew.TieneHermanos = usuario.TieneHermanos;
            usuarioNew.Actualizado = DateTime.Now;

            context.Usuario.Update(usuarioNew);
            context.SaveChanges();
            return usuarioNew.IdUsuario;
        }

        public List<Usuario> Consultar() {
            return context.Usuario.ToList();
        }

        public Usuario Consultar(Guid idUsuario) {
            Usuario? usuario = context.Usuario.FirstOrDefault(x => x.IdUsuario == idUsuario);
            if (usuario != null)
            {
                return usuario;
            }
            throw new Exception("El usuario no existe");
        }

        public bool Eliminar(Guid idUsuario)
        {
            Usuario usuario = Consultar(idUsuario);
            context.Usuario.Remove(usuario);
            context.SaveChanges();
            return true;
        }

        public List<EstadoCivil> EstadosCiviles()
        {
            if (context.EstadoCivil.Count() <= 0)
            {
                context.EstadoCivil.Add(new EstadoCivil()
                {
                    IdEstadoCivil = new Guid(),
                    Nombre = "Soltero",
                    Creado = DateTime.Now
                });
                context.EstadoCivil.Add(new EstadoCivil()
                {
                    IdEstadoCivil = new Guid(),
                    Nombre = "Casado",
                    Creado = DateTime.Now
                });
                context.SaveChanges();
            }
            return context.EstadoCivil.ToList();
        }

        public Guid Guardar(Usuario usuario)
        {
            usuario.IdUsuario = new Guid();
            usuario.Creado = DateTime.Now;
            usuario.Actualizado = DateTime.Now;
            context.Usuario.Add(usuario);
            context.SaveChanges();
            return usuario.IdUsuario;
        }
    }
}
