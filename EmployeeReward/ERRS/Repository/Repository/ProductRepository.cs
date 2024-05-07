using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Repositorylayer.DBContext;

public class ProductRepository : IProductRepository
{
  private readonly AppDbContext _context;

  public ProductRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<List<Product>> GetProductDetailsAsync()
  {
    return await _context.Products.Where(p => p.is_active == true).ToListAsync();
  }

  public async Task NewProductAddAsync(Product product)
  {
    _context.Products.Add(product);
    await _context.SaveChangesAsync();
  }
  public async Task<bool> IsProductNameTakenAsync(string productName)
  {
    return await _context.Products.AnyAsync(p => p.ProductName == productName && p.is_active == true);
  }
  public async Task DeleteProductAsync(int id)
  {

    var product = _context.Products.Where(p => p.Id == id).FirstOrDefault();
    if(product!= null)
    {
      product.is_active = false;
      await _context.SaveChangesAsync();
    } 

  }
  public async Task ProductEditAsyc(int id, Product product, CancellationToken ct)
  {
    var productData = _context.Products.Where(p => p.Id == id).FirstOrDefault();

    if (productData == null)
    {
      throw new BadHttpRequestException("Product Not Found");
    }
    productData.ProductName = product.ProductName;
    productData.Category = product.Category;
    productData.Manufacturer = product.Manufacturer;
    productData.Quantity = product.Quantity;
    productData.ProductImage = product.ProductImage;
    productData.BytesValue = product.BytesValue;

    await _context.SaveChangesAsync();
  }
  public async Task<IResult> BuyProductAsync(BuyProductDto buyProductDto, CancellationToken ct)
  {
    var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == buyProductDto.UserId);

    var product = await _context.Products.FirstOrDefaultAsync(r => r.Id == buyProductDto.ProductId);

    if (user == null || product == null)

    {
      return Results.BadRequest(new {message = "user or reward not found" });
    }

    if (user.BytePoints < product.BytesValue)

    {
      return Results.BadRequest(new {message = "Insufficient points to buy the product" });
    }

    if (product.Quantity == 0)

    {
      return Results.BadRequest(new {message ="Product out of stock" });
    }

    var redemption = new Redemption

    {
      UserId = buyProductDto.UserId,
      ProductId = buyProductDto.ProductId,
      ActivityDate = DateTime.UtcNow,
      ActivityDetails = product.ProductName
    };
    product.Quantity--;

    user.BytePoints -= product.BytesValue;

    _context.Redemptions.Add(redemption);
    _context.SaveChanges();

    return Results.Ok(new {message = "Reward Purchased Successfully"});

  }
}