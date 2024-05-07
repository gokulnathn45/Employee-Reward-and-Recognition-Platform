using FastEndpoints;

public class RedeemedPoint : EndpointWithoutRequest<int>
{
  private readonly IAllocationService _allocationService;

  public RedeemedPoint(IAllocationService allocationService)
  {
    _allocationService = allocationService;
  }

  public override void Configure()
  {
    Get("allocation/redeemedpoint/{id}");
    AllowAnonymous();
  }
  public override async Task HandleAsync(CancellationToken ct)
  {
    var id = Route<int>("id");

    int redeemedPoint = await _allocationService.GetRedeemedPointAsync(id,ct);

    await SendAsync(redeemedPoint);
  
  }

}
