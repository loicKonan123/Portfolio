using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public class MessageRepository : IMessageRepository
{
    private readonly PortfolioDbContext _ctx;
    public MessageRepository(PortfolioDbContext ctx) => _ctx = ctx;

    public Task<List<Message>> GetAllAsync(CancellationToken ct = default) =>
        _ctx.Messages.ToListAsync(ct);

    public Task<Message?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        _ctx.Messages.FirstOrDefaultAsync(m => m.Id == id, ct);

    public async Task AddAsync(Message message, CancellationToken ct = default)
    {
        _ctx.Messages.Add(message);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(Message message, CancellationToken ct = default)
    {
        _ctx.Messages.Update(message);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(Message message, CancellationToken ct = default)
    {
        _ctx.Messages.Remove(message);
        await _ctx.SaveChangesAsync(ct);
    }
}
