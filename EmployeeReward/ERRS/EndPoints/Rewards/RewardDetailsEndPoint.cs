using FastEndpoints;

public class RewardDetails:EndpointWithoutRequest<List<Reward>>
{
  private readonly IRewardService _rewardService;

  public RewardDetails(IRewardService rewardService)
  {
    _rewardService = rewardService;
  }

    public override void Configure()
    {
        Get("rewards/rewarddetails");
        AllowAnonymous();
    }
    public override async Task HandleAsync(CancellationToken ct)
    {
      var rewardDetails = await _rewardService.GetRewardsAsync();

      await SendAsync(rewardDetails);
    }
}