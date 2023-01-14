using Microsoft.EntityFrameworkCore;

namespace Prueba.Dto
{
    public class MyContext: DbContext
    {
        public MyContext() { }
        public MyContext(DbContextOptions<MyContext> options) : base(options)  { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "Prueba");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder) { }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<EstadoCivil> EstadoCivil { get; set; }
    }
}
