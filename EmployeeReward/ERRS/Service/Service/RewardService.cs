
public class RewardService : IRewardService
{
  private readonly IRewardRepository _rewardRepository;

  public RewardService(IRewardRepository rewardRepository)
  {
    _rewardRepository = rewardRepository;
  }

  public async Task<List<Reward>> GetRewardsAsync()
  {
    var rewardDetails = await _rewardRepository.GetRewardsAsync();

    return rewardDetails;
  }

  public async Task<Reward> NewRewardAddAsync(Reward reward, CancellationToken ct)
  {
    bool isRewardNametaken = await _rewardRepository.IsRewardNameTakenAsync(reward.RewardName);
    if (isRewardNametaken)
    {
      throw new Exception("Rewardname is already taken");
    }
    else
    {
      await _rewardRepository.NewRewardAddAsync(reward);
      return reward;
    }

  }
  public async Task RewardEditAsync(int id, Reward reward, CancellationToken ct)
  {
    if (reward == null || reward.Id <= 0)
    {
      throw new BadHttpRequestException("Invalid Reward data");
    }
    await _rewardRepository.RewardEditAsync(id, reward, ct);

  }

  public async Task<List<RewardPointDto>> GetRewardPointAsync()
  {
    return await _rewardRepository.GetRewardPointAsync();
  }

  public async Task DeleteRewardAsync(int id)
  {
    await _rewardRepository.DeleteRewardAsync(id);
  }


}