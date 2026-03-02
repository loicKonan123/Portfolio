using MediatR;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Projects.Commands;

public record UploadProjectImageCommand(Guid ProjectId, Stream FileStream, string FileName) : IRequest<string>;

public class UploadProjectImageCommandHandler : IRequestHandler<UploadProjectImageCommand, string>
{
    private readonly IProjectRepository _repo;
    private readonly IFileStorageService _storage;

    public UploadProjectImageCommandHandler(IProjectRepository repo, IFileStorageService storage)
    {
        _repo = repo;
        _storage = storage;
    }

    public async Task<string> Handle(UploadProjectImageCommand request, CancellationToken ct)
    {
        var project = await _repo.GetByIdAsync(request.ProjectId, ct)
            ?? throw new KeyNotFoundException($"Project {request.ProjectId} not found");

        var imageUrl = await _storage.UploadAsync(request.FileStream, request.FileName, ct);
        project.SetImageUrl(imageUrl);
        await _repo.UpdateAsync(project, ct);

        return imageUrl;
    }
}
