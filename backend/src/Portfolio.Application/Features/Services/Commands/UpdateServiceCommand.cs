using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Services.Commands;

public record UpdateServiceCommand(Guid Id, string Title, string Description, string Price, string Icon, bool Featured, int DisplayOrder) : IRequest<ServiceDto>;

public class UpdateServiceCommandHandler : IRequestHandler<UpdateServiceCommand, ServiceDto>
{
    private readonly IServiceRepository _repo;
    public UpdateServiceCommandHandler(IServiceRepository repo) => _repo = repo;

    public async Task<ServiceDto> Handle(UpdateServiceCommand request, CancellationToken ct)
    {
        var service = await _repo.GetByIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException($"Service {request.Id} not found");
        service.Update(request.Title, request.Description, request.Price, request.Icon, request.Featured, request.DisplayOrder);
        await _repo.UpdateAsync(service, ct);
        return new ServiceDto(service.Id, service.Title, service.Description, service.Price, service.Icon, service.Featured, service.DisplayOrder);
    }
}
