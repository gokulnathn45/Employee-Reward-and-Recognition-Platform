public class Product
{
  public int Id { get; set; }

  public string ProductName { get; set; }

  public string Category { get; set; }

  public string Manufacturer { get; set; }

  public int Quantity { get; set; }

  public string? ProductImage { get; set; }

  public int BytesValue { get; set; }

  public bool is_active {get; set;} = true;
}