using FluentValidation;
using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Services.Commands;

public record CreateServiceCommand(string Title, string Description, string Price, string Icon, bool Featured = false, int DisplayOrder = 0) : IRequest<ServiceDto>;

public class CreateServiceValidator : AbstractValidator<CreateServiceCommand>
{
    public CreateServiceValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).NotEmpty().MaximumLength(500);
        RuleFor(x => x.Price).NotEmpty();
        RuleFor(x => x.Icon).NotEmpty();
    }
}

public class CreateServiceCommandHandler : IRequestHandler<CreateServiceCommand, ServiceDto>
{
    private readonly IServiceRepository _repo;
    public CreateServiceCommandHandler(IServiceRepository repo) => _repo = repo;

    public async Task<ServiceDto> Handle(CreateServiceCommand request, CancellationToken ct)
    {
        var service = Domain.Entities.Service.Create(request.Title, request.Description, request.Price, request.Icon, request.Featured, request.DisplayOrder);
        await _repo.AddAsync(service, ct);
        return new ServiceDto(service.Id, service.Title, service.Description, service.Price, service.Icon, service.Featured, service.DisplayOrder);
    }
}
