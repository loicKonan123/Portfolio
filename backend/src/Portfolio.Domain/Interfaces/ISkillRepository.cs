using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Interfaces;

public interface ISkillRepository
{
    Task<List<Skill>> GetAllAsync(CancellationToken ct = default);
    Task<Skill?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task AddAsync(Skill skill, CancellationToken ct = default);
    Task UpdateAsync(Skill skill, CancellationToken ct = default);
    Task DeleteAsync(Skill skill, CancellationToken ct = default);
}
