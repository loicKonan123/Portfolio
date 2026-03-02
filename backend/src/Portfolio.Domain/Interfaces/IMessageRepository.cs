using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Interfaces;

public interface IMessageRepository
{
    Task<List<Message>> GetAllAsync(CancellationToken ct = default);
    Task<Message?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task AddAsync(Message message, CancellationToken ct = default);
    Task UpdateAsync(Message message, CancellationToken ct = default);
    Task DeleteAsync(Message message, CancellationToken ct = default);
}
