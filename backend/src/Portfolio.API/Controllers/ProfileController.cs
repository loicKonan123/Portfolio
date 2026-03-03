using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Features.Profile.Commands;
using Portfolio.Application.Features.Profile.Queries;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly IMediator _mediator;
    public ProfileController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetSiteProfileQuery(), ct));

    [HttpPut, Authorize]
    public async Task<IActionResult> Update([FromBody] UpdateSiteProfileCommand cmd, CancellationToken ct) =>
        Ok(await _mediator.Send(cmd, ct));
}
