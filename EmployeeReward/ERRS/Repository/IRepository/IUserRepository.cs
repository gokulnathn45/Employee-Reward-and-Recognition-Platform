namespace Repositorylayer.IRepository;
public interface IUserRepository
{
  Task<List<User>> GetAllUserAsync();

  Task<User> GetUserUsingCredentialsAsync(UserLoginDto logindto);
  Task<bool> IsUsernameTakenAsync(string username);
  Task AddUserAsync(User userData);
  Task<List<User>> GetPendingUsersAsync();
  Task<string> UpdateLoginStatusAsync(int id, LoginStatusDto loginstatusdto, CancellationToken ct);
  Task<List<User>> GetTopThreeAsync();
  Task<int> GetEmployeesCount();
  Task<List<UserNameDto>> GetApprovedEmployee();

}