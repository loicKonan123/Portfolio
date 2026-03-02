using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Features.Messages.Commands;
using Portfolio.Application.Features.Messages.Queries;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly IMediator _mediator;
    public MessagesController(IMediator mediator) => _mediator = mediator;

    // Public — contact form
    [HttpPost]
    public async Task<IActionResult> Send([FromBody] SendMessageCommand cmd, CancellationToken ct) =>
        Ok(await _mediator.Send(cmd, ct));

    // Admin only
    [HttpGet, Authorize]
    public async Task<IActionResult> GetAll(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetAllMessagesQuery(), ct));

    [HttpPut("{id:guid}/read"), Authorize]
    public async Task<IActionResult> MarkRead(Guid id, CancellationToken ct)
    {
        await _mediator.Send(new MarkMessageReadCommand(id), ct);
        return NoContent();
    }

    [HttpDelete("{id:guid}"), Authorize]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        await _mediator.Send(new DeleteMessageCommand(id), ct);
        return NoContent();
    }
}
