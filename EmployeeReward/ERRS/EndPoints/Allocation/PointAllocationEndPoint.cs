using FastEndpoints;

public class PointAdd : Endpoint<List<PointAllocationDto>,string>
{
  private readonly IAllocationService _allocationService;

  public PointAdd(IAllocationService allocationService)
  {
    _allocationService = allocationService;
  }
  public override void Configure()
  {
    Post("allocation/pointadd");
    AllowAnonymous();
  }
  public override async Task HandleAsync(List<PointAllocationDto> pointAllocationDto, CancellationToken ct)
  {
    
    var allocationDetails = await _allocationService.AllocatePointAsync(pointAllocationDto, ct);
    await SendAsync(allocationDetails);

  }
}