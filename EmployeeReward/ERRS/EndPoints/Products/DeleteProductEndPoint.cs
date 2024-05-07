using FastEndpoints;

public class DeleteProduct : EndpointWithoutRequest<string>
{
  private readonly IProductService _productService;

public DeleteProduct(IProductService productService)
{
  _productService = productService;
}

    public override void Configure()
    {
        Delete("products/deleteproduct/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
     
        var id = Route<int>("id");
        await _productService.DeleteProductAsync(id);
        await SendAsync($"Product {id} Deleted Successfully");
     
    }
}