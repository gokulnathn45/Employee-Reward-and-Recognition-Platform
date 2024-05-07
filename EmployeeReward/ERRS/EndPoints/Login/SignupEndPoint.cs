using FastEndpoints;
using ServiceLayer.IService;

public class SignUp : Endpoint<User,string>
{
  private readonly IUserService _userService;

  public SignUp(IUserService userService)
  {
    _userService = userService;
  }

  public override void Configure()
  {
    Post("login/signup");
    AllowAnonymous();
  }
  public override async Task HandleAsync(User userData, CancellationToken ct)
  {
    var userDetails = await _userService.UserSignUpAsync(userData, ct);
    await SendAsync(userDetails);
  }
}