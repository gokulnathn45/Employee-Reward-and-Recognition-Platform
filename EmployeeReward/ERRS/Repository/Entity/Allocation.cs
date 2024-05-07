using System.ComponentModel.DataAnnotations.Schema;

public class Allocation
{
  public int Id {get; set;}

  
  [ForeignKey("User")]
  public int UserId { get; set; }
  
  [ForeignKey("Reward")]

  public int RewardId { get; set; }

  public int Points { get; set;}

  public DateTime AllocationDate {get;set;}

  public virtual Reward? Reward {get; set;}

  public virtual User? Users {get; set;}

}