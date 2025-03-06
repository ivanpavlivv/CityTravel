using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cities.Commands
{
    public class CreateCityDetails
    {
        public class Command : IRequest<Result<string>>
        {
            public required CreateCityDetailsDto DetailsDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var city = context.Cities.Include(x => x.Details).First(x => x.Id == request.DetailsDto.CityId);

                if(city == null) return Result<string>.Failure("Details provided with nonexistent city", 404);

                if (city.Details != null) return Result<string>.Failure("Details for provided city already exist", 400);

                var details = mapper.Map<CityDetails>(request.DetailsDto);
                details.CreateDate = DateTime.Now;
                details.UpdateDate = DateTime.Now;
                
                city.Details = details;

                await context.CitiesDetails.AddAsync(details, cancellationToken);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<string>.Failure("Failed to create details", 400);

                return Result<string>.Success(details.Id);
            }
        }
    }
}