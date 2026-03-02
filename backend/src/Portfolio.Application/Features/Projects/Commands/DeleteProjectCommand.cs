using MediatR;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Projects.Commands;

public record DeleteProjectCommand(Guid Id) : IRequest;

public class DeleteProjectCommandHandler : IRequestHandler<DeleteProjectCommand>
{
    private readonly IProjectRepository _repo;
    public DeleteProjectCommandHandler(IProjectRepository repo) => _repo = repo;

    public async Task Handle(DeleteProjectCommand request, CancellationToken ct)
    {
        var project = await _repo.GetByIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException($"Project {request.Id} not found");
        await _repo.DeleteAsync(project, ct);
    }
}
