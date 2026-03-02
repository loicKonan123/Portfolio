using MediatR;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Services.Commands;

public record DeleteServiceCommand(Guid Id) : IRequest;

public class DeleteServiceCommandHandler : IRequestHandler<DeleteServiceCommand>
{
    private readonly IServiceRepository _repo;
    public DeleteServiceCommandHandler(IServiceRepository repo) => _repo = repo;

    public async Task Handle(DeleteServiceCommand request, CancellationToken ct)
    {
        var service = await _repo.GetByIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException($"Service {request.Id} not found");
        await _repo.DeleteAsync(service, ct);
    }
}
