using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Features.Skills.Commands;
using Portfolio.Application.Features.Skills.Queries;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SkillsController : ControllerBase
{
    private readonly IMediator _mediator;
    public SkillsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetAllSkillsQuery(), ct));

    [HttpPost, Authorize]
    public async Task<IActionResult> Create([FromBody] CreateSkillCommand cmd, CancellationToken ct) =>
        Ok(await _mediator.Send(cmd, ct));

    [HttpPut("{id:guid}"), Authorize]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSkillCommand cmd, CancellationToken ct)
    {
        if (id != cmd.Id) return BadRequest("ID mismatch");
        return Ok(await _mediator.Send(cmd, ct));
    }

    [HttpDelete("{id:guid}"), Authorize]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        await _mediator.Send(new DeleteSkillCommand(id), ct);
        return NoContent();
    }
}
