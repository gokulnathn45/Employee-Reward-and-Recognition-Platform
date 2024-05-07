using FastEndpoints;

public class TopThreeAllocation : EndpointWithoutRequest<List<AllocationDetailsDto>>
{
  private readonly IAllocationService _allocationService;

  public TopThreeAllocation(IAllocationService allocationService)
  {
    _allocationService = allocationService;
  }

    public override void Configure()
    {
        Get("allocation/topthreeallocation");
        AllowAnonymous();
    }
    public override async Task HandleAsync(CancellationToken ct)
    {
      var topThreeAllocation = await _allocationService.GetTopThreeAllocationAsync();

      await SendAsync(topThreeAllocation);
    }
}