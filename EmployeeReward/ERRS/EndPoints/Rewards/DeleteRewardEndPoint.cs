using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

public class DeleteReward : EndpointWithoutRequest<string>
{
  private readonly IRewardService _rewardService;

  public DeleteReward(IRewardService rewardService)
  {
    _rewardService = rewardService;
  }

  public override void Configure()
  {
    Delete("rewards/deletereward/{id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var id = Route<int>("id");
    await _rewardService.DeleteRewardAsync(id);
    await SendAsync($"Reward {id} Deleted Successfully");

  }
}