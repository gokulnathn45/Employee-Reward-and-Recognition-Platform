using Ardalis.Result;
namespace ServiceLayer.IService;
public interface IUserService
{
  // Task<User>UserLoginAsync(UserLogin logindto);
  Task<Result<User>> UserLoginAsync(UserLoginDto logindto, CancellationToken ct);

   Task<Result<String>> UserSignUpAsync(User userData, CancellationToken ct);
  Task<List<ChangeLoginStatusDto>> GetPendingUsersAsync();

  Task<string> UpdateLoginStatusAsync(int id, LoginStatusDto loginstatusdto, CancellationToken ct);

  Task<List<TopThreeUserDto>> GetTopThreeAsync();
  Task<int> GetEmployeesCount();

  Task<List<UserNameDto>> GetApprovedEmployee();
}