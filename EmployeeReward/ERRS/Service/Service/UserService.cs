
using Ardalis.Result;
using Repositorylayer.IRepository;
using ServiceLayer.IService;

namespace ServiceLayer.Service;
public class UserService : IUserService
{
  private readonly IUserRepository _userRepository;

  public UserService(IUserRepository userRepository)
  {
    _userRepository = userRepository;
  }

  public async Task<Result<User>> UserLoginAsync(UserLoginDto logindto, CancellationToken ct)
  {
    var user = await _userRepository.GetUserUsingCredentialsAsync(logindto);

    if (user != null)
    {
      if (user.LoginStatus == "approved")
      {
        return Result.Success(user);
      }
      else if (user.LoginStatus == "pending")
      {
        return Result.Invalid(new ValidationError
        {
          Identifier = "User",
          ErrorMessage = "You are not eligible for login,Contact admin for further details"
        });
      }
      else
      {
        return Result.Invalid(new ValidationError
        {
          Identifier = "User",
          ErrorMessage = "You are not eligible for login"
        });
      }
    }
    else
    {
      return Result.Invalid(new ValidationError
      {
        Identifier = "User",
        ErrorMessage = "Invalid username or password"
      });
    }
  }
  public async Task<Result<string>> UserSignUpAsync(User userData, CancellationToken ct)
  {
    bool isUsernameTaken = await _userRepository.IsUsernameTakenAsync(userData.UserName);
    if (isUsernameTaken)
    {
     return Result.Success("username already taken");
    
    }
    else
    {
      await _userRepository.AddUserAsync(userData);
      return Result.Success("user created successfully");
    }
  }
  public async Task<List<ChangeLoginStatusDto>> GetPendingUsersAsync()

  {
    var pendingData = await _userRepository.GetPendingUsersAsync();
    return pendingData.Select(u => new ChangeLoginStatusDto
    {
      Id = u.Id,
      FirstName = u.FirstName,
      LastName = u.LastName,
      LoginStatus = u.LoginStatus
    }).ToList();

  }

  public async Task<string> UpdateLoginStatusAsync(int id, LoginStatusDto loginstatusdto, CancellationToken ct)
  {
    return await _userRepository.UpdateLoginStatusAsync(id, loginstatusdto, ct);
  }

  public async Task<List<TopThreeUserDto>> GetTopThreeAsync()
  {
    var topThreeUsers = await _userRepository.GetTopThreeAsync();

    return topThreeUsers.Where(u => u.UserType == "employee").Select(u => new TopThreeUserDto { FirstName = u.FirstName, PointsGained = u.PointsGained }).ToList();

  }

  public async Task<int> GetEmployeesCount()
  {
    int employeesCount = await _userRepository.GetEmployeesCount();
    return employeesCount;
  }

  public async Task<List<UserNameDto>> GetApprovedEmployee()
  {
    return await _userRepository.GetApprovedEmployee();
  }
}

