using FastEndpoints;

public class TopThreeTransaction : EndpointWithoutRequest<List<TransactionDetailsDto>>
{
  private readonly IAllocationService _allocationService;

  public TopThreeTransaction(IAllocationService allocationService)
  {
    _allocationService = allocationService;
  }

    public override void Configure()
    {
        Get("allocation/topthreetransaction");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
      var topThreeTransaction = await _allocationService.GetTopThreeTransactionAsync();

      await SendAsync(topThreeTransaction);
    }
}