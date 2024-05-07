using Microsoft.EntityFrameworkCore;
using Repositorylayer.DBContext;
using Repositorylayer.IRepository;

namespace Repositorylayer.Repository;

public class UserRepository : IUserRepository
{
  private readonly AppDbContext _context;

  public UserRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<List<User>> GetAllUserAsync()
  {
    return await _context.Users.ToListAsync();
  }

  public async Task<User> GetUserUsingCredentialsAsync(UserLoginDto logindto)
  {
    var user = _context.Users.FirstOrDefault(u => u.UserName == logindto.UserName && u.Password == logindto.Password);
    return user;
  }
  public async Task<bool> IsUsernameTakenAsync(string username)
  {
    return await _context.Users.AnyAsync(u => u.UserName == username);
  }

  public async Task AddUserAsync(User userData)
  {
    _context.Users.Add(userData);
    await _context.SaveChangesAsync();
  }

  public async Task<List<User>> GetPendingUsersAsync()
  {
    return await _context.Users.Where(u => u.LoginStatus == "pending").ToListAsync();
  }

  public async Task<string> UpdateLoginStatusAsync(int id, LoginStatusDto loginstatusdto, CancellationToken ct)
  {
    var loginStatus = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

    if (loginStatus == null)
      return null;

    else
    {
      loginStatus.LoginStatus = loginstatusdto.LoginStatus;

      _context.Users.Update(loginStatus);
      await _context.SaveChangesAsync();

      return $"LoginStatus Changed for {id} and login status is {loginStatus.LoginStatus}";
    }
  }

  public async Task<List<User>> GetTopThreeAsync()
  {
    return await _context.Users.Where(user => user.LoginStatus == "approved").OrderByDescending(p => p.PointsGained).Take(4).ToListAsync();
  }

  public async Task<int> GetEmployeesCount()
  {
    return _context.Users.Count(u => u.UserType == "employee" && u.LoginStatus == "approved");

  }

  public async Task<List<UserNameDto>> GetApprovedEmployee()
  {
    return await _context.Users.Where(u => u.LoginStatus == "approved" && u.UserType == "employee").Select(u => new UserNameDto { Id = u.Id, FirstName = u.FirstName, LastName = u.LastName }).ToListAsync();
  }



}