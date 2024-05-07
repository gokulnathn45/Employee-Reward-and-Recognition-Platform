// using Moq;
// using NJsonSchema.Annotations;
// using Repositorylayer.IRepository;
// using ServiceLayer.Service;




// public class UserLoginTests
// {
//   [Fact]
//   public async Task UserLoginAsync_ValidCredentials_ReturnsOk()
//   {
//     //Arrange

//     var mockUserRepository = new Mock<IUserRepository>();

//     var expectedUser = new WebAPI.Models.User {LoginStatus = "approved"};
    

//     mockUserRepository.Setup(r => r.GetUserUsingCredentialsAsync(It.IsAny<UserLoginDto>()))
//     .ReturnsAsync(Task.FromResult(expectedUser));

//     var service = new UserService(mockUserRepository.Object);
//     var loginDto = new UserLoginDto{UserName = "validUser",Password = "validpassword"};

//     // Act

//     var result = await service.UserLoginAsync(loginDto,CancellationToken.None);

//     // Assert

//     Assert.IsType<Result>(result);
//     Assert.True(result.IsSuccess);

//     if(result.IsSuccess && result.Value is WebApI.Models.User user)
//     {
//       Assert.Equal(expectedUser.LoginStatus,user.loginStatus);
//     }
//   }
// }