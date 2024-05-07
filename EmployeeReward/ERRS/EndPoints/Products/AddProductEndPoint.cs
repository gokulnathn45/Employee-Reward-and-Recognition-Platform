using FastEndpoints;

public class ProductAdd : Endpoint<Product, Product>
{
  private readonly IProductService _productService;

  public ProductAdd(IProductService productService)
  {
    _productService = productService;
  }

  public override void Configure()
  {
    Post("products/productsadd");
    // Options(x => x.WithTags("Products"));
    AllowAnonymous();
  }
  public override async Task HandleAsync(Product product, CancellationToken ct)
  {
    var productDetails = await _productService.NewProductAddAsync(product, ct);
    await SendAsync(productDetails);
  }
}