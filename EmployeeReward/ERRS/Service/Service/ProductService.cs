

public class ProductService : IProductService
{
  private readonly IProductRepository _productRepository;

  public ProductService(IProductRepository productRepository)
  {
    _productRepository = productRepository;
  }

  public async Task<List<Product>> GetProductDetailAsync()
  {
    var productDetails = await _productRepository.GetProductDetailsAsync();

    return productDetails;
  }

  public async Task<Product> NewProductAddAsync(Product product, CancellationToken ct)
  {
    bool IsProductNameTaken = await _productRepository.IsProductNameTakenAsync(product.ProductName);

    if (IsProductNameTaken)
    {
      throw new Exception("ProductName is already taken");
    }

    else

    {
      await _productRepository.NewProductAddAsync(product);
      return product;
    }
  }
  public async Task DeleteProductAsync(int id)
  {
    await _productRepository.DeleteProductAsync(id);
  }

  public async Task ProductEditAsync(int id, Product product, CancellationToken ct)
  {
    if (product == null || product.Id <= 0)
    {
      throw new BadHttpRequestException("Invalid Product data");
    }
    await _productRepository.ProductEditAsyc(id, product, ct);
  }
  public async Task<IResult> BuyProductAsync(BuyProductDto buyProductDto, CancellationToken ct)
  {
    var buyProduct = await _productRepository.BuyProductAsync(buyProductDto, ct);

    return buyProduct;
  }

}