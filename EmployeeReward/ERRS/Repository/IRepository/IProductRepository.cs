public interface IProductRepository
{
  Task<List<Product>> GetProductDetailsAsync();

  Task NewProductAddAsync(Product product);

  Task<bool> IsProductNameTakenAsync(string productName);

  Task DeleteProductAsync(int id);

  Task ProductEditAsyc(int id, Product product, CancellationToken ct);

  Task<IResult> BuyProductAsync(BuyProductDto buyProductDto, CancellationToken ct);
}