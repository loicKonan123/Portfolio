using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public class SkillRepository : ISkillRepository
{
    private readonly PortfolioDbContext _ctx;
    public SkillRepository(PortfolioDbContext ctx) => _ctx = ctx;

    public Task<List<Skill>> GetAllAsync(CancellationToken ct = default) =>
        _ctx.Skills.ToListAsync(ct);

    public Task<Skill?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        _ctx.Skills.FirstOrDefaultAsync(s => s.Id == id, ct);

    public async Task AddAsync(Skill skill, CancellationToken ct = default)
    {
        _ctx.Skills.Add(skill);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(Skill skill, CancellationToken ct = default)
    {
        _ctx.Skills.Update(skill);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(Skill skill, CancellationToken ct = default)
    {
        _ctx.Skills.Remove(skill);
        await _ctx.SaveChangesAsync(ct);
    }
}
