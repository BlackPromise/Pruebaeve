using Microsoft.AspNetCore.Mvc;
using Prueba.Dto;

namespace Prueba.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransaccionController : ControllerBase
    {
        private readonly Logic.Interfaces.ITransaccion transaccion;

        public TransaccionController(Logic.Interfaces.ITransaccion transaccion)
        {
            this.transaccion = transaccion;
        }

        [HttpGet("EstadosCiviles")]
        public Resultado EstadosCiviles()
        {
            Resultado response = new();
            try
            {
                response.Data = transaccion.EstadosCiviles();
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Error = ex.Message;
            }
            return response;
        }

        [HttpGet("ConsultarUno")]
        public Resultado ConsultarUno(Guid idUsuario)
        {
            Resultado response = new();
            try
            {
                response.Data = transaccion.Consultar(idUsuario);
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Error = ex.Message;
            }
            return response;
        }

        [HttpGet("ConsultarTodos")]
        public Resultado ConsultarTodos()
        {
            Resultado response = new();
            try
            {
                response.Data = transaccion.Consultar();
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Error = ex.Message;
            }
            return response;
        }

        [HttpPost("Guardar")]
        public Resultado Guardar(Usuario usuario)
        {
            Resultado response = new();
            try
            {
                response.Data = transaccion.Guardar(usuario);
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Error = ex.Message;
            }
            return response;
        }

        [HttpPut("Actualizar")]
        public Resultado Actualizar(Usuario usuario)
        {
            Resultado response = new();
            try
            {
                response.Data = transaccion.Actualizar(usuario);
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Error = ex.Message;
            }
            return response;
        }

        [HttpDelete("Eliminar")]
        public Resultado Eliminar(Guid idUsuario)
        {
            Resultado response = new();
            try
            {
                response.Data = transaccion.Eliminar(idUsuario);
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Error = ex.Message;
            }
            return response;
        }

        [HttpPost("CargarImagen"), DisableRequestSizeLimit]
        public Resultado CargarImagen(IFormFile file,[FromQuery] Guid idUsuario)
        {
            Resultado response = new();
            try
            {
                if (file!=null)
                {
                    transaccion.Consultar(idUsuario);
                    var fullPath =  Path.Combine(Directory.GetCurrentDirectory(),"Images");
                    if(!Directory.Exists(fullPath)){
                        Directory.CreateDirectory(fullPath);
                    }
                    fullPath = Path.Combine(fullPath, idUsuario.ToString() + ".png" );
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    response.Data = true;
                }
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Error = ex.Message;
            }
            return response;
        }
    }
}
