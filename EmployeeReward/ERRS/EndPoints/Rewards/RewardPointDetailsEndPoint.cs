using FastEndpoints;

public class RewardPointDetails:EndpointWithoutRequest<List<RewardPointDto>>
{
  private readonly IRewardService _rewardService;

  public RewardPointDetails(IRewardService rewardService)
  {
    _rewardService = rewardService;
  }
    public override void Configure()
    {
        Get("rewards/rewardpointdetails");
        AllowAnonymous();
    }
    public override async Task HandleAsync(CancellationToken ct)
    {
      var rewardPoint = await _rewardService.GetRewardPointAsync();

      await SendAsync(rewardPoint);
    }
}