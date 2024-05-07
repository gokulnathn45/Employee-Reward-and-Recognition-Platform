using FastEndpoints;

public class CurrentPoint : EndpointWithoutRequest<CurrentPointDto>
{
  private readonly IAllocationService _allocationService;

  public CurrentPoint(IAllocationService allocationService)

  {
    _allocationService = allocationService;
  }

    public override void Configure()
    {
        Get("allocation/currentpoint/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
      var id = Route<int>("id");
      var currentPoint = await _allocationService.GetCurrentPointAsync(id);
      await SendAsync(currentPoint);
    }
}