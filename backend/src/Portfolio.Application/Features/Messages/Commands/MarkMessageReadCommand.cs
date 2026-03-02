using MediatR;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Messages.Commands;

public record MarkMessageReadCommand(Guid Id) : IRequest;

public class MarkMessageReadCommandHandler : IRequestHandler<MarkMessageReadCommand>
{
    private readonly IMessageRepository _repo;
    public MarkMessageReadCommandHandler(IMessageRepository repo) => _repo = repo;

    public async Task Handle(MarkMessageReadCommand request, CancellationToken ct)
    {
        var message = await _repo.GetByIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException($"Message {request.Id} not found");
        message.MarkAsRead();
        await _repo.UpdateAsync(message, ct);
    }
}
