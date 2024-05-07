public interface IAllocationService
{
  Task<string> AllocatePointAsync(List<PointAllocationDto> pointAllocationDto, CancellationToken ct);
  Task<int> GetRedeemedPointAsync(int id, CancellationToken ct);
  Task<List<AllocationDetailsDto>> GetTopThreeAllocationAsync();
  Task<List<AllocationDetailsDto>> GetRecentAllocationAsync(int userId);

  Task<CurrentPointDto> GetCurrentPointAsync(int id);

  Task<List<AllocationDetailsDto>> GetAllocationDetailsAsync();

  Task<List<TransactionDetailsDto>> GetTransactionDetailsAsync();

  Task<List<TransactionDetailsDto>>GetTransactionDetailsByIdAsync(int id);

  Task<List<TransactionDetailsDto>> GetTopThreeTransactionAsync();

}