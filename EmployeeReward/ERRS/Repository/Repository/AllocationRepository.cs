using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Repositorylayer.DBContext;
using Repositorylayer.IRepository;
namespace Repositorylayer.Repository;
public class AllocationRepository : IAllocationRepository
{
  private readonly AppDbContext _context;

  public AllocationRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task AllocatePointAsync(List<PointAllocationDto> pointAllocationDto, CancellationToken ct)
  {
    var rewardId = pointAllocationDto.FirstOrDefault()?.RewardId;
    if (rewardId == null || rewardId <= 0)
    {
      throw new Exception("Reward Id is missing or invalid");
    }

    var reward = _context.Rewards.FirstOrDefault(r => r.Id == rewardId);

    if (reward == null)
    {
      throw new Exception($"Reward with ID {rewardId} not found");
    }

    var rewardPoints = reward.Points;

    var userIds = pointAllocationDto.SelectMany(a => a.SelectedUserIds).Distinct().ToList();

    var users = _context.Users.Where(u => userIds.Contains(u.Id)).ToList();

    foreach (var pointAllocation in pointAllocationDto)
    {
      foreach (var userId in pointAllocation.SelectedUserIds)
      {
        var user = users.FirstOrDefault(u => u.Id == userId);
        if (user == null)
        {
          throw new Exception($"User With Id {userId} not found");
        }
        user.BytePoints += pointAllocation.Points;
        user.PointsGained += pointAllocation.Points;
      }


      await _context.SaveChangesAsync();
    }
    foreach (var pointAllocation in pointAllocationDto)
    {
      foreach (var userId in pointAllocation.SelectedUserIds)
      {
        var allocate = pointAllocationDto.Select(x => new Allocation

        {
          UserId = userId,
          RewardId = x.RewardId,
          Points = x.Points,
          AllocationDate = x.AllocationDate
        });


        _context.Allocations.AddRange(allocate);
        _context.SaveChanges();
      }
    }

  }

  public async Task<int> GetRedeemedPointAsync(int id, CancellationToken ct)
  {
    // var user = await _context.Users.FirstOrDefaultAsync(id, ct);
    var user = _context.Users.Where(x => x.Id == id).FirstOrDefault();

    if (user == null)
    {
      throw new DllNotFoundException("User not found");
    }
    else
    {
      return user.PointsGained - user.BytePoints;
    }
  }

  public async Task<List<AllocationDetailsDto>> GetTopThreeAllocationAsync()
  {
    return await (from allocation in _context.Allocations
                  join user in _context.Users on allocation.UserId equals user.Id
                  join reward in _context.Rewards on allocation.RewardId equals reward.Id
                  select new AllocationDetailsDto
                  {
                    AllocationId = allocation.Id,
                    FirstName = user.FirstName,
                    RewardName = reward.RewardName,
                    Points = allocation.Points,
                    AllocationDate = allocation.AllocationDate

                  }).OrderByDescending(a => a.AllocationId).Take(4).ToListAsync();
  }

  public async Task<List<AllocationDetailsDto>> GetRecentAllocationAsync(int userId)
  {
    return await (from allocation in _context.Allocations
                  join user in _context.Users on allocation.UserId equals user.Id
                  join reward in _context.Rewards on allocation.RewardId equals reward.Id
                  where allocation.UserId == userId
                  orderby allocation.AllocationDate descending
                  select new AllocationDetailsDto
                  {
                    AllocationId = allocation.Id,
                    FirstName = user.FirstName,
                    RewardName = reward.RewardName,
                    Points = allocation.Points,
                    AllocationDate = allocation.AllocationDate
                  }).OrderByDescending(a => a.AllocationDate).Take(4).ToListAsync();

  }

  public async Task<User?> GetCurrentPointAsync(int id)
  {
    var currentPoint = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
    return currentPoint;
  }

  public async Task<List<Allocation>> GetAllocationDetailsAsync()
  {
    var allocationDetails = await _context.Allocations.Include(a => a.Users).Include(a => a.Reward).ToListAsync();

    return allocationDetails;

  }

  public async Task<List<Redemption>> GetTransactionDetailsAsync()
  {
    var transactionDetails = await _context.Redemptions.Include(a => a.User).Include(a => a.Product).ToListAsync();
    return transactionDetails;
  }

  public async Task<List<Redemption>> GetTransactionDetailsByIdAsync(int id)
  {
    var userTransactionDetails = await _context.Redemptions.Include(a => a.User).Include(a => a.Product).Where(r => r.UserId == id).ToListAsync();
    return userTransactionDetails;
  }

  public async Task<List<Redemption>> GetTopThreeTransactionAsync()
  {
    var topThreeTransaction = await _context.Redemptions.Include(a => a.User).Include(a => a.Product).ToListAsync();
    return topThreeTransaction;
  }
}

