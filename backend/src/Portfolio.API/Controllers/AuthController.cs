using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Features.Auth.Commands;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    public AuthController(IMediator mediator) => _mediator = mediator;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand cmd, CancellationToken ct)
    {
        var token = await _mediator.Send(cmd, ct);
        return Ok(new { token });
    }
}
