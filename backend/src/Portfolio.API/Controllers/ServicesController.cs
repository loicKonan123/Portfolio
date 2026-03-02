using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Features.Services.Commands;
using Portfolio.Application.Features.Services.Queries;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IMediator _mediator;
    public ServicesController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetAllServicesQuery(), ct));

    [HttpPost, Authorize]
    public async Task<IActionResult> Create([FromBody] CreateServiceCommand cmd, CancellationToken ct) =>
        Ok(await _mediator.Send(cmd, ct));

    [HttpPut("{id:guid}"), Authorize]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateServiceCommand cmd, CancellationToken ct)
    {
        if (id != cmd.Id) return BadRequest("ID mismatch");
        return Ok(await _mediator.Send(cmd, ct));
    }

    [HttpDelete("{id:guid}"), Authorize]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        await _mediator.Send(new DeleteServiceCommand(id), ct);
        return NoContent();
    }
}
