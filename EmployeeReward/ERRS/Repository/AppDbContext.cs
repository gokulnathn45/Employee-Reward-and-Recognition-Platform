using System.Net.Http.Headers;
using FastEndpoints;
using Microsoft.EntityFrameworkCore;
namespace Repositorylayer.DBContext;

public class AppDbContext : DbContext
{
    private readonly IConfiguration _config;

    public DbSet<User> Users { get; set; }

    public DbSet<Allocation> Allocations { get; set; }

    public DbSet<Reward> Rewards { get; set; }

    public DbSet<Redemption> Redemptions { get; set; }

    public DbSet<Product> Products { get; set; }


    public AppDbContext(DbContextOptions<AppDbContext> options,
               IConfiguration config) : base(options)
    {
        _config = config;
    }

    
}