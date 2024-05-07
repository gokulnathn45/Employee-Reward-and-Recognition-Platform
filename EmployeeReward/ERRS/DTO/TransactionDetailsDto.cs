using Microsoft.AspNetCore.SignalR;

public class TransactionDetailsDto
{
  public string FirstName { get; set; }

  public string LastName { get; set; }

  public string ProductName { get; set; }

  public string ProductImage {get;set;}

  public int BytePoints {get; set;}

  public DateTime ActivityDate { get; set; }


}