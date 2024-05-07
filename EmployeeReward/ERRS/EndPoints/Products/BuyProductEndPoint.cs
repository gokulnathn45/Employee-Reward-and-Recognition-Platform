using FastEndpoints;

public class BuyProduct : Endpoint<BuyProductDto,IResult>
{
  private readonly IProductService _productService;

  public BuyProduct(IProductService productService)
  {
    _productService = productService;
  }

    public override void Configure()
    {
        Post("products/buyproduct");
        AllowAnonymous();
    }

    public override async Task HandleAsync(BuyProductDto buyProductDto,CancellationToken ct)
    {
      var buyProduct = await _productService.BuyProductAsync(buyProductDto,ct);
      await SendAsync(buyProduct);
    }
}