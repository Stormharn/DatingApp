namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepo {get;}
        IMessageRepository MessageRepo {get;}
        ILikesRepository LikesRepo {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}