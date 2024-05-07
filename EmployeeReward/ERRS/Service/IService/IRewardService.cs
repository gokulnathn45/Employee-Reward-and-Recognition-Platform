public interface IRewardService
{
  Task<List<Reward>> GetRewardsAsync();
  Task<Reward>NewRewardAddAsync (Reward reward,CancellationToken ct);

  Task RewardEditAsync(int id, Reward reward, CancellationToken ct);

  Task<List<RewardPointDto>>GetRewardPointAsync();

 Task DeleteRewardAsync(int id);
}