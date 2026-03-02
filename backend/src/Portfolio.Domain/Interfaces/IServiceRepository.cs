using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Interfaces;

public interface IServiceRepository
{
    Task<List<Service>> GetAllAsync(CancellationToken ct = default);
    Task<Service?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task AddAsync(Service service, CancellationToken ct = default);
    Task UpdateAsync(Service service, CancellationToken ct = default);
    Task DeleteAsync(Service service, CancellationToken ct = default);
}
