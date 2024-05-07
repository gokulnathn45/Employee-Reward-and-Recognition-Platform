public interface IProductService
{
 Task<List<Product>>GetProductDetailAsync();

 Task<Product>NewProductAddAsync(Product product,CancellationToken ct);

 Task DeleteProductAsync(int id);

 Task ProductEditAsync(int id, Product product, CancellationToken ct);

 Task<IResult> BuyProductAsync(BuyProductDto buyProductDto,CancellationToken ct);
}