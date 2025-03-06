using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.Commands;
using Application.Cities.DTOs;
using Application.Cities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CitiesController() : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<City>>> GetCities()
        {
            return await Mediator.Send(new GetCityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCityWithDetails(string id)
        {
            return HandleResult(await Mediator.Send(new GetCityWithDetails.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateCity(CreateCityDto cityDto)
        {
            return HandleResult(await Mediator.Send(new CreateCity.Command { CityDto = cityDto }));
        }

        [HttpPost("details")]
        public async Task<ActionResult<string>> CreateCityDetails(CreateCityDetailsDto detailsDto)
        {
            return HandleResult(await Mediator.Send(new CreateCityDetails.Command { DetailsDto = detailsDto }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditCity(string id, EditCityDto cityDto)
        {
            cityDto.Id = id;
            return HandleResult(await Mediator.Send(new EditCity.Command { CityDto = cityDto }));
        }

        [HttpPut("details/{id}")]
        public async Task<ActionResult> EditCityDetails(string id, EditCityDetailsDto detailsDto)
        {
            detailsDto.Id = id;
            return HandleResult(await Mediator.Send(new EditCityDetails.Command { DetailsDto = detailsDto }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCityAndDetails(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteCityAndDetails.Command { Id = id }));
        }

        [HttpDelete("details/{id}")]
        public async Task<ActionResult> DeleteCityDetails(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteCityDetails.Command { Id = id }));
        }

        // Error methods
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
    }
}