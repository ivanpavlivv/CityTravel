using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Cities.Commands
{
    public class EditCity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required EditCityDto CityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var city = await context.Cities.FindAsync([request.CityDto.Id], cancellationToken) ;
                
                if(city == null) return Result<Unit>.Failure("City not found", 404);

                mapper.Map(request.CityDto, city);
                city.UpdateDate = DateTime.Now;
                
                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to update city", 400);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}