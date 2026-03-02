using FluentValidation;
using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Messages.Commands;

public record SendMessageCommand(string Name, string Email, string Subject, string Body) : IRequest<MessageDto>;

public class SendMessageValidator : AbstractValidator<SendMessageCommand>
{
    public SendMessageValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Subject).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Body).NotEmpty().MaximumLength(2000);
    }
}

public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand, MessageDto>
{
    private readonly IMessageRepository _repo;
    public SendMessageCommandHandler(IMessageRepository repo) => _repo = repo;

    public async Task<MessageDto> Handle(SendMessageCommand request, CancellationToken ct)
    {
        var message = Message.Create(request.Name, request.Email, request.Subject, request.Body);
        await _repo.AddAsync(message, ct);
        return new MessageDto(message.Id, message.Name, message.Email, message.Subject, message.Body, message.IsRead, message.CreatedAt);
    }
}
