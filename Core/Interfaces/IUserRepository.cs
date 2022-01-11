using Core.Entities;

namespace Core.Interfaces
{
    public interface IUserRepository
    {
        User Authenticate(string UserName, string Password);
    }
}
