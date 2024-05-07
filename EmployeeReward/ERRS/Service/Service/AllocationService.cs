using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Npgsql.Internal.TypeHandlers.FullTextSearchHandlers;

public class AllocationService : IAllocationService
{
  private readonly IAllocationRepository _allocationRepository;

  public AllocationService(IAllocationRepository allocationRepository)
  {
    _allocationRepository = allocationRepository;
  }

  public async Task<string> AllocatePointAsync(List<PointAllocationDto> pointAllocationDto, CancellationToken ct)
  {
    try
    {
      await _allocationRepository.AllocatePointAsync(pointAllocationDto, ct);
      return "Point Allocated Successfully";
    }
    catch (Exception ex)
    {
      return $"{ex.Message}";
    }
  }

  public async Task<int> GetRedeemedPointAsync(int id, CancellationToken ct)
  {
    int redeemedPoint = await _allocationRepository.GetRedeemedPointAsync(id, ct);

    return redeemedPoint;

  }

  public async Task<List<AllocationDetailsDto>> GetTopThreeAllocationAsync()
  {
    var topThreeAllocation = await _allocationRepository.GetTopThreeAllocationAsync();

    return topThreeAllocation;
  }

  public async Task<List<AllocationDetailsDto>> GetRecentAllocationAsync(int userId)
  {
    var recentAllocation = await _allocationRepository.GetRecentAllocationAsync(userId);

    return recentAllocation;
  }

  public async Task<CurrentPointDto> GetCurrentPointAsync(int id)
  {
    var user = await _allocationRepository.GetCurrentPointAsync(id);

    if (user == null)
    {
      return null;
    }

    return new CurrentPointDto
    {
      UserId = user.Id,
      BytePoints = user.BytePoints,
      FirstName = user.FirstName,
      LastName = user.LastName
    };
  }
  public async Task<List<AllocationDetailsDto>> GetAllocationDetailsAsync()
  {
    var allocation = await _allocationRepository.GetAllocationDetailsAsync();

    

    return allocation.Select(allocation => new AllocationDetailsDto 
    {
      AllocationId = allocation.Id,
      FirstName = allocation.Users.FirstName,
      RewardName = allocation.Reward.RewardName,
      Points = allocation.Points,
      AllocationDate = allocation.AllocationDate
    }).ToList();
  }

  public async Task<List<TransactionDetailsDto>>GetTransactionDetailsAsync()
  
  {
    var transactionDetails = await _allocationRepository.GetTransactionDetailsAsync();

    return transactionDetails.Select(transactionDetails => new TransactionDetailsDto
    {
      FirstName = transactionDetails.User.FirstName,
      LastName = transactionDetails.User.LastName,
      ProductName = transactionDetails.Product.ProductName,
      ProductImage = transactionDetails.Product.ProductImage,
      BytePoints = transactionDetails.Product.BytesValue,
      ActivityDate = transactionDetails.ActivityDate,


    }).ToList();
  }

  public async Task<List<TransactionDetailsDto>>GetTransactionDetailsByIdAsync(int id)
  {
    var transactionDetailsByUser = await _allocationRepository.GetTransactionDetailsByIdAsync(id);

    if(transactionDetailsByUser == null)
    {
      return null;
    }

    return transactionDetailsByUser.Select(transactionDetailsByUser => new TransactionDetailsDto
    {
      FirstName = transactionDetailsByUser.User.FirstName,
      LastName = transactionDetailsByUser.User.LastName,
      ProductName = transactionDetailsByUser.Product.ProductName,
      ProductImage = transactionDetailsByUser.Product.ProductImage,
      BytePoints = transactionDetailsByUser.Product.BytesValue,
      ActivityDate = transactionDetailsByUser.ActivityDate
    }).ToList();
  
    
  }
  public async Task<List<TransactionDetailsDto>> GetTopThreeTransactionAsync()
  {
    var topThreeTransaction = await _allocationRepository.GetTopThreeTransactionAsync();

    return topThreeTransaction.OrderByDescending(topThreeTransaction => topThreeTransaction.ActivityDate).Take(4).Select(topThreeTransaction => new TransactionDetailsDto
    {
      FirstName= topThreeTransaction.User.FirstName,
      ProductName = topThreeTransaction.Product.ProductName,
      ActivityDate = topThreeTransaction.ActivityDate
  }).ToList();
  }
}
