using Prueba.Dto;

namespace Prueba.Logic.Interfaces
{
    public interface ITransaccion
    {
        List<EstadoCivil> EstadosCiviles();
        Guid Guardar(Usuario usuario);
        Guid Actualizar(Usuario usuario);
        bool Eliminar(Guid idUsuario);
        Usuario Consultar(Guid idUsuario);
        List<Usuario> Consultar();
    }
}
