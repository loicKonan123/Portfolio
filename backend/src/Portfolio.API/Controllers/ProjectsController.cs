using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Features.Projects.Commands;
using Portfolio.Application.Features.Projects.Queries;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IMediator _mediator;
    public ProjectsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetAllProjectsQuery(), ct));

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeatured(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetFeaturedProjectsQuery(), ct));

    [HttpPost, Authorize]
    public async Task<IActionResult> Create([FromBody] CreateProjectCommand cmd, CancellationToken ct) =>
        Ok(await _mediator.Send(cmd, ct));

    [HttpPut("{id:guid}"), Authorize]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProjectCommand cmd, CancellationToken ct)
    {
        if (id != cmd.Id) return BadRequest("ID mismatch");
        return Ok(await _mediator.Send(cmd, ct));
    }

    [HttpDelete("{id:guid}"), Authorize]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        await _mediator.Send(new DeleteProjectCommand(id), ct);
        return NoContent();
    }

    [HttpPost("{id:guid}/image"), Authorize]
    public async Task<IActionResult> UploadImage(Guid id, IFormFile file, CancellationToken ct)
    {
        if (file == null || file.Length == 0) return BadRequest("No file provided");
        using var stream = file.OpenReadStream();
        var url = await _mediator.Send(new UploadProjectImageCommand(id, stream, file.FileName), ct);
        return Ok(new { imageUrl = url });
    }
}
