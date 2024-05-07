using FastEndpoints;

public class ProductDetails : EndpointWithoutRequest<List<Product>>
{

  private readonly IProductService _productService;

  public ProductDetails(IProductService productService)
  {
    _productService = productService;
  }

  public override void Configure()
  {
    Get("products/productdetails");
    AllowAnonymous();
  }
  public override async Task HandleAsync(CancellationToken ct)
  {
    var productDetails = await _productService.GetProductDetailAsync();

    await SendAsync(productDetails);
  }
}