using Microsoft.EntityFrameworkCore;
using Repositorylayer.DBContext;

public class RewardRepository : IRewardRepository
{
  private readonly AppDbContext _context;

  public RewardRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<List<Reward>> GetRewardsAsync()
  {
    return await _context.Rewards.Where(r => r.is_active == true).ToListAsync();
  }

  public async Task NewRewardAddAsync(Reward reward)
  {
    _context.Rewards.Add(reward);
    await _context.SaveChangesAsync();
  }
  public async Task<bool> IsRewardNameTakenAsync(string rewardName)
  {
    return await _context.Rewards.AnyAsync(r => r.RewardName == rewardName);
  }

  public async Task RewardEditAsync(int id, Reward reward, CancellationToken ct)
  {

    var rewardData = _context.Rewards.Where(r => r.Id == id).FirstOrDefault();

    if (rewardData == null)
    {
      throw new BadHttpRequestException("Reward not found");
    }
    rewardData.RewardName = reward.RewardName;
    rewardData.Points = reward.Points;
    rewardData.Description = reward.Description;

    await _context.SaveChangesAsync();


  }

  public async Task<List<RewardPointDto>> GetRewardPointAsync()
  {
    return await _context.Rewards.Where(r => r.is_active==true).Select(reward => new RewardPointDto { RewardId = reward.Id, RewardName = reward.RewardName, Points = reward.Points }).ToListAsync();
  }

  public async Task DeleteRewardAsync(int id)
  {
    var reward = _context.Rewards.Where(r => r.Id == id).FirstOrDefault();
    if(reward != null)
    {
      reward.is_active = false;
      await _context.SaveChangesAsync();
    }
    
  }

}