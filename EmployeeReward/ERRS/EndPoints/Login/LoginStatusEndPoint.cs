using FastEndpoints;
using ServiceLayer.IService;

public class LoginStatus : EndpointWithoutRequest<List<ChangeLoginStatusDto>>
{
  private readonly IUserService _userService;

  public LoginStatus(IUserService userService)
  {
    _userService = userService;
  }

  public override void Configure()
  {
    Get("login/loginstatuspending");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)

  {
    var pendingUsers = await _userService.GetPendingUsersAsync();


    await SendAsync(pendingUsers);

  }


}