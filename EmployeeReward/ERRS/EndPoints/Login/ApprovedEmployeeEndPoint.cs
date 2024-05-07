using FastEndpoints;
using ServiceLayer.IService;
namespace EndPoints.LoginEndPoints;

public class ApprovedEmployee : EndpointWithoutRequest<List<UserNameDto>>

{
  private readonly IUserService _userService;

  public ApprovedEmployee(IUserService userService)
  {
    _userService = userService;
  }

  public override void Configure()
  {
    Get("login/approvedemployee");
    AllowAnonymous();
    

  }
  public override async Task HandleAsync(CancellationToken ct)
  {
    var approvedEmployee = await _userService.GetApprovedEmployee();

    await SendAsync(approvedEmployee);
  }
}