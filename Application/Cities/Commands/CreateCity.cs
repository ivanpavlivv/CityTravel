using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Cities.Commands
{
    public class CreateCity
    {
        public class Command : IRequest<Result<string>>
        {
            public required CreateCityDto CityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var city = mapper.Map<City>(request.CityDto);

                city.CreateDate = DateTime.Now;
                city.UpdateDate = DateTime.Now;

                context.Cities.Add(city);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<string>.Failure("Failed to create city", 400);

                return Result<string>.Success(city.Id);
            }
        }
    }
}