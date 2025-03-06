using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator { get; set; }

        protected IMediator Mediator =>
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
                ?? throw new InvalidOperationException("IMediator service is unaviable");

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (!result.IsSuccess && result.Code == 404) return NotFound();
            if (result.IsSuccess && result.Value != null) return Ok(result.Value);

            return BadRequest(result.Error);
        }
    }
}