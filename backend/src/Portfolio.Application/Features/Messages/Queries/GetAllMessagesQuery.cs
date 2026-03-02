using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Messages.Queries;

public record GetAllMessagesQuery : IRequest<List<MessageDto>>;

public class GetAllMessagesQueryHandler : IRequestHandler<GetAllMessagesQuery, List<MessageDto>>
{
    private readonly IMessageRepository _repo;
    public GetAllMessagesQueryHandler(IMessageRepository repo) => _repo = repo;

    public async Task<List<MessageDto>> Handle(GetAllMessagesQuery request, CancellationToken ct)
    {
        var messages = await _repo.GetAllAsync(ct);
        return messages
            .OrderByDescending(m => m.CreatedAt)
            .Select(m => new MessageDto(m.Id, m.Name, m.Email, m.Subject, m.Body, m.IsRead, m.CreatedAt))
            .ToList();
    }
}
