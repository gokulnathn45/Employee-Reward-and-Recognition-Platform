public interface IAllocationRepository
{
  Task AllocatePointAsync(List<PointAllocationDto> pointAllocationDto, CancellationToken ct);

  Task<List<AllocationDetailsDto>> GetTopThreeAllocationAsync();

  Task<List<AllocationDetailsDto>>GetRecentAllocationAsync(int userId);

  Task<int> GetRedeemedPointAsync(int id, CancellationToken ct);

  Task<User> GetCurrentPointAsync(int id);

  Task<List<Allocation>> GetAllocationDetailsAsync();

  Task<List<Redemption>>GetTransactionDetailsAsync();

  Task<List<Redemption>>GetTransactionDetailsByIdAsync(int id);

  Task<List<Redemption>> GetTopThreeTransactionAsync();
  
  
}