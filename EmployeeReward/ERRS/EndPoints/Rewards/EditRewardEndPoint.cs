using FastEndpoints;

public class EditReward : Endpoint<Reward, string>
{
  private readonly IRewardService _rewardService;

  public EditReward(IRewardService rewardService)
  {
    _rewardService = rewardService;
  }

  public override void Configure()
  {
    Put("rewards/editreward/{id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(Reward reward, CancellationToken ct)
  {
   
    var id = Route<int>("id");
    await _rewardService.RewardEditAsync(id,reward, ct);
    await SendAsync("edited");

  }


}