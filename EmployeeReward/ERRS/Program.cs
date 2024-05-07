using FastEndpoints;
using FastEndpoints.Swagger;
using Microsoft.EntityFrameworkCore;
using Repositorylayer.DBContext;
using Repositorylayer.IRepository;
using Repositorylayer.Repository;
using ServiceLayer.IService;
using ServiceLayer.Service;


var builder = WebApplication.CreateBuilder();

// Add services to the container.
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRewardService, RewardService>();
builder.Services.AddScoped<IRewardRepository, RewardRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IAllocationRepository, AllocationRepository>();
builder.Services.AddScoped<IAllocationService, AllocationService>();



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowOrigin",
  builder => builder.WithOrigins("http://localhost:4200")
  .AllowAnyMethod()
  .AllowAnyHeader()
  .AllowCredentials()
  );

});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddFastEndpoints();

builder.Services.SwaggerDocument(o =>
  {
    o.ShortSchemaNames = true;
    o.AutoTagPathSegmentIndex = 1;
  }
);

var app = builder.Build();

app.UseDefaultExceptionHandler()
   .UseFastEndpoints(
      config => config.Endpoints.RoutePrefix = "api"
    );

app.UseSwaggerGen();


app.UseHttpsRedirection();
app.UseCors("AllowOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();


