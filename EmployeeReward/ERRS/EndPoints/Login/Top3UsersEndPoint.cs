using FastEndpoints;
using ServiceLayer.IService;

public class TopThreeUsers : EndpointWithoutRequest<List<TopThreeUserDto>>
{
  private readonly IUserService _userService;

  public TopThreeUsers(IUserService userService)
  {
    _userService = userService;
  }

  public override void Configure()
  {
    Get("login/topthreeusers");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {

    var topThree = await _userService.GetTopThreeAsync();

    await SendAsync(topThree);

  }

}