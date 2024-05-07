using System.ComponentModel.DataAnnotations.Schema;

public class Redemption
{
  public int Id { get; set; }

  [ForeignKey("User")]

  public int UserId { get; set; }

  [ForeignKey("Product")]

  public int ProductId { get; set; }

  public DateTime ActivityDate { get; set; }

  public string ActivityDetails { get; set; }

  public virtual User User { get; set; }

  public virtual Product Product { get; set; }
}