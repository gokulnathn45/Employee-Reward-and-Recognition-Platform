using System.Net;
using FastEndpoints;

public class EditProduct : Endpoint<Product,string>
{
  private readonly IProductService _productService;

  public EditProduct(IProductService productService)
  {
    _productService = productService;
  }

    public override void Configure()
    {
        Put("products/editproduct/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(Product product, CancellationToken ct)
    {
        var id = Route<int>("id");
        await _productService.ProductEditAsync(id,product,ct);
        await SendAsync($"Product {product.ProductName} data Edited");
    }
}