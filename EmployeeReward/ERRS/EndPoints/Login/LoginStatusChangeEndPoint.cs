
using FastEndpoints;

using ServiceLayer.IService;

public class LoginStatusChange : Endpoint<LoginStatusDto, string>
{
  private readonly IUserService _userService;

  public LoginStatusChange(IUserService userService)
  {
    _userService = userService;
  }

  public override void Configure()
  {
    Patch("login/loginstatuschange/{id}");
    AllowAnonymous();
  }
  public override async Task HandleAsync(LoginStatusDto loginstatusdto, CancellationToken ct)
  {
    var id = Route<int>("id");
    var statusChange = await _userService.UpdateLoginStatusAsync(id, loginstatusdto, ct);
    await SendAsync(statusChange);

  }

}