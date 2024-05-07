public interface IRewardRepository
{
  Task<List<Reward>> GetRewardsAsync();

  Task NewRewardAddAsync(Reward reward);
  Task<bool> IsRewardNameTakenAsync(string rewarName);

  Task RewardEditAsync(int id, Reward reward, CancellationToken ct);

  Task<List<RewardPointDto>> GetRewardPointAsync();

  Task DeleteRewardAsync(int id);


}