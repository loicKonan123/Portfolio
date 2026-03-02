using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Services.Queries;

public record GetAllServicesQuery : IRequest<List<ServiceDto>>;

public class GetAllServicesQueryHandler : IRequestHandler<GetAllServicesQuery, List<ServiceDto>>
{
    private readonly IServiceRepository _repo;
    public GetAllServicesQueryHandler(IServiceRepository repo) => _repo = repo;

    public async Task<List<ServiceDto>> Handle(GetAllServicesQuery request, CancellationToken ct)
    {
        var services = await _repo.GetAllAsync(ct);
        return services
            .OrderBy(s => s.DisplayOrder)
            .Select(s => new ServiceDto(s.Id, s.Title, s.Description, s.Price, s.Icon, s.Featured, s.DisplayOrder))
            .ToList();
    }
}
