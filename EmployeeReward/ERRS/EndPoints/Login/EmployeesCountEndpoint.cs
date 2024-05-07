using FastEndpoints;
using ServiceLayer.IService;
namespace ERRS.EndPoints.LoginEndpoint;
public class EmployeesCount : EndpointWithoutRequest<int>
{
  private readonly IUserService _userService;

  public EmployeesCount(IUserService userService)
  {
    _userService = userService;
  }
    public override void Configure()
    {
        Get("login/employeecount");
        AllowAnonymous();
    }
    public override async Task HandleAsync(CancellationToken ct)
    {
      var employeeCount = await _userService.GetEmployeesCount();

      await SendAsync(employeeCount);
    }
}
