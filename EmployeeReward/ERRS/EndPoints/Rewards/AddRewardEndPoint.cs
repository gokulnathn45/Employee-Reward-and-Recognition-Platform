using FastEndpoints;

public class RewardAdd : Endpoint<Reward, Reward>
{
  private readonly IRewardService _rewardService;

  public RewardAdd(IRewardService rewardService)
  {
    _rewardService = rewardService;
  }

  public override void Configure()
  {
    Post("rewards/rewardadd");
    AllowAnonymous();
  }
  public override async Task HandleAsync(Reward reward, CancellationToken ct)
  {
    var rewardDetails = await _rewardService.NewRewardAddAsync(reward, ct);
    await SendAsync(rewardDetails);
  }
}