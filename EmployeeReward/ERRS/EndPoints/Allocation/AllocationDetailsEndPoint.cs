using FastEndpoints;

public class AllocationDetails : EndpointWithoutRequest<List<AllocationDetailsDto>>
{

  private readonly IAllocationService _allocationService;

  public AllocationDetails(IAllocationService allocationService)
  {
    _allocationService = allocationService;
  }

    public override void Configure()
    {
        Get("allocation/allocationdetails");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
      var allocationDetails = await _allocationService.GetAllocationDetailsAsync();

      await SendAsync(allocationDetails);
    }
}