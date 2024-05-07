using System.Transactions;
using FastEndpoints;

public class TransactionDetails : EndpointWithoutRequest<List<TransactionDetailsDto>>
{

  private readonly IAllocationService _allocationService;

  public TransactionDetails(IAllocationService allocationService)
  {
    _allocationService = allocationService;
  }

    public override void Configure()
    {
        Get("allocation/transactiondetails");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)

    {
      var transactionDetails = await _allocationService.GetTransactionDetailsAsync();

      await SendAsync(transactionDetails);
    }
}