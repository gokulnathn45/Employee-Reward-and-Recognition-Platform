using FastEndpoints;

public class RecentAllocation : EndpointWithoutRequest<List<AllocationDetailsDto>>
{
  private readonly IAllocationService _allocationService;

  public RecentAllocation(IAllocationService allocationService)

  {
    _allocationService = allocationService;
  }

    public override void Configure()
    {
        Get("allocation/recentallocation/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
      var id = Route<int>("id");
      var recentAllocation = await _allocationService.GetRecentAllocationAsync(id);
      await SendAsync(recentAllocation);
    }

}