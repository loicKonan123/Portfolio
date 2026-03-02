using MediatR;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Messages.Commands;

public record DeleteMessageCommand(Guid Id) : IRequest;

public class DeleteMessageCommandHandler : IRequestHandler<DeleteMessageCommand>
{
    private readonly IMessageRepository _repo;
    public DeleteMessageCommandHandler(IMessageRepository repo) => _repo = repo;

    public async Task Handle(DeleteMessageCommand request, CancellationToken ct)
    {
        var message = await _repo.GetByIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException($"Message {request.Id} not found");
        await _repo.DeleteAsync(message, ct);
    }
}
