using FastEndpoints;

public class TransactionDetailsById : EndpointWithoutRequest<List<TransactionDetailsDto>>
{
  private readonly IAllocationService _allocationService;

  public TransactionDetailsById(IAllocationService allocationService)

  {
    _allocationService = allocationService;
  }

    public override void Configure()
    {
        Get("allocation/transactiondetails/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var id = Route<int>("id");

        var transactionDetails = await _allocationService.GetTransactionDetailsByIdAsync(id);

        await SendAsync(transactionDetails);
    }
}